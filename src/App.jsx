import { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Skills from "./pages/Skills.jsx";
import Projects from "./pages/Projects.jsx";
import Reporting from "./pages/Reporting.jsx";
import Contact from "./pages/Contact.jsx";
import { titleByPath, DEFAULT_TITLE } from "./data/seo.js";

// Pages are imported eagerly so every route can be pre-rendered to real HTML
// at build time and hydrated without a content flash. The heavy chart library
// stays out of the entry bundle: HeroChart and the dashboards load on demand.

function RouteEffects() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    document.title = titleByPath[pathname] ?? DEFAULT_TITLE;
  }, [pathname]);

  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <RouteEffects />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/reporting" element={<Reporting />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
