import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root")!);

if (window.location.pathname.startsWith("/admin")) {
  void import("./AdminProviders").then(({ AdminProviders }) => root.render(<AdminProviders><App /></AdminProviders>));
} else {
  root.render(<App />);
}
import "@fontsource-variable/figtree";
