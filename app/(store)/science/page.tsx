const fellows = [
  { name: "Dr. Rajeshwari Sharma", cred: "BAMS, MD (Ayurveda), Ph.D. Dravyaguna", role: "Chief Clinical Advisor · Shastriya Pharmacology · 22+ Yrs", quote: "Standardize Shilajit with Ashwagandha — cellular uptake increases by 34%." },
  { name: "Dr. Vikramaditya Joshi", cred: "B.A.M.S., M.S. Shalya Tantra", role: "Metabolic Health & Agni Disorders · 19+ Yrs · Vaidya Ratnam Kerala", quote: "Deepana-Pachana first. Bhasma safety is non-negotiable." },
  { name: "Dr. Ananya Sengupta", cred: "MBBS, MD Pharmacology", role: "Director of Clinical Toxicology · 12 human trials", quote: "Every batch: ICP-MS + microbial + stability. No exceptions." },
];

export default function SciencePage() {
  return (
    <div className="container-x py-12" style={{ maxWidth: 1000 }}>
      <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-plum">Medical Scientific Advisory Council · AYUSH & ICMR</div>
      <h1 className="font-display text-[32px] lg:text-[44px] font-semibold leading-tight">Governed by Vaidyas, Validated by Modern Clinicians</h1>
      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        {[["40+ Yrs", "Cumulative Practice"], ["12", "Double-Blind Trials"], ["100%", "AYUSH Monitored"]].map(([v, l]) => (
          <div key={l} className="bg-bg-secondary rounded-[18px] p-4"><div className="font-bold text-lg">{v}</div><div className="text-[12px] text-text-secondary">{l}</div></div>
        ))}
      </div>
      <h2 className="mt-8 font-display text-[24px] font-semibold">Senior Advisory Fellows</h2>
      <div className="mt-4 grid md:grid-cols-3 gap-4">
        {fellows.map((f) => (
          <div key={f.name} className="card p-5">
            <div className="w-12 h-12 rounded-full bg-mist-light flex items-center justify-center"><span className="material-symbols-outlined text-primary">stethoscope</span></div>
            <div className="mt-2 font-semibold">{f.name}</div>
            <div className="text-[12px] text-plum font-medium">{f.cred}</div>
            <div className="text-[12px] text-text-secondary mt-1">{f.role}</div>
            <p className="mt-2 text-[13px] italic font-display">“{f.quote}”</p>
          </div>
        ))}
      </div>
    </div>
  );
}
