import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2, Edit2, Plus, GraduationCap } from 'lucide-react';
import api from '@/utils/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const fetchAlumni = async () => {
  const { data } = await api.get('/admin/alumni');
  return data;
};

export default function AdminAlumni() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['admin-alumni'], queryFn: fetchAlumni });
  const [form, setForm] = useState({ name: '', method: '', year: new Date().getFullYear(), company: '' });
  const [editId, setEditId] = useState(null);

  const saveMutation = useMutation({
    mutationFn: (body) =>
      editId
        ? api.put(`/admin/alumni/${editId}`, body).then((r) => r.data)
        : api.post('/admin/alumni', body).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-alumni'] });
      setForm({ name: '', method: '', year: new Date().getFullYear(), company: '' });
      setEditId(null);
    },
  });

  const delMutation = useMutation({
    mutationFn: (id) => api.delete(`/admin/alumni/${id}`).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-alumni'] }),
  });

  const onEdit = (item) => {
    setEditId(item.id);
    setForm({ name: item.name, method: item.method || '', year: item.year || '', company: item.company || '' });
  };

  const onCancel = () => {
    setEditId(null);
    setForm({ name: '', method: '', year: new Date().getFullYear(), company: '' });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    saveMutation.mutate({ ...form, year: form.year ? parseInt(form.year) : null });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <GraduationCap className="h-6 w-6" /> Manage Alumni
        </h1>
        <p className="text-muted-foreground">Tambah, edit, dan hapus data alumni.</p>
      </div>

      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
        <div>
          <label className="text-sm font-medium">Nama *</label>
          <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required placeholder="Nama alumni" />
        </div>
        <div>
          <label className="text-sm font-medium">Metode Sertifikasi</label>
          <Input value={form.method} onChange={(e) => setForm((f) => ({ ...f, method: e.target.value }))} placeholder="UT, MT, PT, dll" />
        </div>
        <div>
          <label className="text-sm font-medium">Tahun</label>
          <Input type="number" value={form.year} onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))} placeholder="2024" />
        </div>
        <div>
          <label className="text-sm font-medium">Perusahaan</label>
          <Input value={form.company} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))} placeholder="PT ..." />
        </div>
        <div className="md:col-span-4 flex gap-2">
          <Button type="submit" disabled={saveMutation.isPending}>
            <Plus className="h-4 w-4 mr-1" />
            {editId ? 'Update Alumni' : 'Tambah Alumni'}
          </Button>
          {editId && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Batal
            </Button>
          )}
        </div>
      </form>

      {isLoading ? (
        <div className="p-8 text-center">Memuat...</div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Nama</th>
                <th className="text-left px-4 py-3 font-medium">Metode</th>
                <th className="text-left px-4 py-3 font-medium">Tahun</th>
                <th className="text-left px-4 py-3 font-medium">Perusahaan</th>
                <th className="text-right px-4 py-3 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {(data || []).length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                    Belum ada data alumni.
                  </td>
                </tr>
              ) : (
                (data || []).map((item) => (
                  <tr key={item.id} className="border-t hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium">{item.name}</td>
                    <td className="px-4 py-3">{item.method || '-'}</td>
                    <td className="px-4 py-3">{item.year || '-'}</td>
                    <td className="px-4 py-3">{item.company || '-'}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm" onClick={() => onEdit(item)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => delMutation.mutate(item.id)} disabled={delMutation.isPending}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
