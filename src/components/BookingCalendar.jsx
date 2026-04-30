import React, { useState, useEffect, useRef } from "react";

const serif = "'Playfair Display', serif";
const sans  = "'DM Sans', sans-serif";

/* ═══════════════════════════════════════════════════════════════
   DATA — données réelles KiriTour
═══════════════════════════════════════════════════════════════ */
const MONTHS = [
  { short:"Jan", full:"January",   idx:0  },
  { short:"Feb", full:"February",   idx:1  },
  { short:"Mar", full:"March",      idx:2  },
  { short:"Apr", full:"April",     idx:3  },
  { short:"May", full:"May",       idx:4  },
  { short:"Jun", full:"June",      idx:5  },
  { short:"Jul", full:"July",   idx:6  },
  { short:"Aug", full:"August",      idx:7  },
  { short:"Sep", full:"September", idx:8  },
  { short:"Oct", full:"October",   idx:9  },
  { short:"Nov", full:"November",  idx:10 },
  { short:"Dec", full:"December",  idx:11 },
];

// Peak months (Apr–Oct) = dry season Madagascar
const PEAK_MONTHS = [3,4,5,6,7,8,9];

const SEASON_DATA = {
  peak: {
    label: "Peak Season",
    sublabel: "Dry Season",
    gradient: "linear-gradient(135deg,#facc15,#f59e0b)",
    gradientSoft: "linear-gradient(135deg,rgba(250,204,21,.15),rgba(245,158,11,.08))",
    border: "#facc15",
    accent: "#ca8a04",
    textDark: "#14532d",
    weather: "Sunny · Roads open · Active wildlife",
    temp: "25–35°C",
    rain: "< 30mm",
    crowd: 85,
    price: 100,
    pros: ["All roads open","Daily departures","Best wildlife sightings","Guaranteed dry weather"],
    cons: ["Higher prices","Book early","Busier sites"],
    icon: "sun",
  },
  low: {
    label: "Low Season",
    sublabel: "Rainy Season",
    gradient: "linear-gradient(135deg,#34d399,#10b981)",
    gradientSoft: "linear-gradient(135deg,rgba(52,211,153,.15),rgba(16,185,129,.08))",
    border: "#34d399",
    accent: "#059669",
    textDark: "#064e3b",
    weather: "Rain · Limited roads · Green landscapes",
    temp: "28–38°C",
    rain: "200–400mm",
    crowd: 30,
    price: 82,
    pros: ["Prices reduced −15%","Fewer tourists","Green landscapes","Authentic atmosphere"],
    cons: ["Frequent rain","Some roads closed","Limited departures"],
    icon: "rain",
  },
};

const TOURS = {
  peak: [
    { name:"Tsiribihina River",    days:"3d", from:"529€",   to:"843€",   avail:"Daily departures", status:"open",    icon:"river" },
    { name:"Tsiribihina River",    days:"4d", from:"857€",   to:"1570€",  avail:"Daily departures", status:"open",    icon:"river" },
    { name:"Tsiribihina River",    days:"5d", from:"1334€",  to:"2053€",  avail:"Weekly",       status:"open",    icon:"river" },
    { name:"Tsiribihina River",    days:"8d", from:"2148€",  to:"3045€",  avail:"On request",        status:"open",    icon:"river" },
    { name:"Tsingy de Bemaraha",   days:"3d", from:"369€",   to:"912€",   avail:"Daily departures", status:"open",    icon:"tsingy" },
    { name:"Tsingy de Bemaraha",   days:"4d", from:"488€",   to:"1196€",  avail:"Daily departures", status:"open",    icon:"tsingy" },
    { name:"Kirindy Forest",       days:"1d", from:"191€",   to:"224€",   avail:"Daily departures", status:"open",    icon:"forest" },
    { name:"Kirindy Forest",       days:"2d", from:"253€",   to:"523€",   avail:"Daily departures", status:"open",    icon:"forest" },
    { name:"Andasibe Rainforest",  days:"3d", from:"996€",   to:"1868€",  avail:"Daily departures", status:"open",    icon:"lemur" },
    { name:"Western Wonders",      days:"1d", from:"145€",   to:"205€",   avail:"Daily departures", status:"open",    icon:"sunset" },
  ],
  low: [
    { name:"Tsiribihina River",    days:"3d", from:"449€",   to:"716€",   avail:"3x / week",       status:"limited", icon:"river",  note:"High water levels" },
    { name:"Tsiribihina River",    days:"4d", from:"728€",   to:"1334€",  avail:"2x / week",       status:"limited", icon:"river",  note:"High water levels" },
    { name:"Kirindy Forest",       days:"1d", from:"162€",   to:"190€",   avail:"Daily departures", status:"open",    icon:"forest" },
    { name:"Kirindy Forest",       days:"2d", from:"215€",   to:"445€",   avail:"Daily departures", status:"open",    icon:"forest" },
    { name:"Tsingy de Bemaraha",   days:"3d", from:"314€",   to:"775€",   avail:"Weather permitting",     status:"limited", icon:"tsingy", note:"Difficult roads" },
    { name:"Andasibe Rainforest",  days:"3d", from:"846€",   to:"1587€",  avail:"Daily departures", status:"open",    icon:"lemur" },
    { name:"Western Wonders",      days:"1d", from:"123€",   to:"174€",   avail:"Daily departures", status:"open",    icon:"sunset" },
  ],
};

/* ═══════════════════════════════════════════════════════════════
   SVG ICONS — inline, aucune dépendance externe
═══════════════════════════════════════════════════════════════ */
const Icon = ({ name, size = 24, color = "currentColor", style = {} }) => {
  const s = { width: size, height: size, display: "inline-block", ...style };
  const icons = {
    sun: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" style={s}>
        <circle cx="12" cy="12" r="5" fill={color} stroke="none" opacity=".9"/>
        {[0,45,90,135,180,225,270,315].map((deg,i)=>{
          const r = Math.PI*deg/180;
          const x1=12+7.5*Math.cos(r), y1=12+7.5*Math.sin(r);
          const x2=12+9.5*Math.cos(r), y2=12+9.5*Math.sin(r);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2" strokeLinecap="round"/>;
        })}
      </svg>
    ),
    rain: (
      <svg viewBox="0 0 24 24" fill={color} style={s}>
        <path d="M20 17.58A5 5 0 0018 8h-1.26A8 8 0 104 15.25" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <line x1="8" y1="19" x2="8" y2="21" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <line x1="8" y1="13" x2="8" y2="15" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <line x1="12" y1="21" x2="12" y2="23" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <line x1="12" y1="15" x2="12" y2="17" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <line x1="16" y1="19" x2="16" y2="21" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <line x1="16" y1="13" x2="16" y2="15" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    river: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" style={s}>
        <path d="M2 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0"/>
        <path d="M2 17c2-3 4-3 6 0s4 3 6 0 4-3 6 0"/>
        <path d="M2 7c2-3 4-3 6 0s4 3 6 0 4-3 6 0"/>
      </svg>
    ),
    tsingy: (
      <svg viewBox="0 0 24 24" fill={color} style={s}>
        <path d="M12 2L8 10H4l4 6H5l7 6 7-6h-3l4-6h-4L12 2z" opacity=".9"/>
      </svg>
    ),
    forest: (
      <svg viewBox="0 0 24 24" fill={color} style={s}>
        <path d="M12 2L6 10h3L5 16h5v6h4v-6h5l-4-6h3L12 2z" opacity=".9"/>
      </svg>
    ),
    lemur: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" style={s}>
        <circle cx="12" cy="8" r="3.5"/>
        <circle cx="9" cy="6.5" r="1" fill={color} stroke="none"/>
        <circle cx="15" cy="6.5" r="1" fill={color} stroke="none"/>
        <path d="M8 5c-2-3-5-2-4 1"/>
        <path d="M16 5c2-3 5-2 4 1"/>
        <path d="M9 11.5c-2 1-4 3-3 6h12c1-3-1-5-3-6"/>
        <path d="M12 17.5c1 2 3 3 2 4.5"/>
        <path d="M12 17.5c-1 2-3 3-2 4.5"/>
      </svg>
    ),
    sunset: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" style={s}>
        <path d="M12 3v1M5.6 5.6l.7.7M3 12h1M5.6 18.4l.7-.7M12 19v2M18.4 18.4l-.7-.7M21 12h-1M18.4 5.6l-.7.7"/>
        <path d="M17 12a5 5 0 10-10 0"/>
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="6" y1="16" x2="18" y2="16"/>
      </svg>
    ),
    check: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" style={s}>
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
    warn: (
      <svg viewBox="0 0 24 24" fill={color} style={s}>
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" opacity=".9"/>
        <line x1="12" y1="9" x2="12" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <line x1="12" y1="17" x2="12.01" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    star: (
      <svg viewBox="0 0 24 24" fill={color} style={s}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    calendar: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" style={s}>
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    people: (
      <svg viewBox="0 0 24 24" fill={color} style={s}>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" opacity=".7"/>
        <circle cx="9" cy="7" r="4" opacity=".9"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" opacity=".6"/>
      </svg>
    ),
    price: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" style={s}>
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
    arrow: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" style={s}>
        <line x1="5" y1="12" x2="19" y2="12"/>
        <polyline points="12 5 19 12 12 19"/>
      </svg>
    ),
    whatsapp: (
      <svg viewBox="0 0 24 24" fill={color} style={s}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  };
  return icons[name] || null;
};

/* ═══════════════════════════════════════════════════════════════
   HOOK — une fois visible
═══════════════════════════════════════════════════════════════ */
function useOnceVisible(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

/* ═══════════════════════════════════════════════════════════════
   ANIMATED BAR
═══════════════════════════════════════════════════════════════ */
function AnimBar({ value, color, delay = 0, vis }) {
  return (
    <div className="relative h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,.15)" }}>
      <div
        className="absolute left-0 top-0 h-full rounded-full"
        style={{
          width: vis ? `${value}%` : "0%",
          background: color,
          transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
          boxShadow: `0 0 8px ${color}80`,
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PARTICLE BURST — animation sur sélection mois
═══════════════════════════════════════════════════════════════ */
function Particles({ active, color }) {
  if (!active) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * 360;
        const r = Math.PI * angle / 180;
        const tx = Math.cos(r) * 28;
        const ty = Math.sin(r) * 28;
        return (
          <div key={i} className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full"
            style={{
              background: color,
              transform: "translate(-50%,-50%)",
              animation: `particle-burst 0.6s ease-out ${i * 0.04}s both`,
              "--tx": `${tx}px`,
              "--ty": `${ty}px`,
            }}
          />
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MONTH CARD
═══════════════════════════════════════════════════════════════ */
function MonthCard({ month, selected, onClick, vis, index }) {
  const isPeak = PEAK_MONTHS.includes(month.idx);
  const isSelected = selected === month.idx;
  const [burst, setBurst] = useState(false);

  const handleClick = () => {
    onClick();
    setBurst(true);
    setTimeout(() => setBurst(false), 700);
  };

  const accentColor = isPeak ? "#facc15" : "#34d399";
  const darkColor   = isPeak ? "#14532d" : "#064e3b";

  return (
    <button
      onClick={handleClick}
      className="relative group"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0) scale(1)" : "translateY(20px) scale(0.9)",
        transition: `opacity 0.5s ease ${index * 0.04}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${index * 0.04}s`,
      }}
    >
      <Particles active={burst} color={accentColor} />
      <div
        className="relative rounded-2xl p-3 md:p-4 transition-all duration-300 overflow-hidden"
        style={{
          background: isSelected
            ? isPeak
              ? "linear-gradient(135deg,#fef9c3,#fef3c7)"
              : "linear-gradient(135deg,#d1fae5,#a7f3d0)"
            : "rgba(255,255,255,.06)",
          border: `2px solid ${isSelected ? accentColor : "rgba(255,255,255,.1)"}`,
          boxShadow: isSelected ? `0 0 20px ${accentColor}40, 0 8px 24px rgba(0,0,0,.2)` : "none",
          transform: isSelected ? "scale(1.06)" : "scale(1)",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* Glow bg when selected */}
        {isSelected && (
          <div className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ background: `radial-gradient(circle at center,${accentColor}30 0%,transparent 70%)` }} />
        )}

        {/* Icon */}
        <div className="flex justify-center mb-2">
          <div
            className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all duration-300"
            style={{
              background: isSelected ? accentColor : `${accentColor}25`,
              boxShadow: isSelected ? `0 4px 14px ${accentColor}60` : "none",
              transform: isSelected ? "rotate(-5deg) scale(1.1)" : "rotate(0deg) scale(1)",
            }}
          >
            <Icon name={isPeak ? "sun" : "rain"} size={18}
              color={isSelected ? darkColor : accentColor} />
          </div>
        </div>

        {/* Month name */}
        <p
          className="font-black text-center leading-none mb-1.5"
          style={{
            fontFamily: serif,
            fontSize: "clamp(.8rem,1.5vw,1rem)",
            color: isSelected ? darkColor : "rgba(255,255,255,.85)",
          }}
        >
          {month.short}
        </p>

        {/* Season dot */}
        <div className="flex justify-center">
          <span
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              background: accentColor,
              boxShadow: isSelected ? `0 0 8px ${accentColor}` : "none",
              transform: isSelected ? "scale(1.3)" : "scale(1)",
            }}
          />
        </div>

        {/* Selected checkmark */}
        {isSelected && (
          <div
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
            style={{ background: accentColor, border: "2px solid #020d06" }}
          >
            <Icon name="check" size={10} color={darkColor} />
          </div>
        )}
      </div>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TOUR ROW
═══════════════════════════════════════════════════════════════ */
function TourRow({ tour, index, vis, accentColor, darkColor }) {
  const iconColors = {
    river:  "#38bdf8",
    tsingy: "#f97316",
    forest: "#4ade80",
    lemur:  "#c084fc",
    sunset: "#fb923c",
  };
  const ic = iconColors[tour.icon] || accentColor;

  return (
    <div
      className="flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 group hover:scale-[1.01]"
      style={{
        background: "rgba(255,255,255,.05)",
        border: "1px solid rgba(255,255,255,.08)",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateX(0)" : "translateX(-20px)",
        transition: `opacity 0.5s ease ${0.1 + index * 0.06}s, transform 0.5s ease ${0.1 + index * 0.06}s, background 0.2s`,
      }}
      onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.1)"}
      onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.05)"}
    >
      {/* Tour icon */}
      <div
        className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center"
        style={{ background: `${ic}20`, border: `1.5px solid ${ic}40` }}
      >
        <Icon name={tour.icon} size={16} color={ic} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-bold text-white text-xs md:text-sm leading-tight" style={{ fontFamily: serif }}>
            {tour.name}
          </p>
          <span
            className="text-[9px] font-black px-1.5 py-0.5 rounded-full flex-shrink-0"
            style={{ background: `${accentColor}30`, color: accentColor, fontFamily: sans }}
          >
            {tour.days}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span
            className="text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
            style={{
              background: tour.status === "open" ? "rgba(74,222,128,.2)" : "rgba(251,146,60,.2)",
              color: tour.status === "open" ? "#4ade80" : "#fb923c",
              fontFamily: sans,
              border: `1px solid ${tour.status === "open" ? "rgba(74,222,128,.3)" : "rgba(251,146,60,.3)"}`,
            }}
          >
            {tour.status === "open" ? "✓ " : "⚡ "}{tour.avail}
          </span>
          {tour.note && (
            <span className="text-[9px] text-orange-300/70" style={{ fontFamily: sans }}>
              {tour.note}
            </span>
          )}
        </div>
      </div>

      {/* Price */}
      <div className="text-right flex-shrink-0">
        <p className="text-[9px] text-white/40 mb-0.5" style={{ fontFamily: sans }}>From</p>
        <p className="font-black text-base md:text-lg leading-none" style={{ fontFamily: serif, color: accentColor }}>
          {tour.from}
        </p>
        <p className="text-[9px] text-white/30" style={{ fontFamily: sans }}>up to {tour.to}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function BookingCalendar() {
  const [sectionRef, sectionVis] = useOnceVisible(0.08);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [prevMonth,    setPrevMonth]    = useState(null);
  const [animating,    setAnimating]    = useState(false);
  const [contentVis,   setContentVis]   = useState(true);

  const isPeak  = PEAK_MONTHS.includes(selectedMonth);
  const season  = isPeak ? SEASON_DATA.peak : SEASON_DATA.low;
  const tours   = isPeak ? TOURS.peak : TOURS.low;
  const monthData = MONTHS[selectedMonth];

  const handleMonthSelect = (idx) => {
    if (idx === selectedMonth) return;
    setAnimating(true);
    setContentVis(false);
    setPrevMonth(selectedMonth);
    setTimeout(() => {
      setSelectedMonth(idx);
      setContentVis(true);
      setAnimating(false);
    }, 280);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 overflow-hidden"
      style={{ background: "linear-gradient(160deg,#020d06 0%,#071a0e 40%,#0a2415 70%,#020d06 100%)" }}
    >
      {/* ── Background noise texture ── */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")", backgroundSize:"180px" }} />

      {/* ── Ambient glows ── */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: isPeak ? "rgba(250,204,21,.06)" : "rgba(52,211,153,.06)", filter:"blur(80px)", transition:"background 0.8s ease" }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: isPeak ? "rgba(245,158,11,.04)" : "rgba(16,185,129,.04)", filter:"blur(60px)", transition:"background 0.8s ease" }} />

      {/* ── Top accent line ── */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg,transparent,${season.border}60,transparent)`, transition:"background 0.6s ease" }} />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ═══ HEADER ═══════════════════════════════════════════ */}
        <div
          className="text-center mb-12 md:mb-16"
          style={{
            opacity: sectionVis ? 1 : 0,
            transform: sectionVis ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 mb-5"
            style={{ background: "rgba(255,255,255,.05)", backdropFilter: "blur(8px)" }}>
            <Icon name="calendar" size={14} color={season.border} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ fontFamily: sans, color: season.border }}>
              Plan Your Visit
            </span>
          </div>
          <h2
            className="font-black mb-3 text-white"
            style={{ fontFamily: serif, fontSize: "clamp(2rem,5vw,3.5rem)", lineHeight: 0.95, letterSpacing: "-.02em" }}
          >
            When to <em style={{ color: season.border }}>Travel</em>?
          </h2>
          <p className="text-white/45 text-sm max-w-md mx-auto" style={{ fontFamily: sans }}>
            Choose your month — availability, pricing & weather conditions
          </p>
        </div>

        {/* ═══ MONTH GRID ════════════════════════════════════════ */}
        <div className="grid grid-cols-6 md:grid-cols-12 gap-2 md:gap-3 mb-8 md:mb-12">
          {MONTHS.map((month, i) => (
            <MonthCard
              key={i}
              month={month}
              selected={selectedMonth}
              onClick={() => handleMonthSelect(month.idx)}
              vis={sectionVis}
              index={i}
            />
          ))}
        </div>

        {/* ═══ SEASON LEGEND ══════════════════════════════════════ */}
        <div
          className="flex flex-wrap gap-3 justify-center mb-10"
          style={{
            opacity: sectionVis ? 1 : 0,
            transition: "opacity 0.8s ease 0.5s",
          }}
        >
          {[
            { label:"Dry Season (Apr–Oct)", color:"#facc15", icon:"sun" },
            { label:"Rainy Season (Nov–Mar)", color:"#34d399", icon:"rain" },
          ].map((leg, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)" }}>
              <Icon name={leg.icon} size={12} color={leg.color} />
              <span className="text-xs font-semibold" style={{ color: leg.color, fontFamily: sans }}>{leg.label}</span>
            </div>
          ))}
        </div>

        {/* ═══ MAIN INFO GRID ════════════════════════════════════ */}
        <div
          className="grid grid-cols-1 lg:grid-cols-5 gap-5 md:gap-6"
          style={{
            opacity: contentVis ? 1 : 0,
            transform: contentVis ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
          }}
        >
          {/* ── LEFT : Season card (2 cols) ── */}
          <div
            className="lg:col-span-2 rounded-3xl p-6 md:p-8 relative overflow-hidden"
            style={{
              background: "rgba(255,255,255,.05)",
              border: `1.5px solid ${season.border}30`,
              backdropFilter: "blur(16px)",
              boxShadow: `0 8px 40px ${season.border}15`,
            }}
          >
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{ background: `radial-gradient(circle at 20% 20%,${season.border}12 0%,transparent 60%)` }} />

            {/* Month header */}
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: season.gradient, boxShadow: `0 8px 24px ${season.border}50` }}
              >
                <Icon name={season.icon} size={28} color={isPeak ? "#14532d" : "#064e3b"} />
              </div>
              <div>
                <p className="text-white/50 text-xs font-bold tracking-widest uppercase mb-1" style={{ fontFamily: sans }}>
                  {monthData.full}
                </p>
                <h3 className="font-black text-white text-xl leading-none" style={{ fontFamily: serif }}>
                  {season.label}
                </h3>
                <p style={{ color: season.border, fontFamily: sans }} className="text-xs font-bold mt-0.5">
                  {season.sublabel}
                </p>
              </div>
            </div>

            {/* Weather strip */}
            <div
              className="rounded-2xl px-4 py-3 mb-5 relative z-10"
              style={{ background: `${season.border}12`, border: `1px solid ${season.border}25` }}
            >
              <p className="text-white/70 text-xs leading-relaxed" style={{ fontFamily: sans }}>
                {season.weather}
              </p>
              <div className="flex gap-4 mt-2">
                {[
                  { icon:"sun", val: season.temp, label:"Temperature" },
                  { icon:"rain", val: season.rain, label:"Rainfall" },
                ].map((w, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <Icon name={w.icon} size={11} color={season.border} />
                    <div>
                      <p className="text-white font-bold text-xs leading-none" style={{ fontFamily: sans }}>{w.val}</p>
                      <p className="text-white/35 text-[9px]" style={{ fontFamily: sans }}>{w.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Crowd & price bars */}
            <div className="space-y-3 mb-5 relative z-10">
              {[
                { label:"Tourist crowd", val: season.crowd, icon:"people" },
                { label:"Price level",         val: season.price, icon:"price" },
              ].map((bar, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <Icon name={bar.icon} size={12} color="rgba(255,255,255,.4)" />
                      <span className="text-white/50 text-[10px] font-semibold" style={{ fontFamily: sans }}>{bar.label}</span>
                    </div>
                    <span className="font-bold text-xs" style={{ color: season.border, fontFamily: sans }}>{bar.val}%</span>
                  </div>
                  <AnimBar value={bar.val} color={season.border} delay={i * 0.15} vis={contentVis} />
                </div>
              ))}
            </div>

            {/* Pros / Cons */}
            <div className="grid grid-cols-2 gap-3 relative z-10">
              <div className="rounded-2xl p-3" style={{ background: "rgba(74,222,128,.08)", border: "1px solid rgba(74,222,128,.15)" }}>
                <p className="text-emerald-400 font-bold text-[10px] mb-2 flex items-center gap-1" style={{ fontFamily: sans }}>
                  <Icon name="check" size={10} color="#4ade80" /> Advantages
                </p>
                <ul className="space-y-1">
                  {season.pros.map((p, i) => (
                    <li key={i} className="text-white/60 text-[10px] leading-tight" style={{ fontFamily: sans }}>· {p}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl p-3" style={{ background: "rgba(251,146,60,.08)", border: "1px solid rgba(251,146,60,.15)" }}>
                <p className="text-orange-400 font-bold text-[10px] mb-2 flex items-center gap-1" style={{ fontFamily: sans }}>
                  <Icon name="warn" size={10} color="#fb923c" /> Watch out
                </p>
                <ul className="space-y-1">
                  {season.cons.map((c, i) => (
                    <li key={i} className="text-white/60 text-[10px] leading-tight" style={{ fontFamily: sans }}>· {c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ── RIGHT : Tours list (3 cols) ── */}
          <div
            className="lg:col-span-3 rounded-3xl overflow-hidden flex flex-col"
            style={{
              background: "rgba(255,255,255,.04)",
              border: "1.5px solid rgba(255,255,255,.08)",
              backdropFilter: "blur(16px)",
            }}
          >
            {/* Header */}
            <div
              className="px-5 py-4 flex items-center justify-between flex-shrink-0"
              style={{ background: `${season.border}12`, borderBottom: `1px solid ${season.border}20` }}
            >
              <div className="flex items-center gap-2">
                <Icon name="calendar" size={16} color={season.border} />
                <h3 className="font-black text-white text-base" style={{ fontFamily: serif }}>
                  Availability — {monthData.full}
                </h3>
              </div>
              <span
                className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                style={{ background: `${season.border}25`, color: season.border, fontFamily: sans }}
              >
                {tours.length} tours
              </span>
            </div>

            {/* Tours list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2" style={{ maxHeight: 380 }}>
              {tours.map((tour, i) => (
                <TourRow
                  key={`${selectedMonth}-${i}`}
                  tour={tour}
                  index={i}
                  vis={contentVis}
                  accentColor={season.border}
                  darkColor={isPeak ? "#14532d" : "#064e3b"}
                />
              ))}
            </div>

            {/* CTA footer */}
            <div
              className="px-5 py-4 flex-shrink-0 flex flex-col sm:flex-row gap-3"
              style={{ borderTop: "1px solid rgba(255,255,255,.07)", background: "rgba(0,0,0,.2)" }}
            >
              <button
                onClick={() => window.open(`https://wa.me/261336640777?text=Hello KiriTour! I would like to book a tour in ${monthData.full}.`, "_blank")}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-sm transition-all duration-300 hover:scale-105 active:scale-95"
                style={{ background: `linear-gradient(135deg,${isPeak ? "#facc15,#f59e0b" : "#34d399,#10b981"})`, color: isPeak ? "#14532d" : "#064e3b", fontFamily: sans, boxShadow: `0 4px 20px ${season.border}40` }}
              >
                <Icon name="whatsapp" size={16} color={isPeak ? "#14532d" : "#064e3b"} />
                Book for {monthData.short}
              </button>
              <button
                onClick={() => window.location.hash = "/tours"}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95"
                style={{ background: "rgba(255,255,255,.08)", color: "rgba(255,255,255,.8)", border: "1px solid rgba(255,255,255,.12)", fontFamily: sans }}
              >
                All tours
                <Icon name="arrow" size={14} color="rgba(255,255,255,.6)" />
              </button>
            </div>
          </div>
        </div>

        {/* ═══ BOTTOM STATS ═══════════════════════════════════════ */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6"
          style={{
            opacity: sectionVis ? 1 : 0,
            transform: sectionVis ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s",
          }}
        >
          {[
            { icon:"star",     val:"4.7★",  label:"Average rating",           color:"#facc15" },
            { icon:"people",   val:"260+",  label:"Happy travellers",    color:"#34d399" },
            { icon:"calendar", val:"14",    label:"Tours available",       color:"#818cf8" },
            { icon:"price",    val:"145€",  label:"From",             color:"#fb923c" },
          ].map((stat, i) => (
            <div key={i}
              className="rounded-2xl p-4 flex items-center gap-3 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,.05)",
                border: `1px solid ${stat.color}20`,
                backdropFilter: "blur(8px)",
              }}
            >
              <div className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center"
                style={{ background: `${stat.color}20` }}>
                <Icon name={stat.icon} size={16} color={stat.color} />
              </div>
              <div>
                <p className="font-black text-white text-base leading-none mb-0.5" style={{ fontFamily: serif, color: stat.color }}>
                  {stat.val}
                </p>
                <p className="text-white/40 text-[10px]" style={{ fontFamily: sans }}>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════ KEYFRAMES ════════════════ */}
      <style>{`
        @keyframes particle-burst {
          0%   { transform: translate(-50%,-50%) scale(1); opacity: 1; }
          100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0); opacity: 0; }
        }
      `}</style>
    </section>
  );
}