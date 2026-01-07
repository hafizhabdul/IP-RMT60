import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Magnet, Droplets, RefreshCw, Info, RotateCw, CheckCircle, X } from 'lucide-react';

export default function MagneticLab() {
    const [yokePosition, setYokePosition] = useState({ x: 60, y: 80 });
    const [yokeRotation, setYokeRotation] = useState(0);
    const [isMagnetized, setIsMagnetized] = useState(false);
    const [particlesApplied, setParticlesApplied] = useState(false);
    const [indicationsVisible, setIndicationsVisible] = useState(false);
    const [showHint, setShowHint] = useState(true);
    const [crackDetected, setCrackDetected] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    // Crack at center of weld
    const crack = { x: 180, y: 120, width: 5, height: 70, type: 'vertical' };
    const containerRef = useRef(null);

    // Check for crack detection
    useEffect(() => {
        if (!isMagnetized || !particlesApplied) {
            setIndicationsVisible(false);
            return;
        }

        const yokeCx = yokePosition.x + 50;
        const yokeCy = yokePosition.y + 30;
        const crackCx = crack.x + crack.width / 2;
        const crackCy = crack.y + crack.height / 2;
        const distance = Math.sqrt(Math.pow(yokeCx - crackCx, 2) + Math.pow(yokeCy - crackCy, 2));

        // Field must be perpendicular to crack
        const isOrientationCorrect = (crack.type === 'vertical' && yokeRotation === 0) ||
            (crack.type === 'horizontal' && yokeRotation === 90);

        if (distance < 120 && isOrientationCorrect) {
            setIndicationsVisible(true);
            setCrackDetected(true);
        } else {
            setIndicationsVisible(false);
        }
    }, [isMagnetized, particlesApplied, yokePosition, yokeRotation]);

    const handleDrag = (e, info) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const newX = Math.max(0, Math.min(rect.width - 100, yokePosition.x + info.delta.x));
        const newY = Math.max(0, Math.min(rect.height - 60, yokePosition.y + info.delta.y));
        setYokePosition({ x: newX, y: newY });
    };

    const handleContainerClick = (e) => {
        if (isDragging) return;
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(rect.width - 100, e.clientX - rect.left - 50));
        const y = Math.max(0, Math.min(rect.height - 60, e.clientY - rect.top - 30));
        setYokePosition({ x, y });
    };

    const reset = () => {
        setParticlesApplied(false);
        setIsMagnetized(false);
        setIndicationsVisible(false);
        setYokePosition({ x: 60, y: 80 });
        setYokeRotation(0);
        setCrackDetected(false);
        setShowHint(true);
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-red-600 text-white p-4 sm:p-6">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <motion.div
                            className="p-2 bg-white/20 rounded-lg"
                            animate={{ rotate: isMagnetized ? [0, 5, -5, 0] : 0 }}
                            transition={{ repeat: isMagnetized ? Infinity : 0, duration: 0.5 }}
                        >
                            <Magnet className="h-5 w-5 sm:h-6 sm:w-6" />
                        </motion.div>
                        <div>
                            <h2 className="text-lg sm:text-xl font-bold">Magnetic Particle Lab</h2>
                            <p className="text-red-100 text-xs sm:text-sm">Drag the yoke to find hidden cracks</p>
                        </div>
                    </div>
                    <button onClick={reset} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                        <RefreshCw className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div className="p-4 sm:p-6">
                {/* Status Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                    <motion.span
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 ${isMagnetized ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-500'}`}
                        animate={{ scale: isMagnetized ? [1, 1.05, 1] : 1 }}
                        transition={{ repeat: isMagnetized ? Infinity : 0, duration: 1 }}
                    >
                        <span className={`w-2 h-2 rounded-full ${isMagnetized ? 'bg-red-500' : 'bg-gray-400'}`} />
                        {isMagnetized ? 'Magnetized' : 'Not Magnetized'}
                    </motion.span>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 ${particlesApplied ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-500'}`}>
                        <Droplets className="h-3 w-3" />
                        {particlesApplied ? 'Particles Applied' : 'No Particles'}
                    </span>
                    <AnimatePresence>
                        {crackDetected && (
                            <motion.span
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 flex items-center gap-1.5"
                            >
                                <CheckCircle className="h-3 w-3" />
                                Crack Found!
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>

                {/* Lab Area */}
                <div
                    ref={containerRef}
                    className="relative h-72 sm:h-80 md:h-96 bg-gradient-to-br from-slate-300 to-slate-200 rounded-xl overflow-hidden border-2 border-slate-400 cursor-crosshair select-none"
                    onClick={handleContainerClick}
                >
                    {/* Metal texture */}
                    <div className="absolute inset-0 opacity-30 pointer-events-none"
                        style={{
                            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(100,116,139,0.3) 2px, rgba(100,116,139,0.3) 4px)`,
                        }}
                    />

                    {/* Weld Bead - centered */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-12 sm:w-14">
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-500 via-slate-400 to-slate-500 border-x-2 border-slate-600" />
                        <div className="absolute inset-x-2 top-0 bottom-0 bg-gradient-to-b from-slate-300/50 to-transparent" />
                    </div>

                    {/* Hidden Crack - will glow when detected */}
                    <motion.div
                        className="absolute pointer-events-none"
                        style={{
                            left: crack.x,
                            top: crack.y,
                            width: crack.width,
                            height: crack.height,
                        }}
                        animate={{
                            opacity: indicationsVisible ? 1 : 0,
                            boxShadow: indicationsVisible
                                ? '0 0 20px 8px rgba(239, 68, 68, 0.8), 0 0 40px 15px rgba(239, 68, 68, 0.4)'
                                : '0 0 0 0 transparent',
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="w-full h-full bg-gradient-to-b from-red-500 via-red-600 to-red-500 rounded-full" />
                    </motion.div>

                    {/* Particles overlay */}
                    <AnimatePresence>
                        {particlesApplied && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(30,41,59,0.15) 100%)',
                                }}
                            />
                        )}
                    </AnimatePresence>

                    {/* Draggable Yoke */}
                    <motion.div
                        className="absolute cursor-grab active:cursor-grabbing z-10"
                        style={{
                            left: yokePosition.x,
                            top: yokePosition.y,
                            width: 100,
                            height: 60,
                        }}
                        animate={{ rotate: yokeRotation }}
                        drag
                        dragMomentum={false}
                        dragElastic={0}
                        onDragStart={() => setIsDragging(true)}
                        onDrag={handleDrag}
                        onDragEnd={() => setTimeout(() => setIsDragging(false), 100)}
                        whileDrag={{ scale: 1.05 }}
                    >
                        {/* Yoke body */}
                        <motion.div
                            className={`w-full h-9 rounded-t-xl transition-colors ${isMagnetized ? 'bg-red-500' : 'bg-red-800'}`}
                            animate={{
                                boxShadow: isMagnetized
                                    ? '0 0 20px rgba(239,68,68,0.6), inset 0 2px 4px rgba(255,255,255,0.3)'
                                    : 'inset 0 2px 4px rgba(255,255,255,0.1)'
                            }}
                        >
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-5 bg-black/20 rounded-full" />
                        </motion.div>

                        {/* Legs */}
                        <div className="flex justify-between px-2">
                            <div className="w-5 h-9 bg-gradient-to-b from-gray-400 to-gray-500 rounded-b-lg border-2 border-gray-600" />
                            <div className="w-5 h-9 bg-gradient-to-b from-gray-400 to-gray-500 rounded-b-lg border-2 border-gray-600" />
                        </div>

                        {/* Field lines visualization */}
                        <AnimatePresence>
                            {isMagnetized && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute top-9 left-6 right-6 h-9 flex items-center justify-center"
                                >
                                    <motion.div
                                        className="flex gap-1"
                                        animate={{ x: [0, 3, 0, -3, 0] }}
                                        transition={{ repeat: Infinity, duration: 0.8 }}
                                    >
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="w-0.5 h-6 bg-red-400/60 rounded-full" />
                                        ))}
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Instructions */}
                    <AnimatePresence>
                        {showHint && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="absolute bottom-3 left-3 right-3 sm:left-4 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur p-4 rounded-xl shadow-xl border border-orange-200"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-orange-800 text-sm">🧲 How to inspect:</h4>
                                    <button onClick={() => setShowHint(false)} className="text-gray-400 hover:text-gray-600">
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                                <ol className="text-xs text-gray-700 space-y-1">
                                    <li className="flex gap-2"><span className="text-orange-500 font-bold">1.</span> Drag yoke over the weld</li>
                                    <li className="flex gap-2"><span className="text-orange-500 font-bold">2.</span> Rotate if needed (crack ⊥ to field)</li>
                                    <li className="flex gap-2"><span className="text-orange-500 font-bold">3.</span> Turn <strong>Magnet ON</strong></li>
                                    <li className="flex gap-2"><span className="text-orange-500 font-bold">4.</span> Apply <strong>Particles</strong></li>
                                </ol>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Controls */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4">
                    <motion.button
                        onClick={() => setIsMagnetized(!isMagnetized)}
                        className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-3 sm:px-6 py-3 rounded-xl font-semibold transition-colors text-sm ${isMagnetized
                            ? 'bg-red-600 text-white'
                            : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-red-300'
                            }`}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Magnet className="h-5 w-5" />
                        <span className="hidden sm:inline">{isMagnetized ? 'Magnet ON' : 'Magnet OFF'}</span>
                        <span className="sm:hidden text-xs">{isMagnetized ? 'ON' : 'OFF'}</span>
                    </motion.button>

                    <motion.button
                        onClick={() => setParticlesApplied(true)}
                        disabled={particlesApplied}
                        className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-3 sm:px-6 py-3 rounded-xl font-semibold transition-colors text-sm ${particlesApplied
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-400'
                            }`}
                        whileTap={particlesApplied ? {} : { scale: 0.95 }}
                    >
                        <Droplets className="h-5 w-5" />
                        <span className="hidden sm:inline">Particles</span>
                        <span className="sm:hidden text-xs">Spray</span>
                    </motion.button>

                    <motion.button
                        onClick={() => setYokeRotation(prev => prev === 0 ? 90 : 0)}
                        className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-3 sm:px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors text-sm"
                        whileTap={{ scale: 0.95 }}
                    >
                        <RotateCw className="h-5 w-5" />
                        <span className="hidden sm:inline">Rotate 90°</span>
                        <span className="sm:hidden text-xs">Rotate</span>
                    </motion.button>
                </div>

                {/* Tip */}
                <motion.div
                    className="mt-4 flex items-start gap-2 text-xs sm:text-sm text-gray-600 bg-amber-50 border border-amber-200 p-3 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <Info className="h-4 w-4 flex-shrink-0 mt-0.5 text-amber-600" />
                    <span><strong>MT Principle:</strong> Magnetic field lines must cross the crack at 90° to create flux leakage and attract particles.</span>
                </motion.div>
            </div>
        </div>
    );
}
