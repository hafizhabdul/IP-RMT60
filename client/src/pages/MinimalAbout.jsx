import { useState } from 'react';
import { Award, Building2, Target, X, ZoomIn } from 'lucide-react';

export default function MinimalAbout() {
  const [selectedImage, setSelectedImage] = useState(null);

  const certifications = [
    { id: 1, name: 'ASNT SNT TC 1A dan EN 4179/NAS 410', issuer: 'International Standard', image: '/ASNT.jpeg' },
  ];

  const methods = ['PT', 'MT', 'UT', 'ET', 'PAUT', 'TOFD', 'RI', 'VT', 'RT', 'RFET', 'PEC', 'MFL', 'IRT', 'Etc.'];

  return (
    <div className="bg-white">
      <section className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex items-start gap-6">
            <img src="/logo.png" alt="SNS - SAR NDT Services" className="h-12 w-auto" />
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Tentang SNS — SAR NDT Services</h1>
              <p className="mt-2 text-gray-600 max-w-2xl">
                SNS menyediakan pelatihan dan sertifikasi Non-Destructive Testing (NDT) yang elegan, sederhana, dan sesuai standar internasional.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {methods.map((m) => (
                  <span key={m} className="inline-flex items-center rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-700">{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 text-gray-900 font-medium"><Target className="h-5 w-5" /> Visi</div>
            <p className="mt-3 text-gray-700">
              Menjadi mitra terpercaya dalam pengembangan kompetensi NDT dengan layanan pelatihan dan sertifikasi yang berkelas, praktis, dan diakui industri.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 text-gray-900 font-medium"><Building2 className="h-5 w-5" /> Misi</div>
            <ul className="mt-3 space-y-2 text-gray-700 text-sm">
              {[
                'Menyediakan kurikulum NDT yang relevan dan aplikatif',
                'Mendampingi peserta hingga siap sertifikasi',
                'Menjaga kualitas instruktur dan materi sesuai standar',
                'Mendukung kebutuhan pelatihan korporasi secara fleksibel',
              ].map((m) => (
                <li key={m} className="list-disc ml-5">{m}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-xl border border-gray-200 p-6">
            <div className="text-gray-900 font-medium">Sejarah Perusahaan</div>
            <p className="mt-3 text-gray-700 text-sm leading-relaxed">
              Berawal dari inisiatif para praktisi NDT bersertifikat, SNS dibentuk untuk menghadirkan
              pelatihan yang ringkas, fokus pada praktik lapangan, dan efektif dalam mempersiapkan peserta
              menghadapi sertifikasi industri.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 p-6">
            <div className="text-gray-900 font-medium">Nilai Utama</div>
            <ul className="mt-3 space-y-2 text-gray-700 text-sm">
              {['Integritas & Keselamatan', 'Pembelajaran Praktis', 'Standar Industri', 'Pelayanan Responsif'].map((v) => (
                <li key={v} className="list-disc ml-5">{v}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 border-y border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Sertifikasi Perusahaan</h2>
              <p className="text-gray-600 text-sm">Pengakuan dan kepatuhan terhadap standar industri</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((c) => (
              <div key={c.id} className="rounded-lg border border-gray-200 overflow-hidden bg-white group">
                <div 
                  className="aspect-[16/9] bg-gray-100 flex items-center justify-center relative cursor-pointer"
                  onClick={() => c.image && setSelectedImage(c)}
                >
                  {c.image ? (
                    <>
                      <img src={c.image} alt={c.name} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                        <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                      </div>
                    </>
                  ) : (
                    <Award className="h-8 w-8 text-gray-400" />
                  )}
                </div>
                <div className="p-4">
                  <div className="text-sm text-gray-900 font-medium">{c.name}</div>
                  <div className="text-xs text-gray-600 mt-0.5">{c.issuer}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-gray-500">Untuk menampilkan gambar sertifikat, unggah berkas ke folder public dan sesuaikan datanya.</p>
        </div>
      </section>

      {/* Image Modal/Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            
            {/* Image container */}
            <div className="flex items-center justify-center bg-gray-100 p-4">
              <img 
                src={selectedImage.image} 
                alt={selectedImage.name}
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg"
              />
            </div>
            
            {/* Certificate info */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <h3 className="text-lg font-semibold text-gray-900">{selectedImage.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{selectedImage.issuer}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
