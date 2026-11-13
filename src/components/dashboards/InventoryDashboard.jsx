import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  inventoryFlow,
  inventoryAgeing,
  purchaseOrders,
  reorderList,
  categories,
} from "../../data/sampleData.js";
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

const URGENCY_TONE = { Critical: "red", High: "amber", Medium: "neutral" };
const PO_TONE = {
  Closed: "green",
  "Partially received": "amber",
  "In transit": "blue",
  "Awaiting dispatch": "neutral",
};

export default function InventoryDashboard() {
  const [category, setCategory] = useState("All");

  const pos = useMemo(
    () =>
      category === "All"
        ? purchaseOrders
        : purchaseOrders.filter((p) => p.category === category),
    [category]
  );

  const totals = useMemo(() => {
    const ordered = pos.reduce((s, p) => s + p.ordered, 0);
    const received = pos.reduce((s, p) => s + p.received, 0);
    const pending = pos.reduce((s, p) => s + p.pending, 0);
    const open = pos.filter((p) => p.pending > 0).length;
    return { ordered, received, pending, open };
  }, [pos]);

  return (
    <div className="space-y-6">
      <FilterBar>
        <ToggleGroup
          label="Category"
          value={category}
          onChange={setCategory}
          options={["All", ...categories].map((c) => ({ value: c, label: c }))}
        />
      </FilterBar>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Stock ordered" value={totals.ordered.toLocaleString("en-IN")} sub="Units on PO" />
        <Stat label="Stock received" value={totals.received.toLocaleString("en-IN")} sub="Units booked in" />
        <Stat label="Pending stock" value={totals.pending.toLocaleString("en-IN")} sub="Ordered minus received" />
        <Stat label="Open purchase orders" value={String(totals.open)} sub="With pending quantity" />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <h3 className="text-sm font-bold tracking-tight text-navy-900">
            Stock ordered, received and pending
          </h3>
          <p className="mt-1 text-xs text-ink-500">Units by month, sample data</p>
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={inventoryFlow} margin={{ top: 4, right: 8, left: -12, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="month" {...axisProps} />
                <YAxis {...axisProps} axisLine={false} />
                <Tooltip {...chartTooltip} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="ordered" name="Ordered" fill="#93c5fd" radius={[6, 6, 0, 0]} />
                <Bar dataKey="received" name="Received" fill="#2563eb" radius={[6, 6, 0, 0]} />
                <Line
                  type="monotone"
                  dataKey="pending"
                  name="Pending"
                  stroke="#0b1b3a"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <h3 className="text-sm font-bold tracking-tight text-navy-900">
            Inventory ageing
          </h3>
          <p className="mt-1 text-xs text-ink-500">Units by days on hand, sample data</p>
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={inventoryAgeing}
                layout="vertical"
                margin={{ top: 4, right: 16, left: 24, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                <XAxis type="number" {...axisProps} axisLine={false} />
                <YAxis type="category" dataKey="bucket" width={86} {...axisProps} />
                <Tooltip {...chartTooltip} />
                <Bar dataKey="units" name="Units" fill="#2563eb" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-sm font-bold tracking-tight text-navy-900">
          Purchase order tracker
        </h3>
        <p className="mt-1 mb-4 text-xs text-ink-500">
          {pos.length} purchase orders, sample data
        </p>
        <TableWrap caption="Purchase order tracker, sample data">
          <thead>
            <tr>
              <th scope="col" className={th}>PO number</th>
              <th scope="col" className={th}>Vendor</th>
              <th scope="col" className={th}>Category</th>
              <th scope="col" className={thNum}>Ordered</th>
              <th scope="col" className={thNum}>Received</th>
              <th scope="col" className={thNum}>Pending</th>
              <th scope="col" className={th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {pos.map((p) => (
              <tr key={p.po} className="hover:bg-ink-50">
                <td className={tdStrong}>{p.po}</td>
                <td className={td}>{p.vendor}</td>
                <td className={td}>{p.category}</td>
                <td className={tdNum}>{p.ordered.toLocaleString("en-IN")}</td>
                <td className={tdNum}>{p.received.toLocaleString("en-IN")}</td>
                <td className={tdNum}>{p.pending.toLocaleString("en-IN")}</td>
                <td className={td}>
                  <Pill tone={PO_TONE[p.status] ?? "neutral"}>{p.status}</Pill>
                </td>
              </tr>
            ))}
            {pos.length === 0 && (
              <tr>
                <td className={td} colSpan={7}>
                  No purchase orders in this category.
                </td>
              </tr>
            )}
          </tbody>
        </TableWrap>
      </Card>

      <Card>
        <h3 className="text-sm font-bold tracking-tight text-navy-900">
          Reorder tracking
        </h3>
        <p className="mt-1 mb-4 text-xs text-ink-500">
          SKUs at or below their reorder level, sample data
        </p>
        <TableWrap caption="Reorder tracking, sample data">
          <thead>
            <tr>
              <th scope="col" className={th}>SKU</th>
              <th scope="col" className={thNum}>Available</th>
              <th scope="col" className={thNum}>Reorder level</th>
              <th scope="col" className={thNum}>Suggested order</th>
              <th scope="col" className={th}>Urgency</th>
            </tr>
          </thead>
          <tbody>
            {reorderList.map((r) => (
              <tr key={r.sku} className="hover:bg-ink-50">
                <td className={tdStrong}>{r.sku}</td>
                <td className={tdNum}>{r.available}</td>
                <td className={tdNum}>{r.reorderLevel}</td>
                <td className={tdNum}>{r.suggested}</td>
                <td className={td}>
                  <Pill tone={URGENCY_TONE[r.urgency] ?? "neutral"}>{r.urgency}</Pill>
                </td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </Card>
    </div>
  );
}
