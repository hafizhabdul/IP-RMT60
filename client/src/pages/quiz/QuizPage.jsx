import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Clock, AlertCircle, BookOpen, Send, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import QuizCard from '../../components/quiz/QuizCard';
import QuizResults from '../../components/quiz/QuizResults';
import { getQuizQuestions, submitQuiz } from '../../services/quizService';
import { useAuth } from '../../hooks/useAuth';

export default function QuizPage() {
    const navigate = useNavigate();
    const { user, token, isAuthenticated } = useAuth();

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [results, setResults] = useState(null);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const timerRef = useRef(null);

    // Get query params via useSearchParams
    const [searchParams] = useSearchParams();
    const method = searchParams.get('method') || 'UT';
    const level = searchParams.get('level') || 'Level I';
    const questionCount = parseInt(searchParams.get('count')) || 10;

    useEffect(() => {
        loadQuestions();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    useEffect(() => {
        if (questions.length > 0 && !results) {
            timerRef.current = setInterval(() => {
                setTimeElapsed(prev => prev + 1);
            }, 1000);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [questions, results]);

    const loadQuestions = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getQuizQuestions({
                method,
                level,
                limit: questionCount
            });
            setQuestions(response.data || []);
        } catch (err) {
            setError('Failed to load questions. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAnswer = (questionId, optionIndex) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: optionIndex
        }));
    };

    const handleSubmit = async () => {
        // Check if all questions are answered
        const answeredCount = Object.keys(answers).length;
        if (answeredCount < questions.length && !showConfirmDialog) {
            setShowConfirmDialog(true);
            return;
        }
        setShowConfirmDialog(false);

        setSubmitting(true);
        clearInterval(timerRef.current);

        // If authenticated, submit to backend for history
        if (isAuthenticated && token) {
            try {
                const submissionData = {
                    method,
                    level,
                    timeSpent: timeElapsed,
                    answers: questions.map(q => ({
                        questionId: q.id,
                        selectedAnswer: answers[q.id] !== undefined ? answers[q.id] : -1
                    }))
                };

                const response = await submitQuiz(submissionData, token);

                // Merge results with questions for display
                const gradedQuestionsMap = {};
                response.data.gradedAnswers.forEach(ga => {
                    gradedQuestionsMap[ga.questionId] = ga;
                });

                setQuestions(prev => prev.map(q => ({
                    ...q,
                    correctAnswer: gradedQuestionsMap[q.id]?.correctAnswer,
                    explanation: gradedQuestionsMap[q.id]?.explanation,
                    isCorrect: gradedQuestionsMap[q.id]?.isCorrect
                })));

                setResults(response.data);
            } catch (err) {
                console.error('Failed to save to history:', err);
                // Still calculate locally if server fails
                calculateLocalResults();
            }
        } else {
            // Calculate results locally without authentication
            calculateLocalResults();
        }

        setSubmitting(false);
    };

    // Calculate results locally (for guests or when server fails)
    const calculateLocalResults = () => {
        // For local calculation, we'll show results but note that
        // correct answers aren't available without authentication
        const totalQuestions = questions.length;
        const answeredQuestions = Object.keys(answers).length;

        // Create graded answers (we don't know correct answers locally)
        const gradedAnswers = questions.map(q => ({
            questionId: q.id,
            selectedAnswer: answers[q.id] !== undefined ? answers[q.id] : -1,
            isCorrect: null, // Unknown without server
        }));

        // Show a message that results are estimated
        setResults({
            totalQuestions,
            correctAnswers: 0,
            score: 0,
            passed: false,
            timeSpent: timeElapsed,
            gradedAnswers,
            isLocalResult: true, // Flag to show login prompt
            answeredQuestions
        });
    };

    const handleRetry = () => {
        setAnswers({});
        setResults(null);
        setTimeElapsed(0);
        loadQuestions();
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading questions...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={loadQuestions}
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                to="/e-learning/quizzes"
                                className="text-gray-600 hover:text-gray-900"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                            <div>
                                <h1 className="text-lg font-bold text-gray-900">
                                    {method} - {level} Quiz
                                </h1>
                                <p className="text-sm text-gray-600">
                                    {Object.keys(answers).length} of {questions.length} answered
                                </p>
                            </div>
                        </div>

                        {!results && (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Clock className="h-5 w-5" />
                                    <span className="font-mono">{formatTime(timeElapsed)}</span>
                                </div>
                                <button
                                    onClick={handleSubmit}
                                    disabled={submitting}
                                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                                >
                                    {submitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-4 w-4" />
                                            Submit Quiz
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {results ? (
                    <>
                        <QuizResults
                            results={results}
                            onRetry={handleRetry}
                            onBackToHub={() => navigate('/e-learning/quizzes')}
                        />

                        {/* Show graded questions */}
                        <div className="mt-12">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-orange-500" />
                                Review Your Answers
                            </h3>
                            <div className="space-y-4">
                                {questions.map((question, index) => (
                                    <QuizCard
                                        key={question.id}
                                        question={question}
                                        index={index}
                                        selectedAnswer={answers[question.id]}
                                        showResult={true}
                                        isCorrect={question.isCorrect}
                                        onAnswer={() => { }}
                                    />
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="space-y-6">
                        {questions.length === 0 ? (
                            <div className="text-center py-12">
                                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600">No questions available for this quiz.</p>
                                <Link
                                    to="/e-learning/quizzes"
                                    className="inline-block mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                                >
                                    Back to Quizzes
                                </Link>
                            </div>
                        ) : (
                            questions.map((question, index) => (
                                <QuizCard
                                    key={question.id}
                                    question={question}
                                    index={index}
                                    selectedAnswer={answers[question.id]}
                                    showResult={false}
                                    onAnswer={handleAnswer}
                                />
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Confirm Submit Dialog */}
            {showConfirmDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Submit Quiz?</h3>
                            <button
                                onClick={() => setShowConfirmDialog(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <p className="text-gray-600 mb-6">
                            You have only answered <strong>{Object.keys(answers).length}</strong> of <strong>{questions.length}</strong> questions. Unanswered questions will be marked as incorrect.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowConfirmDialog(false)}
                                className="flex-1 px-4 py-2.5 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-medium rounded-lg transition-colors"
                            >
                                Go Back
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="flex-1 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
                            >
                                Submit Anyway
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
