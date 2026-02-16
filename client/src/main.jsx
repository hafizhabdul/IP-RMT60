import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./styles/scroll.css";
import "./styles/mobile-optimization.css";
import { initializeMobileOptimizations } from "./utils/mobileOptimizations";
import { LanguageProvider } from "./context/LanguageContext";

// Initialize mobile optimizations
initializeMobileOptimizations();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>
);
