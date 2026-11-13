import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { salesTrend } from "../data/sampleData.js";

// Loaded lazily so the hero text paints without waiting for the chart library.
export default function HeroChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={salesTrend} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
        <defs>
          <linearGradient id="homeAmazon" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="homeFlipkart" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis
          dataKey="week"
          tick={{ fontSize: 11, fill: "#64748b" }}
          tickLine={false}
          axisLine={{ stroke: "#e2e8f0" }}
        />
        <YAxis tick={{ fontSize: 11, fill: "#64748b" }} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}
        />
        <Area
          type="monotone"
          dataKey="Amazon"
          stroke="#2563eb"
          strokeWidth={2}
          fill="url(#homeAmazon)"
        />
        <Area
          type="monotone"
          dataKey="Flipkart"
          stroke="#60a5fa"
          strokeWidth={2}
          fill="url(#homeFlipkart)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
