import React, { useState, useEffect, useRef } from "react";

const serif = "'Playfair Display', serif";
const sans  = "'DM Sans', sans-serif";

/* ✅ FIX CLS — useOnceVisible (tsy trigger indroa) */
function useOnceVisible(threshold = 0.2) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); o.disconnect(); } },
      { threshold }
    );
    o.observe(el);
    return () => o.disconnect();
  }, [threshold]);
  return [ref, vis];
}

function AnimCounter({ target, suffix = "", active, decimals = 0 }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start;
    let raf;
    const duration = 2000;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setN(target * ease);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);
  return <>{n.toFixed(decimals)}{suffix}</>;
}

const IconTravellers = () => (
  <svg viewBox="0 0 40 40" fill="none" width="28" height="28">
    <circle cx="14" cy="13" r="5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="26" cy="13" r="5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M4 32c0-5.523 4.477-10 10-10h12c5.523 0 10 4.477 10 10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
  </svg>
);
const IconTours = () => (
  <svg viewBox="0 0 40 40" fill="none" width="28" height="28">
    <path d="M20 4C13.373 4 8 9.373 8 16c0 9 12 20 12 20s12-11 12-20c0-6.627-5.373-12-12-12z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="20" cy="16" r="4" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M6 34h28" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
  </svg>
);
const IconRating = () => (
  <svg viewBox="0 0 40 40" fill="none" width="28" height="28">
    <path d="M20 5l4.635 9.389 10.365 1.506-7.5 7.309 1.77 10.319L20 28.389l-9.27 4.874 1.77-10.319L5 15.895l10.365-1.506L20 5z"
      stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15"/>
  </svg>
);
const IconExperience = () => (
  <svg viewBox="0 0 40 40" fill="none" width="28" height="28">
    <rect x="6" y="10" width="28" height="22" rx="3" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M6 17h28" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M14 6v8M26 6v8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M13 24l3 3 7-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const STATS = [
  { value:112, suffix:"+",    decimals:0, label:"Happy Travellers", sub:"Satisfied Travellers",  Icon:IconTravellers, accent:"#facc15", glow:"rgba(250,204,21,0.25)", grad:"linear-gradient(135deg,rgba(250,204,21,0.18),rgba(250,204,21,0.04))", border:"rgba(250,204,21,0.3)" },
  { value:14,  suffix:"+",    decimals:0, label:"Tour Packages",    sub:"Tours Available",  Icon:IconTours,      accent:"#34d399", glow:"rgba(52,211,153,0.25)",  grad:"linear-gradient(135deg,rgba(52,211,153,0.18),rgba(52,211,153,0.04))",  border:"rgba(52,211,153,0.3)" },
  { value:4.7, suffix:"★",    decimals:1, label:"Average Rating",   sub:"Google Average Rating",   Icon:IconRating,     accent:"#fb923c", glow:"rgba(251,146,60,0.25)",  grad:"linear-gradient(135deg,rgba(251,146,60,0.18),rgba(251,146,60,0.04))",  border:"rgba(251,146,60,0.3)" },
  { value:3,   suffix:" ans", decimals:0, label:"Years Experience", sub:"Field Experience",  Icon:IconExperience, accent:"#a78bfa", glow:"rgba(167,139,250,0.25)", grad:"linear-gradient(135deg,rgba(167,139,250,0.18),rgba(167,139,250,0.04))", border:"rgba(167,139,250,0.3)" },
];

export default function AnimatedStats() {
  const [ref, vis] = useOnceVisible(0.25);

  return (
    <section
      ref={ref}
      className="relative py-20 overflow-hidden"
      style={{ background: "linear-gradient(160deg,#030f07 0%,#0a2315 40%,#0d2e1a 70%,#030f07 100%)" }}
    >
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background:"#facc15", transform:"translateY(-50%)" }} />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background:"#34d399", transform:"translateY(50%)" }} />

      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background:"linear-gradient(90deg,transparent,rgba(250,204,21,0.4),transparent)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <p className="text-center text-xs font-bold tracking-[0.4em] uppercase mb-12 text-green-400/60" style={{ fontFamily:sans }}>
          — Key Statistics —
        </p>

        {/* ✅ FIX CLS — min-height explicite évite layout shift */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6" style={{ minHeight: 200 }}>
          {STATS.map((s, i) => (
            <div
              key={i}
              className="relative group rounded-2xl p-6 md:p-8 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 cursor-default"
              style={{
                background: s.grad,
                border: `1px solid ${s.border}`,
                backdropFilter: "blur(20px)",
                boxShadow: "0 4px 30px rgba(0,0,0,0.4)",
                /* ✅ FIX CLS — opacity au lieu de translateY */
                opacity: vis ? 1 : 0,
                transition: `opacity 0.6s ease ${i * 0.1}s`,
              }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow:`0 0 40px ${s.glow}` }} />

              {/* Icon */}
              <div className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background:`linear-gradient(135deg,${s.accent}22,${s.accent}0a)`,
                  border:`1.5px solid ${s.accent}44`,
                  color: s.accent,
                  boxShadow:`0 4px 20px ${s.glow}`,
                }}>
                <s.Icon />
              </div>

              {/* Number */}
              <div className="text-4xl md:text-5xl font-black leading-none mb-1"
                style={{ fontFamily:serif, color:s.accent, textShadow:`0 0 30px ${s.glow}`, letterSpacing:"-0.02em" }}>
                <AnimCounter target={s.value} suffix={s.suffix} active={vis} decimals={s.decimals} />
              </div>

              <p className="text-white font-bold text-sm mb-1 mt-2" style={{ fontFamily:sans }}>{s.label}</p>
              <p className="text-white/35 text-[10px] font-medium tracking-wider uppercase" style={{ fontFamily:sans }}>{s.sub}</p>

              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full w-8 group-hover:w-3/4 transition-all duration-500"
                style={{ background:`linear-gradient(90deg,transparent,${s.accent},transparent)` }} />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background:"linear-gradient(90deg,transparent,rgba(52,211,153,0.3),transparent)" }} />
    </section>
  );
}