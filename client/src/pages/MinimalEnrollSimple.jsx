import { useState } from 'react';
import api from '@/utils/api';
import { showToast } from '@/utils/toast';

const METHODS = ['PT', 'MT', 'UT', 'ET', 'PAUT', 'RT'];

export default function MinimalEnrollSimple() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', method: 'PT', note: '' });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simpan ke database dan kirim email
      const response = await api.post('/public/enrollments', form);

      // Cek status email
      if (response.data.emailStatus) {
        const { adminEmail, userEmail } = response.data.emailStatus;

        if (adminEmail === 'success' && userEmail === 'success') {
          showToast.success('Pendaftaran berhasil! Email konfirmasi telah dikirim ke Anda.');
        } else {
          showToast.success('Pendaftaran berhasil! Kami akan menghubungi Anda segera.');
        }
      } else {
        showToast.success('Pendaftaran berhasil! Kami akan menghubungi Anda segera.');
      }

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
          <p className="text-gray-600 mt-1">Silakan isi data berikut. Email konfirmasi akan dikirim ke Anda.</p>
          <div className="mt-4 inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span>Email konfirmasi otomatis akan dikirim</span>
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-8 rounded-lg border border-gray-200 p-6 space-y-4 max-w-2xl">
          <div>
            <label className="block text-sm text-gray-700">Nama Lengkap *</label>
            <input
              className="mt-1 w-full h-10 rounded-md border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              value={form.name}
              onChange={(e)=>setForm(f=>({...f,name:e.target.value}))}
              placeholder="Masukkan nama lengkap Anda"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700">Email *</label>
              <input
                type="email"
                className="mt-1 w-full h-10 rounded-md border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                value={form.email}
                onChange={(e)=>setForm(f=>({...f,email:e.target.value}))}
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">No. Telepon/WhatsApp *</label>
              <input
                className="mt-1 w-full h-10 rounded-md border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                value={form.phone}
                onChange={(e)=>setForm(f=>({...f,phone:e.target.value}))}
                placeholder="0812-3456-7890"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700">Metode NDT *</label>
              <select
                className="mt-1 w-full h-10 rounded-md border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={form.method}
                onChange={(e)=>setForm(f=>({...f,method:e.target.value}))}
              >
                {METHODS.map((m)=>(<option key={m} value={m}>{m}</option>))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700">Catatan (opsional)</label>
            <textarea
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              value={form.note}
              onChange={(e)=>setForm(f=>({...f,note:e.target.value}))}
              placeholder="Pertanyaan atau permintaan khusus..."
            />
          </div>

          <div className="flex flex-col gap-3">
            <button
              disabled={loading}
              className="w-full rounded-md bg-blue-600 text-white px-5 py-3 text-sm hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2 transition-colors"
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
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Kirim Pendaftaran
                </>
              )}
            </button>

            <p className="text-xs text-gray-500 text-center">
              Form akan tersimpan dan email konfirmasi akan dikirim ke {form.email || 'email Anda'}
            </p>
          </div>
        </form>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>Butuh bantuan? Hubungi kami di WhatsApp: +62 812-9695-35570</span>
          </div>
        </div>
      </div>
    </div>
  );
}