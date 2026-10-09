"use client";

import { useMemo, useState } from "react";
import { PageHeader, Pill } from "@/components/admin";
import { inr, stockRows, type StockRow } from "@/lib/data/admin";

const cats = ["All", "Powders", "Resins", "Tablets", "Oils", "Kwath"] as const;

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [adjust, setAdjust] = useState<StockRow | null>(null);
  const [delta, setDelta] = useState(0);

  const list = useMemo(() => {
    let l = [...stockRows];
    if (query) l = l.filter((r) => (r.name + r.sku + r.batch).toLowerCase().includes(query.toLowerCase()));
    return l;
  }, [query]);

  const bar = (units: number) => Math.min(100, Math.round((units / 450) * 100));

  return (
    <div className="flex flex-col gap-4">
      <PageHeader eyebrow="Catalogue & Inventory" title="Products & Stock" sub="6,420 units across Delhi + Bengaluru hubs.">
        <button className="btn-secondary !py-2.5 !text-[13px]">Import CSV</button>
        <button className="btn-primary !py-2.5 !text-[13px]">+ New Formulation</button>
      </PageHeader>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          ["Total SKUs", "36", "0 out of stock"],
          ["Stock Value", "₹41.2L", "+850 units tomorrow"],
          ["Critical (<15)", "2 SKUs", "Triphala · Gokshura"],
          ["In Quarantine", "1 SKU", "Brahmi lab assay"],
        ].map(([l, v, d]) => (
          <div key={l} className="card p-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-text-muted">{l}</div>
            <div className="mt-1 font-display text-[22px] font-semibold">{v}</div>
            <div className="text-[11px] text-text-secondary">{d}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)}
            className={`shrink-0 px-4 py-2 rounded-full text-[13px] font-semibold border ${cat === c ? "bg-primary text-white border-primary" : "bg-white border-border"}`}>
            {c === "All" ? "All Categories" : c}
          </button>
        ))}
      </div>

      <div className="card p-3">
        <div className="flex items-center gap-2 px-4 h-11 bg-bg-secondary rounded-full">
          <span className="material-symbols-outlined text-text-muted text-[20px]">search</span>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search formulation, SKU, batch…" className="bg-transparent flex-1 text-[13px] focus:outline-none" />
        </div>
      </div>

      <div className="card p-2 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] min-w-[760px]">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-widest text-text-muted border-b border-border">
                <th className="py-3 px-3 font-bold">Formulation & SKU</th>
                <th className="py-3 px-3 font-bold">Batch / Hub</th>
                <th className="py-3 px-3 font-bold">Stock</th>
                <th className="py-3 px-3 font-bold">Price</th>
                <th className="py-3 px-3 font-bold">Status</th>
                <th className="py-3 px-3 font-bold text-right">Adjust</th>
              </tr>
            </thead>
            <tbody>
              {list.map((r) => (
                <tr key={r.sku} className="border-b border-border last:border-0 hover:bg-bg-secondary/60">
                  <td className="py-3 px-3">
                    <div className="font-semibold">{r.name}</div>
                    <div className="text-[11px] text-text-muted">{r.sku}</div>
                  </td>
                  <td className="py-3 px-3 text-text-secondary">#{r.batch}<div className="text-[11px] text-text-muted">{r.hub}</div></td>
                  <td className="py-3 px-3 min-w-[170px]">
                    <div className="font-bold">{r.units} units</div>
                    <div className="mt-1 h-1.5 rounded-full bg-bg-secondary overflow-hidden">
                      <div className={`h-full rounded-full ${r.status === "Critical" ? "bg-danger" : r.status === "Low" ? "bg-coral" : r.status === "Draft" ? "bg-text-muted" : "bg-success"}`} style={{ width: `${bar(r.units)}%` }} />
                    </div>
                  </td>
                  <td className="py-3 px-3 font-bold">{inr(r.price)}</td>
                  <td className="py-3 px-3"><Pill value={r.status} /></td>
                  <td className="py-3 px-3 text-right">
                    <button onClick={() => { setAdjust(r); setDelta(0); }} aria-label={`Adjust ${r.name}`}
                      className="w-9 h-9 inline-grid place-items-center rounded-full hover:bg-bg-secondary text-text-secondary hover:text-primary">
                      <span className="material-symbols-outlined text-[20px]">tune</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {[
          ["Delhi North Hub", "6,420 units · 21 SKUs", "Triphala reserve +850 tomorrow"],
          ["Bengaluru South Hub", "4,190 units · 15 SKUs", "Taila reserve healthy"],
        ].map(([h, s, n]) => (
          <div key={h} className="card p-4 flex items-center gap-3">
            <span className="w-11 h-11 rounded-full bg-mist-light grid place-items-center text-primary shrink-0">
              <span className="material-symbols-outlined">warehouse</span>
            </span>
            <div>
              <div className="font-semibold text-[14px]">{h}</div>
              <div className="text-[12px] text-text-secondary">{s} · {n}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Stock adjust drawer */}
      {adjust && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-primary-dark/50" onClick={() => setAdjust(null)} />
          <aside className="absolute right-0 top-0 bottom-0 w-full max-w-[400px] bg-bg overflow-y-auto p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-plum">Quick Stock Adjustment</div>
                <h2 className="font-display text-[20px] font-semibold">{adjust.name}</h2>
                <div className="text-[12px] text-text-muted">{adjust.sku} · #{adjust.batch}</div>
              </div>
              <button onClick={() => setAdjust(null)} aria-label="Close" className="w-10 h-10 grid place-items-center rounded-full hover:bg-bg-secondary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="card p-4 mt-4 text-[13px]">
              <div className="flex justify-between"><span>Current</span><strong>{adjust.units} units</strong></div>
              <div className="flex justify-between mt-1"><span>Location</span><span className="text-text-secondary">{adjust.hub}</span></div>
            </div>
            <div className="card p-4 mt-3">
              <div className="text-[12px] font-bold uppercase tracking-widest text-text-muted">Adjustment</div>
              <div className="mt-2 flex items-center gap-3">
                <button onClick={() => setDelta(delta - 10)} className="w-11 h-11 rounded-full border border-border bg-white font-bold">−10</button>
                <span className={`flex-1 text-center font-display text-2xl font-semibold ${delta < 0 ? "text-danger" : delta > 0 ? "text-success" : ""}`}>
                  {delta > 0 ? `+${delta}` : delta}
                </span>
                <button onClick={() => setDelta(delta + 10)} className="w-11 h-11 rounded-full border border-border bg-white font-bold">+10</button>
              </div>
              <div className="mt-2 text-[13px] text-text-secondary">Result: <strong className="text-text">{adjust.units + delta} units</strong></div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4 pb-4">
              <button className="btn-primary !text-[13px]" onClick={() => setAdjust(null)}>Confirm</button>
              <button className="btn-secondary !text-[13px]" onClick={() => setAdjust(null)}>Transfer Hub</button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
