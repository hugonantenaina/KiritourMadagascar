import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MapSection from "../components/MapSection";
import BookingCalendar from "../components/BookingCalendar";
import AnimatedStats from "../components/AnimatedStats";
import LoadingScreen from "../components/LoadingScreen";
import ProgressBar from "../components/ProgressBar";
import HotelSection from "../components/HotelSection";
import GoogleReviewsSection from "../components/GoogleReviews/GoogleReviewsSection";

/* ─── Fonts ── */
if (typeof document !== "undefined" && !document.getElementById("kt-fonts")) {
  const link = document.createElement("link");
  link.id = "kt-fonts"; link.rel = "stylesheet";
  link.crossOrigin = "anonymous";
  link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap";
  document.head.appendChild(link);
}

const WA    = "261336640777";
const wa    = (msg) => window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg || "Hello KiriTour!")}`, "_blank");
const serif = "'Playfair Display', serif";
const sans  = "'DM Sans', sans-serif";

function useOnceVisible(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, y = 50, className = "", style = {} }) {
  const [ref, vis] = useOnceVisible(0.12);
  return (
    <div ref={ref} className={className} style={{
      ...style,
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0px)" : `translateY(${y}px)`,
      transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      willChange: "opacity, transform",
    }}>
      {children}
    </div>
  );
}

function AnimChars({ text, baseDelay = 0, color, italic = false }) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <span key={i} className="inline-block overflow-hidden" style={{ verticalAlign: "bottom" }}>
          <span className="inline-block" style={{
            color: color || "inherit",
            fontStyle: italic ? "italic" : "normal",
            animation: `capcut-char 0.75s cubic-bezier(0.16,1,0.3,1) ${baseDelay + i * 0.038}s both`,
            whiteSpace: ch === " " ? "pre" : "normal",
            willChange: "transform, opacity",
            transform: "translateZ(0)",
          }}>
            {ch === " " ? "\u00A0" : ch}
          </span>
        </span>
      ))}
    </>
  );
}

function ScanLine({ delay }) {
  return (
    <div aria-hidden className="absolute left-0 right-0 pointer-events-none" style={{
      height: 2, top: "50%",
      background: "linear-gradient(90deg,transparent 0%,rgba(250,204,21,.85) 40%,#fff 50%,rgba(250,204,21,.85) 60%,transparent 100%)",
      boxShadow: "0 0 18px rgba(250,204,21,.75)",
      animation: `capcut-scan 1.1s ease-in-out ${delay}s both`,
      zIndex: 5,
      willChange: "transform, opacity",
    }} />
  );
}

const slides = [
  { img: "https://res.cloudinary.com/dloqrnvp8/image/upload/q_auto/f_auto/w_1200/v1779706214/IMG-20251030-WA0058_ddsyrf.jpg", label: "Kirindy Forest Reserve", sub: "Home of the Elusive Fossa" },
  { img: "https://res.cloudinary.com/dloqrnvp8/image/upload/q_auto/f_auto/w_1200/v1779367774/IMG-20260224-WA0029_hjrlcx.jpg", label: "Avenue of the Baobabs",  sub: "Madagascar's Most Iconic Landscape" },
  { img: "https://res.cloudinary.com/dloqrnvp8/image/upload/q_auto/f_auto/w_1200/v1779706266/20250817-102639_fcnag5.jpg",     label: "Tsingy de Bemaraha",   sub: "UNESCO World Heritage Site" },
];

const wildlife = [
  { emoji: "🦁", name: "Fossa",         desc: "Madagascar's apex predator — only in Kirindy" },
  { emoji: "🐒", name: "Lemurs",        desc: "20+ species across our tour routes" },
  { emoji: "🦎", name: "Chameleons",    desc: "Half the world's species live here" },
  { emoji: "🐦", name: "Endemic Birds", desc: "250+ species unique to Madagascar" },
];

const whyUs = [
  { emoji: "🧭", title: "Expert Local Guides",   desc: "Native naturalists sharing stories no guidebook contains." },
  { emoji: "🛻", title: "Private 4×4 Transport", desc: "Dedicated vehicle for your group — pickup to final drop-off." },
  { emoji: "💬", title: "WhatsApp Booking",      desc: "Real humans, instant response. Confirmation within 2 hours." },
  { emoji: "💎", title: "Transparent Pricing",   desc: "6 package tiers for every budget — fully disclosed." },
  { emoji: "🌿", title: "Eco-Responsible",       desc: "Local communities first. We protect what we share." },
  { emoji: "⭐", title: "4.7 / 5 Google Rating", desc: "112+ verified travellers. Our reputation speaks for itself." },
];

const howItWorks = [
  { step:"01", emoji:"💬", title:"Contact Us",        desc:"Send us a WhatsApp message or email. Tell us your dates, group size and interests. We respond within 2 hours.", color:"#0369a1", bg:"#eff6ff" },
  { step:"02", emoji:"🗺️", title:"Custom Itinerary",  desc:"Our local experts craft a personalised itinerary tailored to your budget, time and dream destinations.",       color:"#15803d", bg:"#f0fdf4" },
  { step:"03", emoji:"✅", title:"Confirm & Book",     desc:"Review your tour details, confirm your booking with a deposit. Transparent pricing — zero hidden fees.",        color:"#b45309", bg:"#fffbeb" },
  { step:"04", emoji:"🌴", title:"Explore Madagascar", desc:"Your guide meets you on arrival. Everything is handled — transfers, accommodation, park permits, meals.",       color:"#7c3aed", bg:"#f5f3ff" },
];

/* ════════════════════════════════════════════════════
   HERO — Fixed: text left, buttons centered bottom
════════════════════════════════════════════════════ */
function Hero() {
  const [cur,     setCur]     = useState(0);
  const [loading, setLoading] = useState(true);
  const [armed,   setArmed]   = useState(false);

  useEffect(() => {
    const t = setInterval(() => setCur(p => (p + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!loading && !armed) {
      const id = setTimeout(() => setArmed(true), 80);
      return () => clearTimeout(id);
    }
  }, [loading, armed]);

  if (loading) return <LoadingScreen onComplete={() => setLoading(false)} />;

  return (
    <section className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: 620, maxHeight: 960 }}>

      {/* Slides */}
      {slides.map((s, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === cur ? "opacity-100" : "opacity-0"}`}>
          <img
            src={s.img} alt={s.label}
            width="1200" height="800"
            className="absolute inset-0 w-full h-full object-cover"
            fetchpriority={i === 0 ? "high" : "low"}
            loading={i === 0 ? "eager" : "lazy"}
            decoding={i === 0 ? "sync" : "async"}
            style={{ animation: i === cur ? "hero-kb 9s ease-out both" : "none" }}
          />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom,rgba(0,0,0,.08) 0%,rgba(0,0,0,.45) 50%,rgba(0,0,0,.88) 100%)" }} />
        </div>
      ))}

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center,transparent 45%,rgba(0,0,0,.5) 100%)" }} />

      {/* ── Text — LEFT aligned ── */}
      <div className="absolute inset-0 flex flex-col items-start justify-center px-6 sm:px-10 md:px-16 z-20 text-left"
        style={{ paddingBottom: "120px" }}>

        {/* Label badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 backdrop-blur-md mb-5 w-fit"
          style={{ background: "rgba(255,255,255,.08)", animation: armed ? "hero-fade-down .7s ease .1s both" : "none" }}>
          <span className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0" style={{ animation: "live-dot 2s ease-in-out infinite" }} />
          <span className="text-white/85 text-xs font-semibold tracking-[.2em] uppercase" style={{ fontFamily: sans }}>
            {slides[cur].label}
          </span>
        </div>

        {/* H1 lines */}
        <div className="relative mb-1">
          <ScanLine delay={0.28} />
          <h1 style={{ fontFamily: serif, fontSize: "clamp(2.4rem,6.5vw,6.5rem)", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-.03em", color: "#fff", textShadow: "0 4px 60px rgba(0,0,0,.7)" }}>
            {armed && <AnimChars text="See Madagascar." baseDelay={0.32} />}
          </h1>
        </div>
        <div className="relative mb-1">
          <ScanLine delay={0.72} />
          <h1 style={{ fontFamily: serif, fontSize: "clamp(2.4rem,6.5vw,6.5rem)", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-.03em", color: "#fff", textShadow: "0 4px 60px rgba(0,0,0,.7)" }}>
            {armed && <AnimChars text="Feel the Wild." baseDelay={0.76} />}
          </h1>
        </div>
        <div className="relative mb-7">
          <ScanLine delay={1.14} />
          <h1 style={{ fontFamily: serif, fontSize: "clamp(2.4rem,6.5vw,6.5rem)", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-.03em", textShadow: "0 0 60px rgba(250,204,21,.5),0 4px 30px rgba(0,0,0,.8)" }}>
            {armed && <AnimChars text="Book Now." baseDelay={1.18} color="#facc15" />}
          </h1>
        </div>

        {/* Sub + secure */}
        <div style={{ animation: armed ? "hero-fade-up .8s ease 2.1s both" : "none" }}>
          <p className="text-white/70 text-sm md:text-base max-w-xs mb-1.5 text-left" style={{ fontFamily: sans }}>{slides[cur].sub}</p>
          <p className="text-white/40 text-xs flex items-center gap-1.5" style={{ fontFamily: sans }}>
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-yellow-400/60 flex-shrink-0" aria-hidden="true">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Secure booking via WhatsApp — reply in 2h
          </p>
        </div>
      </div>

      {/* ── Buttons — CENTERED bottom ── */}
      <div className="absolute inset-x-0 bottom-16 sm:bottom-20 z-20 flex justify-center px-4"
        style={{ animation: armed ? "hero-fade-up .8s ease 1.6s both" : "none" }}>
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center w-full max-w-lg">
          <button onClick={() => wa("Hello KiriTour! I'd like to book a tour.")}
            aria-label="Book your Madagascar tour via WhatsApp"
            className="relative overflow-hidden rounded-full font-black text-green-900 text-sm sm:text-base hover:scale-105 active:scale-95 transition-transform duration-300 w-full sm:w-auto"
            style={{ background: "linear-gradient(135deg,#facc15,#f59e0b)", boxShadow: "0 0 30px rgba(250,204,21,.45)", fontFamily: sans, padding: "14px 36px" }}>
            <span className="absolute inset-0 pointer-events-none rounded-full"
              style={{ background: "linear-gradient(105deg,transparent 35%,rgba(255,255,255,.4) 50%,transparent 65%)", animation: "btn-shimmer 3.5s ease-in-out 3.5s infinite" }} />
            <span className="relative z-10">📲 Book Your Adventure</span>
          </button>
          <button onClick={() => document.getElementById("tours-section")?.scrollIntoView({ behavior: "smooth" })}
            aria-label="Explore our Madagascar tours"
            className="rounded-full font-semibold text-white border-2 border-white/30 backdrop-blur-sm hover:bg-white/12 hover:scale-105 active:scale-95 transition-all duration-300 text-sm sm:text-base w-full sm:w-auto"
            style={{ fontFamily: sans, padding: "14px 36px" }}>
            Explore Tours ↓
          </button>
        </div>
      </div>

      {/* Arrows */}
      {[
        ["left-3 sm:left-4",  "‹", "Previous slide", (p) => (p - 1 + slides.length) % slides.length],
        ["right-3 sm:right-4","›", "Next slide",      (p) => (p + 1) % slides.length],
      ].map(([pos, chr, label, fn], i) => (
        <button key={i} onClick={() => setCur(fn)} aria-label={label}
          className={`absolute ${pos} top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-white text-xl border border-white/10 hover:bg-white/18 transition-all`}
          style={{ background: "rgba(0,0,0,.38)" }}>{chr}</button>
      ))}

      {/* Dots — mobile/tablet only */}
      <div className="lg:hidden absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2" role="tablist" aria-label="Slide navigation">
        {slides.map((s, i) => (
          <button key={i} onClick={() => setCur(i)}
            role="tab" aria-selected={i === cur} aria-label={`Show slide: ${s.label}`}
            className="rounded-full transition-all duration-300"
            style={{ width: i === cur ? 28 : 9, height: 9, background: i === cur ? "#facc15" : "rgba(255,255,255,.35)" }} />
        ))}
      </div>

      {/* Scroll indicator — desktop only */}
      <div className="absolute bottom-8 right-7 z-20 hidden lg:flex flex-col items-center gap-3"
        style={{ animation: armed ? "hero-fade-up 1s ease 3.2s both" : "none" }}>
        <p className="text-white/45 text-[10px] font-semibold tracking-[.35em] uppercase" style={{ fontFamily: sans, writingMode: "vertical-rl" }}>scroll</p>
        <div className="rounded-full overflow-hidden" style={{ width: 3, height: 56, background: "rgba(255,255,255,.15)" }}>
          <div className="w-full rounded-full" style={{ height: "45%", background: "linear-gradient(to bottom,#facc15,#f59e0b)", boxShadow: "0 0 8px rgba(250,204,21,.7)", animation: "scroll-bar 2s ease-in-out 3.5s infinite" }} />
        </div>
        <svg viewBox="0 0 16 24" fill="none" stroke="#facc15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true" style={{ width: 14, opacity: 0.7, animation: "scroll-chevron 1.6s ease-in-out 3.5s infinite" }}>
          <polyline points="3,6 8,12 13,6" /><polyline points="3,13 8,19 13,13" />
        </svg>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════ */
function About() {
  return (
    <section className="py-16 md:py-20 px-4 bg-white" id="about">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
        <Reveal delay={0}>
          <p className="text-yellow-600 text-xs font-bold tracking-widest uppercase mb-3" style={{ fontFamily: sans }}>About KiriTour</p>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(1.7rem,3.5vw,2.8rem)", lineHeight: 1.15, color: "#14532d" }} className="font-black mb-5">
            Madagascar's Most Trusted Adventure Specialists
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4 text-sm" style={{ fontFamily: sans }}>
            Based in Morondava, KiriTour has been connecting travellers with the raw beauty of the Menabe region for over 3 years.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8 text-sm" style={{ fontFamily: sans }}>
            From the razor-sharp limestone pinnacles of Tsingy to the midnight silhouettes of ancient baobabs — we design experiences that stay with you forever.
          </p>
          <button onClick={() => wa("Hello KiriTour! I'd like to learn more.")}
            aria-label="Chat with KiriTour Madagascar via WhatsApp"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-white hover:scale-105 active:scale-95 transition-all duration-300 text-sm shadow-lg"
            style={{ background: "linear-gradient(135deg,#166534,#15803d)", fontFamily: sans }}>
            📲 Chat with Us
          </button>
        </Reveal>
        <Reveal delay={0.15}>
          {/* ✅ aspect-ratio fix CLS */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: "4/3" }}>
            <img
              src="https://res.cloudinary.com/dloqrnvp8/image/upload/q_auto/f_auto/w_800/v1779706560/IMG-20260224-WA0004_cpdoex.jpg"
              alt="Tsingy de Bemaraha limestone pinnacles"
              width="800" height="600"
              className="w-full h-full object-cover"
              loading="lazy" decoding="async"
            />
            <div className="absolute inset-0 rounded-3xl" style={{ background: "linear-gradient(to top,rgba(20,83,45,.65) 0%,transparent 55%)" }} />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="flex items-center gap-3 rounded-xl px-4 py-3 border border-white/20 backdrop-blur-md" style={{ background: "rgba(255,255,255,.12)" }}>
                <span className="text-2xl" aria-hidden="true">🏆</span>
                <div>
                  <p className="text-white font-bold text-sm" style={{ fontFamily: sans }}>3 years experience · 112+ travellers</p>
                  <div className="flex gap-0.5 mt-0.5" aria-label="5 star rating">
                    {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-xs" aria-hidden="true">★</span>)}
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

function Wildlife() {
  return (
    <section className="py-12 md:py-16 px-4" style={{ background: "#f0fdf4" }}>
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-10">
          <p className="text-yellow-600 text-xs font-bold tracking-widest uppercase mb-2" style={{ fontFamily: sans }}>Unique Biodiversity</p>
          <h2 style={{ fontFamily: serif, color: "#14532d" }} className="text-3xl md:text-5xl font-black">Wildlife Found <em>Nowhere Else</em></h2>
          <p className="text-gray-400 text-sm mt-2 max-w-md mx-auto" style={{ fontFamily: sans }}>90% of Madagascar's wildlife is endemic. Every tour maximises encounters.</p>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {wildlife.map((w, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="bg-white rounded-2xl p-5 md:p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-green-50 h-full">
                <div className="text-4xl md:text-5xl mb-3" aria-hidden="true">{w.emoji}</div>
                <h3 className="font-black text-green-800 text-base md:text-lg mb-1" style={{ fontFamily: serif }}>{w.name}</h3>
                <p className="text-gray-400 text-xs leading-relaxed" style={{ fontFamily: sans }}>{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TourCategories() {
  const navigate = useNavigate();
  const categories = [
    { id:"tsiribihina", emoji:"🚣", name:"Tsiribihina River",  desc:"3 to 8-day pirogue descents through sacred Sakalava villages, wild camping on remote sandbanks", image:"https://res.cloudinary.com/dloqrnvp8/image/upload/q_auto/f_auto/w_600/v1779706626/20250810-063819_fnm8kk.jpg",    tours:"5 tours available", from:"529€", gradient:"from-blue-500 to-cyan-600" },
    { id:"andasibe",    emoji:"🦎", name:"Andasibe Rainforest", desc:"Indri lemurs, Mantadia National Park, night walks through misty rainforest trails",             image:"https://res.cloudinary.com/dloqrnvp8/image/upload/q_auto/f_auto/w_600/v1779706685/IMG-20251030-WA0087_j5biln.jpg", tours:"4 tours available", from:"996€", gradient:"from-green-500 to-emerald-600" },
    { id:"tsingy",      emoji:"⛰️", name:"Tsingy de Bemaraha", desc:"UNESCO stone forest with harnesses, suspension bridges, razor-sharp limestone pinnacles",        image:"https://res.cloudinary.com/dloqrnvp8/image/upload/q_auto/f_auto/w_600/v1779706728/20250817-104453_pfnnk6.jpg",     tours:"2 tours available", from:"369€", gradient:"from-orange-500 to-amber-600" },
    { id:"kirindy",     emoji:"🌳", name:"Kirindy Forest",      desc:"Fossa sightings, nocturnal lemurs, dry forest wildlife in Madagascar's apex predator territory", image:"https://res.cloudinary.com/dloqrnvp8/image/upload/q_auto/f_auto/w_600/v1779706764/IMG-20251030-WA0008_uki3cp.jpg", tours:"2 tours available", from:"191€", gradient:"from-lime-500 to-green-600" },
    { id:"western",     emoji:"🌅", name:"Western Day Tours",   desc:"Betania sacred village, Kimony beach, Avenue of Baobabs sunset photography",                    image:"https://res.cloudinary.com/dloqrnvp8/image/upload/q_auto/f_auto/w_600/v1779706798/20250729-173834_pph21f.jpg",     tours:"1 tour available",  from:"145€", gradient:"from-rose-500 to-pink-600" },
  ];

  const [customForm, setCustomForm] = useState({ name:"", dates:"", group:"", interests:"", budget:"" });
  const [customSent, setCustomSent] = useState(false);

  const sendCustomTour = () => {
    if (!customForm.interests.trim()) return;
    const msg = `Hello KiriTour! I'd like to design a custom tour.\n\n👤 Name: ${customForm.name || "Not specified"}\n📅 Dates: ${customForm.dates || "Flexible"}\n👥 Group size: ${customForm.group || "Not specified"}\n🌍 I want to see: ${customForm.interests}\n💶 Budget: ${customForm.budget || "To discuss"}\n\nPlease help me create the perfect itinerary!`;
    wa(msg);
    setCustomSent(true);
    setTimeout(() => setCustomSent(false), 4000);
  };

  const sendCustomEmail = () => {
    if (!customForm.interests.trim()) return;
    const subject = "Custom Tour Request — KiriTour Madagascar";
    const body = `Hello KiriTour,\n\nI would like to design a custom tour.\n\nName: ${customForm.name || "Not specified"}\nDates: ${customForm.dates || "Flexible"}\nGroup size: ${customForm.group || "Not specified"}\nI want to see: ${customForm.interests}\nBudget: ${customForm.budget || "To discuss"}\n\nPlease help me create the perfect itinerary.\n\nKind regards`;
    window.open(`https://mail.google.com/mail/?view=cm&to=infokiritourmadagascar@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, "_blank");
  };

  return (
    <section id="tours-section" className="py-16 md:py-24 px-4 relative overflow-hidden" style={{ background: "linear-gradient(180deg,#fff 0%,#f0fdf4 100%)" }}>
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 30%,#dcfce7 0%,transparent 50%),radial-gradient(circle at 80% 70%,#fef3c7 0%,transparent 50%)" }} />
      <div className="max-w-7xl mx-auto relative z-10">
        <Reveal className="text-center mb-10 md:mb-16">
          <p className="text-yellow-600 text-xs font-bold tracking-widest uppercase mb-3" style={{ fontFamily: sans }}>Discover Your Perfect Adventure</p>
          <h2 style={{ fontFamily: serif, color: "#14532d" }} className="text-3xl md:text-5xl lg:text-6xl font-black mb-4">
            Explore by <span style={{ color: "#ca8a04" }}>Destination</span>
          </h2>
          <p className="text-gray-600 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed mb-6" style={{ fontFamily: sans }}>
            14 curated journeys across 5 unique destinations — from river descents to UNESCO stone forests
          </p>
          <button onClick={() => navigate("/tours")}
            aria-label="View all 14 Madagascar tours and pricing"
            className="inline-flex items-center gap-2 px-7 md:px-8 py-3.5 md:py-4 rounded-full font-bold text-white text-sm md:text-base shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300"
            style={{ background: "linear-gradient(135deg,#14532d,#15803d)", fontFamily: sans }}>
            View All 14 Tours & Pricing →
          </button>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {categories.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 0.09}>
              <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
                {/* ✅ aspect-ratio fix */}
                <div className="relative overflow-hidden flex-shrink-0" style={{ aspectRatio: "16/9" }}>
                  <img src={cat.image} alt={`${cat.name} Madagascar tour`}
                    width="600" height="338"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className={`absolute top-4 left-4 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-2xl md:text-3xl shadow-xl`} aria-hidden="true">
                    {cat.emoji}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-black text-lg md:text-2xl leading-tight mb-1" style={{ fontFamily: serif, textShadow: "0 2px 12px rgba(0,0,0,.8)" }}>{cat.name}</h3>
                    <p className="text-emerald-300 text-xs font-semibold" style={{ fontFamily: sans }}>{cat.tours}</p>
                  </div>
                </div>
                <div className="p-5 md:p-6 flex flex-col flex-1">
                  <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-1" style={{ fontFamily: sans }}>{cat.desc}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase mb-1" style={{ fontFamily: sans }}>Starting from</p>
                      <p className="text-emerald-600 text-xl md:text-2xl font-black" style={{ fontFamily: serif }}>{cat.from}</p>
                    </div>
                    <div className="flex gap-0.5" aria-label="5 star rating">
                      {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-sm" aria-hidden="true">★</span>)}
                    </div>
                  </div>
                  <button onClick={() => navigate("/tours")}
                    aria-label={`View ${cat.name} tours and prices`}
                    className="w-full py-3 md:py-3.5 rounded-xl font-bold text-white text-sm shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
                    style={{ background: "linear-gradient(135deg,#10b981,#059669)", fontFamily: sans }}>
                    View {cat.name} Tours →
                  </button>
                </div>
              </div>
            </Reveal>
          ))}

          {/* Card 6 — Custom Tour */}
          <Reveal delay={0.45}>
            <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col border-2 border-dashed border-yellow-400/40"
              style={{ background: "linear-gradient(135deg,#052e16 0%,#14532d 50%,#071a0e 100%)" }}>
              <div className="relative p-5 md:p-6 pb-4">
                <div className="absolute top-4 right-4 w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-2xl md:text-3xl shadow-xl"
                  style={{ background: "linear-gradient(135deg,#facc15,#f59e0b)" }}>✨</div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 text-[10px] font-bold tracking-widest uppercase"
                  style={{ background: "rgba(250,204,21,0.15)", border: "1px solid rgba(250,204,21,0.3)", color: "#facc15", fontFamily: sans }}>
                  ● Fully Customizable
                </div>
                <h3 className="text-white font-black text-xl md:text-2xl leading-tight mb-1" style={{ fontFamily: serif }}>Design Your Tour</h3>
                <p className="text-emerald-300 text-xs font-semibold" style={{ fontFamily: sans }}>100% tailor-made · Any duration</p>
              </div>
              <div className="px-5 md:px-6 pb-6 flex flex-col flex-1">
                <p className="text-green-200/70 text-sm leading-relaxed mb-4" style={{ fontFamily: sans }}>
                  Tell us your dream — we'll build the perfect Madagascar itinerary for you.
                </p>
                <div className="space-y-3 mb-5 flex-1">
                  {[
                    { key:"name",    ph:"Your name",                    type:"text" },
                    { key:"dates",   ph:"Travel dates (e.g. July 10–20)",type:"text" },
                  ].map(({key,ph,type}) => (
                    <input key={key} type={type} placeholder={ph} value={customForm[key]}
                      onChange={e => setCustomForm(f => ({...f, [key]: e.target.value}))}
                      className="w-full px-4 py-2.5 rounded-xl text-sm text-gray-800 placeholder-gray-400 outline-none"
                      style={{ fontFamily: sans, background: "rgba(255,255,255,0.92)", border: "2px solid transparent" }}
                      onFocus={e => e.target.style.borderColor = "rgba(250,204,21,0.6)"}
                      onBlur={e => e.target.style.borderColor = "transparent"} />
                  ))}
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key:"group",  ph:"Group size" },
                      { key:"budget", ph:"Budget (€)"  },
                    ].map(({key,ph}) => (
                      <input key={key} type="text" placeholder={ph} value={customForm[key]}
                        onChange={e => setCustomForm(f => ({...f, [key]: e.target.value}))}
                        className="w-full px-3 py-2.5 rounded-xl text-sm text-gray-800 placeholder-gray-400 outline-none"
                        style={{ fontFamily: sans, background: "rgba(255,255,255,0.92)", border: "2px solid transparent" }}
                        onFocus={e => e.target.style.borderColor = "rgba(250,204,21,0.6)"}
                        onBlur={e => e.target.style.borderColor = "transparent"} />
                    ))}
                  </div>
                  <textarea placeholder="What do you want to see? (e.g. Tsingy + baobabs + fossa + beach...)"
                    value={customForm.interests}
                    onChange={e => setCustomForm(f => ({...f, interests: e.target.value}))}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl text-sm text-gray-800 placeholder-gray-400 outline-none resize-none"
                    style={{ fontFamily: sans, background: "rgba(255,255,255,0.92)", border: "2px solid transparent" }}
                    onFocus={e => e.target.style.borderColor = "rgba(250,204,21,0.6)"}
                    onBlur={e => e.target.style.borderColor = "transparent"} />
                </div>
                {customSent && (
                  <div className="mb-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-center"
                    style={{ background: "rgba(52,211,153,0.15)", color: "#34d399", border: "1px solid rgba(52,211,153,0.3)", fontFamily: sans }}>
                    ✅ Opening WhatsApp...
                  </div>
                )}
                <div className="flex gap-2">
                  <button onClick={sendCustomTour} aria-label="Send custom tour request via WhatsApp"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-green-900 text-sm hover:scale-105 active:scale-95 transition-all duration-300"
                    style={{ background: "linear-gradient(135deg,#facc15,#f59e0b)", fontFamily: sans }}>
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current flex-shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a9.87 9.87 0 00-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp
                  </button>
                  <button onClick={sendCustomEmail} aria-label="Send custom tour request via Email"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-white text-sm hover:scale-105 active:scale-95 transition-all duration-300"
                    style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", fontFamily: sans }}>
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M5 7l7 6 7-6"/></svg>
                    Email
                  </button>
                </div>
                <p className="text-center text-green-400/40 text-[10px] mt-3" style={{ fontFamily: sans }}>🔒 Secure · Reply within 2 hours</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-8 md:p-14 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 50%,white 0%,transparent 60%)" }} />
            <div className="relative z-10">
              <h3 className="text-white font-black text-2xl md:text-4xl mb-4" style={{ fontFamily: serif }}>Ready to Explore?</h3>
              <p className="text-emerald-100 text-sm md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: sans }}>
                Browse all 14 tours with complete itineraries, pricing options and availability.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => navigate("/tours")}
                  className="px-8 md:px-10 py-3.5 md:py-4 rounded-full font-black text-emerald-900 text-sm md:text-base shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
                  style={{ background: "linear-gradient(135deg,#facc15,#f59e0b)", fontFamily: sans }}>
                  Browse All Tours & Prices
                </button>
                <button onClick={() => wa("Hello KiriTour! I need help choosing the right tour.")}
                  className="px-8 md:px-10 py-3.5 md:py-4 rounded-full font-bold text-white text-sm md:text-base border-2 border-white/30 backdrop-blur-sm hover:bg-white/10 active:scale-95 transition-all duration-300"
                  style={{ fontFamily: sans }}>
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

function WhyUs() {
  return (
    <section className="py-16 md:py-20 px-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#052e16,#14532d,#166534)" }}>
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 10% 20%,#facc15 0%,transparent 35%),radial-gradient(circle at 90% 80%,#4ade80 0%,transparent 35%)" }} />
      <div className="max-w-6xl mx-auto relative z-10">
        <Reveal className="text-center mb-10 md:mb-14">
          <p className="text-yellow-400 text-xs font-bold tracking-widest uppercase mb-2" style={{ fontFamily: sans }}>Why KiriTour</p>
          <h2 style={{ fontFamily: serif }} className="text-3xl md:text-5xl font-black text-white">The KiriTour Difference</h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {whyUs.map((w, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="rounded-2xl p-5 md:p-6 border border-white/10 hover:border-yellow-400/40 group transition-all duration-300 h-full"
                style={{ background: "rgba(255,255,255,.06)", backdropFilter: "blur(12px)" }}>
                <div className="text-3xl md:text-4xl mb-4 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">{w.emoji}</div>
                <h3 className="text-white font-black text-base md:text-lg mb-2" style={{ fontFamily: serif }}>{w.title}</h3>
                <p className="text-green-200 text-sm leading-relaxed" style={{ fontFamily: sans }}>{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="py-16 md:py-24 px-4 bg-white" id="how-it-works">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-12 md:mb-16">
          <p className="text-yellow-600 text-xs font-bold tracking-widest uppercase mb-3" style={{ fontFamily: sans }}>Simple Process</p>
          <h2 style={{ fontFamily: serif, color: "#14532d" }} className="text-3xl md:text-5xl font-black mb-4">How to Book <em>Your Tour</em></h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto" style={{ fontFamily: sans }}>From first contact to your adventure in Madagascar — 4 simple steps.</p>
        </Reveal>
        <div className="relative">
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 mx-32" style={{ background: "linear-gradient(90deg,#dcfce7,#16a34a,#dcfce7)" }} />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {howItWorks.map((step, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="relative flex flex-col items-center text-center group h-full">
                  <div className="relative z-10 w-24 h-24 md:w-32 md:h-32 rounded-3xl flex flex-col items-center justify-center mb-4 md:mb-6 shadow-xl group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300"
                    style={{ background: `linear-gradient(135deg,${step.bg},white)`, border: `2px solid ${step.color}22` }}>
                    <span className="text-3xl md:text-4xl mb-1" aria-hidden="true">{step.emoji}</span>
                    <span className="text-[10px] md:text-xs font-black tracking-widest" style={{ color: step.color, fontFamily: sans }}>STEP {step.step}</span>
                  </div>
                  <h3 className="font-black text-base md:text-xl mb-2 md:mb-3 text-gray-800" style={{ fontFamily: serif }}>{step.title}</h3>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed" style={{ fontFamily: sans }}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="mt-12 md:mt-16 text-center" delay={0.1}>
          <button onClick={() => wa("Hello KiriTour! I'd like to start planning my trip.")}
            className="inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 rounded-full font-black text-white text-sm md:text-base shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
            style={{ background: "linear-gradient(135deg,#14532d,#16a34a)", fontFamily: sans }}>
            📲 Start Planning Now — It's Free
          </button>
          <p className="text-gray-400 text-xs mt-3" style={{ fontFamily: sans }}>No commitment. Response within 2 hours. 🇲🇬</p>
        </Reveal>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contact" className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
      style={{ background: "linear-gradient(150deg,#052e16 0%,#14532d 40%,#166534 70%,#052e16 100%)" }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[700, 500, 320].map((s, i) => (
          <div key={i} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ width: s, height: s, border: `1px solid ${i === 2 ? "rgba(250,204,21,.12)" : "rgba(255,255,255,.04)"}` }} />
        ))}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: "#4ade80" }} />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: "#facc15" }} />
      </div>
      <Reveal className="relative z-10 max-w-4xl mx-auto text-center py-20 md:py-24 w-full">
        <span className="inline-block px-4 md:px-5 py-2 rounded-full text-yellow-400 text-xs font-bold tracking-widest uppercase border border-yellow-400/30 mb-6 md:mb-8"
          style={{ background: "rgba(250,204,21,.1)", fontFamily: sans }}>
          🌴 Madagascar Tour Specialists — 3 years of expertise
        </span>
        <h2 className="text-white font-black leading-none mb-6"
          style={{ fontFamily: serif, fontSize: "clamp(2rem,6vw,5.5rem)", letterSpacing: "-.02em" }}>
          Your Adventure<br /><em style={{ color: "#facc15" }}>Starts Here.</em>
        </h2>
        <p className="text-green-200 text-base md:text-xl mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: sans }}>
          Contact us via WhatsApp and receive a personalised itinerary within 2 hours. No hidden fees. No bots. Just real people who love Madagascar.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10 md:mb-14">
          <button onClick={() => wa("Hello KiriTour! I'd like to plan my trip.")}
            className="px-8 md:px-10 py-4 md:py-5 rounded-full font-black text-green-900 text-base md:text-lg hover:scale-105 active:scale-95 transition-all duration-300"
            style={{ background: "linear-gradient(135deg,#facc15,#f59e0b)", fontFamily: sans }}>
            📲 Book via WhatsApp
          </button>
          <a href="mailto:infokiritourmadagascar@gmail.com"
            className="px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-white text-base md:text-lg border-2 border-white/25 hover:bg-white/10 active:scale-95 transition-all duration-300 flex items-center justify-center"
            style={{ fontFamily: sans }}>
            ✉️ Send an Email
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10 md:mb-14">
          {[
            { icon: "✅", t: "Instant Confirmation", d: "Response within 2 hours" },
            { icon: "🔒", t: "Secure Booking",       d: "100% safe transactions"  },
            { icon: "🕐", t: "24 / 7 Support",       d: "Always reachable"        },
          ].map((c, i) => (
            <div key={i} className="rounded-2xl p-4 md:p-5 border border-white/10 text-center" style={{ background: "rgba(255,255,255,.07)", backdropFilter: "blur(12px)" }}>
              <div className="text-2xl md:text-3xl mb-2" aria-hidden="true">{c.icon}</div>
              <p className="text-white font-bold text-sm mb-1" style={{ fontFamily: sans }}>{c.t}</p>
              <p className="text-green-300 text-xs" style={{ fontFamily: sans }}>{c.d}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 md:gap-6 justify-center text-green-300 text-sm" style={{ fontFamily: sans }}>
          <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-yellow-400 transition-colors">📱 +261 33 664 07 77</a>
          <span className="flex items-center gap-2">📍 Morondava, Madagascar</span>
          <span className="flex items-center gap-2">⭐ 4.7/5 · Google Maps</span>
        </div>
      </Reveal>
    </section>
  );
}

export default function Home() {
  useEffect(() => {
    document.title = "KiriTour Madagascar | Tours Baobabs, Tsingy & Wildlife — Morondava";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta); }
    meta.content = "KiriTour Madagascar — Expert eco-tours & safaris in Morondava. Avenue of the Baobabs, Tsingy de Bemaraha UNESCO, Kirindy Forest, lemurs & Tsiribihina River. ⭐4.7/5 · 112+ travellers. Book via WhatsApp!";
    let canon = document.querySelector('link[rel="canonical"]');
    if (!canon) { canon = document.createElement("link"); canon.rel = "canonical"; document.head.appendChild(canon); }
    canon.href = "https://kiritourmadagascar.com/";
  }, []);

  return (
    <>
      <ProgressBar />
      <div className="min-h-screen" style={{ fontFamily: sans }}>
        <Hero />
        <AnimatedStats />
        <TourCategories />
        <About />
        <GoogleReviewsSection />
        <Wildlife />
        <BookingCalendar />
        <WhyUs />
        <HowItWorks />
        <HotelSection />
        <MapSection />
        <CTA />
      </div>
      <style>{`
        @keyframes hero-kb { from { transform: scale(1.06); } to { transform: scale(1); } }
        @keyframes capcut-char {
          0%   { opacity: 0; transform: translateY(110%) skewY(6deg); filter: blur(8px); }
          60%  { filter: blur(0); }
          100% { opacity: 1; transform: translateY(0) skewY(0deg); filter: blur(0); }
        }
        @keyframes capcut-scan {
          0%   { transform: translateX(-105%); opacity: 0; }
          8%   { opacity: 1; } 92% { opacity: 1; }
          100% { transform: translateX(105%); opacity: 0; }
        }
        @keyframes hero-fade-down { from { opacity:0; transform:translateY(-20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes hero-fade-up   { from { opacity:0; transform:translateY(24px);  } to { opacity:1; transform:translateY(0); } }
        @keyframes btn-shimmer    { 0% { transform:translateX(-220%); } 100% { transform:translateX(220%); } }
        @keyframes live-dot       { 0%,100% { opacity:1; transform:scale(1);   } 50% { opacity:.4; transform:scale(.65); } }
        @keyframes scroll-bar     { 0% { transform:translateY(-100%); } 100% { transform:translateY(290%); } }
        @keyframes scroll-chevron { 0%,100% { transform:translateY(0); opacity:.7; } 50% { transform:translateY(5px); opacity:1; } }
        /* Prevent horizontal overflow */
        html, body { overflow-x: hidden; }
        /* Touch targets */
        button { min-height: 44px; }
      `}</style>
    </>
  );
}