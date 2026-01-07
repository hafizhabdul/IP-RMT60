import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import UTFlawScanner from '../../components/ndt-sims/UT/UTFlawScanner';
import UTBeamAngleCalculator from '../../components/ndt-sims/UT/BeamAngleCalc';

export default function UTSimulationPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Minimal Header */}
            <div className="bg-white border-b border-gray-200 mb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center gap-4">
                        <Link
                            to="/e-learning/simulations"
                            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Ultrasonic Testing Lab</h1>
                            <p className="text-sm text-gray-500">Angle Beam & Flaw Detection Simulation</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-8">
                    {/* Flaw Scanner - Main interactive simulation */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-200 bg-gray-50">
                            <h2 className="text-lg font-semibold text-gray-900">Digital Flaw Detector</h2>
                            <p className="text-sm text-gray-500">Simulate probe movement and A-scan interpretation</p>
                        </div>
                        <div className="p-6">
                            <UTFlawScanner />
                        </div>
                    </div>

                    {/* Beam Calculator - Technical tool */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-200 bg-gray-50">
                            <h2 className="text-lg font-semibold text-gray-900">Beam Angle Calculator</h2>
                            <p className="text-sm text-gray-500">Calculate refraction angles and skip distance</p>
                        </div>
                        <div className="p-6">
                            <UTBeamAngleCalculator />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
