import { RefreshCw, Clock, FileCheck, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function MinimalRecertification() {
  const handleWhatsApp = () => {
    const phoneNumber = "628129258446";
    const message = "Halo Admin, saya ingin menanyakan tentang proses resertifikasi sertifikat NDT saya.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-white">
      <section className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex items-start gap-6">
            <div className="p-3 bg-orange-50 rounded-xl">
              <RefreshCw className="h-8 w-8 text-orange-600" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Resertifikasi NDT</h1>
              <p className="mt-2 text-gray-600 max-w-2xl">
                Pertahankan kualifikasi profesional Anda. Sertifikat NDT berlaku selama 5 tahun dan memerlukan pembaruan untuk memastikan kompetensi sesuai standar industri terkini.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="rounded-xl border border-gray-200 p-6 bg-gray-50">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-6 w-6 text-orange-600" />
                <h3 className="font-semibold text-gray-900">Masa Berlaku 5 Tahun</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Sesuai standar ASNT SNT TC 1A dan EN 4179/NAS 410, sertifikasi personel NDT memiliki masa berlaku 5 tahun sejak tanggal diterbitkan.
              </p>
            </div>
            
            <div className="rounded-xl border border-gray-200 p-6 bg-gray-50">
              <div className="flex items-center gap-3 mb-4">
                <FileCheck className="h-6 w-6 text-orange-600" />
                <h3 className="font-semibold text-gray-900">Syarat Resertifikasi</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Peserta wajib menunjukkan bukti pengalaman kerja berkelanjutan di metode terkait atau mengikuti ujian penyegaran (recertification exam).
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-6 bg-gray-50">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="h-6 w-6 text-orange-600" />
                <h3 className="font-semibold text-gray-900">Konsultasi Gratis</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Tim kami siap membantu Anda mengecek status sertifikat dan membimbing proses perpanjangan agar tidak terjadi kadaluarsa.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900 p-8 md:p-12 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Jangan Biarkan Sertifikat Anda Kadaluarsa</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Sertifikat yang sudah melewati masa berlaku mungkin mengharuskan Anda untuk mengulang pelatihan dari awal. Segera urus resertifikasi Anda sebelum terlambat.
            </p>
            <Button 
              onClick={handleWhatsApp}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 h-auto text-base"
            >
              Hubungi Admin untuk Resertifikasi
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
