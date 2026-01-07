import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, Clock, BookOpen, ChevronRight } from 'lucide-react';
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
            setFilters({
                methods: ['UT', 'RT', 'MT', 'PT', 'VT', 'ET'],
                levels: ['Level I', 'Level II', 'Level III']
            });
        } finally {
            setLoading(false);
        }
    };

    const methodInfo = {
        'UT': { name: 'Ultrasonic Testing', questions: 25 },
        'MT': { name: 'Magnetic Particle Testing', questions: 20 },
        'PT': { name: 'Liquid Penetrant Testing', questions: 20 },
        'RT': { name: 'Radiographic Testing', questions: 20 },
        'VT': { name: 'Visual Testing', questions: 20 },
        'ET': { name: 'Eddy Current Testing', questions: 20 },
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <Link
                        to="/e-learning"
                        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Hub
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Certification Practice</h1>
                    <p className="mt-4 text-xl text-gray-500 max-w-3xl font-light">
                        Test your NDT knowledge with ASNT-style practice questions.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                {/* Intro Stats */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                        <CheckCircle className="h-6 w-6 text-gray-900 mb-4" />
                        <h3 className="font-semibold text-gray-900 mb-1">Pass Requirement</h3>
                        <p className="text-gray-500 text-sm">70% score needed to pass mock exams</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                        <Clock className="h-6 w-6 text-gray-900 mb-4" />
                        <h3 className="font-semibold text-gray-900 mb-1">Timed Sessions</h3>
                        <p className="text-gray-500 text-sm">Simulate real exam pressure with timers</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                        <BookOpen className="h-6 w-6 text-gray-900 mb-4" />
                        <h3 className="font-semibold text-gray-900 mb-1">Instant Feedback</h3>
                        <p className="text-gray-500 text-sm">Detailed explanations for every question</p>
                    </div>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">
                    Select a Method
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(methodInfo).map(([code, info]) => {
                        const hasQuestions = info.questions > 0;

                        return (
                            <div
                                key={code}
                                className={`group bg-white rounded-xl border border-gray-200 p-8 transition-all ${hasQuestions
                                    ? 'hover:border-orange-300 hover:shadow-lg hover:-translate-y-1'
                                    : 'opacity-60 bg-gray-50'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <span className="text-4xl font-bold text-gray-200 group-hover:text-gray-300 transition-colors">
                                        {code}
                                    </span>
                                    {hasQuestions && (
                                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-medium">
                                            {info.questions} Qs
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 mb-4">{info.name}</h3>

                                {hasQuestions ? (
                                    <div className="space-y-3">
                                        {['Level I', 'Level II'].map(level => (
                                            <Link
                                                key={level}
                                                to={`/e-learning/quizzes/take?method=${code}&level=${encodeURIComponent(level)}&count=10`}
                                                className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 hover:bg-orange-50 text-gray-700 hover:text-orange-700 rounded-lg text-sm font-medium transition-colors"
                                            >
                                                {level} Assessment
                                                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-orange-500" />
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-400 italic">Coming soon</p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
