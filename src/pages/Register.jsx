import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth, provider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "../firebase/firebaseConfig";

/* ─── Fonts ─────────────────────────────────────────────── */
if (typeof document !== "undefined" && !document.getElementById("kt-fonts")) {
  const l = document.createElement("link");
  l.id = "kt-fonts"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap";
  document.head.appendChild(l);
}

const serif = "'Playfair Display', serif";
const sans  = "'DM Sans', sans-serif";
const WA    = "261336640777";

const firebaseErr = (code) => ({
  "auth/email-already-in-use":   "This email is already registered.",
  "auth/invalid-email":          "Invalid email address.",
  "auth/weak-password":          "Password must be at least 6 characters.",
  "auth/popup-closed-by-user":   "Google sign-in was cancelled.",
  "auth/network-request-failed": "Network error. Check your connection.",
  "auth/too-many-requests":      "Too many attempts. Please wait.",
}[code] || "Something went wrong. Please try again.");

const GoogleIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const EyeIcon = ({ open }) => open ? (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
  </svg>
) : (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
  </svg>
);

function Field({ label, name, type="text", placeholder, value, onChange, icon, rightEl, error }) {
  return (
    <div>
      <label className="block text-xs font-bold text-green-800 mb-1.5 tracking-wide uppercase" style={{ fontFamily:sans }}>{label}</label>
      <div className="relative">
        {icon && <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-green-600 pointer-events-none text-base">{icon}</span>}
        <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} autoComplete="off"
          className={`w-full py-3 pr-10 rounded-xl border-2 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 focus:border-green-600 focus:shadow-[0_0_0_3px_rgba(22,101,52,0.12)] ${error?"border-red-400 bg-red-50":"border-gray-200 bg-white"}`}
          style={{ fontFamily:sans, paddingLeft: icon ? "2.75rem" : "1rem" }} />
        {rightEl && <span className="absolute right-3 top-1/2 -translate-y-1/2">{rightEl}</span>}
      </div>
      {error && <p className="text-red-500 text-[11px] mt-1" style={{ fontFamily:sans }}>{error}</p>}
    </div>
  );
}

function Toast({ msg, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 4500); return () => clearTimeout(t); }, [onClose]);
  const cfg = {
    success: { bg:"#14532d", border:"#facc15", icon:"✅" },
    error:   { bg:"#991b1b", border:"#fca5a5", icon:"❌" },
    info:    { bg:"#1e3a5f", border:"#93c5fd", icon:"ℹ️" },
  }[type] || {};
  return (
    <div className="fixed top-5 right-5 z-[100] flex items-start gap-3 px-5 py-4 rounded-2xl shadow-2xl border max-w-xs"
      style={{ background:cfg.bg, borderColor:cfg.border, animation:"slideIn 0.35s ease" }}>
      <span className="text-lg flex-shrink-0">{cfg.icon}</span>
      <p className="text-white text-sm leading-snug flex-1" style={{ fontFamily:sans }}>{msg}</p>
      <button onClick={onClose} className="text-white/50 hover:text-white text-base ml-1">✕</button>
    </div>
  );
}

function PasswordStrength({ password }) {
  if (!password) return null;
  const checks = [{ ok: password.length >= 6 }, { ok: /[A-Z]/.test(password) }, { ok: /[0-9]/.test(password) }];
  const score  = checks.filter(c => c.ok).length;
  const colors = ["#ef4444","#f97316","#22c55e"];
  return (
    <div className="mt-2">
      <div className="flex gap-1.5 mb-1">
        {[0,1,2].map(i => <div key={i} className="flex-1 h-1.5 rounded-full transition-all" style={{ background: i < score ? colors[score-1] : "#e5e7eb" }} />)}
      </div>
      <div className="flex gap-3">
        {[{l:"6+ chars",ok:checks[0].ok},{l:"Uppercase",ok:checks[1].ok},{l:"Number",ok:checks[2].ok}].map((c,i) => (
          <span key={i} className="text-[10px]" style={{ fontFamily:sans, color: c.ok?"#16a34a":"#9ca3af" }}>{c.ok?"✓":"○"} {c.l}</span>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN
════════════════════════════════════════════════════════════ */
const Register = () => {
  const navigate = useNavigate(); // ← Fix GitHub Pages 404
  const [step,        setStep]       = useState("loading");
  const [isLoading,   setIsLoading]  = useState(false);
  const [showPopup,   setShowPopup]  = useState(false);
  const [showPass,    setShowPass]   = useState(false);
  const [showConfirm, setShowConfirm]= useState(false);
  const [toast,       setToast]      = useState(null);
  const [errors,      setErrors]     = useState({});
  const [userData,    setUserData]   = useState(null);
  const [bgIdx,       setBgIdx]      = useState(0);
  const [formData,    setFormData]   = useState({ username:"", email:"", password:"", confirm:"" });

  const bgImages = [
    "https://i.ibb.co/cSCpRsJ9/LMC-20250706-070913-Color-boost-by-Riyan-1-1-1.jpg",
    "https://i.ibb.co/5xXLDSZQ/20250729-173834.jpg",
    "https://i.ibb.co/4ZMwFVFh/IMG-20251030-WA0008.jpg",
  ];

  useEffect(() => {
    const t = setInterval(() => setBgIdx(p => (p+1) % bgImages.length), 6000);
    return () => clearInterval(t);
  }, []);

  /* ── Firebase auth listener ── */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        setUserData({
          uid:      fbUser.uid,
          username: fbUser.displayName || fbUser.email.split("@")[0],
          email:    fbUser.email,
          avatar:   fbUser.photoURL,
          method:   fbUser.providerData[0]?.providerId === "google.com" ? "google" : "email",
        });
        setStep("success");
      } else {
        setUserData(null);
        setStep("form");
      }
      setIsLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (step === "form") {
      const t = setTimeout(() => setShowPopup(true), 25000);
      return () => clearTimeout(t);
    }
  }, [step]);

  const showToast  = (msg, type="success") => setToast({ msg, type });
  const handleInput = (e) => {
    setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
    setErrors(p => ({ ...p, [e.target.name]:"" }));
  };

  const validate = () => {
    const e = {};
    if (!formData.username.trim()) e.username = "Username is required";
    else if (formData.username.length < 3) e.username = "At least 3 characters";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Invalid email address";
    if (!formData.password) e.password = "Password is required";
    else if (formData.password.length < 6) e.password = "Minimum 6 characters";
    if (formData.password !== formData.confirm) e.confirm = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ── Firebase Email Register ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) { showToast("Please fix the errors below.", "error"); return; }
    setIsLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await updateProfile(cred.user, { displayName: formData.username });
      showToast("Account created! Welcome to KiriTour 🎉", "success");
    } catch (err) {
      showToast(firebaseErr(err.code), "error");
      setIsLoading(false);
    }
  };

  /* ── Firebase Google ── */
  const handleGoogle = async () => {
    setIsLoading(true);
    setShowPopup(false);
    try {
      await signInWithPopup(auth, provider);
      showToast("Signed in with Google! Welcome 🌴", "success");
    } catch (err) {
      showToast(firebaseErr(err.code), "error");
      setIsLoading(false);
    }
  };

  /* ── Sign Out ── */
  const handleSignOut = async () => {
    await signOut(auth);
    showToast("Signed out successfully.", "info");
  };

  /* ── Loading ── */
  if (step === "loading") return (
    <div className="min-h-screen flex items-center justify-center" style={{ background:"linear-gradient(150deg,#052e16,#14532d)" }}>
      <div className="w-10 h-10 border-4 border-yellow-400/30 border-t-yellow-400 rounded-full" style={{ animation:"spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  /* ════════════ SUCCESS ════════════ */
  if (step === "success" && userData) return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background:"linear-gradient(150deg,#052e16 0%,#14532d 50%,#166534 100%)" }}>
      {[600,420,260].map((s,i) => (
        <div key={i} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{ width:s, height:s, border:`1px solid ${i===2?"rgba(250,204,21,0.15)":"rgba(255,255,255,0.04)"}` }} />
      ))}
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="relative z-10 w-full max-w-md" style={{ animation:"fadeUp 0.5s ease" }}>
        <div className="rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.5)] border border-yellow-400/20"
          style={{ background:"rgba(255,255,255,0.97)" }}>

          {/* Header vert */}
          <div className="relative px-8 py-8 text-center" style={{ background:"linear-gradient(135deg,#14532d,#166534)" }}>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage:`url(${bgImages[0]})`, backgroundSize:"cover", backgroundPosition:"center" }} />
            <div className="relative z-10 w-20 h-20 rounded-full mx-auto mb-4 border-4 border-yellow-400 shadow-xl overflow-hidden flex items-center justify-center"
              style={{ background:"linear-gradient(135deg,#052e16,#14532d)" }}>
              {userData.avatar
                ? <img src={userData.avatar} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                : <span className="text-3xl font-black text-yellow-400" style={{ fontFamily:serif }}>{userData.username?.[0]?.toUpperCase() ?? "K"}</span>
              }
            </div>
            <p className="text-yellow-400 text-xs font-bold tracking-widest uppercase mb-1" style={{ fontFamily:sans }}>Welcome to KiriTour</p>
            <h2 className="text-white font-black text-2xl" style={{ fontFamily:serif }}>{userData.username}</h2>
            <p className="text-green-200 text-sm mt-0.5" style={{ fontFamily:sans }}>{userData.email}</p>
            <span className="inline-block mt-3 text-[11px] font-bold px-3 py-1 rounded-full text-green-900"
              style={{ background:"#facc15", fontFamily:sans }}>
              {userData.method === "google" ? "🔷 Google Account" : "📧 Email Account"}
            </span>
          </div>

          {/* Body */}
          <div className="px-8 py-7">
            <div className="grid grid-cols-3 gap-3 mb-7">
              {[{e:"🎁",l:"Special Offers"},{e:"💬",l:"Priority Support"},{e:"⭐",l:"Easy Booking"}].map((b,i) => (
                <div key={i} className="rounded-2xl p-3 text-center border border-green-100" style={{ background:"#f0fdf4" }}>
                  <div className="text-2xl mb-1">{b.e}</div>
                  <p className="text-green-800 text-[11px] font-bold" style={{ fontFamily:sans }}>{b.l}</p>
                </div>
              ))}
            </div>

            {/* ← FIX: useNavigate instead of href (GitHub Pages 404 fix) */}
            <button onClick={() => navigate("/tours")}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-black text-green-900 mb-3 hover:scale-105 transition-all shadow-lg text-sm"
              style={{ background:"linear-gradient(135deg,#facc15,#f59e0b)", fontFamily:sans }}>
              🗺️ Explore Our Tours
            </button>

            <a href={`https://wa.me/${WA}?text=Hello KiriTour!`} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white transition-all text-sm mb-4"
              style={{ fontFamily:sans }}>
              📲 Chat with Us on WhatsApp
            </a>

            <button onClick={handleSignOut}
              className="w-full py-2.5 text-gray-400 hover:text-red-500 text-xs font-semibold transition-colors"
              style={{ fontFamily:sans }}>
              Sign Out
            </button>
          </div>
        </div>
        <p className="text-center text-green-300/50 text-xs mt-5" style={{ fontFamily:sans }}>© 2025 KiriTour Madagascar · Morondava</p>
      </div>

      <style>{`
        @keyframes fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideIn { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
      `}</style>
    </div>
  );

  /* ════════════ FORM ════════════ */
  return (
    <div className="min-h-screen flex relative overflow-hidden">

      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-1/2 flex-col justify-end relative overflow-hidden">
        {bgImages.map((img,i) => (
          <div key={i} className="absolute inset-0 transition-opacity duration-1000"
            style={{ backgroundImage:`url(${img})`, backgroundSize:"cover", backgroundPosition:"center", opacity:i===bgIdx?1:0 }} />
        ))}
        <div className="absolute inset-0" style={{ background:"linear-gradient(to top,rgba(5,46,22,0.92) 0%,rgba(5,46,22,0.3) 60%,transparent 100%)" }} />
        <div className="relative z-10 p-10 pb-14">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-yellow-400 shadow-lg" style={{ background:"linear-gradient(135deg,#14532d,#166534)" }}>
              <span className="text-yellow-400 font-black text-lg" style={{ fontFamily:serif }}>KT</span>
            </div>
            <div>
              <p className="text-white font-black text-lg leading-none" style={{ fontFamily:serif }}>KiriTour</p>
              <p className="text-green-300 text-xs" style={{ fontFamily:sans }}>Madagascar</p>
            </div>
          </div>
          <h2 className="text-white font-black mb-3 leading-none" style={{ fontFamily:serif, fontSize:"clamp(2rem,3.5vw,3rem)" }}>
            Wild. Rare.<br /><em style={{ color:"#facc15" }}>Unforgettable.</em>
          </h2>
          <p className="text-green-200 text-sm mb-8 max-w-xs leading-relaxed" style={{ fontFamily:sans }}>Create your account and unlock Madagascar's best tours.</p>
          <div className="flex flex-wrap gap-3">
            {["⭐ 4.9/5 Rating","🌿 Eco-Responsible","🏆 12+ Years"].map((b,i) => (
              <span key={i} className="text-xs font-bold px-3 py-1.5 rounded-full border border-white/20 text-green-200"
                style={{ background:"rgba(255,255,255,0.08)", fontFamily:sans }}>{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-4 py-10 relative overflow-y-auto"
        style={{ background:"linear-gradient(160deg,#f0fdf4 0%,#ffffff 50%,#f0fdf4 100%)" }}>
        <div className="lg:hidden absolute inset-0 pointer-events-none"
          style={{ backgroundImage:`url(${bgImages[bgIdx]})`, backgroundSize:"cover", backgroundPosition:"center", opacity:0.06 }} />

        <div className="relative z-10 w-full max-w-md">
          <div className="lg:hidden flex items-center justify-center gap-2 mb-7">
            <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-yellow-400" style={{ background:"linear-gradient(135deg,#14532d,#166534)" }}>
              <span className="text-yellow-400 font-black text-sm" style={{ fontFamily:serif }}>KT</span>
            </div>
            <span className="text-green-800 font-black text-xl" style={{ fontFamily:serif }}>KiriTour</span>
          </div>

          <div className="mb-7">
            <p className="text-yellow-600 text-xs font-bold tracking-widest uppercase mb-1" style={{ fontFamily:sans }}>Get Started</p>
            <h1 className="font-black leading-none text-green-900 mb-2" style={{ fontFamily:serif, fontSize:"clamp(1.8rem,4vw,2.5rem)" }}>Create Your Account</h1>
            <p className="text-gray-500 text-sm" style={{ fontFamily:sans }}>Join KiriTour and start planning your Madagascar adventure</p>
          </div>

          <button onClick={handleGoogle} disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl border-2 border-gray-200 bg-white hover:border-green-600 hover:shadow-[0_0_0_3px_rgba(22,101,52,0.1)] font-semibold text-gray-700 text-sm transition-all duration-200 mb-5 disabled:opacity-60"
            style={{ fontFamily:sans }}>
            <GoogleIcon />{isLoading ? "Signing in…" : "Continue with Google"}
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-xs font-semibold tracking-widest uppercase" style={{ fontFamily:sans }}>or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="space-y-4">
            <Field label="Username" name="username" placeholder="e.g. madagascar_explorer" value={formData.username} onChange={handleInput} icon="👤" error={errors.username} />
            <Field label="Email Address" name="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleInput} icon="✉️" error={errors.email} />
            <div>
              <Field label="Password" name="password" type={showPass?"text":"password"} placeholder="Min. 6 characters" value={formData.password} onChange={handleInput} icon="🔒" error={errors.password}
                rightEl={<button type="button" onClick={() => setShowPass(p=>!p)} className="text-gray-400 hover:text-green-700 p-1"><EyeIcon open={showPass} /></button>} />
              <PasswordStrength password={formData.password} />
            </div>
            <Field label="Confirm Password" name="confirm" type={showConfirm?"text":"password"} placeholder="Repeat your password" value={formData.confirm} onChange={handleInput} icon="🔑" error={errors.confirm}
              rightEl={<button type="button" onClick={() => setShowConfirm(p=>!p)} className="text-gray-400 hover:text-green-700 p-1"><EyeIcon open={showConfirm} /></button>} />

            <button onClick={handleSubmit} disabled={isLoading}
              className="w-full py-4 rounded-xl font-black text-green-900 text-sm hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(250,204,21,0.5)] transition-all disabled:opacity-60 mt-1"
              style={{ background:"linear-gradient(135deg,#facc15,#f59e0b)", fontFamily:sans }}>
              {isLoading
                ? <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-green-900/40 border-t-green-900 rounded-full inline-block" style={{ animation:"spin 0.8s linear infinite" }} />Creating…</span>
                : "Create My Account →"}
            </button>

            {/* ← FIX: useNavigate link */}
            <p className="text-center text-gray-500 text-sm pt-1" style={{ fontFamily:sans }}>
              Already have an account?{" "}
              <button onClick={() => navigate("/login")} className="text-green-700 font-bold hover:underline">Login here</button>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="grid grid-cols-3 gap-3">
              {[{e:"🎁",l:"Special Offers",d:"Members-only"},{e:"💰",l:"Best Prices",d:"No hidden fees"},{e:"⭐",l:"Easy Booking",d:"WhatsApp confirmed"}].map((b,i) => (
                <div key={i} className="rounded-2xl p-3 text-center border border-green-100" style={{ background:"#f0fdf4" }}>
                  <div className="text-2xl mb-1.5">{b.e}</div>
                  <p className="text-green-800 text-[11px] font-black mb-0.5" style={{ fontFamily:sans }}>{b.l}</p>
                  <p className="text-gray-400 text-[10px]" style={{ fontFamily:sans }}>{b.d}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-gray-300 text-[11px] mt-6" style={{ fontFamily:sans }}>© 2025 KiriTour Madagascar</p>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background:"rgba(0,0,0,0.85)", backdropFilter:"blur(6px)", animation:"fadeIn 0.3s ease" }}>
          <div className="w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border border-yellow-400/30" style={{ background:"linear-gradient(160deg,#14532d,#166534)", animation:"slideUp 0.4s ease" }}>
            <div className="relative h-36 overflow-hidden">
              <img src={bgImages[1]} alt="" className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0" style={{ background:"linear-gradient(to top,#14532d,transparent)" }} />
              <div className="absolute bottom-3 left-4">
                <p className="text-yellow-400 text-xs font-bold tracking-widest uppercase" style={{ fontFamily:sans }}>Quick Sign Up</p>
                <h3 className="text-white font-black text-xl" style={{ fontFamily:serif }}>Join with One Click</h3>
              </div>
            </div>
            <div className="p-6">
              <button onClick={handleGoogle}
                className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-white font-bold text-gray-700 text-sm mb-3 hover:scale-[1.02] transition-all"
                style={{ fontFamily:sans }}>
                <GoogleIcon /> Continue with Google
              </button>
              <button onClick={() => setShowPopup(false)}
                className="w-full py-3 rounded-xl text-green-300 hover:text-white text-sm font-semibold transition-colors border border-white/15"
                style={{ fontFamily:sans }}>
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <style>{`
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideIn { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
        @keyframes spin    { to{transform:rotate(360deg)} }
      `}</style>
    </div>
  );
};

export default Register;