import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Check, AlertCircle } from 'lucide-react';
import api from '@/utils/api';
import { IMG_PLACEHOLDER_16x10 } from '@/config/images';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';

const formatIDR = (price) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price || 0);

const fetchCourse = async (id) => {
  const { data } = await api.get(`/public/lectures/${id}`);
  return data;
};

const addToCart = async (lectureId) => {
  const { data } = await api.post('/carts/add', { lectureId });
  return data;
};

export default function MinimalCourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const { data: course, isLoading, error } = useQuery({ queryKey: ['min-course', id], queryFn: () => fetchCourse(id) });
  const mutation = useMutation({ mutationFn: addToCart, onSuccess: () => navigate('/cart') });

  const prerequisites = [
    'Terbuka untuk umum (minimal SMA/sederajat)',
    'Memahami dasar K3 (Keselamatan & Kesehatan Kerja)',
    'Dapat mengikuti kelas teori dan praktik',
  ];

  const onRegister = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    mutation.mutate(course.id);
  };

  if (isLoading) {
    return (<div className="min-h-[50vh] flex items-center justify-center"><div className="h-8 w-8 rounded-full border-2 border-gray-900 border-t-transparent animate-spin" /></div>);
  }

  if (error || !course) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-center">
        <div>
          <AlertCircle className="h-10 w-10 text-red-500 mx-auto" />
          <div className="mt-2 text-gray-900 font-medium">Kursus tidak ditemukan</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="text-xs text-gray-600">{course.Category?.name || 'NDT'}</div>
            <h1 className="mt-1 text-2xl font-semibold text-gray-900">{course.title || course.name}</h1>
            <p className="mt-3 text-gray-700">{course.description || course.technique || 'Pelatihan komprehensif sesuai standar industri.'}</p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-lg border border-gray-200 p-5">
                <div className="text-sm font-medium text-gray-900">Apa yang Anda Dapatkan</div>
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  {['Materi teori terstruktur','Akses video pembelajaran','Sertifikat penyelesaian','Dukungan instruktur'].map((i) => (
                    <li key={i} className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-gray-900" /> <span>{i}</span></li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-gray-200 p-5">
                <div className="text-sm font-medium text-gray-900">Persyaratan Pendaftaran</div>
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  {prerequisites.map((p) => (
                    <li key={p} className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-gray-900" /> <span>{p}</span></li>
                  ))}
                </ul>
                <div className="mt-3 text-xs text-gray-500">Catatan: Peserta tanpa latar belakang teknik tetap dapat mendaftar.</div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:pl-6">
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <div className="aspect-[16/10] bg-gray-100">
                <img src={course.image || IMG_PLACEHOLDER_16x10} alt={course.title || course.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <div className="text-2xl font-semibold text-gray-900">{formatIDR(course.price)}</div>
                <div className="mt-4">
                  <Button className="w-full" onClick={onRegister} disabled={mutation.isLoading}>
                    {mutation.isLoading ? 'Memproses...' : 'Daftar Sekarang'}
                  </Button>
                </div>
                <div className="mt-2 text-xs text-gray-500">Pendaftaran terbuka untuk umum.</div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
