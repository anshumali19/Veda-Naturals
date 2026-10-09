"use client";

import { useMemo, useState } from "react";
import { PageHeader, Pill } from "@/components/admin";
import { adminOrders, inr, type AdminOrder } from "@/lib/data/admin";

const tabs = ["All Orders", "Pending Review", "Pending Verification", "Dispatched", "Delivered", "Cancelled"] as const;

export default function OrdersPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All Orders");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<AdminOrder>(adminOrders[0]);
  const [drawer, setDrawer] = useState(false);

  const list = useMemo(() => {
    let l = [...adminOrders];
    if (tab !== "All Orders") l = l.filter((o) => o.status === tab);
    if (query) l = l.filter((o) => (o.id + o.customer + o.city).toLowerCase().includes(query.toLowerCase()));
    return l;
  }, [tab, query]);

  const open = (o: AdminOrder) => {
    setSelected(o);
    setDrawer(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <PageHeader eyebrow="Logistics & Order Processing" title="Orders" sub="18 COD orders queued for verification.">
        <button className="btn-secondary !py-2.5 !text-[13px]">
          <span className="material-symbols-outlined text-[18px]">file_download</span> Export
        </button>
        <button className="btn-primary !py-2.5 !text-[13px]">+ Manual Order</button>
      </PageHeader>

      <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
        {tabs.map((t) => {
          const n = t === "All Orders" ? adminOrders.length : adminOrders.filter((o) => o.status === t).length;
          return (
            <button key={t} onClick={() => setTab(t)}
              className={`shrink-0 px-4 py-2 rounded-full text-[13px] font-semibold border ${tab === t ? "bg-primary text-white border-primary" : "bg-white border-border"}`}>
              {t} <span className="opacity-60">· {n}</span>
            </button>
          );
        })}
      </div>

      <div className="card p-3 flex flex-col md:flex-row gap-2">
        <div className="flex-1 flex items-center gap-2 px-4 h-11 bg-bg-secondary rounded-full">
          <span className="material-symbols-outlined text-text-muted text-[20px]">search</span>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search order ID, patron, city…" className="bg-transparent flex-1 text-[13px] focus:outline-none" />
        </div>
        <div className="flex gap-2">
          {["COD", "Prepaid UPI", "BlueDart", "Delhivery"].map((f) => (
            <span key={f} className="px-3.5 h-11 inline-flex items-center rounded-full border border-border bg-white text-[12px] font-semibold">{f}</span>
          ))}
        </div>
      </div>

      <div className="card p-2 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] min-w-[720px]">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-widest text-text-muted border-b border-border">
                <th className="py-3 px-3 font-bold">Order</th>
                <th className="py-3 px-3 font-bold">Customer</th>
                <th className="py-3 px-3 font-bold">Items</th>
                <th className="py-3 px-3 font-bold">Total</th>
                <th className="py-3 px-3 font-bold">Payment</th>
                <th className="py-3 px-3 font-bold">Carrier</th>
                <th className="py-3 px-3 font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {list.map((o) => (
                <tr key={o.id} onClick={() => open(o)}
                  className={`cursor-pointer border-b border-border last:border-0 hover:bg-bg-secondary/60 ${selected.id === o.id && drawer ? "bg-mist-light/30" : ""}`}>
                  <td className="py-3 px-3 font-bold">#{o.id}</td>
                  <td className="py-3 px-3">{o.customer}<div className="text-[11px] text-text-muted">{o.city} · {o.date}</div></td>
                  <td className="py-3 px-3">{o.items}</td>
                  <td className="py-3 px-3 font-bold">{inr(o.total)}</td>
                  <td className="py-3 px-3 text-text-secondary">{o.payment}</td>
                  <td className="py-3 px-3 text-text-secondary">{o.carrier}<div className="text-[11px] text-text-muted">{o.carrierNote}</div></td>
                  <td className="py-3 px-3"><Pill value={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {list.length === 0 && <div className="p-8 text-center text-text-secondary text-[13px]">No orders in this view.</div>}
      </div>

      {/* Inspection drawer */}
      {drawer && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-primary-dark/50" onClick={() => setDrawer(false)} />
          <aside className="absolute right-0 top-0 bottom-0 w-full max-w-[440px] bg-bg overflow-y-auto p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-plum">Inspection</div>
                <h2 className="font-display text-[22px] font-semibold">Order #{selected.id}</h2>
              </div>
              <button onClick={() => setDrawer(false)} aria-label="Close" className="w-10 h-10 grid place-items-center rounded-full hover:bg-bg-secondary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="mt-2"><Pill value={selected.status} /></div>

            <div className="card p-4 mt-4">
              <div className="font-semibold text-[14px]">{selected.customer}</div>
              <div className="text-[13px] text-text-secondary">{selected.city} · +91 98765 43210</div>
              <div className="text-[13px] text-text-secondary mt-1">Flat 402, Vrindavan Heights, Indiranagar — 560038</div>
            </div>

            <div className="card p-4 mt-3">
              <div className="text-[11px] font-bold uppercase tracking-widest text-text-muted">Financials</div>
              <div className="mt-2 text-[13px] flex flex-col gap-1.5">
                <div className="flex justify-between"><span>Items ({selected.items})</span><span className="font-semibold">{inr(selected.total)}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span className="text-success font-semibold">FREE</span></div>
                <div className="flex justify-between"><span>GST (incl.)</span><span>{inr(Math.round(selected.total * 0.107))}</span></div>
                <div className="border-t border-border pt-1.5 flex justify-between font-bold"><span>Total</span><span>{inr(selected.total)} ({selected.payment})</span></div>
              </div>
            </div>

            <div className="card p-4 mt-3">
              <div className="text-[11px] font-bold uppercase tracking-widest text-text-muted">Dispatch Trail</div>
              <div className="mt-2 flex flex-col gap-3">
                {[["Created", "OTP verified · " + selected.date, true], ["QC Verified", "Batch assay passed", selected.status !== "Pending Verification" && selected.status !== "Pending Review"], ["Manifest Picked Up", selected.carrier, selected.status === "Dispatched" || selected.status === "Delivered"], ["Delivered", "Handshake + feedback", selected.status === "Delivered"]].map(([t, d, done]) => (
                  <div key={t as string} className="flex gap-2.5">
                    <span className={`w-5 h-5 rounded-full grid place-items-center shrink-0 ${done ? "bg-primary text-white" : "bg-bg-secondary text-text-muted"}`}>
                      <span className="material-symbols-outlined text-[13px]">{done ? "check" : "schedule"}</span>
                    </span>
                    <div><div className="text-[13px] font-semibold">{t}</div><div className="text-[12px] text-text-secondary">{d}</div></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4 pb-4">
              <button className="btn-primary !text-[13px]" onClick={() => setDrawer(false)}>Approve Dispatch</button>
              <button className="btn-secondary !text-[13px]" onClick={() => setDrawer(false)}>Hold for Review</button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
