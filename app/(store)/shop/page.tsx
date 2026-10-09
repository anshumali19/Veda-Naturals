"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { concerns, products } from "@/lib/data/products";

function CatalogInner() {
  const params = useSearchParams();
  const initialConcern = params.get("concern") ?? "All";
  const [concern, setConcern] = useState(initialConcern);
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [seen, setSeen] = useState(params);
  if (params !== seen) {
    setSeen(params);
    setConcern(params.get("concern") ?? "All");
    setQuery(params.get("q") ?? "");
  }
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(2500);

  const list = useMemo(() => {
    let l = [...products];
    if (concern !== "All") l = l.filter((p) => p.concern.some((c) => c.includes(concern.split(" ")[0])));
    if (query) l = l.filter((p) => (p.name + p.short + p.category).toLowerCase().includes(query.toLowerCase()));
    l = l.filter((p) => p.price <= maxPrice);
    if (sort === "low") l.sort((a, b) => a.price - b.price);
    if (sort === "high") l.sort((a, b) => b.price - a.price);
    if (sort === "rating") l.sort((a, b) => b.rating - a.rating);
    return l;
  }, [concern, query, sort, maxPrice]);

  return (
    <div className="container-x py-10">
      <div className="text-[12px] text-text-secondary">Home &gt; Shop &gt; All Herbal Formulations</div>
      <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.15em] text-plum">Classical Pharmacopoeia</div>
      <h1 className="font-display text-[32px] lg:text-[44px] font-semibold">All Pure Ayurvedic Formulations</h1>
      <p className="text-[14px] text-text-secondary">Lab-tested classical texts. Showing 1–{list.length} of 36.</p>

      <div className="mt-5 flex flex-col lg:flex-row gap-3 lg:items-center card p-3">
        <div className="flex-1 flex items-center gap-2 px-3 h-11 bg-bg-secondary rounded-full">
          <span className="material-symbols-outlined text-text-muted">search</span>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by herb, formulation or dosha..." className="bg-transparent flex-1 text-[14px] focus:outline-none" />
        </div>
        <div className="flex items-center gap-2">
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="h-11 px-4 rounded-full border border-border text-[13px] font-medium bg-white">
            <option value="featured">Best Selling</option>
            <option value="low">Price: Low–High</option>
            <option value="high">Price: High–Low</option>
            <option value="rating">Highest Vaidya Rating</option>
          </select>
          <label className="hidden sm:flex items-center gap-2 text-[13px] px-3">
            Under <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-20 h-9 border border-border rounded-lg px-2 bg-white" />
          </label>
        </div>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {concerns.map((c) => (
          <button
            key={c}
            onClick={() => setConcern(c)}
            className={`shrink-0 px-4 py-2 rounded-full text-[13px] font-semibold border transition-colors ${concern === c ? "bg-primary text-white border-primary" : "bg-white border-border text-text"}`}
          >
            {c === "All" ? "All Concerns" : c}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((p) => (
          <ProductCard key={p.slug} p={p} />
        ))}
      </div>
      {list.length === 0 && <div className="py-16 text-center text-text-secondary">No formulations match. Try clearing filters.</div>}

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-bg-secondary rounded-[20px] p-6 text-center">
        {["AYUSH Ministry Validated", "Heavy-Metal Free Triple-batch", "100% Single-Origin", "COD & Easy Returns"].map((t) => (
          <div key={t} className="text-[13px] font-semibold text-primary flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">verified</span> {t}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-10">Loading catalog…</div>}>
      <CatalogInner />
    </Suspense>
  );
}
