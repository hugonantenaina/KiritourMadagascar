import React, { useState, useEffect, useRef } from "react";

/* ── Fonts ── */
if (typeof document !== "undefined" && !document.getElementById("kt-hotel-f")) {
  const l = document.createElement("link"); l.id = "kt-hotel-f"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap";
  document.head.appendChild(l);
}

const serif = "'Cormorant Garamond', serif";
const sans  = "'Outfit', sans-serif";
const WA    = "261336640777";
const wa    = (msg) => window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank");

/* ── All hotel images ── */
const IMAGES = [
  "https://i.ibb.co/Vcjqj5qn/480920564-616305984643875-6023645484041351512-n.jpg",
  "https://i.ibb.co/N2Zxc2LD/481013880-616313274643146-1197838507194107289-n.jpg",
  "https://i.ibb.co/QvcM9fSJ/481021950-615485701392570-7688648212765191037-n.jpg",
  "https://i.ibb.co/9mHYGJDL/481054910-616313221309818-7684384815503728786-n.jpg",
  "https://i.ibb.co/wZTqH57j/481100319-617338717873935-1422479692900490020-n.jpg",
  "https://i.ibb.co/HTL3Q4rZ/481118988-615485718059235-5191906859147117016-n.jpg",
  "https://i.ibb.co/xSJDDhtq/481202816-615485684725905-5471504611419932105-n.jpg",
  "https://i.ibb.co/XrHYQ6Tc/481246337-613160664958407-9158645622324627975-n.jpg",
  "https://i.ibb.co/JDk7Zq7/481260306-615492431391897-8434926003740104829-n.jpg",
  "https://i.ibb.co/LdRFtHHZ/481273153-617345567873250-7005368056948240299-n.jpg",
  "https://i.ibb.co/Wp7D6Mj3/481702680-617338884540585-1429951551320447951-n.jpg",
  "https://i.ibb.co/QjhYkRKS/481899821-617345647873242-8849299803525299001-n.jpg",
  "https://i.ibb.co/sJjJt5PP/481901368-622644420676698-7809259296193601309-n.jpg",
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

const HERO = IMAGES.slice(0, 5);

/* ── Amenities ── */
const AMENITIES = [
  { icon: "🌿", label: "Nature immersion",  desc: "Au cœur de Kirindy"         },
  { icon: "🦁", label: "Wildlife viewing",  desc: "Fossa & lémuriens"           },
  { icon: "🍽️", label: "Restaurant",        desc: "Cuisine malgache & française" },
  { icon: "🏊", label: "Piscine",           desc: "Vue sur la forêt"             },
  { icon: "🌙", label: "Night walks",       desc: "Guidés par experts"           },
  { icon: "📶", label: "WiFi",              desc: "Dans les zones communes"      },
  { icon: "🚗", label: "Transfert",         desc: "Depuis Morondava"             },
  { icon: "🎒", label: "Excursions",        desc: "Organisées par KiriTour"      },
];

const ROOMS = [
  {
    name: "Bungalow Forêt",
    desc: "Bungalow en bois au cœur de la forêt, terrasse privée avec vue sur la canopée.",
    price: "Dès 85€ / nuit",
    badge: "Le plus populaire",
    badgeColor: "#facc15",
    img: IMAGES[0],
    features: ["Terrasse privée", "Vue forêt", "Ventilateur", "Moustiquaire"],
  },
  {
    name: "Suite Baobab",
    desc: "Suite premium avec lit king-size, salle de bain en plein air et vue panoramique.",
    price: "Dès 140€ / nuit",
    badge: "Premium",
    badgeColor: "#f97316",
    img: IMAGES[4],
    features: ["Lit King-size", "Salle de bain outdoor", "Vue baobabs", "Petit-déjeuner inclus"],
  },
  {
    name: "Chambre Standard",
    desc: "Chambre confortable dans le lodge principal, idéale pour les aventuriers.",
    price: "Dès 60€ / nuit",
    badge: "Économique",
    badgeColor: "#34d399",
    img: IMAGES[2],
    features: ["Clim', ventilateur", "Salle de bain privée", "Accès piscine", "Petit-déjeuner"],
  },
];

/* ── Scroll reveal hook ── */
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return [ref, v];
}

function R({ children, d = 0, y = 36, className = "" }) {
  const [ref, v] = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: v ? 1 : 0,
      transform: v ? "none" : `translateY(${y}px)`,
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
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,.95)", backdropFilter: "blur(20px)" }}
      onClick={onClose}>
      <button onClick={onClose} className="absolute top-5 right-5 w-11 h-11 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-all" style={{ background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.15)", zIndex: 10 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-all" style={{ background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.15)" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <img src={images[idx]} alt="" className="max-h-[88vh] max-w-[88vw] object-contain rounded-2xl" style={{ boxShadow: "0 40px 100px rgba(0,0,0,.8)" }} onClick={(e) => e.stopPropagation()} />
      <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-all" style={{ background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.15)" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/40 text-sm" style={{ fontFamily: sans }}>
        {idx + 1} / {images.length}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════════ */
export default function Hotel() {
  const [heroIdx, setHeroIdx] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [in_, setIn] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setIn(true), 80);
    const t = setInterval(() => setHeroIdx(i => (i + 1) % HERO.length), 5000);
    return () => clearInterval(t);
  }, []);

  const openLightbox = (idx) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const prevImg = () => setLightboxIdx(i => (i - 1 + IMAGES.length) % IMAGES.length);
  const nextImg = () => setLightboxIdx(i => (i + 1) % IMAGES.length);

  return (
    <div style={{ background: "#0b1a0e", minHeight: "100svh", fontFamily: sans }}>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ height: "100svh", maxHeight: 860, minHeight: 560 }}>
        {HERO.map((src, i) => (
          <div key={i} className="absolute inset-0 transition-opacity duration-1500" style={{ opacity: heroIdx === i ? 1 : 0, zIndex: 0 }}>
            <img src={src} alt="" className="w-full h-full object-cover"
              style={{ animation: heroIdx === i ? "hkb 14s ease-out both" : "none" }} />
          </div>
        ))}
        {/* Gradients */}
        <div className="absolute inset-0 z-[1]" style={{ background: "linear-gradient(to bottom, rgba(3,10,4,.55) 0%, rgba(3,10,4,.1) 30%, rgba(3,10,4,.1) 55%, rgba(3,10,4,.97) 100%)" }} />
        <div className="absolute inset-0 z-[1]" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(250,204,21,.12) 0%, transparent 70%)" }} />
        {/* Grain */}
        <div className="absolute inset-0 z-[2] pointer-events-none opacity-[.05]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "180px" }} />

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 sm:px-8 py-5"
          style={{ opacity: in_ ? 1 : 0, transform: in_ ? "none" : "translateY(-16px)", transition: "all .6s ease .1s" }}>
          {/* Partner badge */}
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full"
            style={{ background: "rgba(250,204,21,.15)", border: "1px solid rgba(250,204,21,.3)", backdropFilter: "blur(14px)" }}>
            <span style={{ color: "#facc15", fontSize: 11, fontFamily: sans, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase" }}>
              ✦ Partenaire KiriTour
            </span>
          </div>
          {/* Hero dots */}
          <div className="flex items-center gap-1.5 rounded-full px-3 py-2" style={{ background: "rgba(0,0,0,.35)", backdropFilter: "blur(10px)" }}>
            {HERO.map((_, i) => (
              <button key={i} onClick={() => setHeroIdx(i)} className="rounded-full transition-all duration-400"
                style={{ height: 7, width: heroIdx === i ? 22 : 7, background: heroIdx === i ? "#facc15" : "rgba(255,255,255,.3)" }} />
            ))}
          </div>
        </div>

        {/* Bottom title */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-5 sm:px-10 pb-12 sm:pb-16">
          <div className="max-w-5xl">
            <div className="flex items-center gap-3 mb-4"
              style={{ opacity: in_ ? 1 : 0, transform: in_ ? "none" : "translateY(20px)", transition: "all .7s ease .2s" }}>
              <div className="h-px w-10" style={{ background: "#facc15" }} />
              <span style={{ fontFamily: sans, fontSize: 11, color: "rgba(255,255,255,.55)", textTransform: "uppercase", letterSpacing: ".4em" }}>
                Kirindy Forest · Madagascar
              </span>
            </div>
            <h1 style={{
              fontFamily: serif, fontSize: "clamp(2.8rem,7vw,5.5rem)", fontWeight: 700,
              color: "white", lineHeight: 1, letterSpacing: "-.02em",
              textShadow: "0 4px 40px rgba(0,0,0,.5)",
              opacity: in_ ? 1 : 0, transform: in_ ? "none" : "translateY(30px)",
              transition: "all .85s cubic-bezier(.16,1,.3,1) .3s",
            }}>
              Relais de<br />
              <em style={{ color: "#facc15", fontStyle: "italic" }}>Kirindy</em>
            </h1>
            <p style={{
              fontFamily: serif, fontSize: "clamp(1rem,2vw,1.3rem)", color: "rgba(255,255,255,.5)",
              marginTop: 10, fontStyle: "italic",
              opacity: in_ ? 1 : 0, transform: in_ ? "none" : "translateY(16px)",
              transition: "all .7s ease .5s",
            }}>
              Lodge de charme au cœur de la forêt sèche de Kirindy
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-3 mt-8"
              style={{ opacity: in_ ? 1 : 0, transform: in_ ? "none" : "translateY(16px)", transition: "all .7s ease .65s" }}>
              <button onClick={() => wa("Bonjour KiriTour ! Je souhaite réserver au Relais de Kirindy.")}
                className="flex items-center gap-2.5 rounded-full font-bold transition-all hover:scale-105 active:scale-95"
                style={{ padding: "13px 26px", background: "linear-gradient(135deg,#facc15,#f59e0b)", color: "#0b1a0e", fontFamily: sans, fontSize: 14, boxShadow: "0 8px 30px rgba(250,204,21,.4)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#0b1a0e"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a9.87 9.87 0 00-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Réserver via WhatsApp
              </button>
              <button onClick={() => document.getElementById("hotel-gallery")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 rounded-full font-medium transition-all hover:scale-105"
                style={{ padding: "13px 22px", background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)", backdropFilter: "blur(14px)", color: "white", fontFamily: sans, fontSize: 14 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                Voir la galerie
              </button>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-px z-10"
          style={{ background: "linear-gradient(90deg, transparent, rgba(250,204,21,.5), transparent)" }} />
      </section>

      {/* ══ ABOUT BAND ════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(135deg,#facc15,#f59e0b)" }}>
        <div className="max-w-6xl mx-auto px-5 py-5 flex flex-wrap items-center justify-between gap-4">
          {[
            { icon: "⭐", text: "4.8 / 5 sur Google"  },
            { icon: "🏡", text: "Lodge partenaire officiel KiriTour" },
            { icon: "📍", text: "Kirindy Forest, 60 km de Morondava" },
            { icon: "🌿", text: "Écotourisme responsable" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              <span style={{ fontFamily: sans, fontSize: 13, fontWeight: 700, color: "#0b1a0e" }}>{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══ BODY ══════════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 flex flex-col gap-16">

        {/* ── ABOUT ── */}
        <R d={0}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-10" style={{ background: "#facc15" }} />
                <span style={{ fontFamily: sans, fontSize: 10, color: "#facc15", textTransform: "uppercase", letterSpacing: ".4em" }}>À propos</span>
              </div>
              <h2 style={{ fontFamily: serif, fontSize: "clamp(2rem,4vw,3rem)", color: "white", fontWeight: 700, lineHeight: 1.1, marginBottom: 20 }}>
                Un refuge d'exception<br />
                <em style={{ color: "#facc15", fontStyle: "italic" }}>au cœur de la nature</em>
              </h2>
              <p style={{ fontFamily: sans, fontSize: 15, color: "rgba(255,255,255,.55)", lineHeight: 1.8, marginBottom: 16 }}>
                Le Relais de Kirindy est un lodge écotouristique niché au cœur de la forêt sèche de Kirindy, l'un des derniers habitats de la Fossa — le prédateur emblématique de Madagascar.
              </p>
              <p style={{ fontFamily: sans, fontSize: 15, color: "rgba(255,255,255,.55)", lineHeight: 1.8, marginBottom: 24 }}>
                Partenaire officiel de KiriTour, le Relais offre un hébergement authentique alliant confort et immersion totale dans la biodiversité malgache. À seulement 1h30 de route de Morondava.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { n: "20+", label: "Espèces de lémuriens" },
                  { n: "1h30", label: "De Morondava" },
                  { n: "3★",   label: "Lodge éco-certifié" },
                  { n: "24/7", label: "Assistance KiriTour" },
                ].map((s, i) => (
                  <div key={i} className="p-4 rounded-2xl" style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)" }}>
                    <p style={{ fontFamily: serif, fontSize: "1.6rem", color: "#facc15", fontWeight: 700, lineHeight: 1 }}>{s.n}</p>
                    <p style={{ fontFamily: sans, fontSize: 11, color: "rgba(255,255,255,.4)", marginTop: 4 }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Right image stack */}
            <div className="relative h-[420px] sm:h-[500px]">
              <img src={IMAGES[10]} alt="" className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                style={{ boxShadow: "0 20px 60px rgba(0,0,0,.6)" }} />
              <div className="absolute inset-0 rounded-3xl" style={{ background: "linear-gradient(to top, rgba(11,26,14,.6) 0%, transparent 60%)" }} />
              {/* Floating card */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl"
                style={{ background: "rgba(11,26,14,.85)", backdropFilter: "blur(16px)", border: "1px solid rgba(250,204,21,.2)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(250,204,21,.15)" }}>
                    <span style={{ fontSize: 18 }}>🦁</span>
                  </div>
                  <div>
                    <p style={{ fontFamily: serif, fontSize: "1rem", color: "white", fontWeight: 700 }}>Fossa & Wildlife</p>
                    <p style={{ fontFamily: sans, fontSize: 11, color: "rgba(255,255,255,.4)" }}>Observations garanties la nuit</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    {[...Array(5)].map((_, i) => <span key={i} style={{ color: "#facc15", fontSize: 11 }}>★</span>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </R>

        {/* ── AMENITIES ── */}
        <R d={0.05}>
          <div className="rounded-3xl p-8 sm:p-10" style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)" }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-10" style={{ background: "#facc15" }} />
              <h3 style={{ fontFamily: serif, fontSize: "clamp(1.5rem,3vw,2rem)", color: "white", fontWeight: 700 }}>
                Équipements & services
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {AMENITIES.map((a, i) => (
                <div key={i} className="flex flex-col items-center text-center p-4 rounded-2xl gap-2 transition-all hover:-translate-y-1"
                  style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.06)" }}>
                  <span style={{ fontSize: 26 }}>{a.icon}</span>
                  <p style={{ fontFamily: sans, fontSize: 13, color: "white", fontWeight: 600 }}>{a.label}</p>
                  <p style={{ fontFamily: sans, fontSize: 11, color: "rgba(255,255,255,.35)" }}>{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </R>

        {/* ── ROOMS ── */}
        <R d={0.05}>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-10" style={{ background: "#facc15" }} />
            <h3 style={{ fontFamily: serif, fontSize: "clamp(1.5rem,3vw,2rem)", color: "white", fontWeight: 700 }}>
              Nos hébergements
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {ROOMS.map((room, i) => (
              <div key={i} className="rounded-3xl overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:shadow-2xl"
                style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)" }}>
                <div className="relative h-52">
                  <img src={room.img} alt={room.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(11,26,14,.8) 0%, transparent 50%)" }} />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold"
                    style={{ background: room.badgeColor, color: "#0b1a0e", fontFamily: sans }}>
                    {room.badge}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h4 style={{ fontFamily: serif, fontSize: "1.2rem", color: "white", fontWeight: 700, marginBottom: 8 }}>{room.name}</h4>
                  <p style={{ fontFamily: sans, fontSize: 13, color: "rgba(255,255,255,.5)", lineHeight: 1.6, marginBottom: 12 }}>{room.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.features.map((f, j) => (
                      <span key={j} className="px-2.5 py-1 rounded-full text-[11px] font-medium"
                        style={{ background: "rgba(255,255,255,.06)", color: "rgba(255,255,255,.5)", border: "1px solid rgba(255,255,255,.08)", fontFamily: sans }}>
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-3">
                    <p style={{ fontFamily: serif, fontSize: "1.1rem", color: room.badgeColor, fontWeight: 700 }}>{room.price}</p>
                    <button onClick={() => wa(`Bonjour ! Je suis intéressé(e) par le ${room.name} au Relais de Kirindy.`)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all hover:scale-105 active:scale-95"
                      style={{ background: `linear-gradient(135deg,${room.badgeColor},#f59e0b)`, color: "#0b1a0e", fontFamily: sans }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#0b1a0e"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a9.87 9.87 0 00-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      Réserver
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </R>

        {/* ── GALLERY ── */}
        <R d={0.05}>
          <div id="hotel-gallery">
            <div className="flex items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="h-px w-10" style={{ background: "#facc15" }} />
                <h3 style={{ fontFamily: serif, fontSize: "clamp(1.5rem,3vw,2rem)", color: "white", fontWeight: 700 }}>
                  Galerie photos
                </h3>
              </div>
              <span style={{ fontFamily: sans, fontSize: 12, color: "rgba(255,255,255,.3)" }}>
                {IMAGES.length} photos · Cliquez pour agrandir
              </span>
            </div>
            {/* Masonry-style grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {IMAGES.map((src, i) => (
                <button key={i}
                  onClick={() => openLightbox(i)}
                  className={`relative overflow-hidden rounded-2xl group transition-all hover:scale-[1.02] hover:z-10 ${i % 7 === 0 ? "col-span-2 row-span-2" : ""}`}
                  style={{ aspectRatio: i % 7 === 0 ? "1.2" : "1", boxShadow: "0 4px 20px rgba(0,0,0,.4)" }}>
                  <img src={src} alt="" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{ background: "rgba(0,0,0,.4)", backdropFilter: "blur(2px)" }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </R>

        {/* ── BOOKING CTA ── */}
        <R d={0.05}>
          <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12"
            style={{ background: "linear-gradient(135deg,#14532d,#166534)" }}>
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle at 80% 20%, white 0%, transparent 55%)" }} />
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg,transparent,rgba(250,204,21,.5),transparent)" }} />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <p style={{ fontFamily: sans, fontSize: 11, color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: ".3em", marginBottom: 8 }}>
                  Réservation — Relais de Kirindy
                </p>
                <h3 style={{ fontFamily: serif, fontSize: "clamp(1.6rem,3vw,2.4rem)", color: "white", fontWeight: 700, marginBottom: 10 }}>
                  Vivez l'expérience<br />
                  <em style={{ color: "#facc15", fontStyle: "italic" }}>Kirindy Forest</em>
                </h3>
                <p style={{ fontFamily: sans, fontSize: 14, color: "rgba(255,255,255,.55)", maxWidth: 440, lineHeight: 1.7 }}>
                  Réservez votre séjour directement via WhatsApp. KiriTour s'occupe du transfert depuis Morondava, des excursions guidées et de tout votre séjour.
                </p>
                <div className="flex flex-wrap gap-3 mt-5">
                  {["Transfert inclus", "Guide expert", "Repas disponibles", "Réponse en 2h"].map((t, i) => (
                    <span key={i} className="flex items-center gap-1.5 text-xs"
                      style={{ fontFamily: sans, color: "rgba(255,255,255,.6)" }}>
                      <span style={{ color: "#facc15" }}>✓</span> {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 flex-shrink-0 w-full md:w-auto">
                <button onClick={() => wa("Bonjour KiriTour ! Je souhaite réserver un séjour au Relais de Kirindy. Pouvez-vous m'envoyer les disponibilités et tarifs ?")}
                  className="flex items-center justify-center gap-2.5 rounded-2xl font-bold transition-all hover:scale-[1.03] active:scale-[.97] hover:shadow-2xl"
                  style={{ padding: "16px 32px", background: "linear-gradient(135deg,#facc15,#f59e0b)", color: "#0b1a0e", fontFamily: sans, fontSize: 15, boxShadow: "0 8px 30px rgba(250,204,21,.4)", minWidth: 240 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#0b1a0e"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a9.87 9.87 0 00-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Réserver maintenant
                </button>
                <p style={{ fontFamily: sans, fontSize: 11, color: "rgba(255,255,255,.35)", textAlign: "center" }}>
                  Réponse sous 2h · Tarifs sur demande
                </p>
              </div>
            </div>
          </div>
        </R>
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <Lightbox images={IMAGES} idx={lightboxIdx} onClose={closeLightbox} onPrev={prevImg} onNext={nextImg} />
      )}

      <style>{`
        @keyframes hkb { from { transform: scale(1.08); } to { transform: scale(1); } }
      `}</style>
    </div>
  );
}