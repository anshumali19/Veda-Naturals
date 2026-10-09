"use client";

import Link from "next/link";
import Image from "next/image";
import { inr } from "@/lib/data/products";
import { useCart } from "@/lib/store/cart";
import { useState } from "react";

export default function CartPage() {
  const { detailed, setQty, remove, subtotal, mrpTotal } = useCart();
  const [code, setCode] = useState("VEDA10");
  const [applied, setApplied] = useState(true);
  const coupon = applied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - coupon;
  const savings = mrpTotal - total;

  if (detailed.length === 0)
    return (
      <div className="container-x py-20 text-center" style={{ maxWidth: 640 }}>
        <span className="material-symbols-outlined text-[64px] text-text-muted">shopping_basket</span>
        <h1 className="mt-2 font-display text-3xl font-semibold">Your cart is empty</h1>
        <p className="mt-2 text-text-secondary text-[14px]">Begin with Shilajit + Ashwagandha — the classic Samyoga pair.</p>
        <Link href="/shop" className="btn-primary mt-6">Explore Formulations</Link>
      </div>
    );

  return (
    <div className="container-x py-10" style={{ maxWidth: 860 }}>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-[28px] font-semibold">Your Cart · {detailed.length} items</h1>
        <span className="text-[12px] font-semibold text-success flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">lock</span> 256-Bit Secure</span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-bg-secondary overflow-hidden">
        <div className="h-full bg-success" style={{ width: "100%" }} />
      </div>
      <div className="text-[12px] mt-1 text-success font-semibold">Free shipping eligible · COD available</div>

      <div className="mt-6 flex flex-col gap-4">
        {detailed.map(({ product: p, qty }) => (
          <div key={p.slug} className="card p-4 flex gap-4">
            <div className="w-20 h-24 rounded-[18px] bg-bg-secondary overflow-hidden shrink-0 relative">
              <Image src="/images/product-shared.png" alt={p.name} fill className="object-cover" sizes="80px" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between gap-2">
                <Link href={`/product/${p.slug}`} className="font-semibold text-[15px] hover:underline">{p.name}</Link>
                <button onClick={() => remove(p.slug)} aria-label="Remove" className="text-text-muted hover:text-danger"><span className="material-symbols-outlined">delete</span></button>
              </div>
              <div className="text-[12px] text-text-secondary">{p.size} · Batch {p.batch}</div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-bold">{inr(p.price)}</span>
                <span className="text-[12px] line-through text-text-muted">{inr(p.mrp)}</span>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <div className="flex items-center border border-border rounded-full bg-white">
                  <button onClick={() => setQty(p.slug, qty - 1)} className="w-9 h-9 font-bold">−</button>
                  <span className="w-6 text-center text-[14px] font-bold">{qty}</span>
                  <button onClick={() => setQty(p.slug, qty + 1)} className="w-9 h-9 font-bold">+</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 card p-4">
        <div className="font-semibold text-[14px]">Coupon</div>
        <div className="mt-2 flex gap-2">
          <input value={code} onChange={(e) => setCode(e.target.value)} className="flex-1 h-11 border border-border rounded-full px-4 text-[14px] uppercase bg-white" />
          <button onClick={() => setApplied(true)} className="btn-primary !py-2.5">Apply</button>
          {applied && <button onClick={() => setApplied(false)} className="text-[13px] text-text-muted underline">Remove</button>}
        </div>
        {applied && <div className="text-[13px] text-success font-semibold mt-1">VEDA10 applied · 10% off</div>}
      </div>

      <div className="mt-4 card p-5">
        <div className="font-semibold text-[15px]">Bill Details</div>
        <div className="mt-2 text-[14px] flex flex-col gap-1.5">
          <div className="flex justify-between"><span>MRP Total</span><span>{inr(mrpTotal)}</span></div>
          <div className="flex justify-between text-success"><span>Product discount</span><span>−{inr(mrpTotal - subtotal)}</span></div>
          {applied && <div className="flex justify-between text-success"><span>VEDA10</span><span>−{inr(coupon)}</span></div>}
          <div className="flex justify-between"><span>Delivery</span><span className="font-semibold">FREE <span className="line-through font-normal text-text-muted">₹99</span></span></div>
          <div className="border-t border-border pt-2 flex justify-between font-bold text-[16px]"><span>Total</span><span>{inr(total)}</span></div>
          <div className="text-[13px] text-success font-semibold">You save {inr(savings)}</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[12px] font-semibold text-primary">
        {["COD Available", "Free Ship ₹499+", "Ayush Certified"].map((t) => (
          <div key={t} className="bg-bg-secondary rounded-[18px] py-2.5 px-2">{t}</div>
        ))}
      </div>

      <Link href="/checkout" className="btn-primary mt-5 w-full !py-4 !text-[15px]">
        Proceed to Checkout → · {inr(total)}
      </Link>
    </div>
  );
}
