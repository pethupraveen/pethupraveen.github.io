export const axisProps = {
  tick: { fontSize: 11, fill: "#64748b" },
  tickLine: false,
  axisLine: { stroke: "#e2e8f0" },
};

export const chartTooltip = {
  contentStyle: {
    borderRadius: 12,
    border: "1px solid #e2e8f0",
    fontSize: 12,
    boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
  },
  cursor: { fill: "rgba(37,99,235,0.06)" },
};

export function FilterBar({ children }) {
  return (
    <div className="flex flex-wrap items-end gap-x-8 gap-y-4 rounded-2xl border border-ink-100 bg-ink-50 p-4">
      {children}
    </div>
  );
}

export function ToggleGroup({ label, value, onChange, options }) {
  return (
    <div>
      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-ink-500">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label={label}>
        {options.map((opt) => {
          const isActive = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              aria-pressed={isActive}
              className={[
                "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                isActive
                  ? "bg-navy-900 text-white"
                  : "border border-ink-100 bg-white text-ink-700 hover:border-brand-300 hover:text-navy-900",
              ].join(" ")}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function SelectFilter({ label, value, onChange, options, id }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-ink-500"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-ink-100 bg-white px-3 py-2 text-sm font-medium text-navy-900 shadow-sm"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

export function SearchFilter({ label, value, onChange, placeholder, id }) {
  return (
    <div className="min-w-[14rem] flex-1">
      <label
        htmlFor={id}
        className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-ink-500"
      >
        {label}
      </label>
      <input
        id={id}
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-ink-100 bg-white px-3 py-2 text-sm text-navy-900 shadow-sm placeholder:text-ink-300"
      />
    </div>
  );
}

export function TableWrap({ children, caption }) {
  return (
    <div className="-mx-6 overflow-x-auto px-6">
      <table className="w-full min-w-[46rem] border-collapse text-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        {children}
      </table>
    </div>
  );
}

export const th =
  "border-b border-ink-100 px-3 py-2.5 text-left text-[10px] font-bold uppercase tracking-[0.14em] text-ink-500 whitespace-nowrap";
export const thNum = `${th} text-right`;
export const td = "border-b border-ink-50 px-3 py-2.5 text-ink-700 align-middle";
export const tdNum = `${td} text-right tabular-nums`;
export const tdStrong = `${td} font-semibold text-navy-900`;
