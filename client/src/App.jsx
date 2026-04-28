import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import { useScrollToTop } from "./hooks/useScrollToTop";
import { Provider } from 'react-redux';
import store from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lazy, Suspense } from 'react';

// Layouts
import MinimalLayout from "./layouts/MinimalLayout";
import ModernAdminLayout from "./layouts/ModernAdminLayout";
const ELearningLayout = lazy(() => import("./layouts/ELearningLayout"));

// Lazy Load Pages
const MinimalHome = lazy(() => import("./pages/MinimalHome"));
const MinimalAbout = lazy(() => import("./pages/MinimalAbout"));
const MinimalRecertification = lazy(() => import("./pages/MinimalRecertification"));
const MinimalContact = lazy(() => import("./pages/MinimalContact"));
const MinimalAlumni = lazy(() => import("./pages/MinimalAlumni"));
const MinimalSchedule = lazy(() => import("./pages/MinimalSchedule"));
const MinimalScheduleDetail = lazy(() => import("./pages/MinimalScheduleDetail"));
const MinimalPrivacy = lazy(() => import("./pages/MinimalPrivacy"));
const MinimalTerms = lazy(() => import("./pages/MinimalTerms"));
const MinimalCourses = lazy(() => import("./pages/MinimalCourses"));
const MinimalCourseDetail = lazy(() => import("./pages/MinimalCourseDetail"));
const ModernLogin = lazy(() => import("./pages/ModernLogin"));

// E-Learning Pages (public, no auth needed)
const LearningHub = lazy(() => import("./pages/elearning/LearningHub"));
const LearningPathDetail = lazy(() => import("./pages/elearning/LearningPathDetail"));
const LessonPlayer = lazy(() => import("./pages/elearning/LessonPlayer"));
const CertificatesPage = lazy(() => import("./pages/elearning/CertificatesPage"));
const SimulationsHub = lazy(() => import("./pages/simulations/SimulationsHub"));
const UTSimulationPage = lazy(() => import("./pages/simulations/UTSimulationPage"));
const MTSimulationPage = lazy(() => import("./pages/simulations/MTSimulationPage"));
const PTSimulationPage = lazy(() => import("./pages/simulations/PTSimulationPage"));
const RTSimulationPage = lazy(() => import("./pages/simulations/RTSimulationPage"));
const QuizHub = lazy(() => import("./pages/quiz/QuizHub"));
const QuizPage = lazy(() => import("./pages/quiz/QuizPage"));
const ContentHub = lazy(() => import("./pages/content/ContentHub"));
const ArticlePage = lazy(() => import("./pages/content/ArticlePage"));

const NotFound = lazy(() => import("./pages/NotFound"));

// Admin Pages (still need auth)
const ModernDashboard = lazy(() => import("./pages/Admin/ModernDashboard"));
const ModernAdminUsers = lazy(() => import("./pages/Admin/ModernUsers"));
const ModernAdminCourses = lazy(() => import("./pages/Admin/ModernAdminCourses"));
const ModernAdminCategories = lazy(() => import("./pages/Admin/ModernCategories"));
const AdminEvents = lazy(() => import("./pages/Admin/AdminEvents"));
const AdminAlumni = lazy(() => import("./pages/Admin/AdminAlumni"));

const queryClient = new QueryClient();

// Loading Component
const PageLoader = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

function AppRoutes() {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  useScrollToTop();

  if (loading) {
    return <PageLoader />;
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Admin login route */}
        <Route path="/login" element={
          isAuthenticated ? (isAdmin ? <Navigate to="/admin/dashboard" /> : <Navigate to="/" />) : <ModernLogin />
        } />

        {/* Admin routes */}
        <Route path="/admin/*" element={
          isAuthenticated ? (isAdmin ? <ModernAdminLayout /> : <Navigate to="/" />) : <Navigate to="/login" />
        }>
          <Route path="dashboard" element={<ModernDashboard />} />
          <Route path="users" element={<ModernAdminUsers />} />
          <Route path="courses" element={<ModernAdminCourses />} />
          <Route path="categories" element={<ModernAdminCategories />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="alumni" element={<AdminAlumni />} />
        </Route>

        {/* Public routes */}
        <Route path="/*" element={
          isAdmin ? <Navigate to="/admin/dashboard" /> : <MinimalLayout />
        }>
          <Route index element={<MinimalHome />} />
          <Route path="about" element={<MinimalAbout />} />
          <Route path="recertification" element={<MinimalRecertification />} />
          <Route path="alumni" element={<MinimalAlumni />} />
          <Route path="schedule" element={<MinimalSchedule />} />
          <Route path="schedule/:id" element={<MinimalScheduleDetail />} />
          <Route path="contact" element={<MinimalContact />} />
          <Route path="privacy" element={<MinimalPrivacy />} />
          <Route path="terms" element={<MinimalTerms />} />
          <Route path="courses" element={<MinimalCourses />} />
          <Route path="courses/:id" element={<MinimalCourseDetail />} />

          <Route path="*" element={<NotFound />} />
        </Route>

        {/* E-Learning — all routes under one layout for design consistency */}
        <Route path="/e-learning" element={<ELearningLayout />}>
          <Route index element={<LearningHub />} />
          <Route path="paths/:code" element={<LearningPathDetail />} />
          <Route path="certificates" element={<CertificatesPage />} />
          <Route path="content" element={<ContentHub />} />
          <Route path="content/:slug" element={<ArticlePage />} />
          <Route path="simulations" element={<SimulationsHub />} />
          <Route path="simulations/ut" element={<UTSimulationPage />} />
          <Route path="simulations/mt" element={<MTSimulationPage />} />
          <Route path="simulations/pt" element={<PTSimulationPage />} />
          <Route path="simulations/rt" element={<RTSimulationPage />} />
          <Route path="quizzes" element={<QuizHub />} />
          <Route path="quizzes/take" element={<QuizPage />} />
        </Route>

        {/* Lesson Player — full-screen, no layout */}
        <Route path="/e-learning/paths/:code/modules/:number/steps/:stepId" element={<LessonPlayer />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AppRoutes />
            <ToastContainer position="top-right" autoClose={3000} />
          </BrowserRouter>
        </QueryClientProvider>
      </AuthProvider>
    </Provider>
  );
}
