"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  { href: "/admin", label: "Dashboard", icon: "dashboard", exact: true },
  { href: "/admin/orders", label: "Orders", icon: "receipt_long" },
  { href: "/admin/products", label: "Products & Stock", icon: "inventory_2" },
  { href: "/admin/customers", label: "Customers", icon: "group" },
  { href: "/admin/categories", label: "Categories", icon: "account_tree" },
  { href: "/admin/blog", label: "Journal / Blog", icon: "article" },
  { href: "/admin/fulfillment", label: "Fulfillment", icon: "local_shipping" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  const links = (
    <nav className="flex flex-col gap-1 p-3">
      {nav.map((n) => {
        const active = n.exact ? path === n.href : path === n.href || path.startsWith(n.href + "/");
        return (
          <Link
            key={n.href}
            href={n.href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-full text-[14px] font-medium transition-colors ${
              active ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">{n.icon}</span>
            {n.label}
          </Link>
        );
      })}
      <div className="mt-4 px-4">
        <Link href="/" className="flex items-center gap-2 text-[13px] text-white/50 hover:text-white">
          <span className="material-symbols-outlined text-[18px]">storefront</span> View Storefront
        </Link>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-[260px] shrink-0 flex-col bg-primary-dark text-white sticky top-0 h-screen">
        <div className="px-5 pt-6 pb-4">
          <div className="font-display text-[20px] font-semibold">
            Veda <span className="italic font-normal text-coral-light">Admin</span>
          </div>
          <div className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-white/50">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" /> Live Ops
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">{links}</div>
        <div className="p-4">
          <div className="rounded-[18px] bg-white/5 border border-white/10 p-4 flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-plum grid place-items-center text-white font-bold text-[13px]">VA</span>
            <div>
              <div className="text-[13px] font-semibold">Vaidya Admin</div>
              <div className="text-[11px] text-white/50">Ops Manager</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-primary-dark/60" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-[270px] bg-primary-dark text-white overflow-y-auto">
            <div className="px-5 pt-6 pb-2 font-display text-[20px] font-semibold">
              Veda <span className="italic font-normal text-coral-light">Admin</span>
            </div>
            {links}
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-bg/85 backdrop-blur-xl border-b border-border">
          <div className="flex items-center gap-3 px-4 sm:px-6 h-16">
            <button aria-label="Menu" onClick={() => setOpen(true)} className="lg:hidden w-10 h-10 grid place-items-center rounded-full hover:bg-bg-secondary">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="hidden sm:flex flex-1 max-w-md items-center gap-2 px-4 h-10 bg-white border border-border rounded-full">
              <span className="material-symbols-outlined text-text-muted text-[20px]">search</span>
              <input placeholder="Search orders, SKUs, patrons…" className="bg-transparent flex-1 text-[13px] focus:outline-none" />
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-success-bg text-success text-[12px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> Realtime
              </span>
              <button className="btn-primary !py-2.5 !px-5 !text-[13px]">
                <span className="material-symbols-outlined text-[18px]">local_shipping</span> Quick Dispatch
              </button>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 w-full max-w-[1440px] mx-auto">{children}</main>
      </div>
    </div>
  );
}
