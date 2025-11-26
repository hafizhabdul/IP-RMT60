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
import TechnicalLayout from "./layouts/TechnicalLayout";
import MinimalLayout from "./layouts/MinimalLayout";
import AuthLayout from "./layouts/AuthLayout";
import ModernAdminLayout from "./layouts/ModernAdminLayout";

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
const TechnicalProfile = lazy(() => import("./pages/TechnicalProfile"));
const ModernLogin = lazy(() => import("./pages/ModernLogin"));
const ModernRegister = lazy(() => import("./pages/ModernRegister"));

// Legacy Pages (Lazy Loaded)
const ModernCourseLearning = lazy(() => import("./pages/ModernCourseLearning"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const CheckoutHybrid = lazy(() => import("./pages/CheckoutHybrid"));
const UserOrders = lazy(() => import("./pages/UserOrders"));
const PaymentResult = lazy(() => import("./pages/PaymentResult"));
const MyCourses = lazy(() => import("./pages/MyCourses"));

// Modern Admin Pages (Lazy Loaded)
const ModernDashboard = lazy(() => import("./pages/Admin/ModernDashboard"));
const ModernAdminUsers = lazy(() => import("./pages/Admin/ModernUsers"));
const ModernAdminCourses = lazy(() => import("./pages/Admin/ModernAdminCourses"));
const ModernAdminCategories = lazy(() => import("./pages/Admin/ModernCategories"));
const ModernTransactions = lazy(() => import("./pages/Admin/ModernTransactions"));
const ModernPayments = lazy(() => import("./pages/Admin/ModernPayments"));
const AdminPayments = lazy(() => import("./pages/Admin/AdminPayments"));
const AdminEvents = lazy(() => import("./pages/Admin/AdminEvents"));

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

  // Auto scroll to top when navigating to different routes
  useScrollToTop();

  // Loading spinner with modern design
  if (loading) {
    return <PageLoader />;
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Authentication routes */}
      <Route path="/login" element={
        isAuthenticated ? (isAdmin ? <Navigate to="/admin/dashboard" /> : <Navigate to="/" />) : <ModernLogin />
      } />
      <Route path="/register" element={
        isAuthenticated ? (isAdmin ? <Navigate to="/admin/dashboard" /> : <Navigate to="/" />) : <ModernRegister />
      } />

      {/* Admin routes */}
      <Route path="/admin/*" element={
        isAuthenticated ? (isAdmin ? <ModernAdminLayout /> : <Navigate to="/" />) : <Navigate to="/login" />
      }>
        <Route path="dashboard" element={<ModernDashboard />} />
        <Route path="users" element={<ModernAdminUsers />} />
        <Route path="courses" element={<ModernAdminCourses />} />
        <Route path="categories" element={<ModernAdminCategories />} />
        <Route path="transactions" element={<ModernTransactions />} />
        <Route path="payments" element={<AdminPayments />} />
        <Route path="events" element={<AdminEvents />} />
      </Route>

      {/* User routes - minimal, redirect admin to admin dashboard */}
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
        {/* <Route path="enroll" element={<MinimalEnroll />} /> */}
        <Route path="courses" element={<MinimalCourses />} />
        <Route path="courses/:id" element={<MinimalCourseDetail />} />
        <Route path="courses/:id/learn" element={<ModernCourseLearning />} />
        {/* categories removed from public site */}
        
        {/* Protected user routes */}
        <Route element={isAuthenticated ? <Outlet /> : <Navigate to="/login" />}>
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<CheckoutHybrid />} />
          <Route path="checkout/legacy" element={<Checkout />} />
          <Route path="orders" element={<UserOrders />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="profile" element={<TechnicalProfile />} />
          <Route path="learn/:id" element={<ModernCourseLearning />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Payment Result Routes */}
      <Route path="/payment/success" element={<PaymentResult />} />
      <Route path="/payment/failed" element={<PaymentResult />} />
      <Route path="/payment/pending" element={<PaymentResult />} />
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
