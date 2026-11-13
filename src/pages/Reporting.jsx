import { useEffect, useState, lazy, Suspense } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PageHeader, Section, SampleDataNotice } from "../components/ui.jsx";
import { SAMPLE_NOTICE } from "../data/sampleData.js";

// The dashboards carry the chart library, so they load on demand rather than
// in the entry bundle. The page itself pre-renders with its headings intact.
const SalesDashboard = lazy(() => import("../components/dashboards/SalesDashboard.jsx"));
const InventoryDashboard = lazy(() => import("../components/dashboards/InventoryDashboard.jsx"));
const SkuDashboard = lazy(() => import("../components/dashboards/SkuDashboard.jsx"));
const PricingDashboard = lazy(() => import("../components/dashboards/PricingDashboard.jsx"));
const LaunchDashboard = lazy(() => import("../components/dashboards/LaunchDashboard.jsx"));
const CompatibilityChecker = lazy(() => import("../components/dashboards/CompatibilityChecker.jsx"));

function DashboardFallback() {
  return (
    <div className="space-y-6" aria-busy="true">
      <div className="h-20 animate-pulse rounded-2xl bg-ink-50" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-2xl bg-ink-50" />
        ))}
      </div>
      <div className="h-80 animate-pulse rounded-2xl bg-ink-50" />
      <span className="sr-only">Loading dashboard</span>
    </div>
  );
}

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
  // Starts on the first tab so the pre-rendered markup and the first client
  // render agree; the effect below switches to the hash target immediately.
  const [active, setActive] = useState("sales");

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

          <Suspense fallback={<DashboardFallback />}>
            <Component />
          </Suspense>
        </div>
      </Section>
    </>
  );
}
