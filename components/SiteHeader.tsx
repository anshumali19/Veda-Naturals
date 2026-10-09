"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/lib/store/cart";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop", chevron: true },
  { href: "/about", label: "Heritage" },
  { href: "/science", label: "Science" },
  { href: "/journal", label: "Journal" },
  { href: "/track", label: "Track" },
];

export default function SiteHeader() {
  const { count } = useCart();
  const path = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const go = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/shop${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ""}`);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-40">
      {/* Utility strip */}
      <div className="bg-primary-dark text-white/85 text-[12px]">
        <div className="max-w-[1200px] mx-auto px-4 h-9 flex items-center gap-4 overflow-hidden">
          <span className="hidden sm:inline-flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[15px]">local_shipping</span> Free shipping over ₹499
          </span>
          <span className="hidden md:inline text-white/25">|</span>
          <span className="hidden md:inline-flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[15px]">package_2</span> COD available
          </span>
          <span className="hidden lg:inline text-white/25">|</span>
          <span className="inline-flex items-center gap-1.5 min-w-0 truncate">
            <span className="material-symbols-outlined text-[15px] shrink-0">sell</span>
            <span className="truncate">10% off prepaid · Code: <strong className="text-white">VEDA10</strong></span>
          </span>
          <span className="ml-auto hidden sm:inline-flex items-center gap-3 shrink-0">
            <Link href="/track" className="hover:text-white">Track Order</Link>
            <span className="text-white/25">|</span>
            <Link href="/account" className="hover:text-white">Help</Link>
          </span>
        </div>
      </div>

      {/* Main bar */}
      <div className="bg-white border-b border-border shadow-[0_6px_20px_rgba(23,35,61,0.05)]">
        <div className="max-w-[1200px] mx-auto px-4 h-[68px] flex items-center gap-4">
          <button aria-label="Menu" onClick={() => setOpen(!open)} className="lg:hidden w-10 h-10 grid place-items-center rounded-full hover:bg-bg-secondary">
            <span className="material-symbols-outlined">{open ? "close" : "menu"}</span>
          </button>
          <Link href="/" className="font-display text-[22px] font-semibold tracking-tight shrink-0">
            Veda <span className="italic font-normal text-plum">Naturals</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7 mx-auto">
            {links.map((l) => {
              const active = l.href === "/" ? path === "/" : path.startsWith(l.href);
              return (
                <Link key={l.href} href={l.href}
                  className={`relative py-1 text-[15px] transition-colors ${active ? "font-bold text-text" : "font-medium text-text-secondary hover:text-text"}`}>
                  <span className="inline-flex items-center gap-1">
                    {l.label}
                    {l.chevron && <span className="material-symbols-outlined text-[18px]">expand_more</span>}
                  </span>
                  {active && <span className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-plum" />}
                </Link>
              );
            })}
          </nav>

          <form onSubmit={go} className="hidden md:flex items-center gap-2 h-11 pl-4 pr-1.5 rounded-full bg-bg-secondary border border-transparent focus-within:border-border focus-within:bg-white transition-colors w-[220px] xl:w-[260px]">
            <span className="material-symbols-outlined text-[20px] text-text-secondary">search</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products..."
              className="bg-transparent flex-1 min-w-0 text-[14px] focus:outline-none placeholder:text-text-muted" />
          </form>

          <span className="hidden md:block w-px h-6 bg-border" />

          <Link href="/cart" aria-label="Cart" className="relative w-10 h-10 grid place-items-center rounded-full hover:bg-bg-secondary transition-colors">
            <span className="material-symbols-outlined text-[24px]">local_mall</span>
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-plum text-white text-[10px] font-bold grid place-items-center">
              {count}
            </span>
          </Link>
          <Link href="/account" aria-label="Account" className="w-10 h-10 rounded-full bg-primary-dark text-white grid place-items-center hover:bg-primary transition-colors">
            <span className="material-symbols-outlined text-[22px]">person</span>
          </Link>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div className="lg:hidden border-t border-border px-4 py-3 flex flex-col gap-1 bg-white">
            <form onSubmit={go} className="md:hidden flex items-center gap-2 h-11 px-4 rounded-full bg-bg-secondary mb-2">
              <span className="material-symbols-outlined text-[20px] text-text-secondary">search</span>
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products..."
                className="bg-transparent flex-1 text-[14px] focus:outline-none placeholder:text-text-muted" />
            </form>
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-[15px] ${path === l.href ? "font-bold bg-bg-secondary" : "font-medium hover:bg-bg-secondary"}`}>
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
