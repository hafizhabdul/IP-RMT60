import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookA, ArrowLeft, X } from 'lucide-react';

// In-file glossary data — ~35 istilah NDT Level I lintas method.
// method: kode untuk filter & badge. 'GEN' = general (lintas method).
const TERMS = [
    {
        term: 'DAC (Distance Amplitude Correction)',
        method: 'UT',
        def: 'Kurva referensi yang menghubungkan amplitudo echo reflektor acuan dengan jaraknya. Mengoreksi penurunan amplitudo akibat atenuasi dan beam spread agar reflektor seukuran terbaca konsisten di tiap kedalaman.',
    },
    {
        term: 'TCG (Time Corrected Gain)',
        method: 'UT',
        def: 'Penambahan gain otomatis terhadap waktu tempuh (kedalaman) sehingga reflektor identik tampil pada amplitudo layar yang sama. Alternatif elektronik dari kurva DAC.',
    },
    {
        term: 'A-scan',
        method: 'UT',
        def: 'Tampilan dasar ultrasonik: sumbu horizontal = waktu/jarak, sumbu vertikal = amplitudo echo. Setiap indikasi muncul sebagai pulsa.',
    },
    {
        term: 'B-scan',
        method: 'UT',
        def: 'Tampilan penampang melintang (cross-section) yang menunjukkan kedalaman reflektor sepanjang lintasan scan.',
    },
    {
        term: 'C-scan',
        method: 'UT',
        def: 'Tampilan tampak-atas (plan view) yang memetakan posisi reflektor pada bidang permukaan, sering dengan kode warna amplitudo.',
    },
    {
        term: 'Transducer / Probe',
        method: 'UT',
        def: 'Komponen berisi kristal piezoelektrik yang mengubah energi listrik menjadi getaran ultrasonik (dan sebaliknya) untuk memancarkan dan menerima gelombang.',
    },
    {
        term: 'Couplant',
        method: 'UT',
        def: 'Media penghubung (gel, oli, air, glycerin) antara probe dan benda uji yang mengusir udara agar gelombang ultrasonik dapat menembus permukaan secara efisien.',
    },
    {
        term: "Snell's Law (Hukum Snell)",
        method: 'UT',
        def: 'Hubungan antara sudut datang dan sudut bias gelombang saat melintasi dua media berbeda kecepatan. Dasar perancangan angle beam probe.',
    },
    {
        term: 'Critical Angle (Sudut Kritis)',
        method: 'UT',
        def: 'Sudut datang saat gelombang bias mencapai 90°. Sudut kritis pertama menghasilkan gelombang shear murni; sudut kedua menimbulkan gelombang permukaan.',
    },
    {
        term: 'Near Field / Fresnel Zone',
        method: 'UT',
        def: 'Zona dekat probe dengan interferensi tekanan akustik yang fluktuatif sehingga sizing tidak andal. Panjangnya bergantung diameter kristal dan panjang gelombang.',
    },
    {
        term: 'Far Field / Fraunhofer Zone',
        method: 'UT',
        def: 'Zona di luar near field di mana intensitas beam meluruh teratur (1/jarak²) dan beam menyebar. Sizing reflektor lebih andal di sini.',
    },
    {
        term: 'Attenuation (Atenuasi)',
        method: 'UT',
        def: 'Pelemahan energi ultrasonik seiring jarak akibat penyerapan (absorption) dan penyebaran (scattering) oleh material.',
    },
    {
        term: 'Calibration Block / IIW Block',
        method: 'UT',
        def: 'Blok acuan berdimensi tetap (mis. IIW V1/V2) untuk mengkalibrasi rentang, kecepatan, beam index point, dan sudut probe.',
    },
    {
        term: 'FBH (Flat Bottom Hole)',
        method: 'UT',
        def: 'Lubang dasar rata pada blok referensi yang memodelkan reflektor menghadap beam secara tegak lurus; dipakai menetapkan level sensitivitas.',
    },
    {
        term: 'SDH (Side Drilled Hole)',
        method: 'UT',
        def: 'Lubang silindris menyamping pada blok referensi sebagai reflektor acuan untuk menyusun kurva DAC pada berbagai kedalaman.',
    },
    {
        term: 'Wavelength (Panjang Gelombang)',
        method: 'UT',
        def: 'Jarak satu siklus gelombang = kecepatan suara dibagi frekuensi. Menentukan ukuran cacat terkecil yang dapat dideteksi.',
    },
    {
        term: 'IQI (Image Quality Indicator)',
        method: 'RT',
        def: 'Penetrameter (tipe kawat atau lubang/plak) yang diletakkan di benda uji untuk mengukur sensitivitas dan kualitas radiograf.',
    },
    {
        term: 'SOD (Source-to-Object Distance)',
        method: 'RT',
        def: 'Jarak dari sumber radiasi ke permukaan benda uji. Memperbesar SOD mengurangi geometric unsharpness.',
    },
    {
        term: 'OFD (Object-to-Film Distance)',
        method: 'RT',
        def: 'Jarak dari benda uji ke film/detektor. Memperkecil OFD menurunkan unsharpness dan distorsi pembesaran.',
    },
    {
        term: 'Geometric Unsharpness (Ug)',
        method: 'RT',
        def: 'Ketidaktajaman tepi bayangan akibat ukuran sumber berhingga. Ug = f × OFD / SOD, dengan f = ukuran focal spot.',
    },
    {
        term: 'Film Density (Densitas Film)',
        method: 'RT',
        def: 'Tingkat kehitaman radiograf, diukur dengan densitometer (log rasio cahaya). Rentang densitas yang dapat diterima diatur oleh standar.',
    },
    {
        term: 'HVL (Half-Value Layer)',
        method: 'RT',
        def: 'Tebal material yang mereduksi intensitas radiasi menjadi setengahnya. Indikator daya tembus berkas dan kebutuhan shielding.',
    },
    {
        term: 'ALARA (As Low As Reasonably Achievable)',
        method: 'RT',
        def: 'Prinsip proteksi radiasi: paparan dijaga serendah yang wajar dicapai melalui kendali waktu, jarak, dan shielding.',
    },
    {
        term: 'Penetrant',
        method: 'PT',
        def: 'Cairan berwarna kontras atau fluoresen yang meresap ke diskontinuitas terbuka permukaan melalui aksi kapiler.',
    },
    {
        term: 'Developer',
        method: 'PT',
        def: 'Lapisan serbuk/suspensi yang menarik penetrant keluar dari cacat (aksi blotting) sehingga indikasi tampak dan kontras meningkat.',
    },
    {
        term: 'Dwell Time (Waktu Penetrasi)',
        method: 'PT',
        def: 'Lama penetrant dibiarkan pada permukaan agar meresap penuh ke dalam diskontinuitas sebelum kelebihan dibersihkan.',
    },
    {
        term: 'Capillary Action (Aksi Kapiler)',
        method: 'PT',
        def: 'Gaya yang menarik cairan ke celah sempit melawan gravitasi. Mekanisme dasar masuknya penetrant ke dalam cacat halus.',
    },
    {
        term: 'Yoke',
        method: 'MT',
        def: 'Alat magnetisasi berbentuk U (AC/DC atau permanen) yang menghasilkan medan longitudinal di antara kedua kakinya untuk mendeteksi cacat tegak lurus garis kaki.',
    },
    {
        term: 'Prod',
        method: 'MT',
        def: 'Sepasang elektroda kontak yang mengalirkan arus langsung melalui benda uji, menghasilkan medan magnet melingkar untuk magnetisasi lokal.',
    },
    {
        term: 'Flux Leakage (Kebocoran Fluks)',
        method: 'MT',
        def: 'Medan magnet yang bocor keluar permukaan pada lokasi diskontinuitas; menarik partikel magnetik sehingga membentuk indikasi.',
    },
    {
        term: 'Residual Magnetism (Magnet Sisa)',
        method: 'MT',
        def: 'Medan magnet yang tertinggal pada benda uji setelah arus magnetisasi dihentikan; dasar teknik residual dan alasan perlunya demagnetisasi.',
    },
    {
        term: 'Demagnetization (Demagnetisasi)',
        method: 'MT',
        def: 'Proses menghilangkan magnet sisa, biasanya dengan medan AC bolak-balik yang amplitudonya diturunkan perlahan.',
    },
    {
        term: 'Eddy Current (Arus Eddy)',
        method: 'ET',
        def: 'Arus listrik melingkar yang diinduksi pada material konduktif oleh medan magnet bolak-balik probe. Cacat mengganggu pola arus ini.',
    },
    {
        term: 'Lift-off',
        method: 'ET',
        def: 'Perubahan sinyal akibat jarak antara probe eddy current dan permukaan benda uji. Dapat menjadi gangguan sekaligus pengukuran ketebalan lapisan.',
    },
    {
        term: 'Impedance Plane (Bidang Impedansi)',
        method: 'ET',
        def: 'Diagram resistansi vs reaktansi induktif yang memetakan respons probe eddy current; arah sinyal membantu membedakan cacat, lift-off, dan perubahan konduktivitas.',
    },
    {
        term: 'Skin Depth (Kedalaman Kulit)',
        method: 'ET',
        def: 'Kedalaman saat kerapatan arus eddy turun menjadi ~37% dari nilai permukaan. Mengecil pada frekuensi, konduktivitas, dan permeabilitas yang lebih tinggi.',
    },
    {
        term: 'Discontinuity vs Defect',
        method: 'GEN',
        def: 'Diskontinuitas = interupsi pada struktur material; menjadi defect (cacat) hanya bila melebihi kriteria keberterimaan (acceptance criteria) standar yang berlaku.',
    },
    {
        term: 'Calibration (Kalibrasi)',
        method: 'GEN',
        def: 'Penyetelan dan verifikasi alat terhadap standar acuan yang tertelusur sebelum inspeksi, agar pembacaan akurat dan dapat diulang.',
    },
];

// Susun daftar method unik untuk pilihan filter, urut sesuai kemunculan logis.
const METHOD_ORDER = ['UT', 'RT', 'PT', 'MT', 'ET', 'GEN'];
const METHOD_LABEL = {
    UT: 'UT', RT: 'RT', PT: 'PT', MT: 'MT', ET: 'ET', GEN: 'General',
};

export default function GlossaryPage() {
    const [query, setQuery] = useState('');
    const [method, setMethod] = useState('');

    const availableMethods = useMemo(
        () => METHOD_ORDER.filter((m) => TERMS.some((t) => t.method === m)),
        []
    );

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return TERMS
            .filter((t) => (method ? t.method === method : true))
            .filter((t) =>
                q
                    ? t.term.toLowerCase().includes(q) || t.def.toLowerCase().includes(q)
                    : true
            )
            .sort((a, b) => a.term.localeCompare(b.term));
    }, [query, method]);

    const hasFilters = query.trim() !== '' || method !== '';

    return (
        <div className="space-y-6 sm:space-y-7">
            {/* Header */}
            <div data-el-reveal="1">
                <div className="font-plexMono text-[11px] uppercase tracking-[0.12em] text-slate-500">
                    SNS NDT / E-Learning / Glossary
                </div>
                <h1 className="mt-2 text-[28px] sm:text-[32px] font-bold tracking-tight leading-tight">
                    Glosarium NDT
                </h1>
                <p className="text-[14px] text-slate-600 mt-1 max-w-[60ch]">
                    Definisi ringkas istilah penting Level I lintas method — referensi cepat saat belajar dan mengerjakan kuis.
                </p>
            </div>

            {/* Search + filter */}
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center" data-el-reveal="2">
                <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Cari istilah atau definisi…"
                        aria-label="Cari istilah glosarium"
                        className="w-full rounded-md border border-slate-200 bg-white pl-9 pr-9 py-2 text-[13.5px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={() => setQuery('')}
                            aria-label="Bersihkan pencarian"
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-slate-400 hover:text-slate-700"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-plexMono text-[11px] uppercase tracking-[0.1em] text-slate-500">Method:</span>
                    <button
                        type="button"
                        onClick={() => setMethod('')}
                        className={`rounded-full px-3 py-1 font-plexMono text-[11px] font-bold uppercase tracking-[0.06em] transition-colors ${
                            method === ''
                                ? 'bg-orange-amber text-white shadow-el-orange'
                                : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                    >
                        Semua
                    </button>
                    {availableMethods.map((m) => (
                        <button
                            key={m}
                            type="button"
                            onClick={() => setMethod(m)}
                            className={`rounded-full px-3 py-1 font-plexMono text-[11px] font-bold uppercase tracking-[0.06em] transition-colors ${
                                method === m
                                    ? 'bg-orange-amber text-white shadow-el-orange'
                                    : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            {METHOD_LABEL[m]}
                        </button>
                    ))}
                </div>
            </div>

            {/* Count */}
            <div className="font-plexMono text-[11px] uppercase tracking-[0.08em] text-slate-500 tabular-nums" data-el-reveal="3">
                {filtered.length} ISTILAH{hasFilters ? ` · DARI ${TERMS.length}` : ''}
            </div>

            {/* List */}
            {filtered.length === 0 ? (
                <div className="rounded-xl border-2 border-dashed border-slate-200 bg-white p-12 text-center" data-el-reveal="4">
                    <BookA className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-600 font-medium">Tidak ada istilah cocok kriteria.</p>
                    <button
                        type="button"
                        onClick={() => { setQuery(''); setMethod(''); }}
                        className="mt-3 inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold text-sm"
                    >
                        Reset filter
                    </button>
                </div>
            ) : (
                <dl className="grid md:grid-cols-2 gap-4" data-el-reveal="4">
                    {filtered.map((t) => (
                        <div
                            key={t.term}
                            className="flex flex-col bg-white rounded-xl border border-slate-200 p-5 hover:shadow-el-card-hover hover:border-orange-300 transition-all"
                        >
                            <div className="flex items-start justify-between gap-3 mb-2">
                                <dt className="text-[16px] font-bold tracking-tight leading-snug text-slate-900">
                                    {t.term}
                                </dt>
                                <span className="shrink-0 rounded-full border border-slate-200 px-2 py-0.5 font-plexMono text-[10px] font-bold uppercase tracking-[0.06em] text-orange-600">
                                    {METHOD_LABEL[t.method]}
                                </span>
                            </div>
                            <dd className="text-[13.5px] text-slate-600 leading-relaxed">
                                {t.def}
                            </dd>
                        </div>
                    ))}
                </dl>
            )}

            {/* Back link */}
            <div className="pt-2" data-el-reveal="5">
                <Link
                    to="/e-learning/content"
                    className="group inline-flex items-center gap-2 text-[13px] font-semibold text-slate-600 hover:text-orange-700 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                    Kembali ke Knowledge Base
                </Link>
            </div>
        </div>
    );
}
