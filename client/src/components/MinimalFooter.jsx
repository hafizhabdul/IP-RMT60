import { Link } from 'react-router-dom';

export default function MinimalFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="SNS - Sar NDT Services" className="h-6 w-auto" />
            <span className="text-base font-semibold tracking-tight">SNS — Sar NDT Services</span>
          </Link>

          <div className="text-sm text-gray-600">
            <span>&copy; {new Date().getFullYear()} SNS NDT. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <Link to="/about" className="text-gray-600 hover:text-gray-900">Tentang</Link>
            <Link to="/alumni" className="text-gray-600 hover:text-gray-900">Alumni</Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900">Kontak</Link>
            <Link to="/enroll" className="text-gray-600 hover:text-gray-900">Daftar</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
