import {
  Store,
  ShoppingBag,
  ListChecks,
  Boxes,
  FileSpreadsheet,
  Table2,
  Tags,
  Megaphone,
  Sparkles,
  Check,
} from "lucide-react";
import { skillGroups } from "../data/profile.js";
import { PageHeader, Section, SectionTitle, Card } from "../components/ui.jsx";

const ICONS = {
  Store,
  ShoppingBag,
  ListChecks,
  Boxes,
  FileSpreadsheet,
  Table2,
  Tags,
  Megaphone,
  Sparkles,
};

export default function Skills() {
  return (
    <>
      <PageHeader
        eyebrow="Skills"
        title="Nine areas of day-to-day practice"
        intro="Grouped the way the work actually splits: the platforms the catalog lives on, the data that keeps it stocked and priced, and the reporting that makes both visible."
      />

      <Section>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => {
            const Icon = ICONS[group.icon] ?? Store;
            return (
              <Card
                key={group.name}
                hover className="flex flex-col"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-900 text-white">
                  <Icon size={20} aria-hidden="true" />
                </span>

                <h2 className="mt-4 text-base font-bold tracking-tight text-navy-900">
                  {group.name}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">
                  {group.blurb}
                </p>

                <ul className="mt-5 space-y-2 border-t border-ink-100 pt-4">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-sm leading-relaxed text-ink-700"
                    >
                      <Check
                        size={15}
                        className="mt-0.5 shrink-0 text-brand-500"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
      </Section>

      <section className="border-t border-ink-100 bg-ink-50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <SectionTitle
            eyebrow="How these fit together"
            title="One operating loop, repeated every week"
            intro="The skills above are not separate tracks. They run as a single cycle across the catalog."
          />

          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ["List", "Create and maintain the listing on each channel."],
              ["Stock", "Monitor SKU availability and replenishment needs."],
              ["Price", "Check competitor pricing and update where needed."],
              ["Promote", "Run PLA and marketplace ad campaigns for visibility."],
              ["Report", "Publish the sales, inventory and listing status report."],
            ].map(([step, body], i) => (
              <li key={step}>
                <Card className="h-full">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-sm font-extrabold text-brand-700">
                    {i + 1}
                  </span>
                  <p className="mt-3 text-sm font-bold uppercase tracking-widest text-navy-900">
                    {step}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-700">{body}</p>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
