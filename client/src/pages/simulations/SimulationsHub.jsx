import { Link } from 'react-router-dom';
import { ArrowLeft, Zap, Magnet, Droplets, Radiation, ChevronRight } from 'lucide-react';

const simulations = [
    {
        id: 'ut',
        title: 'Ultrasonic Testing (UT)',
        description: 'Calculate beam angles, wavelengths, and near field lengths. Visualize how ultrasound travels through materials.',
        icon: Zap,
        color: 'blue',
        path: '/e-learning/simulations/ut',
        status: 'Live'
    },
    {
        id: 'mt',
        title: 'Magnetic Particle (MT)',
        description: 'Interactive yoke simulation. Position and magnetize to reveal hidden cracks through particle accumulation.',
        icon: Magnet,
        color: 'red',
        path: '/e-learning/simulations/mt',
        status: 'Live'
    },
    {
        id: 'pt',
        title: 'Penetrant Testing (PT)',
        description: 'Step-by-step process flow. Learn the 6 stages of dye penetrant inspection from cleaning to inspection.',
        icon: Droplets,
        color: 'pink',
        path: '/e-learning/simulations/pt',
        status: 'Live'
    },
    {
        id: 'rt',
        title: 'Radiography (RT)',
        description: 'Geometric unsharpness (Ug) calculator. See how source size and distances affect radiograph clarity.',
        icon: Radiation,
        color: 'purple',
        path: '/e-learning/simulations/rt',
        status: 'Live'
    }
];

const colorClasses = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-200 hover:border-blue-400', icon: 'text-blue-600', badge: 'bg-blue-100 text-blue-700' },
    red: { bg: 'bg-red-50', border: 'border-red-200 hover:border-red-400', icon: 'text-red-600', badge: 'bg-red-100 text-red-700' },
    pink: { bg: 'bg-pink-50', border: 'border-pink-200 hover:border-pink-400', icon: 'text-pink-600', badge: 'bg-pink-100 text-pink-700' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200 hover:border-purple-400', icon: 'text-purple-600', badge: 'bg-purple-100 text-purple-700' }
};

export default function SimulationsHub() {
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
                            <Zap className="h-8 w-8 text-orange-600" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Interactive Simulations</h1>
                            <p className="mt-2 text-gray-600 max-w-3xl">
                                Explore NDT physics through hands-on simulations. Each method has its own interactive lab.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Simulation Cards */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-2 gap-8">
                    {simulations.map((sim) => {
                        const Icon = sim.icon;
                        const colors = colorClasses[sim.color];

                        return (
                            <Link
                                key={sim.id}
                                to={sim.path}
                                className={`group relative bg-white rounded-2xl p-8 border-2 ${colors.border} hover:shadow-xl transition-all duration-300`}
                            >
                                {/* Badge */}
                                <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${colors.badge}`}>
                                    {sim.status}
                                </span>

                                {/* Icon */}
                                <div className={`inline-flex p-4 rounded-xl mb-6 ${colors.bg}`}>
                                    <Icon className={`h-10 w-10 ${colors.icon}`} />
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    {sim.title}
                                    <ChevronRight className="h-5 w-5 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {sim.description}
                                </p>

                                {/* Start Button */}
                                <div className="mt-6 pt-4 border-t border-gray-100">
                                    <span className={`inline-flex items-center gap-2 font-semibold ${colors.icon} group-hover:gap-3 transition-all`}>
                                        Start Simulation <ChevronRight className="h-4 w-4" />
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
