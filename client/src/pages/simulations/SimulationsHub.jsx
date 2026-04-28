import { Link } from 'react-router-dom';
import { ArrowRight, Beaker } from 'lucide-react';
import { MethodIcon } from '@/components/elearning/primitives';

const SIMS = [
    {
        method: 'UT',
        title: 'Ultrasonic Testing',
        description: 'Hitung beam angle, wavelength, dan near field length. Visualisasi propagasi gelombang di material.',
        path: '/e-learning/simulations/ut',
        topics: ['Beam angle', 'Snell law', 'Near field'],
    },
    {
        method: 'MT',
        title: 'Magnetic Particle',
        description: 'Yoke simulation interaktif. Position & magnetize untuk reveal crack via flux leakage.',
        path: '/e-learning/simulations/mt',
        topics: ['Yoke', 'Flux pattern', 'Particle behavior'],
    },
    {
        method: 'PT',
        title: 'Liquid Penetrant',
        description: 'Step-by-step process flow. 6 stages dari cleaning sampai inspection.',
        path: '/e-learning/simulations/pt',
        topics: ['Capillary', 'Dwell time', 'Developer'],
    },
    {
        method: 'RT',
        title: 'Radiographic Testing',
        description: 'Geometric unsharpness calculator. Lihat efek source size & distance ke radiograph clarity.',
        path: '/e-learning/simulations/rt',
        topics: ['Ug calc', 'IQI', 'Density'],
    },
];

export default function SimulationsHub() {
    return (
        <div className="space-y-6 sm:space-y-7">
            {/* Header */}
            <div data-el-reveal="1">
                <div className="font-plexMono text-[11px] uppercase tracking-[0.12em] text-slate-500">
                    SNS NDT / E-Learning / Simulations
                </div>
                <h1 className="mt-2 text-[28px] sm:text-[32px] font-bold tracking-tight leading-tight">
                    Simulation Lab
                </h1>
                <p className="text-[14px] text-slate-600 mt-1 max-w-[60ch]">
                    Eksplor fisika NDT melalui simulasi interaktif. Pilih method untuk masuk virtual lab.
                </p>
            </div>

            {/* Stat banner */}
            <div className="rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-4 items-center" data-el-reveal="2">
                <div className="inline-flex h-12 w-12 rounded-lg bg-orange-amber items-center justify-center shadow-el-orange">
                    <Beaker className="h-6 w-6 text-white" />
                </div>
                <div>
                    <div className="font-plexMono text-[10.5px] uppercase tracking-[0.12em] text-amber-400">
                        Hands-on physics
                    </div>
                    <div className="text-[16px] sm:text-[18px] font-bold tracking-tight mt-0.5">
                        4 simulasi siap pakai · belajar lewat pengalaman
                    </div>
                </div>
                <span className="font-plexMono text-[11px] uppercase tracking-[0.08em] text-slate-400 tabular-nums">
                    UT · MT · PT · RT
                </span>
            </div>

            {/* Simulation grid */}
            <section data-el-reveal="3">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-[18px] font-bold tracking-tight">Pilih Simulasi</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {SIMS.map((sim) => (
                        <Link
                            key={sim.method}
                            to={sim.path}
                            className="group relative overflow-hidden bg-white rounded-xl border border-slate-200 p-6 hover:border-orange-300 hover:shadow-el-card-hover transition-all"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <MethodIcon method={sim.method} size="md" />
                                <span className="rounded-full bg-emerald-100 text-emerald-700 px-2.5 py-1 font-plexMono text-[10.5px] font-bold uppercase tracking-[0.08em]">
                                    Available
                                </span>
                            </div>
                            <div className="font-plexMono text-[10.5px] uppercase tracking-[0.1em] text-slate-500 mb-1">
                                NDT / {sim.method}
                            </div>
                            <h3 className="text-[20px] font-bold tracking-tight leading-snug mb-2 group-hover:text-orange-700 transition-colors">
                                {sim.title}
                            </h3>
                            <p className="text-[13.5px] text-slate-600 mb-4 line-clamp-3">{sim.description}</p>

                            <div className="flex flex-wrap gap-1.5 mb-5">
                                {sim.topics.map((t) => (
                                    <span
                                        key={t}
                                        className="rounded-full border border-slate-200 px-2.5 py-0.5 font-plexMono text-[10px] uppercase tracking-[0.06em] text-slate-600"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                <span className="text-[13px] font-semibold text-slate-700 group-hover:text-orange-700 transition-colors">
                                    Launch simulation
                                </span>
                                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Coming soon row */}
            <div className="rounded-xl border-2 border-dashed border-slate-200 bg-white p-6 text-center" data-el-reveal="4">
                <div className="font-plexMono text-[11px] uppercase tracking-[0.12em] text-slate-500 mb-1">
                    Coming soon
                </div>
                <div className="text-[14px] text-slate-700">
                    VT (Visual) · ET (Eddy Current) · PAUT · TOFD simulations
                </div>
            </div>
        </div>
    );
}
