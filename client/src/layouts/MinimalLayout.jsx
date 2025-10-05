import { Outlet } from 'react-router';
import MinimalNavbar from '@/components/MinimalNavbar';
import MinimalFooter from '@/components/MinimalFooter';
import WhatsappFloating from '@/components/WhatsappFloating';

export default function MinimalLayout() {
  return (
    <>
      <MinimalNavbar />
      <main className="min-h-screen bg-white">
        <Outlet />
      </main>
      <MinimalFooter />
      <WhatsappFloating />
    </>
  );
}
