import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./global.css"; // Added global CSS import

createRoot(document.getElementById("root")!).render(<App />);