import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X, Download, BarChart3 } from "lucide-react";
import { profile } from "../data/profile.js";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/projects", label: "Projects" },
  { to: "/reporting", label: "Excel & Reporting" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const linkClass = ({ isActive }) =>
    [
      "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
      isActive
        ? "bg-brand-50 text-brand-700"
        : "text-ink-700 hover:bg-ink-50 hover:text-navy-900",
    ].join(" ");

  return (
    <header
      className={[
        "sticky top-0 z-40 w-full border-b bg-white/90 backdrop-blur transition-shadow",
        scrolled ? "border-ink-100 shadow-sm" : "border-transparent",
      ].join(" ")}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6"
      >
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-navy-900 text-white">
            <BarChart3 size={18} aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold tracking-tight text-navy-900">
              Praveen Kumar P.
            </span>
            <span className="block text-[11px] font-medium text-ink-500">
              E-commerce MIS Analyst
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:block">
          <a
            href={profile.resumePath}
            download={profile.resumeFileName}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            <Download size={16} aria-hidden="true" />
            Resume
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-10 w-10 place-items-center rounded-lg border border-ink-100 text-navy-900 lg:hidden"
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-nav" className="border-t border-ink-100 bg-white lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === "/"} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
            <a
              href={profile.resumePath}
              download={profile.resumeFileName}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white"
            >
              <Download size={16} aria-hidden="true" />
              Download Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
