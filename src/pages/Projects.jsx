import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  Boxes,
  Smartphone,
  SearchCheck,
  Store,
  ArrowRight,
  Check,
} from "lucide-react";
import { projects, projectCategories } from "../data/projects.js";
import { PageHeader, Section, Card, Pill } from "../components/ui.jsx";

const ICONS = { BarChart3, Boxes, Smartphone, SearchCheck, Store };

export default function Projects() {
  const [active, setActive] = useState("All");

  const visible = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((p) => p.category === active),
    [active]
  );

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Five case studies from marketplace operations"
        intro="Each one describes the problem, what the tool or report shows, and the workflow behind it. No sales figures or employer results appear here; the interactive versions on the Excel & Reporting page run on clearly labelled sample data."
      />

      <Section>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter projects by category"
        >
          {projectCategories.map((cat) => {
            const isActive = cat === active;
            const count =
              cat === "All"
                ? projects.length
                : projects.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                aria-pressed={isActive}
                className={[
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  isActive
                    ? "bg-navy-900 text-white"
                    : "border border-ink-100 bg-white text-ink-700 hover:border-brand-300 hover:text-navy-900",
                ].join(" ")}
              >
                {cat}
                <span
                  className={isActive ? "ml-2 text-brand-300" : "ml-2 text-ink-300"}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-10 space-y-8">
          {visible.map((p) => {
            const Icon = ICONS[p.icon] ?? BarChart3;
            return (
              <article key={p.id} id={p.id}>
                <Card className="overflow-hidden p-0">
                  <div className="grid lg:grid-cols-[1fr_1.15fr]">
                    {/* Left: identity */}
                    <div className="relative overflow-hidden bg-navy-900 p-7 text-white sm:p-9">
                      <div className="grid-backdrop absolute inset-0" aria-hidden="true" />
                      <div
                        className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-600/25 blur-3xl"
                        aria-hidden="true"
                      />
                      <div className="relative">
                        <div className="flex items-center justify-between gap-3">
                          <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15">
                            <Icon size={20} aria-hidden="true" />
                          </span>
                          <span className="text-2xl font-extrabold tracking-tight text-white/20">
                            {p.number}
                          </span>
                        </div>

                        <h2 className="mt-5 text-xl font-bold leading-snug tracking-tight text-balance sm:text-2xl">
                          {p.title}
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-brand-300">
                          {p.tagline}
                        </p>
                        <p className="mt-4 text-sm leading-relaxed text-ink-300">
                          {p.context}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-2">
                          {p.stack.map((s) => (
                            <span
                              key={s}
                              className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/15"
                            >
                              {s}
                            </span>
                          ))}
                        </div>

                        {p.demo && (
                          <Link
                            to={`/reporting#${p.demo}`}
                            className="mt-7 inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
                          >
                            Open the sample dashboard
                            <ArrowRight size={15} aria-hidden="true" />
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* Right: detail */}
                    <div className="p-7 sm:p-9">
                      <Pill tone="blue">{p.category}</Pill>

                      <h3 className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-ink-500">
                        What it shows
                      </h3>
                      <ul className="mt-3 space-y-2.5">
                        {p.shows.map((s) => (
                          <li
                            key={s}
                            className="flex gap-2.5 text-sm leading-relaxed text-ink-700"
                          >
                            <Check
                              size={15}
                              className="mt-0.5 shrink-0 text-brand-500"
                              aria-hidden="true"
                            />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>

                      <h3 className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-ink-500">
                        Workflow
                      </h3>
                      <ol className="mt-3 space-y-3">
                        {p.workflow.map((w, i) => (
                          <li key={w} className="flex gap-3 text-sm leading-relaxed text-ink-700">
                            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-ink-50 text-xs font-extrabold text-navy-900">
                              {i + 1}
                            </span>
                            <span>{w}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </Card>
              </article>
            );
          })}
        </div>
      </Section>
    </>
  );
}
