import React, { useState, useEffect, useRef } from "react";
import MapSection from "../components/MapSection";
import BookingCalendar from "../components/BookingCalendar";
import AnimatedStats from "../components/AnimatedStats";
import LoadingScreen from "../components/LoadingScreen";
import ProgressBar from "../components/ProgressBar";
import HotelSection from "../components/HotelSection";

/* ─── Fonts ───────────────────────────────────────────────────── */
if (typeof document !== "undefined" && !document.getElementById("kt-fonts")) {
  const link = document.createElement("link");
  link.id = "kt-fonts"; link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap";
  document.head.appendChild(link);
}

const WA   = "261336640777";
const wa   = (msg) => window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg || "Hello KiriTour!")}`, "_blank");
const serif = "'Playfair Display', serif";
const sans  = "'DM Sans', sans-serif";

/* ═══════════════════════════════════════════════════════════════════
   HOOK — IntersectionObserver, déclenche UNE SEULE FOIS
   (observer.disconnect() après première détection)
═══════════════════════════════════════════════════════════════════ */
function useOnceVisible(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect(); // ← ne se redéclenche jamais
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ═══════════════════════════════════════════════════════════════════
   REVEAL WRAPPER — fade + slide-up, une seule fois au scroll
═══════════════════════════════════════════════════════════════════ */
function Reveal({ children, delay = 0, y = 50, className = "", style = {} }) {
  const [ref, vis] = useOnceVisible(0.12);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0px)" : `translateY(${y}px)`,
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s,
                     transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CAPCUT CHAR REVEAL — chaque lettre monte depuis un clip-mask
═══════════════════════════════════════════════════════════════════ */
function AnimChars({ text, baseDelay = 0, color, italic = false }) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ verticalAlign: "bottom" }}
        >
          <span
            className="inline-block"
            style={{
              color: color || "inherit",
              fontStyle: italic ? "italic" : "normal",
              animation: `capcut-char 0.75s cubic-bezier(0.16,1,0.3,1) ${
                baseDelay + i * 0.038
              }s both`,
              whiteSpace: ch === " " ? "pre" : "normal",
            }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        </span>
      ))}
    </>
  );
}

/* Ligne dorée qui balaie juste avant chaque mot — effet "cinéma" */
function ScanLine({ delay }) {
  return (
    <div
      aria-hidden
      className="absolute left-0 right-0 pointer-events-none"
      style={{
        height: 2,
        top: "50%",
        background:
          "linear-gradient(90deg,transparent 0%,rgba(250,204,21,.85) 40%,#fff 50%,rgba(250,204,21,.85) 60%,transparent 100%)",
        boxShadow: "0 0 18px rgba(250,204,21,.75)",
        animation: `capcut-scan 1.1s ease-in-out ${delay}s both`,
        zIndex: 5,
      }}
    />
  );
}

/* ─── DATA ─────────────────────────────────────────────────────── */
const slides = [
  { img: "https://i.ibb.co/ksx7M9G2/IMG-20260224-WA0019.jpg",      label: "Avenue of the Baobabs",  sub: "Madagascar's Most Iconic Landscape" },
  { img: "https://i.ibb.co/YBDp5cM5/20250817-102639.jpg",      label: "Tsingy de Bemaraha",    sub: "UNESCO World Heritage Site" },
  { img: "https://i.ibb.co/4ZMwFVFh/IMG-20251030-WA0008.jpg",  label: "Kirindy Forest Reserve", sub: "Home of the Elusive Fossa" },
  ];

const gallery = [
  "https://i.ibb.co/sdZVvf9S/sakorkata1.jpg",
  "https://i.ibb.co/LXf9Mh2B/IMG-20251211-204008.jpg",
  "https://i.ibb.co/C5CXsY8M/IMG-20251030-WA0106.jpg",
  "https://i.ibb.co/WvgBzyDQ/IMG-20251030-WA0087.jpg",
  "https://i.ibb.co/YBDp5cM5/20250817-102639.jpg",
  "https://i.ibb.co/5xXLDSZQ/20250729-173834.jpg",
];

const wildlife = [
  { emoji: "🦎", name: "Fossa",          desc: "Madagascar's apex predator — only in Kirindy" },
  { emoji: "🐒", name: "Lemurs",         desc: "20+ species across our tour routes" },
  { emoji: "🦎", name: "Chameleons",     desc: "Half the world's species live here" },
  { emoji: "🐦", name: "Endemic Birds",  desc: "250+ species unique to Madagascar" },
];

const whyUs = [
  { emoji: "🧭", title: "Expert Local Guides",    desc: "Native naturalists sharing stories no guidebook contains." },
  { emoji: "🛻", title: "Private 4×4 Transport",  desc: "Dedicated vehicle for your group — pickup to final drop-off." },
  { emoji: "💬", title: "WhatsApp Booking",       desc: "Real humans, instant response. Confirmation within 2 hours." },
  { emoji: "💎", title: "Transparent Pricing",    desc: "6 package tiers for every budget — fully disclosed." },
  { emoji: "🌿", title: "Eco-Responsible",        desc: "Local communities first. We protect what we share." },
  { emoji: "⭐", title: "4.7 / 5 Average Rating", desc: "260+ verified travellers. Our reputation speaks for itself." },
];

const howItWorks = [
  { step:"01", emoji:"💬", title:"Contact Us",         desc:"Send us a WhatsApp message or email. Tell us your dates, group size and interests. We respond within 2 hours.", color:"#0369a1", bg:"#eff6ff" },
  { step:"02", emoji:"🗺️", title:"Custom Itinerary",   desc:"Our local experts craft a personalised itinerary tailored to your budget, time and dream destinations.",       color:"#15803d", bg:"#f0fdf4" },
  { step:"03", emoji:"✅", title:"Confirm & Book",      desc:"Review your tour details, confirm your booking with a deposit. Transparent pricing — zero hidden fees.",        color:"#b45309", bg:"#fffbeb" },
  { step:"04", emoji:"🌴", title:"Explore Madagascar",  desc:"Your guide meets you on arrival. Everything is handled — transfers, accommodation, park permits, meals.",       color:"#7c3aed", bg:"#f5f3ff" },
];

const reviews = [
  { id:1, name:"Sarah Johnson",  country:"🇺🇸 USA",       avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",  rating:5, title:"Absolutely Breathtaking",     comment:"The Tsingy trek was unlike anything I've experienced. Flawless logistics, passionate guide, memories for life.", tour:"Tsingy 4 Days",  date:"Dec 2024" },
  { id:2, name:"Marco Rossi",    country:"🇮🇹 Italy",     avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=Marco",  rating:5, title:"Perfectly Organised",         comment:"From first WhatsApp to final transfer — flawless. KiriTour sets the standard for Madagascar travel.",            tour:"Kirindy 2 Days", date:"Nov 2024" },
  { id:3, name:"Emma Wilson",    country:"🇬🇧 UK",        avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",   rating:5, title:"Wildlife Beyond Imagination",  comment:"Lemurs, chameleons, the Fossa — our guide found them all. Back next year for the 4-day circuit.",              tour:"Kirindy 2 Days", date:"Nov 2024" },
  { id:4, name:"Chen Wei",       country:"🇨🇳 China",     avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=Chen",   rating:5, title:"Golden Hour Magic",           comment:"The baobab sunset was the most beautiful thing I've ever photographed. Worth every cent.",                       tour:"Baobabs Sunset", date:"Oct 2024" },
  { id:5, name:"Anna Kowalski",  country:"🇵🇱 Poland",    avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=Anna",   rating:5, title:"Family Trip of a Lifetime",   comment:"Our kids are still talking about the lemurs. Incredible value, genuine local experience.",                       tour:"Beach & Sunset", date:"Sep 2024" },
  { id:6, name:"James Anderson", country:"🇦🇺 Australia", avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=James",  rating:5, title:"Best Operator in Madagascar", comment:"I've travelled across Africa — KiriTour ranks among the very best. Genuine, professional, unforgettable.",        tour:"Tsingy 3 Days",  date:"Sep 2024" },
];

/* ═══════════════════════════════════════════════════════════════════
   HERO — CINEMATIC CAPCUT TEXT REVEAL
   - Chaque lettre monte depuis le bas (clip overflow:hidden)
   - 3 lignes : "Wild." / "Rare." / "Unforgettable."
   - ScanLine dorée avant chaque lignes
   - Animation ONE-SHOT : se rejoue uniquement sur refresh/actualiser
═══════════════════════════════════════════════════════════════════ */
function Hero() {
  const [cur,     setCur]     = useState(0);
  const [loading, setLoading] = useState(true);
  const [armed,   setArmed]   = useState(false); // devient true une seule fois

  /* Auto-slide */
  useEffect(() => {
    const t = setInterval(() => setCur(p => (p + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, []);

  /* Déclenche l'animation UNE FOIS après la fin du LoadingScreen */
  useEffect(() => {
    if (!loading && !armed) {
      // petit délai pour laisser le DOM se peindre
      const id = setTimeout(() => setArmed(true), 80);
      return () => clearTimeout(id);
    }
  }, [loading, armed]);

  if (loading) return <LoadingScreen onComplete={() => setLoading(false)} />;

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: 620, maxHeight: 960 }}
    >
      {/* ── Slides background ── */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === cur ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${s.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            animation: i === cur ? "hero-kb 9s ease-out both" : "none",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom,rgba(0,0,0,.10) 0%,rgba(0,0,0,.50) 52%,rgba(0,0,0,.86) 100%)",
            }}
          />
        </div>
      ))}

      {/* Vignette radiale */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center,transparent 48%,rgba(0,0,0,.55) 100%)",
        }}
      />

      {/* ══════════════════════════════════════════════════════════
          BLOC DE TEXTE CINÉMATIQUE
      ══════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10 text-center">

        {/* ── Live location badge — ao anaty text block ── */}
        <div
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 backdrop-blur-md mb-6"
          style={{
            background: "rgba(255,255,255,.08)",
            animation: armed ? "hero-fade-down .7s ease .1s both" : "none",
          }}
        >
          <span
            className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0"
            style={{ animation: "live-dot 2s ease-in-out infinite" }}
          />
          <span
            className="text-white/85 text-xs font-semibold tracking-[.22em] uppercase"
            style={{ fontFamily: sans }}
          >
            {slides[cur].label}
          </span>
        </div>

        {/* ─── LINE 1 : Wild. ─── */}
        <div className="relative mb-[2px]">
          <ScanLine delay={0.28} />
          <h1
            style={{
              fontFamily: serif,
              fontSize: "clamp(3.8rem,11vw,9.5rem)",
              fontWeight: 900,
              lineHeight: 0.88,
              letterSpacing: "-.035em",
              color: "#fff",
              textShadow: "0 4px 60px rgba(0,0,0,.7)",
            }}
          >
            {armed && <AnimChars text="Wild." baseDelay={0.32} />}
          </h1>
        </div>

        {/* ─── LINE 2 : Rare. ─── */}
        <div className="relative mb-[2px]">
          <ScanLine delay={0.72} />
          <h1
            style={{
              fontFamily: serif,
              fontSize: "clamp(3.8rem,11vw,9.5rem)",
              fontWeight: 900,
              lineHeight: 0.88,
              letterSpacing: "-.035em",
              color: "#fff",
              textShadow: "0 4px 60px rgba(0,0,0,.7)",
            }}
          >
            {armed && <AnimChars text="Rare." baseDelay={0.76} />}
          </h1>
        </div>

        {/* ─── LINE 3 : Unforgettable. jaune ─── */}
        <div className="relative mb-9">
          <ScanLine delay={1.14} />
          <h1
            style={{
              fontFamily: serif,
              fontSize: "clamp(2rem,5.5vw,5.5rem)",
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: "-.03em",
              textShadow:
                "0 0 60px rgba(250,204,21,.5),0 4px 30px rgba(0,0,0,.8)",
            }}
          >
            {armed && (
              <AnimChars
                text="Unforgettable."
                baseDelay={1.18}
                color="#facc15"
                italic={false}
              />
            )}
          </h1>
        </div>

        {/* Sub + lock */}
        <div
          style={{
            animation: armed ? "hero-fade-up .8s ease 2.1s both" : "none",
          }}
        >
          <p
            className="text-white/65 text-sm md:text-base max-w-sm mb-2"
            style={{ fontFamily: sans }}
          >
            {slides[cur].sub}
          </p>
          <p className="text-white/35 text-xs mb-10 flex items-center justify-center gap-1.5">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-yellow-400/60">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Secure booking via WhatsApp — réponse en 2h
          </p>
        </div>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4"
          style={{
            animation: armed ? "hero-fade-up .8s ease 2.4s both" : "none",
          }}
        >
          <button
            onClick={() => wa("Hello KiriTour! I'd like to book a tour.")}
            className="relative overflow-hidden px-9 py-4 rounded-full font-black text-green-900 text-base hover:scale-105 active:scale-95 transition-transform duration-300"
            style={{
              background: "linear-gradient(135deg,#facc15,#f59e0b)",
              boxShadow: "0 0 40px rgba(250,204,21,.45)",
              fontFamily: sans,
            }}
          >
            <span
              className="absolute inset-0 pointer-events-none rounded-full"
              style={{
                background:
                  "linear-gradient(105deg,transparent 35%,rgba(255,255,255,.45) 50%,transparent 65%)",
                animation: "btn-shimmer 3.5s ease-in-out 3.5s infinite",
              }}
            />
            <span className="relative z-10">📲 Book Your Adventure</span>
          </button>
          <button
            onClick={() =>
              document.getElementById("tours-section")?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-9 py-4 rounded-full font-semibold text-white border-2 border-white/25 backdrop-blur-sm hover:bg-white/12 hover:scale-105 active:scale-95 transition-all duration-300 text-base"
            style={{ fontFamily: sans }}
          >
            Explore Tours ↓
          </button>
        </div>
      </div>

      {/* Arrows */}
      {[
        ["left-4",  "‹", (p) => (p - 1 + slides.length) % slides.length],
        ["right-4", "›", (p) => (p + 1) % slides.length],
      ].map(([pos, chr, fn], i) => (
        <button
          key={i}
          onClick={() => setCur(fn)}
          className={`absolute ${pos} top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center text-white text-xl border border-white/10 transition-all hover:bg-white/18`}
          style={{ background: "rgba(0,0,0,.38)" }}
        >
          {chr}
        </button>
      ))}

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCur(i)}
            className="rounded-full transition-all duration-400"
            style={{
              width:  i === cur ? 32 : 10,
              height: 10,
              background: i === cur ? "#facc15" : "rgba(255,255,255,.32)",
            }}
          />
        ))}
      </div>

      {/* Scroll indicator (desktop) */}
      <div
        className="absolute bottom-8 right-7 z-20 hidden md:flex flex-col items-center gap-3"
        style={{ animation: armed ? "hero-fade-up 1s ease 3.2s both" : "none" }}
      >
        <p
          className="text-white/45 text-[10px] font-semibold tracking-[.35em] uppercase"
          style={{ fontFamily: sans, writingMode: "vertical-rl" }}
        >
          scroll
        </p>
        <div
          className="rounded-full overflow-hidden"
          style={{ width: 3, height: 56, background: "rgba(255,255,255,.15)" }}
        >
          <div
            className="w-full rounded-full"
            style={{
              height: "45%",
              background: "linear-gradient(to bottom,#facc15,#f59e0b)",
              boxShadow: "0 0 8px rgba(250,204,21,.7)",
              animation: "scroll-bar 2s ease-in-out 3.5s infinite",
            }}
          />
        </div>
        {/* Chevron animé */}
        <svg
          viewBox="0 0 16 24"
          fill="none"
          stroke="#facc15"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ width: 14, opacity: 0.7, animation: "scroll-chevron 1.6s ease-in-out 3.5s infinite" }}
        >
          <polyline points="3,6 8,12 13,6" />
          <polyline points="3,13 8,19 13,13" />
        </svg>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ABOUT
═══════════════════════════════════════════════════════════════════ */
function About() {
  return (
    <section className="py-20 px-4 bg-white" id="about">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">

        <Reveal delay={0}>
          <p className="text-yellow-600 text-xs font-bold tracking-widest uppercase mb-3" style={{ fontFamily: sans }}>
            About KiriTour
          </p>
          <h2
            style={{ fontFamily: serif, fontSize: "clamp(1.9rem,3.5vw,2.8rem)", lineHeight: 1.15, color: "#14532d" }}
            className="font-black mb-5"
          >
            Madagascar's Most Trusted Adventure Specialists
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4 text-sm" style={{ fontFamily: sans }}>
            Based in Morondava, KiriTour has been connecting travellers with the raw beauty of the Menabe region for over 3 years.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8 text-sm" style={{ fontFamily: sans }}>
            From the razor-sharp limestone pinnacles of Tsingy to the midnight silhouettes of ancient baobabs — we design experiences that stay with you forever.
          </p>
          <button
            onClick={() => wa("Hello KiriTour! I'd like to learn more.")}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-white hover:scale-105 active:scale-95 transition-all duration-300 text-sm shadow-lg"
            style={{ background: "linear-gradient(135deg,#166534,#15803d)", fontFamily: sans }}
          >
            📲 Chat with Us
          </button>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative h-72 md:h-[400px] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://i.ibb.co/WWR5r6cG/IMG-20260224-WA0004.jpg"
              alt="Tsingy"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div
              className="absolute inset-0 rounded-3xl"
              style={{ background: "linear-gradient(to top,rgba(20,83,45,.65) 0%,transparent 55%)" }}
            />
            <div className="absolute bottom-5 left-5 right-5">
              <div
                className="flex items-center gap-3 rounded-xl px-4 py-3 border border-white/20 backdrop-blur-md"
                style={{ background: "rgba(255,255,255,.12)" }}
              >
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="text-white font-bold text-sm" style={{ fontFamily: sans }}>
                    3 ans d'expérience · 93+ voyageurs
                  </p>
                  <div className="flex gap-0.5 mt-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xs">★</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   WILDLIFE
═══════════════════════════════════════════════════════════════════ */
function Wildlife() {
  return (
    <section className="py-16 px-4" style={{ background: "#f0fdf4" }}>
      <div className="max-w-5xl mx-auto">

        <Reveal className="text-center mb-10">
          <p className="text-yellow-600 text-xs font-bold tracking-widest uppercase mb-2" style={{ fontFamily: sans }}>
            Unique Biodiversity
          </p>
          <h2 style={{ fontFamily: serif, color: "#14532d" }} className="text-3xl md:text-5xl font-black">
            Wildlife Found <em>Nowhere Else</em>
          </h2>
          <p className="text-gray-400 text-sm mt-2 max-w-md mx-auto" style={{ fontFamily: sans }}>
            90% of Madagascar's wildlife is endemic. Every tour maximises encounters.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {wildlife.map((w, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-green-50 h-full">
                <div className="text-5xl mb-3">{w.emoji}</div>
                <h3 className="font-black text-green-800 text-lg mb-1" style={{ fontFamily: serif }}>{w.name}</h3>
                <p className="text-gray-400 text-xs leading-relaxed" style={{ fontFamily: sans }}>{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   TOUR CATEGORIES
═══════════════════════════════════════════════════════════════════ */
function TourCategories() {
  const categories = [
    { id:"tsiribihina", emoji:"🚣", name:"Tsiribihina River",    desc:"3 to 8-day pirogue descents through sacred Sakalava villages, wild camping on remote sandbanks", image:"https://i.ibb.co/HT6LRFzC/20250810-063819.jpg",        tours:"5 tours available", from:"529€",  gradient:"from-blue-500 to-cyan-600" },
    { id:"andasibe",    emoji:"🦎", name:"Andasibe Rainforest",   desc:"Indri lemurs, Mantadia National Park, night walks through misty rainforest trails",              image:"https://i.ibb.co/WvgBzyDQ/IMG-20251030-WA0087.jpg",     tours:"4 tours available", from:"996€",  gradient:"from-green-500 to-emerald-600" },
    { id:"tsingy",      emoji:"⛰️", name:"Tsingy de Bemaraha",   desc:"UNESCO stone forest with harnesses, suspension bridges, razor-sharp limestone pinnacles",         image:"https://i.ibb.co/mrxKPM2q/20250817-104453.jpg",         tours:"2 tours available", from:"369€",  gradient:"from-orange-500 to-amber-600" },
    { id:"kirindy",     emoji:"🌳", name:"Kirindy Forest",        desc:"Fossa sightings, nocturnal lemurs, dry forest wildlife in Madagascar's apex predator territory",  image:"https://i.ibb.co/4ZMwFVFh/IMG-20251030-WA0008.jpg",     tours:"2 tours available", from:"191€",  gradient:"from-lime-500 to-green-600" },
    { id:"western",     emoji:"🌅", name:"Western Day Tours",     desc:"Betania sacred village, Kimony beach, Avenue of Baobabs sunset photography",                     image:"https://i.ibb.co/5xXLDSZQ/20250729-173834.jpg",         tours:"1 tour available",  from:"145€",  gradient:"from-rose-500 to-pink-600" },
  ];

  return (
    <section id="tours-section" className="py-24 px-4 relative overflow-hidden" style={{ background: "linear-gradient(180deg,#fff 0%,#f0fdf4 100%)" }}>
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 30%,#dcfce7 0%,transparent 50%),radial-gradient(circle at 80% 70%,#fef3c7 0%,transparent 50%)" }} />

      <div className="max-w-7xl mx-auto relative z-10">

        <Reveal className="text-center mb-16">
          <p className="text-yellow-600 text-xs font-bold tracking-widest uppercase mb-3" style={{ fontFamily: sans }}>Discover Your Perfect Adventure</p>
          <h2 style={{ fontFamily: serif, color: "#14532d" }} className="text-4xl md:text-6xl font-black mb-4">
            Explore by <span style={{ color: "#ca8a04" }}>Destination</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-6" style={{ fontFamily: sans }}>
            14 curated journeys across 5 unique destinations — from river descents to UNESCO stone forests
          </p>
          <button
            onClick={() => (window.location.hash = "/tours")}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-base shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300"
            style={{ background: "linear-gradient(135deg,#14532d,#15803d)", fontFamily: sans }}
          >
            View All 14 Tours & Pricing →
          </button>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {categories.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 0.09}>
              <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
                <div className="relative h-56 overflow-hidden flex-shrink-0">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className={`absolute top-4 left-4 w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-3xl shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                    {cat.emoji}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-black text-2xl leading-tight mb-1" style={{ fontFamily: serif, textShadow: "0 2px 12px rgba(0,0,0,.8)" }}>{cat.name}</h3>
                    <p className="text-emerald-300 text-xs font-semibold" style={{ fontFamily: sans }}>{cat.tours}</p>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-1" style={{ fontFamily: sans }}>{cat.desc}</p>
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase mb-1" style={{ fontFamily: sans }}>Starting from</p>
                      <p className="text-emerald-600 text-2xl font-black" style={{ fontFamily: serif }}>{cat.from}</p>
                    </div>
                    <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-sm">★</span>)}</div>
                  </div>
                  <button
                    onClick={() => (window.location.hash = "/tours")}
                    className="w-full py-3.5 rounded-xl font-bold text-white text-sm shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
                    style={{ background: "linear-gradient(135deg,#10b981,#059669)", fontFamily: sans }}
                  >
                    View {cat.name} Tours →
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-10 md:p-14 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 50%,white 0%,transparent 60%)" }} />
            <div className="relative z-10">
              <h3 className="text-white font-black text-3xl md:text-4xl mb-4" style={{ fontFamily: serif }}>Ready to Explore?</h3>
              <p className="text-emerald-100 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: sans }}>
                Browse all 14 tours with complete itineraries, pricing options and availability. Or contact us directly for a personalised quote.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => (window.location.hash = "/tours")}
                  className="px-10 py-4 rounded-full font-black text-emerald-900 text-base shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
                  style={{ background: "linear-gradient(135deg,#facc15,#f59e0b)", fontFamily: sans }}
                >
                  Browse All Tours & Prices
                </button>
                <button
                  onClick={() => wa("Hello KiriTour! I need help choosing the right tour.")}
                  className="px-10 py-4 rounded-full font-bold text-white text-base border-2 border-white/30 backdrop-blur-sm hover:bg-white/10 active:scale-95 transition-all duration-300"
                  style={{ fontFamily: sans }}
                >
                  💬 Get Personal Advice
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   WHY US
═══════════════════════════════════════════════════════════════════ */
function WhyUs() {
  return (
    <section className="py-20 px-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#052e16,#14532d,#166534)" }}>
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 10% 20%,#facc15 0%,transparent 35%),radial-gradient(circle at 90% 80%,#4ade80 0%,transparent 35%)" }} />
      <div className="max-w-6xl mx-auto relative z-10">

        <Reveal className="text-center mb-14">
          <p className="text-yellow-400 text-xs font-bold tracking-widest uppercase mb-2" style={{ fontFamily: sans }}>Why KiriTour</p>
          <h2 style={{ fontFamily: serif }} className="text-3xl md:text-5xl font-black text-white">The KiriTour Difference</h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyUs.map((w, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div
                className="rounded-2xl p-6 border border-white/10 hover:border-yellow-400/40 group transition-all duration-300 h-full"
                style={{ background: "rgba(255,255,255,.06)", backdropFilter: "blur(12px)" }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{w.emoji}</div>
                <h3 className="text-white font-black text-lg mb-2" style={{ fontFamily: serif }}>{w.title}</h3>
                <p className="text-green-200 text-sm leading-relaxed" style={{ fontFamily: sans }}>{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HOW IT WORKS
═══════════════════════════════════════════════════════════════════ */
function HowItWorks() {
  return (
    <section className="py-24 px-4 bg-white" id="how-it-works">
      <div className="max-w-6xl mx-auto">

        <Reveal className="text-center mb-16">
          <p className="text-yellow-600 text-xs font-bold tracking-widest uppercase mb-3" style={{ fontFamily: sans }}>Simple Process</p>
          <h2 style={{ fontFamily: serif, color: "#14532d" }} className="text-3xl md:text-5xl font-black mb-4">
            How to Book <em>Your Tour</em>
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto" style={{ fontFamily: sans }}>
            From first contact to your adventure in Madagascar — 4 simple steps.
          </p>
        </Reveal>

        <div className="relative">
          <div
            className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 mx-32"
            style={{ background: "linear-gradient(90deg,#dcfce7,#16a34a,#dcfce7)" }}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="relative flex flex-col items-center text-center group h-full">
                  <div
                    className="relative z-10 w-32 h-32 rounded-3xl flex flex-col items-center justify-center mb-6 shadow-xl group-hover:scale-110 group-hover:shadow-2xl transition-all duration-400"
                    style={{ background: `linear-gradient(135deg,${step.bg},white)`, border: `2px solid ${step.color}22` }}
                  >
                    <span className="text-4xl mb-1">{step.emoji}</span>
                    <span className="text-xs font-black tracking-widest" style={{ color: step.color, fontFamily: sans }}>STEP {step.step}</span>
                  </div>
                  <h3 className="font-black text-xl mb-3 text-gray-800" style={{ fontFamily: serif }}>{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: sans }}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-16 text-center" delay={0.1}>
          <button
            onClick={() => wa("Hello KiriTour! I'd like to start planning my trip.")}
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-black text-white text-base shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
            style={{ background: "linear-gradient(135deg,#14532d,#16a34a)", boxShadow: "0 8px 40px rgba(20,83,45,.35)", fontFamily: sans }}
          >
            📲 Start Planning Now — It's Free
          </button>
          <p className="text-gray-400 text-xs mt-3" style={{ fontFamily: sans }}>No commitment. Response within 2 hours. 🇲🇬</p>
        </Reveal>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   GALLERY
═══════════════════════════════════════════════════════════════════ */
function Gallery() {
  const [sel, setSel] = useState(null);
  return (
    <section className="py-20 px-4 bg-white" id="gallery">
      <div className="max-w-6xl mx-auto">

        <Reveal className="text-center mb-12">
          <p className="text-yellow-600 text-xs font-bold tracking-widest uppercase mb-2" style={{ fontFamily: sans }}>Captured Moments</p>
          <h2 style={{ fontFamily: serif, color: "#14532d" }} className="text-3xl md:text-5xl font-black">Through the Lens</h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {gallery.map((img, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div
                onClick={() => setSel(img)}
                className="relative overflow-hidden rounded-xl cursor-pointer group shadow-md hover:shadow-2xl transition-all duration-300 aspect-square"
              >
                <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600" loading="lazy" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-xl">🔍</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>

      {sel && (
        <div
          onClick={() => setSel(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,.96)", backdropFilter: "blur(8px)" }}
        >
          <img src={sel} alt="Full" className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl object-contain" loading="lazy" />
          <button
            className="absolute top-5 right-5 w-11 h-11 rounded-full flex items-center justify-center text-white text-xl border border-white/20 hover:bg-white/20 transition-all"
            style={{ background: "rgba(255,255,255,.1)" }}
          >✕</button>
        </div>
      )}
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   REVIEWS
═══════════════════════════════════════════════════════════════════ */
function Reviews() {
  const [idx, setIdx] = useState(0);
  const vis = [reviews[idx], reviews[(idx + 1) % reviews.length], reviews[(idx + 2) % reviews.length]];
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">

        <Reveal className="text-center mb-12">
          <p className="text-yellow-600 text-xs font-bold tracking-widest uppercase mb-2" style={{ fontFamily: sans }}>Testimonials</p>
          <h2 style={{ fontFamily: serif, color: "#14532d" }} className="text-3xl md:text-5xl font-black mb-3">Traveller Stories</h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400">★</span>)}</div>
            <span className="text-gray-500 text-sm font-semibold" style={{ fontFamily: sans }}>4.7 / 5 — 260+ reviews</span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {vis.map((r) => (
              <div key={r.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col">
                <div className="flex items-start gap-3 mb-4">
                  <img src={r.avatar} alt={r.name} className="w-11 h-11 rounded-full border-2 border-yellow-400 flex-shrink-0" loading="lazy" />
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-gray-800 text-sm truncate" style={{ fontFamily: serif }}>{r.name}</p>
                    <p className="text-gray-400 text-xs" style={{ fontFamily: sans }}>{r.country} · {r.date}</p>
                    <p className="text-green-600 text-xs font-semibold mt-0.5" style={{ fontFamily: sans }}>{r.tour}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">{[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-sm">★</span>)}</div>
                <h4 className="font-black text-gray-800 text-base mb-2" style={{ fontFamily: serif }}>{r.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed flex-1" style={{ fontFamily: sans }}>"{r.comment}"</p>
                <div className="flex items-center gap-1.5 mt-4 text-green-600 text-xs font-bold" style={{ fontFamily: sans }}>
                  <span>✓</span> Verified Traveller
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4">
            <button onClick={() => setIdx(p => (p - 1 + reviews.length) % reviews.length)} className="w-10 h-10 rounded-full bg-green-700 hover:bg-green-600 text-white flex items-center justify-center text-lg transition-all">‹</button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width:  [idx, (idx+1)%reviews.length, (idx+2)%reviews.length].includes(i) ? 20 : 10,
                    height: 10,
                    background: [idx, (idx+1)%reviews.length, (idx+2)%reviews.length].includes(i) ? "#facc15" : "#e5e7eb",
                  }}
                />
              ))}
            </div>
            <button onClick={() => setIdx(p => (p + 1) % reviews.length)} className="w-10 h-10 rounded-full bg-green-700 hover:bg-green-600 text-white flex items-center justify-center text-lg transition-all">›</button>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CTA
═══════════════════════════════════════════════════════════════════ */
function CTA() {
  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
      style={{ background: "linear-gradient(150deg,#052e16 0%,#14532d 40%,#166534 70%,#052e16 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[700, 500, 320].map((s, i) => (
          <div key={i} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ width: s, height: s, border: `1px solid ${i === 2 ? "rgba(250,204,21,.12)" : "rgba(255,255,255,.04)"}` }} />
        ))}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: "#4ade80" }} />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: "#facc15" }} />
      </div>

      <Reveal className="relative z-10 max-w-4xl mx-auto text-center py-24 w-full">
        <span
          className="inline-block px-5 py-2 rounded-full text-yellow-400 text-xs font-bold tracking-widest uppercase border border-yellow-400/30 mb-8"
          style={{ background: "rgba(250,204,21,.1)", fontFamily: sans }}
        >
          🌴 Madagascar Tour Specialists — 3 ans d'expérience
        </span>
        <h2
          className="text-white font-black leading-none mb-6"
          style={{ fontFamily: serif, fontSize: "clamp(2.5rem,7vw,5.5rem)", letterSpacing: "-.02em" }}
        >
          Your Adventure<br /><em style={{ color: "#facc15" }}>Starts Here.</em>
        </h2>
        <p className="text-green-200 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: sans }}>
          Contact us via WhatsApp and receive a personalised itinerary within 2 hours. No hidden fees. No bots. Just real people who love Madagascar.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <button
            onClick={() => wa("Hello KiriTour! I'd like to plan my trip.")}
            className="px-10 py-5 rounded-full font-black text-green-900 text-lg hover:scale-105 active:scale-95 transition-all duration-300"
            style={{ background: "linear-gradient(135deg,#facc15,#f59e0b)", boxShadow: "0 0 40px rgba(250,204,21,.4)", fontFamily: sans }}
          >
            📲 Book via WhatsApp
          </button>
          <a
            href="mailto:infokiritourmadagascar@gmail.com"
            className="px-10 py-5 rounded-full font-bold text-white text-lg border-2 border-white/25 hover:bg-white/10 active:scale-95 transition-all duration-300 flex items-center justify-center"
            style={{ fontFamily: sans }}
          >
            ✉️ Send an Email
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-14">
          {[
            { icon: "✅", t: "Instant Confirmation", d: "Response within 2 hours" },
            { icon: "🔒", t: "Secure Booking",       d: "100% safe transactions" },
            { icon: "🕐", t: "24 / 7 Support",       d: "Always reachable" },
          ].map((c, i) => (
            <div
              key={i}
              className="rounded-2xl p-5 border border-white/10 text-center"
              style={{ background: "rgba(255,255,255,.07)", backdropFilter: "blur(12px)" }}
            >
              <div className="text-3xl mb-2">{c.icon}</div>
              <p className="text-white font-bold text-sm mb-1" style={{ fontFamily: sans }}>{c.t}</p>
              <p className="text-green-300 text-xs" style={{ fontFamily: sans }}>{c.d}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-6 justify-center text-green-300 text-sm" style={{ fontFamily: sans }}>
          <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-yellow-400 transition-colors">📱 +261 33 664 0777</a>
          <span className="flex items-center gap-2">📍 Morondava, Madagascar</span>
          <span className="flex items-center gap-2">⭐ 4.7/5 · 260+ voyageurs</span>
        </div>
      </Reveal>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HOME EXPORT
═══════════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      <ProgressBar />
      <div className="min-h-screen" style={{ fontFamily: sans }}>
        <Hero />
        <AnimatedStats />
        <About />
        <Wildlife />
        <TourCategories />
        <BookingCalendar />
        <WhyUs />
        <HowItWorks />
        <Gallery />
        <Reviews />
        <HotelSection />
        <MapSection />
        <CTA />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          KEYFRAMES GLOBAUX
          ── Hero : bgKB, charReveal, scanLine, fadeDown, fadeUp
          ── Scroll sections : gérées via style inline (Reveal)
          ── Tout le reste : shimmer, livePulse, scrollBar
      ══════════════════════════════════════════════════════════════ */}
      <style>{`

        /* ── Ken Burns background ── */
        @keyframes hero-kb {
          from { transform: scale(1.09); }
          to   { transform: scale(1);    }
        }

        /* ── CapCut char : monte depuis le bas avec blur + skew ── */
        @keyframes capcut-char {
          0%   {
            opacity: 0;
            transform: translateY(110%) skewY(6deg);
            filter: blur(8px);
          }
          60%  {
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0) skewY(0deg);
            filter: blur(0);
          }
        }

        /* ── Scan line : balayage doré horizontal ── */
        @keyframes capcut-scan {
          0%   { transform: translateX(-105%); opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { transform: translateX(105%);  opacity: 0; }
        }

        /* ── Badge / eyebrow ── */
        @keyframes hero-fade-down {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Subtitle / CTA ── */
        @keyframes hero-fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Shimmer CTA button ── */
        @keyframes btn-shimmer {
          0%   { transform: translateX(-220%); }
          100% { transform: translateX(220%); }
        }

        /* ── Live dot ── */
        @keyframes live-dot {
          0%, 100% { opacity: 1;   transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(.65); }
        }

        /* ── Scroll indicator bar ── */
        @keyframes scroll-bar {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(290%); }
        }

        /* ── Scroll chevron double bounce ── */
        @keyframes scroll-chevron {
          0%, 100% { transform: translateY(0);   opacity: 0.7; }
          50%       { transform: translateY(5px); opacity: 1;   }
        }

        /* ── Responsive utilities ── */
        @media (max-width: 640px) {
          /* Moins de padding vertical sur mobile */
          section.py-24 { padding-top: 4rem !important; padding-bottom: 4rem !important; }
          section.py-20 { padding-top: 3rem !important; padding-bottom: 3rem !important; }
        }

      `}</style>
    </>
  );
}