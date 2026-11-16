import { useMemo, useState } from "react";
import { Smartphone, Shield, Layers } from "lucide-react";
import { compatibilityDb } from "../../data/sampleData.js";
import { Card, Pill } from "../ui.jsx";
import { FilterBar, SelectFilter, SearchFilter } from "./shared.jsx";

export default function CompatibilityChecker() {
  const [brand, setBrand] = useState("All brands");
  const [query, setQuery] = useState("");

  const brands = useMemo(
    () => ["All brands", ...new Set(compatibilityDb.map((m) => m.brand))],
    []
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return compatibilityDb
      .filter((m) => brand === "All brands" || m.brand === brand)
      .filter(
        (m) =>
          !q ||
          m.model.toLowerCase().includes(q) ||
          m.brand.toLowerCase().includes(q)
      );
  }, [brand, query]);

  return (
    <div className="space-y-6">
      <FilterBar>
        <SelectFilter
          id="compat-brand"
          label="Brand"
          value={brand}
          onChange={setBrand}
          options={brands}
        />
        <SearchFilter
          id="compat-search"
          label="Search model"
          value={query}
          onChange={setQuery}
          placeholder="e.g. Model S24"
        />
      </FilterBar>

      <p className="text-xs text-ink-500">
        {results.length} {results.length === 1 ? "model" : "models"} in the database
        view. Model names, dimensions and SKU codes are placeholders.
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        {results.map((m) => (
          <Card key={m.model} hover>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-base font-bold tracking-tight text-navy-900">
                  {m.model}
                </p>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-ink-500">
                  {m.brand}
                </p>
              </div>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <Smartphone size={17} aria-hidden="true" />
              </span>
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-ink-50 p-3 text-xs">
              <div>
                <dt className="font-semibold text-ink-500">Dimensions</dt>
                <dd className="mt-0.5 text-ink-700">{m.dimensions}</dd>
              </div>
              <div>
                <dt className="font-semibold text-ink-500">Camera cutout</dt>
                <dd className="mt-0.5 text-ink-700">{m.cameraCutout}</dd>
              </div>
            </dl>

            <div className="mt-5">
              <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-ink-500">
                <Layers size={13} aria-hidden="true" />
                Back cover
              </p>
              <ul className="mt-2 space-y-2">
                {m.backCover.map((c) => (
                  <li
                    key={c.sku}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-ink-100 px-3 py-2 text-sm"
                  >
                    <span className="text-ink-700">
                      {c.type}
                      <span className="ml-2 text-xs text-ink-500">{c.sku}</span>
                    </span>
                    <Pill tone={c.fit === "Exact fit" ? "green" : "amber"}>{c.fit}</Pill>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-ink-500">
                <Shield size={13} aria-hidden="true" />
                Tempered glass
              </p>
              <ul className="mt-2 space-y-2">
                {m.temperedGlass.map((c) => (
                  <li
                    key={c.sku}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-ink-100 px-3 py-2 text-sm"
                  >
                    <span className="text-ink-700">
                      {c.type}
                      <span className="ml-2 text-xs text-ink-500">{c.sku}</span>
                    </span>
                    <Pill tone={c.fit === "Exact fit" ? "green" : "amber"}>{c.fit}</Pill>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>

      {results.length === 0 && (
        <Card>
          <p className="text-sm text-ink-700">
            No models match that search. Try a different brand or clear the search box.
          </p>
        </Card>
      )}
    </div>
  );
}
