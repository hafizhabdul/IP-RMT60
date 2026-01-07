import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import '../styles/enhancements.css';

export default function ELearningHub() {
    const features = [
        {
            title: 'Simulation Lab',
            description: 'Interactive physics simulations for UT, MT, PT, RT',
            link: '/e-learning/simulations',
            action: 'Launch Lab'
        },
        {
            title: 'Knowledge Base',
            description: 'Comprehensive technical articles and study materials',
            link: '/e-learning/content',
            action: 'Browse Articles'
        },
        {
            title: 'Certification Prep',
            description: 'ASNT-style practice quizzes and assessments',
            link: '/e-learning/quizzes',
            action: 'Start Practice'
        },
        {
            title: 'Learning Paths',
            description: 'Structured curriculum for Level I, II, and III',
            link: '/e-learning/paths',
            action: 'Coming Soon',
            disabled: true
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Minimal Hero */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">
                        E-Learning Hub
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl font-light leading-relaxed">
                        Master Non-Destructive Testing through interactive simulation,
                        theory, and verified practice assessments.
                    </p>
                </div>
            </div>

            {/* Main Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <Link
                            key={index}
                            to={feature.disabled ? '#' : feature.link}
                            className={`group bg-white rounded-xl p-8 border border-gray-200 transition-all duration-300 ${feature.disabled
                                    ? 'opacity-60 cursor-not-allowed'
                                    : 'hover:border-orange-200 hover:shadow-lg hover:-translate-y-1'
                                }`}
                        >
                            <div className="flex flex-col h-full justify-between">
                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                        {feature.description}
                                    </p>
                                </div>
                                <div className="flex items-center text-sm font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                                    {feature.action}
                                    {!feature.disabled && (
                                        <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Available Methods List */}
                <div className="mt-20">
                    <h2 className="text-xl font-semibold text-gray-900 mb-8 pb-4 border-b border-gray-200">
                        Available Technologies
                    </h2>
                    <div className="grid md:grid-cols-3 gap-x-8 gap-y-4 text-gray-600">
                        {[
                            'Ultrasonic Testing (UT)',
                            'Magnetic Particle (MT)',
                            'Liquid Penetrant (PT)',
                            'Radiographic Testing (RT)',
                            'Visual Testing (VT)',
                            'Eddy Current (ET)'
                        ].map((method) => (
                            <div key={method} className="flex items-center group">
                                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-3 group-hover:bg-orange-500 transition-colors"></span>
                                {method}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
