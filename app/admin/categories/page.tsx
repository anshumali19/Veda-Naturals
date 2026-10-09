"use client";

import { useState } from "react";
import { PageHeader, Pill } from "@/components/admin";
import { categories } from "@/lib/data/admin";

export default function CategoriesPage() {
  const [active, setActive] = useState(categories[1].slug);
  const cat = categories.find((c) => c.slug === active)!;

  return (
    <div className="flex flex-col gap-4">
      <PageHeader eyebrow="Taxonomy Registry" title="Categories" sub="6 roots · 41 SKUs mapped · AYUSH classified.">
        <button className="btn-secondary !py-2.5 !text-[13px]">Reorder</button>
        <button className="btn-primary !py-2.5 !text-[13px]">+ New Category</button>
      </PageHeader>

      <div className="grid lg:grid-cols-12 gap-4">
        {/* Tree */}
        <div className="lg:col-span-7 card p-3 self-start">
          {categories.map((c) => (
            <div key={c.slug} className="rounded-[18px] overflow-hidden">
              <button onClick={() => setActive(c.slug)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left ${active === c.slug ? "bg-primary text-white" : "hover:bg-bg-secondary"}`}>
                <span className="material-symbols-outlined text-[20px]">{active === c.slug ? "folder_open" : "folder"}</span>
                <span className="flex-1">
                  <span className="block font-semibold text-[14px]">{c.name}</span>
                  <span className={`block text-[11px] ${active === c.slug ? "text-white/60" : "text-text-muted"}`}>/{c.slug} · {c.skus} SKUs</span>
                </span>
                <Pill value={c.status} />
              </button>
              {c.children.length > 0 && (
                <div className={`ml-8 mb-1 rounded-[18px] ${active === c.slug ? "bg-mist-light/30" : "bg-bg-secondary/60"}`}>
                  {c.children.map((ch) => (
                    <div key={ch} className="flex items-center gap-2 px-4 py-2 text-[13px] text-text-secondary">
                      <span className="material-symbols-outlined text-[16px]">subdirectory_arrow_right</span> {ch}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="m-2 rounded-[18px] border border-dashed border-border p-4 text-center text-[13px] text-text-secondary">
            + Drop a category here to nest it, or use New Category.
          </div>
        </div>

        {/* Inspector */}
        <div className="lg:col-span-5 card p-5 self-start">
          <div className="text-[11px] font-bold uppercase tracking-widest text-plum">Inspector</div>
          <h2 className="font-display text-[20px] font-semibold mt-0.5">{cat.name}</h2>
          <div className="mt-4 flex flex-col gap-3 text-[13px]">
            <label className="flex flex-col gap-1">
              <span className="font-semibold">Display Name</span>
              <input defaultValue={cat.name} className="h-11 px-3.5 border border-border rounded-[18px] bg-white" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-semibold">Slug</span>
              <input defaultValue={`/${cat.slug}`} className="h-11 px-3.5 border border-border rounded-[18px] bg-white font-mono text-[12px]" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-semibold">Short Description</span>
              <textarea defaultValue="Classical formulations mapped to dosha and concern." rows={2} className="px-3.5 py-2.5 border border-border rounded-[18px] bg-white" />
            </label>
            <div>
              <span className="font-semibold">Concern Mapping</span>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {["Vitality", "Stress & Sleep", "Digestive", "Immunity"].map((t, i) => (
                  <span key={t} className={`px-3 py-1.5 rounded-full text-[12px] font-semibold ${i < 2 ? "bg-primary text-white" : "bg-bg-secondary text-text-secondary"}`}>{t}</span>
                ))}
              </div>
            </div>
            <div className="rounded-[18px] bg-bg-secondary p-3 text-[12px] text-text-secondary">
              AYUSH Schedule E(1) · GST 12% herbal · Storefront visible · Sitemap included
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <button className="btn-primary !text-[13px]">Save Changes</button>
            <button className="btn-secondary !text-[13px]">Preview</button>
          </div>
        </div>
      </div>
    </div>
  );
}
