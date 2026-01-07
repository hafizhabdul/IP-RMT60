import { Link } from 'react-router-dom';
import { BookOpen, Calculator, FileText, Award, ChevronRight } from 'lucide-react';

export default function ELearningHub() {
    const features = [
        {
            icon: Calculator,
            title: 'Interactive Simulations',
            description: 'Experiment with NDT physics through interactive calculators and visualizations',
            link: '/e-learning/simulations',
            badge: 'Live',
            color: 'orange'
        },
        {
            icon: FileText,
            title: 'Educational Content',
            description: 'Comprehensive articles on NDT principles, techniques, and standards',
            link: '/e-learning/content',
            badge: 'Live',
            color: 'green'
        },
        {
            icon: BookOpen,
            title: 'Practice Quizzes',
            description: 'Test your knowledge with ASNT-style practice questions',
            link: '/e-learning/quizzes',
            badge: 'Live',
            color: 'purple'
        },
        {
            icon: Award,
            title: 'Learning Paths',
            description: 'Structured certification paths for Level I, II, and III',
            link: '/e-learning/paths',
            badge: 'Planned',
            color: 'gray'
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-orange-500 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold flex items-center gap-2">
                            E-LEARNING PLATFORM
                            <span className="text-xs bg-white text-orange-600 px-1.5 py-0.5 rounded font-bold">BETA</span>
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Interactive NDT Learning Hub
                    </h1>
                    <p className="text-xl text-orange-100 max-w-3xl">
                        Master Non-Destructive Testing through interactive simulations, comprehensive theory,
                        and hands-on practice exercises. Learn at your own pace with our modern e-learning platform.
                    </p>
                </div>
            </div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        const isActive = feature.badge === 'Live';

                        const colorClasses = {
                            green: {
                                border: 'border-green-200 hover:border-green-400',
                                bg: 'bg-green-50',
                                text: 'text-green-600',
                                badgeBg: 'bg-green-100',
                                badgeText: 'text-green-700'
                            },
                            purple: {
                                border: 'border-purple-200 hover:border-purple-400',
                                bg: 'bg-purple-50',
                                text: 'text-purple-600',
                                badgeBg: 'bg-purple-100',
                                badgeText: 'text-purple-700'
                            },
                            orange: {
                                border: 'border-orange-200 hover:border-orange-400',
                                bg: 'bg-orange-50',
                                text: 'text-orange-600',
                                badgeBg: 'bg-orange-100',
                                badgeText: 'text-orange-700'
                            },
                            gray: {
                                border: 'border-gray-200',
                                bg: 'bg-gray-50',
                                text: 'text-gray-400',
                                badgeBg: 'bg-gray-100',
                                badgeText: 'text-gray-600'
                            }
                        };

                        const colors = colorClasses[feature.color];

                        return (
                            <Link
                                key={index}
                                to={isActive ? feature.link : '#'}
                                className={`group relative bg-white rounded-xl p-8 border-2 transition-all ${isActive
                                    ? `${colors.border} hover:shadow-lg cursor-pointer`
                                    : 'border-gray-200 opacity-75 cursor-not-allowed'
                                    }`}
                            >
                                {/* Badge */}
                                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${colors.badgeBg} ${colors.badgeText}`}>
                                    {feature.badge}
                                </div>

                                {/* Icon */}
                                <div className={`inline-flex p-4 rounded-lg mb-4 ${colors.bg}`}>
                                    <Icon className={`h-8 w-8 ${colors.text}`} />
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                                    {feature.title}
                                    {isActive && (
                                        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                                    )}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </Link>
                        );
                    })}
                </div>

                {/* Info Banner */}
                <div className="mt-12 p-6 bg-orange-50 border border-orange-200 rounded-lg">
                    <h3 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        About This Platform
                    </h3>
                    <p className="text-orange-800 text-sm">
                        Our E-Learning platform is designed to complement your hands-on NDT training with
                        interactive theory, physics simulations, and practice assessments. Content is based
                        on ASNT, and industry best practices from leading NDT education platforms.
                    </p>
                </div>

                {/* What's Available */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Currently Available</h2>
                    <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
                        <div className="p-4 flex items-start gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-lg">
                                🔊
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">Ultrasonic Testing (UT)</h4>
                                <p className="text-sm text-gray-600">25 quiz questions • Beam angle calculator • Comprehensive articles</p>
                            </div>
                        </div>
                        <div className="p-4 flex items-start gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-lg">
                                🧲
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">Magnetic Particle Testing (MT)</h4>
                                <p className="text-sm text-gray-600">20 quiz questions • Interactive yoke simulation • Educational articles</p>
                            </div>
                        </div>
                        <div className="p-4 flex items-start gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-lg">
                                💧
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">Liquid Penetrant Testing (PT)</h4>
                                <p className="text-sm text-gray-600">20 quiz questions • Process flow simulation • Step-by-step guides</p>
                            </div>
                        </div>
                        <div className="p-4 flex items-start gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-lg">
                                ☢️
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">Radiographic Testing (RT)</h4>
                                <p className="text-sm text-gray-600">20 quiz questions • Ug calculator simulation • Technical articles</p>
                            </div>
                        </div>
                        <div className="p-4 flex items-start gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-lg">
                                👁️
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">Visual Testing (VT)</h4>
                                <p className="text-sm text-gray-600">20 quiz questions • Weld inspection guides • Equipment articles</p>
                            </div>
                        </div>
                        <div className="p-4 flex items-start gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center text-lg">
                                ⚡
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">Eddy Current Testing (ET)</h4>
                                <p className="text-sm text-gray-600">20 quiz questions • Probe types guide • Depth penetration theory</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
