import Link from "next/link";
import { PageHeader, Pill } from "@/components/admin";
import { adminOrders, dashboardKpis, inr } from "@/lib/data/admin";

const donut = [
  { label: "Delivered", pct: 64, color: "#3D8B68" },
  { label: "In-Transit", pct: 18, color: "#9BBBD8" },
  { label: "Processing", pct: 11, color: "#6D3F68" },
  { label: "RTO", pct: 4, color: "#E99587" },
  { label: "Cancelled", pct: 3, color: "#D95C5C" },
];

const top = [
  { name: "Himalayan Shilajit Resin", meta: "184 dispatched", rev: "₹1,65,416" },
  { name: "Ashwagandha Root Powder", meta: "142 dispatched", rev: "₹95,708" },
  { name: "Nirogi Pachan Churna", meta: "88 dispatched", rev: "₹34,760" },
  { name: "Triphala Shodhan Tablets", meta: "61 dispatched", rev: "₹42,700" },
];

const alerts = [
  { icon: "warning", cls: "text-danger", t: "Triphala Shodhan Tablets — 14 units", d: "Critical: below 15-unit limit · Bengaluru B-04" },
  { icon: "warning", cls: "text-danger", t: "Gokshura Vigor Powder — 8 units", d: "Critical: Delhi B-08 · PO pending" },
  { icon: "science", cls: "text-success", t: "NABL batch SHJ-24-14 approved", d: "Shilajit 78.4% fulvic acid · released to Vault" },
];

export default function AdminDashboard() {
  // Donut geometry: r=54, C≈339.3
  const C = 2 * Math.PI * 54;
  const segs = donut.reduce<{ label: string; pct: number; color: string; dash: string; off: number }[]>(
    (out, s) => {
      const start = out.reduce((sum, x) => sum + x.pct, 0);
      return [...out, { ...s, dash: `${((s.pct / 100) * C).toFixed(1)} ${C.toFixed(1)}`, off: -((start / 100) * C) }];
    },
    []
  );

  return (
    <div className="flex flex-col gap-5">
      <PageHeader eyebrow="Command & Control" title="Executive Dashboard & Fulfillment Overview" sub="Dispensary sales, packaging lines and dispatch velocity.">
        <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-border text-[13px] font-medium">
          <span className="material-symbols-outlined text-[18px]">calendar_today</span> Oct 1 – Oct 31, 2024
        </span>
        <button className="btn-secondary !py-2.5">
          <span className="material-symbols-outlined text-[18px]">file_download</span> Report
        </button>
      </PageHeader>

      {/* KPI matrix */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {dashboardKpis.map((k) => (
          <div key={k.label} className="card p-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">{k.label}</span>
              <span className="material-symbols-outlined text-[18px] text-primary">{k.icon}</span>
            </div>
            <div className="mt-2 font-display text-[22px] font-semibold">{k.value}</div>
            <div className="text-[11px] text-success font-semibold mt-0.5">{k.delta}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-4">
        {/* Revenue chart */}
        <div className="lg:col-span-8 card p-5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="font-semibold text-[15px]">Revenue & Order Trajectory</h2>
            <div className="flex gap-1.5">
              {["7D", "30D", "90D"].map((t, i) => (
                <span key={t} className={`px-3 py-1 rounded-full text-[12px] font-semibold ${i === 1 ? "bg-primary text-white" : "bg-bg-secondary text-text-secondary"}`}>{t}</span>
              ))}
            </div>
          </div>
          <svg viewBox="0 0 720 220" className="w-full mt-3" role="img" aria-label="Revenue trajectory">
            <defs>
              <linearGradient id="revFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#6D3F68" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#6D3F68" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[30, 80, 130, 180].map((y) => (
              <line key={y} x1="40" x2="710" y1={y} y2={y} stroke="#E8E5E2" strokeWidth="1" />
            ))}
            <path d="M40,170 C120,160 160,120 240,118 C320,116 360,140 430,100 C500,60 560,70 640,44 L640,200 L40,200 Z" fill="url(#revFill)" />
            <path d="M40,170 C120,160 160,120 240,118 C320,116 360,140 430,100 C500,60 560,70 640,44" fill="none" stroke="#17233D" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="640" cy="44" r="5" fill="#E99587" stroke="#fff" strokeWidth="2" />
            <text x="640" y="200" textAnchor="middle" fontSize="10" fill="#98A2B3">Day 24 · ₹1,18,400</text>
          </svg>
          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-[13px]">
            <span><strong>₹94,843</strong> <span className="text-text-secondary">avg daily</span></span>
            <span className="text-success font-semibold">4.82% (+0.6%) conversion</span>
          </div>
        </div>

        {/* Donut */}
        <div className="lg:col-span-4 card p-5">
          <h2 className="font-semibold text-[15px]">Fulfillment Status</h2>
          <div className="flex items-center gap-4 mt-2">
            <svg viewBox="0 0 130 130" className="w-[130px] h-[130px] -rotate-90">
              <circle cx="65" cy="65" r="54" fill="none" stroke="#F5F3F1" strokeWidth="14" />
              {segs.map((s) => (
                <circle key={s.label} cx="65" cy="65" r="54" fill="none" stroke={s.color} strokeWidth="14"
                  strokeDasharray={s.dash} strokeDashoffset={s.off} strokeLinecap="butt" />
              ))}
            </svg>
            <div className="flex flex-col gap-1.5 text-[12px]">
              {donut.map((s) => (
                <span key={s.label} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                  {s.label} <strong>{s.pct}%</strong>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-4">
        {/* Live orders */}
        <div className="lg:col-span-8 card p-5 overflow-hidden">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-[15px]">Recent Live Orders</h2>
            <Link href="/admin/orders" className="text-[13px] font-bold text-plum">Open Orders →</Link>
          </div>
          <div className="mt-3 overflow-x-auto -mx-5 px-5">
            <table className="w-full text-[13px] min-w-[560px]">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-widest text-text-muted border-b border-border">
                  <th className="py-2 pr-3 font-bold">Order</th>
                  <th className="py-2 pr-3 font-bold">Customer</th>
                  <th className="py-2 pr-3 font-bold">Total</th>
                  <th className="py-2 pr-3 font-bold">Payment</th>
                  <th className="py-2 font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                {adminOrders.slice(0, 6).map((o) => (
                  <tr key={o.id} className="border-b border-border last:border-0">
                    <td className="py-2.5 pr-3 font-bold">#{o.id}</td>
                    <td className="py-2.5 pr-3">{o.customer}</td>
                    <td className="py-2.5 pr-3 font-bold">{inr(o.total)}</td>
                    <td className="py-2.5 pr-3 text-text-secondary">{o.payment}</td>
                    <td className="py-2.5"><Pill value={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Top formulations */}
          <div className="card p-5">
            <h2 className="font-semibold text-[15px]">Top Formulations</h2>
            <div className="mt-2 flex flex-col gap-2.5">
              {top.map((t) => (
                <div key={t.name} className="flex items-center justify-between gap-2 text-[13px]">
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-[11px] text-text-secondary">{t.meta}</div>
                  </div>
                  <div className="font-bold">{t.rev}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Alerts */}
          <div className="card p-5">
            <h2 className="font-semibold text-[15px]">Inventory & Batch Alerts</h2>
            <div className="mt-2 flex flex-col gap-3">
              {alerts.map((a) => (
                <div key={a.t} className="flex gap-2.5">
                  <span className={`material-symbols-outlined text-[20px] ${a.cls}`}>{a.icon}</span>
                  <div>
                    <div className="text-[13px] font-semibold">{a.t}</div>
                    <div className="text-[12px] text-text-secondary">{a.d}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/admin/products" className="btn-secondary mt-4 w-full !py-2.5 !text-[13px]">Review Stock</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
