import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";

// Secondary pages load on demand so the landing page ships the smallest bundle.
const About = lazy(() => import("./pages/About.jsx"));
const Skills = lazy(() => import("./pages/Skills.jsx"));
const Projects = lazy(() => import("./pages/Projects.jsx"));
const Reporting = lazy(() => import("./pages/Reporting.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));

function PageFallback() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6" aria-busy="true">
      <div className="h-8 w-2/3 animate-pulse rounded-lg bg-ink-50" />
      <div className="mt-4 h-4 w-1/2 animate-pulse rounded-lg bg-ink-50" />
      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-40 animate-pulse rounded-2xl bg-ink-50" />
        ))}
      </div>
      <span className="sr-only">Loading page</span>
    </div>
  );
}

const PAGE_TITLES = {
  "/": "Praveen Kumar Pethumanickam — E-commerce MIS Analyst",
  "/about": "About — Praveen Kumar Pethumanickam",
  "/skills": "Skills — Praveen Kumar Pethumanickam",
  "/projects": "Projects — Praveen Kumar Pethumanickam",
  "/reporting": "Excel & Reporting — Praveen Kumar Pethumanickam",
  "/contact": "Contact — Praveen Kumar Pethumanickam",
};

function RouteEffects() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    document.title =
      PAGE_TITLES[pathname] ?? "Praveen Kumar Pethumanickam — E-commerce MIS Analyst";
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
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/reporting" element={<Reporting />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
