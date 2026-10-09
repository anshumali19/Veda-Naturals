"use client";

import { discount, inr, type Product } from "@/lib/data/products";
import { useCart } from "@/lib/store/cart";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  const off = discount(p);

  return (
    <article className="product-card">
      <Link href={`/product/${p.slug}`} className="block bg-bg-secondary p-5">
        <div className="rounded-[18px] bg-white border border-border overflow-hidden aspect-[4/3] relative">
          <Image src="/images/product-shared.png" alt={p.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px" />
        </div>
      </Link>
      <div className="p-5 flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          {p.badge && (
            <span className="px-2.5 py-1 rounded-full bg-success-bg text-success text-[11px] font-semibold">
              {p.badge}
            </span>
          )}
          <span className="px-2.5 py-1 rounded-full bg-coral-light/60 text-primary text-[11px] font-bold">
            {off}% OFF
          </span>
        </div>
        <Link href={`/product/${p.slug}`} className="font-semibold text-[15px] text-text leading-6 hover:underline">
          {p.name}
        </Link>
        <div className="text-[12px] text-text-secondary">{p.size} • {p.short}</div>
        <div className="flex items-center gap-1 text-[14px]">
          <span className="material-symbols-outlined material-symbols-filled text-[14px] text-coral">star</span>
          <span className="font-bold text-text text-[13px]">{p.rating}</span>
          <span className="text-text-secondary text-[12px]">({p.reviews.toLocaleString("en-IN")})</span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-[16px] text-text">{inr(p.price)}</span>
            <span className="text-[12px] line-through text-text-muted">{inr(p.mrp)}</span>
          </div>
          <button
            onClick={() => add(p.slug)}
            className="btn-primary !py-2.5 !px-5 !text-[13px]"
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
