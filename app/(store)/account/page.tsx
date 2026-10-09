import Link from "next/link";

export default function AccountPage() {
  return (
    <div className="container-x py-12" style={{ maxWidth: 600 }}>
      <div className="card p-5">
        <div className="font-display text-2xl font-semibold">Aarav Sharma</div>
        <div className="text-[13px] text-text-secondary">Pitta-Vata Predominant · +91 98765 43210 · Bengaluru</div>
        <div className="mt-2 inline-flex px-3 py-1 rounded-full bg-coral-light/50 text-plum text-[12px] font-bold">Gold Tier · 1,240 Ojas ≈ ₹124</div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        {[["04", "Past Orders"], ["02", "Protocols"], ["01", "Scheduled"]].map(([v, l]) => (
          <div key={l} className="card p-3"><div className="font-bold">{v}</div><div className="text-[12px] text-text-secondary">{l}</div></div>
        ))}
      </div>
      <div className="mt-3 card p-5">
        <div className="text-[12px] font-bold uppercase tracking-widest text-text-muted">Active Consignment · #VN-88492</div>
        <div className="font-semibold mt-1">In Transit · BlueDart · Expected Fri 24 Oct 7 PM · ₹1,619 COD</div>
        <Link href="/track" className="btn-primary mt-3 w-full">Track Shipment</Link>
      </div>
    </div>
  );
}
