"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { heroSlides, heroTrust } from "@/lib/content";
import BackgroundOrb from "@/components/decorations/BackgroundOrb";
import PulseLine from "@/components/decorations/PulseLine";
import MedicalPlus from "@/components/decorations/MedicalPlus";

const AUTOPLAY_MS = 5500;
const RESUME_MS = 12000;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);
  const [reduced, setReduced] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchX = useRef<number | null>(null);
  const hover = useRef(false);
  const focus = useRef(false);
  const total = heroSlides.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Sync once on mount (client-only value; server renders non-reduced identically).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const clear = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };

  useEffect(() => {
    clear();
    if (!auto || reduced) return;
    timer.current = setInterval(() => {
      if (document.hidden || hover.current || focus.current) return;
      setIndex((i) => (i + 1) % total);
    }, AUTOPLAY_MS);
    return clear;
  }, [auto, reduced, total]);

  useEffect(
    () => () => {
      clear();
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    },
    []
  );

  const pauseBriefly = useCallback(() => {
    setAuto(false);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setAuto(true), RESUME_MS);
  }, []);

  const go = useCallback(
    (i: number) => {
      setIndex(((i % total) + total) % total);
      pauseBriefly();
    },
    [pauseBriefly, total]
  );

  const toggle = useCallback(() => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    setAuto((a) => !a);
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(index + 1);
    if (e.key === "ArrowLeft") go(index - 1);
  };

  const slide = heroSlides[index];
  const playing = auto && !reduced;

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured wellness stories"
      aria-live={playing ? "off" : "polite"}
      tabIndex={0}
      onKeyDown={onKey}
      onMouseEnter={() => (hover.current = true)}
      onMouseLeave={() => (hover.current = false)}
      onFocus={() => (focus.current = true)}
      onBlur={() => (focus.current = false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) < 40) return;
        go(index + (dx < 0 ? 1 : -1));
      }}
      className="relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-plum"
      style={{
        background:
          "radial-gradient(circle at 85% 20%, rgba(155,106,149,.14), transparent 30%), var(--color-bg)",
      }}
    >
      <BackgroundOrb color="plum" size="lg" float className="-top-[180px] -right-[140px]" />
      <BackgroundOrb color="coral" size="md" className="-bottom-[100px] -left-[100px]" />
      <PulseLine className="-right-[80px] bottom-[40px] -rotate-[8deg]" />
      <MedicalPlus size={36} className="absolute top-[120px] left-[8%] hidden lg:flex" />
      <MedicalPlus size={28} className="absolute bottom-[140px] right-[12%] hidden lg:flex" />

      <div className="container-x relative z-[1] pt-12 pb-6 lg:pt-16 lg:min-h-[76vh] flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div key={`text-${slide.id}`} className="slide-in-text order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-border text-primary text-[11px] font-bold uppercase tracking-widest shadow-sm">
              <span className="w-2 h-2 rounded-full bg-success" />
              {slide.eyebrow}
            </div>
            <h1 className="mt-4 font-display text-[40px] leading-[48px] sm:text-[48px] sm:leading-[56px] lg:text-[64px] lg:leading-[72px] font-semibold text-text tracking-tight text-balance">
              {slide.heading}
            </h1>
            <p className="mt-4 text-[16px] leading-[26px] text-text-secondary max-w-xl">{slide.body}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link href={slide.primary.href} className="btn-primary">
                {slide.primary.label}
              </Link>
              <Link href={slide.secondary.href} className="btn-secondary">
                {slide.secondary.label}
              </Link>
            </div>
          </div>

          {/* Image */}
          <div key={`img-${slide.id}`} className="slide-in-img relative flex justify-center order-2 lg:row-span-2 py-2">
            <div className="decorative-ring ring-2 hidden sm:block" />
            <div className="decorative-ring ring-3 hidden sm:block" />
            <div className="doctor-photo bg-white border border-border w-full max-w-md aspect-[4/5] overflow-hidden">
              {heroSlides.map((s, i) => (
                <Image
                  key={s.id}
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  className={`object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
                  sizes="(max-width: 1024px) 100vw, 448px"
                  priority={i === 0}
                  loading={i === 0 ? undefined : "lazy"}
                  aria-hidden={i === index ? undefined : true}
                />
              ))}
              <div className="absolute bottom-4 left-4 inline-flex items-center gap-1 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[12px] font-semibold shadow-sm">
                <span className="material-symbols-outlined text-success text-[14px]">shield</span>
                100% Shodhita • Lab-Tested Purity
              </div>
              {slide.badges.slice(0, 2).map((b, i) => (
                <span
                  key={b}
                  className={`absolute px-3 py-1.5 rounded-full bg-white/90 backdrop-blur text-[12px] font-semibold shadow-sm border border-border ${
                    i === 0 ? "top-4 right-4" : "top-1/2 -right-2"
                  }`}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Trust points */}
          <div className="order-3 lg:col-start-1 flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-medium text-text-secondary">
            {heroTrust.map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-success">check_circle</span> {t}
              </span>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <button onClick={() => go(index - 1)} aria-label="Previous slide"
            className="w-11 h-11 rounded-full bg-white border border-border grid place-items-center hover:bg-bg-secondary transition-colors">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <div className="flex items-center gap-2" role="tablist" aria-label="Slides">
            {heroSlides.map((s, i) => (
              <button key={s.id} role="tab" aria-selected={i === index} aria-label={`Slide ${i + 1}: ${s.preview.title}`}
                onClick={() => go(i)}
                className={`h-2.5 rounded-full transition-all ${i === index ? "w-8 bg-primary" : "w-2.5 bg-border hover:bg-text-muted"}`} />
            ))}
          </div>
          <button onClick={() => go(index + 1)} aria-label="Next slide"
            className="w-11 h-11 rounded-full bg-white border border-border grid place-items-center hover:bg-bg-secondary transition-colors">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
          <button onClick={toggle} aria-label={playing ? "Pause autoplay" : "Play autoplay"}
            className="w-11 h-11 rounded-full bg-white border border-border grid place-items-center hover:bg-bg-secondary transition-colors">
            <span className="material-symbols-outlined">{playing ? "pause" : "play_arrow"}</span>
          </button>
        </div>
        <p className="sr-only" aria-live="polite">
          Slide {index + 1} of {total}: {slide.preview.title}
        </p>

        {/* Preview nav */}
        <div className="mt-5 grid grid-cols-4 max-lg:flex max-lg:overflow-x-auto max-lg:snap-x gap-3 pb-1">
          {heroSlides.map((s, i) => (
            <button key={s.id} onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}: ${s.preview.title}`}
              className={`max-lg:min-w-[220px] max-lg:snap-start text-left rounded-[18px] border p-4 flex items-center gap-3 transition-all bg-white ${
                i === index ? "border-primary shadow-[0_18px_40px_rgba(23,35,61,0.12)]" : "border-border hover:border-text-muted"
              }`}>
              <span className={`w-9 h-9 rounded-full grid place-items-center text-[13px] font-bold shrink-0 ${i === index ? "bg-primary text-white" : "bg-bg-secondary text-text-secondary"}`}>
                {s.preview.no}
              </span>
              <span className="min-w-0">
                <span className="block font-semibold text-[13px] leading-5 truncate">{s.preview.title}</span>
                <span className="block text-[12px] text-text-secondary truncate">{s.preview.desc}</span>
              </span>
              <span className={`material-symbols-outlined text-[20px] ml-auto shrink-0 ${i === index ? "text-primary" : "text-text-muted"}`}>
                {s.preview.icon}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
