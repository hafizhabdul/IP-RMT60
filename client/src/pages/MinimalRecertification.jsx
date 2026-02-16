import { RefreshCw, Clock, FileCheck, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useTranslations } from '@/utils/translations';

export default function MinimalRecertification() {
  const t = useTranslations();
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
              <h1 className="text-3xl font-semibold tracking-tight text-gray-900">{t.recert.title}</h1>
              <p className="mt-2 text-gray-600 max-w-2xl">
                {t.recert.desc}
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
                <h3 className="font-semibold text-gray-900">{t.recert.validityTitle}</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t.recert.validityDesc}
              </p>
            </div>
            
            <div className="rounded-xl border border-gray-200 p-6 bg-gray-50">
              <div className="flex items-center gap-3 mb-4">
                <FileCheck className="h-6 w-6 text-orange-600" />
                <h3 className="font-semibold text-gray-900">{t.recert.requirementsTitle}</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t.recert.requirementsDesc}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-6 bg-gray-50">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="h-6 w-6 text-orange-600" />
                <h3 className="font-semibold text-gray-900">{t.recert.freeConsultTitle}</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t.recert.freeConsultDesc}
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900 p-8 md:p-12 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">{t.recert.ctaTitle}</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              {t.recert.ctaDesc}
            </p>
            <Button 
              onClick={handleWhatsApp}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 h-auto text-base"
            >
              {t.recert.consultWhatsapp}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
