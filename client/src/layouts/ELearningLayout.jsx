import { useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { LayoutGrid, BookOpen, Award, Beaker, FileText, Menu, X, ChevronRight, ArrowLeft, LogOut, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { useMyProgress } from '@/hooks/useProgress';
import { useLearningPaths } from '@/hooks/useLearningPaths';

const NAV_ITEMS = [
  { to: '/e-learning', label: 'Learning Hub', icon: LayoutGrid, end: true },
  { to: '/e-learning/content', label: 'Knowledge Base', icon: FileText },
  { to: '/e-learning/simulations', label: 'Simulations', icon: Beaker },
  { to: '/e-learning/quizzes', label: 'Quiz Practice', icon: BookOpen },
];

const ONBOARDING_DISMISSED_KEY = 'el-onboarding-dismissed';

// First-visit flow explainer. Each stage maps a step in the learning journey.
const ONBOARDING_STEPS = [
  { icon: BookOpen, label: 'Belajar', desc: 'Pelajari materi per modul.' },
  { icon: LayoutGrid, label: 'Kuis', desc: 'Uji pemahaman tiap modul.' },
  { icon: Beaker, label: 'Simulasi', desc: 'Praktik metode secara interaktif.' },
  { icon: Award, label: 'Sertifikat', desc: 'Lulus asesmen, raih sertifikat.' },
];

function OnboardingPanel({ onDismiss }) {
  return (
    <section
      aria-labelledby="el-onboarding-title"
      className="mb-6 rounded-xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-5 sm:p-6 shadow-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id="el-onboarding-title" className="text-[16px] font-bold text-slate-900">
            Cara kerja e-learning ini
          </h2>
          <p className="mt-1 text-[13.5px] text-slate-600">
            Ikuti alur berikut untuk menyelesaikan setiap jalur belajar.
          </p>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          aria-label="Tutup panduan"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {ONBOARDING_STEPS.map(({ icon: Icon, label, desc }, idx) => (
          <li
            key={label}
            className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white px-3.5 py-3"
          >
            <span className="inline-grid h-8 w-8 shrink-0 place-items-center rounded-full bg-orange-100 text-orange-700">
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[13.5px] font-semibold text-slate-900">
                <span className="font-plexMono text-[11px] text-orange-600">{idx + 1}.</span>
                {label}
              </div>
              <p className="mt-0.5 text-[12.5px] leading-snug text-slate-500">{desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function ELearningLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  // Show the first-visit flow explainer until the user dismisses it.
  const [showOnboarding, setShowOnboarding] = useState(() => {
    try {
      return localStorage.getItem(ONBOARDING_DISMISSED_KEY) !== '1';
    } catch {
      return true;
    }
  });
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { data: progress } = useMyProgress({ enabled: !!user });
  const { data: paths } = useLearningPaths();

  const dismissOnboarding = () => {
    setShowOnboarding(false);
    try {
      localStorage.setItem(ONBOARDING_DISMISSED_KEY, '1');
    } catch {
      // localStorage unavailable (private mode) — dismissal is session-only.
    }
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    setDrawerOpen(false);
    navigate('/');
  };

  const enrolledPaths = (paths || []).filter((p) => p.isEnrolled);

  return (
    <div className="elearning-surface min-h-screen bg-slate-50">
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setDrawerOpen(true)}
        className="fixed top-4 left-4 z-30 lg:hidden rounded-md border border-slate-200 bg-white p-2 shadow-sm"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="grid lg:grid-cols-[260px_1fr] min-h-screen">
        {/* Sidebar — desktop sticky, mobile drawer */}
        <aside
          className={cn(
            'el-scroll fixed inset-y-0 left-0 z-40 w-[260px] -translate-x-full lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen lg:self-start bg-slate-950 text-slate-400 flex-col gap-5 px-4 py-5 overflow-y-auto transition-transform',
            drawerOpen ? 'translate-x-0 flex' : 'hidden lg:flex'
          )}
        >
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="absolute top-3 right-3 lg:hidden p-2 text-slate-400 hover:text-white"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>

          <Link
            to="/"
            className="group inline-flex items-center gap-1.5 px-2 py-1 -ml-1 rounded text-[11.5px] font-plexMono uppercase tracking-[0.12em] text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
            Back to home
          </Link>

          <Link to="/e-learning" className="flex items-center gap-3 px-2">
            <span className="block h-8 w-8 rounded-lg bg-orange-amber shadow-el-orange" />
            <div>
              <div className="text-[15px] font-bold tracking-tight text-white">SNS NDT</div>
              <div className="font-plexMono text-[10px] uppercase tracking-[0.12em] text-slate-400">E-Learning</div>
            </div>
          </Link>

          <nav>
            <div className="el-label text-slate-500 px-2 mb-2.5">Navigate</div>
            <div className="flex flex-col gap-0.5">
              {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  onClick={() => setDrawerOpen(false)}
                  className={({ isActive }) => cn(
                    'grid grid-cols-[16px_1fr] gap-3 items-center rounded-md px-2.5 py-2 text-[13.5px] font-medium transition-colors',
                    isActive
                      ? 'bg-gradient-to-r from-orange-500/15 to-orange-500/5 text-white shadow-[inset_2px_0_0_#F97316]'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  )}
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={cn('h-4 w-4', isActive ? 'text-orange-500' : 'text-slate-500')} />
                      <span>{label}</span>
                    </>
                  )}
                </NavLink>
              ))}
              <NavLink
                to="/e-learning/certificates"
                onClick={() => setDrawerOpen(false)}
                className={({ isActive }) => cn(
                  'grid grid-cols-[16px_1fr_auto] gap-3 items-center rounded-md px-2.5 py-2 text-[13.5px] font-medium transition-colors',
                  isActive ? 'bg-slate-900 text-white' : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                )}
              >
                <Award className="h-4 w-4 text-slate-500" />
                <span>Certificates</span>
                <span className="rounded bg-slate-800 px-1.5 py-0.5 font-plexMono text-[10px] text-slate-400">0</span>
              </NavLink>
            </div>
          </nav>

          {enrolledPaths.length > 0 && (
            <div>
              <div className="el-label text-slate-500 px-2 mb-2.5">My Paths · {enrolledPaths.length} active</div>
              <div className="flex flex-col gap-0.5">
                {enrolledPaths.map((p) => (
                  <Link
                    key={p.code}
                    to={`/e-learning/paths/${p.code}`}
                    onClick={() => setDrawerOpen(false)}
                    className="grid grid-cols-[28px_1fr_auto] items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[13px] hover:bg-slate-900"
                  >
                    <span className="font-plexMono text-[10px] font-semibold uppercase tracking-[0.06em] text-orange-500">{p.method}</span>
                    <span className="truncate text-slate-300">{p.title.replace(/ — .*$/, '')}</span>
                    <span className="font-plexMono text-[10.5px] text-slate-500 tabular-nums">{p.progressPercent}%</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto relative">
            {userMenuOpen && isAuthenticated && (
              <div className="absolute bottom-full mb-2 left-0 right-0 rounded-lg bg-slate-900 border border-slate-800 shadow-xl overflow-hidden">
                <div className="px-3 py-2.5 border-b border-slate-800">
                  <div className="text-[13px] font-semibold text-white truncate">{user?.username}</div>
                  <div className="font-plexMono text-[11px] text-slate-500 truncate">{user?.email}</div>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full grid grid-cols-[16px_1fr] gap-3 items-center px-3 py-2.5 text-left text-[13px] font-medium text-rose-400 hover:bg-rose-500/10"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => isAuthenticated ? setUserMenuOpen((o) => !o) : navigate('/login')}
              className="w-full rounded-lg bg-slate-900 p-3 flex items-center gap-2.5 hover:bg-slate-800 transition-colors text-left"
            >
              <div className="h-9 w-9 rounded-full bg-orange-amber grid place-items-center text-white font-bold text-[13px]">
                {(user?.username || 'NDT').slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-semibold text-white">{user?.username || 'Guest'}</div>
                <div className="font-plexMono text-[11px] text-slate-500">
                  {user ? 'Level I · Student' : 'Login to track progress'}
                </div>
              </div>
              {isAuthenticated ? (
                <ChevronRight className={`h-4 w-4 text-slate-500 transition-transform ${userMenuOpen ? 'rotate-90' : ''}`} />
              ) : (
                <LogIn className="h-4 w-4 text-slate-500" />
              )}
            </button>
          </div>
        </aside>

        {/* Backdrop on mobile */}
        {drawerOpen && (
          <div
            className="fixed inset-0 z-30 bg-slate-900/60 lg:hidden"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Content */}
        <main className="px-5 sm:px-8 py-6 sm:py-8 max-w-full overflow-x-hidden">
          {showOnboarding && <OnboardingPanel onDismiss={dismissOnboarding} />}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
