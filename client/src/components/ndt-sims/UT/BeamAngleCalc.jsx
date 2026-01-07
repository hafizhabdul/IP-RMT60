import { useState } from 'react';
import { Calculator, Waves, Info } from 'lucide-react';
import BeamVisualization from './BeamVisualization';

/**
 * UT Beam Angle Calculator
 * Calculates ultrasonic beam parameters based on material properties and transducer specs
 * 
 * Formulas:
 * - Snell's Law: sin(θ1)/V1 = sin(θ2)/V2
 * - Near Field Length: N = (D^2 × f) / (4 × V)
 * - Beam Spread: sin(θ) = 1.22 × λ / D = 1.22 × V / (f × D)
 */
export default function UTBeamAngleCalculator() {
    const [inputs, setInputs] = useState({
        materialVelocity: 5900, // m/s (Steel longitudinal wave)
        wedgeVelocity: 2730,    // m/s (Perspex/Acrylic)
        frequency: 5,           // MHz
        wedgeAngle: 36,         // degrees
        crystalDiameter: 10,    // mm
    });

    const [results, setResults] = useState(null);

    // Common materials preset
    const materialPresets = {
        steel: { name: 'Steel (Longitudinal)', velocity: 5900 },
        steelShear: { name: 'Steel (Shear)', velocity: 3230 },
        aluminum: { name: 'Aluminum', velocity: 6320 },
        perspex: { name: 'Perspex/Acrylic', velocity: 2730 },
    };

    const handleInputChange = (field, value) => {
        setInputs(prev => ({ ...prev, [field]: parseFloat(value) || 0 }));
    };

    const loadPreset = (preset) => {
        setInputs(prev => ({
            ...prev,
            materialVelocity: materialPresets[preset].velocity
        }));
    };

    const calculate = () => {
        const { materialVelocity, wedgeVelocity, frequency, wedgeAngle, crystalDiameter } = inputs;

        // Convert to proper units
        const freqHz = frequency * 1e6; // MHz to Hz
        const diameterM = crystalDiameter / 1000; // mm to m
        const wedgeAngleRad = (wedgeAngle * Math.PI) / 180;

        // Snell's Law: Calculate refraction angle in material
        const sinRefractedAngle = (materialVelocity / wedgeVelocity) * Math.sin(wedgeAngleRad);

        // Check for critical angle
        if (sinRefractedAngle > 1) {
            setResults({
                error: 'Critical angle exceeded! Reduce wedge angle or change material.',
                criticalAngle: Math.asin(wedgeVelocity / materialVelocity) * (180 / Math.PI)
            });
            return;
        }

        const refractedAngle = Math.asin(sinRefractedAngle);
        const refractedAngleDeg = (refractedAngle * 180) / Math.PI;

        // Wavelength
        const wavelength = materialVelocity / freqHz;

        // Near Field Length (N)
        const nearFieldLength = (Math.pow(diameterM, 2) * freqHz) / (4 * materialVelocity);

        // Beam Spread Half Angle
        const beamSpreadSin = (1.22 * wavelength) / diameterM;
        const beamSpreadHalfAngle = Math.asin(Math.min(beamSpreadSin, 1)) * (180 / Math.PI);

        setResults({
            refractedAngle: refractedAngleDeg.toFixed(2),
            wavelength: (wavelength * 1000).toFixed(3), // convert to mm
            nearFieldLength: (nearFieldLength * 1000).toFixed(2), // convert to mm
            beamSpreadHalfAngle: beamSpreadHalfAngle.toFixed(2),
            beamSpreadTotal: (beamSpreadHalfAngle * 2).toFixed(2),
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-50 rounded-lg">
                    <Calculator className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">UT Beam Angle Calculator</h2>
                    <p className="text-sm text-gray-600">Calculate ultrasonic beam parameters and refraction angles</p>
                </div>
            </div>

            {/* Material Presets */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Material Presets
                </label>
                <div className="flex flex-wrap gap-2">
                    {Object.entries(materialPresets).map(([key, preset]) => (
                        <button
                            key={key}
                            onClick={() => loadPreset(key)}
                            className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            {preset.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Input Section */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Material Velocity (m/s)
                    </label>
                    <input
                        type="number"
                        value={inputs.materialVelocity}
                        onChange={(e) => handleInputChange('materialVelocity', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        step="10"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Wedge Velocity (m/s)
                    </label>
                    <input
                        type="number"
                        value={inputs.wedgeVelocity}
                        onChange={(e) => handleInputChange('wedgeVelocity', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        step="10"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Frequency (MHz)
                    </label>
                    <input
                        type="number"
                        value={inputs.frequency}
                        onChange={(e) => handleInputChange('frequency', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        step="0.5"
                        min="0.5"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Wedge Angle (degrees)
                    </label>
                    <input
                        type="number"
                        value={inputs.wedgeAngle}
                        onChange={(e) => handleInputChange('wedgeAngle', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        step="1"
                        min="0"
                        max="90"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Crystal Diameter (mm)
                    </label>
                    <input
                        type="number"
                        value={inputs.crystalDiameter}
                        onChange={(e) => handleInputChange('crystalDiameter', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        step="1"
                        min="1"
                    />
                </div>
            </div>

            {/* Calculate Button */}
            <button
                onClick={calculate}
                className="w-full md:w-auto px-6 py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
            >
                <Waves className="h-5 w-5" />
                Calculate Beam Parameters
            </button>

            {/* Results Section */}
            {results && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    {results.error ? (
                        <div className="flex items-start gap-3 text-red-700">
                            <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="font-semibold">{results.error}</p>
                                {results.criticalAngle && (
                                    <p className="text-sm mt-1">
                                        Critical angle for this material combination: <strong>{results.criticalAngle.toFixed(2)}°</strong>
                                    </p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Waves className="h-5 w-5 text-orange-600" />
                                Calculated Results
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-white p-4 rounded-md border border-gray-200">
                                    <p className="text-sm text-gray-600 mb-1">Refracted Beam Angle</p>
                                    <p className="text-2xl font-bold text-orange-600">{results.refractedAngle}°</p>
                                </div>
                                <div className="bg-white p-4 rounded-md border border-gray-200">
                                    <p className="text-sm text-gray-600 mb-1">Wavelength</p>
                                    <p className="text-2xl font-bold text-orange-600">{results.wavelength} mm</p>
                                </div>
                                <div className="bg-white p-4 rounded-md border border-gray-200">
                                    <p className="text-sm text-gray-600 mb-1">Near Field Length</p>
                                    <p className="text-2xl font-bold text-orange-600">{results.nearFieldLength} mm</p>
                                </div>
                                <div className="bg-white p-4 rounded-md border border-gray-200">
                                    <p className="text-sm text-gray-600 mb-1">Beam Spread (Half Angle)</p>
                                    <p className="text-2xl font-bold text-orange-600">{results.beamSpreadHalfAngle}°</p>
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div className="mt-4 p-3 bg-orange-50 rounded-md">
                                <p className="text-sm text-orange-900">
                                    <strong>Total Beam Spread:</strong> {results.beamSpreadTotal}° &nbsp;|&nbsp;
                                    <strong>Wavelength:</strong> λ = V/f = {results.wavelength} mm
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Interactive Beam Visualization */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Waves className="h-5 w-5 text-orange-600" />
                    Beam Refraction Visualization
                </h3>
                <BeamVisualization inputs={inputs} results={results} />
                <p className="text-xs text-gray-500 mt-2 text-center">
                    Interactive visualization showing ultrasonic beam path through wedge and material interface
                </p>
            </div>

            {/* Formula Reference */}
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    Formulas Used
                </h4>
                <ul className="text-sm text-amber-900 space-y-1">
                    <li><strong>Snell's Law:</strong> sin(θ₁)/V₁ = sin(θ₂)/V₂</li>
                    <li><strong>Near Field:</strong> N = (D² × f) / (4 × V)</li>
                    <li><strong>Beam Spread:</strong> sin(θ) = 1.22 × λ / D</li>
                    <li><strong>Wavelength:</strong> λ = V / f</li>
                </ul>
            </div>
        </div>
    );
}
