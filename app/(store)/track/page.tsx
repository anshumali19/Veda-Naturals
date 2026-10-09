import Link from "next/link";

export default function TrackPage() {
  return (
    <div className="container-x py-12" style={{ maxWidth: 600 }}>
      <div className="bg-success-bg rounded-[20px] p-5 text-center">
        <div className="font-display text-2xl font-semibold text-success">Order Confirmed!</div>
        <div className="text-[13px]">Apothecary Verified · Order #VN-88492 · 21 Oct, 10:45 AM</div>
      </div>
      <div className="mt-4 card p-5">
        <div className="font-semibold">Estimated Delivery · Friday, 24 Oct by 7:00 PM</div>
        <div className="text-[13px] text-text-secondary">BlueDart Express · AWB #BLUEDART-8829401 · In Transit from Bengaluru Hub</div>
      </div>
      <div className="mt-4 card p-5">
        <div className="font-bold text-[13px] uppercase tracking-widest">Shipment Lifecycle</div>
        <div className="mt-3 flex flex-col gap-4">
          {[["Order Placed", "21 Oct 10:45 AM · Verified via OTP", true], ["Quality Check & Shodhana", "21 Oct 03:15 PM · Batch #VN-SH-092", true], ["Handed to BlueDart", "22 Oct 09:30 AM · Towards Indiranagar Hub", true], ["Out for Delivery", "Expected 24 Oct", false], ["Delivered & COD Collection", "24 Oct by 7 PM", false]].map(([t, d, done]) => (
            <div key={t as string} className="flex gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${done ? "bg-primary text-white" : "bg-bg-secondary text-text-muted"}`}>
                <span className="material-symbols-outlined text-[14px]">{done ? "check" : "schedule"}</span>
              </div>
              <div><div className="font-semibold text-[14px]">{t}</div><div className="text-[12px] text-text-secondary">{d}</div></div>
            </div>
          ))}
        </div>
      </div>
      <Link href="/account" className="btn-secondary mt-4 w-full">View in Account →</Link>
    </div>
  );
}
