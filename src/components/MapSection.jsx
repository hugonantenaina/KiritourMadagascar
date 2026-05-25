import React, { useState, useEffect, useRef } from "react";

const serif = "'Playfair Display', serif";
const sans  = "'DM Sans', sans-serif";

/* ══ REAL COORDINATES ═══════════════════════════════════════════ */
const BUREAU_LAT = -20.29273342133999;
const BUREAU_LNG =  44.29783663558186;

/* ══ DATA ════════════════════════════════════════════════════════ */
const LOCATIONS = [
  {
    id: 1, name: "KiriTour Bureau", type: "office",
    tagline: "Your starting point",
    desc: "Morondava, 619 — Main office",
    icon: "HQ",
    accentColor: "#facc15", glowColor: "rgba(250,204,21,0.35)",
    coords: { lat: BUREAU_LAT, lng: BUREAU_LNG }, zoom: 16,
    image: "https://res.cloudinary.com/dloqrnvp8/image/upload/q_auto/f_auto/v1779707725/pexels-pixabay-277667_f6qsdq.jpg",
    info: "Custom planning, equipment rental, expert briefing before every departure.",
    drive: null, distance: null,
  },
  {
    id: 2, name: "Avenue des Baobabs", type: "destination",
    tagline: "Madagascar's Icon",
    desc: "20 km au nord — Legendary sunsets",
    icon: "BB",
    accentColor: "#f97316", glowColor: "rgba(249,115,22,0.35)",
    coords: { lat: -20.2527, lng: 44.4183 }, zoom: 13,
    image: "https://res.cloudinary.com/dloqrnvp8/image/upload/q_auto/f_auto/v1779708876/IMG-20260224-WA0019_ls19mp.jpg",
    info: "800+ year-old baobabs. Unmatched golden hour. Pure photography paradise.",
    tours: "1-day tour · Included in western circuits",
    drive: "30 min", distance: "20 km",
  },
  {
    id: 3, name: "Kirindy Forest", type: "destination",
    tagline: "Kingdom of the Fossa",
    desc: "60 km au nord-est — Endemic wildlife",
    icon: "KF",
    accentColor: "#4ade80", glowColor: "rgba(74,222,128,0.35)",
    coords: { lat: -20.0667, lng: 44.6667 }, zoom: 12,
    image: "https://res.cloudinary.com/dloqrnvp8/image/upload/q_auto/f_auto/v1779707849/LMC-20250706-070913-Color-boost-by-Riyan-1-1-1_xkx7gn.jpg",
    info: "20+ lemur species, night walks, Fossa sightings.",
    tours: "1–2 day tours · Night walks included",
    drive: "1h30", distance: "60 km",
  },
  {
    id: 4, name: "Tsingy de Bemaraha", type: "destination",
    tagline: "UNESCO · Stone Forest",
    desc: "200 km au nord — World Heritage",
    icon: "TB",
    accentColor: "#f87171", glowColor: "rgba(248,113,113,0.35)",
    coords: { lat: -18.6667, lng: 44.7500 }, zoom: 11,
    image: "https://res.cloudinary.com/dloqrnvp8/image/upload/q_auto/f_auto/v1779708056/20250804-103923_incpvt.jpg",
    info: "Pinnacles calcaires acérés, ponts suspendus, Grand & Petit Tsingy avec harnais.",
    tours: "3–4 day tours · Equipment provided",
    drive: "4h", distance: "200 km",
  },
  {
    id: 5, name: "Betania Village", type: "destination",
    tagline: "Sakalava Culture",
    desc: "15 km — Ancestral traditions",
    icon: "BV",
    accentColor: "#a78bfa", glowColor: "rgba(167,139,250,0.35)",
    coords: { lat: -20.3200, lng: 44.2900 }, zoom: 14,
    image: "https://res.cloudinary.com/dloqrnvp8/image/upload/q_auto/f_auto/v1779708101/sakorkata1_wn2ain.jpg",
    info: "Ancestral tombs, traditional architecture, authentic Malagasy hospitality.",
    tours: "Half-day · Combinable with beach",
    drive: "20 min", distance: "15 km",
  },
  {
    id: 6, name: "Plage de Kimony", type: "destination",
    tagline: "Mozambique Channel",
    desc: "25 km — Wild coast & sunsets",
    icon: "PK",
    accentColor: "#38bdf8", glowColor: "rgba(56,189,248,0.35)",
    coords: { lat: -20.1500, lng: 44.3500 }, zoom: 13,
    image: "https://res.cloudinary.com/dloqrnvp8/image/upload/q_auto/f_auto/v1779708154/chez-maggie-in-morondava-5_wbnbju.jpg",
    info: "White sand, turquoise waters, fresh seafood, sunset over the Indian Ocean.",
    tours: "1-day tour · Sunset included",
    drive: "25 min", distance: "25 km",
  },
];

/* ══ OSM EMBED URL ═══════════════════════════════════════════════ */
function osmUrl(lat, lng, zoom = 13) {
  const d = zoom >= 16 ? 0.004 : zoom >= 14 ? 0.015 : zoom >= 13 ? 0.04 : zoom >= 12 ? 0.1 : 0.45;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${lng-d},${lat-d},${lng+d},${lat+d}&layer=mapnik&marker=${lat},${lng}`;
}

/* ══ MAPS URLS ════════════════════════════════════════════════════ */
const gDirections = (lat, lng) => `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
const gSearch     = (lat, lng, q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q || `${lat},${lng}`)}`;

/* ══ HOOK — once visible ══════════════════════════════════════════ */
function useOnceVisible(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

/* ══ SVG ICONS ════════════════════════════════════════════════════ */
const SvgIcon = ({ type, size = 20, color = "currentColor" }) => {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" };
  const icons = {
    pin:     <svg {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    clock:   <svg {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    phone:   <svg {...p}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.12 2.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.45-.45a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
    compass: <svg {...p}><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill={color} opacity=".8"/></svg>,
    arrow:   <svg {...p}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
    map:     <svg {...p}><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
    car:     <svg {...p}><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
    wa:      <svg {...p} fill={color} stroke="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a9.87 9.87 0 00-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
  };
  return icons[type] || null;
};

/* ══ LOCATION PILL ════════════════════════════════════════════════ */
function LocationPill({ loc, selected, onClick, vis, idx }) {
  const isActive = selected === loc.id;
  return (
    <button onClick={onClick} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateX(0)" : "translateX(-30px)", transition: `opacity 0.6s ease ${idx * 0.07}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${idx * 0.07}s` }} className="w-full text-left group relative">
      <div className="relative flex items-center gap-3 p-3.5 rounded-2xl transition-all duration-400 overflow-hidden"
        style={{ background: isActive ? "rgba(255,255,255,.08)" : "rgba(255,255,255,.03)", border: `1.5px solid ${isActive ? loc.accentColor + "60" : "rgba(255,255,255,.07)"}`, boxShadow: isActive ? `0 0 24px ${loc.glowColor}, inset 0 1px 0 rgba(255,255,255,.1)` : "none", transform: isActive ? "scale(1.01)" : "scale(1)" }}>
        {isActive && <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full" style={{ background: loc.accentColor, boxShadow: `0 0 10px ${loc.accentColor}` }} />}
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-xs transition-all duration-300"
          style={{ background: isActive ? loc.accentColor : `${loc.accentColor}20`, color: isActive ? "#020d06" : loc.accentColor, boxShadow: isActive ? `0 4px 16px ${loc.glowColor}` : "none", fontFamily: sans }}>
          {loc.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-black text-white text-sm leading-tight truncate" style={{ fontFamily: serif }}>{loc.name}</p>
          <p className="text-white/40 text-[10px] mt-0.5 truncate" style={{ fontFamily: sans }}>{loc.desc}</p>
        </div>
        {loc.drive && (
          <div className="flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)" }}>
            <SvgIcon type="car" size={10} color="rgba(255,255,255,.4)" />
            <span className="text-[9px] font-bold text-white/40" style={{ fontFamily: sans }}>{loc.drive}</span>
          </div>
        )}
        {isActive && <div className="flex-shrink-0"><SvgIcon type="arrow" size={14} color={loc.accentColor} /></div>}
      </div>
    </button>
  );
}

/* ══ MAIN ═════════════════════════════════════════════════════════ */
export default function MapSection() {
  const [sectionRef, sectionVis] = useOnceVisible(0.05);
  const [selected, setSelected] = useState(1);
  const [imgLoaded, setImgLoaded] = useState(false);
  const loc = LOCATIONS.find(l => l.id === selected) || LOCATIONS[0];

  useEffect(() => { setImgLoaded(false); }, [selected]);

  return (
    <section
      id="map-section"
      ref={sectionRef}
      className="relative py-20 md:py-28 px-4 overflow-hidden"
      style={{ background: "#14532d" }}
    >
      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* ══ HEADER ══ */}
        <div className="mb-14 md:mb-20" style={{ opacity: sectionVis ? 1 : 0, transform: sectionVis ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.9s ease, transform 0.9s ease" }}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 rounded-full" style={{ background: loc.accentColor, transition: "background 0.6s" }} />
                <span className="text-xs font-bold tracking-[0.4em] uppercase" style={{ fontFamily: sans, color: loc.accentColor, transition: "color 0.6s" }}>Our Territory</span>
              </div>
              <h2 className="text-white font-black leading-none" style={{ fontFamily: serif, fontSize: "clamp(2.5rem,6vw,5rem)", letterSpacing: "-.03em" }}>
                Explorez<br />
                <em style={{ color: loc.accentColor, transition: "color 0.6s ease", fontStyle: "italic" }}>Madagascar</em>
              </h2>
            </div>
            <p className="text-white/40 text-sm max-w-xs leading-relaxed md:text-right" style={{ fontFamily: sans }}>
              6 exceptional destinations reachable from our Morondava office
            </p>
          </div>
        </div>

        {/* ══ MAIN GRID ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">

          {/* Sidebar */}
          <div className="lg:col-span-3 flex flex-col gap-2">
            {LOCATIONS.map((l, i) => (
              <LocationPill key={l.id} loc={l} selected={selected} onClick={() => setSelected(l.id)} vis={sectionVis} idx={i} />
            ))}
            <div className="mt-2 rounded-2xl p-4 relative overflow-hidden"
              style={{ background: "rgba(255,255,255,.04)", border: "1.5px solid rgba(255,255,255,.08)", opacity: sectionVis ? 1 : 0, transform: sectionVis ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s" }}>
              <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ background: "radial-gradient(circle at 0% 0%,rgba(250,204,21,.08) 0%,transparent 60%)" }} />
              <p className="text-white font-black text-sm mb-3 relative z-10" style={{ fontFamily: serif }}>📍 KiriTour Bureau</p>
              <div className="space-y-2 relative z-10">
                {[
                  { icon: "pin",   text: "Morondava, 619, Madagascar" },
                  { icon: "clock", text: "Mon–Sat · 8:00 – 18:00" },
                  { icon: "phone", text: "+261 33 664 07 77" },
                ].map((row, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <SvgIcon type={row.icon} size={12} color="rgba(250,204,21,.6)" />
                    <span className="text-white/50 text-[10px]" style={{ fontFamily: sans }}>{row.text}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => window.open(`https://wa.me/261336640777?text=${encodeURIComponent("Hello KiriTour! I'd like to visit your office.")}`, "_blank", "noopener")}
                className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs transition-all hover:scale-105 active:scale-95 relative z-10"
                style={{ background: "linear-gradient(135deg,#facc15,#f59e0b)", color: "#14532d", fontFamily: sans, boxShadow: "0 4px 16px rgba(250,204,21,.3)" }}>
                <SvgIcon type="wa" size={13} color="#14532d" /> WhatsApp
              </button>
            </div>
          </div>

          {/* Right: Image + Map */}
          <div className="lg:col-span-9 flex flex-col gap-4">

            {/* Hero image */}
            <div className="relative rounded-3xl overflow-hidden flex-shrink-0"
              style={{ height: "clamp(200px, 28vw, 340px)", opacity: sectionVis ? 1 : 0, transform: sectionVis ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s" }}>
              <img key={loc.id} src={loc.image} alt={loc.name} onLoad={() => setImgLoaded(true)}
                className="w-full h-full object-cover transition-all duration-700"
                style={{ transform: imgLoaded ? "scale(1)" : "scale(1.05)", filter: imgLoaded ? "brightness(1)" : "brightness(0.6)" }} loading="lazy" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right,rgba(2,13,6,.85) 0%,rgba(2,13,6,.3) 40%,transparent 100%)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(2,13,6,.9) 0%,transparent 50%)" }} />
              <div className="absolute top-4 right-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: "rgba(2,13,6,.7)", border: `1px solid ${loc.accentColor}40`, backdropFilter: "blur(12px)" }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: loc.accentColor, boxShadow: `0 0 8px ${loc.accentColor}` }} />
                  <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: loc.accentColor, fontFamily: sans }}>{loc.tagline}</span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-11 h-11 rounded-2xl flex items-center justify-center font-black text-sm shadow-xl flex-shrink-0"
                        style={{ background: loc.accentColor, color: "#020d06", fontFamily: sans, boxShadow: `0 8px 24px ${loc.glowColor}` }}>
                        {loc.icon}
                      </div>
                      <div>
                        <h3 className="text-white font-black text-xl md:text-2xl leading-none" style={{ fontFamily: serif, textShadow: "0 2px 20px rgba(0,0,0,.8)" }}>{loc.name}</h3>
                        <p style={{ color: loc.accentColor, fontFamily: sans }} className="text-xs font-semibold mt-0.5">{loc.desc}</p>
                      </div>
                    </div>
                    <p className="text-white/65 text-xs md:text-sm leading-relaxed max-w-lg" style={{ fontFamily: sans }}>{loc.info}</p>
                    {loc.tours && (
                      <p className="text-white/40 text-[11px] mt-1.5 flex items-center gap-1.5" style={{ fontFamily: sans }}>
                        <span style={{ color: loc.accentColor }}>◆</span> {loc.tours}
                      </p>
                    )}
                  </div>
                  {loc.distance && (
                    <div className="flex-shrink-0 hidden sm:flex flex-col items-center gap-1 px-4 py-3 rounded-2xl"
                      style={{ background: `${loc.accentColor}15`, border: `1px solid ${loc.accentColor}30` }}>
                      <SvgIcon type="car" size={16} color={loc.accentColor} />
                      <span className="font-black text-base leading-none" style={{ color: loc.accentColor, fontFamily: serif }}>{loc.drive}</span>
                      <span className="text-white/30 text-[9px] font-semibold" style={{ fontFamily: sans }}>{loc.distance}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Map + buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 relative rounded-3xl overflow-hidden flex-shrink-0"
                style={{ height: 300, border: `2px solid ${loc.accentColor}25`, boxShadow: `0 0 40px ${loc.glowColor.replace("0.35","0.12")}`, transition: "border-color 0.6s, box-shadow 0.6s", opacity: sectionVis ? 1 : 0, transform: sectionVis ? "translateY(0)" : "translateY(20px)" }}>
                <iframe key={`osm-${loc.id}`} src={osmUrl(loc.coords.lat, loc.coords.lng, loc.zoom)}
                  className="absolute inset-0 w-full h-full" style={{ border: 0, filter: "saturate(0.8) contrast(1.1)" }}
                  allowFullScreen loading="lazy" title={`Carte — ${loc.name}`} />
                <div className="absolute top-3 left-3 pointer-events-none z-10">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "rgba(2,13,6,.88)", border: `1px solid ${loc.accentColor}35`, backdropFilter: "blur(12px)" }}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-[10px]" style={{ background: loc.accentColor, color: "#020d06", fontFamily: sans }}>{loc.icon}</div>
                    <div>
                      <p className="text-white font-bold text-xs leading-tight" style={{ fontFamily: serif }}>{loc.name}</p>
                      <p style={{ color: loc.accentColor, fontFamily: sans }} className="text-[9px]">{loc.coords.lat.toFixed(4)}, {loc.coords.lng.toFixed(4)}</p>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 pointer-events-none z-10">
                  <span className="text-[8px] px-1.5 py-0.5 rounded" style={{ background: "rgba(2,13,6,.7)", color: "rgba(255,255,255,.3)", fontFamily: sans }}>© OpenStreetMap</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-3" style={{ opacity: sectionVis ? 1 : 0, transform: sectionVis ? "translateX(0)" : "translateX(20px)", transition: "opacity 0.8s ease 0.45s, transform 0.8s ease 0.45s" }}>
                {loc.type === "office" ? (
                  <>
                    <button onClick={() => window.open(gDirections(BUREAU_LAT, BUREAU_LNG), "_blank", "noopener,noreferrer")}
                      className="flex-1 flex flex-col items-center justify-center gap-2 rounded-2xl font-bold text-sm transition-all hover:scale-105 active:scale-95 group"
                      style={{ background: "linear-gradient(135deg,#facc15,#f59e0b)", color: "#14532d", fontFamily: sans, minHeight: 88, boxShadow: "0 8px 32px rgba(250,204,21,.35)" }}>
                      <SvgIcon type="compass" size={22} color="#14532d" />
                      <span className="font-black text-sm">Get Directions</span>
                      <span className="text-[10px] font-semibold opacity-70">Google Maps →</span>
                    </button>
                    <button onClick={() => window.open(gSearch(BUREAU_LAT, BUREAU_LNG, "KiriTour Bureau Morondava Madagascar"), "_blank", "noopener,noreferrer")}
                      className="flex-1 flex flex-col items-center justify-center gap-2 rounded-2xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
                      style={{ background: "rgba(255,255,255,.06)", color: "rgba(255,255,255,.8)", border: "1.5px solid rgba(255,255,255,.1)", fontFamily: sans, minHeight: 88 }}>
                      <SvgIcon type="map" size={22} color="rgba(255,255,255,.7)" />
                      <span className="font-bold text-sm">View on Maps</span>
                      <span className="text-[10px] opacity-40">See the office</span>
                    </button>
                    <button onClick={() => window.open(`https://wa.me/261336640777?text=${encodeURIComponent("Hello KiriTour! I would like to visit your office.")}`, "_blank", "noopener")}
                      className="flex-1 flex flex-col items-center justify-center gap-2 rounded-2xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
                      style={{ background: "rgba(37,211,102,.12)", color: "#25d366", border: "1.5px solid rgba(37,211,102,.25)", fontFamily: sans, minHeight: 88 }}>
                      <SvgIcon type="wa" size={22} color="#25d366" />
                      <span className="font-bold text-sm">WhatsApp</span>
                      <span className="text-[10px] opacity-60">Reply within 2h</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => window.open(gSearch(loc.coords.lat, loc.coords.lng, loc.name + " Madagascar"), "_blank", "noopener,noreferrer")}
                      className="flex-1 flex flex-col items-center justify-center gap-2 rounded-2xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
                      style={{ background: `${loc.accentColor}18`, color: loc.accentColor, border: `1.5px solid ${loc.accentColor}30`, fontFamily: sans, minHeight: 88, boxShadow: `0 4px 20px ${loc.glowColor.replace("0.35","0.1")}` }}>
                      <SvgIcon type="map" size={22} color={loc.accentColor} />
                      <span className="font-bold text-sm">View on Maps</span>
                      <span className="text-[10px] opacity-60">{loc.distance} from office</span>
                    </button>
                    <button onClick={() => window.open(gDirections(loc.coords.lat, loc.coords.lng), "_blank", "noopener,noreferrer")}
                      className="flex-1 flex flex-col items-center justify-center gap-2 rounded-2xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
                      style={{ background: "rgba(255,255,255,.05)", color: "rgba(255,255,255,.7)", border: "1.5px solid rgba(255,255,255,.08)", fontFamily: sans, minHeight: 88 }}>
                      <SvgIcon type="compass" size={22} color="rgba(255,255,255,.6)" />
                      <span className="font-bold text-sm">Directions</span>
                      <span className="text-[10px] opacity-40">🚗 {loc.drive}</span>
                    </button>
                    <button onClick={() => window.open(`https://wa.me/261336640777?text=${encodeURIComponent(`Hello KiriTour! I'm interested in visiting ${loc.name}`)}`, "_blank", "noopener")}
                      className="flex-1 flex flex-col items-center justify-center gap-2 rounded-2xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
                      style={{ background: "linear-gradient(135deg,#facc15,#f59e0b)", color: "#14532d", fontFamily: sans, minHeight: 88, boxShadow: "0 4px 20px rgba(250,204,21,.25)" }}>
                      <SvgIcon type="wa" size={22} color="#14532d" />
                      <span className="font-black text-sm">Book Now</span>
                      <span className="text-[10px] opacity-70">Via WhatsApp</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ══ BOTTOM BANNER ══ */}
        <div className="mt-12 md:mt-16 relative rounded-3xl overflow-hidden"
          style={{ opacity: sectionVis ? 1 : 0, transform: sectionVis ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.9s ease 0.6s, transform 0.9s ease 0.6s" }}>
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(2,13,6,.8) 0%,rgba(5,46,22,.9) 50%,rgba(20,83,45,.8) 100%)" }} />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%,white 0%,transparent 50%)" }} />
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(250,204,21,.5),transparent)" }} />
          <div className="relative z-10 p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-white font-black text-2xl md:text-3xl mb-2" style={{ fontFamily: serif }}>Every adventure starts here.</h3>
                <p className="text-emerald-200/70 text-sm max-w-md" style={{ fontFamily: sans }}>Our Morondava office: expert briefing, checked equipment, dedicated guide.</p>
                <div className="flex flex-wrap gap-4 mt-4">
                  {["Free equipment check","Expert briefing","Local SIM available","Secure parking"].map((item, i) => (
                    <span key={i} className="flex items-center gap-1.5 text-emerald-200/60 text-xs" style={{ fontFamily: sans }}>
                      <span style={{ color: "#facc15" }}>✓</span> {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <button onClick={() => window.open(gDirections(BUREAU_LAT, BUREAU_LNG), "_blank", "noopener,noreferrer")}
                  className="flex items-center gap-2 px-7 py-4 rounded-2xl font-black text-green-900 text-sm shadow-2xl hover:scale-105 active:scale-95 transition-all"
                  style={{ background: "linear-gradient(135deg,#facc15,#f59e0b)", fontFamily: sans, boxShadow: "0 8px 32px rgba(250,204,21,.4)" }}>
                  <SvgIcon type="compass" size={18} color="#14532d" /> Directions — Google Maps
                </button>
                <button onClick={() => window.open(`https://wa.me/261336640777?text=${encodeURIComponent("Hello KiriTour! I'd like to plan my trip.")}`, "_blank", "noopener")}
                  className="flex items-center gap-2 px-7 py-4 rounded-2xl font-bold text-white text-sm hover:scale-105 active:scale-95 transition-all"
                  style={{ background: "rgba(255,255,255,.1)", border: "1.5px solid rgba(255,255,255,.2)", fontFamily: sans }}>
                  <SvgIcon type="wa" size={18} color="white" /> WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}