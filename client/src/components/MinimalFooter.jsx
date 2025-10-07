import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function MinimalFooter() {
  const links = {
    'Perusahaan': [
      { name: 'Tentang Kami', path: '/about' },
      { name: 'Jadwal Sertifikasi', path: '/schedule' },
      { name: 'Hubungi Kami', path: '/contact' },
    ],
    'Kursus': [
      { name: 'Semua Kursus', path: '/courses' },
      { name: 'Alumni', path: '/alumni' },
      { name: 'Cara Mendaftar', path: '/enroll' },
    ],
    'Legal': [
      { name: 'Kebijakan Privasi', path: '/privacy' },
      { name: 'Syarat & Ketentuan', path: '/terms' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, url: '#', label: 'Facebook' },
    { icon: Twitter, url: '#', label: 'Twitter' },
    { icon: Instagram, url: '#', label: 'Instagram' },
    { icon: Linkedin, url: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="SNS - SAR NDT Services" className="h-8 w-auto" />
              <span className="text-xl font-bold text-gray-900">SNS NDT</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">Pusat pelatihan dan sertifikasi Non-Destructive Testing terdepan di Indonesia.</p>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((social, i) => (
                <a key={i} href={social.url} className="text-gray-400 hover:text-gray-500" aria-label={social.label}>
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(links).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">{category}</h3>
                <ul className="mt-4 space-y-2">
                  {items.map((item) => (
                    <li key={item.name}>
                      <Link to={item.path} className="text-sm text-gray-600 hover:text-gray-900">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} SNS NDT. All rights reserved.</p>
          <p className="mt-4 sm:mt-0 text-sm text-gray-500">Didesain oleh Tim SNS</p>
        </div>
      </div>
    </footer>
  );
}

