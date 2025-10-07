import { useState } from 'react';
import api from '@/utils/api';
import { showToast } from '@/utils/toast';
import { sendEnrollmentToWhatsApp } from '@/utils/whatsapp';

const METHODS = ['PT', 'MT', 'UT', 'ET', 'PAUT', 'RT'];

export default function MinimalEnroll() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', method: 'PT', note: '' });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simpan ke database
      await api.post('/public/enrollments', form);

      // Kirim ke WhatsApp
      sendEnrollmentToWhatsApp(form);

      showToast.success('Pendaftaran berhasil dikirim! WhatsApp akan terbuka untuk konfirmasi.');
      setForm({ name: '', email: '', phone: '', method: 'PT', note: '' });
    } catch (e) {
      showToast.error(e.response?.data?.message || 'Gagal mengirim pendaftaran');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Formulir Pendaftaran Sertifikasi NDT</h1>
          <p className="text-gray-600 mt-1">Silakan isi data berikut. Data akan dikirim ke WhatsApp kami untuk follow-up cepat.</p>
          <div className="mt-4 inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.18-.31.08-1.26.33-.33-1.22.09-.32-.2-.29a8.188 8.188 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24M8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.12.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.27-.25-.14-1.47-.74-1.69-.82-.23-.08-.37-.12-.56.12-.16.25-.64.81-.78.97-.15.17-.29.19-.53.07-.26-.13-1.06-.39-2-1.23-.74-.65-1.23-1.44-1.38-1.7-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.41-.06-.11-.27-.65-.76-1.13-.49-.47-.8-.42-.94-.41H8.57z"/>
            </svg>
            <span>Pesan otomatis akan dikirim ke WhatsApp kami</span>
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-8 rounded-lg border border-gray-200 p-6 space-y-4 max-w-2xl">
          <div>
            <label className="block text-sm text-gray-700">Nama Lengkap</label>
            <input className="mt-1 w-full h-10 rounded-md border border-gray-300 px-3 text-sm" required value={form.name} onChange={(e)=>setForm(f=>({...f,name:e.target.value}))} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700">Email</label>
              <input type="email" className="mt-1 w-full h-10 rounded-md border border-gray-300 px-3 text-sm" required value={form.email} onChange={(e)=>setForm(f=>({...f,email:e.target.value}))} />
            </div>
            <div>
              <label className="block text-sm text-gray-700">No. Telepon</label>
              <input className="mt-1 w-full h-10 rounded-md border border-gray-300 px-3 text-sm" required value={form.phone} onChange={(e)=>setForm(f=>({...f,phone:e.target.value}))} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700">Metode NDT</label>
              <select className="mt-1 w-full h-10 rounded-md border border-gray-300 px-3 text-sm" value={form.method} onChange={(e)=>setForm(f=>({...f,method:e.target.value}))}>
                {METHODS.map((m)=>(<option key={m} value={m}>{m}</option>))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-700">Catatan (opsional)</label>
            <textarea className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm" rows={4} value={form.note} onChange={(e)=>setForm(f=>({...f,note:e.target.value}))} />
          </div>
          <div className="flex flex-col gap-3">
            <button
              disabled={loading}
              className="w-full rounded-md bg-green-600 text-white px-5 py-3 text-sm hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Mengirim...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.18-.31.08-1.26.33-.33-1.22.09-.32-.2-.29a8.188 8.188 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24z"/>
                  </svg>
                  Kirim via WhatsApp
                </>
              )}
            </button>

            <p className="text-xs text-gray-500 text-center">
              Form akan tersimpan di sistem dan WhatsApp akan terbuka otomatis
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

