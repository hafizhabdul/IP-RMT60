import { useQuery } from '@tanstack/react-query';
import api from '@/utils/api';

const fetchAlumni = async () => {
  const { data } = await api.get('/public/alumni');
  return data;
};

export default function MinimalAlumni() {
  const { data, isLoading } = useQuery({ queryKey: ['alumni'], queryFn: fetchAlumni });

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-semibold text-gray-900">Alumni Sertifikasi SNS</h1>
        <p className="text-gray-600 mt-1">Beberapa peserta yang telah lulus sertifikasi NDT.</p>

        {isLoading ? (
          <div className="min-h-[30vh] flex items-center justify-center">
            <div className="h-8 w-8 rounded-full border-2 border-gray-900 border-t-transparent animate-spin" />
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(data || []).map((a) => (
              <div key={a.id} className="rounded-lg border border-gray-200 p-5">
                <div className="text-base font-medium text-gray-900">{a.name}</div>
                <div className="text-sm text-gray-700 mt-1">{a.method}</div>
                <div className="text-xs text-gray-600 mt-2">{a.company || '—'} • {a.year}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

