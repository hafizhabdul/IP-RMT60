import { useState } from 'react';
import api from '@/utils/api';
import { showToast } from '@/utils/toast';

export default function MinimalContact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/public/contact', form);
      showToast.success('Pesan terkirim. Kami akan menghubungi Anda.');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (e) {
      showToast.error(e.response?.data?.message || 'Gagal mengirim pesan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-semibold text-gray-900">Kontak</h1>
        <p className="text-gray-600 mt-1">Ada pertanyaan? Silakan isi formulir di bawah.</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <form onSubmit={onSubmit} className="rounded-lg border border-gray-200 p-6 space-y-4">
            <div>
              <label className="block text-sm text-gray-700">Nama</label>
              <input className="mt-1 w-full h-10 rounded-md border border-gray-300 px-3 text-sm" required value={form.name} onChange={(e)=>setForm(f=>({...f,name:e.target.value}))} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700">Email</label>
                <input type="email" className="mt-1 w-full h-10 rounded-md border border-gray-300 px-3 text-sm" required value={form.email} onChange={(e)=>setForm(f=>({...f,email:e.target.value}))} />
              </div>
              <div>
                <label className="block text-sm text-gray-700">No. Telepon</label>
                <input className="mt-1 w-full h-10 rounded-md border border-gray-300 px-3 text-sm" value={form.phone} onChange={(e)=>setForm(f=>({...f,phone:e.target.value}))} />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-700">Pesan</label>
              <textarea className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm" rows={5} required value={form.message} onChange={(e)=>setForm(f=>({...f,message:e.target.value}))} />
            </div>
            <button disabled={loading} className="w-full md:w-auto rounded-md bg-gray-900 text-white px-5 py-2 text-sm hover:bg-black disabled:opacity-50">
              {loading ? 'Mengirim...' : 'Kirim Pesan'}
            </button>
          </form>

          <div className="rounded-lg border border-gray-200 p-6">
            <h2 className="text-base font-semibold text-gray-900">Informasi Perusahaan</h2>
            <div className="mt-4 space-y-2 text-sm text-gray-700">
              <div>Email: info@sns-ndt.com</div>
              <div>Telepon: +62 812-3456-7890</div>
              <div>Alamat: Jakarta, Indonesia</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

