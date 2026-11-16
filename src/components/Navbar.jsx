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

  // The open sheet covers the page on small screens; letting the page scroll
  // behind it leaves the menu floating over unrelated content.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const linkClass = ({ isActive }) =>
    [
      "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
      "after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:rounded-full after:transition-colors",
      isActive
        ? "text-navy-900 after:bg-brand-600"
        : "text-ink-500 after:bg-transparent hover:text-navy-900",
    ].join(" ");

  const mobileLinkClass = ({ isActive }) =>
    [
      "rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
      isActive
        ? "bg-brand-50 text-brand-700"
        : "text-ink-700 hover:bg-ink-50 hover:text-navy-900",
    ].join(" ");

  return (
    <header
      className={[
        "sticky top-0 z-40 w-full border-b bg-white/85 backdrop-blur-md backdrop-saturate-150 transition-colors",
        scrolled ? "border-ink-100" : "border-transparent",
      ].join(" ")}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6"
      >
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2.5 rounded-lg transition-opacity hover:opacity-80"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-navy-900 text-white shadow-card">
            <BarChart3 size={17} aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold tracking-tight text-navy-900">
              Praveen Kumar P.
            </span>
            <span className="block text-[11px] font-medium tracking-tight text-ink-500">
              E-commerce MIS Analyst
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-0.5 lg:flex">
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
            className="inline-flex items-center gap-2 rounded-xl bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
          >
            <Download size={15} aria-hidden="true" />
            Resume
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-10 w-10 place-items-center rounded-xl text-navy-900 ring-1 ring-ink-100 transition-colors hover:bg-ink-50 lg:hidden"
        >
          {open ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-nav" className="border-t border-ink-100 bg-white lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={mobileLinkClass}
              >
                {l.label}
              </NavLink>
            ))}
            <a
              href={profile.resumePath}
              download={profile.resumeFileName}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-navy-900 px-4 py-3 text-sm font-semibold text-white"
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
