import BackgroundOrb from "@/components/decorations/BackgroundOrb";

export default function AboutPage() {
  return (
    <div className="container-x py-12 relative" style={{ maxWidth: 900 }}>
      <BackgroundOrb color="plum" size="md" className="-top-10 -right-20" />
      <div className="relative z-[1]">
        <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-plum">Heritage & Pharmacopoeia • Bengaluru & Kullu</div>
        <h1 className="mt-1 font-display text-[32px] lg:text-[44px] font-semibold leading-tight">Restoring the Integrity of Classical Indian Ayurveda</h1>
        <p className="mt-3 text-[15px] text-text-secondary leading-7">Rooted in the Charaka Samhita, verified by NABL-accredited molecular assays. Kullu Research Facility · Alt 2,184m.</p>
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[["16,000+ ft", "Altitude Foraged"], ["100%", "Classical Shodhana"], ["0.0%", "Heavy Metals"], ["18+ Yrs", "Phytomedical Assays"]].map(([v, l]) => (
            <div key={l} className="card p-5 text-center">
              <div className="font-display text-2xl font-semibold text-primary">{v}</div>
              <div className="text-[12px] text-text-secondary mt-1">{l}</div>
            </div>
          ))}
        </div>
        <h2 className="mt-10 font-display text-[26px] font-semibold">Why Veda Naturals Exists</h2>
        <blockquote className="mt-3 font-display italic text-[19px] leading-8 border-l-4 border-coral pl-5">
          “Contemporary commercial Ayurveda has reduced medicine to industrialized solvent extractions. We returned to Shastra.”
        </blockquote>
        <div className="text-[13px] mt-2 text-text-secondary">— Acharya Vidyadhar Shukla, Head of Botanical Pharmacology</div>
        <h2 className="mt-10 font-display text-[26px] font-semibold">The Four Sacred Pillars</h2>
        <div className="mt-4 grid sm:grid-cols-2 gap-3">
          {[["Extreme Altitude Foraging", "Spiti Valley, Kinnaur — Gaddi pastoralist co-ops."], ["Surya Tapi Shodhana", "Triphala kwath solar purification."], ["Standardized Bio-Assays", "78%+ Fulvic Acid, 5%+ Withanolide A."], ["Fair Forest Co-Ops", "ICP-MS screening: Pb, As, Hg, Cd."]].map(([t, d]) => (
            <div key={t} className="card p-5">
              <div className="font-semibold">{t}</div><div className="text-[13px] text-text-secondary mt-1">{d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
