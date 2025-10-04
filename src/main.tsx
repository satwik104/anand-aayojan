import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Force logout on each preview load (for testing in embedded preview)
try {
  if (window.top !== window.self) {
    localStorage.removeItem('aa_token');
    localStorage.removeItem('aa_user');
  }
} catch {}

createRoot(document.getElementById("root")!).render(<App />);
