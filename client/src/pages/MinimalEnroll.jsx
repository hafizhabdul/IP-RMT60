import { useState, useEffect } from 'react';
import api from '@/utils/api';
import { showToast } from '@/utils/toast';
import { sendEnrollmentToWhatsApp } from '@/utils/whatsapp';

const METHODS = ['PT', 'MT', 'UT', 'ET', 'PAUT', 'RT'];

const validationRules = {
  name: {
    required: true,
    minLength: 3,
    pattern: /^[a-zA-Z\s]+$/,
    message: 'Nama minimal 3 karakter dan hanya boleh huruf'
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Format email tidak valid'
  },
  phone: {
    required: true,
    pattern: /^(?:\+62|62|0)8[1-9][0-9]{7,11}$/,
    message: 'Format WhatsApp tidak valid (contoh: 0812-3456-7890)'
  }
};

export default function MinimalEnroll() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', method: 'PT', note: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isValid, setIsValid] = useState(false);

  // Validation function
  const validateField = (name, value) => {
    const rule = validationRules[name];
    if (!rule) return '';

    if (rule.required && !value.trim()) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} wajib diisi`;
    }

    if (value && rule.minLength && value.length < rule.minLength) {
      return rule.message;
    }

    if (value && rule.pattern && !rule.pattern.test(value)) {
      return rule.message;
    }

    return '';
  };

  // Real-time validation
  const handleInputChange = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, form[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // Check form validity
  useEffect(() => {
    const requiredFields = ['name', 'email', 'phone'];
    const hasErrors = requiredFields.some(field => errors[field]);
    const allFilled = requiredFields.every(field => form[field].trim());
    setIsValid(allFilled && !hasErrors);
  }, [form, errors]);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const validationErrors = {};
    Object.keys(validationRules).forEach(field => {
      const error = validateField(field, form[field]);
      if (error) validationErrors[field] = error;
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setTouched(Object.keys(validationRules));
      showToast.error('Mohon lengkapi form dengan benar');
      return;
    }

    setLoading(true);
    try {
      // Simpan ke database
      await api.post('/public/enrollments', form);

      // Kirim ke WhatsApp
      sendEnrollmentToWhatsApp(form);

      showToast.success('Pendaftaran berhasil dikirim! WhatsApp akan terbuka untuk konfirmasi.');
      setForm({ name: '', email: '', phone: '', method: 'PT', note: '' });
      setErrors({});
      setTouched({});
    } catch (e) {
      showToast.error(e.response?.data?.message || 'Gagal mengirim pendaftaran');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Formulir Pendaftaran Sertifikasi NDT</h1>
          <p className="text-gray-600 mt-1">Silakan isi data berikut. Data akan dikirim ke WhatsApp kami untuk follow-up cepat.</p>
          <div className="mt-4 inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.18-.31.08-1.26.33-.33-1.22.09-.32-.2-.29a8.188 8.188 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24M8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.12.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.27-.25-.14-1.47-.74-1.69-.82-.23-.08-.37-.12-.56.12-.16.25-.64.81-.78.97-.15.17-.29.19-.53.07-.26-.13-1.06-.39-2-1.23-.74-.65-1.23-1.44-1.38-1.7-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.41-.06-.11-.27-.65-.76-1.13-.49-.47-.8-.42-.94-.41H8.57z"/>
            </svg>
            <span>Pesan otomatis akan dikirim ke WhatsApp kami</span>
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-8 rounded-lg border border-gray-200 p-6 space-y-4 max-w-2xl">
          <div>
            <label className="block text-sm text-gray-700 font-medium">Nama Lengkap *</label>
            <input
              className={`form-input-mobile touch-target ${
                errors.name && touched.name
                  ? 'border-red-500 bg-red-50 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                  : touched.name && !errors.name
                  ? 'border-green-500 bg-green-50 focus:ring-2 focus:ring-green-500 focus:border-green-500'
                  : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              }`}
              required
              value={form.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              onBlur={() => handleBlur('name')}
              placeholder="Masukkan nama lengkap Anda"
              inputMode="text"
              autoComplete="name"
            />
            {errors.name && touched.name && (
              <div className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.name}
              </div>
            )}
            {touched.name && !errors.name && (
              <div className="mt-1 text-xs text-green-600 flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Nama valid
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 font-medium">Email *</label>
              <input
                type="email"
                className={`form-input-mobile touch-target ${
                  errors.email && touched.email
                    ? 'border-red-500 bg-red-50 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                    : touched.email && !errors.email
                    ? 'border-green-500 bg-green-50 focus:ring-2 focus:ring-green-500 focus:border-green-500'
                    : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                }`}
                required
                value={form.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                placeholder="email@example.com"
                inputMode="email"
                autoComplete="email"
              />
              {errors.email && touched.email && (
                <div className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email}
                </div>
              )}
              {touched.email && !errors.email && (
                <div className="mt-1 text-xs text-green-600 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Email valid
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-700 font-medium">No. Telepon/WhatsApp *</label>
              <input
                type="tel"
                className={`form-input-mobile touch-target ${
                  errors.phone && touched.phone
                    ? 'border-red-500 bg-red-50 focus:ring-2 focus:ring-red-500 focus:border-red-500'
                    : touched.phone && !errors.phone
                    ? 'border-green-500 bg-green-50 focus:ring-2 focus:ring-green-500 focus:border-green-500'
                    : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                }`}
                required
                value={form.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                onBlur={() => handleBlur('phone')}
                placeholder="0812-3456-7890"
                inputMode="tel"
                autoComplete="tel"
              />
              {errors.phone && touched.phone && (
                <div className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.phone}
                </div>
              )}
              {touched.phone && !errors.phone && (
                <div className="mt-1 text-xs text-green-600 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Nomor valid
                </div>
              )}
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
            <textarea
              className="form-input-mobile touch-target"
              rows={4}
              value={form.note}
              onChange={(e)=>setForm(f=>({...f,note:e.target.value}))}
              placeholder="Pertanyaan atau permintaan khusus..."
              inputMode="text"
            />
          </div>
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={loading || !isValid}
              className={`btn-mobile w-full rounded-md px-5 py-3 text-sm flex items-center justify-center gap-2 transition-all duration-200 touch-target ${
                !isValid
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : loading
                  ? 'bg-green-600 text-white cursor-wait'
                  : 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg transform hover:scale-105'
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Mengirim...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.18-.31.08-1.26.33-.33-1.22.09-.32-.2-.29a8.188 8.188 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24z"/>
                  </svg>
                  Kirim via WhatsApp
                </>
              )}
            </button>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                Form akan tersimpan di sistem dan WhatsApp akan terbuka otomatis
              </p>
              {!isValid && Object.keys(touched).length > 0 && (
                <p className="text-xs text-orange-600 mt-2">
                  Mohon lengkapi semua field dengan benar untuk melanjutkan
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

