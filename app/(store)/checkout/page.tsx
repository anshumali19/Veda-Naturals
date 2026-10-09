"use client";

import Link from "next/link";
import { useState } from "react";
import { inr } from "@/lib/data/products";
import { useCart } from "@/lib/store/cart";

export default function CheckoutPage() {
  const { detailed, subtotal } = useCart();
  const [placed, setPlaced] = useState(false);
  const coupon = Math.round(subtotal * 0.1);
  const total = subtotal - coupon;

  if (placed)
    return (
      <div className="container-x py-16 text-center" style={{ maxWidth: 600 }}>
        <div className="w-16 h-16 mx-auto rounded-full bg-success-bg flex items-center justify-center text-success">
          <span className="material-symbols-outlined text-[32px]">check</span>
        </div>
        <h1 className="mt-3 font-display text-3xl font-semibold">Order Confirmed!</h1>
        <p className="mt-2 text-[14px] text-text-secondary">Dhanyawad! Order #VN-88492 · BlueDart AWB #BLUEDART-8829401. Updates to +91 98765 43210.</p>
        <div className="mt-4 card p-5 text-left">
          <div className="font-semibold">Estimated Delivery · Friday, 24 Oct by 7:00 PM</div>
          <div className="text-[13px] text-text-secondary mt-1">Hand-inspected, Shodhana-verified · COD {inr(total)}</div>
        </div>
        <div className="mt-5 flex gap-2 justify-center">
          <Link href="/track" className="btn-primary">Track Shipment</Link>
          <Link href="/shop" className="btn-secondary">Continue Shopping</Link>
        </div>
      </div>
    );

  return (
    <div className="container-x py-10 pb-32" style={{ maxWidth: 680 }}>
      <div className="flex items-center justify-between max-w-xs mx-auto">
        {(["Address", "Payment", "Review"] as const).map((s, i) => (
          <div key={s} className="flex flex-col items-center">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center ${i <= 1 ? "bg-primary text-white" : "bg-bg-secondary text-text-muted"}`}>
              <span className="material-symbols-outlined text-[16px]">{i === 0 ? "check" : i === 1 ? "payments" : "checklist"}</span>
            </div>
            <span className={`text-[10px] uppercase tracking-wider mt-1 ${i === 1 ? "font-bold text-primary" : ""}`}>{s}</span>
          </div>
        ))}
      </div>

      <section className="mt-6 card p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold flex items-center gap-2"><span className="material-symbols-outlined text-primary">location_on</span> Delivery Address</h2>
          <button className="text-[13px] font-semibold text-plum">Change</button>
        </div>
        <div className="mt-2 text-[14px]"><span className="font-semibold">Aarav Sharma</span> · +91 98765 43210</div>
        <p className="text-[14px] text-text-secondary">Flat 402, Vrindavan Heights, Indiranagar, Bengaluru — 560038</p>
      </section>

      <section className="mt-4 card p-5">
        <h2 className="font-semibold">Select Payment Mode</h2>
        <div className="mt-3 border-[1.5px] border-primary bg-mist-light/40 rounded-[18px] p-4">
          <div className="font-semibold text-[14px] flex items-center gap-2"><span className="material-symbols-outlined">payments</span> Cash on Delivery — Selected</div>
          <div className="text-[13px] text-text-secondary mt-1">Available for 560038 · cash / UPI QR at doorstep</div>
        </div>
        <div className="mt-2 border border-border rounded-[18px] p-4 opacity-60 bg-white">
          <div className="font-semibold text-[14px]">Prepaid UPI / Cards</div>
          <div className="text-[13px]">Extra 10% bonus — enabling soon</div>
        </div>
      </section>

      <section className="mt-4 card p-5">
        <h2 className="font-semibold">Order Summary · {detailed.length} items</h2>
        <div className="mt-2 flex flex-col gap-2 text-[14px]">
          {detailed.length === 0 && <div className="text-text-secondary">Cart empty — <Link href="/shop" className="underline">add formulations</Link>.</div>}
          {detailed.map(({ product: p, qty }) => (
            <div key={p.slug} className="flex justify-between"><span>{p.name} ×{qty}</span><span className="font-semibold">{inr(p.price * qty)}</span></div>
          ))}
          <div className="flex justify-between text-success"><span>VEDA10</span><span>−{inr(coupon)}</span></div>
          <div className="border-t border-border pt-2 flex justify-between font-bold"><span>Total</span><span>{inr(total)}</span></div>
        </div>
      </section>

      <div className="fixed bottom-0 inset-x-0 bg-white/90 backdrop-blur border-t border-border p-4">
        <div className="mx-auto flex items-center gap-3" style={{ maxWidth: 680 }}>
          <div><div className="text-[11px] uppercase text-text-muted font-bold">Final · COD</div><div className="font-bold text-lg">{inr(total)}</div></div>
          <button onClick={() => setPlaced(true)} disabled={detailed.length === 0} className="btn-primary flex-1 !py-3.5 disabled:opacity-40">
            Place Order (COD) →
          </button>
        </div>
      </div>
    </div>
  );
}
