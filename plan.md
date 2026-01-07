Berikut adalah **Project Plan (Roadmap)** yang sangat komprehensif dari A-Z, disusun khusus untuk tech stack **React + Express + Supabase** dengan fokus pada fitur edukasi NDT (Non-Destructive Testing).

Silakan simpan konten di bawah ini sebagai file `PLAN.md` di root folder project Anda.

---

# PLAN.md - SarNDT E-Learning Platform Development Roadmap

## 1. Project Overview

**Goal:** Membangun platform e-learning NDT modern yang interaktif (mirip `nde-ed.org` tapi modern) dengan fitur simulasi fisika, tracking progress user, dan manajemen konten berbasis Markdown/MDX.
**Target Audience:** Teknisi NDT, mahasiswa teknik, dan peserta sertifikasi ASNT/ISO.

## 2. Tech Stack Architecture

### **Frontend (Client)**

* **Framework:** React (Vite)
* **Language:** JavaScript/TypeScript (Recommended)
* **Styling:** Tailwind CSS (untuk layout cepat) + `@tailwindcss/typography` (untuk format artikel materi).
* **State Management:** Zustand (ringan & cepat) atau React Context.
* **Routing:** React Router DOM v6.
* **Math Rendering:** `react-katex` atau `mathjax` (untuk rumus fisika NDT).
* **Simulation/Animation Engine:**
* `react-p5` (P5.js): Untuk simulasi gelombang 2D (Ultrasonic A-scan/B-scan).
* `@react-three/fiber` (Three.js): Untuk visualisasi 3D (Magnetic flux, equipment setup).
* `recharts`: Untuk grafik data (DAC Curves, Impedance plane).



### **Backend (Server)**

* **Runtime:** Node.js.
* **Framework:** Express.js.
* **Purpose:** Middleware logic, validation, custom API endpoints yang kompleks, dan proteksi business logic.

### **Database & Auth (BaaS)**

* **Provider:** Supabase.
* **Database:** PostgreSQL.
* **Auth:** Supabase Auth (Email/Password, Google OAuth).
* **Storage:** Supabase Storage (untuk gambar materi & aset PDF).

---

## 3. Development Phases

### Phase 1: Foundation & Database Design

**Focus:** Setup infrastruktur dan skema data.

* [ ] **Initial Setup**
* [ ] Initialize Git Repository.
* [ ] Setup Supabase Project (Create Organization & Project).
* [ ] Setup Client Project (Vite + React + Tailwind).
* [ ] Setup Server Project (Express + Cors + Dotenv).


* [ ] **Database Schema (PostgreSQL via Supabase)**
* [ ] `profiles`: Extend user data (full name, job title, level certification).
* [ ] `courses`: (e.g., "Ultrasonic Testing Level 1").
* [ ] `modules`: (e.g., "Basic Principles of Acoustics").
* [ ] `lessons`: Konten utama (Stores MDX string or URL to file).
* [ ] `quiz_questions`: Bank soal untuk setiap module.
* [ ] `user_progress`: Tracking (user_id, lesson_id, is_completed, score).


* [ ] **Security (RLS)**
* [ ] Enable Row Level Security (RLS) di semua table.
* [ ] Policy: Public can `read` courses.
* [ ] Policy: Only Authenticated users can `read` lessons & `insert` progress.
* [ ] Policy: Only Admin can `write/update` content.



### Phase 2: Backend API (Express.js)

**Focus:** Menjembatani Frontend dan Database dengan logic yang aman.

* [ ] **Authentication Middleware**
* [ ] Create middleware to verify Supabase JWT token sent from frontend.


* [ ] **Course API Routes**
* [ ] `GET /api/courses`: List all available NDT methods.
* [ ] `GET /api/courses/:id/syllabus`: Get tree structure (Modules -> Lessons).


* [ ] **Learning API Routes**
* [ ] `GET /api/lesson/:id`: Fetch materi spesifik (termasuk content MDX).
* [ ] `POST /api/progress/mark-complete`: Update progress user.


* [ ] **Search Logic**
* [ ] Implementasi logic pencarian materi (bisa menggunakan PostgreSQL Full Text Search).



### Phase 3: Frontend Core UI

**Focus:** Layout aplikasi yang nyaman untuk membaca dokumentasi teknis.

* [ ] **Global Components**
* [ ] `Navbar`: Logo, User Profile, Links.
* [ ] `Sidebar`: Collapsible tree navigation untuk materi (Course -> Module -> Lesson).
* [ ] `Layout`: Wrapper utama (Sidebar kiri, Konten kanan).


* [ ] **Pages**
* [ ] `HomePage`: Dashboard user, list course yang diambil.
* [ ] `CourseLanding`: Overview course, silabus.
* [ ] `LessonViewer`: Halaman utama belajar.
* [ ] Render Markdown/MDX content.
* [ ] Pagination (Next/Prev Lesson).




* [ ] **Auth Pages**
* [ ] Login / Register UI.



### Phase 4: Content Engine & Interactive Simulations (The "NDT" Core)

**Focus:** Membuat materi tidak membosankan dengan animasi.

* [ ] **Markdown Engine**
* [ ] Implementasi `react-markdown` atau `mdx-remote`.
* [ ] Styling typography agar mirip paper akademik (Jelas, bersih).
* [ ] Support rendering Latex Math equations ().


* [ ] **Simulation Component Library (Reusable)**
* [ ] **`SimulationCanvas`**: Wrapper component.
* [ ] **Ultrasonic Sim (P5.js)**:
* [ ] Slider: Frequency (MHz), Velocity (m/s).
* [ ] Visual: Gelombang bergerak, memantul saat kena "Wall" (Backwall echo).


* [ ] **Radiography Sim (CSS/Canvas)**:
* [ ] Slider: kV (Penetration power), Time.
* [ ] Visual: Mengubah opacity/contrast gambar X-Ray film.


* [ ] **Magnetic Particle Sim (Three.js)**:
* [ ] Visual: Garis medan magnet (flux lines) di sekitar benda uji.





### Phase 5: Knowledge Sourcing & Content Population

**Focus:** Mengisi database dengan materi NDT berkualitas.

* [ ] **Source Gathering (Legal & Valid)**
* [ ] *IAEA Training Course Series*: Referensi utama (biasanya open access untuk edukasi).
* [ ] *ASNT Level I/II Study Guides*: Untuk struktur silabus (jangan copy-paste teks verbatim).
* [ ] *NDT Resource Center (nde-ed.org)*: Inspirasi visualisasi, tapi buat ulang asetnya.


* [ ] **Content Creation Workflow**
* [ ] Tulis materi dalam Markdown.
* [ ] Masukkan *placeholder* untuk simulasi (misal: `<Simulation type="ut-beam-spread" />`).
* [ ] Upload ke Supabase table `lessons`.



### Phase 6: Gamification & Assessment

**Focus:** Retensi user.

* [ ] **Quizzes**
* [ ] Component `QuizCard` di akhir setiap module.
* [ ] Logic penilaian otomatis.


* [ ] **Certificates (Optional)**
* [ ] Generate PDF sertifikat sederhana jika progress course = 100%.



---

## 4. Library Recommendation Detail

| Category | Library | Alasan Penggunaan |
| --- | --- | --- |
| **Physics/2D** | `react-p5` | Sangat kuat untuk math-based animation (gelombang, plot grafik real-time). |
| **3D Visuals** | `@react-three/fiber` | Standard industri untuk 3D di web (ringan dibanding engine game). |
| **Math Typesetting** | `rehype-katex` | Merender rumus fisika NDT agar terlihat profesional. |
| **Charts** | `recharts` | Membuat grafik DAC, Histogram, atau kurva sensitivitas. |
| **Icons** | `lucide-react` | Icon set modern dan bersih. |
| **Rich Text** | `react-markdown` | Merender konten materi dari database dengan aman. |

---

## 5. Folder Structure Example (Frontend)

```text
src/
├── assets/          # Static images
├── components/
│   ├── layout/      # Sidebar, Navbar
│   ├── ntd-sims/    # Folder KHUSUS Simulasi
│   │   ├── UTBeamSpread.jsx
│   │   ├── RTContrast.jsx
│   │   └── MTFluxLines.jsx
│   ├── ui/          # Buttons, Inputs (Shadcn/Tailwind)
│   └── MarkdownRenderer.jsx
├── context/         # AuthContext
├── hooks/           # Custom hooks (useProgress, useCourse)
├── lib/             # Supabase client config
├── pages/           # Route pages
└── services/        # API calls to Express backend

```

---

## 6. Next Steps (Immediate Action)

1. Jalankan **Phase 1 (Database Schema)** di Supabase Dashboard.
2. Setup repo Github dan init project React + Express.
3. Tentukan 1 Metode NDT (Saran: **Ultrasonic Testing**) sebagai pilot project konten pertama.