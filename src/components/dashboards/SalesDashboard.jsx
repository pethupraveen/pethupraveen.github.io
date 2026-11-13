import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  channels,
  channelColors,
  channelSales,
  salesTrend,
  listingStatus,
  listingStatusColors,
} from "../../data/sampleData.js";
import { Card, Stat } from "../ui.jsx";
import { FilterBar, ToggleGroup, chartTooltip, axisProps } from "./shared.jsx";

export default function SalesDashboard() {
  const [period, setPeriod] = useState("30");
  const [channel, setChannel] = useState("All");

  const rows = useMemo(
    () =>
      channel === "All"
        ? channelSales
        : channelSales.filter((r) => r.channel === channel),
    [channel]
  );

  const key = period === "30" ? "units30" : "units90";

  const totals = useMemo(() => {
    const units = rows.reduce((sum, r) => sum + r[key], 0);
    const orders = rows.reduce((sum, r) => sum + r.orders30, 0);
    const listings = rows.reduce((sum, r) => sum + r.listings, 0);
    const units30 = rows.reduce((sum, r) => sum + r.units30, 0);
    const units90 = rows.reduce((sum, r) => sum + r.units90, 0);
    const dailyRecent = units30 / 30;
    const dailyLong = units90 / 90;
    const shift = dailyLong ? ((dailyRecent - dailyLong) / dailyLong) * 100 : 0;
    return { units, orders, listings, shift };
  }, [rows, key]);

  const compareData = useMemo(
    () =>
      rows.map((r) => ({
        channel: r.channel,
        "30-day": r.units30,
        "90-day": r.units90,
      })),
    [rows]
  );

  const trendKeys = channel === "All" ? channels : [channel];

  return (
    <div className="space-y-6">
      <FilterBar>
        <ToggleGroup
          label="Period"
          value={period}
          onChange={setPeriod}
          options={[
            { value: "30", label: "30 days" },
            { value: "90", label: "90 days" },
          ]}
        />
        <ToggleGroup
          label="Channel"
          value={channel}
          onChange={setChannel}
          options={["All", ...channels].map((c) => ({ value: c, label: c }))}
        />
      </FilterBar>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          label={`Units — ${period} days`}
          value={totals.units.toLocaleString("en-IN")}
          sub={channel === "All" ? "All channels" : channel}
        />
        <Stat
          label="Orders — 30 days"
          value={totals.orders.toLocaleString("en-IN")}
          sub="Sample order count"
        />
        <Stat
          label="Active listings"
          value={totals.listings.toLocaleString("en-IN")}
          sub="Live SKU count"
        />
        <Stat
          label="Daily run rate shift"
          value={`${totals.shift >= 0 ? "+" : ""}${totals.shift.toFixed(1)}%`}
          sub="30-day pace vs 90-day pace"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <h3 className="text-sm font-bold tracking-tight text-navy-900">
            Channel-wise sales — 30-day vs 90-day
          </h3>
          <p className="mt-1 text-xs text-ink-500">Units sold, sample data</p>
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={compareData} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="channel" {...axisProps} />
                <YAxis {...axisProps} axisLine={false} />
                <Tooltip {...chartTooltip} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="30-day" fill="#2563eb" radius={[6, 6, 0, 0]} />
                <Bar dataKey="90-day" fill="#93c5fd" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <h3 className="text-sm font-bold tracking-tight text-navy-900">
            Listing status split
          </h3>
          <p className="mt-1 text-xs text-ink-500">Catalog-wide, sample data</p>
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={listingStatus}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="52%"
                  outerRadius="82%"
                  paddingAngle={2}
                >
                  {listingStatus.map((entry, i) => (
                    <Cell
                      key={entry.name}
                      fill={listingStatusColors[i % listingStatusColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip {...chartTooltip} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-sm font-bold tracking-tight text-navy-900">
          Sales trend — weekly units
        </h3>
        <p className="mt-1 text-xs text-ink-500">
          {channel === "All" ? "All channels" : channel}, sample data
        </p>
        <div className="mt-5 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesTrend} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="week" {...axisProps} />
              <YAxis {...axisProps} axisLine={false} />
              <Tooltip {...chartTooltip} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              {trendKeys.map((c) => (
                <Line
                  key={c}
                  type="monotone"
                  dataKey={c}
                  stroke={channelColors[c]}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
