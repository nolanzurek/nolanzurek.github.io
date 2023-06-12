import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import useLocalStorage from "use-local-storage";
import Home from "./Home";
import Notes from "./Notes";
import Projects from "./Projects";

export default function Website() {
  const [theme, setTheme] = useLocalStorage(
    "theme",
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="*">404 Not Found</Route>
      </Routes>{" "}
    </BrowserRouter>
  );
}

//ReactDOM.createRoot(document.getElementById("root")).render(<Website />);
