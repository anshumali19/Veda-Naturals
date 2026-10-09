"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import HeroCarousel from "@/components/HeroCarousel";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data/products";
import BackgroundOrb from "@/components/decorations/BackgroundOrb";
import MedicalPlus from "@/components/decorations/MedicalPlus";

const concerns = [
  { name: "Digestive", desc: "Support gut comfort and regularity.", articles: 14, icon: "gastroenterology", tint: "#E8EDE3" },
  { name: "Immunity", desc: "Strengthen your body's natural defences.", articles: 9, icon: "shield", tint: "#F6E3EC" },
  { name: "Diabetic", desc: "Support balanced sugar levels naturally.", articles: 7, icon: "monitor_heart", tint: "#EFE6D8" },
  { name: "Weight", desc: "Natural support for a healthier metabolism.", articles: 8, icon: "scale", tint: "#F1ECE2" },
  { name: "Hair", desc: "Nourish from within for stronger, healthier hair.", articles: 11, icon: "content_cut", tint: "#E9E7F2" },
  { name: "Skin", desc: "Support clear, radiant and healthy skin.", articles: 12, icon: "face", tint: "#E4EFE6" },
  { name: "Women's", desc: "Holistic care for every stage of life.", articles: 10, icon: "female", tint: "#F5E6E4" },
  { name: "Memory", desc: "Support focus, clarity and cognitive health.", articles: 6, icon: "neurology", tint: "#E3E9EF" },
];

const steps = [
  { n: "01", t: "Take a Short Assessment", d: "Share your concerns privately online." },
  { n: "02", t: "Consult a Certified Vaidya", d: "Get a personalised herbal plan." },
  { n: "03", t: "Receive Genuine Medicines", d: "Shipped discreetly to your door." },
  { n: "04", t: "Ongoing Support", d: "Continuous care until you see results." },
];

const testimonials = [
  { q: "The consultation was easy and completely private. I finally got my sleep back.", n: "Rahul S.", c: "Stress & Sleep" },
  { q: "I was struggling with low stamina. The team was kind, professional and helpful.", n: "Priya M.", c: "Vitality" },
  { q: "Discreet delivery and genuine medicines. I can feel the difference.", n: "Amit K.", c: "Gut Health" },
];

export default function HomePage() {
  const best = products.slice(0, 6);
  const [sent, setSent] = useState(false);

  return (
    <div className="w-full">
      <HeroCarousel />

      {/* CONCERNS */}
      <section className="section-sm">
        <div className="container-x">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-plum">Explore by Concern</div>
              <h2 className="mt-1 font-display text-[28px] lg:text-[36px] font-semibold">Popular Health Concerns</h2>
              <p className="text-text-secondary text-[14px] mt-1">Trusted solutions for the conditions people ask about most.</p>
            </div>
            <Link href="/shop" className="text-[14px] font-semibold text-plum hover:underline shrink-0">View All →</Link>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {concerns.map((c) => (
              <Link key={c.name} href={`/shop?concern=${encodeURIComponent(c.name)}`}
                className="group bg-white border border-border rounded-[20px] overflow-hidden flex items-stretch min-h-[150px] transition-all hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(23,35,61,0.10)]">
                <div className="flex-1 p-5 flex flex-col min-w-0">
                  <div className="font-display text-[22px] font-semibold leading-tight">{c.name}</div>
                  <p className="text-[13px] text-text-secondary mt-1.5 leading-5 flex-1">{c.desc}</p>
                  <span className="mt-3 text-[13px] font-bold text-plum">{c.articles} Articles →</span>
                </div>
                <div className="w-[42%] shrink-0 relative overflow-hidden" style={{ background: c.tint }}>
                  <span
                    className="absolute top-1/2 -translate-y-1/2 rounded-full grid place-items-center bg-white/40 border border-white/60 shadow-sm"
                    style={{ width: 148, height: 148, right: -52 }}
                  >
                    <span className="material-symbols-outlined text-[52px] text-primary/50">{c.icon}</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="section-sm" style={{ background: "var(--color-bg-secondary)" }}>
        <div className="container-x">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-[28px] lg:text-[36px] font-semibold">Popular Treatments</h2>
            <Link href="/shop" className="text-[14px] font-semibold text-plum hover:underline shrink-0">View All Products →</Link>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {best.map((p) => (
              <ProductCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* DARK BANNER — full bleed */}
      <section className="relative overflow-hidden bg-primary">
        <BackgroundOrb color="plum" size="lg" className="-top-[160px] -right-[120px]" />
        <MedicalPlus size={32} dark className="absolute bottom-8 right-8" />
        <div className="container-x relative z-[1] py-14 lg:py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-coral-light">Consultation + Treatment + Ongoing Support</div>
            <h3 className="mt-3 font-display text-[26px] lg:text-[34px] font-medium leading-[1.2] tracking-tight text-white">Complete Vitality Rasayana Package</h3>
            <div className="mt-2 text-white/60 text-[14px]">Starting at <span className="font-semibold text-[22px] text-white">₹499</span> <span className="text-[12px]">per month</span></div>
            <ul className="mt-4 flex flex-col gap-2 text-[13.5px] text-white/75">
              {["Personalised treatment plan", "Genuine medicines included", "Discreet packaging & delivery"].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px] text-coral-light">check_circle</span> {t}
                </li>
              ))}
            </ul>
            <Link href="/product/himalayan-shilajit-resin" className="btn-accent mt-6">Claim Now →</Link>
          </div>
          <div className="flex items-center justify-center">
            <div className="rounded-[22px] bg-white/[0.07] border border-white/10 w-full max-w-sm aspect-[4/3] flex items-center justify-center overflow-hidden relative">
              <Image src="/images/bundle-ritual.png" alt="Vitality Rasayana ritual set" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 384px" />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <div className="container-x text-center">
          <h2 className="font-display text-[28px] lg:text-[36px] font-semibold">How It Works</h2>
          <p className="text-text-secondary text-[15px] mt-1">Get expert care in 4 simple steps.</p>
          <div className="steps mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {steps.map((s) => (
              <div key={s.n} className="relative">
                <div className="w-[60px] h-[60px] rounded-full bg-primary text-white grid place-items-center font-display text-[20px] font-semibold relative z-[1]">{s.n}</div>
                <div className="mt-3 font-semibold text-[15px]">{s.t}</div>
                <div className="text-[13px] text-text-secondary mt-1">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOCTOR */}
      <section className="section-sm">
        <div className="container-x grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative flex justify-center py-10 overflow-hidden">
            <div className="doctor-halo" />
            <div className="decorative-ring ring-1" />
            <div className="decorative-ring ring-2" />
            <div className="doctor-photo bg-white border border-border w-full max-w-sm aspect-[4/5] flex items-center justify-center overflow-hidden relative">
              <Image src="/images/doctor-portrait.png" alt="Dr. Rajeshwari Vaidya" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 384px" />
            </div>
          </div>
          <div className="relative">
            <BackgroundOrb color="blue" size="md" className="-top-10 -right-10" />
            <h2 className="font-display text-[28px] lg:text-[36px] font-semibold relative z-[1]">Expert Care. Real Conversations.</h2>
            <p className="mt-3 text-text-secondary text-[15px] relative z-[1]">Our certified doctors specialise in personalised herbal healthcare — confidential, non-judgmental and evidence-aligned.</p>
            <ul className="mt-4 flex flex-col gap-2 text-[14px] relative z-[1]">
              {["Evidence-based treatment plans", "Genuine lab-tested medicines", "Ongoing support until you see results"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-success">check_circle</span> {t}
                </li>
              ))}
            </ul>
            <div className="mt-4 card p-4 relative z-[1]">
              <div className="font-semibold text-[15px]">Dr. Rajeshwari Vaidya, MD (Ayurveda)</div>
              <div className="text-[13px] text-text-secondary">24 years · Former Dean, Kerala Shastra Parishad</div>
            </div>
            <Link href="/science" className="btn-primary mt-5 relative z-[1]">Consult Our Doctors</Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — tinted band */}
      <section className="section relative overflow-hidden" style={{ background: "var(--color-bg-secondary)" }}>
        <BackgroundOrb color="coral" size="md" className="-top-16 -right-24" />
        <div className="container-x relative z-[1]">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-border text-primary text-[11px] font-bold uppercase tracking-widest shadow-sm">
                <span className="material-symbols-outlined text-[14px] text-coral">favorite</span> Patient Stories
              </div>
              <h2 className="mt-2 font-display text-[28px] lg:text-[36px] font-semibold">Real People. Real Results.</h2>
              <p className="text-text-secondary text-[14px]">Stories from people who have taken control of their health.</p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-primary text-white text-[13px] font-semibold shrink-0">
              <span className="text-coral-light">★★★★★</span> 4.9/5
            </span>
          </div>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <div key={t.n} className="testimonial-card">
                <p className="text-[14px] leading-6 relative z-[1]">“{t.q}”</p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-mist-light grid place-items-center text-primary font-bold text-[13px]">{t.n[0]}</span>
                  <div>
                    <div className="font-semibold text-[13px]">{t.n}</div>
                    <div className="text-[12px] text-text-secondary">{t.c}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="section-sm">
        <div className="container-x">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mist-light text-primary text-[11px] font-bold uppercase tracking-widest">
                <span className="material-symbols-outlined text-[14px]">menu_book</span> Ayurvedic Journal
              </div>
              <h2 className="mt-2 font-display text-[28px] lg:text-[36px] font-semibold">Knowledge for a Healthier You</h2>
            </div>
            <Link href="/journal" className="text-[14px] font-semibold text-plum hover:underline shrink-0">View All Articles →</Link>
          </div>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              { tag: "Gut Health", t: "Understanding Agni: Why Gut Fire is the Master Key to Immunity", img: "/images/hero-apothecary.png" },
              { tag: "Vitality", t: "Shilajit & Ashwagandha: The Synergy Behind Cellular Energy", img: "/images/article-synergy.png" },
              { tag: "Dosha Balance", t: "Ojas: How Ashwagandha Supports Calm Without Sedation", img: "/images/article-ojas.png" },
            ].map((a) => (
              <Link key={a.t} href="/journal" className="article-card">
                <div className="aspect-[16/9] bg-bg-secondary relative overflow-hidden">
                  <Image src={a.img} alt={a.t} fill className="object-cover" sizes="(max-width: 768px) 100vw, 384px" />
                </div>
                <div className="p-[22px]">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-plum">{a.tag}</div>
                  <div className="mt-1 font-display text-[18px] font-semibold leading-snug">{a.t}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-sm relative overflow-hidden">
        <BackgroundOrb color="coral" size="md" className="top-10 -left-24" />
        <BackgroundOrb color="blue" size="md" className="bottom-0 -right-20" />
        <div className="container-x grid lg:grid-cols-2 gap-8 relative z-[1]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mist-light text-primary text-[11px] font-bold uppercase tracking-widest">
              <span className="material-symbols-outlined text-[14px]">help</span> Help Center
            </div>
            <h2 className="mt-2 font-display text-[28px] lg:text-[36px] font-semibold">Frequently Asked Questions</h2>
            <div className="mt-4 flex flex-col gap-3">
              {[
                ["Is the consultation really confidential?", "Yes. Private assessments, discreet packaging and no labels that reveal contents.", "lock", "bg-plum", "text-white"],
                ["How long does delivery take?", "2–3 days in metros, 4–5 days elsewhere. Free shipping over ₹499.", "local_shipping", "bg-coral", "text-primary"],
                ["Are the medicines genuine?", "Every batch is NABL lab-tested with certificates. AYUSH & GMP certified.", "verified", "bg-success", "text-white"],
                ["Do I need a prescription?", "Our doctors assess you online and prescribe what is right for you.", "stethoscope", "bg-mist", "text-primary"],
              ].map(([q, a, icon, badge, itext], i) => (
                <details key={q} className="group bg-white border border-border rounded-[20px] overflow-hidden open:border-plum/40 open:shadow-[0_18px_40px_rgba(23,35,61,0.10)] transition-all">
                  <summary className="cursor-pointer list-none flex items-center gap-3 p-4">
                    <span className={`w-10 h-10 rounded-full ${badge} grid place-items-center shrink-0`}>
                      <span className={`material-symbols-outlined text-[20px] ${itext}`}>{icon}</span>
                    </span>
                    <span className="flex-1">
                      <span className="block text-[11px] font-bold uppercase tracking-widest text-text-muted">0{i + 1}</span>
                      <span className="block font-semibold text-[15px]">{q}</span>
                    </span>
                    <span className="w-9 h-9 rounded-full bg-bg-secondary grid place-items-center shrink-0 group-open:bg-primary group-open:text-white transition-colors">
                      <span className="material-symbols-outlined text-[20px] group-open:rotate-180 transition-transform">expand_more</span>
                    </span>
                  </summary>
                  <p className="mx-4 pb-4 pl-[68px] text-[14px] text-text-secondary border-t border-border/70 pt-3">{a}</p>
                </details>
              ))}
            </div>
          </div>
          <div className="support-card self-start relative overflow-hidden lg:mt-[96px]">
            <BackgroundOrb color="coral" size="sm" className="-top-10 -right-10" />
            <div className="relative z-[1]">
              <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-plum">
                <span className="material-symbols-outlined text-[16px]">support_agent</span> Care Team
              </div>
              <h3 className="mt-1 font-display text-[24px] font-semibold">Still have questions?</h3>
              <p className="mt-1 text-[14px] text-text-secondary">Talk to our care team for discreet help.</p>
              {sent ? (
                <div className="mt-4 rounded-[18px] bg-white/80 border border-success/30 p-4 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-success text-white grid place-items-center shrink-0">
                    <span className="material-symbols-outlined">check</span>
                  </span>
                  <div>
                    <div className="font-semibold text-[14px]">Request received!</div>
                    <div className="text-[13px] text-text-secondary">We&apos;ll reach out within 24 hours. Private, always.</div>
                  </div>
                </div>
              ) : (
                <form className="mt-4 flex flex-col gap-2.5" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                  <label className="flex items-center gap-2 h-12 px-4 rounded-full border border-border bg-white focus-within:border-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px] text-text-muted">person</span>
                    <input required type="text" autoComplete="name" placeholder="Full name" className="bg-transparent flex-1 text-[14px] focus:outline-none" />
                  </label>
                  <label className="flex items-center gap-2 h-12 px-4 rounded-full border border-border bg-white focus-within:border-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px] text-text-muted">mail</span>
                    <input required type="email" placeholder="Email address" className="bg-transparent flex-1 text-[14px] focus:outline-none" />
                  </label>
                  <label className="flex items-center gap-2 h-12 px-4 rounded-full border border-border bg-white focus-within:border-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px] text-text-muted">call</span>
                    <span className="text-[14px] font-semibold text-text-secondary border-r border-border pr-2">+91</span>
                    <input required type="tel" inputMode="tel" pattern="[0-9]{10}" maxLength={10} placeholder="Phone number" className="bg-transparent flex-1 text-[14px] focus:outline-none" />
                  </label>
                  <button className="btn-primary w-full">Get Support →</button>
                </form>
              )}
              <p className="mt-2 text-[12px] text-text-secondary">Private. No spam. Reply within 24 hours.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
