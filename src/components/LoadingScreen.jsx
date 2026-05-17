import React, { useState, useEffect } from "react";

const serif = "'Playfair Display', serif";
const sans  = "'DM Sans', sans-serif";

/* ═══════════════════════════════════════════════════════════════
   LOADING SCREEN — Premium entrance
   Miseho 2-3 segondra alohan'ny hisehoan'ny site
   Ampidiro ao amin'ny App.jsx na Home.jsx
═══════════════════════════════════════════════════════════════ */

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0); // 0=loading, 1=fade-out, 2=hidden

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setStage(1), 200);  // Start fade out
          setTimeout(() => setStage(2), 800);  // Hide completely
          setTimeout(() => onComplete?.(), 900);
          return 100;
        }
        return p + Math.random() * 15;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (stage === 2) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center transition-opacity duration-700 ${
        stage === 1 ? "opacity-0" : "opacity-100"
      }`}
      style={{
        background: "linear-gradient(135deg, #14532d 0%, #166534 50%, #052e16 100%)",
      }}
    >
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        {[600, 400, 250].map((size, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-yellow-400"
            style={{
              width: size,
              height: size,
              animation: `pulse-ring ${3 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Logo spinner */}
   {/* Logo spinner */}
<div className="relative z-10 mb-8">
  <div
    className="w-28 h-28 rounded-full flex items-center justify-center border-4 border-yellow-400 shadow-2xl overflow-hidden"
    style={{
      background: "linear-gradient(135deg, #14532d, #166534)",
      animation: "spin 2s linear infinite",
    }}
  >
    <img
      src="/favicon-192.png"
      alt="Kiritour Logo"
      className="w-full h-full object-cover scale-150"
    />
  </div>

  {/* Orbiting dot */}
  <div
    className="absolute top-0 left-1/2 w-4 h-4 bg-yellow-400 rounded-full shadow-lg"
    style={{
      animation: "orbit 2s linear infinite",
      transformOrigin: "0 56px",
    }}
  />
</div>

      {/* Text */}
      <div className="relative z-10 text-center mb-6">
        <h2
          className="text-white font-black text-2xl mb-2 animate-pulse"
          style={{ fontFamily: serif }}
        >
          Discovering <span style={{ color: "#facc15" }}>Madagascar</span>
        </h2>
        <p className="text-green-200 text-sm" style={{ fontFamily: sans }}>
          Loading your adventure...
        </p>
      </div>

      {/* Progress bar */}
      <div className="relative z-10 w-64 h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
        <div
          className="h-full rounded-full transition-all duration-300 shadow-lg"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #facc15, #f59e0b)",
            boxShadow: "0 0 20px rgba(250,204,21,0.5)",
          }}
        />
      </div>

      {/* Percentage */}
      <p className="relative z-10 text-yellow-400 text-sm font-bold mt-3" style={{ fontFamily: sans }}>
        {Math.round(progress)}%
      </p>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(56px); }
          to { transform: rotate(360deg) translateX(56px); }
        }
        @keyframes pulse-ring {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.1; }
        }
      `}</style>
    </div>
  );
}