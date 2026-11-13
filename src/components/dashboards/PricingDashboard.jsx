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
import { pricingTracker, channels } from "../../data/sampleData.js";
import { Card, Stat, Pill } from "../ui.jsx";
import {
  FilterBar,
  ToggleGroup,
  TableWrap,
  axisProps,
  chartTooltip,
  th,
  thNum,
  td,
  tdNum,
  tdStrong,
} from "./shared.jsx";

function position(row) {
  if (row.ourPrice < row.marketLow) return { label: "Below market", tone: "green" };
  if (row.ourPrice > row.marketHigh) return { label: "Above market", tone: "red" };
  return { label: "Within range", tone: "blue" };
}

export default function PricingDashboard() {
  const [channel, setChannel] = useState("All");

  const rows = useMemo(
    () =>
      channel === "All"
        ? pricingTracker
        : pricingTracker.filter((r) => r.channel === channel),
    [channel]
  );

  const summary = useMemo(() => {
    const counts = { "Below market": 0, "Within range": 0, "Above market": 0 };
    rows.forEach((r) => {
      counts[position(r).label] += 1;
    });
    return counts;
  }, [rows]);

  const chartData = useMemo(
    () =>
      rows.map((r) => ({
        sku: r.sku,
        "Our price": r.ourPrice,
        "Market low": r.marketLow,
        "Market high": r.marketHigh,
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
      </FilterBar>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="SKUs tracked" value={String(rows.length)} sub="In current filter" />
        <Stat label="Below market low" value={String(summary["Below market"])} sub="Priced under the observed range" />
        <Stat label="Within range" value={String(summary["Within range"])} sub="Between market low and high" />
        <Stat label="Above market high" value={String(summary["Above market"])} sub="Review candidates" />
      </div>

      <Card>
        <h3 className="text-sm font-bold tracking-tight text-navy-900">
          Our price against the observed market range
        </h3>
        <p className="mt-1 text-xs text-ink-500">Rupees per unit, sample data</p>
        <div className="mt-5 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 4, right: 8, left: -10, bottom: 40 }}>
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
              <Bar dataKey="Market low" fill="#cbd5e1" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Our price" fill="#2563eb" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Market high" fill="#93c5fd" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <h3 className="text-sm font-bold tracking-tight text-navy-900">
          Pricing tracker
        </h3>
        <p className="mt-1 mb-4 text-xs text-ink-500">
          Competitor range, current price and last update, sample data
        </p>
        <TableWrap caption="Pricing tracker, sample data">
          <thead>
            <tr>
              <th scope="col" className={th}>SKU</th>
              <th scope="col" className={th}>Product</th>
              <th scope="col" className={th}>Channel</th>
              <th scope="col" className={thNum}>Our price</th>
              <th scope="col" className={thNum}>Market low</th>
              <th scope="col" className={thNum}>Market high</th>
              <th scope="col" className={th}>Position</th>
              <th scope="col" className={th}>Last updated</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const pos = position(r);
              return (
                <tr key={r.sku} className="hover:bg-ink-50">
                  <td className={tdStrong}>{r.sku}</td>
                  <td className={td}>{r.product}</td>
                  <td className={td}>{r.channel}</td>
                  <td className={tdNum}>₹{r.ourPrice}</td>
                  <td className={tdNum}>₹{r.marketLow}</td>
                  <td className={tdNum}>₹{r.marketHigh}</td>
                  <td className={td}>
                    <Pill tone={pos.tone}>{pos.label}</Pill>
                  </td>
                  <td className={td}>{r.lastUpdated}</td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td className={td} colSpan={8}>
                  No SKUs tracked on this channel.
                </td>
              </tr>
            )}
          </tbody>
        </TableWrap>
      </Card>
    </div>
  );
}
