import { Outlet } from 'react-router-dom';
import MinimalNavbar from '@/components/MinimalNavbar';
import MinimalFooter from '@/components/MinimalFooter';
import ChatbotFloating from '@/components/ChatbotFloating';

export default function MinimalLayout() {
  return (
    <>
      <MinimalNavbar />
      <main className="min-h-screen bg-white">
        <Outlet />
      </main>
      <MinimalFooter />
      <ChatbotFloating />
    </>
  );
}
