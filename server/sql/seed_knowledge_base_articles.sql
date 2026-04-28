-- ============================================
-- SNS NDT E-Learning: Knowledge Base Articles
-- Run AFTER create_article_tables.sql
-- ============================================
-- Adds 12 technical articles covering all 6 NDT methods.
-- Each article = comprehensive markdown content for self-study.
-- ============================================

-- ============================================
-- MT — Magnetic Particle Articles
-- ============================================
INSERT INTO "Articles" (title, slug, excerpt, content, method, level, category, "readingTime", published, featured) VALUES
('Magnetic Particle Testing Fundamentals',
 'magnetic-particle-testing-fundamentals',
 'Pelajari prinsip dasar Magnetic Particle Testing — bagaimana medan magnet dan partikel besi mengungkap cacat permukaan pada material ferromagnetik.',
 E'# Magnetic Particle Testing Fundamentals

Magnetic Particle Testing (MT) adalah metode NDT yang sangat sensitif untuk mendeteksi cacat permukaan dan near-surface pada material ferromagnetik. Banyak inspector menganggap MT sebagai "second method of choice" setelah Visual Testing untuk inspeksi weld baja karbon.

## Prinsip Kerja

MT bekerja dengan tiga langkah fundamental:

1. **Magnetisasi** — Material dialiri arus atau ditempatkan dalam medan magnet eksternal
2. **Aplikasi partikel** — Partikel besi (kering atau basah dalam carrier) ditaburkan di permukaan
3. **Inspeksi** — Cacat menyebabkan kebocoran flux yang menarik partikel, membentuk indikasi visual

> **Key insight**: MT hanya bekerja pada material **ferromagnetik** — baja karbon, baja paduan rendah, besi cor. Material seperti stainless steel austenitic, aluminum, atau copper tidak bisa diinspeksi dengan MT.

## Magnetic Flux Leakage

Saat material ferromagnetik dimagnetisasi dan terdapat diskontinuitas tegak lurus terhadap flux line, sebagian flux "bocor" keluar dari permukaan. Inilah magnetic flux leakage yang menjadi dasar deteksi cacat.

```
Flux line (uninterrupted) → seamless propagation
Flux line (with crack)    → leakage at defect → particle accumulation
```

### Aturan Orientasi

Cacat hanya terdeteksi efektif jika **tegak lurus** terhadap flux:
- Cacat paralel ke flux: TIDAK terdeteksi
- Cacat tegak lurus: deteksi MAKSIMUM
- Cacat 45°: deteksi cukup baik
- Cacat <30° dari paralel: detectability menurun drastis

Itu sebabnya inspeksi harus dilakukan dalam **dua arah magnetisasi** yang saling tegak lurus.

## Teknik Magnetisasi

### Yoke (Portable)
- Dua kaki ditempelkan ke permukaan
- AC atau DC mengalir membentuk longitudinal field
- AC yoke: minimum lifting power 4.5 kg (10 lb)
- DC yoke: minimum lifting power 18 kg (40 lb)

### Prod
- Dua elektroda kontak langsung
- Arus tinggi (4-5 A/mm spacing)
- Risiko **arc strike** — tidak boleh untuk aerospace
- Cocok untuk area besar yang tidak terjangkau yoke

### Coil
- Komponen di dalam coil yang dialiri arus
- Field longitudinal sepanjang sumbu komponen
- 5-step rule: efektif sampai 5× radius coil dari pusat

## Particle Selection

### Dry vs Wet
- **Dry**: cocok lapangan, suhu tinggi, permukaan kasar
- **Wet**: lebih sensitif untuk crack halus dan permukaan halus

### Visible vs Fluorescent
- **Visible**: warna kontras (red/black), inspeksi di cahaya putih ≥1000 lux
- **Fluorescent**: berfluoresensi di UV-A, sensitivitas sampai 1 mikron

### Pemilihan
- Wet fluorescent → komponen kritis aerospace, nuklir
- Dry visible → inspeksi cepat lapangan
- Wet visible → produksi standar industri

## Demagnetisasi

Setelah inspeksi, residual magnetism harus ≤ **3 Gauss** untuk komponen umum:
- Mengganggu welding subsequent (arc deflection)
- Menarik chip ke moving parts
- Interferensi dengan instrumen sekitar

Teknik:
1. **AC decay** — paling efektif untuk thin/medium material
2. **Reverse DC** — untuk material tebal
3. **Walking through coil** — komponen panjang
4. **Heating above Curie point** — ekstrim, jarang dipakai

## Code & Standards

| Standard | Aplikasi |
|----------|----------|
| ASME V Article 7 | Pressure equipment |
| ASTM E709 | Standard guide MT |
| AWS D1.1 | Welding code struktur baja |
| ISO 9934 | International standard |

## Kesalahan Umum Level I

1. **Lupa demag antara dua arah** — magnetic writing terjadi
2. **Insufficient field strength** — indikasi lemah, missed crack
3. **Over-spray particles** — masking indikasi halus
4. **Tidak verify lifting power** — yoke "lemah" tidak detect crack
5. **Lighting inadequate** — fluorescent inspeksi tanpa proper UV setup

## Kesimpulan

MT adalah metode reliable, fast, dan murah untuk inspeksi cacat permukaan pada material ferromagnetik. Penguasaan fundamental — magnetisasi, particle, dan interpretasi indikasi — adalah kunci untuk operator Level I yang efektif.',
 'MT', 'Level I', 'theory', 12, true, true),

('Yoke vs Prod vs Coil — Decision Matrix',
 'yoke-vs-prod-vs-coil-decision-matrix',
 'Panduan praktis memilih teknik magnetisasi yang tepat untuk setiap situasi inspeksi MT — dengan trade-off, risiko, dan rekomendasi spesifik.',
 E'# Yoke vs Prod vs Coil — Decision Matrix

Pemilihan teknik magnetisasi yang tepat sering jadi pembeda antara inspeksi MT yang efektif dan yang missed defect. Artikel ini memberikan kerangka keputusan praktis berdasarkan situasi.

## Quick Decision Matrix

| Situasi | Rekomendasi | Alasan |
|---------|-------------|--------|
| Inspeksi weld lapangan | **Yoke** | Portable, aman, no arc strike |
| Area besar tidak terjangkau yoke | **Prod** | Field strength tinggi |
| Komponen produksi (shaft, rod) | **Coil + Head shot** | Volumetric coverage |
| Inspeksi aerospace | **Yoke + Coil bench** | No arc strike risk |
| Suhu tinggi (>200°C) | **Yoke + dry particles** | Wet bath tidak tahan panas |

## Yoke — The Default Choice

### Kapan dipakai
- 80% inspeksi lapangan harian
- Spot inspection weld
- Kondisi confined space (yoke compact)
- Material aerospace (no arc risk)

### Pre-shift verification
**WAJIB cek lifting power setiap shift:**
- AC yoke: minimum 4.5 kg (10 lb) dengan jarak kaki maksimal yang akan dipakai
- DC yoke: minimum 18 kg (40 lb)
- Kalau gagal: jangan dipakai. Send for service atau ganti yoke.

### Limitasi yoke
- Field strength terbatas pada area antara kaki saja
- Tidak efektif untuk area besar tanpa overlapping
- Slow untuk produksi volume tinggi

## Prod — High Power, High Risk

### Kapan dipakai
- Area inspeksi besar (struktur, pelat tebal)
- Yoke field strength tidak cukup
- Need maximum sensitivity

### Risiko utama: Arc Strike
Bekas terbakar di permukaan dari electrical arc saat prod kontak buruk. Konsekuensi:
- Stress concentration di bekas arc → potential crack initiation
- DILARANG untuk aerospace material
- DILARANG saat carrying pressurized hydrocarbon (fire risk)

### Mitigasi arc strike
1. Tip prod bersih dan terpasang baik
2. Pressure kontak yang konsisten
3. Spacing prod 75-200 mm typical
4. Jangan break contact saat current ON
5. Ground clamp aman dan kontak penuh

## Coil — Volumetric & Repetitive

### Kapan dipakai
- Inspeksi shop bench untuk shaft, bolt, rod
- Production line dengan komponen serupa
- Volumetric magnetization needed (longitudinal field)

### 5-Step Rule
Komponen efektif diinspeksi sampai jarak 5× radius coil dari pusat coil.
> Beyond 5 radii, field strength insufficient untuk MT effective.

Untuk komponen panjang, tarik melalui coil bertahap dengan overlap untuk full coverage.

## Multi-Directional Equipment

Untuk produksi efisien, equipment modern bisa:
- Switch cepat antara circular dan longitudinal field (auto-cycling)
- Simultaneous multi-directional (AC + DC mixing)
- Mengurangi inspection time 50-70% vs sequential method

## Field Strength Verification

Selain visual cek lifting power, gunakan:
- **Pie gauge** — Burmah Castrol gauge atau Berthold pie gauge
- **Magnetic field indicator (MFI)**
- **Hall effect probe** untuk reading akurat

Per ASTM E709, field strength minimum:
- Tangential field: 24 G (1.9 kA/m)
- Pakai indicator yang sensitive ke field direction yang relevan

## Kesalahan Umum

| Kesalahan | Konsekuensi | Mitigasi |
|-----------|-------------|----------|
| Lupa lifting power test | Yoke "lemah" missed crack | Daily verification log |
| Prod kontak buruk | Arc strike → reject material | Pressure & cleanliness check |
| Coil 5-step rule violated | Tail end komponen tidak inspected | Plan overlap zones |
| Single-direction only | Cacat paralel ke flux missed | WAJIB dua arah magnetisasi |

## Kesimpulan

Yoke adalah workhorse untuk 80% kasus. Prod untuk power tinggi tapi awareness arc strike. Coil untuk shop production. Kunci sukses: verify field strength sebelum mulai, dua arah magnetisasi, dan demag antara arah.',
 'MT', 'Level I', 'technique', 10, true, false),

-- ============================================
-- PT — Liquid Penetrant Articles
-- ============================================
('Liquid Penetrant Testing — The Capillary Truth',
 'liquid-penetrant-testing-capillary-truth',
 'Pemahaman mendalam tentang aksi kapiler — fisika fundamental yang membuat PT bekerja, dan bagaimana variabel material dan environment mempengaruhi hasil.',
 E'# Liquid Penetrant Testing — The Capillary Truth

Liquid Penetrant Testing (PT) adalah salah satu metode NDT tertua dan paling versatile. Bisa dipakai pada hampir semua material non-porous: logam, keramik, plastik. Tapi banyak Level I praktisi gagal karena tidak memahami fisika di baliknya.

## Aksi Kapiler — Fondasi PT

Penetran cair masuk ke retak permukaan melalui aksi kapiler — fenomena fisika di mana cairan bisa naik melawan gravitasi melalui celah sempit.

### Persamaan Kapiler

```
h = (2γ cosθ) / (ρgr)

Dimana:
h = tinggi naik
γ = tegangan permukaan cairan
θ = sudut kontak
ρ = densitas cairan
g = percepatan gravitasi
r = jari-jari capillary (lebar celah)
```

### Variabel Kunci

**Tegangan permukaan (γ):**
- Air: ~72 mN/m (terlalu tinggi untuk PT)
- Penetran komersial: ~30 mN/m (didesain rendah)

**Sudut kontak (θ):**
- Wetting baik: < 90° (cairan menyebar)
- Wetting jelek: > 90° (cairan menggumpal)
- PT formulation didesain untuk θ < 30° pada baja

**Viskositas:**
- Rendah: masuk celah cepat tapi cepat habis
- Tinggi: lambat masuk tapi tahan lama
- Standar: viscosity ~1-5 cSt

## Tipe Penetran

### Type I — Fluorescent
- Berfluoresensi di UV-A
- Sensitivitas tertinggi (sampai 1 mikron crack width)
- Butuh booth gelap dan UV light
- Aplikasi: aerospace, nuklir, komponen kritis

### Type II — Visible
- Warna kontras (umumnya merah)
- Inspeksi di cahaya putih biasa
- Lebih cepat dan praktis lapangan
- Aplikasi: industri umum, weld inspection

## Method A/B/C/D — Removal Process

| Method | Removal | Kelebihan | Kekurangan |
|--------|---------|-----------|------------|
| A | Water washable (built-in emulsifier) | Cepat, simple | Sensitivitas terendah |
| B | Post-emulsifiable lipophilic | Sensitivitas tinggi | Time-controlled, complex |
| C | Solvent removable | Sangat sensitif, portable | Lambat, expensive |
| D | Post-emulsifiable hydrophilic | Kontrol lebih baik dari B | Equipment intensive |

> **Untuk Level I**: 90% inspeksi pakai Method C (Type II) untuk lapangan atau Method A (Type I) untuk shop.

## Critical Parameter: Excess Removal

Step paling sering bikin Level I trainee gagal. Aturan emas:

> **Hapus penetran dari PERMUKAAN, bukan dari CELAH cacat.**

### Solvent Wipe (Method C) — Step by Step

1. **Dry wipe pertama** — kain kering, hilangkan excess. JANGAN basahi dulu.
2. **Solvent damp wipe** — kain dibasahi solvent (sedikit), wipe lembut. JANGAN spray langsung ke part.
3. **Final dry wipe** — angkat solvent residue.

### Mengapa "JANGAN spray solvent langsung"?
Solvent yang spray langsung mendorong penetran di permukaan masuk ke crack lalu wash out — invalidasi seluruh inspection.

### Water Wash (Method A/D)
- Pressure max 40 psi (276 kPa) — higher = wash out indikasi
- Temperature 10-38°C
- Spray angle 45° dari permukaan
- Distance nozzle minimum 30 cm

## Dwell Time

### Penetrant Dwell (sebelum excess removal)

| Standar | Time |
|---------|------|
| ASME V Article 6 | 5 menit minimum |
| ASTM E165 | 10 menit umum |
| Tight crack | Sampai 30 menit |
| Maximum | ~60 menit (jangan kering) |

### Developer Dwell (sebelum reading)

- Minimum 7 menit per ASME V
- Maximum 30 menit
- Reading multiple stage untuk catch slow bleed-out

### Effect of Temperature

```
Standar window: 10-52°C (50-125°F)
```

- > 50°C: Viskositas turun, penetran cepat menguap → indikasi tidak terbentuk
- < 10°C: Viskositas naik, masuk celah lambat → dwell harus diperpanjang
- Outside window: butuh procedure qualification baru

## Indication Interpretation

### Real Defects
- **Linear** (panjang ≥ 3× lebar): crack, lack of fusion, lap
- **Round** (panjang < 3× lebar): porosity, gas pocket
- **Continuous**: crack panjang
- **Intermittent**: chain porosity

### False Indications
- **Process indications**: penetran terjebak di scratch, lap, ridge
- **Bleed-back**: penetran masuk celah luar tidak ter-clean
- **Cleaning fluid traces**: solvent residual berfluoresensi

### Verification
Untuk indikasi meragukan: **re-clean dan re-test full process**. Tidak boleh re-spray developer saja.

## Kesimpulan

PT adalah metode powerful tapi unforgiving. Capillary action adalah teman, tapi excess removal yang salah membatalkan semuanya. Kuasai dwell time, removal technique, dan interpretation — itulah Level I expertise.',
 'PT', 'Level I', 'theory', 14, true, true),

-- ============================================
-- RT — Radiographic Articles
-- ============================================
('Radiation Safety for RT Inspectors — ALARA in Practice',
 'radiation-safety-rt-alara-practice',
 'Panduan praktis ALARA untuk inspector RT lapangan — aturan dasar, dose limits, emergency response, dan kebiasaan harian yang menyelamatkan nyawa.',
 E'# Radiation Safety for RT Inspectors — ALARA in Practice

Radiographic Testing menggunakan radiasi pengion — X-ray dan gamma-ray — yang berbahaya bagi manusia. Setiap inspector RT WAJIB menguasai radiation safety sebelum touch peralatan apapun.

## ALARA — Principle Foundation

**A**s **L**ow **A**s **R**easonably **A**chievable

Filosofi: kurangi exposure ke level paling rendah yang praktis. Bukan angka mutlak — tapi optimasi continuous.

## Tiga Pilar Perlindungan

### 1. Time
Lebih sedikit waktu dekat source = lebih sedikit dose.
- Plan exposure sequence sebelum mulai
- Persiapkan equipment dulu, baru aktifkan source
- Hindari "berlama-lama" tanpa alasan jelas

### 2. Distance
**Inverse square law:**
```
Dose rate ∝ 1/r²

Jarak 2× → dose 1/4
Jarak 3× → dose 1/9
Jarak 10× → dose 1/100
```

> **Distance adalah perlindungan paling powerful.** Selalu maksimalkan jarak dari source.

### 3. Shielding
Material attenuating mengurangi intensitas radiasi:
- **Lead**: paling umum, density tinggi
- **Concrete**: untuk fixed installation
- **Steel**: alternative budget
- **Tungsten**: collimator portable

Half-Value Layer (HVL) — tebal material yang reduce intensitas 50%:

| Energy | Steel HVL | Lead HVL |
|--------|-----------|----------|
| 200 kV X-ray | 16 mm | 1 mm |
| 400 kV X-ray | 25 mm | 4 mm |
| Ir-192 (380 keV) | 13 mm | 5 mm |
| Co-60 (1.25 MeV) | 22 mm | 12 mm |

## Dose Limits

### Occupational Worker (RT inspector)
- **Annual whole body**: 50 mSv (5 rem)
- **Lifetime cumulative**: age × 10 mSv
- **Lens of eye**: 20 mSv/year
- **Skin & extremities**: 500 mSv/year

### Public
- **Annual**: 1 mSv (0.1 rem) — sangat ketat

### Pregnant Worker
- **Declared pregnant**: 0.5 mSv per month, 5 mSv total kehamilan

## Dosimetry — Wajib & Real-time

Setiap RT inspector wajib pakai DUA jenis dosimeter:

### Passive (TLD/OSL Badge)
- Dipakai sepanjang shift
- Dibaca bulanan oleh dosimetry service
- Catatan official di personal dose record

### Active (Pocket Dosimeter / EPD)
- Real-time reading di display
- Alarm bila dose rate tinggi
- Self-reading kapan saja oleh inspector

> **Aturan**: Jika dosimeter rusak atau hilang, **STOP work**. Lapor segera, ganti, baru lanjut.

## Emergency Response

### Source Stuck
Crank/cable jam — source tidak masuk container shielded.

**STEP-BY-STEP:**
1. **STOP** — jangan paksa atau coba fix
2. **Evakuasi** area minimum radius 50 meter (lebih untuk Co-60)
3. **Isolate** dengan barrier dan warning sign
4. **Survey** area dengan survey meter dari jarak aman
5. **Panggil** Radiation Safety Officer (RSO) atau emergency response team
6. **Document** waktu, lokasi, kondisi

### Lost Source
Source hilang dari shipment atau storage.

**Konsekuensi serius (legal & jiwa):**
- Immediate report ke RSO dan regulator
- Search dengan survey meter
- Investigasi formal
- Potential criminal liability

### Excessive Exposure
Inspector terexposure melebihi limit harian.

**Action:**
- Stop work segera
- Document waktu dan kondisi
- Medical evaluation (blood test, monitoring)
- Investigation root cause

## Daily Habits That Save Lives

1. **Pre-shift**: cek source position, dosimeter, survey meter battery
2. **Pre-exposure**: survey area, set up barrier, warn workers
3. **During exposure**: stand behind shielding, monitor EPD reading
4. **Post-exposure**: survey area cold, secure source, log activity
5. **End of shift**: cek dosimeter reading, dokumentasi log

## Source Security

Sources HARUS:
- Stored di **shielded container locked**
- Inventory check **setiap shift**
- Transport dengan placard dan dokumen
- Tidak dibawa pulang atau parkir tanpa supervisi

Source storage harus:
- Locked dengan dual key system (kalau memungkinkan)
- Radiation symbol jelas
- Log book entry/exit
- Backup security personnel

## Code & Regulation

| Standard | Aplikasi |
|----------|----------|
| 10 CFR Part 20 (US) | NRC radiation protection |
| ICRP 103 | International Commission on Radiological Protection |
| IAEA Safety Standards | International Atomic Energy Agency |
| BAPETEN (Indonesia) | Badan Pengawas Tenaga Nuklir |

## Kesimpulan

RT memberikan capability inspeksi internal yang tidak bisa diberikan metode lain — tapi dengan tradeoff radiation hazard yang serius. ALARA bukan slogan tapi habit. Setiap detik dekat source adalah dose yang akumulasi. Practice safe, document everything, dan jangan pernah skip safety check.

> **Remember**: Tidak ada inspeksi yang lebih penting dari nyawa Anda atau orang sekitar.',
 'RT', 'Level I', 'safety', 16, true, true),

('Image Quality in RT — IQI Selection & Verification',
 'image-quality-rt-iqi-selection',
 'Panduan lengkap memilih dan memverifikasi IQI (Image Quality Indicator) untuk memastikan kualitas radiograph memenuhi requirement code.',
 E'# Image Quality in RT — IQI Selection & Verification

Tanpa IQI, Anda tidak punya bukti bahwa radiograph Anda layak — kualitasnya tidak terverifikasi. Inspector Level III bisa reject seluruh shoot kalau IQI placement atau visibility salah.

## Apa Itu IQI?

**Image Quality Indicator** = device kalibrasi yang ditempatkan dalam radiograph. Visibility dari IQI mengkonfirmasi bahwa:
- Exposure cukup (density adequate)
- Contrast sufficient untuk see flaw
- Geometric setup benar

Jika IQI minimum yang harus terlihat tidak terlihat → radiograph TIDAK acceptable.

## Tipe IQI

### Wire-Type (ASTM E1025)
- Set wires berdiameter berbeda dalam plastic envelope
- Wire halus harus terlihat = good sensitivity
- Per ISO 19232 dan ASTM E747

**Set umum**:
- ASTM Set A: 0.10-0.32 mm wires
- ASTM Set B: 0.25-0.81 mm wires
- ASTM Set C: 0.81-2.0 mm wires

### Hole-Type (ASTM E1025 / ASME)
- Plate metal dengan multiple holes
- Hole 2T/T harus terlihat
- "2T" = hole diameter 2× plate thickness

**Designation**:
- IQI thickness = 2% of part thickness
- 2T/T hole sensitivity = 4%
- Examples: 1T = highest sensitivity, 4T = lowest

## Pemilihan IQI

### Material Compatibility
IQI material harus sama atau radiographically similar ke part:
- Steel parts → steel IQI
- Aluminum parts → aluminum IQI
- Stainless → stainless atau steel acceptable

### Thickness Selection
ASME V Article 2:
- Wire-type: pilih wire set yang covers 2% target sensitivity
- Hole-type: IQI thickness = 2% of section thickness

Example: Plate 25 mm steel
- Hole-type: IQI thickness 0.5 mm (2% of 25 mm)
- Hole 2T/T = 1.0 mm/0.5 mm visible = pass

## Placement

### Source-Side (Standard)
IQI ditempatkan di sisi source (dekat tube/source).
- Lebih ketat, requires lebih baik image quality
- Default per ASME V

### Film-Side (Alternative)
IQI ditempatkan di sisi film (jauh dari source).
- Marker "F" diletakkan dekat IQI untuk identifikasi
- Dipakai jika source-side tidak feasible (geometry)
- Lebih lenient — equivalent sensitivity yang lebih rendah

### Multiple IQIs
Untuk weld panjang (>250 mm), pakai multiple IQI:
- Per ASME V: minimum 1 IQI per 250 mm weld length
- Distribusi merata sepanjang weld

## Sensitivity Calculation

```
% Sensitivity = (smallest visible feature / part thickness) × 100

Wire-type: smallest visible wire diameter / thickness × 100
Hole-type: typically 2-4% based on hole visibility
```

**Target**:
- 2% sensitivity = excellent
- 2-4% = standard industri
- > 4% = tidak acceptable per most code

## Verification on Radiograph

Saat review radiograph, inspector wajib:

1. **Identify IQI** — locate dan identify designation
2. **Measure wire/hole visibility** — pakai magnifier 7-10×
3. **Compare ke required sensitivity** per code
4. **Document** wire identifier visible terkecil dan hole 2T

Jika required minimum tidak visible:
- **Re-shoot** dengan parameter adjusted
- Bukan acceptable untuk patch
- Document re-shoot reason

## Common Issues

### IQI tidak terlihat
- Density terlalu tinggi atau rendah
- Geometric unsharpness berlebihan
- IQI rusak atau wrong type
- Penempatan di area dengan defect noise tinggi

### IQI samar
- Underexposed → increase exposure time
- Overexposed → decrease atau pakai filter
- Screen mismatch dengan film type

### Multiple IQI mismatch
- Beda placement → beda visibility
- Document semua, take worst case untuk acceptance

## Code-Specific Requirements

### ASME V Article 2
- Source-side IQI standard
- Multiple IQI per length
- Specific designation table per thickness
- Density 1.8-4.0 (X-ray), 2.0-4.0 (gamma)

### AWS D1.1
- Subset of ASME V untuk weld
- Acceptance lebih lenient untuk statically loaded
- Lebih ketat untuk cyclically loaded (fatigue)

### API 1104
- Pipeline-specific
- Hole-type IQI typical
- Designation per pipe wall thickness

### ISO 17636-1
- International equivalent
- Wire-type lebih umum
- Class A/B sensitivity classification

## Kesimpulan

IQI bukan formality. Adalah **bukti** kualitas radiograph Anda. Pemilihan, placement, dan verification yang benar membedakan Level I yang competent dari yang baru belajar. Hafalkan designation per thickness Anda akan inspeksi, dan selalu verify sebelum sign-off.',
 'RT', 'Level I', 'technique', 12, true, false),

-- ============================================
-- VT — Visual Articles
-- ============================================
('Visual Testing — More Than Just "Looking"',
 'visual-testing-more-than-looking',
 'Mengapa VT bukan sekadar inspeksi visual sembarangan — disiplin teknis dengan aturan yang ketat dan dampak yang besar pada kualitas produk akhir.',
 E'# Visual Testing — More Than Just "Looking"

Banyak orang anggap Visual Testing (VT) adalah metode "paling sederhana" — cuma melihat saja. Salah besar. VT yang benar adalah inspeksi sistematis dengan aturan ketat, dampak yang langsung pada accept/reject, dan sering jadi gateway untuk metode NDT lainnya.

## Mengapa VT Pertama Selalu

Setiap inspeksi NDT dimulai dengan VT. Tidak ada exception.

### Alasan
1. **Cost-effective** — paling murah dari semua metode
2. **Catch obvious defect** — surface crack besar, weld profile salah, material wrong
3. **Prerequisite** — banyak metode lain butuh permukaan clean & accessible (cek dulu via VT)
4. **Documentation** — establish baseline kondisi sebelum metode lain applied

> **Realita industri**: 30-40% reject di weld inspection di-catch di VT, sebelum UT/RT bahkan dijalankan.

## Aturan Baku ASME V Article 9

### Direct Visual Inspection
```
Distance maksimum mata ke permukaan: 600 mm (24 inch)
Sudut pandang minimum: 30°
Lighting minimum: 1000 lux
```

Verify lighting dengan **lux meter** setiap shift. Tidak boleh "feel" — angka konkret.

### Eye Examination
Inspector wajib annual eye exam:
- **Near vision**: Jaeger 2 atau Snellen 20/40 (dengan/tanpa kacamata)
- **Color perception**: tidak color blind (specifically untuk red-green)
- **Document**: certificate dari optometrist

Tidak lulus eye exam → tidak bisa execute VT inspection sah.

## Equipment & Tools

### Optical Aids
- **Magnifier 3-10×**: crack halus, surface texture
- **Mirror & dental mirror**: akses sudut belakang
- **Borescope rigid**: lubang lurus
- **Fiberscope**: lubang berkelok
- **Video borescope**: turbine, boiler tube — modern standard

### Measurement Gauges
- **Bridge cam gauge**: weld profile, undercut
- **Fillet gauge**: leg length fillet weld
- **Pit gauge (depth)**: korosi pitting
- **Ruler & caliper**: dimensi umum

### Lighting
- LED high-CRI (90+) untuk warna akurat
- Diffuse light untuk hindari glare
- Adjustable angle lampu untuk surface texture

## Common Weld Defects — Apa yang Dicari

### Surface Cracks
Most critical. AWS D1.1: REJECT semua, no exception.
- **Longitudinal crack**: searah weld
- **Transverse crack**: silang weld
- **Crater crack**: end of pass, sering star shape
- **HAZ crack**: di base metal dekat weld

### Profile Defects
- **Undercut**: groove di base metal (max 1 mm depth, less for fatigue)
- **Overlap**: weld over base tanpa fusion (crevice)
- **Excessive reinforcement**: cap terlalu tinggi (stress raiser)
- **Insufficient throat**: fillet weld tidak cukup tebal

### Process Defects
- **Porosity**: gas terperangkap di permukaan
- **Spatter**: percikan logam (cosmetic, sometimes reject)
- **Arc strike**: bekas terbakar di base metal
- **Slag inclusion** (visible at surface)

## AWS D1.1 Acceptance Criteria

### Statically Loaded Connection
Lebih lenient — fatigue bukan concern utama.
- Undercut: max 1 mm depth untuk thickness >25 mm
- Crack: REJECT
- Convexity: per profile gauge limit

### Cyclically Loaded Connection
Lebih ketat — fatigue concern.
- Undercut: max 0.25 mm
- Profile: smooth transition required
- Surface finish: kalibrasi dengan reference samples

## Documentation

### Per Inspection
- Date, project, weld ID, drawing reference
- Equipment ID & calibration evidence
- Lighting verification (lux reading + meter ID)
- Findings: defect type, location, dimensions
- Photo evidence dengan reference markers

### Photo Standards
- **Reference markers**: ruler/scale + weld ID label
- **Multiple angles**: overall + close-up
- **Resolution**: minimum 1080p, ideally 4K untuk archive
- **File naming**: Project_Weld_DefectLocation_Date_Inspector

### Sketch
- Cross-section view dengan defect marked
- Datum line dari weld start
- Symbols per AWS A2.4

## Common Mistakes Level I

1. **Skip lighting verification** — assume "cukup terang" tanpa lux meter
2. **Single angle only** — surface crack often visible only dari sudut tertentu
3. **No magnification** — crack halus terlewat tanpa magnifier
4. **Photo tanpa reference** — tidak verifiable, tidak useful untuk archive
5. **Lupa annual eye exam** — bisa diaudit dan invalidate semua inspection

## VT-only vs VT-Combined

VT sering dipasangkan dengan metode lain:

### VT + MT
Verify cacat permukaan ferromagnetik. MT sensitive sub-surface, VT confirm visible.

### VT + PT
Verify open surface crack. PT kasih indikasi spread, VT konfirmasi & ukur.

### VT + UT/RT
VT first untuk catch obvious. UT/RT untuk volumetric internal.

## Beyond Level I — Path to CWI

VT certification sering jadi prerequisite untuk **AWS Certified Welding Inspector (CWI)** — qualification senior yang lebih bernilai di pasar:
- VT Level II → CWI candidate
- CWI → kompensasi 30-50% lebih tinggi vs Level I
- CWI menggabungkan VT expertise dengan code interpretation lebih dalam

## Kesimpulan

VT bukan "lebih mudah" dari metode lain — VT adalah **disiplin yang berbeda**. Kebiasaan sistematis, dokumentasi rigorous, dan kepatuhan code yang ketat. Master VT, master fondasi semua NDT inspection lainnya.',
 'VT', 'Level I', 'theory', 13, true, true),

-- ============================================
-- ET — Eddy Current Articles
-- ============================================
('Eddy Current Testing — Electromagnetic Magic',
 'eddy-current-testing-electromagnetic',
 'Memahami fisika fundamental Eddy Current Testing — bagaimana hukum Faraday, skin depth, dan impedance plane menjadi alat inspeksi powerful untuk material konduktif.',
 E'# Eddy Current Testing — Electromagnetic Magic

Eddy Current Testing (ET) sering dianggap "metode misterius" karena melibatkan elektromagnetisme abstrak. Tapi sekali Anda paham principle-nya, ET adalah salah satu metode NDT paling powerful — terutama untuk inspeksi tubing dan crack permukaan pada material konduktif.

## Hukum Faraday — Foundation

```
Perubahan medan magnet → menginduksi tegangan listrik di konduktor
```

Inilah dasar semua eddy current testing:

1. AC current di **primary coil** → menciptakan AC magnetic field
2. AC magnetic field → menginduksi **eddy currents** di material konduktif (per Faraday)
3. Eddy currents → menciptakan field oposisi (per Lenz)
4. Field oposisi → mengubah **impedance** primary coil
5. **Defect** → mengganggu eddy current pattern → impedance change → terdeteksi

## Skin Depth — The Critical Formula

Eddy current TIDAK distribusi merata — terkonsentrasi dekat permukaan, decay exponentially ke dalam material.

### Formula
```
δ = 50 / √(f × σ × μᵣ)  [mm]

Dimana:
δ = skin depth (kedalaman saat amplitudo turun ke 37%)
f = frequency (Hz)
σ = conductivity (% IACS)
μᵣ = relative permeability
```

### Aplikasi Praktis

**Aluminum 6061 (σ = 40% IACS, μᵣ = 1):**
- 100 kHz: δ ≈ 0.8 mm
- 1 MHz: δ ≈ 0.25 mm
- 10 kHz: δ ≈ 2.5 mm

**Steel 1018 (σ = 10% IACS, μᵣ = 100):**
- 100 kHz: δ ≈ 0.16 mm (very shallow!)
- 1 kHz: δ ≈ 1.6 mm

> **Insight**: Steel ferromagnetic punya skin depth jauh lebih dangkal daripada aluminum — sebab μᵣ tinggi.

## Frequency Selection — The Trade-Off

| Frequency | Penetration | Sensitivity | Best For |
|-----------|-------------|-------------|----------|
| > 1 MHz | < 0.5 mm | Sangat tinggi | Surface crack detection |
| 100 kHz - 1 MHz | 0.5-2 mm | Tinggi | Standard inspection |
| 10-100 kHz | 1-5 mm | Medium | Tube inspection bobbin |
| < 10 kHz | > 3 mm | Rendah | Sub-surface, deep defect |

Pilih frequency berdasarkan target depth:
- Crack permukaan dangkal → frequency tinggi
- Defect 2-3 mm dari permukaan → 50-100 kHz
- Sub-surface > 5 mm → frequency rendah, accept lower sensitivity

## Probe Types

### Surface Probe (Pencil)
- Single coil di tip cylindrical
- Diameter 2-10 mm typical
- Aplikasi: inspeksi titik per titik, crack at weld toe, fastener hole

### Encircling Probe
- Coil mengelilingi bar/rod (OD inspection)
- Inspeksi seragam keliling
- Aplikasi: production tubing, bar stock

### Bobbin Probe (Internal Tube)
- Coil internal yang dimasukkan ke tube
- **Standard untuk heat exchanger**
- Configuration:
  - **Differential**: dua coil close-spaced → defect kecil
  - **Absolute**: single coil → gradual changes

### Array Probe
- Multiple coil disusun
- Scan area lebar dalam satu pass
- Aplikasi: pipeline, large area inspection
- Lebih mahal tapi 10× lebih cepat

## Lift-Off — The Eternal Problem

**Lift-off**: jarak antara coil dan permukaan material.

Variasi lift-off → impedance change → bisa salah dibaca sebagai defect.

### Mitigation

**Modern instrument** — multi-frequency dengan lift-off mixing:
- Frequency 1: signal channel (sensitive ke defect)
- Frequency 2: reference channel (dominated by lift-off)
- Mixing: subtract → cancel out lift-off, leave defect signal

**Manual technique**:
- Light pressure constant
- Tangan stabil
- Verify dengan signal pada area no-defect (zero baseline)

## Impedance Plane — Reading the Story

Impedance plane = X-Y display dengan:
- **X-axis**: resistance change (R)
- **Y-axis**: reactance change (X)
- **Operating point**: zero defect (balanced)
- **Movement**: signal direction & magnitude

### Signature Lines

**Conductivity curve:**
- Beda material atau temper → moves along this curve
- Aluminum tempers, copper alloys, stainless steel grades
- Dipakai untuk material sorting

**Lift-off line:**
- Probe lifted → moves along this line
- Direction predictable
- Bisa di-rotate ke horizontal axis (phase rotation)

**Crack signature:**
- Surface crack → loop atau spike characteristic per frequency
- Phase angle berbeda dari lift-off → distinguishable

### Phase Rotation

Modern instrument bisa rotate phase sehingga:
- Lift-off lies horizontally
- Defect signal vertical/diagonal
- Easier untuk threshold

## Calibration

### Reference Standards
- **EDM notch**: dimensi presisi, standard untuk crack reference
- **Drilled hole** (FBH atau through-hole): standard untuk volumetric defect
- **ASTM E309**: tube inspection standard
- **ASTM E243**: pipe & tube manufacturing

### Sequence
1. Set frequency per procedure
2. Balance probe di area no-defect (operating point center)
3. Scan reference standard, adjust gain
4. Verify dengan multiple notch atau hole
5. Document calibration parameters

### Mid-Shift Verification
ASME V: setiap 4 jam atau saat operator change.
- Re-scan reference, verify amplitude in tolerance
- Fail → recalibrate, re-scan tube/weld sejak last good cal

## Heat Exchanger Tubing — The Killer App

ET dominant di heat exchanger inspection karena:
- Tubing tidak accessible visual
- Cacat internal tidak detectable RT (geometry, radiation safety)
- ET bobbin probe → inspeksi cepat, akurat

### Defects Detected
- **Pitting**: localized corrosion. Pit > 40% wall = repair/plug
- **Wall loss general**: gradual thinning
- **Dent**: deformation mekanis
- **Tube-to-tubesheet weld**: leak risk
- **Support plate ID**: signature predictable, NOT defect

### Speed
Pull rate 0.5-1 m/s konstan. Modern array probe → 100% inspection 1000+ tubes/hari.

## Code & Standards

| Standard | Aplikasi |
|----------|----------|
| ASME V Article 8 | Pressure equipment |
| ASTM E309 | Tube inspection |
| ASTM E243 | Pipe/tube manufacturing |
| ISO 15549 | International standard |

## Kesimpulan

ET bukan "metode misterius" — adalah aplikasi disiplin elektromagnetisme dengan instrument modern. Kuasai skin depth formula, paham impedance plane, dan praktekkan calibration konsisten — Anda akan jadi ET inspector yang reliable dan dicari di pasar.',
 'ET', 'Level I', 'theory', 15, true, true),

-- ============================================
-- General / Cross-method
-- ============================================
('NDT Method Selection — Choosing the Right Tool',
 'ndt-method-selection-right-tool',
 'Panduan praktis memilih metode NDT yang tepat untuk setiap aplikasi — dengan decision matrix, contoh nyata, dan combined-method strategies.',
 E'# NDT Method Selection — Choosing the Right Tool

Tidak ada metode NDT "terbaik" — yang ada adalah metode "paling tepat" untuk situasi spesifik. Inspector senior dibedakan dari junior justru oleh kemampuan memilih metode yang tepat.

## Quick Decision Matrix

| Defect Location | Material | Best Method | Alternatives |
|-----------------|----------|-------------|--------------|
| Surface crack | Ferromagnetic | MT | PT, VT |
| Surface crack | Non-magnetic | PT | VT, ET |
| Internal flaw, weld | Steel | UT, RT | PAUT |
| Volumetric (porosity, slag) | Welded steel | RT | UT |
| Tubing internal | Conductive | ET (bobbin) | RFT, IRIS |
| Surface | All material | VT | (always first) |

## Method Strengths Comparison

### Ultrasonic (UT)
**Strengths:**
- Deep penetration (sampai meter depending material)
- Internal flaw detection
- Sizing accurate
- Single-side access
- No radiation hazard
- Real-time results

**Weaknesses:**
- Trained operator dependent
- Couplant needed
- Geometry complex sulit
- Surface preparation required

**Best for:** Weld inspection, thickness measurement, forging/casting volumetric

### Magnetic Particle (MT)
**Strengths:**
- Fast & cost-effective
- Sensitive to surface crack 1 mikron
- Visual indication langsung
- Portable equipment

**Weaknesses:**
- HANYA ferromagnetic material
- Demagnetization needed
- Surface crack only (sub-surface limited)
- Material orientation sensitive

**Best for:** Pre/post-weld inspection ferromagnetic, in-service surface crack

### Liquid Penetrant (PT)
**Strengths:**
- Works on all non-porous materials
- Cheap & portable
- Good for surface crack
- Visual indication

**Weaknesses:**
- Surface only (no sub-surface)
- Requires clean surface
- Time-consuming dwell
- Excess removal critical (error-prone)

**Best for:** Aerospace surface crack, casting porosity, pre-weld root

### Radiographic (RT)
**Strengths:**
- Volumetric inspection
- Permanent record (film/digital)
- Cross-method verification
- Good for porosity, slag

**Weaknesses:**
- Radiation hazard (safety regulations)
- Lambat (exposure time)
- Mahal (equipment + film)
- Operator certification ketat

**Best for:** Pipeline weld, pressure vessel critical weld, root inspection

### Visual (VT)
**Strengths:**
- Cheapest, fastest
- Always first method
- No special equipment
- Catch obvious defect

**Weaknesses:**
- Surface only
- Operator-dependent
- Lighting & access critical
- Limited sensitivity

**Best for:** Pre-method screening, surface profile, weld profile

### Eddy Current (ET)
**Strengths:**
- Non-contact (lift-off allowed)
- Fast scan rate
- Conductivity measurement
- No couplant needed
- Great for tubing

**Weaknesses:**
- Conductive material only
- Surface & near-surface only
- Complex impedance interpretation
- Lift-off sensitivity

**Best for:** Heat exchanger tubing, aircraft skin, fastener hole inspection

## Combined Method Strategies

### Pipeline Girth Weld
1. **VT** — pre-weld, cek fit-up
2. **RT** — post-weld, internal flaw (porosity, LOP)
3. **UT** atau **PAUT** — alternative atau supplement RT
4. **MT** atau **PT** — surface crack at HAZ

### Pressure Vessel Manufacturing
1. **VT** — material receiving, weld prep
2. **MT** — base material surface check (if ferromagnetic)
3. **RT** atau **UT** — production weld
4. **PT** atau **MT** — final surface

### Heat Exchanger In-Service
1. **VT** — exterior shell condition
2. **ET (bobbin)** — internal tubing
3. **UT thickness** — shell wall thickness
4. **RT** — selective tube-to-tubesheet welds

### Aerospace Component
1. **VT** — incoming inspection
2. **PT (Type I)** — surface crack high-sensitivity
3. **ET** — surface crack at fastener holes
4. **UT** atau **PAUT** — internal flaw composite/metal

## Cost-Effectiveness Ranking

Per inspection per weld foot/area (approximate, varies by region):

1. **VT**: $0.10-0.50 (fastest, cheapest)
2. **MT**: $1-3
3. **PT**: $1-3
4. **UT**: $5-20
5. **ET**: $5-15
6. **RT**: $20-80 (mahal karena film + safety overhead)

Plan inspection budget dengan sweet spot — VT + MT/PT + selective UT/RT untuk struktur, full RT hanya untuk critical pressure boundary.

## Code & Specification Drives Selection

Pilihan metode sering driven oleh code:
- **ASME VIII**: RT mandatory untuk certain weld category
- **AWS D1.1**: VT mandatory + UT/RT spot check
- **API 1104**: RT mandatory untuk critical pipeline
- **EN 4179**: PT/MT/ET spesifik untuk aerospace component

Selalu refer ke applicable code FIRST sebelum decide method.

## When in Doubt — Combine Methods

Banyak inspector senior follow rule: **multi-method untuk critical inspection**.

Contoh:
- Crack ditemukan UT? Confirm dengan PT (jika permukaan).
- Indikasi MT marginal? Re-test atau PT untuk verify.
- RT shows porosity? UT confirm depth & location.

Cross-verification mengurangi risk false call dan missed defect.

## Kesimpulan

Method selection bukan tentang "method paling canggih" — tentang **fit-for-purpose**. Pahami strength/weakness setiap method, baca code requirement, dan jangan ragu kombinasi metode untuk critical inspection. Itulah inspector NDT yang berkembang.',
 NULL, 'Level I', 'theory', 14, true, true),

-- More articles for breadth
('Calibration Blocks — IIW V1, V2, and Beyond',
 'calibration-blocks-iiw-v1-v2',
 'Panduan teknis kalibrasi blok untuk UT — geometri, fitur kunci, dan kapan pakai V1 vs V2 vs step wedge dalam praktik inspeksi nyata.',
 E'# Calibration Blocks — IIW V1, V2, and Beyond

Tanpa kalibrasi yang benar, semua reading UT adalah dugaan. Calibration block adalah reference standard yang membuat instrument Anda dapat dipercaya.

## Mengapa Kalibrasi Penting

Sebelum scan weld manapun, instrument harus di-calibrate untuk:
1. **Sensitivity** — gain yang akan deteksi defect target
2. **Range** — depth scale yang akurat
3. **Beam angle** verification — angle beam probe
4. **DAC curve** — distance amplitude correction

Calibration block menyediakan reference reflector dengan dimensi presisi untuk semua ini.

## IIW V1 Block

**International Institute of Welding Block 1** — paling umum dipakai untuk angle beam.

### Geometri Standar
- Dimensi: 300 × 100 × 25 mm
- Material: low-carbon steel, normalized
- Multiple reference reflectors built-in

### Fitur Kunci
- **100 mm radius quadrant**: untuk verify beam exit point pada angle probe
- **25 mm thickness step**: untuk straight beam range calibration
- **ø50 mm hole at 25 mm depth**: standard reference reflector
- **ø2 mm side-drilled hole**: depth reference
- **Acrylic insert**: velocity comparison reference

### Aplikasi
- **Beam Index Point (BIP) verification**
- **Exit angle measurement** (45°, 60°, 70°)
- **DAC curve construction** dari multiple SDH
- **Range calibration** straight beam
- **Probe condition check**

### Limitations
- Berat (~6 kg) — tidak ideal untuk inspeksi extreme remote
- Material specific (low-carbon steel)
- Besar untuk akses sempit

## IIW V2 Block

**Smaller version untuk field calibration.**

### Geometri
- Dimensi: 150 × 75 × 12.5 mm (compact)
- Material: low-carbon steel
- Subset fitur dari V1

### Aplikasi
- **Field calibration** ketika V1 tidak praktis
- **Quick reference check** mid-shift
- **Carry-along** untuk pipeline inspector

### Trade-Off
- Lebih portable tapi sensitivity verification kurang lengkap
- Bagus untuk re-verify, tidak ideal untuk full initial calibration

## Step Wedge

**Series of stepped thicknesses untuk straight beam thickness calibration.**

### Geometri Tipikal
- Multiple steps: 1, 2, 5, 10, 20, 30, 50 mm
- Material: sama dengan inspection material (carbon steel typical)
- Smooth surface untuk consistent couplant

### Aplikasi
- **Thickness gauge calibration**
- **Velocity verification** per material
- **Reference DAC** dengan known depths
- **Wall thickness inspection setup**

### Material-Specific Step Wedges
Untuk akurasi maksimum:
- **Carbon steel** wedge untuk steel inspection
- **Aluminum** wedge untuk aluminum
- **Stainless** untuk stainless

Velocity berbeda → calibration salah jika material mismatch.

## Mode-Conversion Block

**Untuk verify angle beam with mode-converted echoes.**

### Fitur
- Multiple SDH (side-drilled holes) at different depths
- Different angles untuk reflector orientation
- Standard untuk DAC dengan multi-depth reference

## DAC vs TCG vs DGS

### DAC (Distance Amplitude Correction)
Curve manual yang plot peak amplitude vs depth dari reference reflector.
- Build dari 3-5 SDH at different depths
- Inspector evaluate echoes relative ke DAC curve
- Standard untuk most code (ASME V)

### TCG (Time Corrected Gain)
DAC built INTO instrument — gain auto-adjusted per depth.
- Display amplitudo CONSTANT untuk reference reflector
- Lebih mudah untuk operator
- Modern instrument standard

### DGS (Distance Gain Size)
Theoretical curves dari probe characteristics.
- No physical reference reflector needed
- Acoustic theory based
- Common di Eropa, less di Amerika

## Calibration Sequence (Angle Beam)

### Pre-Calibration
1. Probe condition check (no contamination, cable OK)
2. Couplant siap, calibration block clean
3. Instrument warm-up 5 menit

### Step 1: Beam Index Point (BIP)
- Place probe on V1 quadrant (100 mm radius arc)
- Move probe sampai echo dari arc maximum
- Mark BIP at probe edge — itulah titik beam masuk material

### Step 2: Exit Angle Verification
- Place probe pointing at SDH at known depth
- Measure horizontal distance (surface) dari BIP ke SDH center
- Calculate: tan(angle) = surface distance / depth
- Compare dengan probe nominal angle (e.g., 45°)
- Tolerance ±2°

### Step 3: Range Calibration
- Set instrument range untuk depth interest
- Verify dengan known SDH depths
- Adjust until echo at correct depth marker

### Step 4: DAC Construction
- Scan SDH at depth 1 (e.g., 25 mm)
- Adjust gain to 80% FSH (full screen height)
- Scan SDH at depth 2, 3 (e.g., 50, 75 mm)
- Mark each peak — connect to form DAC curve

### Step 5: Document
- Calibration block ID & serial
- Probe & cable serial
- Frequency, angle, gain
- DAC curve photo atau data
- Date, operator name & cert

## Mid-Shift Re-Verification

Per ASME V Article 4: setiap 4 jam atau saat:
- Operator change
- Equipment battery low
- Material change
- Temperature change > 15°C

### Quick Re-Verify
- Re-scan SDH reference
- Echo amplitude ±2 dB dari original
- Range tidak shift > 2%

### If Fail
- Re-calibrate full sequence
- Re-inspect semua weld sejak last good calibration

## Common Mistakes

1. **Wrong material block** — velocity mismatch invalidates DAC
2. **Skip BIP verification** — assume probe nominal angle correct
3. **Lupa mid-shift re-cal** — drift undetected
4. **Couplant inconsistent** — DAC curve not transferable
5. **Block dirty/damaged** — false reference reading

## Kesimpulan

Calibration block bukan "tools tambahan" — adalah heart of UT reliability. IIW V1 untuk full calibration, V2 untuk field, step wedge untuk thickness. Master sequence kalibrasi, document everything, dan re-verify konsisten — itulah Level I yang dipercaya.',
 'UT', 'Level I', 'technique', 13, true, false);

-- Verify
SELECT method, level, COUNT(*) AS articles
FROM "Articles"
GROUP BY method, level
ORDER BY method NULLS LAST, level;
