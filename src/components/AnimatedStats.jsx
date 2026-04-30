import React, { useState, useEffect, useRef } from "react";

const serif = "'Playfair Display', serif";
const sans  = "'DM Sans', sans-serif";

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(
      ([e]) => { setVis(e.isIntersecting); },
      { threshold }
    );
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [threshold]);
  return [ref, vis];
}

function AnimCounter({ target, suffix = "", active, decimals = 0 }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) { setN(0); return; }
    let start;
    let raf;
    const duration = 2200;
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
  return <>{(n).toFixed(decimals)}{suffix}</>;
}

/* ── SVG Icons ─────────────────────────────────────────── */
const IconTravellers = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
    <circle cx="14" cy="13" r="5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="26" cy="13" r="5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M4 32c0-5.523 4.477-10 10-10h12c5.523 0 10 4.477 10 10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
  </svg>
);

const IconTours = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
    <path d="M20 4C13.373 4 8 9.373 8 16c0 9 12 20 12 20s12-11 12-20c0-6.627-5.373-12-12-12z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="20" cy="16" r="4" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M6 34h28" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
  </svg>
);

const IconRating = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
    <path d="M20 5l4.635 9.389 10.365 1.506-7.5 7.309 1.77 10.319L20 28.389l-9.27 4.874 1.77-10.319L5 15.895l10.365-1.506L20 5z"
      stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15"/>
  </svg>
);

const IconExperience = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
    <rect x="6" y="10" width="28" height="22" rx="3" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M6 17h28" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M14 6v8M26 6v8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M13 24l3 3 7-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const STATS = [
  {
    value: 260, suffix: "+", decimals: 0,
    label: "Happy Travellers",
    sub: "Voyageurs satisfaits",
    Icon: IconTravellers,
    accent: "#facc15",
    glow: "rgba(250,204,21,0.25)",
    grad: "linear-gradient(135deg,rgba(250,204,21,0.18),rgba(250,204,21,0.04))",
    border: "rgba(250,204,21,0.3)",
  },
  {
    value: 14, suffix: "+", decimals: 0,
    label: "Tour Packages",
    sub: "Circuits disponibles",
    Icon: IconTours,
    accent: "#34d399",
    glow: "rgba(52,211,153,0.25)",
    grad: "linear-gradient(135deg,rgba(52,211,153,0.18),rgba(52,211,153,0.04))",
    border: "rgba(52,211,153,0.3)",
  },
  {
    value: 4.7, suffix: "★", decimals: 1,
    label: "Average Rating",
    sub: "Note moyenne clients",
    Icon: IconRating,
    accent: "#fb923c",
    glow: "rgba(251,146,60,0.25)",
    grad: "linear-gradient(135deg,rgba(251,146,60,0.18),rgba(251,146,60,0.04))",
    border: "rgba(251,146,60,0.3)",
  },
  {
    value: 3, suffix: " ans", decimals: 0,
    label: "Years Experience",
    sub: "D'expérience terrain",
    Icon: IconExperience,
    accent: "#a78bfa",
    glow: "rgba(167,139,250,0.25)",
    grad: "linear-gradient(135deg,rgba(167,139,250,0.18),rgba(167,139,250,0.04))",
    border: "rgba(167,139,250,0.3)",
  },
];

export default function AnimatedStats() {
  const [ref, vis] = useInView(0.25);
  const [animKey, setAnimKey] = useState(0);
  useEffect(() => { if (vis) setAnimKey(k => k + 1); }, [vis]);

  return (
    <section
      ref={ref}
      className="relative py-20 overflow-hidden"
      style={{ background: "linear-gradient(160deg,#030f07 0%,#0a2315 40%,#0d2e1a 70%,#030f07 100%)" }}
    >
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-30"
        style={{ backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")", backgroundSize:"160px" }} />

      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background:"#facc15", transform:"translateY(-50%)" }} />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background:"#34d399", transform:"translateY(50%)" }} />

      {/* Thin top border line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background:"linear-gradient(90deg,transparent,rgba(250,204,21,0.4),transparent)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Section label */}
        <p className="text-center text-xs font-bold tracking-[0.4em] uppercase mb-12 text-green-400/60" style={{ fontFamily:sans }}>
          — Nos Chiffres Clés —
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((s, i) => (
            <div
              key={`${animKey}-${i}`}
              className="relative group rounded-2xl p-6 md:p-8 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 cursor-default"
              style={{
                background: s.grad,
                border: `1px solid ${s.border}`,
                backdropFilter: "blur(20px)",
                boxShadow: `0 4px 30px rgba(0,0,0,0.4)`,
                animation: vis ? `statFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s both` : "none",
              }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow:`0 0 40px ${s.glow}, inset 0 0 30px ${s.glow.replace("0.25","0.06")}` }} />

              {/* Icon container */}
              <div
                className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-400 group-hover:scale-110 group-hover:rotate-6"
                style={{
                  background:`linear-gradient(135deg,${s.accent}22,${s.accent}0a)`,
                  border:`1.5px solid ${s.accent}44`,
                  color: s.accent,
                  boxShadow:`0 4px 20px ${s.glow}`,
                }}
              >
                <s.Icon />
                {/* Icon inner glow */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background:`radial-gradient(circle at center,${s.accent}20,transparent 70%)` }} />
              </div>

              {/* Number */}
              <div
                className="text-4xl md:text-5xl font-black leading-none mb-1 transition-all duration-300 group-hover:scale-105"
                style={{
                  fontFamily: serif,
                  color: s.accent,
                  textShadow: `0 0 30px ${s.glow}`,
                  letterSpacing: "-0.02em",
                }}
              >
                <AnimCounter target={s.value} suffix={s.suffix} active={vis} decimals={s.decimals} />
              </div>

              {/* Label */}
              <p className="text-white font-bold text-sm mb-1 mt-2" style={{ fontFamily:sans }}>
                {s.label}
              </p>

              {/* Sub label */}
              <p className="text-white/35 text-[10px] font-medium tracking-wider uppercase" style={{ fontFamily:sans }}>
                {s.sub}
              </p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-500 group-hover:w-3/4"
                style={{ width:"2rem", background:`linear-gradient(90deg,transparent,${s.accent},transparent)` }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Thin bottom border line */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background:"linear-gradient(90deg,transparent,rgba(52,211,153,0.3),transparent)" }} />

      <style>{`
        @keyframes statFadeUp {
          from { opacity:0; transform:translateY(40px) scale(0.95); }
          to   { opacity:1; transform:translateY(0)    scale(1);    }
        }
      `}</style>
    </section>
  );
}