import React, { useState, useEffect, useRef } from "react";

/* ── Fonts ── */
if (typeof document !== "undefined" && !document.getElementById("kt-contact-f")) {
  const l = document.createElement("link");
  l.id = "kt-contact-f"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap";
  document.head.appendChild(l);
}

const serif = "'Cormorant Garamond', serif";
const sans  = "'Outfit', sans-serif";

const CONTACTS = [
  {
    id: "whatsapp",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.57 12.57 0 00-.287-.01c-.207 0-.543.077-.827.386-.284.309-1.085 1.06-1.085 2.586 0 1.526 1.11 3.001 1.265 3.209.154.207 2.184 3.332 5.293 4.672.74.32 1.317.51 1.767.652.742.237 1.417.204 1.95.124.595-.089 1.833-.75 2.091-1.474.258-.724.258-1.345.181-1.474-.077-.13-.284-.207-.594-.356z"/>
        <path d="M12.048 2.003C6.478 2.003 1.95 6.53 1.95 12.1c0 1.79.467 3.47 1.28 4.927L2 22l5.12-1.343a10.06 10.06 0 004.928 1.286h.004c5.568 0 10.096-4.528 10.096-10.098 0-2.698-1.05-5.235-2.957-7.143A10.065 10.065 0 0012.048 2zm0 18.44a8.386 8.386 0 01-4.274-1.17l-.307-.182-3.18.834.849-3.1-.2-.318a8.383 8.383 0 01-1.284-4.507c0-4.634 3.772-8.404 8.4-8.404 2.245 0 4.354.875 5.94 2.462a8.352 8.352 0 012.458 5.944c-.002 4.635-3.773 8.44-8.402 8.44z"/>
      </svg>
    ),
    label: "WhatsApp",
    sublabel: "Response within 2 hours",
    value: "+261 33 664 07 77",
    color: "#25d366",
    colorDim: "rgba(37,211,102,.12)",
    colorBorder: "rgba(37,211,102,.25)",
    action: () => window.open("https://wa.me/261336640777?text=Hello%20KiriTour!%20I%20would%20like%20more%20information%20about%20your%20tours.", "_blank"),
    badge: "Fastest",
  },
  {
    id: "email",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: "Email",
    sublabel: "Response within 24h",
    value: "infokiritourmadagascar@gmail.com",
    color: "#facc15",
    colorDim: "rgba(250,204,21,.1)",
    colorBorder: "rgba(250,204,21,.22)",
    action: () => window.open("https://mail.google.com/mail/?view=cm&to=infokiritourmadagascar@gmail.com&su=KiriTour%20Inquiry&body=Hello%20KiriTour!%0A%0AI%20would%20like%20more%20information%20about%20your%20tours.%0A%0AKind%20regards,", "_blank"),
    badge: "Details & quotes",
  },
  {
    id: "facebook",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0022 12.06C22 6.53 17.5 2.04 12 2.04Z"/>
      </svg>
    ),
    label: "Messenger",
    sublabel: "Live chat",
    value: "KiriTour Madagascar",
    color: "#0084ff",
    colorDim: "rgba(0,132,255,.1)",
    colorBorder: "rgba(0,132,255,.22)",
    action: () => window.open("https://m.me/kiritourmadagascar", "_blank"),
    badge: "Instant chat",
  },
];

const INFO = [
  { icon: "📍", label: "Location",   value: "Morondava, Madagascar"        },
  { icon: "🕐", label: "Availability",  value: "Mon–Sat · 8:00 AM – 6:00 PM"     },
  { icon: "🌍", label: "Languages",        value: "French · English · Malagasy"},
  { icon: "✈️", label: "Specialties",    value: "Tsingy · Kirindy · Baobabs"  },
];

function useReveal(threshold = 0.1) {
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
  const [ref, v] = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: v ? 1 : 0,
      transform: v ? "none" : "translateY(32px)",
      transition: `opacity .8s cubic-bezier(.16,1,.3,1) ${d}s, transform .8s cubic-bezier(.16,1,.3,1) ${d}s`,
    }}>{children}</div>
  );
}

/* ── Form state ── */
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [hover, setHover] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.message) return;
    const body = `Hello KiriTour!\n\nName: ${form.name}\nEmail: ${form.email}\nSubject: ${form.subject}\n\nMessage:\n${form.message}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=infokiritourmadagascar@gmail.com&su=${encodeURIComponent(form.subject || "KiriTour Inquiry")}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const inputStyle = {
    width: "100%", background: "rgba(255,255,255,.04)",
    border: "1.5px solid rgba(255,255,255,.1)", borderRadius: 14,
    padding: "13px 16px", color: "white", fontFamily: sans, fontSize: 14,
    outline: "none", transition: "border-color .2s",
    boxSizing: "border-box",
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label style={{ fontFamily: sans, fontSize: 11, color: "rgba(255,255,255,.4)", textTransform: "uppercase", letterSpacing: ".2em" }}>Your name *</label>
          <input
            style={inputStyle}
            placeholder="Jean Dupont"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            onFocus={e => e.target.style.borderColor = "rgba(250,204,21,.5)"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,.1)"}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label style={{ fontFamily: sans, fontSize: 11, color: "rgba(255,255,255,.4)", textTransform: "uppercase", letterSpacing: ".2em" }}>Email</label>
          <input
            style={inputStyle}
            placeholder="jean@email.com"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            onFocus={e => e.target.style.borderColor = "rgba(250,204,21,.5)"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,.1)"}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label style={{ fontFamily: sans, fontSize: 11, color: "rgba(255,255,255,.4)", textTransform: "uppercase", letterSpacing: ".2em" }}>Subject</label>
        <input
          style={inputStyle}
          placeholder="Quote request — 5-day Tsingy Tour"
          value={form.subject}
          onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
          onFocus={e => e.target.style.borderColor = "rgba(250,204,21,.5)"}
          onBlur={e => e.target.style.borderColor = "rgba(255,255,255,.1)"}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label style={{ fontFamily: sans, fontSize: 11, color: "rgba(255,255,255,.4)", textTransform: "uppercase", letterSpacing: ".2em" }}>Message *</label>
        <textarea
          style={{ ...inputStyle, minHeight: 130, resize: "vertical" }}
          placeholder="Hello, I would like to plan a trip à Madagascar pour 2 personnes en juillet..."
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          onFocus={e => e.target.style.borderColor = "rgba(250,204,21,.5)"}
          onBlur={e => e.target.style.borderColor = "rgba(255,255,255,.1)"}
        />
      </div>
      <button
        onClick={handleSubmit}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="flex items-center justify-center gap-2.5 rounded-2xl font-bold transition-all"
        style={{
          padding: "15px 28px",
          background: sent ? "linear-gradient(135deg,#22c55e,#16a34a)" : "linear-gradient(135deg,#facc15,#f59e0b)",
          color: "#0b1a0e", fontFamily: sans, fontSize: 15,
          boxShadow: hover ? "0 12px 40px rgba(250,204,21,.45)" : "0 6px 24px rgba(250,204,21,.25)",
          transform: hover ? "translateY(-2px)" : "none",
          width: "100%",
        }}>
        {sent ? (
          <><span>✓</span> Message sent!</>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0b1a0e" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            Send message
          </>
        )}
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN
══════════════════════════════════════════ */
export default function Contact() {
  const [in_, setIn] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setIn(true), 80);
  }, []);

  return (
    <div style={{ background: "#0b1a0e", minHeight: "100svh", fontFamily: sans }}>

      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden flex items-end"
        style={{ minHeight: "clamp(320px,45vh,480px)", background: "linear-gradient(160deg,#030f07 0%,#0d2e1a 50%,#0b1a0e 100%)" }}>
        {/* Animated orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute rounded-full"
            style={{ width: 500, height: 500, top: -150, right: -100, background: "radial-gradient(circle,rgba(250,204,21,.08) 0%,transparent 70%)", animation: "orbFloat 8s ease-in-out infinite" }} />
          <div className="absolute rounded-full"
            style={{ width: 350, height: 350, bottom: -100, left: -80, background: "radial-gradient(circle,rgba(37,211,102,.06) 0%,transparent 70%)", animation: "orbFloat 10s ease-in-out infinite reverse" }} />
        </div>
        {/* Noise */}
        <div className="absolute inset-0 opacity-[.06] pointer-events-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "160px" }} />

        {/* Grid lines decoration */}
        <div className="absolute inset-0 pointer-events-none opacity-[.04]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 pb-14 pt-24">
          <div style={{ opacity: in_ ? 1 : 0, transform: in_ ? "none" : "translateY(30px)", transition: "all .9s cubic-bezier(.16,1,.3,1) .1s" }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-12" style={{ background: "linear-gradient(90deg,#facc15,transparent)" }} />
              <span style={{ fontFamily: sans, fontSize: 10, color: "#facc15", textTransform: "uppercase", letterSpacing: ".45em", fontWeight: 700 }}>
                Get in touch
              </span>
            </div>
            <h1 style={{ fontFamily: serif, fontSize: "clamp(3rem,8vw,6rem)", color: "white", fontWeight: 700, lineHeight: .95, letterSpacing: "-.03em" }}>
              Let's talk about<br />
              <em style={{ color: "#facc15", fontStyle: "italic" }}>your journey</em>
            </h1>
            <p style={{ fontFamily: sans, fontSize: "clamp(.9rem,1.5vw,1.1rem)", color: "rgba(255,255,255,.4)", marginTop: 14, maxWidth: 480, lineHeight: 1.7 }}>
              Our team is ready to answer all your questions and help you plan the adventure of a lifetime in Madagascar.
            </p>
          </div>
        </div>

        {/* Bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg,transparent,rgba(250,204,21,.4),transparent)" }} />
      </section>

      {/* ══ BODY ══ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 flex flex-col gap-12">

        {/* ── 3 Contact cards ── */}
        <R d={0}>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-10" style={{ background: "#facc15" }} />
            <h2 style={{ fontFamily: serif, fontSize: "clamp(1.5rem,3vw,2.2rem)", color: "white", fontWeight: 700 }}>
              Choose your channel
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CONTACTS.map((c, i) => (
              <button
                key={c.id}
                onClick={c.action}
                onMouseEnter={() => setActiveCard(c.id)}
                onMouseLeave={() => setActiveCard(null)}
                className="relative flex flex-col items-start p-6 rounded-3xl text-left transition-all duration-300 overflow-hidden group"
                style={{
                  background: activeCard === c.id ? c.colorDim : "rgba(255,255,255,.03)",
                  border: `1.5px solid ${activeCard === c.id ? c.colorBorder : "rgba(255,255,255,.08)"}`,
                  transform: activeCard === c.id ? "translateY(-6px)" : "none",
                  boxShadow: activeCard === c.id ? `0 20px 50px ${c.colorDim}` : "none",
                }}>
                {/* Glow bg */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 30% 30%,${c.colorDim} 0%,transparent 65%)` }} />

                {/* Badge */}
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full"
                  style={{ background: c.colorDim, border: `1px solid ${c.colorBorder}` }}>
                  <span style={{ fontFamily: sans, fontSize: 9, color: c.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".2em" }}>
                    {c.badge}
                  </span>
                </div>

                {/* Icon */}
                <div className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300"
                  style={{ background: c.colorDim, border: `1.5px solid ${c.colorBorder}`, color: c.color,
                    transform: activeCard === c.id ? "scale(1.1) rotate(-3deg)" : "none" }}>
                  {c.icon}
                </div>

                <p className="relative z-10 font-bold text-xl text-white mb-1" style={{ fontFamily: serif, fontSize: "1.5rem" }}>{c.label}</p>
                <p className="relative z-10 text-xs mb-3" style={{ fontFamily: sans, color: "rgba(255,255,255,.4)" }}>{c.sublabel}</p>
                <p className="relative z-10 text-sm font-medium break-all" style={{ fontFamily: sans, color: c.color }}>{c.value}</p>

                {/* Arrow */}
                <div className="relative z-10 mt-5 flex items-center gap-2 transition-all duration-300"
                  style={{ color: activeCard === c.id ? c.color : "rgba(255,255,255,.25)", transform: activeCard === c.id ? "translateX(4px)" : "none" }}>
                  <span style={{ fontFamily: sans, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".2em" }}>
                    Contact
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </div>
              </button>
            ))}
          </div>
        </R>

        {/* ── Main grid: Form + Info ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Form */}
          <R d={0.05} className="lg:col-span-7">
            <div className="rounded-3xl p-6 sm:p-8 h-full"
              style={{ background: "rgba(255,255,255,.03)", border: "1.5px solid rgba(255,255,255,.07)" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8" style={{ background: "#facc15" }} />
                <h3 style={{ fontFamily: serif, fontSize: "1.6rem", color: "white", fontWeight: 700 }}>
                  Send a message
                </h3>
              </div>
              <ContactForm />
            </div>
          </R>

          {/* Info + Map */}
          <div className="lg:col-span-5 flex flex-col gap-4">

            {/* Info card */}
            <R d={0.1}>
              <div className="rounded-3xl p-6 sm:p-8"
                style={{ background: "rgba(255,255,255,.03)", border: "1.5px solid rgba(255,255,255,.07)" }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-8" style={{ background: "#facc15" }} />
                  <h3 style={{ fontFamily: serif, fontSize: "1.4rem", color: "white", fontWeight: 700 }}>
                    Information
                  </h3>
                </div>
                <div className="flex flex-col gap-4">
                  {INFO.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-2xl transition-all hover:bg-white/[.03]"
                      style={{ border: "1px solid rgba(255,255,255,.05)" }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(250,204,21,.1)", fontSize: 18 }}>
                        {item.icon}
                      </div>
                      <div>
                        <p style={{ fontFamily: sans, fontSize: 10, color: "rgba(255,255,255,.35)", textTransform: "uppercase", letterSpacing: ".25em", marginBottom: 3 }}>
                          {item.label}
                        </p>
                        <p style={{ fontFamily: sans, fontSize: 14, color: "rgba(255,255,255,.8)", fontWeight: 500 }}>
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </R>

            {/* Quick WhatsApp CTA */}
            <R d={0.15}>
              <button
                onClick={() => window.open("https://wa.me/261336640777?text=Hello%20KiriTour!%20I%20would%20like%20more%20information%20about%20your%20tours.", "_blank")}
                className="relative overflow-hidden rounded-3xl p-6 text-left w-full transition-all hover:-translate-y-1 hover:shadow-2xl group"
                style={{ background: "linear-gradient(135deg,rgba(37,211,102,.15),rgba(37,211,102,.05))", border: "1.5px solid rgba(37,211,102,.3)", boxShadow: "0 8px 30px rgba(37,211,102,.1)" }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "radial-gradient(circle at 80% 20%,rgba(37,211,102,.15) 0%,transparent 60%)" }} />
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(37,211,102,.2)", border: "1.5px solid rgba(37,211,102,.35)" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#25d366">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.57 12.57 0 00-.287-.01c-.207 0-.543.077-.827.386-.284.309-1.085 1.06-1.085 2.586 0 1.526 1.11 3.001 1.265 3.209.154.207 2.184 3.332 5.293 4.672.74.32 1.317.51 1.767.652.742.237 1.417.204 1.95.124.595-.089 1.833-.75 2.091-1.474.258-.724.258-1.345.181-1.474-.077-.13-.284-.207-.594-.356z"/><path d="M12.048 2.003C6.478 2.003 1.95 6.53 1.95 12.1c0 1.79.467 3.47 1.28 4.927L2 22l5.12-1.343a10.06 10.06 0 004.928 1.286h.004c5.568 0 10.096-4.528 10.096-10.098 0-2.698-1.05-5.235-2.957-7.143A10.065 10.065 0 0012.048 2zm0 18.44a8.386 8.386 0 01-4.274-1.17l-.307-.182-3.18.834.849-3.1-.2-.318a8.383 8.383 0 01-1.284-4.507c0-4.634 3.772-8.404 8.4-8.404 2.245 0 4.354.875 5.94 2.462a8.352 8.352 0 012.458 5.944c-.002 4.635-3.773 8.44-8.402 8.44z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p style={{ fontFamily: serif, fontSize: "1.1rem", color: "white", fontWeight: 700 }}>WhatsApp direct</p>
                    <p style={{ fontFamily: sans, fontSize: 12, color: "rgba(255,255,255,.45)", marginTop: 2 }}>+261 33 664 07 77 · Reply within 2h</p>
                  </div>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#25d366" strokeWidth="2" className="flex-shrink-0 transition-transform group-hover:translate-x-1">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </div>
              </button>
            </R>
          </div>
        </div>

        {/* ── FAQ rapide ── */}
        <R d={0.05}>
          <div className="rounded-3xl p-8 sm:p-10"
            style={{ background: "linear-gradient(135deg,rgba(250,204,21,.08),rgba(250,204,21,.02))", border: "1.5px solid rgba(250,204,21,.15)" }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8" style={{ background: "#facc15" }} />
              <h3 style={{ fontFamily: serif, fontSize: "clamp(1.3rem,2.5vw,1.8rem)", color: "white", fontWeight: 700 }}>
                Frequently asked questions
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { q: "How far in advance should I book?",     a: "Ideally 2–4 weeks before your arrival to guarantee availability and the best price." },
                { q: "What languages do you speak?",          a: "We speak French, English and Malagasy. Our team adapts to your language." },
                { q: "Do you offer custom itineraries?",      a: "Yes! Every itinerary is tailored to your dates, budget and interests." },
                { q: "Is payment secure?",                    a: "A deposit is possible by transfer, with the balance paid on arrival. Flexible and transparent." },
              ].map((faq, i) => (
                <div key={i} className="p-5 rounded-2xl"
                  style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)" }}>
                  <p style={{ fontFamily: serif, fontSize: "1rem", color: "#facc15", fontWeight: 700, marginBottom: 8 }}>
                    {faq.q}
                  </p>
                  <p style={{ fontFamily: sans, fontSize: 13, color: "rgba(255,255,255,.5)", lineHeight: 1.6 }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </R>
      </div>

      <style>{`
        @keyframes orbFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
      `}</style>
    </div>
  );
}