"use client";

import { useMemo, useState } from "react";
import { PageHeader, Pill } from "@/components/admin";
import { customers, inr, type Customer } from "@/lib/data/admin";

export default function CustomersPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Customer>(customers[0]);

  const list = useMemo(
    () => customers.filter((c) => (c.name + c.city + c.tier).toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <div className="flex flex-col gap-4">
      <PageHeader eyebrow="Patrons & Retention" title="Customers" sub="48,210 patrons · 34% repeat · avg LTV ₹4,820.">
        <button className="btn-secondary !py-2.5 !text-[13px]">Export Ledger</button>
        <button className="btn-primary !py-2.5 !text-[13px]">+ Add Patron</button>
      </PageHeader>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          ["Total Patrons", "48,210", "+1,240 this month"],
          ["Repeat Rate", "34%", "+2.1 pts"],
          ["Avg LTV", "₹4,820", "Gold drives 61%"],
          ["Gold Tier", "6,140", "≈ ₹7.6L redeemable"],
        ].map(([l, v, d]) => (
          <div key={l} className="card p-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-text-muted">{l}</div>
            <div className="mt-1 font-display text-[22px] font-semibold">{v}</div>
            <div className="text-[11px] text-text-secondary">{d}</div>
          </div>
        ))}
      </div>

      <div className="card p-3">
        <div className="flex items-center gap-2 px-4 h-11 bg-bg-secondary rounded-full">
          <span className="material-symbols-outlined text-text-muted text-[20px]">search</span>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search patron, city, tier…" className="bg-transparent flex-1 text-[13px] focus:outline-none" />
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-4">
        {/* Ledger */}
        <div className="lg:col-span-7 card p-2 overflow-hidden self-start">
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] min-w-[520px]">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-widest text-text-muted border-b border-border">
                  <th className="py-3 px-3 font-bold">Patron</th>
                  <th className="py-3 px-3 font-bold">Tier</th>
                  <th className="py-3 px-3 font-bold">Orders</th>
                  <th className="py-3 px-3 font-bold text-right">LTV</th>
                </tr>
              </thead>
              <tbody>
                {list.map((c) => (
                  <tr key={c.name} onClick={() => setSelected(c)}
                    className={`cursor-pointer border-b border-border last:border-0 hover:bg-bg-secondary/60 ${selected.name === c.name ? "bg-mist-light/30" : ""}`}>
                    <td className="py-3 px-3">
                      <div className="font-semibold">{c.name}</div>
                      <div className="text-[11px] text-text-muted">{c.city} · {c.dosha}</div>
                    </td>
                    <td className="py-3 px-3"><Pill value={c.tier} /></td>
                    <td className="py-3 px-3">{c.orders}</td>
                    <td className="py-3 px-3 text-right font-bold">{inr(c.ltv)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 360 inspector */}
        <div className="lg:col-span-5 card p-5 self-start">
          <div className="text-[11px] font-bold uppercase tracking-widest text-plum">Patron 360°</div>
          <h2 className="font-display text-[22px] font-semibold mt-0.5">{selected.name}</h2>
          <div className="text-[13px] text-text-secondary">{selected.city} · {selected.dosha} constitution</div>
          <div className="mt-2"><Pill value={selected.tier} /></div>

          <div className="mt-4 rounded-[18px] bg-bg-secondary p-4">
            <div className="text-[11px] font-bold uppercase tracking-widest text-text-muted">Dosha Spectrum</div>
            <div className="mt-2 h-2.5 rounded-full overflow-hidden flex">
              <span className="bg-plum" style={{ width: "45%" }} />
              <span className="bg-coral" style={{ width: "35%" }} />
              <span className="bg-mist" style={{ width: "20%" }} />
            </div>
            <div className="mt-1.5 flex justify-between text-[11px] text-text-secondary">
              <span>Vata 45</span><span>Pitta 35</span><span>Kapha 20</span>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            {[["Orders", String(selected.orders)], ["LTV", inr(selected.ltv)], ["Tier pts", "1,240"]].map(([l, v]) => (
              <div key={l} className="rounded-[18px] border border-border p-2.5">
                <div className="font-bold text-[14px]">{v}</div>
                <div className="text-[11px] text-text-muted">{l}</div>
              </div>
            ))}
          </div>

          <div className="mt-3 text-[13px] flex flex-col gap-1.5">
            <div className="text-[11px] font-bold uppercase tracking-widest text-text-muted">Recent Orders</div>
            {[["Shilajit Resin 20g", "₹899 · Delivered"], ["Ashwagandha 200g", "₹899 · In transit"]].map(([t, s]) => (
              <div key={t} className="flex justify-between border-b border-border pb-1.5 last:border-0">
                <span>{t}</span><span className="text-text-secondary">{s}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-[18px] border border-border p-3 text-[13px]">
            <div className="font-semibold">Clinical Notes</div>
            <p className="text-text-secondary mt-0.5">Tolerating Samyoga pair well. Advised early-morning dosing. — Dr. Rajeshwari</p>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <button className="btn-primary !text-[13px]">Message</button>
            <button className="btn-secondary !text-[13px]">Protocols</button>
          </div>
        </div>
      </div>
    </div>
  );
}
