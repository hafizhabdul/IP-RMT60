import { Outlet } from "react-router";
import ModernNavbar from "../components/ModernNavbar";
import ModernFooter from "../components/ModernFooter";
// Chatbot removed; using WhatsApp floating button in MinimalLayout

export default function TechnicalLayout() {
  return (
    <>
      <ModernNavbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <ModernFooter />
      {/* WhatsApp floating is handled in MinimalLayout */}
    </>
  );
}
