import { useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { LayoutGrid, BookOpen, Award, Beaker, FileText, Menu, X, ChevronRight } from 'lucide-react';
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

export default function ELearningLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user } = useAuth();
  const { data: progress } = useMyProgress({ enabled: !!user });
  const { data: paths } = useLearningPaths();

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
            'el-scroll fixed inset-y-0 left-0 z-40 w-[260px] -translate-x-full lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen lg:self-start bg-slate-950 text-slate-400 flex-col gap-7 px-4 py-5 overflow-y-auto transition-transform',
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

          <div className="mt-auto rounded-lg bg-slate-900 p-3 flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-full bg-orange-amber grid place-items-center text-white font-bold text-[13px]">
              {(user?.username || 'NDT').slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] font-semibold text-white">{user?.username || 'Guest'}</div>
              <div className="font-plexMono text-[11px] text-slate-500">
                {user ? 'Level I · Student' : 'Login to track progress'}
              </div>
            </div>
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
          <Outlet />
        </main>
      </div>
    </div>
  );
}
