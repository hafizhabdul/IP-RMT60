import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Zap, RefreshCw, Info, CheckCircle, AlertTriangle, Gauge, Radio } from 'lucide-react';

/**
 * ET Impedance Plane Plotter
 *
 * Interactive eddy-current impedance plane (Level I core lesson):
 *  - X axis = normalized resistance change (ΔR)
 *  - Y axis = normalized inductive reactance change (ΔX)
 *
 * Teaches PHASE SEPARATION: lift-off moves the operating point along a
 * near-horizontal "lift-off line" (low phase angle), while a crack/flaw
 * pushes the signal almost vertically (high phase angle). The numeric
 * separation between the two phase angles is what a technician reads to
 * distinguish real defects from lift-off noise.
 *
 * The model is a stylised but DIRECTIONALLY-correct representation:
 * exact ohm magnitudes are illustrative, but the relative directions,
 * the frequency-driven rotation, and the phase separation are physically
 * sound for the Level I concept.
 */

// Material conductivity presets (%IACS) — affects vector magnitude/rotation
const MATERIALS = [
    { id: 'al', label: 'Aluminium', sigma: 40, hint: '~40 %IACS' },
    { id: 'steel', label: 'Baja Karbon', sigma: 10, hint: '~10 %IACS' },
    { id: 'ss', label: 'Stainless', sigma: 5, hint: '~5 %IACS' },
];

const DEFECTS = [
    { id: 'none', label: 'Tanpa Cacat' },
    { id: 'crack', label: 'Retak Permukaan' },
    { id: 'subsurface', label: 'Cacat Bawah Permukaan' },
];

export default function ImpedanceLab() {
    const prefersReducedMotion = useReducedMotion();

    const [freq, setFreq] = useState(100); // kHz
    const [liftOff, setLiftOff] = useState(0.5); // mm
    const [materialId, setMaterialId] = useState('al');
    const [defectId, setDefectId] = useState('crack');
    const [defectDepth, setDefectDepth] = useState(0.8); // mm

    const material = MATERIALS.find((m) => m.id === materialId) ?? MATERIALS[0];
    const hasDefect = defectId !== 'none';

    // ---- Stylised impedance model -------------------------------------------------
    // Plane is drawn in an SVG viewBox 0..100 (x) / 0..100 (y). Origin (operating
    // point with probe balanced on a flawless surface) sits near bottom-left.
    const ORIGIN = { x: 22, y: 80 };

    // Conductivity factor: lower conductivity = larger reactance response.
    const condFactor = 1 + (40 - material.sigma) / 60; // ~1.0 (Al) .. ~1.58 (SS)

    // Frequency rotation: higher frequency rotates the lift-off vector UP (steeper),
    // which REDUCES the separation between lift-off and flaw. Lower frequency keeps
    // lift-off more horizontal, giving WIDER separation. (Directionally correct for
    // the Level I lesson on choosing frequency for good phase discrimination.)
    const fNorm = (freq - 10) / (500 - 10); // 0..1 across slider range

    // Lift-off phase angle measured from the +X (resistance) axis.
    const liftOffAngleDeg = 12 + fNorm * 40; // ~12° (low f) .. ~52° (high f)
    // Flaw phase angle — close to vertical, slightly frequency dependent.
    const flawAngleDeg = hasDefect
        ? (defectId === 'crack' ? 86 : 70) - fNorm * 10
        : 0;

    const phaseSeparation = hasDefect ? Math.abs(flawAngleDeg - liftOffAngleDeg) : 0;
    const goodSeparation = phaseSeparation >= 45;

    // Lift-off vector length grows with lift-off distance.
    const liftOffMag = liftOff * (16 + fNorm * 10); // SVG units
    const loRad = (liftOffAngleDeg * Math.PI) / 180;
    const liftOffPoint = {
        x: ORIGIN.x + liftOffMag * Math.cos(loRad),
        y: ORIGIN.y - liftOffMag * Math.sin(loRad),
    };

    // Flaw vector length grows with defect depth & conductivity factor.
    const flawMag = hasDefect ? (8 + defectDepth * 14) * condFactor * (0.7 + fNorm * 0.6) : 0;
    const flawRad = (flawAngleDeg * Math.PI) / 180;
    // The flaw signal is added on top of the current lift-off operating point.
    const operatingPoint = {
        x: liftOffPoint.x + flawMag * Math.cos(flawRad),
        y: liftOffPoint.y - flawMag * Math.sin(flawRad),
    };

    // Numeric ΔR / ΔX read-outs (stylised ohms relative to origin).
    const deltaR = ((operatingPoint.x - ORIGIN.x) / 60) * 50;
    const deltaX = ((ORIGIN.y - operatingPoint.y) / 60) * 50;
    const vectorPhase = Math.atan2(deltaX, deltaR) * (180 / Math.PI);
    const vectorMag = Math.sqrt(deltaR * deltaR + deltaX * deltaX);

    // Skin depth (mm): δ ≈ 21 / √(f[kHz] × σ[%IACS] × μr); μr ≈ 1 for these presets.
    const skinDepth = 21 / Math.sqrt(freq * material.sigma * 1);

    const [showSeparation, setShowSeparation] = useState(false);
    useEffect(() => {
        if (goodSeparation && hasDefect) {
            setShowSeparation(true);
            const t = setTimeout(() => setShowSeparation(false), 1800);
            return () => clearTimeout(t);
        }
    }, [goodSeparation, hasDefect, freq, defectId]);

    const reset = () => {
        setFreq(100);
        setLiftOff(0.5);
        setMaterialId('al');
        setDefectId('crack');
        setDefectDepth(0.8);
        setShowSeparation(false);
    };

    const motionTransition = prefersReducedMotion
        ? { duration: 0 }
        : { type: 'spring', stiffness: 120, damping: 18 };

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-slate-600 text-white p-4 sm:p-6">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <motion.div
                            className="p-2 bg-white/20 rounded-lg"
                            animate={prefersReducedMotion ? { rotate: 0 } : { rotate: [0, 8, -8, 0] }}
                            transition={prefersReducedMotion ? { duration: 0 } : { repeat: Infinity, duration: 3 }}
                        >
                            <Zap className="h-5 w-5 sm:h-6 sm:w-6" />
                        </motion.div>
                        <div>
                            <h2 className="text-lg sm:text-xl font-bold">ET Impedance Plane Plotter</h2>
                            <p className="text-slate-200 text-xs sm:text-sm">
                                Pisahkan sinyal lift-off vs cacat lewat sudut fasa
                            </p>
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
                {/* Goal / separation banner */}
                <motion.div
                    className={`mb-6 p-3 rounded-xl flex items-center justify-between ${
                        !hasDefect
                            ? 'bg-slate-50 border-2 border-slate-300'
                            : goodSeparation
                              ? 'bg-green-50 border-2 border-green-300'
                              : 'bg-amber-50 border-2 border-amber-300'
                    }`}
                    animate={{ scale: showSeparation && !prefersReducedMotion ? [1, 1.02, 1] : 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex items-center gap-2">
                        <motion.div
                            animate={goodSeparation && hasDefect && !prefersReducedMotion ? { rotate: [0, 360] } : {}}
                            transition={{ duration: 0.5 }}
                        >
                            {!hasDefect ? (
                                <Gauge className="h-5 w-5 text-slate-500" />
                            ) : goodSeparation ? (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                                <AlertTriangle className="h-5 w-5 text-amber-600" />
                            )}
                        </motion.div>
                        <span
                            className={`font-semibold text-sm ${
                                !hasDefect
                                    ? 'text-slate-600'
                                    : goodSeparation
                                      ? 'text-green-700'
                                      : 'text-amber-700'
                            }`}
                        >
                            🎯 Target: pemisahan fasa ≥ 45°
                        </span>
                    </div>
                    <motion.span
                        className={`font-mono font-bold text-lg ${
                            !hasDefect
                                ? 'text-slate-500'
                                : goodSeparation
                                  ? 'text-green-600'
                                  : 'text-amber-600'
                        }`}
                        animate={prefersReducedMotion ? { scale: 1 } : { scale: [1, 1.1, 1] }}
                        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
                        key={phaseSeparation.toFixed(0)}
                    >
                        {hasDefect ? `${phaseSeparation.toFixed(0)}°` : '—'}
                    </motion.span>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Visualization: Impedance Plane */}
                    <div className="space-y-4">
                        <div className="bg-slate-900 rounded-xl p-4 sm:p-6 relative overflow-hidden">
                            <p className="text-slate-400 text-xs mb-3 text-center uppercase tracking-widest">
                                Bidang Impedansi (ΔR / ΔX)
                            </p>

                            <div className="relative w-full aspect-square max-w-sm mx-auto">
                                <svg
                                    className="w-full h-full"
                                    viewBox="0 0 100 100"
                                    role="img"
                                    aria-label={`Bidang impedansi. Sudut fasa lift-off ${liftOffAngleDeg.toFixed(0)} derajat, sinyal cacat ${flawAngleDeg.toFixed(0)} derajat, pemisahan ${phaseSeparation.toFixed(0)} derajat.`}
                                >
                                    {/* Grid */}
                                    {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((g) => (
                                        <g key={g}>
                                            <line
                                                x1={g}
                                                y1="2"
                                                x2={g}
                                                y2="98"
                                                stroke="rgba(148,163,184,0.12)"
                                                strokeWidth="0.4"
                                            />
                                            <line
                                                x1="2"
                                                y1={g}
                                                x2="98"
                                                y2={g}
                                                stroke="rgba(148,163,184,0.12)"
                                                strokeWidth="0.4"
                                            />
                                        </g>
                                    ))}

                                    {/* Axes */}
                                    <line
                                        x1="6"
                                        y1={ORIGIN.y}
                                        x2="96"
                                        y2={ORIGIN.y}
                                        stroke="rgba(148,163,184,0.5)"
                                        strokeWidth="0.7"
                                    />
                                    <line
                                        x1={ORIGIN.x}
                                        y1="96"
                                        x2={ORIGIN.x}
                                        y2="4"
                                        stroke="rgba(148,163,184,0.5)"
                                        strokeWidth="0.7"
                                    />
                                    <text x="93" y={ORIGIN.y - 2} fill="#94a3b8" fontSize="3.6" textAnchor="end">
                                        ΔR
                                    </text>
                                    <text x={ORIGIN.x + 2} y="7" fill="#94a3b8" fontSize="3.6">
                                        ΔX
                                    </text>

                                    {/* Reference lift-off line (faint guide) */}
                                    <line
                                        x1={ORIGIN.x}
                                        y1={ORIGIN.y}
                                        x2={ORIGIN.x + 70 * Math.cos(loRad)}
                                        y2={ORIGIN.y - 70 * Math.sin(loRad)}
                                        stroke="rgba(96,165,250,0.25)"
                                        strokeWidth="0.6"
                                        strokeDasharray="2 2"
                                    />
                                    {/* Reference flaw direction (faint guide) */}
                                    {hasDefect && (
                                        <line
                                            x1={ORIGIN.x}
                                            y1={ORIGIN.y}
                                            x2={ORIGIN.x + 70 * Math.cos(flawRad)}
                                            y2={ORIGIN.y - 70 * Math.sin(flawRad)}
                                            stroke="rgba(248,113,113,0.22)"
                                            strokeWidth="0.6"
                                            strokeDasharray="2 2"
                                        />
                                    )}

                                    {/* Lift-off vector (blue) */}
                                    <motion.line
                                        x1={ORIGIN.x}
                                        y1={ORIGIN.y}
                                        animate={{ x2: liftOffPoint.x, y2: liftOffPoint.y }}
                                        transition={motionTransition}
                                        stroke="#3b82f6"
                                        strokeWidth="1.4"
                                        strokeLinecap="round"
                                    />

                                    {/* Flaw vector (red) — drawn from lift-off point */}
                                    {hasDefect && (
                                        <motion.line
                                            animate={{
                                                x1: liftOffPoint.x,
                                                y1: liftOffPoint.y,
                                                x2: operatingPoint.x,
                                                y2: operatingPoint.y,
                                            }}
                                            transition={motionTransition}
                                            stroke="#ef4444"
                                            strokeWidth="1.4"
                                            strokeLinecap="round"
                                        />
                                    )}

                                    {/* Origin (balanced operating point) */}
                                    <circle cx={ORIGIN.x} cy={ORIGIN.y} r="1.6" fill="#cbd5e1" />

                                    {/* Lift-off node */}
                                    <motion.circle
                                        animate={{ cx: liftOffPoint.x, cy: liftOffPoint.y }}
                                        transition={motionTransition}
                                        r="1.5"
                                        fill="#60a5fa"
                                    />

                                    {/* Live operating point (with flaw) */}
                                    <motion.circle
                                        animate={{ cx: operatingPoint.x, cy: operatingPoint.y }}
                                        transition={motionTransition}
                                        r={prefersReducedMotion ? 2.6 : undefined}
                                        fill={hasDefect ? '#ef4444' : '#60a5fa'}
                                    />
                                    {!prefersReducedMotion && (
                                        <motion.circle
                                            animate={{
                                                cx: operatingPoint.x,
                                                cy: operatingPoint.y,
                                                r: [2.4, 4, 2.4],
                                                opacity: [0.6, 0, 0.6],
                                            }}
                                            transition={{ repeat: Infinity, duration: 1.6 }}
                                            fill={hasDefect ? '#ef4444' : '#60a5fa'}
                                        />
                                    )}
                                </svg>
                            </div>

                            {/* Legend */}
                            <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[10px] sm:text-xs font-mono">
                                <span className="flex items-center gap-1 text-blue-300">
                                    <span className="inline-block w-3 h-0.5 bg-blue-400" /> Lift-off
                                </span>
                                <span className="flex items-center gap-1 text-red-300">
                                    <span className="inline-block w-3 h-0.5 bg-red-500" /> Sinyal Cacat
                                </span>
                                <span className="flex items-center gap-1 text-slate-400">
                                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-300" /> Titik Balans
                                </span>
                            </div>
                        </div>

                        {/* Numeric read-outs */}
                        <div className="grid grid-cols-3 gap-2">
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-center">
                                <div className="text-[10px] text-gray-400 uppercase tracking-wide">ΔR</div>
                                <div className="font-mono font-bold text-gray-800 text-sm">{deltaR.toFixed(1)} Ω</div>
                            </div>
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-center">
                                <div className="text-[10px] text-gray-400 uppercase tracking-wide">ΔX</div>
                                <div className="font-mono font-bold text-gray-800 text-sm">{deltaX.toFixed(1)} Ω</div>
                            </div>
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-center">
                                <div className="text-[10px] text-gray-400 uppercase tracking-wide">|Z| / θ</div>
                                <div className="font-mono font-bold text-gray-800 text-sm">
                                    {vectorMag.toFixed(0)} / {vectorPhase.toFixed(0)}°
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-200">
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <span>⚙️</span> Atur Parameter Probe
                        </h3>

                        <div className="space-y-5">
                            {/* Frequency */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label
                                        htmlFor="et-freq"
                                        className="text-sm font-medium text-gray-700 flex items-center gap-2"
                                    >
                                        <Radio className="h-4 w-4 text-slate-600" />
                                        Frekuensi
                                    </label>
                                    <span className="text-sm font-mono bg-white px-2 py-1 rounded border font-bold">
                                        {freq} kHz
                                    </span>
                                </div>
                                <input
                                    id="et-freq"
                                    type="range"
                                    min="10"
                                    max="500"
                                    step="5"
                                    value={freq}
                                    onChange={(e) => setFreq(parseFloat(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-slate-600"
                                />
                                <p className="text-xs text-gray-400 mt-1">
                                    ↑ Tinggi = sensitif permukaan, lift-off makin tegak (pemisahan turun)
                                </p>
                            </div>

                            {/* Lift-off */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label
                                        htmlFor="et-liftoff"
                                        className="text-sm font-medium text-gray-700 flex items-center gap-2"
                                    >
                                        <Gauge className="h-4 w-4 text-slate-600" />
                                        Lift-off (jarak probe)
                                    </label>
                                    <span className="text-sm font-mono bg-white px-2 py-1 rounded border font-bold">
                                        {liftOff.toFixed(2)} mm
                                    </span>
                                </div>
                                <input
                                    id="et-liftoff"
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.05"
                                    value={liftOff}
                                    onChange={(e) => setLiftOff(parseFloat(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                />
                                <p className="text-xs text-gray-400 mt-1">
                                    Bergerak sepanjang garis lift-off (biru)
                                </p>
                            </div>

                            {/* Material / conductivity */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">
                                    Material (konduktivitas)
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {MATERIALS.map((m) => (
                                        <button
                                            key={m.id}
                                            type="button"
                                            onClick={() => setMaterialId(m.id)}
                                            aria-pressed={materialId === m.id}
                                            className={`px-2 py-2 rounded-lg text-xs font-semibold border-2 transition-colors ${
                                                materialId === m.id
                                                    ? 'bg-slate-600 text-white border-slate-600'
                                                    : 'bg-white text-gray-600 border-gray-200 hover:border-slate-300'
                                            }`}
                                        >
                                            <div>{m.label}</div>
                                            <div className="text-[10px] font-mono opacity-80">{m.hint}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Defect type */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Jenis Cacat</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {DEFECTS.map((d) => (
                                        <button
                                            key={d.id}
                                            type="button"
                                            onClick={() => setDefectId(d.id)}
                                            aria-pressed={defectId === d.id}
                                            className={`px-2 py-2 rounded-lg text-xs font-semibold border-2 transition-colors ${
                                                defectId === d.id
                                                    ? 'bg-red-500 text-white border-red-500'
                                                    : 'bg-white text-gray-600 border-gray-200 hover:border-red-300'
                                            }`}
                                        >
                                            {d.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Defect depth (only when a defect is selected) */}
                            <AnimatePresence initial={false}>
                                {hasDefect && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="flex justify-between mb-2">
                                            <label
                                                htmlFor="et-depth"
                                                className="text-sm font-medium text-gray-700"
                                            >
                                                Kedalaman Cacat
                                            </label>
                                            <span className="text-sm font-mono bg-white px-2 py-1 rounded border font-bold">
                                                {defectDepth.toFixed(2)} mm
                                            </span>
                                        </div>
                                        <input
                                            id="et-depth"
                                            type="range"
                                            min="0.1"
                                            max="2"
                                            step="0.05"
                                            value={defectDepth}
                                            onChange={(e) => setDefectDepth(parseFloat(e.target.value))}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500"
                                        />
                                        <p className="text-xs text-gray-400 mt-1">
                                            ↑ Dalam = amplitudo sinyal cacat naik
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Result panel: phase separation + skin depth */}
                        <motion.div
                            className={`mt-6 p-4 rounded-xl border-2 ${
                                !hasDefect
                                    ? 'bg-slate-50 border-slate-200'
                                    : goodSeparation
                                      ? 'bg-green-50 border-green-300'
                                      : 'bg-amber-50 border-amber-300'
                            }`}
                            animate={{ scale: showSeparation && !prefersReducedMotion ? [1, 1.03, 1] : 1 }}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                                    Pemisahan Fasa
                                </div>
                                <div className="text-xs font-mono bg-white/60 px-2 py-1 rounded">
                                    θ_cacat − θ_liftoff
                                </div>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <motion.span
                                    className={`text-4xl sm:text-5xl font-bold font-mono ${
                                        !hasDefect
                                            ? 'text-slate-400'
                                            : goodSeparation
                                              ? 'text-green-600'
                                              : 'text-amber-600'
                                    }`}
                                    key={phaseSeparation.toFixed(0)}
                                    initial={prefersReducedMotion ? false : { scale: 1.2 }}
                                    animate={{ scale: 1 }}
                                >
                                    {hasDefect ? phaseSeparation.toFixed(0) : '—'}
                                </motion.span>
                                {hasDefect && <span className="text-gray-500 font-bold text-xl">°</span>}
                            </div>

                            <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] font-mono text-gray-500">
                                <span>θ lift-off: {liftOffAngleDeg.toFixed(0)}°</span>
                                <span>θ cacat: {hasDefect ? `${flawAngleDeg.toFixed(0)}°` : '—'}</span>
                            </div>

                            <AnimatePresence mode="wait">
                                {hasDefect && (
                                    <motion.p
                                        key={goodSeparation ? 'ok' : 'bad'}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className={`mt-2 text-sm flex items-center gap-1 ${
                                            goodSeparation ? 'text-green-700' : 'text-amber-700'
                                        }`}
                                    >
                                        {goodSeparation ? (
                                            <>
                                                <CheckCircle className="h-4 w-4" />
                                                Cacat mudah dibedakan dari lift-off.
                                            </>
                                        ) : (
                                            <>⚠️ Pemisahan kecil — sinyal tumpang tindih. Turunkan frekuensi.</>
                                        )}
                                    </motion.p>
                                )}
                            </AnimatePresence>

                            {/* Skin depth read-out */}
                            <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between text-xs">
                                <span className="text-gray-500 font-mono">δ ≈ 21 / √(f·σ·μr)</span>
                                <span className="font-mono font-bold text-slate-700">
                                    δ ≈ {skinDepth.toFixed(2)} mm
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Teaching panel */}
                <motion.div
                    className="mt-6 flex items-start gap-2 text-xs sm:text-sm text-gray-600 bg-slate-50 border border-slate-200 p-3 rounded-lg"
                    initial={prefersReducedMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <Info className="h-4 w-4 flex-shrink-0 mt-0.5 text-slate-600" />
                    <span>
                        <strong>Prinsip ET:</strong> Pada bidang impedansi, <em>lift-off</em> menggeser titik
                        kerja di sepanjang garis fasa rendah (biru), sedangkan <em>cacat</em> seperti retak
                        memutar sinyal hampir tegak lurus (merah, ~90°). Teknisi membaca <strong>pemisahan
                        sudut fasa</strong> untuk membedakan cacat asli dari noise lift-off — instrumen modern
                        memutar fasa agar lift-off mendatar dan cacat tampil murni vertikal. Frekuensi mengatur
                        kedalaman penetrasi (skin depth) sekaligus rotasi fasa. Acuan: ASME V Article 8,
                        ASTM E309/E243, ISO 15549.
                    </span>
                </motion.div>
            </div>
        </div>
    );
}
