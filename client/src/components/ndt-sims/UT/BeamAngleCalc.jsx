import { useState, useEffect } from 'react';
import { Calculator, Waves, Info, Zap, ArrowRight } from 'lucide-react';

/**
 * UT Beam Angle Calculator - Enhanced Interactive Version
 * Calculates ultrasonic beam parameters with real-time visualization
 */
export default function UTBeamAngleCalculator() {
    const [inputs, setInputs] = useState({
        materialVelocity: 5900,
        wedgeVelocity: 2730,
        frequency: 5,
        wedgeAngle: 36,
        crystalDiameter: 10,
    });

    const [results, setResults] = useState(null);
    const [activePreset, setActivePreset] = useState('steel');

    const materialPresets = {
        steel: { name: 'Steel (Long.)', velocity: 5900, color: 'blue' },
        steelShear: { name: 'Steel (Shear)', velocity: 3230, color: 'indigo' },
        aluminum: { name: 'Aluminum', velocity: 6320, color: 'gray' },
        stainless: { name: 'Stainless Steel', velocity: 5800, color: 'slate' },
    };

    const handleInputChange = (field, value) => {
        setInputs(prev => ({ ...prev, [field]: parseFloat(value) || 0 }));
    };

    const loadPreset = (preset) => {
        setActivePreset(preset);
        setInputs(prev => ({
            ...prev,
            materialVelocity: materialPresets[preset].velocity
        }));
    };

    // Auto-calculate on input change
    useEffect(() => {
        calculate();
    }, [inputs]);

    const calculate = () => {
        const { materialVelocity, wedgeVelocity, frequency, wedgeAngle, crystalDiameter } = inputs;

        const freqHz = frequency * 1e6;
        const diameterM = crystalDiameter / 1000;
        const wedgeAngleRad = (wedgeAngle * Math.PI) / 180;

        const sinRefractedAngle = (materialVelocity / wedgeVelocity) * Math.sin(wedgeAngleRad);

        if (sinRefractedAngle > 1) {
            setResults({
                error: 'Critical angle exceeded!',
                criticalAngle: Math.asin(wedgeVelocity / materialVelocity) * (180 / Math.PI)
            });
            return;
        }

        const refractedAngle = Math.asin(sinRefractedAngle);
        const refractedAngleDeg = (refractedAngle * 180) / Math.PI;
        const wavelength = materialVelocity / freqHz;
        const nearFieldLength = (Math.pow(diameterM, 2) * freqHz) / (4 * materialVelocity);
        const beamSpreadSin = (1.22 * wavelength) / diameterM;
        const beamSpreadHalfAngle = Math.asin(Math.min(beamSpreadSin, 1)) * (180 / Math.PI);

        setResults({
            refractedAngle: refractedAngleDeg.toFixed(1),
            wavelength: (wavelength * 1000).toFixed(2),
            nearFieldLength: (nearFieldLength * 1000).toFixed(1),
            beamSpreadHalfAngle: beamSpreadHalfAngle.toFixed(1),
            beamSpreadTotal: (beamSpreadHalfAngle * 2).toFixed(1),
        });
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-blue-600 text-white p-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                        <Zap className="h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">UT Beam Calculator</h2>
                        <p className="text-blue-100 text-sm">Real-time ultrasonic beam analysis</p>
                    </div>
                </div>
            </div>

            <div className="p-6">
                {/* Material Presets */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Select Material
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {Object.entries(materialPresets).map(([key, preset]) => (
                            <button
                                key={key}
                                onClick={() => loadPreset(key)}
                                className={`px-4 py-3 text-sm font-medium rounded-lg border-2 transition-all ${activePreset === key
                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                                    }`}
                            >
                                <div className="font-semibold">{preset.name}</div>
                                <div className="text-xs opacity-75">{preset.velocity} m/s</div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Input Controls */}
                    <div className="space-y-5">
                        <h3 className="font-semibold text-gray-900 border-b pb-2">Parameters</h3>

                        {/* Frequency Slider */}
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-medium text-gray-700">Frequency</label>
                                <span className="text-sm font-mono bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{inputs.frequency} MHz</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="15"
                                step="0.5"
                                value={inputs.frequency}
                                onChange={(e) => handleInputChange('frequency', e.target.value)}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                                <span>1 MHz</span>
                                <span>15 MHz</span>
                            </div>
                        </div>

                        {/* Wedge Angle Slider */}
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-medium text-gray-700">Wedge Angle</label>
                                <span className="text-sm font-mono bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{inputs.wedgeAngle}°</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="70"
                                step="1"
                                value={inputs.wedgeAngle}
                                onChange={(e) => handleInputChange('wedgeAngle', e.target.value)}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                                <span>0° (Normal)</span>
                                <span>70°</span>
                            </div>
                        </div>

                        {/* Crystal Diameter Slider */}
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-medium text-gray-700">Crystal Diameter</label>
                                <span className="text-sm font-mono bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{inputs.crystalDiameter} mm</span>
                            </div>
                            <input
                                type="range"
                                min="5"
                                max="25"
                                step="1"
                                value={inputs.crystalDiameter}
                                onChange={(e) => handleInputChange('crystalDiameter', e.target.value)}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                                <span>5 mm</span>
                                <span>25 mm</span>
                            </div>
                        </div>

                        {/* Advanced inputs */}
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Material Velocity (m/s)</label>
                                <input
                                    type="number"
                                    value={inputs.materialVelocity}
                                    onChange={(e) => handleInputChange('materialVelocity', e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Wedge Velocity (m/s)</label>
                                <input
                                    type="number"
                                    value={inputs.wedgeVelocity}
                                    onChange={(e) => handleInputChange('wedgeVelocity', e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Results Display */}
                    <div>
                        <h3 className="font-semibold text-gray-900 border-b pb-2 mb-4">Results</h3>

                        {results && !results.error ? (
                            <div className="space-y-3">
                                {/* Main Result - Refracted Angle */}
                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-100 rounded-lg">
                                            <ArrowRight className="h-5 w-5 text-blue-600" style={{ transform: `rotate(${results.refractedAngle}deg)` }} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-blue-600 font-medium">Refracted Beam Angle</p>
                                            <p className="text-3xl font-bold text-blue-700">{results.refractedAngle}°</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Other Results Grid */}
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                                        <p className="text-xs text-gray-500">Wavelength</p>
                                        <p className="text-lg font-bold text-gray-800">{results.wavelength}</p>
                                        <p className="text-xs text-gray-400">mm</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                                        <p className="text-xs text-gray-500">Near Field</p>
                                        <p className="text-lg font-bold text-gray-800">{results.nearFieldLength}</p>
                                        <p className="text-xs text-gray-400">mm</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                                        <p className="text-xs text-gray-500">Beam Spread</p>
                                        <p className="text-lg font-bold text-gray-800">{results.beamSpreadTotal}</p>
                                        <p className="text-xs text-gray-400">° total</p>
                                    </div>
                                </div>

                                {/* Visual Beam Representation */}
                                <div className="bg-slate-800 rounded-xl p-4 mt-4">
                                    <p className="text-xs text-slate-400 mb-3 text-center">Beam Path Visualization</p>
                                    <svg viewBox="0 0 200 120" className="w-full h-32">
                                        {/* Wedge */}
                                        <polygon
                                            points="40,20 100,20 100,60 40,60"
                                            fill="#f59e0b"
                                            opacity="0.8"
                                        />
                                        <text x="70" y="45" fontSize="8" fill="white" textAnchor="middle">Wedge</text>

                                        {/* Material */}
                                        <rect x="40" y="60" width="160" height="60" fill="#3b82f6" opacity="0.6" />
                                        <text x="120" y="95" fontSize="8" fill="white" textAnchor="middle">Material</text>

                                        {/* Incident Beam */}
                                        <line
                                            x1="70" y1="10"
                                            x2="70" y2="60"
                                            stroke="#22c55e"
                                            strokeWidth="2"
                                            strokeDasharray="4"
                                        />

                                        {/* Refracted Beam */}
                                        <line
                                            x1="70" y1="60"
                                            x2={70 + Math.sin(results.refractedAngle * Math.PI / 180) * 80}
                                            y2={60 + Math.cos(results.refractedAngle * Math.PI / 180) * 50}
                                            stroke="#22c55e"
                                            strokeWidth="3"
                                        />

                                        {/* Beam spread */}
                                        <line
                                            x1="70" y1="60"
                                            x2={70 + Math.sin((parseFloat(results.refractedAngle) + parseFloat(results.beamSpreadHalfAngle)) * Math.PI / 180) * 80}
                                            y2={60 + Math.cos((parseFloat(results.refractedAngle) + parseFloat(results.beamSpreadHalfAngle)) * Math.PI / 180) * 50}
                                            stroke="#22c55e"
                                            strokeWidth="1"
                                            opacity="0.5"
                                        />
                                        <line
                                            x1="70" y1="60"
                                            x2={70 + Math.sin((parseFloat(results.refractedAngle) - parseFloat(results.beamSpreadHalfAngle)) * Math.PI / 180) * 80}
                                            y2={60 + Math.cos((parseFloat(results.refractedAngle) - parseFloat(results.beamSpreadHalfAngle)) * Math.PI / 180) * 50}
                                            stroke="#22c55e"
                                            strokeWidth="1"
                                            opacity="0.5"
                                        />

                                        {/* Angle arc */}
                                        <path
                                            d={`M 70 75 A 15 15 0 0 1 ${70 + Math.sin(results.refractedAngle * Math.PI / 180) * 15} ${60 + 15}`}
                                            fill="none"
                                            stroke="white"
                                            strokeWidth="1"
                                        />
                                        <text x="85" y="78" fontSize="7" fill="white">{results.refractedAngle}°</text>
                                    </svg>
                                </div>
                            </div>
                        ) : results?.error ? (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                                <div className="flex items-start gap-3">
                                    <Info className="h-5 w-5 text-red-600 mt-0.5" />
                                    <div>
                                        <p className="font-semibold text-red-800">{results.error}</p>
                                        {results.criticalAngle && (
                                            <p className="text-sm text-red-600 mt-1">
                                                Critical angle: <strong>{results.criticalAngle.toFixed(1)}°</strong>
                                            </p>
                                        )}
                                        <p className="text-sm text-red-600 mt-2">
                                            Reduce wedge angle below the critical angle.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-400">
                                <Waves className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                <p>Adjust parameters to see results</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Formula Reference */}
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                        <Info className="h-4 w-4" />
                        Formulas
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-2 text-sm text-amber-800">
                        <div><strong>Snell's Law:</strong> sin(θ₁)/V₁ = sin(θ₂)/V₂</div>
                        <div><strong>Near Field:</strong> N = D²f / 4V</div>
                        <div><strong>Beam Spread:</strong> sin(θ) = 1.22λ / D</div>
                        <div><strong>Wavelength:</strong> λ = V / f</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
