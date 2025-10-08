import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import api from '@/utils/api';
import { IMG_PLACEHOLDER_16x9, IMG_PLACEHOLDER_16x10 } from '@/config/images';
import { Input } from '@/components/ui/Input';

const formatIDR = (price) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price || 0);

const fetchCourses = async (filters) => {
  const { data } = await api.get('/public/lectures', { params: filters });
  return data;
};

const fetchCategories = async () => {
  const { data } = await api.get('/public/categories');
  return data;
};

export default function MinimalCourses() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ page: 1, search: '', categoryId: '' });
  const { data: coursesData, isLoading } = useQuery({ queryKey: ['min-courses', filters], queryFn: () => fetchCourses(filters) });
  const { data: categories } = useQuery({ queryKey: ['min-categories'], queryFn: fetchCategories });

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Kursus NDT</h1>
            <p className="text-gray-600 mt-1">Pilih kursus sesuai kebutuhan Anda</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Cari kursus..."
                className="pl-9 w-64"
                value={filters.search}
                onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value, page: 1 }))}
              />
            </div>
            <select
              value={filters.categoryId}
              onChange={(e) => setFilters((f) => ({ ...f, categoryId: e.target.value, page: 1 }))}
              className="h-10 rounded-md border border-gray-300 bg-white px-3 text-sm"
            >
              <option value="">Semua Kategori</option>
              {(categories || []).map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="min-h-[40vh] flex items-center justify-center"><div className="h-8 w-8 rounded-full border-2 border-gray-900 border-t-transparent animate-spin" /></div>
        ) : !coursesData || coursesData.lectures.length === 0 ? (
          <div className="text-center py-20 text-gray-600">Tidak ada kursus.</div>
        ) : (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coursesData.lectures.map((c) => (
              <div key={c.id} className="border border-gray-200 rounded-lg overflow-hidden group">
                <div className="h-1 bg-gradient-to-r from-orange-600 to-amber-500" />
                <Link to={`/courses/${c.id}`} className="block">
                  <div className="aspect-[16/10] bg-gray-100">
                    <img src={c.image || IMG_PLACEHOLDER_16x10} alt={c.title || c.name} className="w-full h-full object-cover" />
                  </div>
                </Link>
                <div className="p-4">
                  <div className="text-xs text-gray-600">{c.category?.name || 'NDT'}</div>
                  <div className="mt-1 text-base font-medium text-gray-900 line-clamp-2">{c.title || c.name}</div>
                  <div className="mt-2 text-sm text-gray-700">{formatIDR(c.price)}</div>
                  <div className="mt-3">
                    <button onClick={() => navigate(`/courses/${c.id}`)} className="w-full rounded-md bg-gray-900 text-white px-4 py-2 text-sm hover:bg-black">Detail</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
