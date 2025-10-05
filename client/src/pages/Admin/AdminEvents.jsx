import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/utils/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const METHODS = ['PT','MT','UT','ET','PAUT','RT'];

const fetchEvents = async () => {
  const { data } = await api.get('/admin/events');
  return data;
};

const createEvent = async (body) => {
  const { data } = await api.post('/admin/events', body);
  return data;
};

const deleteEvent = async (id) => {
  const { data } = await api.delete(`/admin/events/${id}`);
  return data;
};

export default function AdminEvents() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['admin-events'], queryFn: fetchEvents });
  const [form, setForm] = useState({ title: '', method: 'PT', startDate: '', endDate: '', time: '', location: '', image: '' });

  const addMutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-events'] }); setForm({ title: '', method: 'PT', startDate: '', endDate: '', time: '', location: '', image: '' }); }
  });

  const delMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-events'] })
  });

  const onSubmit = (e) => {
    e.preventDefault();
    addMutation.mutate({ ...form, endDate: form.endDate || form.startDate });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Manage Events</h1>
        <p className="text-muted-foreground">Tambah, hapus, dan kelola jadwal training/sertifikasi.</p>
      </div>

      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
        <div className="md:col-span-2">
          <label className="text-sm">Judul</label>
          <Input value={form.title} onChange={(e)=>setForm(f=>({...f,title:e.target.value}))} required />
        </div>
        <div>
          <label className="text-sm">Metode</label>
          <select className="w-full h-10 border rounded-md px-3 text-sm" value={form.method} onChange={(e)=>setForm(f=>({...f,method:e.target.value}))}>
            {METHODS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm">Mulai</label>
          <Input type="date" value={form.startDate} onChange={(e)=>setForm(f=>({...f,startDate:e.target.value}))} required />
        </div>
        <div>
          <label className="text-sm">Selesai</label>
          <Input type="date" value={form.endDate} onChange={(e)=>setForm(f=>({...f,endDate:e.target.value}))} />
        </div>
        <div>
          <label className="text-sm">Waktu</label>
          <Input placeholder="08:00-16:00 WIB" value={form.time} onChange={(e)=>setForm(f=>({...f,time:e.target.value}))} />
        </div>
        <div>
          <label className="text-sm">Lokasi</label>
          <Input value={form.location} onChange={(e)=>setForm(f=>({...f,location:e.target.value}))} />
        </div>
        <div className="md:col-span-3">
          <label className="text-sm">Gambar (URL opsional)</label>
          <Input value={form.image} onChange={(e)=>setForm(f=>({...f,image:e.target.value}))} />
        </div>
        <div className="md:col-span-3">
          <Button type="submit" disabled={addMutation.isLoading}>{addMutation.isLoading ? 'Menyimpan...' : 'Tambah Event'}</Button>
        </div>
      </form>

      {isLoading ? (
        <div className="p-8 text-center">Memuat...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(data || []).map(ev => (
            <div key={ev.id} className="border rounded-lg overflow-hidden">
              <div className="aspect-[16/9] bg-muted">
                {ev.image ? <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" /> : null}
              </div>
              <div className="p-4 space-y-1">
                <div className="text-xs text-muted-foreground">{ev.method} • {ev.location}</div>
                <div className="font-medium">{ev.title}</div>
                <div className="text-sm text-muted-foreground">{ev.startDate} — {ev.endDate}</div>
                <div className="pt-2">
                  <Button variant="destructive" size="sm" onClick={()=>delMutation.mutate(ev.id)} disabled={delMutation.isLoading}>Hapus</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

