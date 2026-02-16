import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

export const translations = {
  id: {
    // Common
    loading: 'Memuat...',
    error: 'Terjadi kesalahan',
    viewAll: 'Lihat Semua',
    register: 'Daftar',
    registerNow: 'Daftar Sekarang',
    learnMore: 'Selengkapnya',
    submit: 'Kirim',
    sending: 'Mengirim...',
    back: 'Kembali',
    search: 'Cari',
    all: 'Semua',
    close: 'Tutup',

    // Home
    home: {
      trustedBy: 'Dipercaya oleh 500+ Profesional Industri',
      trustedSub: 'Bergabung dengan alumni yang sukses karir NDT-nya',
      programs: 'Program Kursus',
      alumniSuccess: 'Alumni Berhasil',
      passRate: 'Tingkat Kelulusan',
      onlineSupport: 'Support Online',
      limitedOffer: 'BERLANGSUNG SEKARANG',
      limitedTitle: 'Peluang Terbatas: Sertifikasi NDT 2026',
      limitedDesc: 'Amankan kursi Anda sekarang dan hemat 20% untuk investasi karir Anda. Kuota terbatas!',
      checkSchedule: 'Cek Jadwal & Harga',
      secureSeat: 'Amankan Kursi Saya',
      benefitsTitle: 'Keuntungan Mendaftar Sekarang:',
      benefit1: 'Diskon 20% Early Bird',
      benefit2: 'Materi Pembelajaran Online',
      benefit3: 'Sertifikasi Internasional',
      methodsTitle: 'Metode NDT yang Kami Ajarkan',
      methodsSub: 'Pelatihan komprehensif dengan standar internasional',
      certStandard: 'Sertifikasi ASNT SNT TC 1A dan EN 4179/NAS 410',
      viewAllCourses: 'Lihat Semua Kursus',
      upcomingTitle: 'Jadwal Training Terdekat',
      upcomingSub: 'Kuota terbatas! Daftar sebelum kehabisan',
      viewAllSchedule: 'Lihat Semua Jadwal',
      clickToRegister: 'Klik untuk daftar →',
      quotaWarning: 'Kuota terbatas untuk setiap kelas',
      important: 'Penting:',
      featuredTitle: 'Kursus Unggulan',
      featuredSub: 'Pilihan populer untuk memulai',
      allCourses: 'Semua Kursus',
      testimonialTitle: 'Apa Kata Alumni Kami',
      testimonialSub: 'Lebih dari 500+ profesional telah mempercayai kami untuk karir NDT mereka',
      featuredTestimonial: 'Testimoni Unggulan',
      alumniIndustry: 'alumni berhasil di berbagai industri',
      trustedCompanies: 'Dipercaya oleh profesional dari perusahaan ternama',
      readyTitle: 'Siap meningkatkan kompetensi?',
      readySub: 'Daftar kursus NDT dan dapatkan sertifikasi resmi.',
      viewCourses: 'Lihat Kursus',
      whatsappConsult: 'Konsultasi WhatsApp',
      contactTitle: 'Hubungi Kami',
      contactSub: 'Konsultasi kebutuhan pelatihan untuk tim Anda.',
      corpConsult: 'Konsultasi Perusahaan',
      corpDesc: 'Kami menyediakan pelatihan in-house dan sertifikasi untuk organisasi Anda.',
      graduated: 'Lulus',
    },
    methods: {
      pt: { name: 'Penetrant Testing (PT)', desc: 'Deteksi retakan permukaan dengan cairan penetrasi' },
      mt: { name: 'Magnetic Particle (MT)', desc: 'Identifikasi cacat pada material feromagnetik' },
      ut: { name: 'Ultrasonic Testing (UT)', desc: 'Pemeriksaan internal dengan gelombang ultrasonik' },
      et: { name: 'Eddy Current (ET)', desc: 'Pengujian konduktivitas listrik material' },
      paut: { name: 'Phased Array (PAUT)', desc: 'Teknologi advanced ultrasonic imaging' },
      rt: { name: 'Radiographic Testing (RT)', desc: 'Inspeksi dengan sinar-X/Gamma' },
    },

    // Hero
    hero: {
      subtitle: 'Pelatihan praktis dan sertifikasi NDT',
      methodsList: '(PT, MT, UT, ET, PAUT, TOFD, RI, VT, RT, RFET, PEC, MFL, IRT, Etc.)',
      forEngineers: 'yang dirancang untuk teknisi dan engineer industri dengan standar internasional.',
      viewSchedule: 'Lihat Jadwal Training',
    },

    // About
    about: {
      title: 'Tentang SNS — SAR NDT Services',
      desc: 'SNS menyediakan pelatihan dan sertifikasi Non-Destructive Testing (NDT) yang elegan, sederhana, dan sesuai standar internasional.',
      vision: 'Visi',
      visionText: 'Menjadi mitra terpercaya dalam pengembangan kompetensi NDT dengan layanan pelatihan dan sertifikasi yang berkelas, praktis, dan diakui industri.',
      mission: 'Misi',
      missionItems: [
        'Menyediakan kurikulum NDT yang relevan dan aplikatif',
        'Mendampingi peserta hingga siap sertifikasi',
        'Menjaga kualitas instruktur dan materi sesuai standar',
        'Mendukung kebutuhan pelatihan korporasi secara fleksibel',
      ],
    },

    // Contact
    contact: {
      title: 'Kontak',
      subtitle: 'Ada pertanyaan? Silakan isi formulir di bawah.',
      name: 'Nama',
      email: 'Email',
      phone: 'No. Telepon',
      message: 'Pesan',
      send: 'Kirim Pesan',
      success: 'Pesan terkirim. Kami akan menghubungi Anda.',
      failed: 'Gagal mengirim pesan',
    },

    // Courses
    courses: {
      title: 'Kursus NDT',
      subtitle: 'Pilih kursus sesuai kebutuhan Anda',
      searchPlaceholder: 'Cari kursus...',
      allCategories: 'Semua Kategori',
      noCourses: 'Tidak ada kursus ditemukan',
      prev: 'Sebelumnya',
      next: 'Selanjutnya',
    },

    // Course Detail
    courseDetail: {
      prerequisites: 'Prasyarat',
      prerequisitesList: [
        'Terbuka untuk umum (minimal SMA/sederajat)',
        'Memahami dasar K3 (Keselamatan & Kesehatan Kerja)',
        'Dapat mengikuti kelas teori dan praktik',
      ],
      registerWhatsapp: 'Daftar via WhatsApp',
      included: 'Termasuk dalam kursus ini',
      includedItems: ['Materi teori lengkap', 'Praktik langsung', 'Sertifikat kelulusan', 'Dukungan pasca-pelatihan'],
      notFound: 'Kursus tidak ditemukan',
    },

    // Schedule
    schedule: {
      title: 'Jadwal Training & Sertifikasi',
      subtitle: 'Cari jadwal yang sesuai dan daftar langsung.',
      keyword: 'Kata kunci',
      method: 'Metode',
      from: 'Dari',
      to: 'Sampai',
      noEvents: 'Belum ada jadwal tersedia',
      noEventsDesc: 'Jadwal training akan segera diumumkan. Hubungi kami untuk informasi lebih lanjut.',
      contactAdmin: 'Hubungi Admin',
      location: 'Lokasi',
      registerNow: 'Daftar Sekarang',
      viewDetail: 'Lihat detail →',
    },

    // Schedule Detail
    scheduleDetail: {
      backToSchedule: '← Kembali ke Jadwal',
      viewAllSchedule: '← Lihat Semua Jadwal',
      period: 'Periode',
      location: 'Lokasi',
      method: 'Metode',
      level: 'Level',
      quota: 'Kuota',
      price: 'Biaya',
      date: 'Tanggal',
      time: 'Waktu',
      addToCalendar: 'Tambahkan ke kalender Anda',
      registerWhatsapp: 'Daftar via WhatsApp',
      registerNow: 'Daftar Sekarang',
      notFound: 'Jadwal tidak ditemukan',
      notFoundDesc: 'Jadwal yang Anda cari mungkin sudah tidak tersedia atau belum dijadwalkan.',
    },

    // Recertification
    recert: {
      title: 'Resertifikasi NDT',
      desc: 'Pertahankan kualifikasi profesional Anda. Sertifikat NDT berlaku selama 5 tahun dan memerlukan pembaruan untuk memastikan kompetensi sesuai standar industri terkini.',
      validityTitle: 'Masa Berlaku 5 Tahun',
      validityDesc: 'Sesuai standar ASNT SNT TC 1A dan EN 4179/NAS 410, sertifikasi personel NDT memiliki masa berlaku 5 tahun sejak tanggal diterbitkan.',
      requirementsTitle: 'Syarat Resertifikasi',
      requirementsDesc: 'Peserta wajib menunjukkan bukti pengalaman kerja berkelanjutan di metode terkait atau mengikuti ujian penyegaran (recertification exam).',
      freeConsultTitle: 'Konsultasi Gratis',
      freeConsultDesc: 'Tim kami siap membantu Anda mengecek status sertifikat dan membimbing proses perpanjangan agar tidak terjadi kadaluarsa.',
      ctaTitle: 'Jangan Biarkan Sertifikat Anda Kadaluarsa',
      ctaDesc: 'Sertifikat yang sudah melewati masa berlaku mungkin mengharuskan Anda untuk mengulang pelatihan dari awal. Segera urus resertifikasi Anda sebelum terlambat.',
      consultWhatsapp: 'Hubungi Admin untuk Resertifikasi',
    },

    // Alumni
    alumni: {
      title: 'Alumni Sertifikasi SNS',
      subtitle: 'Beberapa peserta yang telah lulus sertifikasi NDT.',
    },

    // Privacy & Terms
    privacy: {
      title: 'Kebijakan Privasi',
      subtitle: 'Kami menghargai privasi Anda. Dokumen ini menjelaskan bagaimana kami mengelola data pribadi.',
      items: [
        'Data yang kami kumpulkan terbatas pada data pendaftaran dan penggunaan platform.',
        'Data digunakan untuk kebutuhan operasional kursus, pembayaran, dan dukungan pelanggan.',
        'Anda dapat meminta penghapusan data melalui halaman kontak.',
      ],
    },
    terms: {
      title: 'Syarat & Ketentuan',
      subtitle: 'Dengan menggunakan platform ini, Anda setuju pada syarat dan ketentuan berikut.',
      items: [
        'Materi kursus hanya untuk keperluan belajar dan tidak untuk disebarluaskan tanpa izin.',
        'Pembayaran yang telah diproses mengikuti kebijakan masing-masing metode pembayaran.',
        'Kami berhak melakukan perubahan pada konten atau jadwal kursus.',
      ],
    },

    // 404
    notFound: {
      title: 'Halaman Tidak Ditemukan',
      desc: 'Halaman yang Anda cari mungkin telah dipindahkan atau tidak tersedia.',
      backHome: 'Kembali ke Beranda',
      browseCourses: 'Jelajahi Kursus',
    },

    // Login
    login: {
      welcome: 'Selamat Datang Kembali',
      subtitle: 'Masuk untuk melanjutkan perjalanan belajar NDT Anda',
      email: 'Email',
      password: 'Kata Sandi',
      emailPlaceholder: 'Masukkan email Anda',
      passwordPlaceholder: 'Masukkan kata sandi',
      signIn: 'Masuk',
      signingIn: 'Memproses...',
      noAccount: 'Belum punya akun?',
      registerHere: 'Daftar di sini',
      orContinue: 'atau lanjutkan dengan',
    },

    // Register
    register: {
      title: 'Buat Akun Baru',
      subtitle: 'Bergabung untuk akses pelatihan NDT profesional',
      name: 'Nama Lengkap',
      email: 'Email',
      password: 'Kata Sandi',
      confirmPassword: 'Konfirmasi Kata Sandi',
      namePlaceholder: 'Masukkan nama lengkap',
      emailPlaceholder: 'Masukkan email Anda',
      passwordPlaceholder: 'Minimal 6 karakter',
      confirmPlaceholder: 'Ulangi kata sandi',
      passwordMismatch: 'Kata sandi tidak cocok',
      createAccount: 'Buat Akun',
      creating: 'Membuat akun...',
      hasAccount: 'Sudah punya akun?',
      loginHere: 'Masuk di sini',
      orContinue: 'atau lanjutkan dengan',
    },

    // Footer
    footer: {
      company: 'Perusahaan',
      aboutUs: 'Tentang Kami',
      certSchedule: 'Jadwal Sertifikasi',
      contactUs: 'Hubungi Kami',
      coursesLabel: 'Kursus',
      allCourses: 'Semua Kursus',
      alumniLabel: 'Alumni',
      legal: 'Legal',
      privacyPolicy: 'Kebijakan Privasi',
      termsConditions: 'Syarat & Ketentuan',
      tagline: 'Pusat pelatihan dan sertifikasi Non-Destructive Testing terdepan di Indonesia.',
      designedBy: 'Didesain oleh Tim SNS',
    },

    // My Courses
    myCourses: {
      title: 'Kursus Saya',
      subtitle: 'Kursus yang telah Anda beli',
      noCourses: 'Anda belum memiliki kursus',
      noCoursesDesc: 'Jelajahi kursus kami dan mulai belajar',
      browseCourses: 'Jelajahi Kursus',
      accessCourse: 'Akses Kursus',
      purchased: 'Dibeli',
    },
  },

  en: {
    // Common
    loading: 'Loading...',
    error: 'An error occurred',
    viewAll: 'View All',
    register: 'Register',
    registerNow: 'Register Now',
    learnMore: 'Learn More',
    submit: 'Submit',
    sending: 'Sending...',
    back: 'Back',
    search: 'Search',
    all: 'All',
    close: 'Close',

    // Home
    home: {
      trustedBy: 'Trusted by 500+ Industry Professionals',
      trustedSub: 'Join alumni who have built successful NDT careers',
      programs: 'Training Programs',
      alumniSuccess: 'Successful Alumni',
      passRate: 'Pass Rate',
      onlineSupport: 'Online Support',
      limitedOffer: 'HAPPENING NOW',
      limitedTitle: 'Limited Offer: NDT Certification 2026',
      limitedDesc: 'Secure your seat now and save 20% on your career investment. Limited spots!',
      checkSchedule: 'Check Schedule & Pricing',
      secureSeat: 'Secure My Seat',
      benefitsTitle: 'Benefits of Registering Now:',
      benefit1: '20% Early Bird Discount',
      benefit2: 'Online Learning Materials',
      benefit3: 'International Certification',
      methodsTitle: 'NDT Methods We Teach',
      methodsSub: 'Comprehensive training with international standards',
      certStandard: 'ASNT SNT TC 1A and EN 4179/NAS 410 Certification',
      viewAllCourses: 'View All Courses',
      upcomingTitle: 'Upcoming Training Schedule',
      upcomingSub: 'Limited spots! Register before they fill up',
      viewAllSchedule: 'View All Schedules',
      clickToRegister: 'Click to register →',
      quotaWarning: 'Limited quota for each class',
      important: 'Important:',
      featuredTitle: 'Featured Courses',
      featuredSub: 'Popular picks to get started',
      allCourses: 'All Courses',
      testimonialTitle: 'What Our Alumni Say',
      testimonialSub: 'More than 500+ professionals have trusted us for their NDT careers',
      featuredTestimonial: 'Featured Testimonial',
      alumniIndustry: 'alumni succeeding across industries',
      trustedCompanies: 'Trusted by professionals from leading companies',
      readyTitle: 'Ready to advance your skills?',
      readySub: 'Enroll in NDT courses and get officially certified.',
      viewCourses: 'View Courses',
      whatsappConsult: 'WhatsApp Consultation',
      contactTitle: 'Contact Us',
      contactSub: 'Consult your team\'s training needs.',
      corpConsult: 'Corporate Consultation',
      corpDesc: 'We provide in-house training and certification for your organization.',
      graduated: 'Graduated',
    },
    methods: {
      pt: { name: 'Penetrant Testing (PT)', desc: 'Surface crack detection using penetrant liquid' },
      mt: { name: 'Magnetic Particle (MT)', desc: 'Defect identification on ferromagnetic materials' },
      ut: { name: 'Ultrasonic Testing (UT)', desc: 'Internal inspection using ultrasonic waves' },
      et: { name: 'Eddy Current (ET)', desc: 'Material conductivity testing' },
      paut: { name: 'Phased Array (PAUT)', desc: 'Advanced ultrasonic imaging technology' },
      rt: { name: 'Radiographic Testing (RT)', desc: 'Inspection using X-ray/Gamma radiation' },
    },

    // Hero
    hero: {
      subtitle: 'Practical training and NDT certification',
      methodsList: '(PT, MT, UT, ET, PAUT, TOFD, RI, VT, RT, RFET, PEC, MFL, IRT, Etc.)',
      forEngineers: 'designed for industry technicians and engineers with international standards.',
      viewSchedule: 'View Training Schedule',
    },

    // About
    about: {
      title: 'About SNS — SAR NDT Services',
      desc: 'SNS provides elegant, simple, and internationally standardized Non-Destructive Testing (NDT) training and certification.',
      vision: 'Vision',
      visionText: 'To be a trusted partner in NDT competency development with world-class, practical, and industry-recognized training and certification services.',
      mission: 'Mission',
      missionItems: [
        'Provide relevant and applicable NDT curriculum',
        'Support participants until certification-ready',
        'Maintain instructor and material quality to standards',
        'Flexibly support corporate training needs',
      ],
    },

    // Contact
    contact: {
      title: 'Contact',
      subtitle: 'Have questions? Please fill out the form below.',
      name: 'Name',
      email: 'Email',
      phone: 'Phone Number',
      message: 'Message',
      send: 'Send Message',
      success: 'Message sent. We will contact you shortly.',
      failed: 'Failed to send message',
    },

    // Courses
    courses: {
      title: 'NDT Courses',
      subtitle: 'Choose a course that suits your needs',
      searchPlaceholder: 'Search courses...',
      allCategories: 'All Categories',
      noCourses: 'No courses found',
      prev: 'Previous',
      next: 'Next',
    },

    // Course Detail
    courseDetail: {
      prerequisites: 'Prerequisites',
      prerequisitesList: [
        'Open to all (minimum high school or equivalent)',
        'Basic understanding of HSE (Health, Safety & Environment)',
        'Able to attend theory and practical classes',
      ],
      registerWhatsapp: 'Register via WhatsApp',
      included: 'Included in this course',
      includedItems: ['Complete theory materials', 'Hands-on practice', 'Completion certificate', 'Post-training support'],
      notFound: 'Course not found',
    },

    // Schedule
    schedule: {
      title: 'Training & Certification Schedule',
      subtitle: 'Find a suitable schedule and register directly.',
      keyword: 'Keyword',
      method: 'Method',
      from: 'From',
      to: 'To',
      noEvents: 'No schedules available',
      noEventsDesc: 'Training schedules will be announced soon. Contact us for more information.',
      contactAdmin: 'Contact Admin',
      location: 'Location',
      registerNow: 'Register Now',
      viewDetail: 'View details →',
    },

    // Schedule Detail
    scheduleDetail: {
      backToSchedule: '← Back to Schedule',
      viewAllSchedule: '← View All Schedules',
      period: 'Period',
      location: 'Location',
      method: 'Method',
      level: 'Level',
      quota: 'Quota',
      price: 'Fee',
      date: 'Date',
      time: 'Time',
      addToCalendar: 'Add to your calendar',
      registerWhatsapp: 'Register via WhatsApp',
      registerNow: 'Register Now',
      notFound: 'Schedule not found',
      notFoundDesc: 'The schedule you are looking for may no longer be available or has not been scheduled yet.',
    },

    // Recertification
    recert: {
      title: 'NDT Recertification',
      desc: 'Maintain your professional qualifications. NDT certificates are valid for 5 years and require renewal to ensure competence meets current industry standards.',
      validityTitle: '5-Year Validity',
      validityDesc: 'Per ASNT SNT TC 1A and EN 4179/NAS 410 standards, NDT personnel certification is valid for 5 years from the date of issuance.',
      requirementsTitle: 'Recertification Requirements',
      requirementsDesc: 'Candidates must demonstrate proof of continued work experience in the relevant method or pass a recertification exam.',
      freeConsultTitle: 'Free Consultation',
      freeConsultDesc: 'Our team is ready to help you check your certificate status and guide the renewal process to prevent expiration.',
      ctaTitle: "Don't Let Your Certificate Expire",
      ctaDesc: 'An expired certificate may require you to retake the training from scratch. Renew your certification before it\'s too late.',
      consultWhatsapp: 'Contact Admin for Recertification',
    },

    // Alumni
    alumni: {
      title: 'SNS Certification Alumni',
      subtitle: 'Participants who have passed NDT certification.',
    },

    // Privacy & Terms
    privacy: {
      title: 'Privacy Policy',
      subtitle: 'We value your privacy. This document explains how we manage personal data.',
      items: [
        'The data we collect is limited to registration and platform usage data.',
        'Data is used for course operations, payments, and customer support.',
        'You may request data deletion through our contact page.',
      ],
    },
    terms: {
      title: 'Terms & Conditions',
      subtitle: 'By using this platform, you agree to the following terms and conditions.',
      items: [
        'Course materials are for learning purposes only and may not be distributed without permission.',
        'Processed payments follow the respective payment method policies.',
        'We reserve the right to make changes to course content or schedules.',
      ],
    },

    // 404
    notFound: {
      title: 'Page Not Found',
      desc: 'The page you are looking for may have been moved or is unavailable.',
      backHome: 'Back to Home',
      browseCourses: 'Browse Courses',
    },

    // Login
    login: {
      welcome: 'Welcome Back',
      subtitle: 'Sign in to continue your NDT learning journey',
      email: 'Email',
      password: 'Password',
      emailPlaceholder: 'Enter your email',
      passwordPlaceholder: 'Enter your password',
      signIn: 'Sign In',
      signingIn: 'Signing in...',
      noAccount: "Don't have an account?",
      registerHere: 'Register here',
      orContinue: 'or continue with',
    },

    // Register
    register: {
      title: 'Create New Account',
      subtitle: 'Join for access to professional NDT training',
      name: 'Full Name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      namePlaceholder: 'Enter your full name',
      emailPlaceholder: 'Enter your email',
      passwordPlaceholder: 'Minimum 6 characters',
      confirmPlaceholder: 'Repeat your password',
      passwordMismatch: 'Passwords do not match',
      createAccount: 'Create Account',
      creating: 'Creating account...',
      hasAccount: 'Already have an account?',
      loginHere: 'Sign in here',
      orContinue: 'or continue with',
    },

    // Footer
    footer: {
      company: 'Company',
      aboutUs: 'About Us',
      certSchedule: 'Certification Schedule',
      contactUs: 'Contact Us',
      coursesLabel: 'Courses',
      allCourses: 'All Courses',
      alumniLabel: 'Alumni',
      legal: 'Legal',
      privacyPolicy: 'Privacy Policy',
      termsConditions: 'Terms & Conditions',
      tagline: 'Indonesia\'s leading Non-Destructive Testing training and certification center.',
      designedBy: 'Designed by SNS Team',
    },

    // My Courses
    myCourses: {
      title: 'My Courses',
      subtitle: 'Courses you have purchased',
      noCourses: 'You don\'t have any courses yet',
      noCoursesDesc: 'Explore our courses and start learning',
      browseCourses: 'Browse Courses',
      accessCourse: 'Access Course',
      purchased: 'Purchased',
    },
  },
};

export function useTranslations() {
  const { language } = useContext(LanguageContext);
  return translations[language] || translations.id;
}
