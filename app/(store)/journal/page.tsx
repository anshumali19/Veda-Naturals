import Link from "next/link";

const posts = [
  { slug: "shilajit-ashwagandha-synergy", tag: "Clinical Research · 7 min", title: "The Biochemical Synergy of Shodhita Shilajit & Ashwagandha in Cellular ATP Synthesis", by: "Dr. Rajeshwari Sharma · 18 Oct 2024" },
  { tag: "Gut Health · 5 min", title: "Understanding Agni: Why Gut Fire is the Master Key to Immunity", by: "Vaidya K. Murthy" },
  { tag: "Dosha Balance · 4 min", title: "Ojas: How Ashwagandha Lowers Cortisol Without Sedation", by: "Dr. A. Sengupta" },
  { tag: "Clinical Studies · 6 min", title: "Fulvic Acid & ATP: What 12 Human Trials Actually Show", by: "Council Review" },
];

export default function JournalPage() {
  return (
    <div className="container-x py-12" style={{ maxWidth: 860 }}>
      <h1 className="font-display text-[32px] font-semibold">Ayurvedic Journal</h1>
      <p className="text-[14px] text-text-secondary">Evidence-based Shastriya wisdom & clinical insights.</p>
      <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar">
        {["All Articles", "Rasayana & Vitality", "Gut Agni", "Dosha Balance", "Clinical Studies", "Skin & Kesh"].map((t, i) => (
          <span key={t} className={`shrink-0 px-4 py-2 rounded-full text-[13px] font-semibold ${i === 0 ? "bg-primary text-white" : "bg-white border border-border"}`}>{t}</span>
        ))}
      </div>
      <div className="mt-6 flex flex-col gap-4">
        {posts.map((p, i) => (
          <Link key={p.title} href={p.slug ? `/journal/${p.slug}` : "/journal"} className="article-card p-5 hover:shadow-[0_18px_40px_rgba(23,35,61,0.10)] transition-shadow">
            <div className="text-[11px] font-bold uppercase tracking-widest text-plum">{p.tag}</div>
            <div className="mt-1 font-display text-[20px] font-semibold leading-snug">{p.title}</div>
            <div className="text-[12px] text-text-secondary mt-1">{p.by}{i === 0 ? " · Read Review →" : ""}</div>
          </Link>
        ))}
      </div>
      <div className="wellness-banner mt-6 p-6">
        <div className="relative z-[1]">
          <div className="font-display text-[22px] font-semibold">Discover Your Prakriti</div>
          <p className="text-[13px] text-white/70">Vata · Pitta · Kapha — 3-minute Vedic constitution test.</p>
          <span className="btn-accent mt-3">Take 3-Min Assessment</span>
        </div>
      </div>
    </div>
  );
}
