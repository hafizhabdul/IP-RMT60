import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import UTFlawScanner from '../../components/ndt-sims/UT/UTFlawScanner';
import UTBeamAngleCalculator from '../../components/ndt-sims/UT/BeamAngleCalc';

export default function UTSimulationPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link
                    to="/e-learning/simulations"
                    className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Kembali ke Simulations Hub
                </Link>

                <div className="space-y-8">
                    {/* Flaw Scanner - Main interactive simulation */}
                    <UTFlawScanner />

                    {/* Beam Calculator - Technical tool */}
                    <UTBeamAngleCalculator />
                </div>
            </div>
        </div>
    );
}
