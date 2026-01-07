import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const simulations = [
    {
        id: 'ut',
        title: 'Ultrasonic Testing (UT)',
        description: 'Calculate beam angles, wavelengths, and near field lengths. Visualize how ultrasound travels through materials.',
        path: '/e-learning/simulations/ut',
        status: 'Available'
    },
    {
        id: 'mt',
        title: 'Magnetic Particle (MT)',
        description: 'Interactive yoke simulation. Position and magnetize to reveal hidden cracks through particle accumulation.',
        path: '/e-learning/simulations/mt',
        status: 'Available'
    },
    {
        id: 'pt',
        title: 'Penetrant Testing (PT)',
        description: 'Step-by-step process flow. Learn the 6 stages of dye penetrant inspection from cleaning to inspection.',
        path: '/e-learning/simulations/pt',
        status: 'Available'
    },
    {
        id: 'rt',
        title: 'Radiography (RT)',
        description: 'Geometric unsharpness (Ug) calculator. See how source size and distances affect radiograph clarity.',
        path: '/e-learning/simulations/rt',
        status: 'Available'
    }
];

export default function SimulationsHub() {
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
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Simulation Lab</h1>
                    <p className="mt-4 text-xl text-gray-500 max-w-3xl font-light">
                        Explore NDT physics through hands-on simulations. select a method below to enter the virtual lab.
                    </p>
                </div>
            </div>

            {/* Simulation Cards */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 gap-8">
                    {simulations.map((sim) => (
                        <Link
                            key={sim.id}
                            to={sim.path}
                            className="group bg-white rounded-xl p-8 border border-gray-200 hover:border-orange-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="flex flex-col h-full justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                                            {sim.title}
                                        </h3>
                                        <span className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-full border border-gray-100">
                                            {sim.status}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed mb-8">
                                        {sim.description}
                                    </p>
                                </div>
                                <div className="flex items-center text-sm font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                                    Launch Simulation
                                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
