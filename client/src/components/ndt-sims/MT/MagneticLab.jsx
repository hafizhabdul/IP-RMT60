import { useState, useRef, useEffect } from 'react';
import { Magnet, Droplets, RefreshCw, Info, RotateCw, Trophy } from 'lucide-react';
import { GamificationService } from '../../../services/GamificationService';

export default function MagneticLab() {
    const [yokePosition, setYokePosition] = useState({ x: 50, y: 50 });
    const [yokeRotation, setYokeRotation] = useState(0); // 0 or 90
    const [isMagnetized, setIsMagnetized] = useState(false);
    const [particlesApplied, setParticlesApplied] = useState(false);
    const [indicationsVisible, setIndicationsVisible] = useState(false);
    const [showHint, setShowHint] = useState(true);

    const [hasAwarded, setHasAwarded] = useState(false);
    const [rewardMessage, setRewardMessage] = useState(null);

    // Crack definitions (hidden by default)
    const crack = { x: 200, y: 150, width: 4, height: 60, type: 'vertical' };

    const handleDragYoke = (e) => {
        // Simple drag logic (for MVP, clicking moves it for now to avoid complex DnD code)
        const rectify = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rectify.left - 50; // center offset
        const y = e.clientY - rectify.top - 25;
        // setYokePosition({ x, y });
    };

    const containerRef = useRef(null);

    const moveYoke = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(rect.width - 100, e.clientX - rect.left - 50));
        const y = Math.max(0, Math.min(rect.height - 60, e.clientY - rect.top - 30));
        setYokePosition({ x, y });
    };

    const toggleMagnet = () => {
        setIsMagnetized(!isMagnetized);
    };

    const applySpray = () => {
        setParticlesApplied(true);
    };

    const rotateYoke = () => {
        setYokeRotation(prev => (prev === 0 ? 90 : 0));
    };

    const reset = () => {
        setParticlesApplied(false);
        setIsMagnetized(false);
        setIndicationsVisible(false);
        setYokePosition({ x: 50, y: 50 });
        setYokeRotation(0);
        setHasAwarded(false); // Reset award status
        setRewardMessage(null); // Clear any reward messages
    };

    // Check for indications
    useEffect(() => {
        if (!isMagnetized || !particlesApplied) {
            setIndicationsVisible(false);
            return;
        }

        // Check proximity and orientation
        // Yoke center
        const yokeCx = yokePosition.x + 50;
        const yokeCy = yokePosition.y + 30;

        // Crack center
        const crackCx = crack.x;
        const crackCy = crack.y + crack.height / 2;

        const distance = Math.sqrt(Math.pow(yokeCx - crackCx, 2) + Math.pow(yokeCy - crackCy, 2));

        // MT Rule: Field lines must be perpendicular to crack.
        // If crack is Vertical, Field lines should be Horizontal.
        // Yoke creates field lines running between legs.
        // If Yoke is Horizontal (0 deg), field is Horizontal. Good for Vertical crack.
        // If Yoke is Vertical (90 deg), field is Vertical. Bad for Vertical crack.

        const isOrientationCorrect = (crack.type === 'vertical' && yokeRotation === 0) ||
            (crack.type === 'horizontal' && yokeRotation === 90);

        if (distance < 100 && isOrientationCorrect) {
            setIndicationsVisible(true);

            // Award XP if not already awarded for this session
            if (!hasAwarded) {
                const { newXP, levelUp } = GamificationService.addXP(50);
                const badge = GamificationService.unlockBadge('magnet_master');

                setHasAwarded(true);
                setRewardMessage({
                    xp: 50,
                    levelUp,
                    badge
                });

                // Auto hide message after 3s
                setTimeout(() => setRewardMessage(null), 4000);
            }
        } else {
            setIndicationsVisible(false);
        }

    }, [isMagnetized, particlesApplied, yokePosition, yokeRotation, hasAwarded]);

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white rounded-xl shadow-lg border border-gray-200 relative">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Magnet className="h-6 w-6 text-red-600" />
                        Magnetic Particle Lab
                    </h2>
                    <p className="text-gray-600">Drag the Yoke, Magnetize, and Apply Particles to find cracks.</p>
                </div>
                <button
                    onClick={reset}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                    title="Reset Simulation"
                >
                    <RefreshCw className="h-5 w-5" />
                </button>
            </div>

            {/* Main Lab Area */}
            <div
                ref={containerRef}
                className="relative h-[400px] bg-slate-200 rounded-lg overflow-hidden border border-slate-300 shadow-inner cursor-crosshair mb-8"
                onClick={moveYoke}
            >
                {/* Grid/Weld Texture */}
                <div className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }}
                />

                {/* The Weld Bead */}
                <div className="absolute left-[180px] top-0 bottom-0 w-10 bg-gradient-to-r from-slate-400 via-slate-300 to-slate-400 border-x border-slate-400/50"></div>

                {/* Hidden Crack (Visualized only when detected) */}
                <div
                    className={`absolute transition - opacity duration - 1000 ${indicationsVisible ? 'opacity-90' : 'opacity-0'} `}
                    style={{
                        left: crack.x,
                        top: crack.y,
                        width: crack.width,
                        height: crack.height,
                        background: 'repeating-linear-gradient(45deg, #ef4444, #b91c1c 2px, transparent 3px)',
                        boxShadow: '0 0 10px 2px rgba(220, 38, 38, 0.6)',
                        filter: 'blur(0.5px)',
                    }}
                />

                {/* Particles Overlay (when sprayed) */}
                {particlesApplied && (
                    <div className="absolute inset-0 pointer-events-none bg-slate-900/20 mix-blend-multiply"></div>
                )}

                {/* The Yoke Tool */}
                <div
                    className="absolute transition-all duration-300 ease-out pointer-events-none"
                    style={{
                        left: yokePosition.x,
                        top: yokePosition.y,
                        transform: `rotate(${yokeRotation}deg)`,
                        width: '100px',
                        height: '60px'
                    }}
                >
                    {/* Yoke Handle */}
                    <div className={`w - full h - 8 ${isMagnetized ? 'bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.6)]' : 'bg-red-800'} rounded - t - lg mx - auto relative transition - colors duration - 200`}>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-4 bg-black/20 rounded-full"></div>
                    </div>
                    {/* Legs */}
                    <div className="flex justify-between px-2">
                        <div className="w-4 h-8 bg-gray-400 rounded-b-md border border-gray-600"></div>
                        <div className="w-4 h-8 bg-gray-400 rounded-b-md border border-gray-600"></div>
                    </div>
                    {/* Magnetic Field Visualization (when on) */}
                    {isMagnetized && (
                        <div className="absolute top-8 left-4 right-4 h-8 border-x-2 border-dashed border-red-400/50 flex justify-center items-center">
                            <span className="text-[10px] text-red-500 font-bold animate-pulse">FIELD</span>
                        </div>
                    )}
                </div>

                {/* Instructions Overlay */}
                {showHint && (
                    <div className="absolute bottom-4 left-4 bg-white/90 p-3 rounded-lg shadow-sm border border-orange-200 max-w-sm">
                        <div className="flex justify-between items-start">
                            <h4 className="font-semibold text-orange-800 text-sm mb-1">How to inspect:</h4>
                            <button onClick={() => setShowHint(false)} className="text-gray-400 hover:text-gray-600"><span className="sr-only">Close</span>×</button>
                        </div>

                        <ol className="text-xs text-orange-900 space-y-1 list-decimal list-inside">
                            <li>Check detection capability.</li>
                            <li>Position the Yoke (Click/Tap on plate).</li>
                            <li>Rotate if needed to cross the crack.</li>
                            <li>Turn <strong>Magnet ON</strong>.</li>
                            <li>Apply <strong>Spray</strong>.</li>
                        </ol>
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
                <button
                    onClick={toggleMagnet}
                    className={`flex items - center gap - 2 px - 6 py - 3 rounded - lg font - semibold transition - all ${isMagnetized
                        ? 'bg-red-600 text-white shadow-lg shadow-red-200 scale-105'
                        : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-red-300'
                        } `}
                >
                    <Magnet className="h-5 w-5" />
                    {isMagnetized ? 'Magnet: ON' : 'Magnet: OFF'}
                </button>

                <button
                    onClick={applySpray}
                    disabled={particlesApplied}
                    className={`flex items - center gap - 2 px - 6 py - 3 rounded - lg font - semibold transition - all ${particlesApplied
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-400'
                        } `}
                >
                    <Droplets className="h-5 w-5" />
                    Apply Particles
                </button>

                <button
                    onClick={rotateYoke}
                    className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <RotateCw className="h-5 w-5" />
                    Rotate 90°
                </button>
            </div>

            {/* Reward Toast */}
            {rewardMessage && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 animate-bounce">
                    <div className="bg-yellow-500 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-3 border-2 border-yellow-300">
                        <Trophy className="h-6 w-6 text-yellow-100 animate-bounce" />
                        <div>
                            <p className="font-bold text-lg leading-none">+{rewardMessage.xp} XP</p>
                            {rewardMessage.levelUp && <p className="text-xs uppercase font-bold tracking-wider text-yellow-100">Level Up!</p>}
                            {rewardMessage.badge && <p className="text-xs font-bold text-white">🏆 Badge Unlocked: {rewardMessage.badge.name}</p>}
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                <Info className="h-4 w-4" />
                <span>Tip: cracks only appear if the magnetic field (between the legs) crosses them perpendicularly (90°).</span>
            </div>
        </div>
    );
}
