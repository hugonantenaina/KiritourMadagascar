import React, { useState, useEffect, useRef } from "react";

const serif = "'Playfair Display', serif";
const sans  = "'DM Sans', sans-serif";
const WA    = "261336640777";
const wa    = (m) => window.open(`https://wa.me/${WA}?text=${encodeURIComponent(m)}`, "_blank");

const IMAGES = [
  "https://i.ibb.co/HTL3Q4rZ/481118988-615485718059235-5191906859147117016-n.jpg",
  "https://i.ibb.co/xSJDDhtq/481202816-615485684725905-5471504611419932105-n.jpg",
  "https://i.ibb.co/N2Zxc2LD/481013880-616313274643146-1197838507194107289-n.jpg",
  "https://i.ibb.co/QvcM9fSJ/481021950-615485701392570-7688648212765191037-n.jpg",
  "https://i.ibb.co/JDk7Zq7/481260306-615492431391897-8434926003740104829-n.jpg",
  "https://i.ibb.co/wZTqH57j/481100319-617338717873935-1422479692900490020-n.jpg",
  "https://i.ibb.co/XrHYQ6Tc/481246337-613160664958407-9158645622324627975-n.jpg",
  "https://i.ibb.co/9mHYGJDL/481054910-616313221309818-7684384815503728786-n.jpg",
  "https://i.ibb.co/LdRFtHHZ/481273153-617345567873250-7005368056948240299-n.jpg",
  "https://i.ibb.co/Wp7D6Mj3/481702680-617338884540585-1429951551320447951-n.jpg",
  "https://i.ibb.co/QjhYkRKS/481899821-617345647873242-8849299803525299001-n.jpg",
  "https://i.ibb.co/sJjJt5PP/481901368-622644420676698-7809259296193601309-n.jpg",
  "https://i.ibb.co/Vcjqj5qn/480920564-616305984643875-6023645484041351512-n.jpg",
  "https://i.ibb.co/67f9PNtv/482022252-616305587977248-1697610367723620863-n.jpg",
  "https://i.ibb.co/bMVjfG7f/482086084-622644274010046-302241343176060808-n.jpg",
  "https://i.ibb.co/2fJp14W/482089039-622644330676707-26413272241478943-n-2.jpg",
  "https://i.ibb.co/QFTpd7Vh/482134544-622644294010044-2023099778443110499-n.jpg",
  "https://i.ibb.co/S4RsGXQf/482303901-622644357343371-1021863377805875866-n.jpg",
  "https://i.ibb.co/BK47QxVF/487170957-642659705341836-3523930015298641710-n.jpg",
  "https://i.ibb.co/svnmBBrN/487300468-642660172008456-1784844811325108864-n.jpg",
  "https://i.ibb.co/r20kzgq7/487467732-642658478675292-3652683727424298490-n.jpg",
  "https://i.ibb.co/mCN7rcPq/488622653-646070041667469-7283889332043018845-n.jpg",
  "https://i.ibb.co/FbS6nWvQ/518391942-736400205967785-7017386129398738805-n.jpg",
  "https://i.ibb.co/275sTjL4/528152851-753406044267201-203860243128636867-n.jpg",
  "https://i.ibb.co/842chRZk/539419198-771015829172889-8883411045894766482-n.jpg",
  "https://i.ibb.co/zTPWvkwR/548080866-787382674202871-303494620730471973-n.jpg",
  "https://i.ibb.co/twgdVcTx/548872959-787382534202885-5235352075499216038-n.jpg",
  "https://i.ibb.co/39X0PJvp/549159438-790143160593489-7850289184231709116-n.jpg",
];

const HERO_IMGS = IMAGES.slice(0, 5);

const AMENITIES = [
  { icon: "🌿", label: "Nature immersion"  },
  { icon: "🦁", label: "Fossa & lémuriens" },
  { icon: "🍽️", label: "Restaurant local"  },
  { icon: "🏊", label: "Piscine"            },
  { icon: "🌙", label: "Night walks"        },
  { icon: "📶", label: "WiFi zones communes"},
  { icon: "🚗", label: "Transfert inclus"   },
  { icon: "🎒", label: "Excursions guidées" },
];

/* ── once visible hook ── */
function useOnceVis(threshold = 0.08) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setV(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return [ref, v];
}

function R({ children, d = 0, className = "" }) {
  const [ref, v] = useOnceVis();
  return (
    <div ref={ref} className={className} style={{
      opacity: v ? 1 : 0,
      transform: v ? "none" : "translateY(36px)",
      transition: `opacity .8s cubic-bezier(.16,1,.3,1) ${d}s, transform .8s cubic-bezier(.16,1,.3,1) ${d}s`,
    }}>{children}</div>
  );
}

/* ── Lightbox ── */
function Lightbox({ images, idx, onClose, onPrev, onNext }) {
  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,.95)", backdropFilter: "blur(20px)" }}
      onClick={onClose}>
      <button onClick={onClose} className="absolute top-5 right-5 w-11 h-11 rounded-full flex items-center justify-center transition-all"
        style={{ background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.15)", color: "rgba(255,255,255,.7)" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all"
        style={{ background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.15)", color: "rgba(255,255,255,.7)" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <img src={images[idx]} alt="" className="max-h-[88vh] max-w-[88vw] object-contain rounded-2xl"
        style={{ boxShadow: "0 40px 100px rgba(0,0,0,.8)" }} onClick={(e) => e.stopPropagation()} />
      <button onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all"
        style={{ background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.15)", color: "rgba(255,255,255,.7)" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm" style={{ fontFamily: sans, color: "rgba(255,255,255,.4)" }}>
        {idx + 1} / {images.length}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════ */
export default function HotelSection() {
  const [sectionRef, sectionVis] = useOnceVis(0.05);
  const [heroIdx, setHeroIdx]     = useState(0);
  const [lightIdx, setLightIdx]   = useState(null);

  /* auto-slide hero */
  useEffect(() => {
    const t = setInterval(() => setHeroIdx(i => (i + 1) % HERO_IMGS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="hotel-section"
      ref={sectionRef}
      className="relative py-20 md:py-28 px-4 overflow-hidden"
      style={{ background: "linear-gradient(160deg,#030f07 0%,#0a2315 40%,#0d2e1a 70%,#030f07 100%)" }}
    >
      {/* Noise texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "160px" }} />
      {/* Top line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(250,204,21,.4),transparent)" }} />

      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* ══ HEADER ══ */}
        <div className="mb-14 md:mb-18"
          style={{ opacity: sectionVis ? 1 : 0, transform: sectionVis ? "none" : "translateY(40px)", transition: "opacity .9s ease, transform .9s ease" }}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 rounded-full" style={{ background: "#facc15" }} />
                <span style={{ fontFamily: sans, fontSize: 11, color: "#facc15", textTransform: "uppercase", letterSpacing: ".4em", fontWeight: 700 }}>
                  Partenaire KiriTour
                </span>
              </div>
              <h2 className="text-white font-black leading-none"
                style={{ fontFamily: serif, fontSize: "clamp(2.5rem,6vw,5rem)", letterSpacing: "-.03em" }}>
                Relais de<br />
                <em style={{ color: "#facc15", fontStyle: "italic" }}>Kirindy</em>
              </h2>
            </div>
            <div className="flex flex-col gap-2 md:items-end">
              <p style={{ fontFamily: sans, fontSize: 13, color: "rgba(255,255,255,.4)", maxWidth: 280, lineHeight: 1.6, textAlign: "right" }}>
                Lodge écotouristique au cœur de la forêt sèche de Kirindy — 1h30 de Morondava
              </p>
              {/* Partner badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full w-fit"
                style={{ background: "rgba(250,204,21,.1)", border: "1px solid rgba(250,204,21,.25)" }}>
                <span style={{ color: "#facc15", fontSize: 10, fontFamily: sans, fontWeight: 700, letterSpacing: ".25em", textTransform: "uppercase" }}>
                  ✦ Hébergement officiel
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ══ MAIN GRID ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* ── LEFT : Hero slideshow + about (5 cols) ── */}
          <div className="lg:col-span-5 flex flex-col gap-4">

            {/* Hero slideshow */}
            <R d={0}>
              <div className="relative rounded-3xl overflow-hidden" style={{ height: "clamp(260px,35vw,420px)" }}>
                {HERO_IMGS.map((src, i) => (
                  <div key={i} className="absolute inset-0 transition-opacity duration-1000"
                    style={{ opacity: heroIdx === i ? 1 : 0 }}>
                    <img src={src} alt="" className="w-full h-full object-cover"
                      style={{ animation: heroIdx === i ? "hkb-hotel 14s ease-out both" : "none" }} />
                  </div>
                ))}
                {/* Gradients */}
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(to top,rgba(3,15,7,.92) 0%,rgba(3,15,7,.2) 50%,transparent 100%)" }} />
                {/* Dots */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full px-3 py-2"
                  style={{ background: "rgba(0,0,0,.4)", backdropFilter: "blur(8px)" }}>
                  {HERO_IMGS.map((_, i) => (
                    <button key={i} onClick={() => setHeroIdx(i)} className="rounded-full transition-all duration-300"
                      style={{ height: 7, width: heroIdx === i ? 20 : 7, background: heroIdx === i ? "#facc15" : "rgba(255,255,255,.3)" }} />
                  ))}
                </div>
                {/* Badge top-left */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(3,15,7,.75)", border: "1px solid rgba(250,204,21,.3)", backdropFilter: "blur(12px)" }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#facc15" }} />
                  <span style={{ fontFamily: sans, fontSize: 10, color: "#facc15", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase" }}>Lodge Partenaire</span>
                </div>
                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p style={{ fontFamily: serif, fontSize: "1.4rem", color: "white", fontWeight: 700, lineHeight: 1.1 }}>Relais de Kirindy</p>
                      <p style={{ fontFamily: sans, fontSize: 12, color: "#facc15", marginTop: 3 }}>Kirindy Forest · 60 km de Morondava</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {[...Array(5)].map((_, i) => <span key={i} style={{ color: "#facc15", fontSize: 13 }}>★</span>)}
                    </div>
                  </div>
                </div>
              </div>
            </R>

            {/* Quick stats */}
            <R d={0.08}>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { n: "1h30", label: "De Morondava",      icon: "🚗" },
                  { n: "20+",  label: "Espèces lémuriens", icon: "🐒" },
                  { n: "4.8★", label: "Note Google",       icon: "⭐" },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col items-center text-center p-4 rounded-2xl gap-1"
                    style={{ background: "rgba(255,255,255,.04)", border: "1.5px solid rgba(255,255,255,.07)" }}>
                    <span style={{ fontSize: 20 }}>{s.icon}</span>
                    <span style={{ fontFamily: serif, fontSize: "1.25rem", color: "#facc15", fontWeight: 700, lineHeight: 1 }}>{s.n}</span>
                    <span style={{ fontFamily: sans, fontSize: 10, color: "rgba(255,255,255,.35)", lineHeight: 1.3 }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </R>

            {/* About text */}
            <R d={0.1}>
              <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)" }}>
                <p style={{ fontFamily: sans, fontSize: 13, color: "rgba(255,255,255,.55)", lineHeight: 1.75 }}>
                  Le <strong style={{ color: "white" }}>Relais de Kirindy</strong> est un lodge écotouristique niché au cœur de la forêt sèche de Kirindy, dernier habitat de la <strong style={{ color: "#facc15" }}>Fossa</strong> — le prédateur emblématique de Madagascar. Partenaire officiel de KiriTour.
                </p>
              </div>
            </R>

            {/* Amenities grid */}
            <R d={0.12}>
              <div className="grid grid-cols-4 gap-2">
                {AMENITIES.map((a, i) => (
                  <div key={i} className="flex flex-col items-center text-center p-3 rounded-xl gap-1.5 transition-all hover:-translate-y-0.5"
                    style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.06)" }}>
                    <span style={{ fontSize: 18 }}>{a.icon}</span>
                    <span style={{ fontFamily: sans, fontSize: 9, color: "rgba(255,255,255,.4)", lineHeight: 1.3 }}>{a.label}</span>
                  </div>
                ))}
              </div>
            </R>
          </div>

          {/* ── RIGHT : Gallery masonry + CTA (7 cols) ── */}
          <div className="lg:col-span-7 flex flex-col gap-4">

            {/* Gallery grid — masonry-style */}
            <R d={0.1}>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2" style={{ gridAutoRows: "120px" }}>
                {IMAGES.slice(0, 11).map((src, i) => (
                  <button key={i}
                    onClick={() => setLightIdx(i)}
                    className={`relative overflow-hidden rounded-2xl group transition-all hover:scale-[1.03] hover:z-10 ${i === 0 ? "col-span-2 row-span-2" : i === 5 ? "col-span-2" : ""}`}
                    style={{ boxShadow: "0 4px 20px rgba(0,0,0,.5)" }}>
                    <img src={src} alt="" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                      style={{ background: "rgba(0,0,0,.45)", backdropFilter: "blur(2px)" }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                    </div>
                  </button>
                ))}
                {/* See all button */}
                <button onClick={() => setLightIdx(11)}
                  className="relative overflow-hidden rounded-2xl flex flex-col items-center justify-center gap-1 transition-all hover:scale-[1.03]"
                  style={{ background: "rgba(250,204,21,.12)", border: "1.5px solid rgba(250,204,21,.3)" }}>
                  <span style={{ fontSize: 22 }}>🖼️</span>
                  <span style={{ fontFamily: sans, fontSize: 10, color: "#facc15", fontWeight: 700 }}>+{IMAGES.length - 11} photos</span>
                </button>
              </div>
            </R>

            {/* CTA booking card */}
            <R d={0.15}>
              <div className="relative rounded-3xl overflow-hidden p-6 sm:p-8"
                style={{ background: "linear-gradient(135deg,rgba(250,204,21,.14),rgba(250,204,21,.04))", border: "1.5px solid rgba(250,204,21,.25)" }}>
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(circle at 100% 0%,rgba(250,204,21,.12) 0%,transparent 55%)" }} />
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                  <div className="flex-1">
                    <p style={{ fontFamily: sans, fontSize: 10, color: "rgba(255,255,255,.4)", textTransform: "uppercase", letterSpacing: ".35em", marginBottom: 6 }}>
                      Réservation — Via KiriTour
                    </p>
                    <h3 style={{ fontFamily: serif, fontSize: "clamp(1.3rem,2.5vw,1.8rem)", color: "white", fontWeight: 700, marginBottom: 8 }}>
                      Séjournez au cœur<br />
                      <em style={{ color: "#facc15", fontStyle: "italic" }}>de la forêt</em>
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {["Transfert depuis Morondava", "Guide expert inclus", "Réponse en 2h"].map((t, i) => (
                        <span key={i} className="flex items-center gap-1.5"
                          style={{ fontFamily: sans, fontSize: 11, color: "rgba(255,255,255,.5)" }}>
                          <span style={{ color: "#facc15" }}>✓</span> {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2.5 flex-shrink-0 w-full sm:w-auto">
                    <button onClick={() => wa("Bonjour KiriTour ! Je souhaite réserver un séjour au Relais de Kirindy. Pouvez-vous m'envoyer les disponibilités et tarifs ?")}
                      className="flex items-center justify-center gap-2.5 rounded-2xl font-bold transition-all hover:scale-[1.03] active:scale-[.97] hover:shadow-2xl"
                      style={{ padding: "14px 24px", background: "linear-gradient(135deg,#facc15,#f59e0b)", color: "#0b1a0e", fontFamily: sans, fontSize: 14, boxShadow: "0 8px 28px rgba(250,204,21,.35)", minWidth: 200 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#0b1a0e"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a9.87 9.87 0 00-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      Réserver maintenant
                    </button>
                    <p style={{ fontFamily: sans, fontSize: 10, color: "rgba(255,255,255,.3)", textAlign: "center" }}>
                      Dès 60€ / nuit · Réponse sous 2h
                    </p>
                  </div>
                </div>
              </div>
            </R>

            {/* Contact mini-card — style MapSection */}
            <R d={0.18}>
              <div className="rounded-2xl p-4 relative overflow-hidden"
                style={{ background: "rgba(255,255,255,.04)", border: "1.5px solid rgba(255,255,255,.07)" }}>
                <div className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ background: "radial-gradient(circle at 0% 0%,rgba(250,204,21,.07) 0%,transparent 55%)" }} />
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <p style={{ fontFamily: serif, fontSize: "1rem", color: "white", fontWeight: 700, marginBottom: 4 }}>📍 Kirindy Forest, Madagascar</p>
                    <div className="flex flex-wrap gap-4">
                      {[
                        { icon: "🕐", text: "Ouvert toute l'année" },
                        { icon: "📞", text: "+261 33 664 07 77" },
                        { icon: "🚗", text: "1h30 de Morondava" },
                      ].map((row, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <span style={{ fontSize: 12 }}>{row.icon}</span>
                          <span style={{ fontFamily: sans, fontSize: 11, color: "rgba(255,255,255,.45)" }}>{row.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => wa("Bonjour KiriTour ! Je veux plus d'infos sur le Relais de Kirindy.")}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all hover:scale-105 active:scale-95 flex-shrink-0"
                    style={{ background: "rgba(37,211,102,.12)", color: "#25d366", border: "1.5px solid rgba(37,211,102,.25)", fontFamily: sans }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="#25d366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a9.87 9.87 0 00-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp
                  </button>
                </div>
              </div>
            </R>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightIdx !== null && (
        <Lightbox
          images={IMAGES}
          idx={lightIdx}
          onClose={() => setLightIdx(null)}
          onPrev={() => setLightIdx(i => (i - 1 + IMAGES.length) % IMAGES.length)}
          onNext={() => setLightIdx(i => (i + 1) % IMAGES.length)}
        />
      )}

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(250,204,21,.3),transparent)" }} />

      <style>{`
        @keyframes hkb-hotel {
          from { transform: scale(1.08); }
          to   { transform: scale(1); }
        }
      `}</style>
    </section>
  );
}