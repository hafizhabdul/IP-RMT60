import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Button } from './ui/Button';
import { LanguageContext } from '../context/LanguageContext';

export default function MinimalNavbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const { language, setLanguage } = useContext(LanguageContext);

  const links = [
    { name: 'Beranda', path: '/' },
    { name: 'Kursus', path: '/courses' },
    { name: 'Jadwal', path: '/schedule' },
    { name: 'Resertifikasi', path: '/recertification' },
    { name: 'Alumni', path: '/alumni' },
    { name: 'Tentang', path: '/about' },
    { name: 'Kontak', path: '/contact' },
  ];

  const handleWhatsApp = () => {
    const phoneNumber = "628129258446";
    const message = "Halo Admin, saya ingin mendaftar kursus.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="SNS - SAR NDT Services" className="h-7 w-auto" />
          <span className="text-lg font-semibold tracking-tight">SNS - SAR NDT Services</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.name}
              to={l.path}
              className={({ isActive }) =>
                `text-sm transition-colors ${isActive ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`
              }
            >
              {l.name}
            </NavLink>
          ))}
        </div>


        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-full border border-gray-200 px-1 py-1 text-xs">
              <button
                type="button"
                onClick={() => setLanguage('id')}
                className={`px-2 py-1 rounded-full ${
                  language === 'id'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded-full ${
                  language === 'en'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                EN
              </button>
            </div>
            <Button onClick={handleWhatsApp}>Daftar</Button>
            <Link
              to="/e-learning"
              className="h-10 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-md transition-colors inline-flex items-center justify-center"
            >
              E-Learning
              <span className="ml-2 text-[10px] bg-teal-500 text-white border border-teal-400 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Beta</span>
            </Link>
          </div>
          {isAuthenticated ? (
            <div className="relative">
              <Button variant="ghost" onClick={() => setOpen((v) => !v)} aria-label="Toggle account menu">
                <User className="h-4 w-4 mr-2" />
                <span className="text-sm">{user?.username || user?.name || 'Akun'}</span>
              </Button>
              {open && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-sm">
                  {isAdmin && (
                    <Link
                      to="/admin/dashboard"
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setOpen(false)}
                    >
                      Admin
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setOpen(false)}
                  >
                    Profil
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <LogOut className="inline h-4 w-4 mr-2" /> Keluar
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>

        <button className="md:hidden" aria-label="Toggle navigation" onClick={() => setOpen((v) => !v)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-4 py-3 space-y-2">
            {links.map((l) => (
              <NavLink
                key={l.name}
                to={l.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-2 py-2 rounded text-sm ${isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`
                }
              >
                {l.name}
              </NavLink>
            ))}

            <div className="pt-2 border-t border-gray-200">
              <div className="flex flex-col gap-2 px-2 py-2">
                <div className="flex items-center gap-1 rounded-full border border-gray-200 px-1 py-1 text-xs w-fit">
                  <button
                    type="button"
                    onClick={() => setLanguage('id')}
                    className={`px-2 py-1 rounded-full ${
                      language === 'id'
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    ID
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    className={`px-2 py-1 rounded-full ${
                      language === 'en'
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    EN
                  </button>
                </div>
                <button onClick={() => { handleWhatsApp(); setOpen(false); }} className="text-left text-sm text-gray-700 hover:text-gray-900">
                  Daftar
                </button>
                <Link
                  to="/e-learning"
                  onClick={() => setOpen(false)}
                  className="h-10 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium rounded-md transition-colors inline-flex items-center justify-center"
                >
                  E-Learning
                  <span className="ml-2 text-[10px] bg-teal-500 text-white border border-teal-400 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Beta</span>
                </Link>
              </div>
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setOpen(false)}>Profil</Link>
                  {isAdmin && (
                    <Link to="/admin/dashboard" className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setOpen(false)}>Admin</Link>
                  )}
                  <button className="w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => { logout(); setOpen(false); }}>
                    Keluar
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

