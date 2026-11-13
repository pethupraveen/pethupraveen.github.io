import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { skuPerformance, channels, categories } from "../../data/sampleData.js";
import { Card, Stat, Pill } from "../ui.jsx";
import {
  FilterBar,
  ToggleGroup,
  SearchFilter,
  TableWrap,
  axisProps,
  chartTooltip,
  th,
  thNum,
  td,
  tdNum,
  tdStrong,
} from "./shared.jsx";

const STATUS_TONE = {
  Live: "green",
  "Low stock": "amber",
  "Out of stock": "red",
};

export default function SkuDashboard() {
  const [channel, setChannel] = useState("All");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("units30");
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return skuPerformance
      .filter((r) => channel === "All" || r.channel === channel)
      .filter((r) => category === "All" || r.category === category)
      .filter(
        (r) =>
          !q ||
          r.sku.toLowerCase().includes(q) ||
          r.product.toLowerCase().includes(q)
      )
      .slice()
      .sort((a, b) => b[sort] - a[sort]);
  }, [channel, category, sort, query]);

  const totals = useMemo(() => {
    const units30 = rows.reduce((s, r) => s + r.units30, 0);
    const units90 = rows.reduce((s, r) => s + r.units90, 0);
    const outOfStock = rows.filter((r) => r.available === 0).length;
    const top = rows[0];
    return { units30, units90, outOfStock, top };
  }, [rows]);

  const chartData = useMemo(
    () =>
      rows.slice(0, 8).map((r) => ({
        sku: r.sku,
        "30-day": r.units30,
        "90-day": r.units90,
      })),
    [rows]
  );

  return (
    <div className="space-y-6">
      <FilterBar>
        <ToggleGroup
          label="Channel"
          value={channel}
          onChange={setChannel}
          options={["All", ...channels].map((c) => ({ value: c, label: c }))}
        />
        <ToggleGroup
          label="Category"
          value={category}
          onChange={setCategory}
          options={["All", ...categories].map((c) => ({ value: c, label: c }))}
        />
        <ToggleGroup
          label="Sort by"
          value={sort}
          onChange={setSort}
          options={[
            { value: "units30", label: "30-day units" },
            { value: "units90", label: "90-day units" },
            { value: "available", label: "Availability" },
          ]}
        />
        <SearchFilter
          id="sku-search"
          label="Search SKU or product"
          value={query}
          onChange={setQuery}
          placeholder="e.g. TG-SG24 or tempered"
        />
      </FilterBar>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="SKUs in view" value={String(rows.length)} sub="After filters" />
        <Stat
          label="Units — 30 days"
          value={totals.units30.toLocaleString("en-IN")}
          sub="Filtered total"
        />
        <Stat
          label="Units — 90 days"
          value={totals.units90.toLocaleString("en-IN")}
          sub="Filtered total"
        />
        <Stat
          label="Out of stock"
          value={String(totals.outOfStock)}
          sub={totals.top ? `Top SKU: ${totals.top.sku}` : "No SKUs in view"}
        />
      </div>

      <Card>
        <h3 className="text-sm font-bold tracking-tight text-navy-900">
          SKU performance — 30-day vs 90-day
        </h3>
        <p className="mt-1 text-xs text-ink-500">
          Top {chartData.length} SKUs in the current filter, sample data
        </p>
        <div className="mt-5 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 4, right: 8, left: -18, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="sku"
                {...axisProps}
                angle={-35}
                textAnchor="end"
                height={60}
                interval={0}
              />
              <YAxis {...axisProps} axisLine={false} />
              <Tooltip {...chartTooltip} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="30-day" fill="#2563eb" radius={[6, 6, 0, 0]} />
              <Bar dataKey="90-day" fill="#93c5fd" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <h3 className="text-sm font-bold tracking-tight text-navy-900">
          SKU-wise detail
        </h3>
        <p className="mt-1 mb-4 text-xs text-ink-500">
          Sales, availability and listing status side by side, sample data
        </p>
        <TableWrap caption="SKU performance detail, sample data">
          <thead>
            <tr>
              <th scope="col" className={th}>SKU</th>
              <th scope="col" className={th}>Product</th>
              <th scope="col" className={th}>Channel</th>
              <th scope="col" className={thNum}>30-day</th>
              <th scope="col" className={thNum}>90-day</th>
              <th scope="col" className={thNum}>Available</th>
              <th scope="col" className={th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.sku} className="hover:bg-ink-50">
                <td className={tdStrong}>{r.sku}</td>
                <td className={td}>{r.product}</td>
                <td className={td}>{r.channel}</td>
                <td className={tdNum}>{r.units30}</td>
                <td className={tdNum}>{r.units90}</td>
                <td className={tdNum}>{r.available}</td>
                <td className={td}>
                  <Pill tone={STATUS_TONE[r.status] ?? "neutral"}>{r.status}</Pill>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td className={td} colSpan={7}>
                  No SKUs match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </TableWrap>
      </Card>
    </div>
  );
}
