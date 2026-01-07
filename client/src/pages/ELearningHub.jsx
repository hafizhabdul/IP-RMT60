import { Link } from 'react-router-dom';
import { BookOpen, Calculator, FileText, Award, ChevronRight, Sparkles, Trophy, Star, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { GamificationService } from '../services/GamificationService';

function UserStats() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        setStats(GamificationService.getState());
    }, []);

    if (!stats) return null;

    const nextLevelXP = GamificationService.getNextLevelXP(stats.level);
    const progress = (stats.xp / nextLevelXP) * 100;
    const title = GamificationService.getLevelTitle(stats.level);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col md:flex-row items-center gap-6">

                {/* ID Card */}
                <div className="flex items-center gap-4 min-w-[250px] border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 md:pr-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md">
                        {stats.level}
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg">Inspector Trainee</h3>
                        <p className="text-sm text-orange-600 font-medium">{title}</p>
                    </div>
                </div>

                {/* Progress Stats */}
                <div className="flex-1 w-full space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="font-semibold text-gray-700">Level Progress</span>
                        <span className="text-gray-500">{stats.xp} / {nextLevelXP} XP</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-1000 ease-out"
                            style={{ width: `${Math.min(100, progress)}%` }}
                        ></div>
                    </div>
                    <div className="flex gap-4 text-xs text-gray-500 mt-2">
                        <span className="flex items-center gap-1">
                            <Trophy className="h-3 w-3 text-yellow-500" /> Need {nextLevelXP - stats.xp} XP for Level {stats.level + 1}
                        </span>
                    </div>
                </div>

                {/* Badges / Streak */}
                <div className="flex gap-4 min-w-[200px] justify-end">
                    <div className="text-center p-2 bg-yellow-50 rounded-lg border border-yellow-100">
                        <div className="text-xl font-bold text-yellow-600 flex justify-center items-center gap-1">
                            {stats.streak} <Zap className="h-4 w-4 fill-yellow-500" />
                        </div>
                        <div className="text-[10px] uppercase font-bold text-yellow-700 tracking-wider">Day Streak</div>
                    </div>
                    <div className="text-center p-2 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="text-xl font-bold text-blue-600 flex justify-center items-center gap-1">
                            {stats.badges.length} <Award className="h-4 w-4 fill-blue-500" />
                        </div>
                        <div className="text-[10px] uppercase font-bold text-blue-700 tracking-wider">Badges</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

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
            color: 'orange'
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <div className="bg-orange-500 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                            <Sparkles className="h-8 w-8" />
                        </div>
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

            {/* User Stats & Gamification */}
            <UserStats />

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        const isActive = feature.badge === 'Live';

                        // Define color classes statically
                        const colorClasses = {
                            blue: {
                                border: 'border-blue-200 hover:border-blue-400',
                                bg: 'bg-blue-50',
                                text: 'text-blue-600',
                                badgeBg: 'bg-blue-100',
                                badgeText: 'text-blue-700'
                            },
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
                                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${feature.badge === 'Live'
                                    ? `${colors.badgeBg} ${colors.badgeText}`
                                    : 'bg-gray-100 text-gray-600'
                                    }`}>
                                    {feature.badge}
                                </div>

                                {/* Icon */}
                                <div className={`inline-flex p-4 rounded-lg mb-4 ${isActive ? colors.bg : 'bg-gray-50'
                                    }`}>
                                    <Icon className={`h-8 w-8 ${isActive ? colors.text : 'text-gray-400'
                                        }`} />
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
                        on ASNT, ISO 9712, and industry best practices from leading NDT education platforms.
                    </p>
                </div>

                {/* What's Available */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Currently Available</h2>
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                    <Calculator className="h-4 w-4 text-orange-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">UT Beam Angle Calculator</h4>
                                    <p className="text-sm text-gray-600">
                                        Calculate refraction angles, near field length, beam spread, and wavelength
                                        for ultrasonic testing with material presets.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Coming Soon */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Coming Soon</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <h4 className="font-medium text-gray-900 mb-1">A-Scan Simulator</h4>
                            <p className="text-sm text-gray-600">Interactive waveform visualization</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <h4 className="font-medium text-gray-900 mb-1">RT Exposure Calculator</h4>
                            <p className="text-sm text-gray-600">Radiography exposure parameters</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <h4 className="font-medium text-gray-900 mb-1">Practice Exam System</h4>
                            <p className="text-sm text-gray-600">ASNT-style practice questions</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
