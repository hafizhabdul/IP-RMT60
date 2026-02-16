import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import api from '@/utils/api';
import { IMG_EVENT } from '@/config/images';
import { useTranslations } from '@/utils/translations';

const METHODS = ['PT','MT','UT','ET','PAUT','RT'];

const fetchEvents = async (filters) => {
  const { data } = await api.get('/public/events', { params: filters });
  return data;
};

function formatDate(date) {
  if (!date) return '-';
  const d = new Date(date);
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function MinimalSchedule() {
  const t = useTranslations();
  const [filters, setFilters] = useState({ search: '', method: '', from: '', to: '' });
  const { data, isLoading } = useQuery({ queryKey: ['events', filters], queryFn: () => fetchEvents(filters) });

  const events = data || [];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{t.schedule.title}</h1>
            <p className="text-gray-600 mt-1">{t.schedule.subtitle}</p>
          </div>
          <button onClick={() => window.open('https://wa.me/628129258446?text=Halo%20Admin,%20saya%20ingin%20mendaftar%20training.', '_blank')} className="rounded-md bg-gray-900 text-white px-5 py-2 text-sm hover:bg-black">{t.schedule.registerNow}</button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-700">{t.schedule.keyword}</label>
            <input value={filters.search} onChange={(e)=>setFilters(f=>({...f,search:e.target.value}))} className="mt-1 w-full h-10 rounded-md border border-gray-300 px-3 text-sm" placeholder={t.schedule.keyword} />
          </div>
          <div>
            <label className="block text-sm text-gray-700">{t.schedule.method}</label>
            <select value={filters.method} onChange={(e)=>setFilters(f=>({...f,method:e.target.value}))} className="mt-1 w-full h-10 rounded-md border border-gray-300 px-3 text-sm">
              <option value="">{t.all}</option>
              {METHODS.map((m)=>(<option key={m} value={m}>{m}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700">{t.schedule.from}</label>
            <input type="date" value={filters.from} onChange={(e)=>setFilters(f=>({...f,from:e.target.value}))} className="mt-1 w-full h-10 rounded-md border border-gray-300 px-3 text-sm" />
          </div>
          <div>
            <label className="block text-sm text-gray-700">{t.schedule.to}</label>
            <input type="date" value={filters.to} onChange={(e)=>setFilters(f=>({...f,to:e.target.value}))} className="mt-1 w-full h-10 rounded-md border border-gray-300 px-3 text-sm" />
          </div>
        </div>

        {isLoading ? (
          <div className="min-h-[30vh] flex items-center justify-center mt-8"><div className="h-8 w-8 rounded-full border-2 border-gray-900 border-t-transparent animate-spin" /></div>
        ) : events.length === 0 ? (
          <div className="min-h-[30vh] flex flex-col items-center justify-center mt-8 text-gray-600 gap-4">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-lg">{t.schedule.noEvents}</p>
            <p className="text-sm text-gray-500">{t.schedule.noEventsDesc}</p>
            <button 
              onClick={() => window.open('https://wa.me/628129258446?text=Halo%20Admin,%20saya%20ingin%20menanyakan%20jadwal%20training.', '_blank')} 
              className="mt-2 inline-flex items-center gap-2 rounded-md bg-gray-900 text-white px-5 py-2 text-sm hover:bg-black"
            >
              {t.schedule.contactAdmin}
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((ev) => (
              <Link key={ev.id} to={`/schedule/${ev.id}`} className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 group">
                <div className="h-1 bg-gradient-to-r from-orange-600 to-amber-500" />
                <div className="aspect-[16/9] bg-gray-100">
                  <img src={ev.image || IMG_EVENT} alt={ev.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <div className="text-xs text-gray-600">{ev.method} • {ev.location || 'TBA'}</div>
                  <div className="mt-1 text-base font-medium text-gray-900">{ev.title}</div>
                  <div className="mt-2 text-sm text-gray-700">{formatDate(ev.startDate)} — {formatDate(ev.endDate)} • {ev.time || '-'}</div>
                  <div className="mt-3 text-gray-900 text-sm group-hover:text-orange-600 transition-colors">{t.schedule.viewDetail}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
