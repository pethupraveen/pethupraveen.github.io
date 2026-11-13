import { useMemo, useState } from "react";
import { launchTracker } from "../../data/sampleData.js";
import { Card, Stat, Pill } from "../ui.jsx";
import {
  FilterBar,
  ToggleGroup,
  SelectFilter,
  TableWrap,
  th,
  td,
  tdStrong,
} from "./shared.jsx";

const TONE = {
  Live: "green",
  Passed: "green",
  Received: "green",
  "Partially live": "amber",
  "Partially received": "amber",
  "Sample approved": "amber",
  "Sample stage": "amber",
  "PO raised": "blue",
  "In development": "blue",
  Draft: "neutral",
  Pending: "amber",
  "Not created": "neutral",
  "Not started": "neutral",
};

export default function LaunchDashboard() {
  const [stage, setStage] = useState("All");
  const [brand, setBrand] = useState("All brands");

  const brands = useMemo(
    () => ["All brands", ...new Set(launchTracker.map((r) => r.brand))],
    []
  );

  const rows = useMemo(
    () =>
      launchTracker
        .filter((r) => stage === "All" || r.launchStage === stage)
        .filter((r) => brand === "All brands" || r.brand === brand)
        .slice()
        .sort((a, b) => a.launchDate.localeCompare(b.launchDate)),
    [stage, brand]
  );

  const totals = useMemo(() => {
    const upcoming = rows.filter((r) => r.launchStage === "Upcoming").length;
    const launched = rows.filter((r) => r.launchStage === "Launched").length;
    const live = rows.filter((r) => r.listing === "Live").length;
    const pending = rows.length - live;
    return { upcoming, launched, live, pending };
  }, [rows]);

  return (
    <div className="space-y-6">
      <FilterBar>
        <ToggleGroup
          label="Launch stage"
          value={stage}
          onChange={setStage}
          options={[
            { value: "All", label: "All" },
            { value: "Upcoming", label: "Upcoming" },
            { value: "Launched", label: "Launched" },
          ]}
        />
        <SelectFilter
          id="launch-brand"
          label="Brand"
          value={brand}
          onChange={setBrand}
          options={brands}
        />
      </FilterBar>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Upcoming models" value={String(totals.upcoming)} sub="Announced, not yet launched" />
        <Stat label="Launched models" value={String(totals.launched)} sub="Already in market" />
        <Stat label="Listings live" value={String(totals.live)} sub="Accessories live on channel" />
        <Stat label="Listings pending" value={String(totals.pending)} sub="Draft, partial or not created" />
      </div>

      <Card>
        <h3 className="text-sm font-bold tracking-tight text-navy-900">
          Mobile model launch tracker
        </h3>
        <p className="mt-1 mb-4 text-xs text-ink-500">
          Accessory readiness per handset, from sample to live listing. Sample data;
          brand and model names are placeholders.
        </p>
        <TableWrap caption="Mobile model launch tracker, sample data">
          <thead>
            <tr>
              <th scope="col" className={th}>Model</th>
              <th scope="col" className={th}>Brand</th>
              <th scope="col" className={th}>Stage</th>
              <th scope="col" className={th}>Launch date</th>
              <th scope="col" className={th}>Back cover</th>
              <th scope="col" className={th}>Tempered glass</th>
              <th scope="col" className={th}>Procurement</th>
              <th scope="col" className={th}>QC</th>
              <th scope="col" className={th}>Listing</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.model} className="hover:bg-ink-50">
                <td className={tdStrong}>{r.model}</td>
                <td className={td}>{r.brand}</td>
                <td className={td}>
                  <Pill tone={r.launchStage === "Launched" ? "navy" : "blue"}>
                    {r.launchStage}
                  </Pill>
                </td>
                <td className={td}>{r.launchDate}</td>
                <td className={td}>
                  <Pill tone={TONE[r.backCover] ?? "neutral"}>{r.backCover}</Pill>
                </td>
                <td className={td}>
                  <Pill tone={TONE[r.temperedGlass] ?? "neutral"}>{r.temperedGlass}</Pill>
                </td>
                <td className={td}>
                  <Pill tone={TONE[r.procurement] ?? "neutral"}>{r.procurement}</Pill>
                </td>
                <td className={td}>
                  <Pill tone={TONE[r.qc] ?? "neutral"}>{r.qc}</Pill>
                </td>
                <td className={td}>
                  <Pill tone={TONE[r.listing] ?? "neutral"}>{r.listing}</Pill>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td className={td} colSpan={9}>
                  No models match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </TableWrap>
      </Card>
    </div>
  );
}
