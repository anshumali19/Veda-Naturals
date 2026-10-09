"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { discount, inr, products } from "@/lib/data/products";
import { useCart } from "@/lib/store/cart";
import ProductCard from "@/components/ProductCard";

export default function ProductClient({ slug }: { slug: string }) {
  const product = products.find((p) => p.slug === slug) ?? products[0];
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [pin, setPin] = useState("560001");
  const off = discount(product);
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <div className="container-x py-10">
      <div className="text-[12px] text-text-secondary">
        <Link href="/" className="hover:underline">Home</Link> &gt; <Link href="/shop" className="hover:underline">Shop</Link> &gt; {product.name}
      </div>

      <div className="mt-4 grid lg:grid-cols-2 gap-8">
        <div>
          <div className="rounded-[22px] bg-bg-secondary border border-border aspect-[4/3] overflow-hidden relative">
            <Image src="/images/product-shared.png" alt={product.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 600px" priority />
            <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-[12px] font-semibold">Batch #{product.batch}</span>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {["NABL Certified", "Ayush Certified", "Fast Dispatch 24H", "15-Day Replacement"].map((t) => (
              <div key={t} className="bg-white border border-border rounded-[18px] p-2 text-center text-[11px] font-semibold text-primary">{t}</div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-success-bg text-success text-[12px] font-bold">Apothecary Reserve</span>
            <span className="text-[12px] text-text-muted">Batch #{product.batch}</span>
          </div>
          <h1 className="mt-2 font-display text-[30px] lg:text-[36px] font-semibold leading-tight">{product.name}</h1>
          <p className="text-[14px] text-text-secondary">{product.short} · {product.size}</p>
          <div className="mt-2 flex items-center gap-2 text-[14px]">
            <span className="text-coral">★★★★★</span>
            <span className="font-bold">{product.rating}</span>
            <span className="text-text-secondary">({product.reviews.toLocaleString("en-IN")}) · BAMS Doctor Approved</span>
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-bold text-[28px]">{inr(product.price)}</span>
            <span className="line-through text-text-muted">{inr(product.mrp)}</span>
            <span className="px-2.5 py-1 rounded-full bg-coral-light/60 text-primary text-[12px] font-bold">{off}% OFF</span>
          </div>
          <div className="text-[13px] text-plum font-semibold">UPI: extra 10% auto-applied at checkout</div>

          <div className="mt-4">
            <div className="text-[12px] font-bold uppercase tracking-widest text-text-muted">Pack</div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div className="border-[1.5px] border-primary bg-mist-light/40 rounded-[18px] p-3">
                <div className="font-semibold text-[14px]">20g · 40 days</div>
                <div className="text-[13px] font-bold">{inr(product.price)} <span className="font-normal line-through text-text-muted">{inr(product.mrp)}</span></div>
              </div>
              <div className="border border-border rounded-[18px] p-3 bg-white">
                <div className="font-semibold text-[14px]">50g · 100 days</div>
                <div className="text-[13px]">₹1,899 · Save extra 20%</div>
              </div>
            </div>
          </div>

          <ul className="mt-4 flex flex-col gap-1.5">
            {product.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 text-[14px]"><span className="material-symbols-outlined text-[18px] text-success">check_circle</span>{h}</li>
            ))}
          </ul>

          <div className="mt-4 card p-4">
            <div className="font-semibold text-[14px] flex items-center gap-2"><span className="material-symbols-outlined text-primary">location_on</span> Delivery & COD check</div>
            <div className="mt-2 flex gap-2">
              <input value={pin} onChange={(e) => setPin(e.target.value)} className="flex-1 h-11 border border-border rounded-full px-4 text-[14px] bg-white" placeholder="Pincode" />
              <button className="btn-secondary !py-2.5 !text-[13px]">Verify</button>
            </div>
            <div className="mt-2 text-[13px] text-success font-medium">Free delivery to {pin} · COD available · Friday delivery</div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex items-center border border-border rounded-full bg-white">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-11 h-12 font-bold">−</button>
              <span className="w-8 text-center font-bold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-11 h-12 font-bold">+</button>
            </div>
            <button onClick={() => add(product.slug, qty)} className="btn-primary flex-1">Add • {inr(product.price * qty)}</button>
          </div>
          <Link href="/cart" onClick={() => add(product.slug, qty)} className="btn-accent mt-2 w-full">Buy Now</Link>

          <div className="mt-4 flex flex-col gap-2">
            {["Botanical Composition & Dosage", "Lab Reports & Shodhana", "Usage & Anupana", "Shipping & Returns"].map((t) => (
              <details key={t} className="bg-white border border-border rounded-[18px] px-4 py-3">
                <summary className="text-[14px] font-semibold cursor-pointer list-none flex justify-between">{t}<span className="material-symbols-outlined text-text-muted">expand_more</span></summary>
                <p className="mt-1 text-[13px] text-text-secondary">{product.description}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-[24px] font-semibold">Frequently Bought Together</h2>
          <Link href="/shop" className="text-[13px] font-bold text-plum">Explore All</Link>
        </div>
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {related.map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
      </div>
    </div>
  );
}
