import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Force logout on each load to keep preview in logged-out state
try {
  localStorage.removeItem('aa_token');
  localStorage.removeItem('aa_user');
} catch {}

createRoot(document.getElementById("root")!).render(<App />);
