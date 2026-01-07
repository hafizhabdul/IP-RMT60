import { useState, useEffect } from 'react';

/**
 * Interactive SVG visualization of ultrasonic beam refraction
 * Animates the beam path and shows angles
 */
export default function BeamVisualization({ inputs, results }) {
    const [animationPhase, setAnimationPhase] = useState(0);

    // Animation loop
    useEffect(() => {
        const interval = setInterval(() => {
            setAnimationPhase(prev => (prev + 1) % 100);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const { wedgeAngle = 36, materialVelocity = 5900, wedgeVelocity = 2730 } = inputs || {};
    const { refractedAngle = 45, nearFieldLength = 50, beamSpreadHalfAngle = 3 } = results || {};

    // SVG dimensions
    const width = 500;
    const height = 350;
    const centerX = width / 2;
    const interfaceY = height * 0.45;

    // Calculate beam paths
    const wedgeAngleRad = (parseFloat(wedgeAngle) * Math.PI) / 180;
    const refractedAngleRad = (parseFloat(refractedAngle) * Math.PI) / 180;
    const beamSpreadRad = (parseFloat(beamSpreadHalfAngle) * Math.PI) / 180;

    // Incident beam (in wedge)
    const incidentLength = 80;
    const incidentStartX = centerX - Math.sin(wedgeAngleRad) * incidentLength;
    const incidentStartY = interfaceY - Math.cos(wedgeAngleRad) * incidentLength;

    // Refracted beam (in material)
    const refractedLength = 120;
    const refractedEndX = centerX + Math.sin(refractedAngleRad) * refractedLength;
    const refractedEndY = interfaceY + Math.cos(refractedAngleRad) * refractedLength;

    // Beam spread edges
    const spreadLeftX = centerX + Math.sin(refractedAngleRad - beamSpreadRad) * refractedLength;
    const spreadLeftY = interfaceY + Math.cos(refractedAngleRad - beamSpreadRad) * refractedLength;
    const spreadRightX = centerX + Math.sin(refractedAngleRad + beamSpreadRad) * refractedLength;
    const spreadRightY = interfaceY + Math.cos(refractedAngleRad + beamSpreadRad) * refractedLength;

    // Wave animation offset
    const waveOffset = animationPhase * 0.6;

    // Generate wave pattern along beam
    const generateWavePattern = (x1, y1, x2, y2, offset) => {
        const points = [];
        const segments = 20;
        const amplitude = 4;

        for (let i = 0; i <= segments; i++) {
            const t = i / segments;
            const baseX = x1 + (x2 - x1) * t;
            const baseY = y1 + (y2 - y1) * t;

            // Perpendicular direction
            const dx = x2 - x1;
            const dy = y2 - y1;
            const len = Math.sqrt(dx * dx + dy * dy);
            const px = -dy / len;
            const py = dx / len;

            // Wave oscillation
            const wave = Math.sin((t * 10 + offset) * Math.PI) * amplitude * (1 - t * 0.3);

            points.push(`${baseX + px * wave},${baseY + py * wave}`);
        }

        return points.join(' L ');
    };

    const incidentWave = generateWavePattern(incidentStartX, incidentStartY, centerX, interfaceY, waveOffset);
    const refractedWave = generateWavePattern(centerX, interfaceY, refractedEndX, refractedEndY, waveOffset);

    return (
        <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl p-4 overflow-hidden">
            <svg
                viewBox={`0 0 ${width} ${height}`}
                className="w-full h-auto"
                style={{ maxHeight: '350px' }}
            >
                <defs>
                    {/* Gradient for wedge */}
                    <linearGradient id="wedgeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.4" />
                    </linearGradient>

                    {/* Gradient for material */}
                    <linearGradient id="materialGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#6b7280" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#374151" stopOpacity="0.9" />
                    </linearGradient>

                    {/* Glow filter */}
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* Beam glow */}
                    <filter id="beamGlow" x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feFlood floodColor="#22d3ee" floodOpacity="0.8" />
                        <feComposite in2="blur" operator="in" />
                        <feMerge>
                            <feMergeNode />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Background grid */}
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Wedge (top material - perspex) */}
                <rect
                    x="0"
                    y="0"
                    width={width}
                    height={interfaceY}
                    fill="url(#wedgeGradient)"
                />
                <text x="15" y="25" fill="rgba(255,255,255,0.8)" fontSize="12" fontWeight="500">
                    Wedge ({wedgeVelocity} m/s)
                </text>

                {/* Test material (bottom - steel) */}
                <rect
                    x="0"
                    y={interfaceY}
                    width={width}
                    height={height - interfaceY}
                    fill="url(#materialGradient)"
                />
                <text x="15" y={interfaceY + 25} fill="rgba(255,255,255,0.8)" fontSize="12" fontWeight="500">
                    Material ({materialVelocity} m/s)
                </text>

                {/* Interface line */}
                <line
                    x1="0"
                    y1={interfaceY}
                    x2={width}
                    y2={interfaceY}
                    stroke="rgba(255,255,255,0.6)"
                    strokeWidth="2"
                    strokeDasharray="10,5"
                />

                {/* Normal line (dashed vertical) */}
                <line
                    x1={centerX}
                    y1={interfaceY - 60}
                    x2={centerX}
                    y2={interfaceY + 100}
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                />
                <text x={centerX + 5} y={interfaceY - 65} fill="rgba(255,255,255,0.5)" fontSize="10">
                    Normal
                </text>

                {/* Beam spread zone (faded triangle) */}
                <path
                    d={`M ${centerX} ${interfaceY} L ${spreadLeftX} ${spreadLeftY} L ${spreadRightX} ${spreadRightY} Z`}
                    fill="rgba(34, 211, 238, 0.15)"
                />

                {/* Incident beam (animated wave in wedge) */}
                <path
                    d={`M ${incidentWave}`}
                    stroke="#22d3ee"
                    strokeWidth="3"
                    fill="none"
                    filter="url(#beamGlow)"
                />

                {/* Refracted beam (animated wave in material) */}
                <path
                    d={`M ${refractedWave}`}
                    stroke="#22d3ee"
                    strokeWidth="3"
                    fill="none"
                    filter="url(#beamGlow)"
                />

                {/* Beam spread edge lines */}
                <line
                    x1={centerX}
                    y1={interfaceY}
                    x2={spreadLeftX}
                    y2={spreadLeftY}
                    stroke="rgba(34, 211, 238, 0.3)"
                    strokeWidth="1"
                    strokeDasharray="4,4"
                />
                <line
                    x1={centerX}
                    y1={interfaceY}
                    x2={spreadRightX}
                    y2={spreadRightY}
                    stroke="rgba(34, 211, 238, 0.3)"
                    strokeWidth="1"
                    strokeDasharray="4,4"
                />

                {/* Incident angle arc */}
                <path
                    d={`M ${centerX} ${interfaceY - 40} A 40 40 0 0 0 ${centerX - Math.sin(wedgeAngleRad) * 40} ${interfaceY - Math.cos(wedgeAngleRad) * 40}`}
                    stroke="#fbbf24"
                    strokeWidth="2"
                    fill="none"
                />
                <text
                    x={centerX - 35}
                    y={interfaceY - 45}
                    fill="#fbbf24"
                    fontSize="11"
                    fontWeight="bold"
                >
                    θ₁={wedgeAngle}°
                </text>

                {/* Refracted angle arc */}
                <path
                    d={`M ${centerX} ${interfaceY + 50} A 50 50 0 0 1 ${centerX + Math.sin(refractedAngleRad) * 50} ${interfaceY + Math.cos(refractedAngleRad) * 50}`}
                    stroke="#10b981"
                    strokeWidth="2"
                    fill="none"
                />
                <text
                    x={centerX + 55}
                    y={interfaceY + 45}
                    fill="#10b981"
                    fontSize="11"
                    fontWeight="bold"
                >
                    θ₂={refractedAngle}°
                </text>

                {/* Entry point indicator */}
                <circle
                    cx={centerX}
                    cy={interfaceY}
                    r="6"
                    fill="#22d3ee"
                    filter="url(#glow)"
                />

                {/* Transducer representation */}
                <rect
                    x={incidentStartX - 15}
                    y={incidentStartY - 25}
                    width="30"
                    height="20"
                    rx="3"
                    fill="#1e40af"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    transform={`rotate(${wedgeAngle}, ${incidentStartX}, ${incidentStartY})`}
                />
                <text
                    x={incidentStartX - 25}
                    y={incidentStartY - 30}
                    fill="rgba(255,255,255,0.7)"
                    fontSize="10"
                >
                    Transducer
                </text>

                {/* Legend */}
                <g transform={`translate(${width - 140}, 15)`}>
                    <rect x="0" y="0" width="130" height="80" rx="5" fill="rgba(0,0,0,0.5)" />
                    <text x="10" y="18" fill="white" fontSize="10" fontWeight="bold">Legend:</text>
                    <line x1="10" y1="32" x2="30" y2="32" stroke="#22d3ee" strokeWidth="3" />
                    <text x="38" y="35" fill="rgba(255,255,255,0.8)" fontSize="9">Ultrasonic Beam</text>
                    <line x1="10" y1="50" x2="30" y2="50" stroke="#fbbf24" strokeWidth="2" />
                    <text x="38" y="53" fill="rgba(255,255,255,0.8)" fontSize="9">Incident Angle</text>
                    <line x1="10" y1="68" x2="30" y2="68" stroke="#10b981" strokeWidth="2" />
                    <text x="38" y="71" fill="rgba(255,255,255,0.8)" fontSize="9">Refracted Angle</text>
                </g>
            </svg>
        </div>
    );
}
