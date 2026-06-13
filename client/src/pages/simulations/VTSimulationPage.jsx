import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import VisualLab from '../../components/ndt-sims/VT/VisualLab';

export default function VTSimulationPage() {
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

                <VisualLab />
            </div>
        </div>
    );
}
