import { Info } from "lucide-react";

export function PageHeader({ eyebrow, title, intro }) {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      <div className="grid-backdrop absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-brand-600/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        {eyebrow && (
          <p className="eyebrow-rule animate-fade-in text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-4 animate-fade-up text-3xl font-extrabold leading-[1.1] tracking-tight text-balance sm:text-4xl lg:text-[2.875rem]">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-2xl animate-fade-up text-base leading-[1.7] text-ink-300 sm:text-lg">
            {intro}
          </p>
        )}
      </div>
      {/* Hairline that fades out, instead of a hard border against the page. */}
      <div
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}

export function Section({ children, className = "" }) {
  return (
    <section className={`mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 ${className}`}>
      {children}
    </section>
  );
}

export function SectionTitle({ eyebrow, title, intro, align = "left" }) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p className="eyebrow-rule text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 text-2xl font-bold leading-[1.18] tracking-tight text-navy-900 text-balance sm:text-[1.75rem]">
        {title}
      </h2>
      {intro && (
        <p className="mt-4 text-base leading-[1.7] text-ink-700">{intro}</p>
      )}
    </div>
  );
}

export function Card({ children, hover = false, className = "" }) {
  return (
    <div
      className={[
        "rounded-2xl bg-white p-6 shadow-card ring-1 ring-ink-100",
        hover &&
          "transition duration-200 hover:-translate-y-0.5 hover:shadow-card-hover hover:ring-brand-100",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

export function SampleDataNotice({ children, className = "" }) {
  return (
    <p
      className={`flex items-start gap-2.5 rounded-xl bg-brand-50 px-4 py-3 text-xs leading-relaxed text-brand-700 ring-1 ring-brand-100 ${className}`}
    >
      <Info size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

export function SampleBadge({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-brand-700 ring-1 ring-brand-100 ${className}`}
    >
      Sample data
    </span>
  );
}

export function Stat({ label, value, sub }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-ink-100">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">
        {label}
      </p>
      <p className="mt-2.5 text-[1.75rem] font-extrabold leading-none tracking-tight text-navy-900 tabular-nums">
        {value}
      </p>
      {sub && <p className="mt-2 text-xs leading-relaxed text-ink-500">{sub}</p>}
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
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${PILL_TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
