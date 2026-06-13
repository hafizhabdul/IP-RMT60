import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Eye, Sun, Ruler, Triangle, Layers, Info, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';

// VT Level I acceptance limits (from lesson seeds)
//  - Lighting: minimum 1000 lux on the inspection surface (ASME V Art. 9 / AWS D1.1)
//  - Viewing distance: maximum 600 mm (ASME V Art. 9)
//  - Viewing angle: minimum 30 deg to the surface (ASME V Art. 9)
//  - Undercut: max 1.0 mm (statically loaded) / 0.25 mm (cyclically loaded) per AWS D1.1
//  - Reinforcement (convexity): simplified cap-height limit of 3.0 mm for this sim (AWS D1.1)
const MIN_LUX = 1000;
const MAX_DISTANCE = 600;
const MIN_ANGLE = 30;
const UNDERCUT_LIMIT_STATIC = 1.0;
const UNDERCUT_LIMIT_CYCLIC = 0.25;
const REINFORCEMENT_LIMIT = 3.0;

export default function VisualLab() {
    const prefersReducedMotion = useReducedMotion();

    // (A) Lighting check
    const [lux, setLux] = useState(450);
    const [distance, setDistance] = useState(400);
    const [angle, setAngle] = useState(45);

    // (B) Weld profile gauge
    const [reinforcement, setReinforcement] = useState(1.5);
    const [undercut, setUndercut] = useState(0.3);
    const [cyclic, setCyclic] = useState(false); // false = statically loaded, true = cyclically loaded

    const [showSuccess, setShowSuccess] = useState(false);
    const [lastVerdict, setLastVerdict] = useState(false);

    // Lighting evaluation
    const luxPass = lux >= MIN_LUX;
    const distancePass = distance <= MAX_DISTANCE;
    const anglePass = angle >= MIN_ANGLE;
    const lightingPass = luxPass && distancePass && anglePass;

    // Weld evaluation
    const undercutLimit = cyclic ? UNDERCUT_LIMIT_CYCLIC : UNDERCUT_LIMIT_STATIC;
    const undercutPass = undercut <= undercutLimit;
    const reinforcementPass = reinforcement <= REINFORCEMENT_LIMIT;
    const weldPass = undercutPass && reinforcementPass;

    // Overall inspection verdict: you can only accept a weld if you can actually SEE it
    const inspectable = lightingPass;
    const overallPass = lightingPass && weldPass;

    useEffect(() => {
        if (overallPass && !lastVerdict) {
            setShowSuccess(true);
            const t = setTimeout(() => setShowSuccess(false), 2000);
            setLastVerdict(true);
            return () => clearTimeout(t);
        }
        if (!overallPass) setLastVerdict(false);
    }, [overallPass, lastVerdict]);

    const reset = () => {
        setLux(450);
        setDistance(400);
        setAngle(45);
        setReinforcement(1.5);
        setUndercut(0.3);
        setCyclic(false);
        setShowSuccess(false);
        setLastVerdict(false);
    };

    // Surface brightness driven by lux (clamped so it never goes fully black).
    // Visibility (contrast/clarity) collapses below the 1000-lux minimum.
    const brightness = Math.min(lux / MIN_LUX, 1.6);
    // Apparent clarity of defects: combine lighting + grazing geometry.
    const angleClarity = Math.max(0, Math.min(1, (angle - 10) / 50)); // grazing low angles foreshorten the view
    const lightClarity = Math.max(0, Math.min(1, lux / MIN_LUX));
    const clarity = Math.max(0.06, lightClarity * (0.3 + 0.7 * angleClarity));
    const blurPx = (1 - clarity) * 6;

    // ---- Weld cross-section geometry (SVG units) ----
    const svgW = 360;
    const svgH = 240;
    const baseY = 150;          // top of base metal
    const plateThickness = 60;  // drawn base metal block height
    const weldHalfWidth = 70;   // half-width of the weld cap footprint
    const cx = svgW / 2;
    // Reinforcement crown height in px (1 mm -> ~14 px for visibility)
    const crownPx = reinforcement * 14;
    // Undercut groove depth in px (1 mm -> ~18 px)
    const undercutPx = undercut * 18;

    // Weld cap path (a smooth crown sitting on the base metal)
    const leftToe = cx - weldHalfWidth;
    const rightToe = cx + weldHalfWidth;
    const crownTopY = baseY - crownPx;
    const weldPath = `M ${leftToe} ${baseY}
        Q ${cx} ${crownTopY - 6}, ${rightToe} ${baseY}
        L ${rightToe} ${baseY + plateThickness}
        L ${leftToe} ${baseY + plateThickness} Z`;

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-rose-600 text-white p-4 sm:p-6">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <motion.div
                            className="p-2 bg-white/20 rounded-lg"
                            animate={prefersReducedMotion ? { rotate: 0 } : { rotate: [0, 5, -5, 0] }}
                            transition={prefersReducedMotion ? { duration: 0 } : { repeat: Infinity, duration: 3 }}
                        >
                            <Eye className="h-5 w-5 sm:h-6 sm:w-6" />
                        </motion.div>
                        <div>
                            <h2 className="text-lg sm:text-xl font-bold">Visual Testing Lab</h2>
                            <p className="text-rose-100 text-xs sm:text-sm">Pencahayaan &amp; Profil Las (AWS D1.1 / ASME V)</p>
                        </div>
                    </div>
                    <button
                        onClick={reset}
                        aria-label="Reset simulator"
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                        <RefreshCw className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div className="p-4 sm:p-6">
                {/* Overall Verdict Banner */}
                <motion.div
                    className={`mb-6 p-3 rounded-xl flex items-center justify-between ${overallPass ? 'bg-green-50 border-2 border-green-300' : 'bg-amber-50 border-2 border-amber-300'}`}
                    animate={{ scale: showSuccess && !prefersReducedMotion ? [1, 1.02, 1] : 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex items-center gap-2">
                        <motion.div
                            animate={overallPass && !prefersReducedMotion ? { rotate: [0, 360] } : {}}
                            transition={{ duration: 0.5 }}
                        >
                            {overallPass ? (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                                <AlertTriangle className="h-5 w-5 text-amber-600" />
                            )}
                        </motion.div>
                        <span className={`font-semibold text-sm ${overallPass ? 'text-green-700' : 'text-amber-700'}`}>
                            🎯 Tujuan: Kondisi inspeksi memadai &amp; las memenuhi kriteria
                        </span>
                    </div>
                    <span className={`font-mono font-bold text-sm sm:text-lg ${overallPass ? 'text-green-600' : 'text-amber-600'}`}>
                        {overallPass ? 'ACCEPT' : 'REJECT'}
                    </span>
                </motion.div>

                {/* ===================== SECTION A: LIGHTING CHECK ===================== */}
                <div className="mb-8">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-rose-700 mb-3 flex items-center gap-2">
                        <Sun className="h-4 w-4" /> Bagian A — Cek Pencahayaan &amp; Geometri Pandang
                    </h3>

                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Visualization: sample surface that dims/brightens */}
                        <div className="space-y-4">
                            <div className="bg-slate-900 rounded-xl p-4 sm:p-6 relative overflow-hidden">
                                <p className="text-slate-400 text-xs mb-4 text-center uppercase tracking-widest">Permukaan Sampel</p>
                                <div className="relative h-48 sm:h-56 flex items-center justify-center">
                                    {/* The illuminated surface */}
                                    <motion.div
                                        className="relative w-56 h-36 rounded-lg overflow-hidden border border-slate-700"
                                        style={{
                                            filter: `brightness(${brightness}) blur(${blurPx}px)`,
                                            background: 'repeating-linear-gradient(90deg, #6b7280 0px, #6b7280 18px, #9ca3af 18px, #9ca3af 20px)',
                                        }}
                                        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: [0.96, 1, 0.96] }}
                                        transition={prefersReducedMotion ? { duration: 0 } : { repeat: Infinity, duration: 3 }}
                                    >
                                        {/* A faint reference flaw line that only "reads" with good light + angle */}
                                        <div
                                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-20 bg-black/70 rotate-6"
                                            style={{ opacity: clarity }}
                                        />
                                        <div
                                            className="absolute right-6 top-6 w-8 h-2 bg-black/60 rounded"
                                            style={{ opacity: clarity }}
                                        />
                                    </motion.div>

                                    {/* Lux glow overlay */}
                                    <motion.div
                                        className="absolute top-2 right-2 rounded-full"
                                        style={{
                                            width: 28, height: 28,
                                            background: 'radial-gradient(circle, rgba(250,204,21,0.9), transparent 70%)',
                                            opacity: Math.min(lux / 1200, 1),
                                        }}
                                        animate={prefersReducedMotion ? { scale: 1 } : { scale: [1, 1.15, 1] }}
                                        transition={prefersReducedMotion ? { duration: 0 } : { repeat: Infinity, duration: 2 }}
                                    />

                                    {/* Visibility verdict */}
                                    <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                                        <span className={`text-[10px] font-mono ${lightingPass ? 'text-green-400' : 'text-red-400'}`}>
                                            {lightingPass ? '✓ DAPAT DIINSPEKSI' : '✗ KONDISI TIDAK MEMADAI'}
                                        </span>
                                        <span className="text-[10px] text-slate-500 font-mono">
                                            Visibilitas: {Math.round(clarity * 100)}%
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Per-criterion lighting status chips */}
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { label: 'Lux ≥ 1000', pass: luxPass, val: `${lux}` },
                                    { label: 'Jarak ≤ 600', pass: distancePass, val: `${distance}mm` },
                                    { label: 'Sudut ≥ 30°', pass: anglePass, val: `${angle}°` },
                                ].map((c) => (
                                    <div
                                        key={c.label}
                                        className={`p-2 rounded-lg border text-center ${c.pass ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
                                    >
                                        <div className={`text-[10px] font-semibold ${c.pass ? 'text-green-700' : 'text-red-700'}`}>{c.label}</div>
                                        <div className={`text-xs font-mono font-bold ${c.pass ? 'text-green-600' : 'text-red-600'}`}>
                                            {c.pass ? '✓ ' : '✗ '}{c.val}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Controls for lighting */}
                        <div className="bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-200">
                            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <span>⚙️</span> Atur Kondisi Inspeksi
                            </h4>
                            <div className="space-y-6">
                                {/* Illumination */}
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label htmlFor="vt-lux" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                            <Sun className="h-4 w-4 text-rose-600" /> Iluminasi
                                        </label>
                                        <span className="text-sm font-mono bg-white px-2 py-1 rounded border font-bold">{lux} lux</span>
                                    </div>
                                    <input
                                        id="vt-lux"
                                        type="range" min="0" max="5000" step="50"
                                        value={lux}
                                        onChange={(e) => setLux(parseInt(e.target.value, 10))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">Minimum 1000 lux; optimum 3000–5000 lux untuk retak halus.</p>
                                </div>

                                {/* Viewing distance */}
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label htmlFor="vt-distance" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                            <Ruler className="h-4 w-4 text-rose-600" /> Jarak Pandang
                                        </label>
                                        <span className="text-sm font-mono bg-white px-2 py-1 rounded border font-bold">{distance} mm</span>
                                    </div>
                                    <input
                                        id="vt-distance"
                                        type="range" min="100" max="1000" step="10"
                                        value={distance}
                                        onChange={(e) => setDistance(parseInt(e.target.value, 10))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">↓ Maksimum 600 mm dari permukaan (ASME V Art. 9).</p>
                                </div>

                                {/* Viewing angle */}
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label htmlFor="vt-angle" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                            <Triangle className="h-4 w-4 text-rose-600" /> Sudut Pandang
                                        </label>
                                        <span className="text-sm font-mono bg-white px-2 py-1 rounded border font-bold">{angle}°</span>
                                    </div>
                                    <input
                                        id="vt-angle"
                                        type="range" min="0" max="90" step="1"
                                        value={angle}
                                        onChange={(e) => setAngle(parseInt(e.target.value, 10))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">↑ Minimum 30° ke permukaan; sudut menyerempet menyamarkan cacat.</p>
                                </div>

                                {/* Lighting verdict box */}
                                <div className={`p-3 rounded-xl border-2 ${lightingPass ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
                                    <div className="flex items-center gap-2">
                                        {lightingPass
                                            ? <CheckCircle className="h-5 w-5 text-green-600" />
                                            : <AlertTriangle className="h-5 w-5 text-red-600" />}
                                        <span className={`text-sm font-semibold ${lightingPass ? 'text-green-700' : 'text-red-700'}`}>
                                            {lightingPass ? 'Kondisi memenuhi syarat inspeksi' : 'Kondisi belum memadai — cacat bisa terlewat'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===================== SECTION B: WELD PROFILE GAUGE ===================== */}
                <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-rose-700 mb-3 flex items-center gap-2">
                        <Layers className="h-4 w-4" /> Bagian B — Gauge Profil Las (Penampang)
                    </h3>

                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* SVG cross-section */}
                        <div className="space-y-4">
                            <div className="bg-slate-900 rounded-xl p-4 sm:p-6 relative overflow-hidden">
                                <p className="text-slate-400 text-xs mb-2 text-center uppercase tracking-widest">Penampang Lasan</p>
                                <svg
                                    viewBox={`0 0 ${svgW} ${svgH}`}
                                    className="w-full h-52 sm:h-60"
                                    role="img"
                                    aria-label={`Penampang las: tinggi reinforcement ${reinforcement.toFixed(2)} mm, kedalaman undercut ${undercut.toFixed(2)} mm`}
                                >
                                    {/* Reference surface line (top of base metal) */}
                                    <line x1="0" y1={baseY} x2={svgW} y2={baseY} stroke="#475569" strokeWidth="1" strokeDasharray="4 4" />

                                    {/* Base metal blocks (left & right) */}
                                    <rect x="0" y={baseY} width={leftToe} height={plateThickness} fill="#334155" stroke="#1e293b" />
                                    <rect x={rightToe} y={baseY} width={svgW - rightToe} height={plateThickness} fill="#334155" stroke="#1e293b" />

                                    {/* Weld cap (crown) */}
                                    <motion.path
                                        d={weldPath}
                                        fill="#64748b"
                                        stroke="#94a3b8"
                                        strokeWidth="1.5"
                                        animate={{ d: weldPath }}
                                        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.25 }}
                                    />

                                    {/* Undercut groove at the left toe */}
                                    {undercut > 0 && (
                                        <motion.path
                                            d={`M ${leftToe - 18} ${baseY}
                                                Q ${leftToe - 6} ${baseY + undercutPx}, ${leftToe} ${baseY}`}
                                            fill="none"
                                            stroke="#f87171"
                                            strokeWidth="3"
                                            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: [0.7, 1, 0.7] }}
                                            transition={prefersReducedMotion ? { duration: 0 } : { repeat: Infinity, duration: 1.8 }}
                                        />
                                    )}

                                    {/* Reinforcement height dimension marker */}
                                    <line x1={cx} y1={baseY} x2={cx} y2={crownTopY} stroke="#fbbf24" strokeWidth="1" />
                                    <circle cx={cx} cy={crownTopY} r="3" fill="#fbbf24" />
                                    <text x={cx + 8} y={crownTopY + 4} fill="#fbbf24" fontSize="11" fontFamily="monospace">
                                        h={reinforcement.toFixed(1)}mm
                                    </text>

                                    {/* Undercut dimension marker */}
                                    {undercut > 0 && (
                                        <text x={leftToe - 70} y={baseY + 18} fill="#f87171" fontSize="11" fontFamily="monospace">
                                            uc={undercut.toFixed(2)}mm
                                        </text>
                                    )}

                                    {/* Toe labels */}
                                    <text x={leftToe - 4} y={baseY + plateThickness + 16} fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="middle">toe</text>
                                    <text x={rightToe + 4} y={baseY + plateThickness + 16} fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="middle">toe</text>
                                    <text x={cx} y={baseY + plateThickness + 16} fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">base metal</text>
                                </svg>

                                {/* Per-criterion weld status chips */}
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                    <div className={`p-2 rounded-lg border text-center ${undercutPass ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                                        <div className={`text-[10px] font-semibold ${undercutPass ? 'text-green-700' : 'text-red-700'}`}>
                                            Undercut ≤ {undercutLimit.toFixed(2)} mm
                                        </div>
                                        <div className={`text-xs font-mono font-bold ${undercutPass ? 'text-green-600' : 'text-red-600'}`}>
                                            {undercutPass ? '✓ ' : '✗ '}{undercut.toFixed(2)} mm
                                        </div>
                                    </div>
                                    <div className={`p-2 rounded-lg border text-center ${reinforcementPass ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                                        <div className={`text-[10px] font-semibold ${reinforcementPass ? 'text-green-700' : 'text-red-700'}`}>
                                            Reinf. ≤ {REINFORCEMENT_LIMIT.toFixed(1)} mm
                                        </div>
                                        <div className={`text-xs font-mono font-bold ${reinforcementPass ? 'text-green-600' : 'text-red-600'}`}>
                                            {reinforcementPass ? '✓ ' : '✗ '}{reinforcement.toFixed(1)} mm
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Controls for weld */}
                        <div className="bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-200">
                            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <span>⚙️</span> Atur Profil &amp; Kriteria
                            </h4>
                            <div className="space-y-6">
                                {/* Loading type toggle */}
                                <div>
                                    <span className="text-sm font-medium text-gray-700 block mb-2">Jenis Pembebanan (kriteria undercut)</span>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            type="button"
                                            aria-pressed={!cyclic}
                                            onClick={() => setCyclic(false)}
                                            className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${!cyclic ? 'bg-rose-600 text-white' : 'bg-white border-2 border-gray-200 text-gray-700'}`}
                                        >
                                            Statis (≤ 1.0 mm)
                                        </button>
                                        <button
                                            type="button"
                                            aria-pressed={cyclic}
                                            onClick={() => setCyclic(true)}
                                            className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${cyclic ? 'bg-rose-600 text-white' : 'bg-white border-2 border-gray-200 text-gray-700'}`}
                                        >
                                            Siklik (≤ 0.25 mm)
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">Lasan siklik (fatik) jauh lebih ketat terhadap undercut.</p>
                                </div>

                                {/* Reinforcement height */}
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label htmlFor="vt-reinf" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                            <Layers className="h-4 w-4 text-rose-600" /> Tinggi Reinforcement
                                        </label>
                                        <span className="text-sm font-mono bg-white px-2 py-1 rounded border font-bold">{reinforcement.toFixed(1)} mm</span>
                                    </div>
                                    <input
                                        id="vt-reinf"
                                        type="range" min="0" max="5" step="0.1"
                                        value={reinforcement}
                                        onChange={(e) => setReinforcement(parseFloat(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">↑ Crown terlalu tinggi = stress raiser (batas ≈ 3 mm).</p>
                                </div>

                                {/* Undercut depth */}
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label htmlFor="vt-undercut" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                            <Ruler className="h-4 w-4 text-rose-600" /> Kedalaman Undercut
                                        </label>
                                        <span className="text-sm font-mono bg-white px-2 py-1 rounded border font-bold">{undercut.toFixed(2)} mm</span>
                                    </div>
                                    <input
                                        id="vt-undercut"
                                        type="range" min="0" max="2" step="0.05"
                                        value={undercut}
                                        onChange={(e) => setUndercut(parseFloat(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">↑ Alur di kaki las yang mengurangi luas penampang.</p>
                                </div>

                                {/* Weld verdict box */}
                                <motion.div
                                    className={`p-4 rounded-xl border-2 ${weldPass ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}
                                    animate={{ scale: showSuccess && !prefersReducedMotion ? [1, 1.03, 1] : 1 }}
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        {weldPass
                                            ? <CheckCircle className="h-5 w-5 text-green-600" />
                                            : <AlertTriangle className="h-5 w-5 text-red-600" />}
                                        <span className={`text-lg font-bold ${weldPass ? 'text-green-700' : 'text-red-700'}`}>
                                            {weldPass ? 'WELD ACCEPTABLE' : 'WELD REJECTED'}
                                        </span>
                                    </div>
                                    <AnimatePresence mode="wait">
                                        {weldPass ? (
                                            <motion.p
                                                key="weld-ok"
                                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                className="text-sm text-green-700"
                                            >
                                                Profil las memenuhi kriteria AWS D1.1.
                                            </motion.p>
                                        ) : (
                                            <motion.ul
                                                key="weld-fail"
                                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                className="text-sm text-red-700 list-disc list-inside space-y-0.5"
                                            >
                                                {!undercutPass && (
                                                    <li>Undercut {undercut.toFixed(2)} mm &gt; batas {undercutLimit.toFixed(2)} mm ({cyclic ? 'siklik' : 'statis'}).</li>
                                                )}
                                                {!reinforcementPass && (
                                                    <li>Reinforcement {reinforcement.toFixed(1)} mm &gt; batas {REINFORCEMENT_LIMIT.toFixed(1)} mm.</li>
                                                )}
                                            </motion.ul>
                                        )}
                                    </AnimatePresence>
                                    {!inspectable && (
                                        <p className="mt-2 text-xs text-amber-700">
                                            ⚠️ Catatan: kondisi pencahayaan/geometri belum memadai, jadi pengukuran ini belum bisa dianggap valid.
                                        </p>
                                    )}
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Teaching Info */}
                <motion.div
                    className="mt-6 flex items-start gap-2 text-xs sm:text-sm text-gray-600 bg-rose-50 border border-rose-200 p-3 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <Info className="h-4 w-4 flex-shrink-0 mt-0.5 text-rose-600" />
                    <span>
                        <strong>Prinsip VT:</strong> VT adalah inspeksi pertama setelah pengelasan dan bergantung penuh pada kondisi pandang.
                        Verifikasi <strong>≥ 1000 lux</strong>, <strong>jarak ≤ 600 mm</strong>, dan <strong>sudut ≥ 30°</strong> (ASME V Article 9) — tanpa itu cacat bisa tak terlihat.
                        Penerimaan profil mengikuti <strong>AWS D1.1</strong>: undercut maksimum <strong>1.0 mm (beban statis)</strong> atau <strong>0.25 mm (beban siklik)</strong>,
                        dan reinforcement (convexity) dibatasi agar tidak menjadi stress raiser. Retak selalu <strong>REJECT</strong>.
                    </span>
                </motion.div>
            </div>
        </div>
    );
}
