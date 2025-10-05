import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/utils/api';
import { IMG_EVENT } from '@/config/images';

const METHODS = ['PT','MT','UT','ET','PAUT','RT'];

const fetchEvents = async (filters) => {
  const { data } = await api.get('/public/events', { params: filters });
  return data;
};

export default function MinimalSchedule() {
  const [filters, setFilters] = useState({ search: '', method: '', from: '', to: '' });
  const { data, isLoading } = useQuery({ queryKey: ['events', filters], queryFn: () => fetchEvents(filters) });

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Jadwal Training & Sertifikasi</h1>
            <p className="text-gray-600 mt-1">Cari jadwal yang sesuai dan daftar langsung.</p>
          </div>
          <a href="/enroll" className="rounded-md bg-gray-900 text-white px-5 py-2 text-sm hover:bg-black">Daftar Sekarang</a>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-700">Kata kunci</label>
            <input value={filters.search} onChange={(e)=>setFilters(f=>({...f,search:e.target.value}))} className="mt-1 w-full h-10 rounded-md border border-gray-300 px-3 text-sm" placeholder="Metode, lokasi..." />
          </div>
          <div>
            <label className="block text-sm text-gray-700">Metode</label>
            <select value={filters.method} onChange={(e)=>setFilters(f=>({...f,method:e.target.value}))} className="mt-1 w-full h-10 rounded-md border border-gray-300 px-3 text-sm">
              <option value="">Semua</option>
              {METHODS.map((m)=>(<option key={m} value={m}>{m}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700">Dari</label>
            <input type="date" value={filters.from} onChange={(e)=>setFilters(f=>({...f,from:e.target.value}))} className="mt-1 w-full h-10 rounded-md border border-gray-300 px-3 text-sm" />
          </div>
          <div>
            <label className="block text-sm text-gray-700">Sampai</label>
            <input type="date" value={filters.to} onChange={(e)=>setFilters(f=>({...f,to:e.target.value}))} className="mt-1 w-full h-10 rounded-md border border-gray-300 px-3 text-sm" />
          </div>
        </div>

        {isLoading ? (
          <div className="min-h-[30vh] flex items-center justify-center mt-8"><div className="h-8 w-8 rounded-full border-2 border-gray-900 border-t-transparent animate-spin" /></div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(data || []).map((ev) => (
              <a key={ev.id} href={`/schedule/${ev.id}`} className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 group">
                <div className="h-1 bg-gradient-to-r from-orange-600 to-amber-500" />
                <div className="aspect-[16/9] bg-gray-100">
                  <img src={ev.image || IMG_EVENT} alt={ev.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <div className="text-xs text-gray-600">{ev.method} • {ev.location}</div>
                  <div className="mt-1 text-base font-medium text-gray-900">{ev.title}</div>
                  <div className="mt-2 text-sm text-gray-700">{ev.startDate} — {ev.endDate} • {ev.time}</div>
                  <div className="mt-3 text-gray-900 text-sm">Lihat detail →</div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
