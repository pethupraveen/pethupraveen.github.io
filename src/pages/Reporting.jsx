import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SalesDashboard from "../components/dashboards/SalesDashboard.jsx";
import InventoryDashboard from "../components/dashboards/InventoryDashboard.jsx";
import SkuDashboard from "../components/dashboards/SkuDashboard.jsx";
import PricingDashboard from "../components/dashboards/PricingDashboard.jsx";
import LaunchDashboard from "../components/dashboards/LaunchDashboard.jsx";
import CompatibilityChecker from "../components/dashboards/CompatibilityChecker.jsx";
import { PageHeader, Section, SampleDataNotice } from "../components/ui.jsx";
import { SAMPLE_NOTICE } from "../data/sampleData.js";

const TABS = [
  {
    id: "sales",
    label: "Sales MIS",
    heading: "Sales MIS dashboard",
    blurb:
      "Channel-wise and period-wise sales, the 30-day against 90-day comparison, and the listing status split for the same catalog.",
    Component: SalesDashboard,
  },
  {
    id: "inventory",
    label: "Inventory",
    heading: "Inventory dashboard",
    blurb:
      "Purchase orders from raised to received, the pending quantity that follows, inventory ageing and the reorder list.",
    Component: InventoryDashboard,
  },
  {
    id: "sku",
    label: "SKU performance",
    heading: "SKU performance dashboard",
    blurb:
      "SKU-level sales filtered by channel and category, with availability and listing status read alongside the numbers.",
    Component: SkuDashboard,
  },
  {
    id: "pricing",
    label: "Pricing tracker",
    heading: "Pricing tracker",
    blurb:
      "Each SKU's current price against the observed competitor range, flagged where it sits outside that range.",
    Component: PricingDashboard,
  },
  {
    id: "launch",
    label: "Product launch",
    heading: "Product launch tracker",
    blurb:
      "Upcoming and launched handsets with back cover and tempered glass readiness, procurement, QC and listing status.",
    Component: LaunchDashboard,
  },
  {
    id: "compatibility",
    label: "Compatibility",
    heading: "Product compatibility checker",
    blurb:
      "Brand-wise model search returning the back cover and tempered glass SKUs that fit a given handset.",
    Component: CompatibilityChecker,
  },
];

export default function Reporting() {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(() => {
    const id = hash.replace("#", "");
    return TABS.some((t) => t.id === id) ? id : "sales";
  });

  useEffect(() => {
    const id = hash.replace("#", "");
    if (TABS.some((t) => t.id === id)) setActive(id);
  }, [hash]);

  const select = (id) => {
    setActive(id);
    navigate(`/reporting#${id}`, { replace: true });
  };

  const tab = TABS.find((t) => t.id === active) ?? TABS[0];
  const { Component } = tab;

  return (
    <>
      <PageHeader
        eyebrow="Excel & Reporting"
        title="Interactive versions of the reports I build"
        intro="Six working dashboards covering sales, inventory, SKU performance, pricing, product launches and compatibility. Use the filters — every view responds. All figures are sample data created for this site."
      />

      <Section>
        <SampleDataNotice className="mb-8">
          <strong className="font-bold">{SAMPLE_NOTICE}</strong>{" "}
          SKU codes, brand names, model names, prices and quantities are invented
          placeholders. These dashboards demonstrate report structure and filtering
          logic, not any employer&rsquo;s results.
        </SampleDataNotice>

        <div
          className="flex flex-wrap gap-2 border-b border-ink-100 pb-4"
          role="tablist"
          aria-label="Dashboard"
        >
          {TABS.map((t) => {
            const isActive = t.id === active;
            return (
              <button
                key={t.id}
                id={`tab-${t.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${t.id}`}
                onClick={() => select(t.id)}
                className={[
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  isActive
                    ? "bg-navy-900 text-white"
                    : "border border-ink-100 bg-white text-ink-700 hover:border-brand-300 hover:text-navy-900",
                ].join(" ")}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <div
          id={`panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          tabIndex={-1}
          className="pt-8"
        >
          <div className="mb-6 max-w-3xl">
            <h2 className="text-xl font-bold tracking-tight text-navy-900 sm:text-2xl">
              {tab.heading}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">{tab.blurb}</p>
          </div>

          <Component />
        </div>
      </Section>
    </>
  );
}
