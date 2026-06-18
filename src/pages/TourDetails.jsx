import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { tours, UUID_TO_TOUR_ID, SLUG_TO_TOUR_ID, TOUR_SLUG_MAP } from "./Tours";

/* ── Google Fonts ─────────────────────────────────────────────── */
if (typeof document !== "undefined" && !document.getElementById("kt-td-f")) {
  const l = document.createElement("link"); l.id = "kt-td-f"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,300;1,600&family=Outfit:wght@300;400;500;600;700&display=swap";
  document.head.appendChild(l);
}

const serif = "'Cormorant Garamond', serif";
const sans  = "'Outfit', sans-serif";
const WA    = "261336640777";
const wa    = (msg) => window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank");

/* ── Intersection reveal ──────────────────────────────────────── */
function useReveal(threshold = 0.08) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return [ref, v];
}

function R({ children, d = 0, y = 40, x = 0, scale = false, className = "" }) {
  const [ref, v] = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: v ? 1 : 0,
      transform: v ? "none" : `translateY(${y}px) translateX(${x}px)${scale ? " scale(0.96)" : ""}`,
      transition: `opacity .8s cubic-bezier(.16,1,.3,1) ${d}s, transform .8s cubic-bezier(.16,1,.3,1) ${d}s`,
    }}>{children}</div>
  );
}

/* ── SVG icons ────────────────────────────────────────────────── */
function Icon({ id, size = 20, color = "currentColor" }) {
  const s = { width: size, height: size, display: "block", flexShrink: 0 };
  const p = { ...s, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" };
  const m = {
    back:    <svg {...p}><polyline points="15 18 9 12 15 6"/></svg>,
    star:    <svg {...s} viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill={color} stroke="none"/></svg>,
    clock:   <svg {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    check:   <svg {...p}><polyline points="20 6 9 17 4 12"/></svg>,
    close:   <svg {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    wa:      <svg {...s} viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a9.87 9.87 0 00-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill={color}/></svg>,
    share:   <svg {...p}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
    map:     <svg {...p}><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
    chevron: <svg {...p}><polyline points="9 18 15 12 9 6"/></svg>,
    pin:     <svg {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    users:   <svg {...p}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  };
  return m[id] || null;
}

/* ════════════════════════════════════════════════════════════════
   MAIN
════════════════════════════════════════════════════════════════ */
export default function TourDetails() {
  const { id: param } = useParams();
  const navigate      = useNavigate();
  const [img, setImg] = useState(0);
  const [day, setDay] = useState(null);
  const [ok,  setOk]  = useState(false);   // copied
  const [in_, setIn]  = useState(false);   // mounted

  useEffect(() => { window.scrollTo(0, 0); setTimeout(() => setIn(true), 80); }, []);

  /* Resolve tour by SLUG first, then UUID (backwards compat) */
  const tourId = SLUG_TO_TOUR_ID[param] || UUID_TO_TOUR_ID[param];
  const t = tours.find((x) => x.id === tourId);

  /* ── Redirect UUID → slug (clean URL in browser) ── */
  useEffect(() => {
    if (t && UUID_TO_TOUR_ID[param]) {
      const slug = TOUR_SLUG_MAP[t.id];
      if (slug && slug !== param) navigate(`/tours/${slug}`, { replace: true });
    }
  }, [t, param, navigate]);

  /* ── SEO — title, meta, canonical, Open Graph, JSON-LD ── */
  useEffect(() => {
    if (!t) return;
    const slug  = TOUR_SLUG_MAP[t.id];
    const url   = `https://kiritourmadagascar.com/tours/${slug}`;
    const rawPrice = t.pricing?.[0]?.price || t.pricing?.[0]?.range || "";
    const price = (rawPrice.match(/\d+/) || [""])[0];
    const img0  = t.images?.[0] || "";
    const title = `${t.title} — ${t.duration} Madagascar Tour | KiriTour`;
    const desc  = t.desc.slice(0, 155);

    document.title = title;

    const setMeta = (key, val, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute("content", val);
    };
    setMeta("description", desc);
    setMeta("og:title", title, "property");
    setMeta("og:description", desc, "property");
    setMeta("og:image", img0, "property");
    setMeta("og:url", url, "property");
    setMeta("og:type", "website", "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", desc);
    setMeta("twitter:image", img0);

    /* canonical */
    let canon = document.querySelector('link[rel="canonical"]');
    if (!canon) { canon = document.createElement("link"); canon.rel = "canonical"; document.head.appendChild(canon); }
    canon.href = url;

    /* JSON-LD TouristTrip */
    const ld = {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      "name": t.title,
      "description": t.desc,
      "image": t.images,
      "touristType": ["Adventure", "Wildlife", "Eco-tourism"],
      "url": url,
      "provider": {
        "@type": "TravelAgency",
        "name": "KiriTour Madagascar",
        "url": "https://kiritourmadagascar.com",
        "telephone": "+261336640777",
        "areaServed": "Madagascar",
        "address": { "@type": "PostalAddress", "addressLocality": "Morondava", "addressRegion": "Menabe", "addressCountry": "MG" }
      },
      "offers": {
        "@type": "Offer",
        "price": price,
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
        "url": url
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": String(t.rating || 5),
        "reviewCount": "8",
        "bestRating": "5",
        "worstRating": "1"
      }
    };
    let script = document.getElementById("kt-tour-ld");
    if (!script) { script = document.createElement("script"); script.id = "kt-tour-ld"; script.type = "application/ld+json"; document.head.appendChild(script); }
    script.textContent = JSON.stringify(ld);

    /* cleanup on unmount */
    return () => {
      document.title = "KiriTour Madagascar | Tours Baobabs, Tsingy & Wildlife — Morondava";
      const s = document.getElementById("kt-tour-ld");
      if (s) s.remove();
    };
  }, [t]);

  /* 404 */
  if (!t) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6"
      style={{ background: "linear-gradient(160deg,#030a04,#0d2b12)", fontFamily: sans }}>
      <p style={{ color: "rgba(255,255,255,.4)", fontFamily: sans }}>Tour not found.</p>
      <button onClick={() => navigate("/tours")}
        className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm hover:scale-105 transition-all"
        style={{ background: "linear-gradient(135deg,#facc15,#f59e0b)", color: "#14532d", fontFamily: sans }}>
        <Icon id="back" size={15} color="#14532d" /> All Tours
      </button>
    </div>
  );

  const price0 = t.pricing?.[0]?.price || t.pricing?.[0]?.range || "";

  const copy = () => {
    navigator.clipboard?.writeText(window.location.href);
    setOk(true); setTimeout(() => setOk(false), 2200);
  };

  const accent = t.tagColor || "#facc15";

  return (
    <div style={{ background: "#0b1a0e", minHeight: "100svh", fontFamily: sans }}>

      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden" style={{ height: "100svh", maxHeight: 800, minHeight: 520 }}>
        {t.images.map((src, i) => (
          <div key={i} className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: img === i ? 1 : 0, zIndex: 0 }}>
            <img src={src} alt={`${t.title} ${i + 1}`} onError={(e) => { e.target.src = "https://i.ibb.co/5xXLDSZQ/20250729-173834.jpg"; }}
              className="w-full h-full object-cover"
              style={{ animation: img === i ? "hero-kb 12s ease-out both" : "none" }} />
          </div>
        ))}

        <div className="absolute inset-0 z-[1]" style={{ background: "linear-gradient(to bottom,rgba(3,12,4,.6) 0%,rgba(3,12,4,.05) 35%,rgba(3,12,4,.05) 50%,rgba(3,12,4,.98) 100%)" }} />
        <div className="absolute inset-0 z-[1]" style={{ background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${accent}18 0%, transparent 70%)` }} />

        {/* TOP BAR */}
        <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 sm:px-7 py-5"
          style={{ opacity: in_ ? 1 : 0, transform: in_ ? "none" : "translateY(-16px)", transition: "opacity .6s ease .1s, transform .6s ease .1s" }}>
          <button onClick={() => navigate("/tours")}
            className="flex items-center gap-2 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95"
            style={{ padding: "10px 18px", background: "rgba(255,255,255,.1)", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,.18)", color: "white", fontFamily: sans }}>
            <Icon id="back" size={14} color="white" /> All Tours
          </button>
          <div className="flex items-center gap-2">
            {t.images.length > 1 && (
              <div className="flex items-center gap-1.5 rounded-full px-3 py-2"
                style={{ background: "rgba(0,0,0,.35)", backdropFilter: "blur(10px)" }}>
                {t.images.map((_, i) => (
                  <button key={i} onClick={() => setImg(i)} aria-label={`Image ${i + 1}`} className="rounded-full transition-all duration-400"
                    style={{ height: 7, width: img === i ? 22 : 7, background: img === i ? accent : "rgba(255,255,255,.35)" }} />
                ))}
              </div>
            )}
            <button onClick={copy}
              className="flex items-center gap-2 rounded-full text-xs font-medium transition-all hover:scale-105"
              style={{ padding: "10px 16px", background: ok ? accent : "rgba(255,255,255,.1)", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,.18)", color: ok ? "#14532d" : "white", fontFamily: sans }}>
              <Icon id="share" size={13} color={ok ? "#14532d" : "white"} />
              {ok ? "Copied!" : "Share"}
            </button>
          </div>
        </div>

        {/* HERO CONTENT */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-4 sm:px-8 pb-10 sm:pb-14">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-5"
              style={{ opacity: in_ ? 1 : 0, transform: in_ ? "none" : "translateY(20px)", transition: "opacity .7s ease .25s, transform .7s ease .25s" }}>
              <span className="flex items-center gap-1.5 rounded-full text-[11px] font-semibold px-3 py-1.5"
                style={{ background: accent, color: "#0b1a0e", fontFamily: sans }}>
                <Icon id="clock" size={10} color="#0b1a0e" /> {t.duration}
              </span>
              <span className="rounded-full text-[11px] font-semibold px-3 py-1.5 text-white"
                style={{ background: `${t.tagColor}cc`, fontFamily: sans }}>{t.tag}</span>
              <span className="flex items-center gap-1 rounded-full px-3 py-1.5"
                style={{ background: "rgba(255,255,255,.12)", backdropFilter: "blur(8px)" }}>
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} id="star" size={10} color={i < t.rating ? "#fbbf24" : "rgba(255,255,255,.2)"} />
                ))}
                <span className="text-white/50 text-[10px] ml-1" style={{ fontFamily: sans }}>{t.rating}.0</span>
              </span>
            </div>

            <h1 style={{
              fontFamily: serif, fontSize: "clamp(2.2rem, 6vw, 4.5rem)", fontWeight: 700,
              color: "white", lineHeight: 1.05, letterSpacing: "-.02em",
              textShadow: "0 4px 40px rgba(0,0,0,.5)",
              opacity: in_ ? 1 : 0, transform: in_ ? "none" : "translateY(28px)",
              transition: "opacity .8s cubic-bezier(.16,1,.3,1) .35s, transform .8s cubic-bezier(.16,1,.3,1) .35s",
            }}>
              {t.title}
            </h1>

            <p style={{
              fontFamily: serif, fontSize: "clamp(1rem, 2.5vw, 1.35rem)",
              color: "rgba(255,255,255,.5)", marginTop: 8, fontStyle: "italic",
              opacity: in_ ? 1 : 0, transform: in_ ? "none" : "translateY(16px)",
              transition: "opacity .7s ease .5s, transform .7s ease .5s",
            }}>
              {t.subtitle}
            </p>

            <div className="hidden sm:flex items-center gap-3 mt-8"
              style={{ opacity: in_ ? .5 : 0, transition: "opacity 1s ease 1.2s" }}>
              <div style={{ width: 1, height: 40, background: "rgba(255,255,255,.3)", borderRadius: 99, overflow: "hidden", position: "relative" }}>
                <div style={{ position: "absolute", width: "100%", height: "45%", background: accent, borderRadius: 99, animation: "scroll-cue 2s ease-in-out infinite" }} />
              </div>
              <span style={{ fontFamily: sans, fontSize: 10, letterSpacing: ".3em", textTransform: "uppercase", color: "rgba(255,255,255,.5)" }}>scroll to explore</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }} />
      </section>

      {/* ══ BODY ══ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 pb-32 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">

          {/* LEFT */}
          <div className="lg:col-span-8 flex flex-col gap-5">

            {/* About */}
            <R d={0}>
              <div className="rounded-3xl overflow-hidden" style={{ background: "#111f13", border: "1px solid rgba(255,255,255,.07)" }}>
                <div style={{ height: 3, background: `linear-gradient(90deg, ${accent}, ${t.tagColor || accent}80, transparent)` }} />
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${accent}18` }}>
                      <Icon id="map" size={18} color={accent} />
                    </div>
                    <h2 style={{ fontFamily: serif, fontSize: "clamp(1.4rem,3vw,2rem)", color: "white", fontWeight: 700 }}>About this tour</h2>
                  </div>
                  <p style={{ fontFamily: sans, fontSize: 15, color: "rgba(255,255,255,.55)", lineHeight: 1.75 }}>{t.desc}</p>

                  <div className="grid grid-cols-3 gap-3 mt-7 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,.07)" }}>
                    {[
                      { label: "Duration", val: t.duration, icon: "clock" },
                      { label: "Category", val: t.tag,      icon: "map"   },
                      { label: "Rating",   val: `${t.rating}.0 / 5`, icon: "star" },
                    ].map((s, i) => (
                      <div key={i} className="flex flex-col items-center text-center p-3 rounded-2xl gap-2"
                        style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.06)" }}>
                        <Icon id={s.icon} size={16} color={accent} />
                        <span style={{ fontFamily: serif, fontSize: "clamp(.85rem,2vw,1.05rem)", color: "white", fontWeight: 700, lineHeight: 1.1 }}>{s.val}</span>
                        <span style={{ fontFamily: sans, fontSize: 10, color: "rgba(255,255,255,.3)", textTransform: "uppercase", letterSpacing: ".1em" }}>{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </R>

            {/* MOBILE pricing */}
            <div className="lg:hidden">
              <R d={0.04}>
                <div className="rounded-3xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,.08)", boxShadow: "0 20px 60px rgba(0,0,0,.4)" }}>
                  <div className="px-6 py-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#0a2410,#135c2c)" }}>
                    <div className="absolute inset-0 opacity-[.07]" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, white 0%, transparent 55%)" }} />
                    <p style={{ fontFamily: sans, fontSize: 10, color: "rgba(255,255,255,.35)", textTransform: "uppercase", letterSpacing: ".35em", marginBottom: 6 }}>Starting from</p>
                    <p style={{ fontFamily: serif, fontSize: "2.6rem", color: accent, fontWeight: 700, lineHeight: 1 }}>{price0}</p>
                    <p style={{ fontFamily: sans, fontSize: 12, color: "rgba(255,255,255,.3)", marginTop: 6 }}>per person · varies by group</p>
                    <div className="flex items-center gap-1 mt-4">
                      {[...Array(5)].map((_, i) => <Icon key={i} id="star" size={12} color={i < t.rating ? "#fbbf24" : "rgba(255,255,255,.15)"} />)}
                      <span style={{ fontFamily: sans, fontSize: 11, color: "rgba(255,255,255,.35)", marginLeft: 6 }}>{t.rating}.0 / 5</span>
                    </div>
                  </div>
                  <div className="p-4" style={{ background: "#111f13" }}>
                    <p style={{ fontFamily: sans, fontSize: 10, color: "rgba(255,255,255,.3)", textTransform: "uppercase", letterSpacing: ".2em", marginBottom: 12 }}>All options</p>
                    <div className="flex flex-col gap-2">
                      {t.pricing.map((row, i) => {
                        const note = !row.price && !row.range;
                        return note ? (
                          <p key={i} style={{ fontFamily: sans, fontSize: 10, color: "rgba(255,255,255,.2)", textAlign: "center", paddingTop: 4 }}>{row.pkg}</p>
                        ) : (
                          <div key={i} className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl"
                            style={{ background: i === 0 ? "rgba(250,204,21,.08)" : "rgba(255,255,255,.04)", border: `1px solid ${i === 0 ? "rgba(250,204,21,.2)" : "rgba(255,255,255,.06)"}` }}>
                            <span style={{ fontFamily: sans, fontSize: 12, color: "rgba(255,255,255,.5)", flex: 1, lineHeight: 1.4 }}>{row.pax || row.pkg}</span>
                            <span style={{ fontFamily: serif, fontSize: "1rem", color: accent, fontWeight: 700, flexShrink: 0 }}>{row.price || row.range}</span>
                          </div>
                        );
                      })}
                    </div>
                    <button onClick={() => wa(`Hello KiriTour! I'd like to book: ${t.title} (${t.duration})`)}
                      className="w-full flex items-center justify-center gap-2.5 mt-4 rounded-2xl font-bold transition-all hover:scale-[1.02] active:scale-[.98]"
                      style={{ padding: "16px 24px", background: `linear-gradient(135deg,${accent},#f59e0b)`, color: "#0b1a0e", fontFamily: sans, fontSize: 15, boxShadow: `0 8px 28px ${accent}45` }}>
                      <Icon id="wa" size={18} color="#0b1a0e" /> Book via WhatsApp
                    </button>
                    <p style={{ fontFamily: sans, fontSize: 10, color: "rgba(255,255,255,.25)", textAlign: "center", marginTop: 10 }}>
                      Reply within 2h · Custom itineraries available
                    </p>
                  </div>
                </div>

                <button onClick={copy}
                  className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-[.98] mt-3"
                  style={{ background: ok ? "rgba(74,222,128,.1)" : "rgba(255,255,255,.05)", border: `1.5px solid ${ok ? "rgba(74,222,128,.3)" : "rgba(255,255,255,.08)"}` }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: ok ? "rgba(74,222,128,.15)" : "rgba(255,255,255,.06)" }}>
                    <Icon id="share" size={16} color={ok ? "#4ade80" : "rgba(255,255,255,.4)"} />
                  </div>
                  <div className="text-left">
                    <p style={{ fontFamily: sans, fontSize: 13, color: "white", fontWeight: 600 }}>{ok ? "Link copied!" : "Share this tour"}</p>
                    <p style={{ fontFamily: sans, fontSize: 10, color: "rgba(255,255,255,.3)" }}>Shareable link</p>
                  </div>
                </button>

                <div className="rounded-2xl p-4 mt-3" style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.06)" }}>
                  <p style={{ fontFamily: sans, fontSize: 10, color: "rgba(255,255,255,.3)", textTransform: "uppercase", letterSpacing: ".15em", marginBottom: 12 }}>Need help choosing?</p>
                  <button onClick={() => wa("Hello! I need help choosing the right tour.")}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all"
                    style={{ background: "rgba(74,222,128,.08)", border: "1.5px solid rgba(74,222,128,.2)", color: "#4ade80", fontFamily: sans, fontSize: 13 }}>
                    <Icon id="wa" size={15} color="#4ade80" /> Chat with our team
                  </button>
                </div>
              </R>
            </div>

            {/* Itinerary */}
            {t.itinerary?.length > 0 && (
              <R d={0.06}>
                <div className="rounded-3xl overflow-hidden" style={{ background: "#111f13", border: "1px solid rgba(255,255,255,.07)" }}>
                  <div className="px-6 sm:px-8 py-5 flex items-center gap-4"
                    style={{ background: "linear-gradient(135deg,rgba(250,204,21,.12),rgba(250,204,21,.04))", borderBottom: "1px solid rgba(250,204,21,.12)" }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(250,204,21,.15)" }}>
                      <Icon id="pin" size={18} color="#facc15" />
                    </div>
                    <div>
                      <h2 style={{ fontFamily: serif, fontSize: "clamp(1.3rem,2.5vw,1.8rem)", color: "white", fontWeight: 700 }}>Itinerary</h2>
                      <p style={{ fontFamily: sans, fontSize: 11, color: "rgba(255,255,255,.35)", marginTop: 2 }}>
                        {t.itinerary.length} days · tap to expand each day
                      </p>
                    </div>
                  </div>

                  {t.itinerary.map((d, i) => {
                    const open = day === i;
                    return (
                      <div key={i} style={{ borderBottom: i < t.itinerary.length - 1 ? "1px solid rgba(255,255,255,.05)" : "none" }}>
                        <button onClick={() => setDay(open ? null : i)}
                          className="w-full flex items-center gap-4 px-5 sm:px-8 py-4 text-left transition-all"
                          style={{ background: open ? "rgba(250,204,21,.05)" : "transparent" }}>
                          <div className="flex-shrink-0 flex flex-col items-center justify-center"
                            style={{
                              width: 52, height: 52, borderRadius: 16,
                              background: open ? `linear-gradient(135deg, ${accent}, ${accent}bb)` : "rgba(255,255,255,.06)",
                              boxShadow: open ? `0 6px 20px ${accent}40` : "none",
                              transition: "all .35s ease",
                            }}>
                            <span style={{ fontFamily: sans, fontSize: 9, textTransform: "uppercase", letterSpacing: ".1em", color: open ? "#0b1a0e" : "rgba(255,255,255,.4)", lineHeight: 1 }}>Day</span>
                            <span style={{ fontFamily: serif, fontSize: 22, fontWeight: 700, color: open ? "#0b1a0e" : "white", lineHeight: 1.1 }}>{d.day}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p style={{ fontFamily: serif, fontSize: "clamp(.95rem,2vw,1.15rem)", color: "white", fontWeight: 700, lineHeight: 1.2 }}>{d.loc}</p>
                            {!open && <p style={{ fontFamily: sans, fontSize: 12, color: "rgba(255,255,255,.35)", marginTop: 3 }} className="truncate">{d.act}</p>}
                          </div>
                          <div style={{ flexShrink: 0, transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform .35s ease" }}>
                            <Icon id="chevron" size={16} color={open ? accent : "rgba(255,255,255,.3)"} />
                          </div>
                        </button>
                        <div style={{ maxHeight: open ? 250 : 0, overflow: "hidden", transition: "max-height .45s cubic-bezier(.16,1,.3,1)" }}>
                          <div className="px-5 sm:px-8 pb-5" style={{ paddingLeft: "calc(1.25rem + 52px + 16px)" }}>
                            <div className="p-4 rounded-2xl" style={{ background: "rgba(255,255,255,.04)", borderLeft: `3px solid ${accent}` }}>
                              <p style={{ fontFamily: sans, fontSize: 13, color: "rgba(255,255,255,.6)", lineHeight: 1.7 }}>{d.act}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </R>
            )}

            {/* Inclusions + Exclusions */}
            {(t.inclusions || t.exclusions) && (
              <R d={0.1}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {t.inclusions && (
                    <div className="rounded-3xl p-5 sm:p-6" style={{ background: "linear-gradient(145deg,#0d2b14,#103520)", border: "1.5px solid rgba(74,222,128,.18)" }}>
                      <div className="flex items-center gap-2.5 mb-5">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(74,222,128,.15)" }}>
                          <Icon id="check" size={15} color="#4ade80" />
                        </div>
                        <h3 style={{ fontFamily: serif, fontSize: "1.15rem", color: "#86efac", fontWeight: 700 }}>Included</h3>
                      </div>
                      <ul className="flex flex-col gap-3">
                        {t.inclusions.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5" style={{ background: "rgba(74,222,128,.15)" }}>
                              <Icon id="check" size={10} color="#4ade80" />
                            </div>
                            <span style={{ fontFamily: sans, fontSize: 13, color: "rgba(134,239,172,.75)", lineHeight: 1.5 }}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {t.exclusions && (
                    <div className="rounded-3xl p-5 sm:p-6" style={{ background: "#111f13", border: "1.5px solid rgba(255,255,255,.07)" }}>
                      <div className="flex items-center gap-2.5 mb-5">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(248,113,113,.12)" }}>
                          <Icon id="close" size={15} color="#f87171" />
                        </div>
                        <h3 style={{ fontFamily: serif, fontSize: "1.15rem", color: "rgba(255,255,255,.7)", fontWeight: 700 }}>Not Included</h3>
                      </div>
                      <ul className="flex flex-col gap-3">
                        {t.exclusions.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5" style={{ background: "rgba(248,113,113,.1)" }}>
                              <Icon id="close" size={10} color="#f87171" />
                            </div>
                            <span style={{ fontFamily: sans, fontSize: 13, color: "rgba(255,255,255,.35)", lineHeight: 1.5 }}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </R>
            )}

            {/* How to book */}
            <R d={0.12}>
              <div className="rounded-3xl p-6 sm:p-8 relative overflow-hidden" style={{ background: "linear-gradient(145deg,#0f2b14,#0b3a1e)", border: "1px solid rgba(250,204,21,.12)" }}>
                <div className="absolute top-0 right-0 w-48 h-48 opacity-5 pointer-events-none" style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)`, transform: "translate(30%,-30%)" }} />
                <h3 style={{ fontFamily: serif, fontSize: "clamp(1.3rem,2.5vw,1.8rem)", color: "white", fontWeight: 700, marginBottom: 24 }}>How to book</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { n: "01", title: "Contact us",     body: "Send your dates & group size via WhatsApp. We reply within 2 hours.",   icon: "wa"    },
                    { n: "02", title: "Get your quote", body: "We craft a detailed itinerary with a transparent price breakdown.",       icon: "map"   },
                    { n: "03", title: "Travel & enjoy", body: "We handle everything — you arrive and explore Madagascar stress-free.",   icon: "users" },
                  ].map((s, i) => (
                    <div key={i} className="p-4 rounded-2xl relative" style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.07)" }}>
                      <span style={{ fontFamily: serif, fontSize: 42, fontWeight: 700, color: accent, opacity: .18, lineHeight: 1, display: "block", marginBottom: 8 }}>{s.n}</span>
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: `${accent}18` }}>
                        <Icon id={s.icon} size={16} color={accent} />
                      </div>
                      <p style={{ fontFamily: serif, fontSize: "1rem", color: "white", fontWeight: 700, marginBottom: 6 }}>{s.title}</p>
                      <p style={{ fontFamily: sans, fontSize: 12, color: "rgba(255,255,255,.4)", lineHeight: 1.6 }}>{s.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </R>
          </div>

          {/* RIGHT sidebar */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-6 flex flex-col gap-4">
              <R d={0.15}>
                <div className="rounded-3xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,.08)", boxShadow: "0 20px 60px rgba(0,0,0,.4)" }}>
                  <div className="px-6 py-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#0a2410,#135c2c)" }}>
                    <div className="absolute inset-0 opacity-[.07]" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, white 0%, transparent 55%)" }} />
                    <p style={{ fontFamily: sans, fontSize: 10, color: "rgba(255,255,255,.35)", textTransform: "uppercase", letterSpacing: ".35em", marginBottom: 6 }}>Starting from</p>
                    <p style={{ fontFamily: serif, fontSize: "2.6rem", color: accent, fontWeight: 700, lineHeight: 1 }}>{price0}</p>
                    <p style={{ fontFamily: sans, fontSize: 11, color: "rgba(255,255,255,.3)", marginTop: 6 }}>per person · varies by group</p>
                    <div className="flex items-center gap-1 mt-4">
                      {[...Array(5)].map((_, i) => <Icon key={i} id="star" size={12} color={i < t.rating ? "#fbbf24" : "rgba(255,255,255,.15)"} />)}
                      <span style={{ fontFamily: sans, fontSize: 11, color: "rgba(255,255,255,.35)", marginLeft: 6 }}>{t.rating}.0 / 5</span>
                    </div>
                  </div>
                  <div className="p-4" style={{ background: "#111f13" }}>
                    <p style={{ fontFamily: sans, fontSize: 10, color: "rgba(255,255,255,.3)", textTransform: "uppercase", letterSpacing: ".2em", marginBottom: 12 }}>All options</p>
                    <div className="flex flex-col gap-2">
                      {t.pricing.map((row, i) => {
                        const note = !row.price && !row.range;
                        return note ? (
                          <p key={i} style={{ fontFamily: sans, fontSize: 10, color: "rgba(255,255,255,.2)", textAlign: "center", paddingTop: 4 }}>{row.pkg}</p>
                        ) : (
                          <div key={i} className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl"
                            style={{ background: i === 0 ? "rgba(250,204,21,.08)" : "rgba(255,255,255,.04)", border: `1px solid ${i === 0 ? "rgba(250,204,21,.2)" : "rgba(255,255,255,.06)"}` }}>
                            <span style={{ fontFamily: sans, fontSize: 12, color: "rgba(255,255,255,.5)", flex: 1, lineHeight: 1.4 }}>{row.pax || row.pkg}</span>
                            <span style={{ fontFamily: serif, fontSize: "1rem", color: accent, fontWeight: 700, flexShrink: 0 }}>{row.price || row.range}</span>
                          </div>
                        );
                      })}
                    </div>
                    <button onClick={() => wa(`Hello KiriTour! I'd like to book: ${t.title} (${t.duration})`)}
                      className="w-full flex items-center justify-center gap-2.5 mt-4 rounded-2xl font-bold transition-all hover:scale-[1.02] hover:shadow-2xl active:scale-[.98]"
                      style={{ padding: "16px 24px", background: `linear-gradient(135deg,${accent},#f59e0b)`, color: "#0b1a0e", fontFamily: sans, fontSize: 15, boxShadow: `0 8px 28px ${accent}45` }}>
                      <Icon id="wa" size={18} color="#0b1a0e" /> Book via WhatsApp
                    </button>
                    <p style={{ fontFamily: sans, fontSize: 10, color: "rgba(255,255,255,.25)", textAlign: "center", marginTop: 10 }}>
                      Reply within 2h · Custom itineraries available
                    </p>
                  </div>
                </div>
              </R>

              <R d={0.18}>
                <button onClick={copy}
                  className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-[.98]"
                  style={{ background: ok ? "rgba(74,222,128,.1)" : "rgba(255,255,255,.05)", border: `1.5px solid ${ok ? "rgba(74,222,128,.3)" : "rgba(255,255,255,.08)"}` }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: ok ? "rgba(74,222,128,.15)" : "rgba(255,255,255,.06)" }}>
                    <Icon id="share" size={16} color={ok ? "#4ade80" : "rgba(255,255,255,.4)"} />
                  </div>
                  <div className="text-left">
                    <p style={{ fontFamily: sans, fontSize: 13, color: "white", fontWeight: 600 }}>{ok ? "Link copied!" : "Share this tour"}</p>
                    <p style={{ fontFamily: sans, fontSize: 10, color: "rgba(255,255,255,.3)" }}>Shareable link</p>
                  </div>
                </button>
              </R>

              <R d={0.2}>
                <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.06)" }}>
                  <p style={{ fontFamily: sans, fontSize: 10, color: "rgba(255,255,255,.3)", textTransform: "uppercase", letterSpacing: ".15em", marginBottom: 12 }}>Need help choosing?</p>
                  <button onClick={() => wa("Hello! I need help choosing the right tour.")}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all"
                    style={{ background: "rgba(74,222,128,.08)", border: "1.5px solid rgba(74,222,128,.2)", color: "#4ade80", fontFamily: sans, fontSize: 13 }}>
                    <Icon id="wa" size={15} color="#4ade80" /> Chat with our team
                  </button>
                </div>
              </R>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
        style={{ background: "rgba(11,26,14,.97)", backdropFilter: "blur(20px)", borderTop: `1px solid ${accent}25`, paddingBottom: "env(safe-area-inset-bottom)" }}>
        <div className="px-4 pt-2.5 pb-2 max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p style={{ fontFamily: sans, fontSize: 9, color: "rgba(255,255,255,.3)", textTransform: "uppercase", letterSpacing: ".25em" }}>From</p>
              <p style={{ fontFamily: serif, fontSize: "clamp(.95rem, 3.5vw, 1.35rem)", color: accent, fontWeight: 700, lineHeight: 1.1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{price0}</p>
            </div>
            <button onClick={() => wa(`Hello KiriTour! I'd like to book: ${t.title} (${t.duration})`)}
              className="flex items-center gap-2 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 flex-shrink-0"
              style={{ padding: "12px 18px", background: `linear-gradient(135deg,${accent},#f59e0b)`, color: "#0b1a0e", fontFamily: sans, fontSize: 13, boxShadow: `0 4px 20px ${accent}45` }}>
              <Icon id="wa" size={15} color="#0b1a0e" /> Book Now
            </button>
          </div>
          <p style={{ fontFamily: sans, fontSize: 9, color: "rgba(255,255,255,.2)", marginTop: 4, textAlign: "center", letterSpacing: ".02em" }}>
            Price varies depending on group size.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes hero-kb { from { transform: scale(1.08); } to { transform: scale(1); } }
        @keyframes scroll-cue { 0%,100% { transform: translateY(-100%); } 50% { transform: translateY(200%); } }
      `}</style>
    </div>
  );
}