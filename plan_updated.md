# SNS NDT Learning Platform - Project Plan (Updated 2026)

> **Catatan**: Plan ini telah diupdate untuk mencerminkan implementasi yang sudah ada dan menambahkan fitur-fitur baru berdasarkan best practices dari platform edukasi NDT terkemuka seperti NDE-ED.org, ASNT eLearning, TWI Virtual Academy, dan lainnya.

---

## 1. Project Overview

**Goal:** Membangun platform e-learning NDT yang komprehensif dan interaktif dengan fitur video learning, simulasi fisika, tracking progress user, assessment system, dan manajemen pembayaran.

**Target Audience:** 
- Teknisi NDT profesional
- Mahasiswa teknik
- Peserta sertifikasi ASNT/ISO 9712
- Inspektor industri (Oil & Gas, Manufacturing, Aerospace)

**Differentiator:** Kombinasi video instruktur berkualitas tinggi dengan simulasi interaktif dan AI chatbot untuk pembelajaran yang lebih engaging.

---

## 2. Tech Stack (Current Implementation)

### **Frontend**
- ✅ **Framework:** React 19 + Vite
- ✅ **Language:** JavaScript (recommended: migrate to TypeScript)
- ✅ **Styling:** Tailwind CSS + Radix UI components
- ✅ **State Management:** Redux Toolkit + React Query
- ✅ **Routing:** React Router DOM v7
- ✅ **Icons:** Lucide React + Ant Design Icons
- ✅ **Animations:** Framer Motion
- ✅ **Video Player:** HLS.js (adaptive streaming support)

### **Backend**
- ✅ **Runtime:** Node.js
- ✅ **Framework:** Express.js
- ✅ **Database:** PostgreSQL + Sequelize ORM
- ✅ **Authentication:** JWT + Google OAuth
- ✅ **Payment:** Midtrans integration
- ✅ **AI Chatbot:** Dialogflow integration

### **Recommended Additions for Interactive Features**

**Math & Science Visualization:**
- 📋 `react-katex` atau `mathjax` - Rendering rumus fisika NDT
- 📋 `react-markdown` atau `@next/mdx` - Educational article content

**Simulation Engine:**
- 📋 `react-p5` (P5.js) - Simulasi gelombang 2D (Ultrasonic A-scan/B-scan)
- 📋 `@react-three/fiber` (Three.js) - Visualisasi 3D (Magnetic flux, equipment)
- 📋 `recharts` atau `visx` - Grafik DAC curves, POD charts

**Content Management:**
- 📋 `mdx-bundler` atau `next-mdx-remote` - MDX content for educational materials

---

## 3. Database Schema

### **Current Implementation ✅**

```sql
-- Sudah ada
users (id, username, email, password, role, phoneNumber, address)
categories (id, name, description, techniques[])
lectures (id, name, title, technique, CategoryId, experience_years, 
          certifications[], description, price, availability, image, videoUrl, UserId)
lessons (id, title, description, videoUrl, duration, order, isPreview, LectureId)
user_progress (id, UserId, LectureId, currentLessonId, completedLessons[], 
               progressPercentage, lastWatchedAt, totalWatchTime, isCompleted)
carts (id, UserId, LectureId)
transactions (id, invoice_number, total_amount, status, UserId)
transaction_details (id, TransactionId, LectureId, price)
```

### **Recommended Additions 📋**

```sql
-- Untuk fitur educational content & assessment
modules (
  id, 
  lectureId, 
  title, 
  description, 
  order, 
  content_type ENUM('video', 'article', 'simulation', 'quiz')
)

content_articles (
  id, 
  moduleId, 
  title, 
  mdx_content TEXT,  -- MDX string untuk rich formatting
  author, 
  published_at,
  tags[]
)

quiz_questions (
  id, 
  moduleId, 
  question_text, 
  question_type ENUM('multiple_choice', 'true_false', 'calculation'),
  options JSON,  -- [{text: 'A', isCorrect: false}, ...]
  explanation TEXT,
  difficulty ENUM('basic', 'intermediate', 'advanced'),
  asnt_level ENUM('Level_I', 'Level_II', 'Level_III')
)

quiz_attempts (
  id,
  UserId,
  moduleId,
  score DECIMAL(5,2),
  total_questions INT,
  correct_answers INT,
  answers JSON,  -- [{questionId: 1, userAnswer: 'A', isCorrect: true}, ...]
  completed_at TIMESTAMP
)

certifications (
  id,
  UserId,
  technique VARCHAR,  -- 'UT', 'RT', 'MT', etc.
  level ENUM('Level_I', 'Level_II', 'Level_III'),
  certificate_number VARCHAR,
  issued_at DATE,
  expires_at DATE,
  pdf_url VARCHAR
)

learning_paths (
  id,
  name VARCHAR,  -- 'UT Level I Certification Path'
  description TEXT,
  technique VARCHAR,
  level ENUM('Level_I', 'Level_II', 'Level_III'),
  required_modules INT[]  -- Array of module IDs
)
```

---

## 4. Development Phases (Updated)

### ✅ Phase 1: Foundation & Database Design (COMPLETED)
- ✅ Git repository initialized
- ✅ Supabase alternative: PostgreSQL setup
- ✅ React + Vite client project
- ✅ Express server project
- ✅ Database schema (User, Category, Lecture, Lesson, UserProgress, Cart, Transaction)
- ✅ Row Level Security: Implemented via Express middlewares

### ✅ Phase 2: Backend API (COMPLETED)
- ✅ JWT authentication middleware
- ✅ Course API routes (`/public/lectures`, `/admin/lectures`)
- ✅ Learning API routes (lessons, user progress)
- ✅ Cart & Transaction API
- ✅ Payment integration (Midtrans)
- ✅ Chatbot integration (Dialogflow)

### ✅ Phase 3: Frontend Core UI (COMPLETED)
- ✅ Navbar, Footer, Layout components
- ✅ Login/Register pages (with Google OAuth)
- ✅ Course listing and detail pages
- ✅ Cart and checkout functionality
- ✅ Video player with HLS support
- ✅ User dashboard and orders page
- ✅ Admin dashboard (statistics, CRUD operations)

### ✅ Phase 4: Video Learning & Progress Tracking (COMPLETED)
- ✅ Video lessons structure (Lesson model)
- ✅ User progress tracking (watch time, completion)
- ✅ Course curriculum display
- ✅ Video player with HLS support
- ✅ Curriculum navigation

> **Note:** Video system sudah sufficient. Fokus ke interactive features dulu.

### 📋 Phase 5: Interactive Simulations (PLANNED)

**Inspirasi dari NDE-ED.org - Buat Versi Modern**

#### 5.1 Ultrasonic Testing Simulations
```jsx
<UTBeamAngleCalculator />
// Input: Material velocity, Frequency, Wedge angle
// Output: Beam spread, Near field length, Beam angle

<AScanSimulator />
// Interactive A-scan dengan adjustable gain, TCG, DAC
// Visualisasi gelombang pantulan dari defect

<BScanVisualization />
// 2D cross-section view dari scan results
```

**Libraries:** `react-p5` untuk wave animation

#### 5.2 Radiographic Testing Simulations
```jsx
<RTExposureCalculator />
// Input: Material thickness, kVp, mA, distance
// Output: Exposure time, film density

<FilmDensityVisualizer />
// Slider untuk adjust contrast/density
// Preview radiograph image quality
```

**Libraries:** Canvas API atau WebGL untuk image processing

#### 5.3 Magnetic Particle Testing Simulations
```jsx
<MTFluxLineVisualizer />
// 3D visualization magnetic field around part
// Interactive defect placement to see flux leakage
```

**Libraries:** `@react-three/fiber` untuk 3D visualization

#### 5.4 Liquid Penetrant Testing Simulations
```jsx
<PTDwellTimeCalculator />
// Input: Material type, Temperature, Defect size
// Output: Recommended dwell time

<ContrastComparison />
// Side-by-side comparison: Visible vs Fluorescent PT
```

**Libraries:** CSS/Canvas untuk color contrast visualization

#### 5.5 Eddy Current Testing Simulations
```jsx
<ECImpedancePlane />
// Interactive impedance plane diagram
// Plot various defect types and liftoff effects

<FrequencySelector />
// Input: Material conductivity, penetration depth
// Output: Optimal test frequency
```

**Libraries:** `recharts` untuk impedance diagrams

---

### 📋 Phase 6: Educational Content Engine (PLANNED)

#### 6.1 MDX-Based Articles
```
src/content/
├── physics/
│   ├── acoustics-fundamentals.mdx
│   ├── wave-propagation.mdx
│   └── snells-law.mdx
├── techniques/
│   ├── ut-basic-principles.mdx
│   ├── rt-equipment-setup.mdx
│   └── mt-field-strength.mdx
└── standards/
    ├── asnt-snt-tc-1a.mdx
    └── iso-9712-overview.mdx
```

**Features:**
- Latex math rendering: `$\lambda = \frac{v}{f}$`
- Embedded simulations: `<UTBeamSpread velocity={5900} />`
- Code highlighting untuk calculation examples
- Image/diagrams with captions
- Reference citations

**Libraries:** `@next/mdx` atau `mdx-bundler`

#### 6.2 Markdown Renderer Component
```jsx
<MarkdownRenderer 
  content={articleContent}
  components={{
    // Custom components untuk embed simulations
    UTSim: UTBeamAngleCalculator,
    RTSim: RTExposureCalculator,
    // ... other custom components
  }}
/>
```

**Styling:** `@tailwindcss/typography` untuk clean academic look

---

### 📋 Phase 7: Assessment & Gamification (PLANNED)

#### 7.1 Quiz System
- Multiple choice questions (ASNT exam style)
- True/False questions
- Calculation problems dengan unit converter
- Image-based questions (identify defect type)
- Timed practice exams

**UI Components:**
```jsx
<QuizCard 
  questions={moduleQuestions}
  timeLimit={60}
  onComplete={handleSubmit}
/>

<QuizResults
  score={85}
  totalQuestions={20}
  correctAnswers={17}
  wrongAnswers={[...]} // Show explanations
/>
```

#### 7.2 Progress Dashboard
- Overall course completion percentage
- Module-by-module breakdown
- Time spent learning analytics (via Chart.js)
- Strong/weak areas analysis
- Recommended next steps

#### 7.3 Certificates
- Generate PDF certificate upon 100% completion
- Include course name, completion date, score
- QR code untuk verification
- ASNT/ISO reference (if applicable)

**Library:** `react-pdf` atau `jsPDF`

---

### 📋 Phase 8: Advanced Features (FUTURE)

1. **Discussion Forum/Q&A**
   - Community questions per module
   - Expert answers (dari instructor atau chatbot)
   - Upvoting best answers

2. **Live Online Classes**
   - Webinar integration (Zoom/Google Meet)
   - Schedule management
   - Recording archive

3. **Practical Lab Booking**
   - Book hands-on training sessions
   - Equipment availability calendar
   - Location management

4. **Mobile App (React Native)**
   - Offline video download
   - Push notifications untuk deadlines
   - Progress sync across devices

---

## 5. Content Sourcing Strategy

### Legal & Ethical Guidelines

#### ✅ Recommended Sources (Open/Public Domain)
1. **IAEA Training Course Series** (open access untuk edukasi)
2. **NDE-ED.org** - Gunakan sebagai INSPIRASI, buat ulang konten dengan kata-kata sendiri
3. **ASTM/ISO Standards** - Reference dengan proper citation, jangan copy verbatim
4. **NASA NDE Resource** - Public domain materials
5. **University Research Papers** (open access journals)

#### ⚠️ Harus Hati-hati
- **ASNT Study Guides** - Gunakan untuk struktur silabus, JANGAN copy teks
- **Commercial training materials** - Create original content

#### ❌ Jangan Langsung Copy
- Copyrighted diagrams/images tanpa izin
- Proprietary examination questions
- Paid course content dari competitor

### Content Creation Workflow

```
1. Research Topic → Kumpulkan multiple sources
2. Create Outline → Struktur pembelajaran yang jelas
3. Write Original Content → Paraphrase dengan style sendiri
4. Add Visuals → Buat diagram/animation sendiri (Figma, Blender)
5. Embed Simulations → Interactive element untuk engagement
6. Peer Review → Technical accuracy check
7. Upload to Database → MDX format ke content_articles table
```

---

## 6. Folder Structure (Recommended)

### Frontend
```
client/src/
├── components/
│   ├── layout/           # ✅ Navbar, Footer (sudah ada)
│   ├── ui/               # ✅ Radix UI components (sudah ada)
│   ├── ndt-sims/         # 📋 NEW - Simulation components
│   │   ├── UT/
│   │   │   ├── BeamAngleCalc.jsx
│   │   │   ├── AScanSim.jsx
│   │   │   └── BScanSim.jsx
│   │   ├── RT/
│   │   ├── MT/
│   │   ├── PT/
│   │   └── ET/
│   ├── quiz/             # 📋 NEW - Quiz components
│   │   ├── QuizCard.jsx
│   │   ├── QuestionItem.jsx
│   │   └── ResultsModal.jsx
│   └── VideoPlayer.jsx   # ✅ Sudah ada
├── content/              # 📋 NEW - MDX educational articles
│   ├── physics/
│   ├── techniques/
│   └── standards/
├── pages/                # ✅ Sudah ada (routes)
│   ├── CourseDetail.jsx
│   ├── ModernCourseLearning.jsx
│   └── [new] ArticlePage.jsx
├── hooks/                # ✅ Custom hooks (sudah ada)
├── store/                # ✅ Redux store (sudah ada)
├── utils/                # ✅ Utilities (sudah ada)
└── lib/                  # ✅ API config (sudah ada)
```

### Backend
```
server/
├── controllers/          # ✅ Sudah lengkap
│   ├── lectureController.js
│   ├── lessonController.js
│   └── [new] quizController.js
├── models/               # ✅ Sudah ada + tambahan
│   ├── lecture.js
│   ├── lesson.js
│   ├── userprogress.js
│   └── [new] quiz.js, module.js, contentarticle.js
├── routes/               # ✅ Sudah ada
├── middlewares/          # ✅ Auth, error handling (sudah ada)
├── helpers/              # ✅ JWT, bcrypt, payment (sudah ada)
└── data/                 # 📋 NEW - Seed data untuk questions/articles
```

---

## 7. Referensi Platform NDT Terkemuka

### 1. **NDE-ED.org** (Primary Inspiration)
- **Kelebihan:**
  - Free educational resource
  - Interactive physics simulations
  - Comprehensive coverage semua metode NDT
  - Visual demonstrations excellent
- **Yang Bisa Diambil:**
  - Structure: Physics → Techniques → Engineering
  - Interactive calculators (beam angle, exposure time)
  - Glossary dan reference materials
- **URL:** https://www.nde-ed.org/

### 2. **ASNT eLearning**
- **Kelebihan:**
  - Industry standard certification
  - CEU tracking untuk recertification
  - Expert instructors
- **Yang Bisa Diambil:**
  - Certification path structure (Level I/II/III)
  - Quiz format dan difficulty levels
  - Progress tracking untuk professional development
- **URL:** https://www.asnt.org/

### 3. **TWI Virtual Academy**
- **Kelebihan:**
  - Blended learning approach (online + practical)
  - Aligned dengan ISO 9712 standards
  - Pre-course assessments
- **Yang Bisa Diambil:**
  - Hybrid model: theory online, praktik offline
  - Pre-assessment untuk gauging user level
  - Certificate yang recognized industry
- **URL:** https://twivirtualacademy.com/

### 4. **WorldSpec (Hellier NDT)**
- **Kelebihan:**
  - HD video demonstrations
  - Personal mentor support
  - 24/7 access dengan 1 year validity
- **Yang Bisa Diambil:**
  - High-quality video production standards
  - AI chatbot sebagai "personal mentor"
  - Flexible access model
- **URL:** https://worldspec.org/

### 5. **AINDT (American Institute of NDT)**
- **Kelebihan:**
  - Interactive learning tools (videos, quizzes, discussions)
  - Comprehensive coverage multiple methods
  - Community features
- **Yang Bisa Diambil:**
  - Interactive video elements
  - Discussion forum per module
  - Multi-method comparison features
- **URL:** https://trainingndt.com/

### 6. **NDT Quality Training**
- **Kelebihan:**
  - Modern online format
  - Audio narration untuk accessibility
  - IACET accredited
- **Yang Bisa Diambil:**
  - Accessibility features (audio, transcripts)
  - Reference material downloads (PDF study guides)
  - Practice exams aligned dengan standards
- **URL:** https://ndtqualitytraining.com/

### 7. **Eddyfi Academy**
- **Kelebihan:**
  - Free courses available
  - Equipment-specific training
  - Software tutorials
- **Yang Bisa Diambil:**
  - Freemium model (basic free, advanced paid)
  - Equipment operation videos
  - Software simulation tutorials
- **URL:** https://academy.eddyfi.com/

---

## 8. Learning Path Examples

### Path 1: Ultrasonic Testing Level I
```
Module 1: Introduction to NDT (Free Preview)
├── Lesson 1.1: What is NDT? (Video 10 min)
├── Lesson 1.2: NDT Methods Overview (Video 15 min)
└── Quiz 1: NDT Basics (10 questions)

Module 2: Physics of Sound
├── Article 2.1: Wave Propagation Fundamentals (MDX)
├── Simulation 2.1: Velocity Calculator
├── Lesson 2.2: Acoustic Properties of Materials (Video 20 min)
├── Simulation 2.2: Snell's Law Demo
└── Quiz 2: Acoustics (15 questions)

Module 3: UT Equipment
├── Lesson 3.1: Ultrasonic Flaw Detector Components (Video 25 min)
├── Lesson 3.2: Transducer Types and Selection (Video 20 min)
├── Simulation 3.1: Beam Angle Calculator
└── Quiz 3: Equipment (20 questions)

[... total 10-12 modules untuk Level I]

Final Exam: Level I Practice Test (60 questions, 90 min)
Certificate: Upon achieving >70% score
```

### Path 2: Multi-Method Awareness Course
```
Introduction: NDT in Industry (Video 15 min)

UT Module: Ultrasonic Testing Basics
├── Video overview (10 min)
├── Beam angle simulation
└── Mini quiz (5 questions)

RT Module: Radiographic Testing Basics
├── Video overview (10 min)
├── Exposure calculator
└── Mini quiz (5 questions)

MT Module: Magnetic Particle Testing Basics
[...repeat structure]

PT Module: Liquid Penetrant Testing Basics
ET Module: Eddy Current Testing Basics
VT Module: Visual Inspection Basics

Final Assessment: Method Selection Quiz (Choose right method for defect type)
```

---

## 9. Next Steps (Immediate Actions)

> **Focus Area:** Interactive simulations, assessments, dan educational content. Video system sudah cukup.

### Priority 1: Interactive Simulations (Pilot) 🎯
**Goal:** Buat 1 simulasi proof-of-concept
1. Setup `react-p5` library
2. Pilih pilot: **UT Beam Angle Calculator**
3. Create `<UTBeamAngleCalc />` component dengan:
   - Input: Material velocity, Frequency, Wedge angle
   - Output: Beam spread, Near field length, Refraction angle
4. Styling modern dengan Tailwind CSS
5. Embed di halaman course sebagai demo

**Timeline:** 2-3 hari  
**Success Metric:** User bisa interact dan lihat calculation results

---

### Priority 2: Assessment System 📝
**Goal:** Quiz system untuk validate learning
1. **Database:**
   - Migration: Create `quiz_questions` table
   - Migration: Create `quiz_attempts` table
   - Model: Quiz, QuizAttempt
2. **Backend:**
   - API: `GET /api/quizzes/:moduleId` - Get questions
   - API: `POST /api/quiz-attempts` - Submit answers
   - API: `GET /api/quiz-attempts/:userId` - Get history
3. **Frontend:**
   - Component: `<QuizCard />` - Question display
   - Component: `<QuizResults />` - Score & explanations
   - Page: Integrate quiz ke course detail
4. **Content:**
   - Seed 20-30 sample questions untuk 1 course

**Timeline:** 4-5 hari  
**Success Metric:** User bisa take quiz dan lihat score

---

### Priority 3: MDX Content Engine 📚
**Goal:** Rich educational articles dengan LaTeX support
1. Setup `react-markdown` + `remark-math` + `rehype-katex`
2. Create `content_articles` table (migration + model)
3. Build `<ArticleRenderer />` component
4. Create 2-3 sample articles:
   - "Physics of Ultrasonic Waves"
   - "Understanding A-Scan Displays"
5. API untuk serve content dari database

**Timeline:** 3-4 hari  
**Success Metric:** Article dengan math formulas rendered correctly

---

### Priority 4: Database Schema Enhancement 🗄️
**Goal:** Support modules, quizzes, articles
1. Create `modules` table (group lessons by topic)
2. Link quizzes to modules
3. Link articles to modules
4. Migration untuk restructure existing data

**Timeline:** 2 hari  
**Success Metric:** Database schema supports new content types

---

### Priority 5: Content Population (Later)
1. Write content outline untuk **Ultrasonic Testing Level I**
2. Create learning path structure
3. Populate database dengan modules
4. Add quiz questions (target: 100+ questions)

---

## 10. Success Metrics

### User Engagement
- Video completion rate > 70%
- Quiz attempt rate > 60% per module
- Average time on platform > 45 min/session

### Educational Effectiveness
- Quiz average score > 75%
- User satisfaction rating > 4.5/5
- Certificate completion rate > 50% of enrolled users

### Business Metrics
- User enrollment growth > 20% month-over-month
- Payment conversion rate > 15%
- Customer retention rate > 60% (after first purchase)

### Technical Performance
- Video load time < 3 seconds
- Simulation frame rate > 30 FPS
- Page load time < 2 seconds
- Mobile responsiveness score > 90%

---

## 11. Kesimpulan

Platform SNS NDT Learning sudah memiliki **fondasi yang sangat kuat** dengan:
- ✅ Video learning system yang functional
- ✅ User authentication & payment integration
- ✅ Admin dashboard untuk management
- ✅ Progress tracking untuk user

**Langkah selanjutnya** adalah menambahkan differentiator yang membuat platform ini **lebih engaging dan educational** dibanding kompetitor:

1. **Interactive Simulations** - Bikin user bisa "experiment" dengan konsep fisika NDT
2. **Rich Educational Content** - MDX articles dengan math rendering
3. **Assessment System** - Quiz untuk validate learning
4. **Certification Paths** - Structured learning sesuai ASNT/ISO standards
5. **AI Chatbot Enhancement** - Leverage Dialogflow untuk "personal mentor" experience

Dengan roadmap ini, SNS NDT Learning bisa menjadi platform yang **combine the best of** NDE-ED.org (free educational value) dengan WorldSpec (quality video) dan ASNT (industry certification), delivered dengan **modern tech stack dan premium UX**.

---

**Last Updated:** Januari 2026  
**Version:** 2.0  
**Status:** Ready for Implementation
