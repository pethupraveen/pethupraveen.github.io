import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import {
  Download,
  ArrowRight,
  Mail,
  MapPin,
  Store,
  ShoppingBag,
  Boxes,
  FileSpreadsheet,
  Tags,
  Sparkles,
} from "lucide-react";
import { Linkedin, Github } from "../components/BrandIcons.jsx";
import { profile, marketplaces } from "../data/profile.js";
import { projects } from "../data/projects.js";
import { SAMPLE_NOTICE } from "../data/sampleData.js";
import { Section, SectionTitle, Card, SampleBadge, Pill } from "../components/ui.jsx";

const HeroChart = lazy(() => import("../components/HeroChart.jsx"));

const capabilities = [
  {
    icon: Store,
    title: "Marketplace operations",
    body: "Listings, catalog updates and channel-wise listing health across Amazon, Flipkart and Myntra.",
  },
  {
    icon: Boxes,
    title: "Inventory & procurement",
    body: "SKU-level stock monitoring, replenishment needs and purchase order tracking through to availability.",
  },
  {
    icon: FileSpreadsheet,
    title: "MIS reporting",
    body: "Excel reports and dashboards covering sales, inventory and listing status for operational review.",
  },
  {
    icon: Tags,
    title: "Pricing management",
    body: "Competitor price monitoring with manual and automated price updates coordinated across channels.",
  },
  {
    icon: ShoppingBag,
    title: "Shopify operations",
    body: "Product management, theme customization for product pages and gift-box bundle configuration.",
  },
  {
    icon: Sparkles,
    title: "AI-assisted tooling",
    body: "Internal web tools for operational tracking, inventory visibility and product compatibility checking.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="grid-backdrop absolute inset-0" aria-hidden="true" />
        <div
          className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-brand-600/25 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -right-32 -bottom-24 h-96 w-96 rounded-full bg-brand-500/15 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="inline-flex animate-fade-in items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-brand-300 ring-1 ring-white/15">
              <MapPin size={13} aria-hidden="true" />
              {profile.location}
            </p>

            <h1 className="mt-5 animate-fade-up text-4xl font-extrabold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {profile.name}
            </h1>

            <p className="mt-4 animate-fade-up text-xl font-semibold text-brand-300 sm:text-2xl">
              {profile.title}
            </p>

            <p className="mt-3 animate-fade-up text-sm font-medium leading-relaxed text-ink-300 sm:text-base">
              {profile.subtitle}
            </p>

            <p className="mt-6 max-w-xl animate-fade-up text-base leading-relaxed text-ink-300">
              {profile.summary}
            </p>

            <div className="mt-8 flex animate-fade-up flex-col gap-3 sm:flex-row">
              <a
                href={profile.resumePath}
                download={profile.resumeFileName}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
              >
                <Download size={17} aria-hidden="true" />
                Download Resume
              </a>
              <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-6 py-3.5 text-sm font-semibold text-white ring-1 ring-white/20 transition-colors hover:bg-white/15"
              >
                Explore My Projects
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 text-ink-300 transition-colors hover:text-white"
              >
                <Mail size={15} aria-hidden="true" />
                {profile.email}
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-ink-300 transition-colors hover:text-white"
              >
                <Linkedin size={15} aria-hidden="true" />
                LinkedIn
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-ink-300 transition-colors hover:text-white"
              >
                <Github size={15} aria-hidden="true" />
                GitHub
              </a>
            </div>
          </div>

          {/* Dashboard preview */}
          <div className="animate-fade-up rounded-2xl bg-white/[0.07] p-2 ring-1 ring-white/15 backdrop-blur">
            <div className="rounded-xl bg-white p-5 shadow-float">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-ink-500">
                    Channel sales trend
                  </p>
                  <p className="mt-1 text-sm font-bold text-navy-900">
                    Weekly units by marketplace
                  </p>
                </div>
                <SampleBadge />
              </div>

              <div className="mt-4 h-56" aria-hidden="true">
                <Suspense
                  fallback={
                    <div className="h-full w-full animate-pulse rounded-lg bg-ink-50" />
                  }
                >
                  <HeroChart />
                </Suspense>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 border-t border-ink-100 pt-4">
                {[
                  ["Channels", "4"],
                  ["Dashboards", "5"],
                  ["Case studies", String(projects.length)],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-500">
                      {label}
                    </p>
                    <p className="mt-0.5 text-lg font-extrabold text-navy-900 tabular-nums">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <p className="px-3 py-2.5 text-[11px] leading-relaxed text-ink-300">
              {SAMPLE_NOTICE}
            </p>
          </div>
        </div>
      </section>

      {/* Marketplace expertise */}
      <Section>
        <SectionTitle
          eyebrow="Marketplace expertise"
          title="Operating the same catalog across four platforms"
          intro="Each channel has its own catalog rules, stock handling and campaign tools. Day-to-day work keeps listings correct, in stock and priced consistently on all of them."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {marketplaces.map((m) => (
            <Card key={m.name} hover>
              <p className="text-lg font-bold tracking-tight text-navy-900">{m.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">{m.detail}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Capabilities */}
      <section className="border-y border-ink-100 bg-ink-50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <SectionTitle
            eyebrow="What I do"
            title="Reporting, inventory and marketplace operations"
            intro="The work sits between the marketplace back ends and the people who need to act on what they say."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(({ icon: Icon, title, body }) => (
              <Card key={title} hover>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon size={19} aria-hidden="true" />
                </span>
                <p className="mt-4 text-base font-bold tracking-tight text-navy-900">
                  {title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">{body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Project teaser */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionTitle
            eyebrow="Selected work"
            title="Dashboards and tools built for daily operations"
          />
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            View all case studies
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {projects.slice(0, 3).map((p) => (
            <Card key={p.id} hover className="flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-widest text-ink-300">
                  {p.number}
                </span>
                <Pill tone="blue">{p.category}</Pill>
              </div>
              <p className="mt-4 text-lg font-bold leading-snug tracking-tight text-navy-900">
                {p.title}
              </p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-700">
                {p.tagline}
              </p>
              <Link
                to="/projects"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
              >
                Read the case study
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      {/* Contact CTA */}
      <Section className="pt-0">
        <div className="relative overflow-hidden rounded-3xl bg-navy-900 px-6 py-12 text-white sm:px-12 sm:py-14">
          <div className="grid-backdrop absolute inset-0" aria-hidden="true" />
          <div
            className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-600/25 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">
                Looking for an MIS analyst who knows marketplace operations?
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-300 sm:text-base">
                Open to e-commerce MIS, marketplace operations and inventory
                analytics roles. The full resume is one click away.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <a
                href={profile.resumePath}
                download={profile.resumeFileName}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
              >
                <Download size={17} aria-hidden="true" />
                Download Resume
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-6 py-3.5 text-sm font-semibold text-white ring-1 ring-white/20 transition-colors hover:bg-white/15"
              >
                Get in touch
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
