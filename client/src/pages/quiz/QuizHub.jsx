import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Beaker, CheckCircle, Clock, Award, ChevronRight } from 'lucide-react';
import { getQuizFilters } from '../../services/quizService';

export default function QuizHub() {
    const [filters, setFilters] = useState({ methods: [], levels: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFilters();
    }, []);

    const loadFilters = async () => {
        try {
            const response = await getQuizFilters();
            setFilters(response.data || { methods: [], levels: [] });
        } catch (err) {
            console.error('Failed to load filters:', err);
            // Set default filters if API fails
            setFilters({
                methods: ['UT', 'RT', 'MT', 'PT', 'VT', 'ET'],
                levels: ['Level I', 'Level II', 'Level III']
            });
        } finally {
            setLoading(false);
        }
    };

    const methodInfo = {
        'UT': { name: 'Ultrasonic Testing', icon: '🔊', color: 'blue', questions: 15 },
        'RT': { name: 'Radiographic Testing', icon: '☢️', color: 'purple', questions: 0 },
        'MT': { name: 'Magnetic Particle Testing', icon: '🧲', color: 'red', questions: 0 },
        'PT': { name: 'Liquid Penetrant Testing', icon: '💧', color: 'green', questions: 0 },
        'VT': { name: 'Visual Testing', icon: '👁️', color: 'amber', questions: 0 },
        'ET': { name: 'Eddy Current Testing', icon: '⚡', color: 'cyan', questions: 0 },
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Link
                        to="/e-learning"
                        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Kembali ke E-Learning Hub
                    </Link>
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-orange-50 rounded-lg">
                            <BookOpen className="h-8 w-8 text-orange-600" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Practice Quizzes</h1>
                            <p className="mt-2 text-gray-600 max-w-3xl">
                                Test your NDT knowledge with ASNT-style practice questions.
                                Choose your method and certification level to get started.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Info Banner */}
                <div className="mb-8 p-6 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-start gap-4">
                        <Award className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                        <div>
                            <h2 className="text-lg font-semibold text-orange-900 mb-2">
                                Prepare for Certification
                            </h2>
                            <p className="text-orange-800">
                                Our practice quizzes are designed to help you prepare for ASNT SNT-TC-1A and ISO 9712
                                certification exams. Questions cover theoretical knowledge required for each level.
                                <span className="font-semibold"> Passing score: 70%</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* NDT Methods Grid */}
                <h2 className="text-xl font-bold text-gray-900 mb-4">Select NDT Method</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                    {Object.entries(methodInfo).map(([code, info]) => {
                        const hasQuestions = info.questions > 0;

                        return (
                            <div
                                key={code}
                                className={`bg-white rounded-lg border-2 p-6 transition-all ${hasQuestions
                                        ? 'border-gray-200 hover:border-orange-400 hover:shadow-lg cursor-pointer'
                                        : 'border-gray-100 opacity-60'
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <span className="text-3xl">{info.icon}</span>
                                    {hasQuestions ? (
                                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                                            {info.questions} Questions
                                        </span>
                                    ) : (
                                        <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs font-semibold rounded-full">
                                            Coming Soon
                                        </span>
                                    )}
                                </div>

                                <h3 className="font-bold text-gray-900 mb-1">{code}</h3>
                                <p className="text-sm text-gray-600 mb-4">{info.name}</p>

                                {hasQuestions ? (
                                    <div className="space-y-2">
                                        {['Level I', 'Level II'].map(level => (
                                            <Link
                                                key={level}
                                                to={`/e-learning/quizzes/take?method=${code}&level=${encodeURIComponent(level)}&count=10`}
                                                className="flex items-center justify-between px-3 py-2 bg-gray-50 hover:bg-orange-50 rounded-lg text-sm transition-colors group"
                                            >
                                                <span className="text-gray-700">{level}</span>
                                                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-xs text-gray-400 italic">Questions coming soon...</p>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Quiz Features */}
                <h2 className="text-xl font-bold text-gray-900 mb-4">Quiz Features</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                            <CheckCircle className="h-5 w-5 text-orange-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Instant Feedback</h3>
                        <p className="text-sm text-gray-600">
                            Get immediate results with detailed explanations for each question after submission.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                            <Clock className="h-5 w-5 text-orange-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Time Tracking</h3>
                        <p className="text-sm text-gray-600">
                            Monitor your time to prepare for the actual certification exam time constraints.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                            <Beaker className="h-5 w-5 text-orange-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Randomized Questions</h3>
                        <p className="text-sm text-gray-600">
                            Questions are shuffled each time for a fresh practice experience.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
