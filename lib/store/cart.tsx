"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { products, type Product } from "@/lib/data/products";

export type CartLine = { slug: string; qty: number };

type CartCtx = {
  lines: CartLine[];
  add: (slug: string, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  mrpTotal: number;
  detailed: { product: Product; qty: number }[];
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "veda-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => {
    try {
      if (typeof window === "undefined") return [];
      const raw = window.localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw) as CartLine[];
    } catch {}
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {}
  }, [lines]);

  const value = useMemo<CartCtx>(() => {
    const detailed = lines
      .map((l) => ({ product: products.find((p) => p.slug === l.slug)!, qty: l.qty }))
      .filter((d) => d.product);
    const subtotal = detailed.reduce((s, d) => s + d.product.price * d.qty, 0);
    const mrpTotal = detailed.reduce((s, d) => s + d.product.mrp * d.qty, 0);
    const count = detailed.reduce((s, d) => s + d.qty, 0);
    return {
      lines,
      detailed,
      subtotal,
      mrpTotal,
      count,
      add: (slug, qty = 1) =>
        setLines((prev) => {
          const ex = prev.find((l) => l.slug === slug);
          if (ex) return prev.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l));
          return [...prev, { slug, qty }];
        }),
      remove: (slug) => setLines((prev) => prev.filter((l) => l.slug !== slug)),
      setQty: (slug, qty) =>
        setLines((prev) =>
          qty <= 0 ? prev.filter((l) => l.slug !== slug) : prev.map((l) => (l.slug === slug ? { ...l, qty } : l))
        ),
      clear: () => setLines([]),
    };
  }, [lines]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside provider");
  return c;
}
