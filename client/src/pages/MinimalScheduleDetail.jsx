import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '@/utils/api';
import { IMG_EVENT } from '@/config/images';

const fetchEvent = async (id) => {
  const { data } = await api.get(`/public/events/${id}`);
  return data;
};

function formatDate(date) {
  if (!date) return '-';
  const d = new Date(date);
  return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
}

function toICSDate(date) {
  if (!date) return '';
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}${m}${day}`;
}

export default function MinimalScheduleDetail() {
  const { id } = useParams();
  const { data: ev, isLoading, error } = useQuery({ 
    queryKey: ['event', id], 
    queryFn: () => fetchEvent(id),
    retry: false 
  });

  const addToGoogle = () => {
    if (!ev) return;
    const text = encodeURIComponent(ev.title);
    const dates = `${toICSDate(ev.startDate)}/${toICSDate(ev.endDate || ev.startDate)}`;
    const details = encodeURIComponent(`Metode: ${ev.method}\nLokasi: ${ev.location}\nWaktu: ${ev.time || ''}`);
    const location = encodeURIComponent(ev.location || 'Online');
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`;
    window.open(url, '_blank');
  };

  const downloadICS = () => {
    if (!ev) return;
    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//SNS NDT//Schedule//ID',
      'BEGIN:VEVENT',
      `UID:${ev.id}@sns-ndt`,
      `DTSTAMP:${toICSDate(new Date().toISOString())}T000000Z`,
      `DTSTART;VALUE=DATE:${toICSDate(ev.startDate)}`,
      `DTEND;VALUE=DATE:${toICSDate(ev.endDate || ev.startDate)}`,
      `SUMMARY:${ev.title}`,
      `DESCRIPTION:Metode: ${ev.method}\\nLokasi: ${ev.location}\\nWaktu: ${ev.time || ''}`,
      `LOCATION:${ev.location || ''}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ];
    const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `sns-${ev.id}.ics`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  if (isLoading) return (<div className="min-h-[50vh] flex items-center justify-center"><div className="h-8 w-8 rounded-full border-2 border-gray-900 border-t-transparent animate-spin" /></div>);
  
  if (error || !ev) return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-gray-600 gap-4">
      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <p className="text-lg">Jadwal tidak ditemukan</p>
      <p className="text-sm text-gray-500">Jadwal yang Anda cari mungkin sudah tidak tersedia atau belum dijadwalkan.</p>
      <Link to="/schedule" className="mt-2 inline-flex items-center gap-2 rounded-md bg-gray-900 text-white px-5 py-2 text-sm hover:bg-black">
        ← Lihat Semua Jadwal
      </Link>
    </div>
  );

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <img src={ev.image || IMG_EVENT} alt={ev.title} className="w-full rounded-lg border border-gray-200" />
            <h1 className="mt-6 text-2xl font-semibold text-gray-900">{ev.title}</h1>
            <div className="mt-2 text-gray-700">Metode: {ev.method}</div>
            <div className="mt-1 text-gray-700">Tanggal: {formatDate(ev.startDate)} — {formatDate(ev.endDate || ev.startDate)}</div>
            <div className="mt-1 text-gray-700">Waktu: {ev.time || '-'}</div>
            <div className="mt-1 text-gray-700">Lokasi: {ev.location || '-'}</div>
          </div>
          <aside>
            <div className="rounded-lg border border-gray-200 p-5">
              <div className="text-sm text-gray-600">Tambahkan ke kalender Anda</div>
              <div className="mt-3 grid grid-cols-1 gap-2">
                <button onClick={addToGoogle} className="rounded-md bg-gray-900 text-white px-4 py-2 text-sm hover:bg-black">Google Calendar</button>
                <button onClick={downloadICS} className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">Download .ics</button>
                <button onClick={() => window.open(`https://wa.me/628129258446?text=${encodeURIComponent(`Halo Admin, saya tertarik mendaftar training: ${ev.title}.`)}`, '_blank')} className="rounded-md bg-gray-900 text-white px-4 py-2 text-sm hover:bg-black text-center">Daftar Sekarang</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
