import { Mail, Download, MapPin, Phone } from "lucide-react";
import { Linkedin, Github } from "../components/BrandIcons.jsx";
import { profile } from "../data/profile.js";
import { PageHeader, Section, Card } from "../components/ui.jsx";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    cta: "Send an email",
    external: false,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: profile.linkedinLabel,
    href: profile.linkedin,
    cta: "Open LinkedIn profile",
    external: true,
  },
  {
    icon: Github,
    label: "GitHub",
    value: profile.githubLabel,
    href: profile.github,
    cta: "Open GitHub profile",
    external: true,
  },
];

export default function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk about e-commerce MIS and marketplace operations"
        intro="The quickest route is email. The resume below is the same PDF used throughout this site."
      />

      <Section>
        <div className="grid gap-5 md:grid-cols-3">
          {channels.map(({ icon: Icon, label, value, href, cta, external }) => (
            <Card key={label} hover className="flex flex-col">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-900 text-white">
                <Icon size={19} aria-hidden="true" />
              </span>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-ink-500">
                {label}
              </p>
              <p className="mt-1.5 flex-1 break-words text-sm font-semibold text-navy-900">
                {value}
              </p>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
              >
                {cta}
              </a>
            </Card>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Card>
            <h2 className="text-base font-bold tracking-tight text-navy-900">
              Resume
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">
              Full career history, skills and education in a single PDF.
            </p>
            <a
              href={profile.resumePath}
              download={profile.resumeFileName}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              <Download size={16} aria-hidden="true" />
              Download Resume (PDF)
            </a>
          </Card>

          <Card>
            <h2 className="text-base font-bold tracking-tight text-navy-900">
              Details
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2.5 text-ink-700">
                <MapPin size={16} className="shrink-0 text-brand-500" aria-hidden="true" />
                {profile.location}
              </li>
              <li className="flex items-center gap-2.5 text-ink-700">
                <Phone size={16} className="shrink-0 text-brand-500" aria-hidden="true" />
                <a href={`tel:${profile.phone}`} className="hover:text-navy-900">
                  {profile.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-ink-700">
                <Mail size={16} className="shrink-0 text-brand-500" aria-hidden="true" />
                <a href={`mailto:${profile.email}`} className="hover:text-navy-900">
                  {profile.email}
                </a>
              </li>
            </ul>
          </Card>
        </div>
      </Section>
    </>
  );
}
