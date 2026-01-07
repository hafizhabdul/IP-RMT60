import { useState, useEffect } from 'react';
import { Droplets, Clock, Eraser, Search, RotateCcw, CheckCircle, Info } from 'lucide-react';
import { GamificationService } from '../../../services/GamificationService';

export default function PenetrantLab() {
    // Steps: 0: Pre-Clean, 1: Apply Penetrant, 2: Dwell, 3: Remove Excess, 4: Apply Developer, 5: Inspect
    const [step, setStep] = useState(0);
    const [dwellTimer, setDwellTimer] = useState(0);
    const [isDwelling, setIsDwelling] = useState(false);
    const [crackFound, setCrackFound] = useState(false);
    const [rewardMessage, setRewardMessage] = useState(null);

    const DWELL_TIME = 5; // seconds for demo

    useEffect(() => {
        let interval;
        if (isDwelling && dwellTimer > 0) {
            interval = setInterval(() => {
                setDwellTimer(prev => prev - 1);
            }, 1000);
        } else if (dwellTimer === 0 && isDwelling) {
            setIsDwelling(false);
            setStep(3); // Move to Remove Excess
        }
        return () => clearInterval(interval);
    }, [isDwelling, dwellTimer]);

    const handleAction = (action) => {
        switch (action) {
            case 'clean':
                if (step === 0) setStep(1);
                break;
            case 'penetrant':
                if (step === 1) {
                    setStep(2);
                    setDwellTimer(DWELL_TIME);
                    setIsDwelling(true);
                }
                break;
            case 'wipe':
                if (step === 3) setStep(4);
                break;
            case 'developer':
                if (step === 4) setStep(5);
                break;
            case 'inspect':
                if (step === 5) {
                    setCrackFound(true);
                    awardXP();
                }
                break;
        }
    };

    const awardXP = () => {
        // Award XP logic
        const { newXP, levelUp } = GamificationService.addXP(50);
        const badge = GamificationService.unlockBadge('penetrant_pro'); // Need to add this badge to service if we want specific badge

        setRewardMessage({
            xp: 50,
            levelUp,
            badge
        });
        setTimeout(() => setRewardMessage(null), 4000);
    };

    const reset = () => {
        setStep(0);
        setDwellTimer(0);
        setIsDwelling(false);
        setCrackFound(false);
        setRewardMessage(null);
    };

    // Visual styles for the plate based on step
    const getPlateStyle = () => {
        const base = "w-64 h-64 rounded-lg shadow-inner transition-all duration-1000 relative flex items-center justify-center border-2 border-gray-300";
        switch (step) {
            case 0: return `${base} bg-slate-300`; // Dirty
            case 1: return `${base} bg-slate-200`; // Cleaned
            case 2: return `${base} bg-red-500`; // Penetrant Applied
            case 3: return `${base} bg-red-600`; // Dwell (darker?)
            case 4: return `${base} bg-slate-200`; // Wiped (looks clean but penetrant in crack)
            case 5: return `${base} bg-white`; // Developer Applied (White background)
            default: return base;
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white rounded-xl shadow-lg border border-gray-200 relative mt-8">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Droplets className="h-6 w-6 text-red-500" />
                        Penetrant Testing Lab (PT)
                    </h2>
                    <p className="text-gray-600">Follow the 6-step process to find surface-breaking defects.</p>
                </div>
                <button onClick={reset} className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                    <RotateCcw className="h-5 w-5" />
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Visualizer */}
                <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl border border-gray-200 relative">
                    {/* Reward Toast */}
                    {rewardMessage && (
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 animate-bounce">
                            <div className="bg-yellow-500 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-3 border-2 border-yellow-300">
                                <div>
                                    <p className="font-bold text-lg leading-none">+{rewardMessage.xp} XP</p>
                                    {rewardMessage.levelUp && <p className="text-xs uppercase font-bold tracking-wider text-yellow-100">Level Up!</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={getPlateStyle()}>
                        {/* Crack Visualization */}
                        {/* 
                            Step 0: Hidden (Dirty)
                            Step 1: Hidden (Clean)
                            Step 2: Hidden (Covered by Red)
                            Step 3: Hidden (Covered)
                            Step 4: Hidden (Inside crack)
                            Step 5: Visible (Bleed out)
                         */}
                        {step === 0 && <span className="text-slate-500 font-bold opacity-20">DIRTY SURFACE</span>}

                        {/* The Crack Indication */}
                        <div className={`absolute w-1 h-24 bg-red-600 rounded-full transition-all duration-1000 ${step >= 5 ? 'opacity-100 scale-150 blur-[2px]' : 'opacity-0'
                            }`}></div>

                        {/* Developer Powder Effect */}
                        {step >= 5 && <div className="absolute inset-0 bg-white/50 mix-blend-overlay pointer-events-none"></div>}

                        {crackFound && (
                            <div className="absolute -right-4 -top-4 bg-green-500 text-white p-2 rounded-full animate-bounce">
                                <CheckCircle className="h-6 w-6" />
                            </div>
                        )}

                        {isDwelling && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white text-3xl font-bold font-mono">
                                00:0{dwellTimer}
                            </div>
                        )}
                    </div>
                    <div className="mt-4 text-center">
                        <h3 className="font-bold text-lg text-gray-800">
                            Status: {
                                ['Surface Dirty', 'Surface Clean', 'Penetrant Applied', 'Dwelling...', 'Excess Removed', 'Developer Applied'][Math.min(step, 5)]
                            }
                        </h3>
                    </div>
                </div>

                {/* Controls */}
                <div className="space-y-4">
                    <ProcessStep
                        idx={0} current={step}
                        title="1. Pre-Cleaning"
                        desc="Remove dirt, oil, and grease."
                        icon={Eraser}
                        action={() => handleAction('clean')}
                        label="Clean Surface"
                    />
                    <ProcessStep
                        idx={1} current={step}
                        title="2. Apply Penetrant"
                        desc="Apply red dye penetrant to surface."
                        icon={Droplets}
                        action={() => handleAction('penetrant')}
                        label="Apply Spray"
                        color="text-red-500"
                    />
                    <ProcessStep
                        idx={2} current={step}
                        title="3. Dwell Time"
                        desc="Wait for penetrant to soak into cracks."
                        icon={Clock}
                        disabled={true}
                        label={isDwelling ? `Wait ${dwellTimer}s` : "Dwell"}
                    />
                    <ProcessStep
                        idx={3} current={step}
                        title="4. Remove Excess"
                        desc="Wipe off surface penetrant."
                        icon={Eraser}
                        action={() => handleAction('wipe')}
                        label="Wipe Surface"
                    />
                    <ProcessStep
                        idx={4} current={step}
                        title="5. Apply Developer"
                        desc="Apply white developer to draw out penetrant."
                        icon={Droplets}
                        action={() => handleAction('developer')}
                        label="Apply Developer"
                        color="text-slate-400"
                    />
                    <ProcessStep
                        idx={5} current={step}
                        title="6. Inspection"
                        desc="Look for red indications on white background."
                        icon={Search}
                        action={() => handleAction('inspect')}
                        label="Identify Defects"
                        color="text-green-600"
                    />
                </div>
            </div>
        </div>
    );
}

function ProcessStep({ idx, current, title, desc, icon: Icon, action, label, disabled, color = "text-gray-500" }) {
    const isActive = current === idx;
    const isCompleted = current > idx;
    const isLocked = current < idx;

    return (
        <div className={`p-4 rounded-lg border transition-all ${isActive ? 'bg-orange-50 border-orange-200 shadow-md transform scale-102' :
                isCompleted ? 'bg-gray-50 border-gray-100' : 'bg-white border-gray-100 opacity-50'
            }`}>
            <div className="flex items-center justify-between">
                <div className="flex items-start gap-3">
                    <div className={`mt-1 p-2 rounded-lg ${isActive ? 'bg-orange-100' : 'bg-gray-100'}`}>
                        <Icon className={`h-5 w-5 ${isActive ? 'text-orange-600' : color}`} />
                    </div>
                    <div>
                        <h4 className={`font-semibold ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>{title}</h4>
                        <p className="text-sm text-gray-500">{desc}</p>
                    </div>
                </div>
                {isActive && !disabled && (
                    <button
                        onClick={action}
                        className="px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
                    >
                        {label}
                    </button>
                )}
                {isCompleted && <CheckCircle className="h-5 w-5 text-green-500" />}
                {disabled && isActive && <span className="text-xs font-mono font-bold text-orange-500 animate-pulse">{label}</span>}
            </div>
        </div>
    );
}
