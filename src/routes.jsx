import { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import Coursework from "./Coursework";
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
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/coursework" element={<Coursework />} />
        <Route path="*">404 Not Found</Route>
      </Routes>{" "}
    </HashRouter>
  );
}
