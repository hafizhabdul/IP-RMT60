import { useState, useEffect } from 'react';
import { Radiation, Layers, Maximize, AlertTriangle, FileOutput, Info } from 'lucide-react';
import { GamificationService } from '../../../services/GamificationService';

export default function RadiographyLab() {
    // Parameters
    const [focalSpot, setFocalSpot] = useState(3); // mm
    const [sod, setSod] = useState(500); // mm (Source to Object)
    const [ofd, setOfd] = useState(20); // mm (Object to Film)

    // Results
    const [ug, setUg] = useState(0);
    const [isCompliant, setIsCompliant] = useState(false);
    const [rewardMessage, setRewardMessage] = useState(null);
    const [hasAwarded, setHasAwarded] = useState(false);

    // Calculate Ug = F * OFD / SOD
    useEffect(() => {
        const calculatedUg = (focalSpot * ofd) / sod;
        setUg(calculatedUg);

        // Check compliance (e.g., ASME Code often requires Ug <= 0.2mm for certain thickness)
        // Let's use 0.2mm as the "Goal"
        if (calculatedUg <= 0.2) {
            setIsCompliant(true);

            // Award XP for first success compliant setup
            if (!hasAwarded) {
                // Delay slightly to let user see "Compliant"
                setTimeout(() => {
                    const { newXP, levelUp } = GamificationService.addXP(40);
                    const badge = GamificationService.unlockBadge('rt_rookie');

                    setRewardMessage({
                        xp: 40,
                        levelUp,
                        badge
                    });
                    setHasAwarded(true);
                    setTimeout(() => setRewardMessage(null), 4000);
                }, 500);
            }

        } else {
            setIsCompliant(false);
        }
    }, [focalSpot, sod, ofd, hasAwarded]);

    // Calculate blur Amount (px) for visualization
    // Map Ug 0-1.0mm to 0-10px blur
    const blurAmount = Math.min(ug * 10, 20);

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white rounded-xl shadow-lg border border-gray-200 relative mt-8">
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

            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Radiation className="h-6 w-6 text-purple-600" />
                        Radiography Lab (RT)
                    </h2>
                    <p className="text-gray-600">Geometric Unsharpness (Ug) Simulator. Goal: Achieve Ug ≤ 0.20 mm.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Visualizer */}
                <div className="flex flex-col gap-4">
                    {/* Diagram (Simplified CSS representation) */}
                    <div className="bg-slate-900 rounded-xl p-8 h-[300px] relative flex flex-col items-center justify-between border border-slate-700 overflow-hidden">

                        {/* Source */}
                        <div className="relative z-10">
                            <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[40px] border-t-yellow-400 opacity-80 neon-glow"></div>
                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-yellow-400 text-xs font-bold text-nowrap">Source (F)</span>
                        </div>

                        {/* Rays (CSS Gradients) */}
                        <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/20 via-transparent to-transparent pointer-events-none mix-blend-screen"
                            style={{ clipPath: 'polygon(50% 10%, 0% 100%, 100% 100%)' }}></div>

                        {/* Object */}
                        <div className="w-48 h-12 bg-gray-500 border border-gray-400 rounded flex items-center justify-center relative z-10"
                            style={{ marginTop: 'auto', marginBottom: `${(ofd / 100) * 100}px` }}> {/* Simple visual scaling */}
                            <span className="text-white text-xs font-bold bg-black/50 px-2 rounded">Object (Weld)</span>
                        </div>

                        {/* Film */}
                        <div className="w-64 h-2 bg-blue-500 shadow-lg shadow-blue-500/50 mt-auto relative z-10">
                            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-blue-400 text-xs font-bold">Film</span>
                        </div>

                        {/* Distance Labels */}
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs flex flex-col gap-12 text-right">
                            <span>SOD: {sod}mm</span>
                            <span>OFD: {ofd}mm</span>
                        </div>
                    </div>

                    {/* Simulated Film View */}
                    <div className="bg-black rounded-xl p-4 border border-gray-800 text-center">
                        <h4 className="text-gray-400 text-sm mb-2 uppercase tracking-widest">Simulated Radiograph</h4>
                        <div className="w-full h-32 bg-slate-800 rounded relative overflow-hidden flex items-center justify-center">
                            {/* Noise Grain */}
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>

                            {/* The "Image" (A crack) */}
                            <div className="w-64 h-1 bg-white" style={{ filter: `blur(${blurAmount}px)` }}></div>
                            <div className="absolute w-2 h-16 bg-white rotate-45" style={{ filter: `blur(${blurAmount}px)` }}></div>
                        </div>
                        <p className={`mt-2 text-sm font-mono ${isCompliant ? 'text-green-400' : 'text-red-400'}`}>
                            Image Quality: {isCompliant ? 'SHARP (Compliant)' : 'BLURRY (Non-Compliant)'}
                        </p>
                    </div>
                </div>

                {/* Controls */}
                <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-200">

                    {/* Focal Spot */}
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Maximize className="h-4 w-4" /> Source Size (F)
                            </label>
                            <span className="text-sm font-mono bg-white px-2 py-1 rounded border">{focalSpot.toFixed(1)} mm</span>
                        </div>
                        <input
                            type="range" min="0.5" max="5.0" step="0.1"
                            value={focalSpot}
                            onChange={(e) => setFocalSpot(parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                        />
                        <p className="text-xs text-gray-500 mt-1">Larger sources create more penumbra (unsharpness).</p>
                    </div>

                    {/* SOD */}
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <FileOutput className="h-4 w-4" /> Source-to-Object (SOD)
                            </label>
                            <span className="text-sm font-mono bg-white px-2 py-1 rounded border">{sod} mm</span>
                        </div>
                        <input
                            type="range" min="100" max="1000" step="10"
                            value={sod}
                            onChange={(e) => setSod(parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                        />
                        <p className="text-xs text-gray-500 mt-1">Distance from source to the weld.</p>
                    </div>

                    {/* OFD */}
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Layers className="h-4 w-4" /> Object-to-Film (OFD)
                            </label>
                            <span className="text-sm font-mono bg-white px-2 py-1 rounded border">{ofd} mm</span>
                        </div>
                        <input
                            type="range" min="5" max="100" step="1"
                            value={ofd}
                            onChange={(e) => setOfd(parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                        />
                        <p className="text-xs text-gray-500 mt-1">Distance from weld to the film/detector.</p>
                    </div>

                    {/* Calculation Display */}
                    <div className={`p-4 rounded-lg border-2 ${isCompliant ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} transition-colors`}>
                        <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-2">Calculated Unsharpness (Ug)</h3>
                        <div className="flex items-end gap-2">
                            <span className={`text-4xl font-bold font-mono ${isCompliant ? 'text-green-600' : 'text-red-600'}`}>
                                {ug.toFixed(3)}
                            </span>
                            <span className="text-gray-500 font-bold mb-1">mm</span>
                        </div>

                        <div className="mt-2 text-xs text-gray-600 font-mono">
                            Ug = (F × OFD) / SOD
                        </div>

                        {!isCompliant && (
                            <div className="mt-3 flex items-start gap-2 text-red-600 text-sm">
                                <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                                <span>Code Requirement: Ug must be ≤ 0.20 mm. Reduce F, OFD, or increase SOD.</span>
                            </div>
                        )}
                        {isCompliant && (
                            <div className="mt-3 flex items-start gap-2 text-green-600 text-sm">
                                <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
                                <span>Geometric Unsharpness is within acceptable limits.</span>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
