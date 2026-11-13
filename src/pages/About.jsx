import { Download, GraduationCap, Briefcase, CheckCircle2 } from "lucide-react";
import {
  profile,
  experience,
  education,
  competencies,
} from "../data/profile.js";
import { PageHeader, Section, SectionTitle, Card, Pill } from "../components/ui.jsx";

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A career spent turning operational data into reports people act on"
        intro={profile.summary}
      />

      {/* Career journey */}
      <Section>
        <SectionTitle
          eyebrow="Career journey"
          title="From broadcast reporting to e-commerce MIS"
          intro="Nine years of operational reporting, first across cable and broadcast distribution, now across marketplaces. The constant has been the same: take messy operational data, make it reliable, and put it in front of the people making the decisions."
        />

        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {[
            {
              period: "2017 – 2021",
              title: "Reporting foundations",
              body: "Subscriber sales reporting for broadcasters, purchase orders, invoices and ledger reconciliation at Guild Digital Network.",
            },
            {
              period: "2022 – 2024",
              title: "Sales MIS",
              body: "Weekly sales reporting, zone-wise LCO reports and team performance dashboards across Star India and Sony Pictures.",
            },
            {
              period: "2024 – Present",
              title: "E-commerce MIS",
              body: "Marketplace operations, SKU-level inventory, pricing and AI-assisted internal tooling at Jamsticks India.",
            },
          ].map((step) => (
            <Card key={step.period}>
              <Pill tone="blue">{step.period}</Pill>
              <p className="mt-3 text-base font-bold tracking-tight text-navy-900">
                {step.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">{step.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <section className="border-y border-ink-100 bg-ink-50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <SectionTitle
            eyebrow="Professional experience"
            title="Where the work was done"
          />

          <ol className="mt-10 space-y-6">
            {experience.map((job) => (
              <li key={job.company}>
                <Card className="relative overflow-hidden">
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-brand-600"
                    aria-hidden="true"
                  />
                  <div className="flex flex-wrap items-start justify-between gap-3 pl-2">
                    <div>
                      <h3 className="text-lg font-bold tracking-tight text-navy-900">
                        {job.company}
                      </h3>
                      <p className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                        <Briefcase size={14} aria-hidden="true" />
                        {job.role}
                      </p>
                    </div>
                    <Pill tone={job.current ? "navy" : "neutral"}>{job.period}</Pill>
                  </div>

                  <p className="mt-3 pl-2 text-sm leading-relaxed text-ink-700">
                    {job.summary}
                  </p>

                  <ul className="mt-4 space-y-2.5 pl-2">
                    {job.highlights.map((h) => (
                      <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-ink-700">
                        <CheckCircle2
                          size={16}
                          className="mt-0.5 shrink-0 text-brand-500"
                          aria-hidden="true"
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Core competencies */}
      <Section>
        <SectionTitle
          eyebrow="Core competencies"
          title="The skills these roles were built on"
        />
        <div className="mt-8 flex flex-wrap gap-2.5">
          {competencies.map((c) => (
            <span
              key={c}
              className="rounded-full border border-ink-100 bg-white px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:border-brand-300 hover:text-navy-900"
            >
              {c}
            </span>
          ))}
        </div>
      </Section>

      {/* Education */}
      <section className="border-t border-ink-100 bg-ink-50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <SectionTitle eyebrow="Education" title="Academic background" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {education.map((e) => (
              <Card key={e.qualification}>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <GraduationCap size={19} aria-hidden="true" />
                </span>
                <p className="mt-4 text-base font-bold tracking-tight text-navy-900">
                  {e.qualification}
                </p>
                <p className="mt-1 text-sm text-ink-700">{e.institution}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-ink-500">
                  {e.period}
                </p>
              </Card>
            ))}
          </div>

          <div className="mt-10">
            <a
              href={profile.resumePath}
              download={profile.resumeFileName}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              <Download size={17} aria-hidden="true" />
              Download full resume (PDF)
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
