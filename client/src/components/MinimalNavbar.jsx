import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Button } from './ui/Button';

export default function MinimalNavbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, logout, isAdmin } = useAuth();

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
    const phoneNumber = "6281296953557";
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
          <Button onClick={handleWhatsApp}>Daftar</Button>
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
              <button onClick={() => { handleWhatsApp(); setOpen(false); }} className="block w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-gray-50">Daftar</button>
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

