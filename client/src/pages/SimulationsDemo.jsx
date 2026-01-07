import UTBeamAngleCalculator from '../components/ndt-sims/UT/BeamAngleCalc';
import MagneticLab from '../components/ndt-sims/MT/MagneticLab';
import PenetrantLab from '../components/ndt-sims/PT/PenetrantLab';
import RadiographyLab from '../components/ndt-sims/RT/RadiographyLab';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SimulationsDemo() {
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
                            <h1 className="text-3xl font-bold text-gray-900">Interactive NDT Simulations</h1>
                            <p className="mt-2 text-gray-600 max-w-3xl">
                                Explore interactive calculators and simulations to understand NDT physics and principles.
                                These tools help visualize complex concepts and perform real-world calculations.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Introduction Banner */}
                <div className="mb-8 p-6 bg-orange-50 border border-orange-200 rounded-lg">
                    <h2 className="text-lg font-semibold text-orange-900 mb-2">
                        🎓 Learning by Doing
                    </h2>
                    <p className="text-orange-800">
                        Interactive simulations allow you to experiment with different parameters and see immediate results.
                        Try adjusting the values below to understand how ultrasonic beam characteristics change with different materials and transducer configurations.
                    </p>
                </div>

                {/* Calculator */}
                <UTBeamAngleCalculator />

                {/* Educational Notes */}
                <div className="mt-8 grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-white rounded-lg border border-gray-200">
                        <h3 className="font-semibold text-gray-900 mb-3">📚 Understanding the Results</h3>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li><strong>Refracted Angle:</strong> The angle at which the ultrasonic beam travels through the test material</li>
                            <li><strong>Wavelength:</strong> Distance between wave peaks, affects defect detection resolution</li>
                            <li><strong>Near Field:</strong> Region where beam intensity fluctuates before stabilizing</li>
                            <li><strong>Beam Spread:</strong> How much the beam diverges, affects coverage area</li>
                        </ul>
                    </div>

                    <div className="p-6 bg-white rounded-lg border border-gray-200">
                        <h3 className="font-semibold text-gray-900 mb-3">💡 Practical Applications</h3>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li><strong>Probe Selection:</strong> Choose the right angle probe for specific defect orientations</li>
                            <li><strong>Critical Angle:</strong> Understand mode conversion and limitations</li>
                            <li><strong>Resolution:</strong> Higher frequency = smaller wavelength = better resolution</li>
                            <li><strong>Coverage:</strong> Balance between beam spread and focused inspection</li>
                        </ul>
                    </div>
                </div>

                {/* Magnetic Particle Simulation */}
                <div className="mt-8">
                    <MagneticLab />
                </div>

                {/* Penetrant Testing Simulation */}
                <div className="mt-8">
                    <PenetrantLab />
                </div>

                {/* Radiography Simulation */}
                <div className="mt-8">
                    <RadiographyLab />
                </div>

                {/* Coming Soon Section */}
                <div className="mt-8 p-6 bg-gray-100 rounded-lg border border-gray-300">
                    <h3 className="font-semibold text-gray-900 mb-4">🚀 Coming Soon</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 bg-white rounded-md">
                            <h4 className="font-medium text-gray-900 mb-1">A-Scan Simulator</h4>
                            <p className="text-sm text-gray-600">Interactive A-scan display with gain/DAC controls</p>
                        </div>
                        <div className="p-4 bg-white rounded-md">
                            <h4 className="font-medium text-gray-900 mb-1">RT Exposure Calculator</h4>
                            <p className="text-sm text-gray-600">Calculate exposure time and film density</p>
                        </div>
                        <div className="p-4 bg-white rounded-md">
                            <h4 className="font-medium text-gray-900 mb-1">MT Flux Visualizer</h4>
                            <p className="text-sm text-gray-600">3D magnetic field visualization</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
