import React, { useState, useEffect } from "react";
import { auth, onAuthStateChanged } from "../../firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const sans  = "'DM Sans', sans-serif";
const serif = "'Playfair Display', serif";

export default function AutoLoginPrompt() {
  const [show, setShow]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [dismissed, setDism]  = useState(false);
  const [user, setUser]       = useState(null);

  /* ── Watch auth state ── */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
    });
    return unsub;
  }, []);

  /* ── Show popup after 4s if not logged in + not dismissed ── */
  useEffect(() => {
    if (user || dismissed) return;

    /* Check if already dismissed this session */
    const already = sessionStorage.getItem("kt-login-dismissed");
    if (already) return;

    const timer = setTimeout(() => {
      if (!user) setShow(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, [user, dismissed]);

  const dismiss = () => {
    setShow(false);
    setDism(true);
    sessionStorage.setItem("kt-login-dismissed", "1");
  };

  const signInGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setShow(false);
    } catch (err) {
      console.error("Google sign-in error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ── Don't render if logged in or not showing ── */
  if (user || !show) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={dismiss}
        className="fixed inset-0 z-[150] bg-black/40 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Popup */}
      <div
        className="fixed z-[160] shadow-2xl rounded-2xl overflow-hidden"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(420px, 92vw)",
          background: "white",
          animation: "ktSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) both",
        }}
      >
        {/* Green top bar */}
        <div className="h-1.5 w-full"
          style={{ background: "linear-gradient(90deg,#14532d,#facc15,#14532d)" }} />

        {/* Header */}
        <div className="px-6 pt-5 pb-4 flex items-start justify-between"
          style={{ background: "linear-gradient(135deg,#052e16,#14532d)" }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0"
              style={{ border: "2px solid rgba(250,204,21,0.5)" }}>
              <img src="/favicon.svg" alt="KiriTour" className="w-full h-full object-contain" />
            </div>
            <div>
              <p className="text-white font-black text-base leading-tight" style={{ fontFamily: serif }}>
                KiriTour Madagascar
              </p>
              <p className="text-yellow-400/80 text-[10px] tracking-widest uppercase mt-0.5" style={{ fontFamily: sans }}>
                kiritourmadagascar.com
              </p>
            </div>
          </div>
          <button onClick={dismiss}
            className="w-7 h-7 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/15 transition-all flex-shrink-0 mt-0.5"
            aria-label="Close">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <p className="text-gray-700 text-sm leading-relaxed mb-5" style={{ fontFamily: sans }}>
            Sign in to save your favourite tours, track your bookings and get exclusive offers from KiriTour Madagascar.
          </p>

          {/* Google button */}
          <button
            onClick={signInGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl font-semibold text-gray-700 text-sm border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 active:scale-98 transition-all duration-200 mb-3"
            style={{ fontFamily: sans, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            ) : (
              /* Google G icon */
              <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            )}
            {loading ? "Signing in..." : "Continue with Google"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-gray-400 text-xs" style={{ fontFamily: sans }}>or</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Email login button */}
          <a href="/login"
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white text-sm transition-all duration-200 mb-4"
            style={{ background: "linear-gradient(135deg,#14532d,#16a34a)", fontFamily: sans }}>
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
            </svg>
            Sign in with Email
          </a>

          {/* Privacy note */}
          <p className="text-center text-gray-400 text-[11px] leading-relaxed" style={{ fontFamily: sans }}>
            By continuing, kiritourmadagascar.com will share your name, email address and profile photo.
            See our{" "}
            <a href="/privacy" className="text-green-600 hover:underline">Privacy Policy</a>
            {" "}and{" "}
            <a href="/terms" className="text-green-600 hover:underline">Terms</a>.
          </p>
        </div>

        {/* Bottom dismiss */}
        <div className="px-6 pb-5">
          <button onClick={dismiss}
            className="w-full py-2.5 rounded-xl text-sm text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all"
            style={{ fontFamily: sans }}>
            Continue without signing in
          </button>
        </div>
      </div>

      <style>{`
        @keyframes ktSlideUp {
          from { opacity: 0; transform: translate(-50%, -45%); }
          to   { opacity: 1; transform: translate(-50%, -50%); }
        }
      `}</style>
    </>
  );
}