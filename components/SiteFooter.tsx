import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-16 footer-dark">
      <div className="relative z-[1] max-w-[1200px] mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="font-display text-2xl font-semibold">Veda Naturals</div>
          <p className="mt-3 text-[14px] leading-6 text-white/70 max-w-xs">
            Classical Ayurvedic apothecary. Wildcrafted botanicals, standardized extracts, zero
            chemical binders.
          </p>
          <div className="mt-4 flex items-center gap-2 text-[12px] uppercase tracking-widest text-coral-light">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            AYUSH • GMP Certified
          </div>
        </div>
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-coral-light">Shop</div>
          <div className="mt-3 flex flex-col gap-2 text-[14px] text-white/80">
            <Link href="/shop" className="hover:underline">All Formulations</Link>
            <Link href="/product/himalayan-shilajit-resin" className="hover:underline">Shilajit Resin</Link>
            <Link href="/product/ashwagandha-root-powder" className="hover:underline">Ashwagandha</Link>
            <Link href="/shop" className="hover:underline">Oils & Taila</Link>
          </div>
        </div>
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-coral-light">Learn</div>
          <div className="mt-3 flex flex-col gap-2 text-[14px] text-white/80">
            <Link href="/about" className="hover:underline">Heritage & Science</Link>
            <Link href="/science" className="hover:underline">Advisory Council</Link>
            <Link href="/journal" className="hover:underline">Ayurvedic Journal</Link>
            <Link href="/track" className="hover:underline">Track Order</Link>
          </div>
        </div>
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-coral-light">Care</div>
          <div className="mt-3 flex flex-col gap-2 text-[14px] text-white/80">
            <span>Free shipping over ₹499</span>
            <span>COD available</span>
            <span>2–3 day metro delivery</span>
            <span>care@vedanaturals.in</span>
          </div>
        </div>
      </div>
      <div className="relative z-[1] border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] text-white/60">
          <span>© 2024 Veda Naturals. Classical pharmacopoeia, modern assays.</span>
          <span>Adheres to Ayurvedic Pharmacopoeia of India • Schedule E(1)</span>
        </div>
      </div>
    </footer>
  );
}
