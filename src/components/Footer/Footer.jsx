import React, { useState, useEffect, useRef } from "react";

/* ─── Fonts ───────────────────────────────────────────────────── */
if (typeof document !== "undefined" && !document.getElementById("kt-fonts")) {
  const l = document.createElement("link");
  l.id = "kt-fonts"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap";
  document.head.appendChild(l);
}

const serif = "'Playfair Display', serif";
const sans  = "'DM Sans', sans-serif";
const WA    = "261336640777";
const waOpen = (msg) => window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg || "Hello KiriTour!")}`, "_blank");

const goTo = (page) => {
  window.location.hash = page;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

/* ─── Data ───────────────────────────────────────────────────── */
const quickLinks = [
  { name:"Home",         page:"/home",    Icon: () => <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg> },
  { name:"Our Tours",    page:"/tours",   Icon: () => <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg> },
  { name:"Gallery",      page:"/gallery", Icon: () => <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/></svg> },
  { name:"About Us",     page:"/home",    Icon: () => <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/></svg> },
  { name:"Contact",      page:"/home",    Icon: () => <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg> },
];

const popularTours = [
  { name:"Tsingy de Bemaraha",     sub:"4 Days — UNESCO",     page:"/tours" },
  { name:"Avenue of the Baobabs",  sub:"1 Day — Iconic",      page:"/tours" },
  { name:"Kirindy Forest",         sub:"1–2 Days — Wildlife",  page:"/tours" },
  { name:"Tsiribihina River",      sub:"3–8 Days — Adventure", page:"/tours" },
  { name:"Andasibe Rainforest",    sub:"3–5 Days — Lemurs",    page:"/tours" },
  { name:"Western Day Tours",      sub:"1 Day — Culture",      page:"/tours" },
];

const destinations = [
  { name:"Morondava",       desc:"Gateway to the Menabe" },
  { name:"Bekopaka",        desc:"Door to Tsingy" },
  { name:"Kirindy Reserve", desc:"Fossa territory" },
  { name:"Andasibe",        desc:"Indri lemur capital" },
  { name:"Antsirabe",       desc:"Highland city" },
];

/* ─── SVG Social Icons ───────────────────────────────────────── */
const FBIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const YTIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#052e16"/>
  </svg>
);
const WAIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

/* ─── Newsletter ─────────────────────────────────────────────── */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent,  setSent]  = useState(false);
  const [err,   setErr]   = useState("");

  const submit = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) { setErr("Please enter a valid email."); return; }
    setSent(true); setErr("");
  };

  if (sent) return (
    <div className="flex items-center gap-3 py-3 px-4 rounded-2xl border border-emerald-400/30"
      style={{ background:"rgba(52,211,153,0.08)" }}>
      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-emerald-400">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
        </svg>
      </div>
      <p className="text-emerald-300 text-sm" style={{ fontFamily:sans }}>Subscribed! Best offers coming soon.</p>
    </div>
  );

  return (
    <div>
      <div className="flex gap-2">
        <input type="email" value={email}
          onChange={(e) => { setEmail(e.target.value); setErr(""); }}
          placeholder="your@email.com"
          className="flex-1 px-4 py-2.5 rounded-xl text-sm text-gray-800 placeholder-gray-400 outline-none transition-all"
          style={{ fontFamily:sans, background:"rgba(255,255,255,0.92)", border:"2px solid transparent" }}
          onFocus={e => e.target.style.borderColor = "rgba(250,204,21,0.5)"}
          onBlur={e => e.target.style.borderColor = "transparent"}
        />
        <button onClick={submit}
          className="px-4 py-2.5 rounded-xl font-bold text-green-900 text-sm hover:scale-105 active:scale-95 transition-all flex-shrink-0 shadow-lg"
          style={{ background:"linear-gradient(135deg,#facc15,#f59e0b)", fontFamily:sans }}>
          Join
        </button>
      </div>
      {err && <p className="text-red-400 text-xs mt-2 flex items-center gap-1" style={{ fontFamily:sans }}>
        <span>⚠</span> {err}
      </p>}
    </div>
  );
}

/* ─── useInView ──────────────────────────────────────────────── */
function useInView() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold:0.05 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, vis];
}

/* ════════════════════════════════════════════════════════════════
   WHATSAPP FLOAT
═══════════════════════════════════════════════════════════════ */
export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse] = useState(true);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive:true });
    const t = setTimeout(() => setPulse(false), 7000);
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(t); };
  }, []);

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 transition-all duration-500 ${visible?"opacity-100 translate-y-0":"opacity-0 translate-y-6 pointer-events-none"}`}>
      {pulse && (
        <div className="relative inline-block px-4 py-2 rounded-2xl rounded-br-none text-xs font-bold text-green-900 shadow-xl"
          style={{ background:"#facc15", fontFamily:sans, animation:"fadeSlideIn 0.6s ease 1s both" }}>
          💬 Chat with us!
          <div className="absolute -bottom-2 right-3 w-0 h-0"
            style={{ borderLeft:"8px solid transparent", borderTop:"8px solid #facc15" }} />
        </div>
      )}
      <button onClick={() => waOpen("Hello KiriTour! I'd like to know more about your tours.")}
        className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300"
        style={{ background:"linear-gradient(135deg,#25D366,#128C7E)" }}
        aria-label="WhatsApp">
        {pulse && <>
          <span className="absolute inset-0 rounded-full" style={{ background:"rgba(37,211,102,0.4)", animation:"ripple 2s ease-out infinite" }} />
          <span className="absolute inset-0 rounded-full" style={{ background:"rgba(37,211,102,0.2)", animation:"ripple 2s ease-out 0.6s infinite" }} />
        </>}
        <WAIcon />
      </button>
    </div>
  );
}

export function EmailFloat() {
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse] = useState(true);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive:true });
    const t = setTimeout(() => setPulse(false), 7000);
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(t); };
  }, []);
  const openEmail = () => window.open("mailto:infokiritourmadagascar@gmail.com?subject=Tour Inquiry&body=Hello KiriTour!", "_blank");

  return (
    <div className={`fixed bottom-[6.5rem] right-6 z-50 flex flex-col items-end gap-3 transition-all duration-500 ${visible?"opacity-100 translate-y-0":"opacity-0 translate-y-6 pointer-events-none"}`}>
      {pulse && (
        <div className="relative inline-block px-4 py-2 rounded-2xl rounded-br-none text-xs font-bold text-blue-900 shadow-xl"
          style={{ background:"#bfdbfe", fontFamily:sans, animation:"fadeSlideIn 0.6s ease 1.3s both" }}>
          ✉️ Email us!
          <div className="absolute -bottom-2 right-3 w-0 h-0"
            style={{ borderLeft:"8px solid transparent", borderTop:"8px solid #bfdbfe" }} />
        </div>
      )}
      <button onClick={openEmail}
        className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300"
        style={{ background:"linear-gradient(135deg,#60A5FA,#1D4ED8)" }}
        aria-label="Email">
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="white" strokeWidth="2">
          <rect x="3" y="5" width="18" height="14" rx="2"/>
          <path d="M5 7l7 6 7-6"/>
        </svg>
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   MAIN FOOTER
═══════════════════════════════════════════════════════════════ */
const Footer = () => {
  const [footerRef, footerVis] = useInView();
  const year = new Date().getFullYear();

  return (
    <>
      <footer ref={footerRef} className="relative overflow-hidden"
        style={{ background:"linear-gradient(160deg,#020d06 0%,#071a0e 35%,#0a2415 65%,#020d06 100%)", fontFamily:sans }}>

        {/* ── Decorative layers ── */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{ backgroundImage:"url(https://i.ibb.co/5xXLDSZQ/20250729-173834.jpg)", backgroundSize:"cover", backgroundPosition:"center" }} />
        {/* Noise */}
        <div className="absolute inset-0 pointer-events-none opacity-20"
          style={{ backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")", backgroundSize:"180px" }} />
        {/* Ambient glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-[0.07]"
          style={{ background:"#facc15" }} />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-[0.07]"
          style={{ background:"#34d399" }} />
        {/* Decorative rings */}
        {[900, 650, 420].map((s,i) => (
          <div key={i} className="absolute pointer-events-none rounded-full"
            style={{ width:s, height:s, bottom:`-${s*0.55}px`, right:`-${s*0.3}px`,
              border:`1px solid rgba(255,255,255,${i===2?0.04:0.02})` }} />
        ))}
        {/* Top border accent */}
        <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background:"linear-gradient(90deg,transparent 0%,rgba(250,204,21,0.5) 30%,rgba(52,211,153,0.4) 70%,transparent 100%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10">

          {/* ══════ TOP CTA BANNER ══════ */}
          <div className={`relative my-0 rounded-none overflow-hidden transition-all duration-700 ${footerVis?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
            <div className="border-b border-white/8 py-12 grid md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-0.5 rounded-full" style={{ background:"linear-gradient(90deg,#facc15,#f59e0b)" }} />
                  <p className="text-yellow-400 text-xs font-bold tracking-[0.3em] uppercase" style={{ fontFamily:sans }}>
                    Prêt pour l'aventure ?
                  </p>
                </div>
                <h2 className="text-white font-black leading-none"
                  style={{ fontFamily:serif, fontSize:"clamp(1.6rem,3.5vw,2.8rem)", letterSpacing:"-0.02em" }}>
                  Votre Madagascar<br /><em style={{ color:"#facc15" }}>commence ici.</em>
                </h2>
                <p className="text-green-300/70 text-sm mt-3 max-w-md" style={{ fontFamily:sans }}>
                  Réponse personnalisée en moins de 2h. Pas de frais cachés. Pas de robots.
                </p>
              </div>
              <div className="md:col-span-2 flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 md:items-end">
                <button onClick={() => waOpen("Hello KiriTour! I'd like to book a tour.")}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-black text-green-900 text-sm hover:scale-105 active:scale-95 transition-all shadow-xl"
                  style={{ background:"linear-gradient(135deg,#facc15,#f59e0b)", fontFamily:sans, boxShadow:"0 8px 30px rgba(250,204,21,0.25)" }}>
                  <WAIcon />
                  Réserver via WhatsApp
                </button>
                <button onClick={() => goTo("/tours")}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-semibold text-white border border-white/15 hover:bg-white/8 transition-all text-sm"
                  style={{ fontFamily:sans, backdropFilter:"blur(12px)" }}>
                  Voir tous les tours →
                </button>
              </div>
            </div>
          </div>

          {/* ══════ MAIN GRID ══════ */}
          <div className={`py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 transition-all duration-700 delay-100 ${footerVis?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}>

            {/* ── Col 1: Brand (span 3) ── */}
            <div className="lg:col-span-3">
              {/* Logo */}
              <div className="flex items-center gap-3 mb-6">
                <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl"
                  style={{ background:"linear-gradient(135deg,#14532d,#166534)", border:"1.5px solid rgba(250,204,21,0.3)" }}>
                  <span className="text-yellow-400 font-black text-2xl" style={{ fontFamily:serif }}>K</span>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#020d06]"
                    style={{ background:"linear-gradient(135deg,#facc15,#f59e0b)" }} />
                </div>
                <div>
                  <p className="text-white font-black text-2xl leading-none" style={{ fontFamily:serif }}>KiriTour</p>
                  <p className="text-yellow-400/70 text-xs font-semibold tracking-widest uppercase mt-0.5" style={{ fontFamily:sans }}>Menabe · Madagascar</p>
                </div>
              </div>

              <p className="text-green-300/70 text-sm leading-relaxed mb-6" style={{ fontFamily:sans }}>
                Depuis Morondava, nous créons des aventures inoubliables dans la région Menabe — Tsingy, Kirindy, Tsiribihina, Baobabs et bien plus.
              </p>

              {/* Contact details */}
              <div className="space-y-3 mb-6">
                {[
                  { svg: <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-yellow-400"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>, t:"Morondava, 619 — Madagascar" },
                  { svg: <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-yellow-400"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>, t:"+261 33 664 07 77", href:"tel:+261336640777" },
                  { svg: <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-yellow-400"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>, t:"infokiritourmadagascar@gmail.com", href:"mailto:infokiritourmadagascar@gmail.com" },
                ].map((c, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background:"rgba(250,204,21,0.1)", border:"1px solid rgba(250,204,21,0.15)" }}>
                      {c.svg}
                    </div>
                    {c.href
                      ? <a href={c.href} className="text-green-200/80 text-xs hover:text-yellow-400 transition-colors leading-relaxed break-all self-center" style={{ fontFamily:sans }}>{c.t}</a>
                      : <p className="text-green-200/80 text-xs leading-relaxed self-center" style={{ fontFamily:sans }}>{c.t}</p>
                    }
                  </div>
                ))}
              </div>

              {/* Social */}
              <div className="flex gap-2">
                {[
                  { Icon: FBIcon, href:"https://facebook.com", bg:"#1877F2", label:"Facebook" },
                  { Icon: YTIcon, href:"https://youtube.com",  bg:"#FF0000", label:"YouTube" },
                  { Icon: WAIcon, href:`https://wa.me/${WA}`,  bg:"#25D366", label:"WhatsApp" },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="group w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 shadow-lg"
                    style={{ background:s.bg }} title={s.label} aria-label={s.label}>
                    <s.Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* ── Col 2: Quick Links (span 2) ── */}
            <div className="lg:col-span-2">
              <h3 className="text-white font-black text-sm mb-6 flex items-center gap-2" style={{ fontFamily:serif }}>
                <span className="w-5 h-0.5 rounded-full inline-block" style={{ background:"linear-gradient(90deg,#facc15,transparent)" }} />
                Navigation
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((l, i) => (
                  <li key={i}>
                    <button onClick={() => goTo(l.page)}
                      className="group flex items-center gap-2.5 text-green-300/70 hover:text-yellow-400 transition-all duration-200 text-sm w-full text-left"
                      style={{ fontFamily:sans }}>
                      <span className="text-yellow-400/50 group-hover:text-yellow-400 transition-colors"><l.Icon /></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-200">{l.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Col 3: Popular Tours (span 3) ── */}
            <div className="lg:col-span-3">
              <h3 className="text-white font-black text-sm mb-6 flex items-center gap-2" style={{ fontFamily:serif }}>
                <span className="w-5 h-0.5 rounded-full inline-block" style={{ background:"linear-gradient(90deg,#facc15,transparent)" }} />
                Tours Populaires
              </h3>
              <ul className="space-y-3">
                {popularTours.map((t, i) => (
                  <li key={i}>
                    <button onClick={() => goTo(t.page)}
                      className="group flex items-start gap-3 w-full text-left hover:bg-white/4 rounded-xl px-3 py-2 -mx-3 transition-all duration-200"
                      style={{ fontFamily:sans }}>
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 transition-colors"
                        style={{ background:"rgba(250,204,21,0.5)" }} />
                      <div>
                        <p className="text-green-200/80 text-sm group-hover:text-yellow-400 transition-colors group-hover:translate-x-0.5 duration-200">{t.name}</p>
                        <p className="text-green-400/40 text-[11px] mt-0.5" style={{ fontFamily:sans }}>{t.sub}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Col 4: Newsletter + Hours + Destinations (span 4) ── */}
            <div className="lg:col-span-4 space-y-7">

              {/* Newsletter */}
              <div>
                <h3 className="text-white font-black text-sm mb-2 flex items-center gap-2" style={{ fontFamily:serif }}>
                  <span className="w-5 h-0.5 rounded-full inline-block" style={{ background:"linear-gradient(90deg,#facc15,transparent)" }} />
                  Newsletter
                </h3>
                <p className="text-green-300/60 text-xs mb-3 leading-relaxed" style={{ fontFamily:sans }}>
                  Offres exclusives et conseils de voyage directement dans votre boîte mail.
                </p>
                <Newsletter />
              </div>

              {/* Office Hours */}
              <div className="rounded-2xl p-4 border border-white/8"
                style={{ background:"rgba(255,255,255,0.04)", backdropFilter:"blur(16px)" }}>
                <p className="text-yellow-400 text-xs font-bold tracking-widest uppercase mb-4 flex items-center gap-2" style={{ fontFamily:sans }}>
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                  </svg>
                  Horaires d'ouverture
                </p>
                <div className="space-y-2">
                  {[
                    { d:"Lun – Ven", h:"8h00 – 18h00",  dot:"bg-emerald-400" },
                    { d:"Samedi",    h:"9h00 – 16h00",   dot:"bg-yellow-400" },
                    { d:"Dimanche",  h:"WhatsApp 📲",    dot:"bg-orange-400" },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${r.dot}`} />
                        <span className="text-green-300/70 text-xs" style={{ fontFamily:sans }}>{r.d}</span>
                      </div>
                      <span className="text-white text-xs font-semibold" style={{ fontFamily:sans }}>{r.h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Destinations */}
              <div>
                <p className="text-yellow-400/70 text-[10px] font-bold tracking-widest uppercase mb-3" style={{ fontFamily:sans }}>
                  Destinations couvertes
                </p>
                <div className="flex flex-wrap gap-2">
                  {destinations.map((d, i) => (
                    <button key={i} onClick={() => goTo("/tours")}
                      className="group px-3 py-1.5 rounded-full text-xs text-green-300/70 border border-white/10 hover:border-yellow-400/40 hover:text-yellow-400 transition-all duration-200"
                      style={{ fontFamily:sans, background:"rgba(255,255,255,0.03)" }}
                      title={d.desc}>
                      {d.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ══════ TRUST BADGES ══════ */}
          <div className={`border-t border-white/8 py-8 transition-all duration-700 delay-200 ${footerVis?"opacity-100":"opacity-0"}`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { Icon: () => <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-yellow-400"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>, v:"4.7 / 5",    l:"Note Moyenne", accent:"#facc15" },
                { Icon: () => <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-emerald-400"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/></svg>, v:"260+",       l:"Voyageurs Heureux", accent:"#34d399" },
                { Icon: () => <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-violet-400"><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/></svg>, v:"3 ans",      l:"D'Expérience",  accent:"#a78bfa" },
                { Icon: () => <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-teal-400"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>, v:"Éco-Certifié", l:"Partenaire Responsable", accent:"#2dd4bf" },
              ].map((b, i) => (
                <div key={i} className="group flex items-center gap-3 rounded-2xl px-4 py-3.5 border border-white/8 hover:border-white/15 transition-all duration-300"
                  style={{ background:"rgba(255,255,255,0.03)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background:`${b.accent}15`, border:`1px solid ${b.accent}25` }}>
                    <b.Icon />
                  </div>
                  <div>
                    <p className="text-white font-black text-sm leading-none mb-0.5" style={{ fontFamily:serif, color:b.accent }}>{b.v}</p>
                    <p className="text-green-300/60 text-[11px]" style={{ fontFamily:sans }}>{b.l}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ══════ BOTTOM BAR ══════ */}
          <div className={`border-t border-white/8 py-6 flex flex-col md:flex-row justify-between items-center gap-4 transition-all duration-700 delay-300 ${footerVis?"opacity-100":"opacity-0"}`}>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center"
                style={{ background:"rgba(250,204,21,0.15)", border:"1px solid rgba(250,204,21,0.2)" }}>
                <span className="text-yellow-400 font-black text-xs" style={{ fontFamily:serif }}>K</span>
              </div>
              <p className="text-green-400/50 text-xs" style={{ fontFamily:sans }}>
                © {year} KiriTour Menabe Madagascar · Tous droits réservés.
              </p>
            </div>

            <div className="flex flex-wrap gap-1 items-center justify-center">
              {["Politique de confidentialité", "Conditions d'utilisation", "Sitemap"].map((item, i, arr) => (
                <React.Fragment key={i}>
                  <button onClick={() => goTo("/home")}
                    className="text-green-400/40 hover:text-yellow-400/70 text-xs transition-colors"
                    style={{ fontFamily:sans }}>
                    {item}
                  </button>
                  {i < arr.length - 1 && <span className="text-green-600/30 text-xs mx-1">·</span>}
                </React.Fragment>
              ))}
            </div>

            <p className="text-green-400/30 text-[10px] flex items-center gap-1.5" style={{ fontFamily:sans }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" style={{ animation:"pulse 2s infinite" }} />
              Made with 🌿 in Morondava
            </p>
          </div>

        </div>
      </footer>

      {/* Float buttons */}
      <WhatsAppFloat />
      <EmailFloat />

      <style>{`
        @keyframes fadeSlideIn { from{opacity:0;transform:translateX(10px)} to{opacity:1;transform:translateX(0)} }
        @keyframes ripple { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(2.4);opacity:0} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </>
  );
};

export default Footer;