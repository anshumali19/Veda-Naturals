"use client";

import { useEffect, useState } from "react";

const KEY = "veda-age-ok";

export default function AgeGate() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // Mount gate so server and first client render match (localStorage is client-only).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  const [visible, setVisible] = useState(() => {
    try {
      if (typeof window === "undefined") return false;
      return !window.localStorage.getItem(KEY);
    } catch {
      return true;
    }
  });
  const [blocked, setBlocked] = useState(false);

  if (!mounted || !visible) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-primary-dark/80 backdrop-blur-xl">
      <div className="w-full max-w-md bg-white rounded-[22px] shadow-2xl p-8 text-center">
        {!blocked ? (
          <>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary text-primary text-[11px] font-bold uppercase tracking-widest">
              AYUSH / FSSAI • 18+
            </div>
            <div className="mt-4 font-display text-3xl font-semibold text-text">
              Veda Naturals
            </div>
            <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-text-muted font-bold">
              Ayurvedic Apothecary Registry
            </p>
            <div className="my-4 h-px w-12 mx-auto bg-coral" />
            <p className="text-[15px] text-text-secondary leading-6">
              Therapeutic Rasayana preparations require legal adult age. Are you 18 years or older?
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  try {
                    localStorage.setItem(KEY, "1");
                  } catch {}
                  setVisible(false);
                }}
                className="btn-primary"
              >
                Yes, I am
              </button>
              <button onClick={() => setBlocked(true)} className="btn-secondary">
                No, I&apos;m not
              </button>
            </div>
            <p className="mt-4 text-[12px] text-text-muted">
              No personal information is stored during verification.
            </p>
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-[40px] text-danger">lock_clock</span>
            <div className="mt-2 font-display text-2xl font-semibold text-text">
              Access Restricted
            </div>
            <p className="mt-2 text-[14px] text-text-secondary">
              This apothecary is exclusively for 18+. Classical rasayanas are formulated for adult
              physiology.
            </p>
            <button onClick={() => setBlocked(false)} className="btn-primary mt-6">
              Return to verification
            </button>
            <div className="mt-3 text-[12px] text-text-muted">GMP • AYUSH Certified</div>
          </>
        )}
      </div>
    </div>
  );
}
