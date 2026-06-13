import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Waves, RefreshCw, Info, X, CheckCircle, Volume2 } from 'lucide-react';

/**
 * UT Flaw Scanner Simulation
 * User scans a probe over a weld to find hidden defects using A-Scan display
 */
export default function UTFlawScanner() {
    const prefersReducedMotion = useReducedMotion();
    const [probePosition, setProbePosition] = useState({ x: 50, y: 120 });
    const [isScanning, setIsScanning] = useState(false);
    const [couplantApplied, setCouplantApplied] = useState(false);
    const [defectFound, setDefectFound] = useState(false);
    const [showHint, setShowHint] = useState(true);
    const [echoData, setEchoData] = useState({ initialPulse: 100, backwall: 0, defect: 0, defectDepth: 0 });
    const [isDragging, setIsDragging] = useState(false);

    const containerRef = useRef(null);

    // Hidden defect location (in the weld)
    const defect = { x: 200, y: 100, width: 30, height: 20, depth: 15 }; // depth in mm
    const materialThickness = 25; // mm

    // Calculate A-Scan based on probe position
    useEffect(() => {
        if (!isScanning || !couplantApplied) {
            setEchoData({ initialPulse: 100, backwall: 0, defect: 0, defectDepth: 0 });
            return;
        }

        const probeCx = probePosition.x + 30;
        const probeCy = probePosition.y + 20;
        const defectCx = defect.x + defect.width / 2;
        const defectCy = defect.y + defect.height / 2;

        const distance = Math.sqrt(Math.pow(probeCx - defectCx, 2) + Math.pow(probeCy - defectCy, 2));

        // Always show backwall echo when scanning
        const backwallAmplitude = 70 + Math.random() * 10;

        // Show defect echo if probe is near defect
        let defectAmplitude = 0;
        if (distance < 60) {
            defectAmplitude = Math.max(0, 80 - distance) + Math.random() * 5;
            if (distance < 30) {
                setDefectFound(true);
            }
        }

        setEchoData({
            initialPulse: 100,
            backwall: backwallAmplitude,
            defect: defectAmplitude,
            defectDepth: defect.depth
        });
    }, [probePosition, isScanning, couplantApplied]);

    const handleDrag = (e, info) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const newX = Math.max(0, Math.min(rect.width - 60, probePosition.x + info.delta.x));
        const newY = Math.max(0, Math.min(rect.height - 40, probePosition.y + info.delta.y));
        setProbePosition({ x: newX, y: newY });
    };

    const handleContainerClick = (e) => {
        if (isDragging) return;
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(rect.width - 60, e.clientX - rect.left - 30));
        const y = Math.max(0, Math.min(rect.height - 40, e.clientY - rect.top - 20));
        setProbePosition({ x, y });
    };

    const reset = () => {
        setProbePosition({ x: 50, y: 120 });
        setIsScanning(false);
        setCouplantApplied(false);
        setDefectFound(false);
        setShowHint(true);
        setEchoData({ initialPulse: 100, backwall: 0, defect: 0, defectDepth: 0 });
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 sm:p-6">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <motion.div
                            className="p-2 bg-white/20 rounded-lg"
                            animate={isScanning && !prefersReducedMotion ? { scale: [1, 1.1, 1] } : {}}
                            transition={{ repeat: isScanning && !prefersReducedMotion ? Infinity : 0, duration: 0.5 }}
                        >
                            <Waves className="h-5 w-5 sm:h-6 sm:w-6" />
                        </motion.div>
                        <div>
                            <h2 className="text-lg sm:text-xl font-bold">UT Flaw Scanner</h2>
                            <p className="text-blue-100 text-xs sm:text-sm">Scan the probe to find hidden defects</p>
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
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 ${couplantApplied ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                        💧 {couplantApplied ? 'Couplant Applied' : 'No Couplant'}
                    </span>
                    <motion.span
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 ${isScanning ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                        animate={isScanning && !prefersReducedMotion ? { opacity: [1, 0.7, 1] } : {}}
                        transition={{ repeat: isScanning && !prefersReducedMotion ? Infinity : 0, duration: 1 }}
                    >
                        <Volume2 className="h-3 w-3" />
                        {isScanning ? 'Scanning...' : 'Not Scanning'}
                    </motion.span>
                    <AnimatePresence>
                        {defectFound && (
                            <motion.span
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-red-100 text-red-700 flex items-center gap-1.5"
                            >
                                <CheckCircle className="h-3 w-3" />
                                Defect Located!
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>

                <div className="grid lg:grid-cols-2 gap-4">
                    {/* Scan Area */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Test Specimen</h3>
                        <div
                            ref={containerRef}
                            className="relative h-64 sm:h-72 bg-gradient-to-b from-slate-600 to-slate-700 rounded-xl overflow-hidden border-2 border-slate-500 cursor-crosshair select-none"
                            onClick={handleContainerClick}
                        >
                            {/* Metal grain texture */}
                            <div className="absolute inset-0 opacity-20"
                                style={{
                                    backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                                    backgroundSize: '8px 8px'
                                }}
                            />

                            {/* Weld bead - centered */}
                            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-16 sm:w-20">
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-500 via-slate-400 to-slate-500" />
                                <div className="absolute inset-x-0 top-1/4 h-1/2 bg-gradient-to-b from-slate-300/30 to-transparent" />
                                {/* Weld ripples */}
                                <div className="absolute inset-x-2 top-0 bottom-0 opacity-40"
                                    style={{
                                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(0,0,0,0.2) 8px, rgba(0,0,0,0.2) 10px)'
                                    }}
                                />
                            </div>

                            {/* Hidden defect indicator (only visible when found) */}
                            <AnimatePresence>
                                {defectFound && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="absolute pointer-events-none"
                                        style={{
                                            left: defect.x,
                                            top: defect.y,
                                            width: defect.width,
                                            height: defect.height,
                                        }}
                                    >
                                        <motion.div
                                            className="w-full h-full border-2 border-red-500 rounded bg-red-500/20"
                                            animate={prefersReducedMotion
                                                ? { boxShadow: '0 0 20px rgba(239,68,68,0.8)' }
                                                : { boxShadow: ['0 0 10px rgba(239,68,68,0.5)', '0 0 20px rgba(239,68,68,0.8)', '0 0 10px rgba(239,68,68,0.5)'] }}
                                            transition={prefersReducedMotion ? { duration: 0 } : { repeat: Infinity, duration: 1 }}
                                        />
                                        <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-red-400 font-bold whitespace-nowrap">DEFECT</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Couplant layer visualization */}
                            {couplantApplied && (
                                <div className="absolute inset-0 bg-blue-400/10 pointer-events-none" />
                            )}

                            {/* Draggable Probe */}
                            <motion.div
                                className="absolute cursor-grab active:cursor-grabbing z-20"
                                style={{
                                    left: probePosition.x,
                                    top: probePosition.y,
                                    width: 60,
                                    height: 40,
                                }}
                                drag
                                dragMomentum={false}
                                dragElastic={0}
                                onDragStart={() => setIsDragging(true)}
                                onDrag={handleDrag}
                                onDragEnd={() => setTimeout(() => setIsDragging(false), 100)}
                                whileDrag={{ scale: 1.05 }}
                            >
                                {/* Probe body */}
                                <div className="relative w-full h-full">
                                    <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-600 rounded-t-lg border-2 border-blue-300 shadow-lg">
                                        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-blue-800/30 flex items-center justify-center">
                                            <Waves className="h-3 w-3 text-white/70" />
                                        </div>
                                    </div>
                                    {/* Probe face */}
                                    <div className="absolute bottom-0 inset-x-1 h-2 bg-gray-300 rounded-b" />

                                    {/* Sound waves animation */}
                                    <AnimatePresence>
                                        {isScanning && couplantApplied && !prefersReducedMotion && (
                                            <motion.div
                                                className="absolute -bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                            >
                                                {[0, 1, 2].map((i) => (
                                                    <motion.div
                                                        key={i}
                                                        className="absolute w-8 h-8 border-2 border-green-400/50 rounded-full"
                                                        style={{ left: -16, top: -16 }}
                                                        animate={{
                                                            scale: [1, 2, 3],
                                                            opacity: [0.8, 0.4, 0],
                                                        }}
                                                        transition={{
                                                            repeat: Infinity,
                                                            duration: 1.5,
                                                            delay: i * 0.5,
                                                        }}
                                                    />
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>

                            {/* Instructions */}
                            <AnimatePresence>
                                {showHint && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-3 sm:w-56 bg-white/95 backdrop-blur p-3 rounded-xl shadow-xl border border-blue-200"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-blue-800 text-xs">🔊 How to scan:</h4>
                                            <button onClick={() => setShowHint(false)} className="text-gray-400 hover:text-gray-600">
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                        <ol className="text-[10px] text-gray-700 space-y-0.5">
                                            <li>1. Apply <strong>Couplant</strong></li>
                                            <li>2. Turn <strong>Scanner ON</strong></li>
                                            <li>3. Drag probe over weld area</li>
                                            <li>4. Watch A-Scan for echoes</li>
                                        </ol>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* A-Scan Display */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">A-Scan Display</h3>
                        <div className="bg-gray-900 rounded-xl p-4 border-2 border-gray-700 h-64 sm:h-72">
                            {/* Screen */}
                            <div className="relative h-full bg-black rounded-lg overflow-hidden border border-green-900">
                                {/* Grid */}
                                <div className="absolute inset-0 opacity-30"
                                    style={{
                                        backgroundImage: 'linear-gradient(rgba(34,197,94,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.3) 1px, transparent 1px)',
                                        backgroundSize: '20% 20%'
                                    }}
                                />

                                {/* Baseline */}
                                <div className="absolute bottom-8 left-4 right-4 h-0.5 bg-green-500/50" />

                                {/* Time/Distance axis label */}
                                <div className="absolute bottom-1 left-4 right-4 flex justify-between text-[8px] text-green-500/70 font-mono">
                                    <span>0</span>
                                    <span>DISTANCE (mm)</span>
                                    <span>{materialThickness}</span>
                                </div>

                                {/* Amplitude axis */}
                                <div className="absolute top-4 left-1 bottom-12 w-4 flex flex-col justify-between items-center text-[8px] text-green-500/70 font-mono">
                                    <span>100</span>
                                    <span className="writing-mode-vertical transform -rotate-90 whitespace-nowrap text-[6px]">AMP %</span>
                                    <span>0</span>
                                </div>

                                {isScanning && couplantApplied ? (
                                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                        {/* Initial Pulse */}
                                        <motion.rect
                                            x="5" y={100 - echoData.initialPulse * 0.8 - 15}
                                            width="3" height={echoData.initialPulse * 0.8}
                                            fill="#22c55e"
                                            initial={{ scaleY: 0 }}
                                            animate={{ scaleY: 1 }}
                                            style={{ originY: 1 }}
                                        />

                                        {/* Defect Echo - positioned based on depth */}
                                        {echoData.defect > 5 && (
                                            <motion.rect
                                                x={5 + (echoData.defectDepth / materialThickness) * 85}
                                                y={100 - echoData.defect * 0.8 - 15}
                                                width="4"
                                                height={echoData.defect * 0.8}
                                                fill="#ef4444"
                                                initial={{ scaleY: 0 }}
                                                animate={prefersReducedMotion ? { scaleY: 1 } : { scaleY: [0.8, 1, 0.8] }}
                                                transition={prefersReducedMotion ? { duration: 0 } : { repeat: Infinity, duration: 0.3 }}
                                                style={{ originY: 1 }}
                                            />
                                        )}

                                        {/* Backwall Echo */}
                                        <motion.rect
                                            x="88" y={100 - echoData.backwall * 0.8 - 15}
                                            width="3" height={echoData.backwall * 0.8}
                                            fill="#22c55e"
                                            initial={{ scaleY: 0 }}
                                            animate={prefersReducedMotion ? { scaleY: 1 } : { scaleY: [0.95, 1, 0.95] }}
                                            transition={prefersReducedMotion ? { duration: 0 } : { repeat: Infinity, duration: 0.5 }}
                                            style={{ originY: 1 }}
                                        />

                                        {/* Noise floor */}
                                        {[...Array(20)].map((_, i) => (
                                            <motion.rect
                                                key={i}
                                                x={10 + i * 4}
                                                y={85 - Math.random() * 5}
                                                width="1"
                                                height={Math.random() * 5 + 2}
                                                fill="#22c55e"
                                                opacity={0.3}
                                                animate={prefersReducedMotion ? { height: 3 } : { height: [2, 5, 2] }}
                                                transition={prefersReducedMotion ? { duration: 0 } : { repeat: Infinity, duration: 0.3 + Math.random() * 0.3, delay: Math.random() }}
                                            />
                                        ))}
                                    </svg>
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <p className="text-green-500/50 text-xs font-mono">
                                            {!couplantApplied ? 'APPLY COUPLANT' : 'START SCANNING'}
                                        </p>
                                    </div>
                                )}

                                {/* Legend */}
                                {isScanning && couplantApplied && (
                                    <div className="absolute top-2 right-2 space-y-1 text-[8px] font-mono">
                                        <div className="flex items-center gap-1">
                                            <div className="w-2 h-2 bg-green-500" />
                                            <span className="text-green-500">IP / BW</span>
                                        </div>
                                        {echoData.defect > 5 && (
                                            <motion.div
                                                className="flex items-center gap-1"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                <div className="w-2 h-2 bg-red-500" />
                                                <span className="text-red-500">DEFECT @ {echoData.defectDepth}mm</span>
                                            </motion.div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                    <motion.button
                        onClick={() => setCouplantApplied(true)}
                        disabled={couplantApplied}
                        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-colors ${couplantApplied
                            ? 'bg-blue-100 text-blue-400 cursor-not-allowed'
                            : 'bg-white border-2 border-blue-300 text-blue-700 hover:bg-blue-50'
                            }`}
                        whileTap={couplantApplied ? {} : { scale: 0.95 }}
                    >
                        💧 Apply Couplant
                    </motion.button>

                    <motion.button
                        onClick={() => setIsScanning(!isScanning)}
                        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-colors ${isScanning
                            ? 'bg-green-600 text-white'
                            : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-green-300'
                            }`}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Volume2 className="h-5 w-5" />
                        {isScanning ? 'Scanning ON' : 'Start Scan'}
                    </motion.button>
                </div>

                {/* Info */}
                <motion.div
                    className="mt-4 flex items-start gap-2 text-xs sm:text-sm text-gray-600 bg-blue-50 border border-blue-200 p-3 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <Info className="h-4 w-4 flex-shrink-0 mt-0.5 text-blue-600" />
                    <span><strong>A-Scan:</strong> Initial Pulse (IP) appears at 0mm, Backwall (BW) at full thickness. Defects appear between them based on depth.</span>
                </motion.div>
            </div>
        </div>
    );
}
