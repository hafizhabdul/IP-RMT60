import { useState } from 'react';
import api from '@/utils/api';
import { showToast } from '@/utils/toast';

const METHODS = ['PT', 'MT', 'UT', 'ET', 'PAUT', 'RT'];

export default function MinimalEnroll() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', method: 'PT', note: '' });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/public/enrollments', form);
      showToast.success('Pendaftaran berhasil dikirim. Kami akan menghubungi Anda.');
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
        <h1 className="text-2xl font-semibold text-gray-900">Formulir Pendaftaran Sertifikasi NDT</h1>
        <p className="text-gray-600 mt-1">Silakan isi data berikut. Tidak perlu akun untuk mendaftar.</p>

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
          <button disabled={loading} className="rounded-md bg-gray-900 text-white px-5 py-2 text-sm hover:bg-black disabled:opacity-50">
            {loading ? 'Mengirim...' : 'Kirim Pendaftaran'}
          </button>
        </form>
      </div>
    </div>
  );
}

