import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radiation, Layers, Maximize, AlertTriangle, FileOutput, Info, CheckCircle, RefreshCw } from 'lucide-react';

export default function RadiographyLab() {
    const [focalSpot, setFocalSpot] = useState(3);
    const [sod, setSod] = useState(500);
    const [ofd, setOfd] = useState(20);
    const [ug, setUg] = useState(0);
    const [isCompliant, setIsCompliant] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const calculatedUg = (focalSpot * ofd) / sod;
        setUg(calculatedUg);
        const compliant = calculatedUg <= 0.2;

        if (compliant && !isCompliant) {
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2000);
        }
        setIsCompliant(compliant);
    }, [focalSpot, sod, ofd]);

    const blurAmount = Math.min(ug * 12, 20);

    const reset = () => {
        setFocalSpot(3);
        setSod(500);
        setOfd(20);
        setShowSuccess(false);
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-purple-600 text-white p-4 sm:p-6">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <motion.div
                            className="p-2 bg-white/20 rounded-lg"
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                        >
                            <Radiation className="h-5 w-5 sm:h-6 sm:w-6" />
                        </motion.div>
                        <div>
                            <h2 className="text-lg sm:text-xl font-bold">Radiography Lab</h2>
                            <p className="text-purple-100 text-xs sm:text-sm">Geometric Unsharpness Simulator</p>
                        </div>
                    </div>
                    <button onClick={reset} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                        <RefreshCw className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div className="p-4 sm:p-6">
                {/* Goal Banner */}
                <motion.div
                    className={`mb-6 p-3 rounded-xl flex items-center justify-between ${isCompliant ? 'bg-green-50 border-2 border-green-300' : 'bg-amber-50 border-2 border-amber-300'}`}
                    animate={{ scale: showSuccess ? [1, 1.02, 1] : 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex items-center gap-2">
                        <motion.div
                            animate={isCompliant ? { rotate: [0, 360] } : {}}
                            transition={{ duration: 0.5 }}
                        >
                            {isCompliant ? (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                                <AlertTriangle className="h-5 w-5 text-amber-600" />
                            )}
                        </motion.div>
                        <span className={`font-semibold text-sm ${isCompliant ? 'text-green-700' : 'text-amber-700'}`}>
                            🎯 Goal: Ug ≤ 0.20 mm
                        </span>
                    </div>
                    <motion.span
                        className={`font-mono font-bold text-lg ${isCompliant ? 'text-green-600' : 'text-amber-600'}`}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.2 }}
                        key={ug.toFixed(3)}
                    >
                        {ug.toFixed(3)} mm
                    </motion.span>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Visualization */}
                    <div className="space-y-4">
                        {/* Setup Diagram */}
                        <div className="bg-slate-900 rounded-xl p-4 sm:p-6 relative overflow-hidden">
                            <p className="text-slate-400 text-xs mb-4 text-center uppercase tracking-widest">RT Setup</p>

                            <div className="relative h-52 sm:h-60 flex flex-col items-center justify-between py-4">
                                {/* Animated rays */}
                                <motion.div
                                    className="absolute top-12 left-1/2 -translate-x-1/2 w-0 h-0 pointer-events-none"
                                    style={{
                                        borderLeft: '100px solid transparent',
                                        borderRight: '100px solid transparent',
                                        borderTop: '200px solid rgba(250,204,21,0.1)',
                                    }}
                                    animate={{ opacity: [0.1, 0.2, 0.1] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                />

                                {/* Source */}
                                <div className="relative z-10 text-center">
                                    <motion.div
                                        className="w-0 h-0 border-l-[15px] sm:border-l-[20px] border-l-transparent border-r-[15px] sm:border-r-[20px] border-r-transparent border-t-[30px] sm:border-t-[40px] border-t-yellow-400 mx-auto"
                                        animate={{
                                            filter: ['drop-shadow(0 0 8px rgba(250,204,21,0.6))', 'drop-shadow(0 0 15px rgba(250,204,21,0.9))', 'drop-shadow(0 0 8px rgba(250,204,21,0.6))']
                                        }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                    />
                                    <span className="text-yellow-400 text-[10px] sm:text-xs font-bold mt-1 block">
                                        SOURCE (F={focalSpot.toFixed(1)}mm)
                                    </span>
                                </div>

                                {/* Object */}
                                <motion.div
                                    className="relative z-10 w-3/4 h-10 sm:h-12 bg-gradient-to-b from-gray-400 to-gray-600 border-2 border-gray-500 rounded flex items-center justify-center"
                                    style={{ marginTop: 'auto', marginBottom: `${Math.min(ofd / 2, 50)}px` }}
                                >
                                    <span className="text-white text-[10px] sm:text-xs font-bold bg-black/40 px-2 rounded">WELD</span>
                                    {/* Defect in object */}
                                    <div className="absolute w-1 h-4 bg-black/60 left-1/3 top-1/2 -translate-y-1/2" />
                                </motion.div>

                                {/* Film/Detector */}
                                <motion.div
                                    className="relative z-10 w-4/5 h-3 bg-blue-500 rounded"
                                    animate={{
                                        boxShadow: ['0 0 10px rgba(59,130,246,0.4)', '0 0 20px rgba(59,130,246,0.7)', '0 0 10px rgba(59,130,246,0.4)']
                                    }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                >
                                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-blue-400 text-[10px] sm:text-xs font-bold">DETECTOR</span>
                                </motion.div>

                                {/* Distance indicators */}
                                <div className="absolute right-2 top-1/4 bottom-1/4 flex flex-col justify-between items-end">
                                    <div className="text-right">
                                        <div className="text-slate-500 text-[8px] uppercase">SOD</div>
                                        <div className="text-slate-300 text-xs font-mono">{sod}mm</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-slate-500 text-[8px] uppercase">OFD</div>
                                        <div className="text-slate-300 text-xs font-mono">{ofd}mm</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Simulated Radiograph */}
                        <div className="bg-black rounded-xl p-4 border-2 border-gray-800">
                            <h4 className="text-gray-400 text-xs mb-3 text-center uppercase tracking-widest">Radiograph Preview</h4>
                            <div className="w-full h-28 sm:h-32 bg-gradient-to-b from-slate-800 to-slate-900 rounded-lg relative overflow-hidden flex items-center justify-center">
                                {/* Film grain */}
                                <div className="absolute inset-0 opacity-20"
                                    style={{
                                        backgroundImage: 'radial-gradient(circle, #ffffff 0.5px, transparent 0.5px)',
                                        backgroundSize: '3px 3px'
                                    }}
                                />

                                {/* Defect indications with blur based on Ug */}
                                <motion.div
                                    className="relative flex items-center justify-center gap-6"
                                    animate={{ opacity: [0.9, 1, 0.9] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                >
                                    <div className="w-40 h-0.5 bg-white" style={{ filter: `blur(${blurAmount}px)` }} />
                                    <div className="w-1 h-10 bg-white rotate-12" style={{ filter: `blur(${blurAmount}px)` }} />
                                    <div className="w-6 h-6 rounded-full border-2 border-white" style={{ filter: `blur(${blurAmount}px)` }} />
                                </motion.div>

                                {/* Quality indicator */}
                                <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                                    <span className={`text-[10px] font-mono ${isCompliant ? 'text-green-400' : 'text-red-400'}`}>
                                        {isCompliant ? '✓ SHARP' : '✗ BLURRY'}
                                    </span>
                                    <span className="text-[10px] text-gray-500 font-mono">
                                        Blur: {blurAmount.toFixed(1)}px
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-200">
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <span>⚙️</span> Adjust Parameters
                        </h3>

                        <div className="space-y-6">
                            {/* Focal Spot */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <Maximize className="h-4 w-4 text-purple-600" />
                                        Source Size (F)
                                    </label>
                                    <span className="text-sm font-mono bg-white px-2 py-1 rounded border font-bold">{focalSpot.toFixed(1)} mm</span>
                                </div>
                                <input
                                    type="range" min="0.5" max="5.0" step="0.1"
                                    value={focalSpot}
                                    onChange={(e) => setFocalSpot(parseFloat(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                                />
                                <p className="text-xs text-gray-400 mt-1">↑ Larger = More blur</p>
                            </div>

                            {/* SOD */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <FileOutput className="h-4 w-4 text-purple-600" />
                                        Source-to-Object (SOD)
                                    </label>
                                    <span className="text-sm font-mono bg-white px-2 py-1 rounded border font-bold">{sod} mm</span>
                                </div>
                                <input
                                    type="range" min="100" max="1000" step="10"
                                    value={sod}
                                    onChange={(e) => setSod(parseFloat(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                                />
                                <p className="text-xs text-gray-400 mt-1">↑ Larger = Less blur</p>
                            </div>

                            {/* OFD */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <Layers className="h-4 w-4 text-purple-600" />
                                        Object-to-Film (OFD)
                                    </label>
                                    <span className="text-sm font-mono bg-white px-2 py-1 rounded border font-bold">{ofd} mm</span>
                                </div>
                                <input
                                    type="range" min="5" max="100" step="1"
                                    value={ofd}
                                    onChange={(e) => setOfd(parseFloat(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                                />
                                <p className="text-xs text-gray-400 mt-1">↓ Smaller = Less blur</p>
                            </div>
                        </div>

                        {/* Formula & Result */}
                        <motion.div
                            className={`mt-6 p-4 rounded-xl border-2 ${isCompliant ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}
                            animate={{ scale: showSuccess ? [1, 1.03, 1] : 1 }}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                                    Geometric Unsharpness
                                </div>
                                <div className="text-xs font-mono bg-white/50 px-2 py-1 rounded">
                                    Ug = (F × OFD) ÷ SOD
                                </div>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <motion.span
                                    className={`text-4xl sm:text-5xl font-bold font-mono ${isCompliant ? 'text-green-600' : 'text-red-600'}`}
                                    key={ug.toFixed(3)}
                                    initial={{ scale: 1.2 }}
                                    animate={{ scale: 1 }}
                                >
                                    {ug.toFixed(3)}
                                </motion.span>
                                <span className="text-gray-500 font-bold text-xl">mm</span>
                            </div>

                            <AnimatePresence>
                                {isCompliant ? (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="mt-2 text-sm text-green-700 flex items-center gap-1"
                                    >
                                        <CheckCircle className="h-4 w-4" />
                                        Within acceptable limits!
                                    </motion.p>
                                ) : (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="mt-2 text-sm text-red-700"
                                    >
                                        ⚠️ Exceeds 0.20mm limit. Adjust parameters.
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>

                {/* Info */}
                <motion.div
                    className="mt-6 flex items-start gap-2 text-xs sm:text-sm text-gray-600 bg-purple-50 border border-purple-200 p-3 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <Info className="h-4 w-4 flex-shrink-0 mt-0.5 text-purple-600" />
                    <span><strong>RT Principle:</strong> Geometric unsharpness (Ug) causes image blur. Minimize it by using smaller source, larger SOD, or smaller OFD.</span>
                </motion.div>
            </div>
        </div>
    );
}
