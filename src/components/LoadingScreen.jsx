import React, { useState, useEffect } from "react";

const serif = "'Playfair Display', serif";
const sans  = "'DM Sans', sans-serif";

/* ═══════════════════════════════════════════════════════════════
   LOADING SCREEN — Fixed overlay (tsy mamorona CLS)
   → Hero eo am-DOM mandrakariva
   → LoadingScreen = overlay fotsiny
   → Rehefa vita → fade out → tsy misy layout shift
═══════════════════════════════════════════════════════════════ */

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage]       = useState(0); // 0=visible, 1=fading, 2=gone

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setStage(1), 150);
          setTimeout(() => setStage(2), 750);
          setTimeout(() => onComplete?.(), 800);
          return 100;
        }
        return Math.min(p + Math.random() * 18, 100);
      });
    }, 70);
    return () => clearInterval(interval);
  }, [onComplete]);

  /* ✅ FIX CLS — tsy return null intsony
     Overlay fotsiny no esorina — Hero eo am-DOM hatrany */
  if (stage === 2) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg,#14532d 0%,#166534 50%,#052e16 100%)",
        opacity: stage === 1 ? 0 : 1,
        transition: "opacity 0.6s ease",
        pointerEvents: stage === 1 ? "none" : "auto",
      }}
    >
      {/* Background rings */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", opacity: 0.1 }}>
        {[600, 400, 250].map((size, i) => (
          <div key={i} style={{
            position: "absolute",
            top: "50%", left: "50%",
            width: size, height: size,
            borderRadius: "50%",
            border: "1px solid #facc15",
            transform: "translate(-50%,-50%)",
            animation: `pulse-ring ${3 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
          }} />
        ))}
      </div>

      {/* Logo spinner */}
      <div style={{ position: "relative", zIndex: 10, marginBottom: 32 }}>
        <div style={{
          width: 112, height: 112,
          borderRadius: "50%",
          border: "4px solid #facc15",
          overflow: "hidden",
          background: "linear-gradient(135deg,#14532d,#166534)",
          animation: "spin 2s linear infinite",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <img
            src="/favicon.svg"
            alt="KiriTour"
            width="112" height="112"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        {/* Orbiting dot */}
        <div style={{
          position: "absolute", top: 0, left: "50%",
          width: 16, height: 16,
          background: "#facc15",
          borderRadius: "50%",
          animation: "orbit 2s linear infinite",
          transformOrigin: "0 56px",
        }} />
      </div>

      {/* Text */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", marginBottom: 24 }}>
        <h2 style={{ color: "#fff", fontFamily: serif, fontSize: 22, fontWeight: 900, margin: "0 0 6px" }}>
          Discovering <span style={{ color: "#facc15" }}>Madagascar</span>
        </h2>
        <p style={{ color: "rgba(187,247,208,0.8)", fontFamily: sans, fontSize: 13, margin: 0 }}>
          Loading your adventure...
        </p>
      </div>

      {/* Progress bar */}
      <div style={{
        position: "relative", zIndex: 10,
        width: 256, height: 8,
        borderRadius: 8,
        background: "rgba(255,255,255,0.1)",
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          borderRadius: 8,
          background: "linear-gradient(90deg,#facc15,#f59e0b)",
          boxShadow: "0 0 20px rgba(250,204,21,0.5)",
          width: `${progress}%`,
          transition: "width 0.3s ease",
        }} />
      </div>

      <p style={{
        position: "relative", zIndex: 10,
        color: "#facc15", fontFamily: sans,
        fontSize: 13, fontWeight: 700, marginTop: 12,
      }}>
        {Math.round(progress)}%
      </p>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(56px); }
          to   { transform: rotate(360deg) translateX(56px); }
        }
        @keyframes pulse-ring {
          0%, 100% { transform: translate(-50%,-50%) scale(1);   opacity: 0.3; }
          50%      { transform: translate(-50%,-50%) scale(1.1); opacity: 0.1; }
        }
      `}</style>
    </div>
  );
}