import { Trophy, Target, Clock, TrendingUp, LogIn, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PASSING_SCORE } from '@/config/elearning';

export default function QuizResults({ results, onRetry, onBackToHub }) {
    const { totalQuestions, correctAnswers, score, passed, timeSpent, isLocalResult, answeredQuestions } = results;

    const formatTime = (seconds) => {
        if (!seconds) return 'N/A';
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Guest/Local results (not logged in)
    if (isLocalResult) {
        return (
            <div className="max-w-2xl mx-auto">
                {/* Completion Card */}
                <div className="rounded-xl p-8 text-center bg-blue-50 border-2 border-blue-200">
                    <div className="inline-flex p-4 rounded-full mb-4 bg-blue-100">
                        <CheckCircle className="h-12 w-12 text-blue-600" />
                    </div>

                    <h2 className="text-3xl font-bold mb-2 text-blue-900">
                        Quiz Completed!
                    </h2>

                    <p className="text-lg mb-4 text-blue-700">
                        You answered {answeredQuestions} of {totalQuestions} questions.
                    </p>

                    <div className="text-5xl font-bold mb-2 text-blue-600">
                        {answeredQuestions}/{totalQuestions}
                    </div>
                    <p className="text-gray-600">Questions Answered</p>
                </div>

                {/* Login Prompt */}
                <div className="mt-6 p-6 bg-orange-50 border-2 border-orange-200 rounded-xl text-center">
                    <LogIn className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-orange-900 mb-2">
                        Want to See the Correct Answers?
                    </h3>
                    <p className="text-orange-800 mb-4">
                        Log in or register to see correct answers, explanations, and save your learning progress.
                    </p>
                    <Link
                        to="/login?redirect=/e-learning/quizzes"
                        className="inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
                    >
                        Log In to See Results
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                        <Target className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-gray-900">{answeredQuestions}</p>
                        <p className="text-sm text-gray-600">Answered</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                        <Clock className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-gray-900">{formatTime(timeSpent)}</p>
                        <p className="text-sm text-gray-600">Time</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8">
                    <button
                        onClick={onRetry}
                        className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
                    >
                        Try Again
                    </button>
                    <button
                        onClick={onBackToHub}
                        className="flex-1 px-6 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-lg transition-colors"
                    >
                        Back to Quizzes
                    </button>
                </div>
            </div>
        );
    }

    // Authenticated results (with scoring)
    return (
        <div className="max-w-2xl mx-auto">
            {/* Score Card */}
            <div className={`rounded-xl p-8 text-center ${passed ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}`}>
                <div className={`inline-flex p-4 rounded-full mb-4 ${passed ? 'bg-green-100' : 'bg-red-100'}`}>
                    <Trophy className={`h-12 w-12 ${passed ? 'text-green-600' : 'text-red-600'}`} />
                </div>

                <h2 className={`text-3xl font-bold mb-2 ${passed ? 'text-green-900' : 'text-red-900'}`}>
                    {passed ? 'Congratulations!' : 'Keep Practicing!'}
                </h2>

                <p className={`text-lg mb-4 ${passed ? 'text-green-700' : 'text-red-700'}`}>
                    {passed
                        ? 'You passed the quiz! Great understanding of the material.'
                        : `You need ${PASSING_SCORE}% to pass. Review the material and try again.`}
                </p>

                {/* Score Display */}
                <div className={`text-6xl font-bold mb-2 ${passed ? 'text-green-600' : 'text-red-600'}`}>
                    {Math.round(score)}%
                </div>
                <p className="text-gray-600">{correctAnswers} of {totalQuestions} correct</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                    <Target className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{correctAnswers}</p>
                    <p className="text-sm text-gray-600">Correct</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                    <TrendingUp className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{totalQuestions - correctAnswers}</p>
                    <p className="text-sm text-gray-600">Incorrect</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                    <Clock className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{formatTime(timeSpent)}</p>
                    <p className="text-sm text-gray-600">Time</p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
                <button
                    onClick={onRetry}
                    className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
                >
                    Try Again
                </button>
                <button
                    onClick={onBackToHub}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-lg transition-colors"
                >
                    Back to Quizzes
                </button>
            </div>

            {/* Pass Info */}
            <p className="text-center text-sm text-gray-500 mt-4">
                Passing score: {PASSING_SCORE}% | Based on ASNT certification standards
            </p>
        </div>
    );
}

