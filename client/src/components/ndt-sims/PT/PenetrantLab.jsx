import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Droplets, Clock, Eraser, Search, RotateCcw, CheckCircle, Info, X, Sparkles } from 'lucide-react';

export default function PenetrantLab() {
    const prefersReducedMotion = useReducedMotion();
    const [step, setStep] = useState(0);
    const [dwellTimer, setDwellTimer] = useState(0);
    const [isDwelling, setIsDwelling] = useState(false);
    const [crackFound, setCrackFound] = useState(false);
    const [showHint, setShowHint] = useState(true);

    // Progress for each step (0-100)
    const [cleanProgress, setCleanProgress] = useState(0);
    const [sprayProgress, setSprayProgress] = useState(0);
    const [wipeProgress, setWipeProgress] = useState(0);
    const [developerProgress, setDeveloperProgress] = useState(0);

    // Visual effects
    const [clickEffects, setClickEffects] = useState([]);
    const plateRef = useRef(null);

    const DWELL_TIME = 5;
    const TAPS_REQUIRED = 5; // Taps needed per step

    useEffect(() => {
        let interval;
        if (isDwelling && dwellTimer > 0) {
            interval = setInterval(() => {
                setDwellTimer(prev => prev - 1);
            }, 1000);
        } else if (dwellTimer === 0 && isDwelling) {
            setIsDwelling(false);
            setStep(3);
        }
        return () => clearInterval(interval);
    }, [isDwelling, dwellTimer]);

    const addClickEffect = (x, y, color) => {
        const id = Date.now();
        setClickEffects(prev => [...prev, { id, x, y, color }]);
        setTimeout(() => {
            setClickEffects(prev => prev.filter(e => e.id !== id));
        }, 600);
    };

    const handlePlateInteraction = (e) => {
        if (!plateRef.current || isDwelling) return;

        const rect = plateRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (step === 0) {
            // Cleaning
            addClickEffect(x, y, 'blue');
            const newProgress = cleanProgress + (100 / TAPS_REQUIRED);
            setCleanProgress(Math.min(100, newProgress));
            if (newProgress >= 100) {
                setTimeout(() => setStep(1), 300);
            }
        } else if (step === 1) {
            // Spraying penetrant
            addClickEffect(x, y, 'red');
            const newProgress = sprayProgress + (100 / TAPS_REQUIRED);
            setSprayProgress(Math.min(100, newProgress));
            if (newProgress >= 100) {
                setTimeout(() => {
                    setStep(2);
                    setDwellTimer(DWELL_TIME);
                    setIsDwelling(true);
                }, 300);
            }
        } else if (step === 3) {
            // Wiping
            addClickEffect(x, y, 'gray');
            const newProgress = wipeProgress + (100 / TAPS_REQUIRED);
            setWipeProgress(Math.min(100, newProgress));
            if (newProgress >= 100) {
                setTimeout(() => setStep(4), 300);
            }
        } else if (step === 4) {
            // Applying developer
            addClickEffect(x, y, 'white');
            const newProgress = developerProgress + (100 / TAPS_REQUIRED);
            setDeveloperProgress(Math.min(100, newProgress));
            if (newProgress >= 100) {
                setTimeout(() => setStep(5), 300);
            }
        }
    };

    const handleInspect = () => {
        if (step === 5) {
            setCrackFound(true);
        }
    };

    const reset = () => {
        setStep(0);
        setDwellTimer(0);
        setIsDwelling(false);
        setCrackFound(false);
        setShowHint(true);
        setCleanProgress(0);
        setSprayProgress(0);
        setWipeProgress(0);
        setDeveloperProgress(0);
        setClickEffects([]);
    };

    const getPlateBackground = () => {
        if (step === 0) return `linear-gradient(135deg, #64748b ${100 - cleanProgress}%, #94a3b8 ${100 - cleanProgress}%)`;
        if (step === 1) return `linear-gradient(135deg, #94a3b8 ${100 - sprayProgress}%, #ef4444 ${100 - sprayProgress}%)`;
        if (step === 2 || step === 3) return '#ef4444';
        if (step === 4) return `linear-gradient(135deg, #94a3b8 ${100 - developerProgress}%, #ffffff ${100 - developerProgress}%)`;
        return '#ffffff';
    };

    const getCurrentProgress = () => {
        if (step === 0) return cleanProgress;
        if (step === 1) return sprayProgress;
        if (step === 3) return wipeProgress;
        if (step === 4) return developerProgress;
        return 100;
    };

    const getStepAction = () => {
        if (step === 0) return { text: `Tap to clean (${Math.ceil((100 - cleanProgress) / 20)} left)`, icon: '🧹', color: 'blue' };
        if (step === 1) return { text: `Tap to spray (${Math.ceil((100 - sprayProgress) / 20)} left)`, icon: '🔴', color: 'red' };
        if (step === 3) return { text: `Tap to wipe (${Math.ceil((100 - wipeProgress) / 20)} left)`, icon: '🧽', color: 'gray' };
        if (step === 4) return { text: `Tap to apply (${Math.ceil((100 - developerProgress) / 20)} left)`, icon: '⚪', color: 'purple' };
        if (step === 5) return { text: 'Inspect for cracks', icon: '🔍', color: 'green' };
        return null;
    };

    const statusLabels = ['Dirty Surface', 'Surface Clean', 'Penetrant Applied', 'Dwell Complete', 'Excess Removed', 'Developer Applied'];

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-green-600 text-white p-4 sm:p-6">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <motion.div
                            className="p-2 bg-white/20 rounded-lg"
                            animate={step === 2 && !prefersReducedMotion ? { scale: [1, 1.1, 1] } : {}}
                            transition={{ repeat: step === 2 && !prefersReducedMotion ? Infinity : 0, duration: 1 }}
                        >
                            <Droplets className="h-5 w-5 sm:h-6 sm:w-6" />
                        </motion.div>
                        <div>
                            <h2 className="text-lg sm:text-xl font-bold">Penetrant Testing Lab</h2>
                            <p className="text-green-100 text-xs sm:text-sm">Tap the surface to perform each step</p>
                        </div>
                    </div>
                    <button onClick={reset} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                        <RotateCcw className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div className="p-4 sm:p-6">
                {/* Overall Progress */}
                <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-2">
                        <span className="font-semibold">Step {Math.min(step + 1, 6)} of 6: {statusLabels[Math.min(step, 5)]}</span>
                        <span>{Math.round((step / 5) * 100)}% Complete</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-green-500"
                            animate={{ width: `${(step / 5) * 100}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Interactive Plate */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-sm font-semibold text-gray-700">Test Specimen</h3>
                            {step !== 2 && step !== 5 && (
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500">Step Progress:</span>
                                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-green-500"
                                            animate={{ width: `${getCurrentProgress()}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <motion.div
                            ref={plateRef}
                            className="relative h-72 sm:h-80 md:h-96 rounded-xl overflow-hidden border-4 border-gray-400 cursor-pointer select-none active:border-green-500 transition-colors"
                            style={{ background: getPlateBackground() }}
                            onClick={handlePlateInteraction}
                            whileTap={{ scale: 0.99 }}
                        >
                            {/* Click effects */}
                            <AnimatePresence>
                                {clickEffects.map(effect => (
                                    <motion.div
                                        key={effect.id}
                                        className="absolute pointer-events-none rounded-full"
                                        style={{
                                            left: effect.x - 30,
                                            top: effect.y - 30,
                                            width: 60,
                                            height: 60,
                                            background: effect.color === 'red' ? 'rgba(239,68,68,0.5)' :
                                                effect.color === 'blue' ? 'rgba(59,130,246,0.5)' :
                                                    effect.color === 'white' ? 'rgba(255,255,255,0.8)' :
                                                        'rgba(100,116,139,0.5)'
                                        }}
                                        initial={{ scale: 0, opacity: 1 }}
                                        animate={{ scale: 2, opacity: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                    />
                                ))}
                            </AnimatePresence>

                            {/* Dirty texture for step 0 */}
                            {step === 0 && cleanProgress < 100 && (
                                <motion.div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.4) 2px, transparent 2px)',
                                        backgroundSize: '15px 15px',
                                        opacity: (100 - cleanProgress) / 100
                                    }}
                                />
                            )}

                            {/* The Crack - visible in final step */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                <motion.div
                                    className="w-2 h-28 rounded-full"
                                    style={{
                                        background: step >= 5
                                            ? 'linear-gradient(to bottom, #ef4444, #dc2626, #ef4444)'
                                            : 'transparent'
                                    }}
                                    animate={step >= 5
                                        ? (prefersReducedMotion
                                            ? { boxShadow: '0 0 30px rgba(239,68,68,0.9)' }
                                            : { boxShadow: ['0 0 10px rgba(239,68,68,0.5)', '0 0 30px rgba(239,68,68,0.9)', '0 0 10px rgba(239,68,68,0.5)'] })
                                        : {}}
                                    transition={prefersReducedMotion ? { duration: 0 } : { repeat: Infinity, duration: 1.2 }}
                                />
                            </div>

                            {/* Crack found indicator */}
                            <AnimatePresence>
                                {crackFound && (
                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        className="absolute right-4 top-4 bg-green-500 text-white p-3 rounded-full shadow-xl"
                                    >
                                        <CheckCircle className="h-8 w-8" />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Dwell countdown */}
                            <AnimatePresence>
                                {isDwelling && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                                    >
                                        <div className="text-center text-white">
                                            <motion.div
                                                className="text-7xl font-bold font-mono"
                                                animate={prefersReducedMotion ? { scale: 1 } : { scale: [1, 1.1, 1] }}
                                                transition={prefersReducedMotion ? { duration: 0 } : { repeat: Infinity, duration: 1 }}
                                            >
                                                {dwellTimer}
                                            </motion.div>
                                            <p className="text-lg uppercase tracking-widest mt-2">Dwell Time</p>
                                            <p className="text-sm mt-1 opacity-70">Penetrant soaking into cracks...</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Action hint overlay */}
                            {getStepAction() && !isDwelling && !crackFound && (
                                <motion.div
                                    className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur px-4 py-3 rounded-xl shadow-lg"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    key={step}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{getStepAction().icon}</span>
                                            <span className="font-semibold text-gray-700">{getStepAction().text}</span>
                                        </div>
                                        {step === 5 && (
                                            <motion.button
                                                onClick={(e) => { e.stopPropagation(); handleInspect(); }}
                                                className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                Inspect
                                            </motion.button>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {/* Hint */}
                            <AnimatePresence>
                                {showHint && step === 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute top-3 left-3 right-3 bg-amber-100 border border-amber-300 p-3 rounded-xl"
                                    >
                                        <div className="flex justify-between items-start">
                                            <p className="text-sm text-amber-800">
                                                <strong>👆 Tap the surface</strong> multiple times to perform each step!
                                            </p>
                                            <button onClick={(e) => { e.stopPropagation(); setShowHint(false); }} className="text-amber-600 hover:text-amber-800">
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    {/* Steps Panel */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Process Steps</h3>
                        {[
                            { step: 0, title: 'Pre-Clean', desc: 'Remove contaminants', icon: Eraser, progress: cleanProgress },
                            { step: 1, title: 'Apply Penetrant', desc: 'Spray red dye', icon: Droplets, color: 'text-red-500', progress: sprayProgress },
                            { step: 2, title: 'Dwell Time', desc: 'Wait for absorption', icon: Clock },
                            { step: 3, title: 'Remove Excess', desc: 'Wipe surface clean', icon: Eraser, progress: wipeProgress },
                            { step: 4, title: 'Developer', desc: 'Apply white powder', icon: Sparkles, color: 'text-gray-400', progress: developerProgress },
                            { step: 5, title: 'Inspect', desc: 'Find red indications', icon: Search, color: 'text-green-600' },
                        ].map((s) => {
                            const Icon = s.icon;
                            const isActive = step === s.step;
                            const isCompleted = step > s.step;

                            return (
                                <motion.div
                                    key={s.step}
                                    className={`p-3 rounded-xl border-2 transition-all ${isActive ? 'bg-green-50 border-green-400 shadow-md' :
                                            isCompleted ? 'bg-gray-50 border-gray-200' :
                                                'bg-white border-gray-100 opacity-40'
                                        }`}
                                    animate={isActive && !prefersReducedMotion ? { scale: [1, 1.01, 1] } : {}}
                                    transition={{ repeat: isActive && !prefersReducedMotion ? Infinity : 0, duration: 2 }}
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${isActive ? 'bg-green-200' : isCompleted ? 'bg-green-100' : 'bg-gray-100'}`}>
                                                <Icon className={`h-4 w-4 ${isActive || isCompleted ? 'text-green-600' : s.color || 'text-gray-400'}`} />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className={`font-semibold text-sm ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                                                    {s.step + 1}. {s.title}
                                                </h4>
                                                <p className="text-xs text-gray-400">{s.desc}</p>
                                            </div>
                                        </div>

                                        {/* Progress or status */}
                                        {isActive && s.progress !== undefined && (
                                            <div className="w-16">
                                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-green-500"
                                                        style={{ width: `${s.progress}%` }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        {isCompleted && <CheckCircle className="h-5 w-5 text-green-500" />}
                                        {s.step === 2 && isActive && (
                                            <span className="text-lg font-mono font-bold text-orange-500">{dwellTimer}s</span>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Success Message */}
                <AnimatePresence>
                    {crackFound && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 p-4 bg-green-50 border-2 border-green-300 rounded-xl"
                        >
                            <div className="flex items-start gap-3">
                                <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-green-800 text-lg">🎉 Crack Detected!</h4>
                                    <p className="text-sm text-green-700 mt-1">
                                        The red bleed-out against the white developer confirms a surface-breaking discontinuity.
                                        In real inspection, you would now document the location, size, and orientation.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Info */}
                <motion.div
                    className="mt-4 flex items-start gap-2 text-xs sm:text-sm text-gray-600 bg-amber-50 border border-amber-200 p-3 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <Info className="h-4 w-4 flex-shrink-0 mt-0.5 text-amber-600" />
                    <span><strong>PT Principle:</strong> Red dye penetrant enters surface cracks by capillary action. After wiping excess and applying white developer, the trapped penetrant "bleeds out" creating visible red indications.</span>
                </motion.div>
            </div>
        </div>
    );
}
