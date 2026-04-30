import React, { useState, useEffect } from "react";

const sans = "'DM Sans', sans-serif";
const WA   = "261336640777";
const EMAIL = "tantelinirinanantenaina253@gmail.com";

const waOpen    = (msg) => window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg || "Hello KiriTour!")}`, "_blank");
const emailOpen = ()    => window.open(`mailto:${EMAIL}?subject=Tour%20Enquiry%20—%20KiriTour%20Madagascar`, "_blank");

/* ═══════════════════════════════════════════════════════════════
   FLOATING CONTACT BUTTONS
   — WhatsApp (vert) + Email (bleu) — ambany havanana
   — Hiseho rehefa scroll 300px
   — Tooltip hiseho rehefa hover
═══════════════════════════════════════════════════════════════ */
export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const [pulse,   setPulse]   = useState(true);
  const [waHover, setWaHover] = useState(false);
  const [emHover, setEmHover] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    const t = setTimeout(() => setPulse(false), 8000);
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(t); };
  }, []);

  return (
    <>
      <div
        className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 transition-all duration-500 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
        }`}
      >
        {/* ── Tooltip bubble (hiseho amin'ny 8 segondra voalohany) ── */}
        {pulse && (
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-2xl rounded-br-none text-xs font-bold text-green-900 shadow-lg"
            style={{ background: "#facc15", fontFamily: sans, animation: "fadeInUp 0.5s ease 1s both" }}
          >
            <span>💬</span>
            <span>Hoy izahay!</span>
            <div
              className="absolute -bottom-2 right-4 w-0 h-0"
              style={{ borderLeft: "8px solid transparent", borderTop: "8px solid #facc15" }}
            />
          </div>
        )}

        {/* ── Email button ── */}
        <div className="relative flex items-center">
          {/* Tooltip email */}
          {emHover && (
            <div
              className="absolute right-[72px] whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow-lg"
              style={{ background: "#1d4ed8", fontFamily: sans }}
            >
              Send an Email
              <div
                className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0"
                style={{ borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: "6px solid #1d4ed8" }}
              />
            </div>
          )}

          <button
            onClick={emailOpen}
            onMouseEnter={() => setEmHover(true)}
            onMouseLeave={() => setEmHover(false)}
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all duration-300"
            style={{ background: "linear-gradient(135deg,#2563eb,#1d4ed8)" }}
            aria-label="Contact KiriTour by Email"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </button>
        </div>

        {/* ── WhatsApp button ── */}
        <div className="relative flex items-center">
          {/* Tooltip WhatsApp */}
          {waHover && (
            <div
              className="absolute right-[72px] whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow-lg"
              style={{ background: "#128C7E", fontFamily: sans }}
            >
              Chat on WhatsApp
              <div
                className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0"
                style={{ borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: "6px solid #128C7E" }}
              />
            </div>
          )}

          <button
            onClick={() => waOpen("Hello KiriTour! I'd like to know more about your tours.")}
            onMouseEnter={() => setWaHover(true)}
            onMouseLeave={() => setWaHover(false)}
            className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300"
            style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}
            aria-label="Contact KiriTour on WhatsApp"
          >
            {/* Pulse rings */}
            {pulse && (
              <>
                <span className="absolute inset-0 rounded-full" style={{ background: "rgba(37,211,102,0.35)", animation: "waPulse 2s ease-out infinite" }} />
                <span className="absolute inset-0 rounded-full" style={{ background: "rgba(37,211,102,0.2)",  animation: "waPulse 2s ease-out 0.6s infinite" }} />
              </>
            )}
            {/* WhatsApp icon */}
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white relative z-10">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes waPulse {
          0%   { transform: scale(1);   opacity: 0.7; }
          100% { transform: scale(2.3); opacity: 0;   }
        }
      `}</style>
    </>
  );
}

export default WhatsAppFloat;