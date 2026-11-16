import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import { Linkedin, Github } from "./BrandIcons.jsx";
import { profile } from "../data/profile.js";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-navy-900 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold tracking-tight">{profile.name}</p>
          <p className="mt-1 text-sm font-medium text-brand-300">{profile.title}</p>
          <p className="mt-4 flex items-center gap-2 text-sm text-ink-300">
            <MapPin size={15} aria-hidden="true" />
            {profile.location}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">
            Pages
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {[
              ["/", "Home"],
              ["/about", "About"],
              ["/skills", "Skills"],
              ["/projects", "Projects"],
              ["/reporting", "Excel & Reporting"],
              ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-ink-300 transition-colors hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">
            Contact
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 text-ink-300 transition-colors hover:text-white"
              >
                <Mail size={15} aria-hidden="true" />
                {profile.email}
              </a>
            </li>
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-ink-300 transition-colors hover:text-white"
              >
                <Linkedin size={15} aria-hidden="true" />
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-ink-300 transition-colors hover:text-white"
              >
                <Github size={15} aria-hidden="true" />
                {profile.githubLabel}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-800">
        <div className="mx-auto max-w-6xl px-4 py-7 text-xs leading-relaxed text-ink-300 sm:px-6">
          <p>© {year} {profile.name}. All rights reserved.</p>
          <p className="mt-2 max-w-3xl">
            Dashboards on this site use clearly labelled sample data created for
            demonstration. They do not contain sales figures, campaign results or
            confidential information from any employer or client.
          </p>
        </div>
      </div>
    </footer>
  );
}
