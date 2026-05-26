import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth, signOut, onAuthStateChanged } from "../../firebase/firebaseConfig";
import {
  FaHome, FaWhatsapp, FaSignOutAlt, FaSignInAlt,
  FaUserPlus, FaTimes, FaCompass, FaImage,
  FaMapMarkedAlt, FaHotel, FaEnvelope, FaQuestionCircle,
  FaFileContract, FaShieldAlt, FaClipboardList,
} from "react-icons/fa";

const HEADER_H = 64; // px — hauteur fixe header

const Header = () => {
  const [user, setUser]           = useState(null);
  const [authLoading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const navigate  = useNavigate();
  const location  = useLocation();
  const drawerRef = useRef(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => { setUser(u || null); setLoading(false); });
    return unsub;
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const fn = (e) => {
      if (menuOpen && drawerRef.current && !drawerRef.current.contains(e.target))
        setMenuOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [menuOpen]);

  const getAbsTop = (el) => { let t = 0; while (el) { t += el.offsetTop || 0; el = el.offsetParent; } return t; };
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: Math.max(0, getAbsTop(el) - HEADER_H), behavior: "smooth" });
  };
  const goScroll = (id) => {
    setMenuOpen(false);
    if (location.pathname !== "/home" && location.pathname !== "/") {
      navigate("/home");
      setTimeout(() => scrollToId(id), 520);
    } else {
      setTimeout(() => scrollToId(id), 50);
    }
  };

  const handleLogout = async () => {
    try { await signOut(auth); } catch (_) {}
    navigate("/home");
    setMenuOpen(false);
  };

  const close    = () => setMenuOpen(false);
  const isActive = (p) => location.pathname === p;
  const isHome   = location.pathname === "/" || location.pathname === "/home";

  const Avatar = ({ size = "sm" }) => (
    <div className={`${size === "sm" ? "w-8 h-8" : "w-10 h-10"} rounded-full overflow-hidden border-2 border-yellow-400 flex-shrink-0 flex items-center justify-center`}
      style={{ background: "linear-gradient(135deg,#14532d,#166534)" }}>
      {user?.photoURL
        ? <img src={user.photoURL} alt="" className="w-full h-full object-cover scale-125" referrerPolicy="no-referrer" />
        : <span className="text-yellow-400 font-black text-sm leading-none">{(user?.displayName || user?.email || "K")[0].toUpperCase()}</span>
      }
    </div>
  );

  const lnkCls = (path) =>
    `relative flex items-center gap-1.5 text-[13px] font-semibold tracking-wide transition-colors duration-200 group whitespace-nowrap
     ${isActive(path) ? "text-yellow-400" : "text-white/85 hover:text-yellow-300"}`;

  const Underline = ({ path }) => (
    <span className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-gradient-to-r from-yellow-400 to-yellow-200 transition-all duration-300
      ${isActive(path) ? "w-full" : "w-0 group-hover:w-full"}`} />
  );

  const btnNavCls = `relative flex items-center gap-1.5 text-[13px] font-semibold tracking-wide transition-colors duration-200 group whitespace-nowrap text-white/85 hover:text-yellow-300 cursor-pointer`;

  /* ── Background header:
     - Home + tsy scroll → transparent (mifanaraka amin'ny hero)
     - Home + scrolled   → dark green
     - Tsy Home          → dark green hatrany
  ── */
  const headerBg = isHome && !scrolled
    ? "rgba(0,0,0,0)"
    : "linear-gradient(135deg,#0d3318 0%,#14532d 50%,#0d3318 100%)";

  const headerShadow = (!isHome || scrolled)
    ? "0 4px 32px rgba(0,0,0,.6)"
    : "none";

  return (
    <>
      {/* ══ FIXED HEADER ═══════════════════════════════════════ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
        style={{
          background: headerBg,
          boxShadow: headerShadow,
          height: HEADER_H,
        }}>

        {/* Top gold line — visible only when scrolled */}
        {(scrolled || !isHome) && (
          <div className="h-[2px] w-full"
            style={{ background: "linear-gradient(90deg,transparent,#facc15 25%,#f59e0b 50%,#facc15 75%,transparent)", opacity: .75 }} />
        )}

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center h-full gap-4 lg:gap-6">

          {/* ── Logo ── */}
          <Link to="/home" onClick={close}
            className="flex items-center gap-2.5 group flex-shrink-0 select-none">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-full bg-yellow-400 transition-shadow duration-300 group-hover:shadow-[0_0_22px_rgba(250,204,21,.7)]"
                style={{ boxShadow: "0 0 12px rgba(250,204,21,.4)" }} />
              <div className="absolute inset-[3px] rounded-full bg-green-900 overflow-hidden">
                <img src="/favicon-192.png" alt="KiriTour" className="w-full h-full object-cover scale-150" />
              </div>
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-green-900"
                style={{ animation: "hdrPing 2.4s ease-in-out infinite" }} />
            </div>
            <div className="leading-none">
              <p className="text-white font-black text-[15px] tracking-wide group-hover:text-yellow-300 transition-colors">KiriTour</p>
              <p className="text-yellow-400/65 text-[9px] font-bold tracking-[.28em] uppercase mt-0.5">Madagascar</p>
            </div>
          </Link>

          <div className="hidden md:block h-7 w-px bg-white/15 flex-shrink-0" />

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-6 flex-1">
            <Link to="/home"    className={lnkCls("/home")}>
              <FaHome    size={11} className="opacity-60 flex-shrink-0" /> Home    <Underline path="/home" />
            </Link>
            <Link to="/tours"   className={lnkCls("/tours")}>
              <FaCompass size={11} className="opacity-60 flex-shrink-0" /> Tours   <Underline path="/tours" />
            </Link>
            <Link to="/about"   className={lnkCls("/about")}>
              <FaImage   size={11} className="opacity-60 flex-shrink-0" /> Gallery <Underline path="/about" />
            </Link>
            <button onClick={() => goScroll("hotel-section")} className={btnNavCls}>
              <FaHotel      size={11} className="opacity-60 flex-shrink-0" /> Hotel
              <span className="absolute -bottom-1 left-0 h-[2px] rounded-full bg-gradient-to-r from-yellow-400 to-yellow-200 w-0 group-hover:w-full transition-all duration-300" />
            </button>
            <button onClick={() => goScroll("map-section")} className={btnNavCls}>
              <FaMapMarkedAlt size={11} className="opacity-60 flex-shrink-0" /> Map
              <span className="absolute -bottom-1 left-0 h-[2px] rounded-full bg-gradient-to-r from-yellow-400 to-yellow-200 w-0 group-hover:w-full transition-all duration-300" />
            </button>
            <Link to="/contact" className={lnkCls("/contact")}>
              <FaEnvelope size={11} className="opacity-60 flex-shrink-0" /> Contact <Underline path="/contact" />
            </Link>
            <Link to="/faq" className={lnkCls("/faq")}>
              <FaQuestionCircle size={11} className="opacity-60 flex-shrink-0" /> FAQ <Underline path="/faq" />
            </Link>
            {/* Legal dropdown */}
            <div className="relative group">
              <button className={btnNavCls}>
                <FaFileContract size={11} className="opacity-60 flex-shrink-0" /> Legal
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-all group-hover:rotate-180 duration-200">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
                <span className="absolute -bottom-1 left-0 h-[2px] rounded-full bg-gradient-to-r from-yellow-400 to-yellow-200 w-0 group-hover:w-full transition-all duration-300" />
              </button>
              <div className="absolute top-full left-0 mt-3 w-52 rounded-2xl overflow-hidden shadow-2xl border border-white/10 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 translate-y-1 group-hover:translate-y-0 z-50"
                style={{ background: "linear-gradient(135deg,#0d3318,#14532d)" }}>
                <div className="p-1.5 space-y-0.5">
                  {[
                    { to:"/privacy",            icon:<FaShieldAlt />,     label:"Privacy Policy"     },
                    { to:"/terms",              icon:<FaFileContract />,  label:"Terms & Conditions" },
                    { to:"/booking-conditions", icon:<FaClipboardList />, label:"Booking Conditions" },
                  ].map((item) => (
                    <Link key={item.to} to={item.to}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-white/80 hover:text-yellow-400 hover:bg-white/8 transition-all">
                      <span className="text-yellow-400/60 text-sm">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* ── Auth desktop ── */}
          <div className="hidden md:flex items-center gap-2.5 flex-shrink-0 ml-auto">
            {!authLoading && (user ? (
              <>
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-full border border-white/20 bg-white/10">
                  <Avatar size="sm" />
                  <span className="text-white text-xs font-semibold max-w-[80px] truncate hidden lg:block">
                    {user.displayName || user.email?.split("@")[0]}
                  </span>
                </div>
                <button onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-white/10 text-white font-bold rounded-full border border-white/20 hover:bg-red-500/25 hover:border-red-400/40 hover:text-red-200 transition-all text-xs">
                  <FaSignOutAlt size={10} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white/85 border border-white/25 rounded-full hover:bg-white/10 hover:text-white transition-all">
                    <FaSignInAlt size={10} /> Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-black bg-yellow-400 text-green-900 rounded-full hover:bg-yellow-300 hover:scale-105 transition-all"
                    style={{ boxShadow: "0 0 14px rgba(250,204,21,.35)" }}>
                    <FaUserPlus size={10} /> Sign Up
                  </button>
                </Link>
              </>
            ))}
          </div>

          {/* ── Burger ── */}
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu"
            className="md:hidden ml-auto w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all flex-shrink-0">
            <span className={`block w-5 h-0.5 bg-yellow-400 rounded-full transition-all origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-5 h-0.5 bg-yellow-400 rounded-full transition-all ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-yellow-400 rounded-full transition-all origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>

        {/* Bottom line */}
        {(scrolled || !isHome) && (
          <div className="h-px w-full"
            style={{ background: "linear-gradient(90deg,transparent,rgba(74,222,128,.25),transparent)" }} />
        )}
      </header>

      {/* ══ SPACER — tsy Home fotsiny ══ */}
      {/* Home page: Hero covers full screen, tsy mila spacer */}
      {!isHome && <div style={{ height: HEADER_H }} aria-hidden="true" />}

      {/* ══ OVERLAY ══ */}
      <div onClick={close}
        className={`fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm transition-opacity duration-300 md:hidden
          ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} />

      {/* ══ MOBILE DRAWER ══ */}
      <div ref={drawerRef}
        className={`fixed top-0 left-0 h-full w-[280px] z-[70] md:hidden flex flex-col
          transition-transform duration-[380ms] ease-[cubic-bezier(.32,.72,0,1)]
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{
          background: "linear-gradient(160deg,#0d3318 0%,#14532d 45%,#166534 75%,#052e16 100%)",
          boxShadow: "10px 0 50px rgba(0,0,0,.65)",
        }}>

        <div className="h-1 w-full" style={{ background: "linear-gradient(90deg,#facc15,#f59e0b,#facc15)" }} />

        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <Link to="/home" onClick={close} className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full bg-yellow-400" style={{ boxShadow: "0 0 16px rgba(250,204,21,.5)" }} />
              <div className="absolute inset-[3px] rounded-full bg-green-900 overflow-hidden">
                <img src="/favicon-192.png" alt="" className="w-full h-full object-cover scale-150" />
              </div>
            </div>
            <div>
              <p className="text-white font-black text-[15px]">KiriTour</p>
              <p className="text-yellow-400/65 text-[9px] font-bold tracking-[.25em] uppercase">Madagascar</p>
            </div>
          </Link>
          <button onClick={close}
            className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/20 transition-all">
            <FaTimes size={12} />
          </button>
        </div>

        {user && (
          <div className="mx-4 mb-3 flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 bg-white/5">
            <Avatar size="md" />
            <div className="min-w-0">
              <p className="text-white font-bold text-sm truncate">{user.displayName || "Traveller"}</p>
              <p className="text-green-300/60 text-xs truncate">{user.email}</p>
            </div>
          </div>
        )}

        <div className="mx-5 h-px mb-2" style={{ background: "linear-gradient(90deg,transparent,rgba(250,204,21,.25),transparent)" }} />

        <nav className="flex flex-col px-3 gap-0.5 flex-1 overflow-y-auto py-1">
          {[
            { to: "/home",               icon: <FaHome />,           label: "Home"               },
            { to: "/tours",              icon: <FaCompass />,        label: "Tours"              },
            { to: "/about",              icon: <FaImage />,          label: "Gallery"            },
            { to: "/contact",            icon: <FaEnvelope />,       label: "Contact"            },
            { to: "/faq",                icon: <FaQuestionCircle />, label: "FAQ"                },
            { to: "/privacy",            icon: <FaShieldAlt />,      label: "Privacy Policy"     },
            { to: "/terms",              icon: <FaFileContract />,   label: "Terms & Conditions" },
            { to: "/booking-conditions", icon: <FaClipboardList />,  label: "Booking Conditions" },
          ].map((item) => (
            <Link key={item.to} to={item.to} onClick={close}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all
                ${isActive(item.to)
                  ? "bg-yellow-400/12 text-yellow-400 border border-yellow-400/20"
                  : "text-white/80 hover:bg-white/8 hover:text-white border border-transparent"}`}>
              <span className={`text-base ${isActive(item.to) ? "text-yellow-400" : "text-green-300/70"}`}>{item.icon}</span>
              {item.label}
              {isActive(item.to) && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-yellow-400" />}
            </Link>
          ))}
          {[
            { id: "hotel-section", icon: <FaHotel />,        label: "Hotel" },
            { id: "map-section",   icon: <FaMapMarkedAlt />, label: "Map"   },
          ].map((item) => (
            <button key={item.id} onClick={() => goScroll(item.id)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm text-white/80 hover:bg-white/8 hover:text-yellow-300 border border-transparent transition-all text-left w-full">
              <span className="text-base text-green-300/70">{item.icon}</span>
              {item.label}
              <span className="ml-auto text-[8px] font-bold tracking-widest uppercase text-yellow-400/45 border border-yellow-400/15 rounded-full px-2 py-0.5">scroll</span>
            </button>
          ))}
        </nav>

        <div className="mx-5 h-px mt-3 mb-3" style={{ background: "linear-gradient(90deg,transparent,rgba(74,222,128,.2),transparent)" }} />

        <div className="px-4 pb-5 flex flex-col gap-2">
          {user ? (
            <button onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm text-white border border-red-400/25 bg-red-500/10 hover:bg-red-500/25 transition-all">
              <FaSignOutAlt /> Logout
            </button>
          ) : (
            <>
              <Link to="/login" onClick={close}>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm text-white/85 border border-white/20 hover:bg-white/10 transition-all">
                  <FaSignInAlt /> Login
                </button>
              </Link>
              <Link to="/register" onClick={close}>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-black text-sm text-green-900 bg-yellow-400 hover:bg-yellow-300 transition-all"
                  style={{ boxShadow: "0 0 16px rgba(250,204,21,.3)" }}>
                  <FaUserPlus /> Create Account
                </button>
              </Link>
            </>
          )}
          <p className="text-center text-white/20 text-[10px] tracking-widest uppercase mt-1">
            © 2025 KiriTour Madagascar
          </p>
        </div>
      </div>

      <style>{`
        @keyframes hdrPing {
          0%,100% { transform:scale(1); opacity:1; }
          50%      { transform:scale(1.8); opacity:0; }
        }
      `}</style>
    </>
  );
};

export default Header;