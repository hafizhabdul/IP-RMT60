import { Outlet } from "react-router";
import ModernNavbar from "../components/ModernNavbar";
import ModernFooter from "../components/ModernFooter";
// Chatbot removed; migrate to WhatsApp floating if needed

export default function ModernMainLayout() {
  return (
    <>
      <ModernNavbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <ModernFooter />
      {/* No chatbot */}
    </>
  );
}
