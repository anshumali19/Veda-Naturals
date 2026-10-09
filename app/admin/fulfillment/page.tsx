"use client";

import { useState } from "react";
import { PageHeader } from "@/components/admin";
import { fulfillmentQueue } from "@/lib/data/admin";

export default function FulfillmentPage() {
  const [done, setDone] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-4">
      <PageHeader eyebrow="Dispatch Console · Delhi Hub" title="Fulfillment" sub="Evening air slots · BlueDart + Delhivery manifests.">
        <button className="btn-secondary !py-2.5 !text-[13px]">Print Labels</button>
        <button className="btn-primary !py-2.5 !text-[13px]">Close Manifest</button>
      </PageHeader>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          ["To Pack", "58", "18 COD verify"],
          ["Packed & Ready", "34", "BlueDart 22 · Delhivery 12"],
          ["Manifested", "112", "evening air slot"],
          ["Exceptions", "4", "QC hold 3 · RTO 1"],
        ].map(([l, v, d]) => (
          <div key={l} className="card p-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-text-muted">{l}</div>
            <div className="mt-1 font-display text-[22px] font-semibold">{v}</div>
            <div className="text-[11px] text-text-secondary">{d}</div>
          </div>
        ))}
      </div>

      <div className="card p-4 flex flex-col sm:flex-row sm:items-center gap-3">
        <span className="w-11 h-11 rounded-full bg-mist-light grid place-items-center text-primary shrink-0">
          <span className="material-symbols-outlined">flight_takeoff</span>
        </span>
        <div className="flex-1">
          <div className="font-semibold text-[14px]">BlueDart Evening Air Slot — cutoff 6:30 PM</div>
          <div className="text-[12px] text-text-secondary">22 packed · labels verified · dock B</div>
        </div>
        <div className="flex gap-1.5">
          {["BlueDart Express", "Delhivery Surface"].map((c, i) => (
            <span key={c} className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold ${i === 0 ? "bg-primary text-white" : "bg-bg-secondary text-text-secondary"}`}>{c}</span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {fulfillmentQueue.map((q) => {
          const isDone = done.includes(q.id);
          return (
            <div key={q.id} className={`card p-5 ${isDone ? "opacity-60" : ""}`}>
              <div className="flex flex-wrap items-center gap-2 justify-between">
                <div className="font-bold text-[16px]">#{q.id} <span className="font-normal text-text-secondary text-[13px]">· {q.customer}</span></div>
                <span className="px-3 py-1 rounded-full bg-mist-light text-primary text-[12px] font-bold">{q.carrier}</span>
              </div>
              <div className="mt-1 text-[12px] font-bold uppercase tracking-widest text-plum">{isDone ? "Dispatched ✓" : q.state}</div>
              <div className="mt-2 text-[13px]"><strong>Items:</strong> {q.items}</div>
              <div className="mt-1 text-[13px] text-text-secondary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-coral">ac_unit</span> {q.note}
              </div>
              {!isDone && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <button onClick={() => setDone([...done, q.id])} className="btn-primary !py-2.5 !px-5 !text-[13px]">Mark Dispatched</button>
                  <button className="btn-secondary !py-2.5 !px-5 !text-[13px]">Reprint Label</button>
                  <button className="btn-secondary !py-2.5 !px-5 !text-[13px]">QC Hold</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
