"use client";

import { useState } from "react";
import { PageHeader, Pill } from "@/components/admin";
import { articles, type Article } from "@/lib/data/admin";

export default function BlogPage() {
  const [active, setActive] = useState<Article>(articles[0]);
  const [filter, setFilter] = useState("All");

  const list = articles.filter((a) => filter === "All" || a.status === filter);
  const ring = (2 * Math.PI * 34 * active.seo) / 100;

  return (
    <div className="flex flex-col gap-4">
      <PageHeader eyebrow="Editorial Desk" title="Journal / Blog" sub="38 published · 5 drafts · 3 scheduled.">
        <button className="btn-secondary !py-2.5 !text-[13px]">Media Library</button>
        <button className="btn-primary !py-2.5 !text-[13px]">+ New Article</button>
      </PageHeader>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          ["Published", "38", "2 this week"],
          ["Drafts", "5", "1 critical SEO"],
          ["Scheduled", "3", "next Nov 02"],
          ["Avg SEO Score", "84", "+3 pts MoM"],
        ].map(([l, v, d]) => (
          <div key={l} className="card p-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-text-muted">{l}</div>
            <div className="mt-1 font-display text-[22px] font-semibold">{v}</div>
            <div className="text-[11px] text-text-secondary">{d}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-1.5">
        {["All", "Published", "Scheduled", "Draft"].map((t) => (
          <button key={t} onClick={() => setFilter(t)}
            className={`px-4 py-2 rounded-full text-[13px] font-semibold border ${filter === t ? "bg-primary text-white border-primary" : "bg-white border-border"}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-4">
        {/* Directory */}
        <div className="lg:col-span-7 flex flex-col gap-2.5 self-start">
          {list.map((a) => (
            <button key={a.title} onClick={() => setActive(a)} className={`card p-4 text-left flex gap-3 items-start transition-shadow hover:shadow-[0_18px_40px_rgba(23,35,61,0.10)] ${active.title === a.title ? "ring-2 ring-primary" : ""}`}>
              <span className="w-14 h-14 rounded-[18px] bg-bg-secondary grid place-items-center shrink-0">
                <span className="material-symbols-outlined text-primary/50">article</span>
              </span>
              <span className="flex-1 min-w-0">
                <span className="block font-semibold text-[14px] leading-5">{a.title}</span>
                <span className="block text-[12px] text-text-secondary mt-1">{a.category} · {a.date} · {a.views} views</span>
              </span>
              <span className="flex flex-col items-end gap-1.5 shrink-0">
                <Pill value={a.status} />
                <span className="text-[11px] font-bold text-success">SEO {a.seo}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Editor / SEO inspector */}
        <div className="lg:col-span-5 card p-5 self-start">
          <div className="text-[11px] font-bold uppercase tracking-widest text-plum">Editor · {active.status}</div>
          <h2 className="font-display text-[19px] font-semibold leading-6 mt-1">{active.title}</h2>
          <div className="mt-3 flex flex-col gap-3 text-[13px]">
            <label className="flex flex-col gap-1">
              <span className="font-semibold">Slug</span>
              <input defaultValue={`/journal/${active.title.toLowerCase().split(":")[0].split(" ").slice(0, 4).join("-")}`} className="h-11 px-3.5 border border-border rounded-[18px] bg-white font-mono text-[12px]" />
            </label>
            <div>
              <span className="font-semibold">Concern Tags</span>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {["Ojas & Vitality", "Clinical Research", "Agni"].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-bg-secondary text-[12px] font-semibold">
                    {t} <span className="material-symbols-outlined text-[14px] text-text-muted">close</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-[18px] bg-bg-secondary p-3 text-[12px] text-text-secondary">
              Linked product: <strong className="text-text">Ashwagandha Root Powder 200g</strong>
            </div>
            <div className="flex items-center gap-4">
              <svg viewBox="0 0 84 84" className="w-[84px] h-[84px] -rotate-90 shrink-0">
                <circle cx="42" cy="42" r="34" fill="none" stroke="#F5F3F1" strokeWidth="9" />
                <circle cx="42" cy="42" r="34" fill="none" stroke={active.seo >= 80 ? "#3D8B68" : active.seo >= 65 ? "#E99587" : "#D95C5C"} strokeWidth="9"
                  strokeDasharray={`${ring.toFixed(1)} 213.6`} strokeLinecap="round" />
              </svg>
              <div className="text-[12px] flex flex-col gap-1">
                <span className="font-display text-[22px] font-semibold">{active.seo}</span>
                {["Meta title + description ✓", "Alt text on cover ✓", active.seo < 80 ? "Internal links: add 2 ✗" : "Internal links ✓", active.seo < 65 ? "Readability: fix ✗" : "Readability ✓"].map((c) => (
                  <span key={c} className="text-text-secondary">{c}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <button className="btn-primary !text-[13px]">Publish</button>
            <button className="btn-secondary !text-[13px]">Preview</button>
          </div>
        </div>
      </div>
    </div>
  );
}
