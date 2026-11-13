import { Info } from "lucide-react";

export function PageHeader({ eyebrow, title, intro }) {
  return (
    <section className="relative overflow-hidden border-b border-navy-800 bg-navy-900 text-white">
      <div className="grid-backdrop absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-brand-600/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        {eyebrow && (
          <p className="animate-fade-in text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 animate-fade-up text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-3xl animate-fade-up text-base leading-relaxed text-ink-300 sm:text-lg">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}

export function Section({ children, className = "" }) {
  return (
    <section className={`mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 ${className}`}>
      {children}
    </section>
  );
}

export function SectionTitle({ eyebrow, title, intro, align = "left" }) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-navy-900 text-balance sm:text-3xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-3 text-base leading-relaxed text-ink-700">{intro}</p>
      )}
    </div>
  );
}

export function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-ink-100 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] ${className}`}
    >
      {children}
    </div>
  );
}

export function SampleDataNotice({ children, className = "" }) {
  return (
    <p
      className={`flex items-start gap-2 rounded-xl border border-brand-100 bg-brand-50 px-4 py-3 text-xs leading-relaxed text-brand-700 ${className}`}
    >
      <Info size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

export function SampleBadge({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-700 ring-1 ring-brand-100 ${className}`}
    >
      Sample data
    </span>
  );
}

export function Stat({ label, value, sub }) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-ink-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-extrabold tracking-tight text-navy-900 tabular-nums">
        {value}
      </p>
      {sub && <p className="mt-1 text-xs text-ink-500">{sub}</p>}
    </div>
  );
}

const PILL_TONES = {
  neutral: "bg-ink-50 text-ink-700 ring-ink-100",
  blue: "bg-brand-50 text-brand-700 ring-brand-100",
  navy: "bg-navy-900 text-white ring-navy-900",
  amber: "bg-amber-50 text-amber-700 ring-amber-200",
  red: "bg-red-50 text-red-700 ring-red-200",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

export function Pill({ children, tone = "neutral", className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${PILL_TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
