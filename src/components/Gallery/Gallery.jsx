import React, { useState, useEffect, useRef, useCallback } from "react";

/* ─── Fonts ───────────────────────────────────────────────────── */
if (typeof document !== "undefined" && !document.getElementById("kt-fonts")) {
  const l = document.createElement("link");
  l.id = "kt-fonts"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap";
  document.head.appendChild(l);
}

const WA    = "261336640777";
const waOpen = (msg) => window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg || "Hello KiriTour!")}`, "_blank");
const serif  = "'Playfair Display', serif";
const sans   = "'DM Sans', sans-serif";

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const allPhotos = [
  { id:1,  src:"https://res.cloudinary.com/dloqrnvp8/image/upload/q_auto/f_auto/v1779708413/Whats-App-Image-2026-05-16-at-16-04-38_g0dvir.jpg",   cat:"tsingy",   title:"Grand Tsingy Pinnacles",   loc:"Tsingy de Bemaraha",   desc:"Les formations karstiques aux arêtes vives du Grand Tsingy, sculptées sur 160 millions d'années." },
  { id:2,  src:"https://res.cloudinary.com/dloqrnvp8/image/upload/q_auto/f_auto/v1779710067/549159438-790143160593489-7850289184231709116-n_ltdpr6.jpg",        cat:"tsingy",   title:"Canyon Views",             loc:"Tsingy de Bemaraha",   desc:"Vue sur les gorges profondes qui divisent le paysage de Tsingy en un monde minéral et alien." },
  { id:3,  src:"https://res.cloudinary.com/dloqrnvp8/image/upload/q_auto/f_auto/v1779710121/487170957-642659705341836-3523930015298641710-n_djmz8l.jpg",    cat:"tsingy",   title:"Petit Tsingy",             loc:"Bekopaka",             desc:"Le Petit Tsingy offre une randonnée plus accessible à travers les spectaculaires formations calcaires." },
  { id:4,  src:"https://res.cloudinary.com/dloqrnvp8/image/upload/q_auto/f_auto/v1779710184/CA-35_rcdb3r.jpg",        cat:"tsingy",   title:"Tsingy Trail",             loc:"Tsingy de Bemaraha",   desc:"Les randonneurs naviguent sur les ponts suspendus et les échelles métalliques du circuit Tsingy." },
  { id:5,  src:"https://res.cloudinary.com/dloqrnvp8/image/upload/q_auto/f_auto/v1779710220/20250729-173834_mx4fmu.jpg",        cat:"baobabs",  title:"Golden Hour Baobabs",      loc:"Avenue des Baobabs",   desc:"L'Avenue des Baobabs s'illumine à l'heure dorée — l'un des paysages les plus photographiés au monde." },
  { id:6,  src:"https://res.cloudinary.com/dloqrnvp8/image/upload/q_auto/f_auto/v1779710268/IMG-20250915-092207_bdrugk.jpg",    cat:"baobabs",  title:"Sunrise Silhouettes",      loc:"Avenue des Baobabs",   desc:"Silhouettes ancestrales de baobabs se dressent contre un ciel pastel au lever du soleil." },
  { id:7,  src:"https://res.cloudinary.com/dloqrnvp8/image/upload/q_auto/f_auto/v1779710357/LMC-20250818-093353-Ultra-Gopix-Colour-Max-LMC8-4-By-tv-techno_ulmtdl.jpg", cat:"baobabs", title:"Baobab Reflections", loc:"Avenue des Baobabs", desc:"Les reflets des baobabs dans les eaux calmes créent un effet miroir surréaliste à l'aube." },
  { id:8,  src:"https://res.cloudinary.com/dloqrnvp8/image/upload/q_auto/f_auto/v1779707849/LMC-20250706-070913-Color-boost-by-Riyan-1-1-1_xkx7gn.jpg", cat:"baobabs", title:"Sunset Colours", loc:"Avenue des Baobabs", desc:"Rêve de photographe — le ciel devient orange fondu derrière des géants baobabs vieux de 800 ans." },
  { id:9,  src:"https://res.cloudinary.com/dloqrnvp8/image/upload/q_auto/f_auto/v1779715833/IMG-20251030-WA0065_kzr2xc.jpg",    cat:"wildlife", title:"Kirindy Forest Floor",     loc:"Kirindy Reserve",      desc:"La forêt sèche décidue dense de Kirindy, dernier bastion de la Fossa insaisissable." },
  { id:10, src:"https://res.cloudinary.com/dloqrnvp8/image/upload/q_auto/f_auto/v1779715888/IMG-20250915-212519_m57mgr.jpg",    cat:"wildlife", title:"Nocturnal Walk",           loc:"Kirindy Reserve",      desc:"Les marches nocturnes à Kirindy révèlent des microcèbes, des caméléons et, avec chance — la Fossa." },
  { id:11, src:"https://res.cloudinary.com/dloqrnvp8/image/upload/q_auto/f_auto/v1779708924/20250817-102639_ejnyox.jpg",        cat:"wildlife", title:"Endemic Wildlife",         loc:"Menabe Region",        desc:"Madagascar abrite des espèces que l'on ne trouve absolument nulle part ailleurs sur Terre." },
  { id:12, src:"https://i.ibb.co/C5CXsY8M/IMG-20251030-WA0106.jpg",   cat:"wildlife", title:"Forest Canopy",            loc:"Kirindy Reserve",      desc:"Vue vers la canopée de la forêt sèche de Kirindy au crépuscule." },
  { id:13, src:"https://res.cloudinary.com/dloqrnvp8/image/upload/q_auto/f_auto/v1779716036/IMG-20240729-WA0030_rlkczz.jpg",   cat:"culture",  title:"Betania Sacred Village",   loc:"Betania, Menabe",      desc:"Le village sacré Sakalava de Betania, où les coutumes ancestrales et les rites sacrés sont préservés." },
  { id:14, src:"https://i.ibb.co/PdpMswT/IMG-20260224-WA0012.jpg",    cat:"culture",  title:"Sakalava Traditions",      loc:"Betania, Menabe",      desc:"Les Sakalava maintiennent des traditions ancestrales et une hospitalité qui accueille les voyageurs." },
  { id:15, src:"https://res.cloudinary.com/dloqrnvp8/image/upload/q_auto/f_auto/v1779716087/sakorkata1_mafxaj.jpg",             cat:"culture",  title:"Local Life",               loc:"Morondava",            desc:"La vie quotidienne à Morondava — une ville côtière où pêche, baobabs et couchers de soleil définissent le rythme." },
  { id:16, src:"https://i.ibb.co/YBswJBfK/IMG-20260224-WA0024.jpg",   cat:"culture",  title:"Mangrove Channels",        loc:"Morondava Delta",      desc:"Navigation dans les canaux de mangroves près de Morondava en pirogue à l'heure dorée." },
  { id:17, src:"https://i.ibb.co/RGFY8hMS/IMG-20260224-WA0047.jpg",   cat:"beach",    title:"Kimony Coastline",         loc:"Kimony Beach",         desc:"Les plages de sable blanc immaculé de Kimony s'étendent le long du canal du Mozambique." },
  { id:18, src:"https://i.ibb.co/LdLR5fWc/IMG-20260224-WA0033.jpg",   cat:"wildlife", title:"Sifaka",                   loc:"Andasibe",             desc:"Un Sifaka se repose dans la canopée, ses yeux dorés scrutant le sous-bois." },
  { id:19, src:"https://i.ibb.co/0yXHktRS/IMG-20260224-WA0034.jpg",   cat:"culture",  title:"Tsiribihina Life",         loc:"Morondava",            desc:"La vie paisible le long de la Tsiribihina, fleuve sacré du peuple Sakalava." },
  { id:20, src:"https://i.ibb.co/M5Q1MzwQ/IMG-20260224-WA0051.jpg",   cat:"beach",    title:"Anosin'Ampela",            loc:"Morondava",            desc:"Une plage préservée à l'entrée du delta de la Tsiribihina, sable blanc et eaux cristallines." },
];

const categories = [
  { id:"all",     label:"Tout",     count: allPhotos.length },
  { id:"tsingy",  label:"Tsingy",   count: allPhotos.filter(p=>p.cat==="tsingy").length },
  { id:"baobabs", label:"Baobabs",  count: allPhotos.filter(p=>p.cat==="baobabs").length },
  { id:"wildlife",label:"Faune",    count: allPhotos.filter(p=>p.cat==="wildlife").length },
  { id:"culture", label:"Culture",  count: allPhotos.filter(p=>p.cat==="culture").length },
  { id:"beach",   label:"Plages",   count: allPhotos.filter(p=>p.cat==="beach").length },
];

const cinematicFilms = [
  {
    id:"f1", title:"Tsingy de Bemaraha", subtitle:"UNESCO World Heritage — Forêt de Pierre",
    duration:"Circuit 3–4 jours", tag:"AVENTURE", tagColor:"#ef4444",
    slides:[
      { src:"https://res.cloudinary.com/dloqrnvp8/image/upload/q_auto/f_auto/v1779708969/IMG-20251030-WA0008_qm0ofg.jpg",   cap:"Les pinnacles calcaires — vieux de 160 millions d'années",   kb:"zoom-in" },
      { src:"https://res.cloudinary.com/dloqrnvp8/image/upload/q_auto/f_auto/v1779716188/20250817-104453_iwuomu.jpg",        cap:"Gorges et canyons sculptés par l'érosion millénaire",        kb:"pan-right" },
      { src:"https://i.ibb.co/fz2RhHKD/IMG-20251030-WA0017.jpg",    cap:"Le Petit Tsingy — accessible à tous les explorateurs",       kb:"zoom-out" },
      { src:"https://res.cloudinary.com/dloqrnvp8/image/upload/q_auto/f_auto/v1779708924/20250817-102639_ejnyox.jpg",        cap:"Vue panoramique au coucher du soleil sur la forêt de pierre", kb:"pan-left" },
    ],
  },
  {
    id:"f2", title:"Avenue des Baobabs", subtitle:"Le paysage le plus iconique de Madagascar",
    duration:"Circuit 1 jour", tag:"ICONIQUE", tagColor:"#f97316",
    slides:[
      { src:"https://i.ibb.co/5xXLDSZQ/20250729-173834.jpg",        cap:"L'heure dorée — le moment le plus photographié de Madagascar",  kb:"zoom-in" },
      { src:"https://i.ibb.co/cSCpRsJ9/LMC-20250706-070913-Color-boost-by-Riyan-1-1-1.jpg", cap:"Ciel en fusion — orange, or et pourpre derrière 800 ans d'histoire", kb:"pan-right" },
      { src:"https://i.ibb.co/S7BJ2yLY/IMG-20250915-092207.jpg",    cap:"Silhouettes à l'aube — la nuit cède sa place au jour",         kb:"zoom-out" },
      { src:"https://i.ibb.co/chb94sk2/LMC-20250818-093353-Ultra-Gopix-Colour-Max-LMC8-4-By-tv-techno.jpg", cap:"Reflets parfaits — l'avenue miroir après les pluies", kb:"pan-left" },
    ],
  },
  {
    id:"f3", title:"Tsiribihina & Kirindy", subtitle:"Descente en pirogue · Faune nocturne",
    duration:"Circuit 3–8 jours", tag:"NATURE", tagColor:"#16a34a",
    slides:[
      { src:"https://i.ibb.co/dJXGhfMn/IMG-20251030-WA0065.jpg",    cap:"La forêt de Kirindy — territoire de la Fossa",              kb:"zoom-in" },
      { src:"https://i.ibb.co/JWDPj8RY/IMG-20250915-212519.jpg",     cap:"Marche nocturne — lémuriens et caméléons sous les étoiles", kb:"pan-right" },
      { src:"https://i.ibb.co/C5CXsY8M/IMG-20251030-WA0106.jpg",    cap:"Canopée dense — biodiversité à 100% endémique",             kb:"zoom-out" },
      { src:"https://i.ibb.co/sdZVvf9S/sakorkata1.jpg",              cap:"Villages Sakalava — hospitalité ancestrale le long du fleuve",kb:"pan-left" },
    ],
  },
];

const awards = [
  { v:"4.7★",  l:"Note Moyenne",           sub:"Tous circuits confondus", color:"#facc15" },
  { v:"260+",  l:"Voyageurs Heureux",       sub:"Depuis 3 ans",           color:"#34d399" },
  { v:"3 ans", l:"D'Expérience Terrain",   sub:"Guides natifs",           color:"#a78bfa" },
  { v:"14",    l:"Tours Disponibles",       sub:"5 destinations",          color:"#fb923c" },
];

const testimonialPhotos = [
  { name:"Sarah J.", country:"🇺🇸", photo:"https://i.ibb.co/mrxKPM2q/20250817-104453.jpg", quote:"Mes plus beaux souvenirs photographiques — à jamais.", tour:"Tsingy 4 Jours" },
  { name:"Marco R.", country:"🇮🇹", photo:"https://i.ibb.co/5xXLDSZQ/20250729-173834.jpg",  quote:"Le coucher sur les baobabs change votre vie, vraiment.", tour:"Baobabs Tour" },
  { name:"Emma W.",  country:"🇬🇧", photo:"https://i.ibb.co/dJXGhfMn/IMG-20251030-WA0065.jpg", quote:"Rien ne vous prépare à voir une Fossa en liberté.", tour:"Kirindy 2 Jours" },
];

/* ═══ HOOKS ══════════════════════════════════════════════════ */
function useInView(t=0.15) {
  const ref=useRef(null); const [vis,setVis]=useState(false);
  useEffect(()=>{
    const o=new IntersectionObserver(([e])=>{ if(e.isIntersecting) setVis(true); },{threshold:t});
    if(ref.current) o.observe(ref.current);
    return ()=>o.disconnect();
  },[t]);
  return [ref,vis];
}

/* ═══ LIGHTBOX ═══════════════════════════════════════════════ */
function Lightbox({ photos, startIndex, onClose }) {
  const [idx,setIdx]=useState(startIndex);
  const p=photos[idx];
  const prev=useCallback(()=>setIdx(i=>(i-1+photos.length)%photos.length),[photos.length]);
  const next=useCallback(()=>setIdx(i=>(i+1)%photos.length),[photos.length]);
  useEffect(()=>{
    document.body.style.overflow="hidden";
    const h=(e)=>{ if(e.key==="ArrowRight") next(); if(e.key==="ArrowLeft") prev(); if(e.key==="Escape") onClose(); };
    window.addEventListener("keydown",h);
    return ()=>{ window.removeEventListener("keydown",h); document.body.style.overflow=""; };
  },[next,prev,onClose]);
  return (
    <div className="fixed inset-0 z-[100] flex flex-col" style={{ background:"rgba(0,0,0,0.97)",backdropFilter:"blur(16px)" }} onClick={onClose}>
      <div className="flex items-center justify-between px-6 py-4 flex-shrink-0 border-b border-white/8" onClick={e=>e.stopPropagation()}>
        <div>
          <p className="text-yellow-400 text-[10px] font-bold tracking-[0.3em] uppercase mb-0.5" style={{fontFamily:sans}}>{p.loc}</p>
          <h3 className="text-white font-black text-lg" style={{fontFamily:serif}}>{p.title}</h3>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white/30 text-sm" style={{fontFamily:sans}}>{idx+1} / {photos.length}</span>
          <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center text-white border border-white/15 hover:bg-white/10 transition-all" style={{background:"rgba(255,255,255,0.06)"}}>✕</button>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center px-14 min-h-0 relative" onClick={e=>e.stopPropagation()}>
        <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white text-2xl border border-white/15 hover:bg-white/10 transition-all z-10" style={{background:"rgba(255,255,255,0.06)"}}>‹</button>
        <img key={idx} src={p.src} alt={p.title} className="max-h-full max-w-full object-contain rounded-2xl shadow-2xl" style={{maxHeight:"calc(100vh - 180px)",animation:"lbIn 0.3s ease"}} onError={e=>{e.target.src="https://i.ibb.co/5xXLDSZQ/20250729-173834.jpg";}} />
        <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white text-2xl border border-white/15 hover:bg-white/10 transition-all z-10" style={{background:"rgba(255,255,255,0.06)"}}>›</button>
      </div>
      <div className="flex-shrink-0 px-5 py-4 border-t border-white/8" onClick={e=>e.stopPropagation()}>
        <p className="text-white/45 text-xs text-center mb-3 max-w-xl mx-auto" style={{fontFamily:sans}}>{p.desc}</p>
        <div className="flex gap-2 justify-center overflow-x-auto pb-1">
          {photos.map((ph,i)=>(
            <button key={i} onClick={()=>setIdx(i)} className={`flex-shrink-0 w-11 h-11 rounded-lg overflow-hidden transition-all duration-200 ${i===idx?"ring-2 ring-yellow-400 scale-110":"opacity-35 hover:opacity-65"}`}>
              <img src={ph.src} alt="" className="w-full h-full object-cover" onError={e=>{e.target.style.display="none";}} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══ CINEMATIC FILM PLAYER ═══════════════════════════════════ */
function CinematicFilm({ film, index }) {
  const [ref, vis] = useInView(0.15);
  const [slide, setSlide]       = useState(0);
  const [playing, setPlaying]   = useState(false);
  const [progress, setProgress] = useState(0);
  const [fading, setFading]     = useState(false);
  const [ctrlVis, setCtrlVis]   = useState(true);

  const SLIDE_MS = 4500;
  const rafRef   = useRef(null);
  const t0Ref    = useRef(null);
  const slRef    = useRef(slide);
  slRef.current  = slide;

  const stopRaf = useCallback(() => cancelAnimationFrame(rafRef.current), []);

  const transitionTo = useCallback((next) => {
    setFading(true);
    setTimeout(() => { setSlide(next); setProgress(0); t0Ref.current = null; setFading(false); }, 400);
  }, []);

  const tick = useCallback((ts) => {
    if (!t0Ref.current) t0Ref.current = ts;
    const elapsed = ts - t0Ref.current;
    const pct = Math.min((elapsed / SLIDE_MS) * 100, 100);
    setProgress(pct);
    if (pct >= 100) {
      const next = (slRef.current + 1) % film.slides.length;
      transitionTo(next);
      t0Ref.current = null;
    }
    rafRef.current = requestAnimationFrame(tick);
  }, [film.slides.length, transitionTo]);

  const play = useCallback(() => {
    setPlaying(true);
    t0Ref.current = null;
    rafRef.current = requestAnimationFrame(tick);
    setTimeout(() => setCtrlVis(false), 2200);
  }, [tick]);

  const pause = useCallback(() => {
    setPlaying(false);
    stopRaf();
    setCtrlVis(true);
  }, [stopRaf]);

  useEffect(() => () => stopRaf(), [stopRaf]);

  const kbClass = { "zoom-in":"kb-zoom-in","zoom-out":"kb-zoom-out","pan-right":"kb-pan-right","pan-left":"kb-pan-left" };
  const cur = film.slides[slide];

  return (
    <div ref={ref}
      className="overflow-hidden rounded-3xl shadow-2xl"
      style={{ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(60px)", transition:`opacity 0.8s ease ${index*0.15}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${index*0.15}s` }}
      onMouseEnter={() => playing && setCtrlVis(true)}
      onMouseLeave={() => playing && setTimeout(() => setCtrlVis(false), 1800)}
    >
      {/* ── Image stage ── */}
      <div className="relative overflow-hidden" style={{aspectRatio:"16/9"}}>

        {film.slides.map((s,i) => (
          <div key={i} className="absolute inset-0" style={{ zIndex:i===slide?1:0, opacity:i===slide&&!fading?1:0, transition:"opacity 0.4s ease" }}>
            <div className="absolute inset-0"
              style={{ backgroundImage:`url(${s.src})`, backgroundSize:"cover", backgroundPosition:"center",
                animation: playing&&i===slide ? `${kbClass[s.kb]||"kb-zoom-in"} ${SLIDE_MS}ms ease-out forwards` : "none" }} />
          </div>
        ))}

        {/* flash on transition */}
        <div className="absolute inset-0 pointer-events-none z-10" style={{ background:"black", opacity:fading?0.5:0, transition:"opacity 0.4s ease" }} />

        {/* Letterbox */}
        <div className="absolute top-0 left-0 right-0 z-10 pointer-events-none" style={{height:"9%",background:"rgba(0,0,0,0.72)"}} />
        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none" style={{height:"9%",background:"rgba(0,0,0,0.72)"}} />

        {/* Main gradient */}
        <div className="absolute inset-0 z-10 pointer-events-none" style={{background:"linear-gradient(to top,rgba(0,0,0,0.82) 0%,rgba(0,0,0,0.08) 45%,rgba(0,0,0,0.28) 100%)"}} />

        {/* TAG */}
        <div className="absolute top-10 left-5 z-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-[10px] font-black tracking-widest uppercase"
            style={{background:film.tagColor,fontFamily:sans}}>
            <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
            {film.tag}
          </span>
        </div>

        {/* Dot indicators */}
        <div className="absolute top-10 right-5 z-20 flex gap-1.5">
          {film.slides.map((_,i) => (
            <button key={i}
              onClick={() => { if(playing){stopRaf();transitionTo(i);setTimeout(()=>{t0Ref.current=null;rafRef.current=requestAnimationFrame(tick);},500);} else transitionTo(i); }}
              className="rounded-full transition-all duration-300"
              style={{width:i===slide?22:8, height:8, background:i===slide?"#facc15":"rgba(255,255,255,0.38)"}} />
          ))}
        </div>

        {/* Caption */}
        <div className="absolute bottom-10 left-5 right-5 z-20"
          style={{opacity:ctrlVis||!playing?1:0.6, transition:"opacity 0.5s ease"}}>
          <p className="text-white/90 text-xs md:text-sm leading-relaxed"
            style={{fontFamily:sans, textShadow:"0 2px 12px rgba(0,0,0,0.9)"}}>
            {cur.cap}
          </p>
        </div>

        {/* PLAY OVERLAY */}
        {!playing && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center" style={{background:"rgba(0,0,0,0.38)"}}>
            <div className="text-center mb-7">
              <h3 className="text-white font-black text-xl md:text-2xl lg:text-3xl mb-1.5" style={{fontFamily:serif,textShadow:"0 4px 24px rgba(0,0,0,0.8)"}}>{film.title}</h3>
              <p className="text-yellow-400/90 text-xs tracking-[0.25em] uppercase" style={{fontFamily:sans}}>{film.subtitle}</p>
            </div>
            <button onClick={play}
              className="relative w-20 h-20 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300"
              style={{background:"rgba(250,204,21,0.95)"}}>
              <span className="absolute inset-0 rounded-full border-2 border-yellow-300/50" style={{animation:"filmRipple 2s ease-out infinite"}} />
              <span className="absolute inset-0 rounded-full border-2 border-yellow-300/30" style={{animation:"filmRipple 2s ease-out 0.7s infinite"}} />
              <svg viewBox="0 0 24 24" fill="#14532d" className="w-9 h-9 relative z-10 ml-1.5">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
            <p className="text-white/40 text-xs mt-4" style={{fontFamily:sans}}>Cliquez pour lancer le diaporama</p>
          </div>
        )}

        {/* PAUSE CONTROL */}
        {playing && (
          <div className="absolute inset-0 z-20 flex items-center justify-center"
            style={{opacity:ctrlVis?1:0,transition:"opacity 0.5s ease",pointerEvents:ctrlVis?"auto":"none"}}>
            <button onClick={pause}
              className="w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 transition-all border border-white/20"
              style={{background:"rgba(0,0,0,0.6)",backdropFilter:"blur(10px)"}}>
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            </button>
          </div>
        )}

        {/* PROGRESS BAR */}
        {playing && (
          <div className="absolute bottom-0 left-0 right-0 z-30" style={{height:3}}>
            <div style={{width:`${progress}%`,height:"100%",background:"linear-gradient(90deg,#facc15,#fbbf24)",boxShadow:"0 0 10px rgba(250,204,21,0.9)",transition:"none"}} />
          </div>
        )}
      </div>

      {/* Info footer */}
      <div className="p-5 flex items-center justify-between gap-4" style={{background:"linear-gradient(135deg,#0a2415,#071a0e)"}}>
        <div>
          <h4 className="text-white font-black text-sm mb-0.5" style={{fontFamily:serif}}>{film.title}</h4>
          <p className="text-green-400/60 text-xs" style={{fontFamily:sans}}>{film.duration} · {film.slides.length} scènes</p>
        </div>
        <button onClick={()=>waOpen(`Hello KiriTour! I'd like to book the ${film.title} tour.`)}
          className="flex-shrink-0 px-5 py-2.5 rounded-full font-bold text-green-900 text-xs hover:scale-105 active:scale-95 transition-all shadow-lg"
          style={{background:"linear-gradient(135deg,#facc15,#f59e0b)",fontFamily:sans}}>
          Réserver →
        </button>
      </div>
    </div>
  );
}

/* ═══ MASONRY GRID ═══════════════════════════════════════════ */
function MasonryGrid({ photos, onOpen }) {
  const cols=[[],[],[]];
  photos.forEach((p,i)=>cols[i%3].push({...p,originalIndex:i}));
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      {cols.map((col,ci)=>(
        <div key={ci} className="flex flex-col gap-3 md:gap-4">
          {col.map((photo,pi)=>{
            const tall=(ci===0&&pi%3===0)||(ci===1&&pi%3===1)||(ci===2&&pi%3===2);
            return (
              <div key={photo.id} onClick={()=>onOpen(photo.originalIndex)}
                className="relative overflow-hidden rounded-2xl cursor-pointer group shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                style={{aspectRatio:tall?"4/5":"4/3"}}>
                <img src={photo.src} alt={photo.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={e=>{e.target.src="https://i.ibb.co/5xXLDSZQ/20250729-173834.jpg";}} />
                <div className="absolute inset-0 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-400"
                  style={{background:"linear-gradient(to top,rgba(0,0,0,0.72) 0%,transparent 50%)"}} />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:translate-y-2 md:group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-yellow-400 text-[9px] font-bold tracking-widest uppercase mb-0.5" style={{fontFamily:sans}}>{photo.loc}</p>
                  <h4 className="text-white font-black text-sm leading-tight" style={{fontFamily:serif}}>{photo.title}</h4>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100"
                  style={{background:"rgba(250,204,21,0.92)"}}>
                  <svg viewBox="0 0 20 20" fill="#14532d" className="w-4 h-4"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/></svg>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ═══ HERO SLIDESHOW ════════════════════════════════════════ */
function HeroSlideshow() {
  const hp=allPhotos.slice(0,5);
  const [cur,setCur]=useState(0);
  const [lbIdx,setLbIdx]=useState(null);
  useEffect(()=>{ const t=setInterval(()=>setCur(p=>(p+1)%hp.length),5500); return()=>clearInterval(t); },[]);
  return (
    <section className="relative overflow-hidden" style={{height:"88vh",minHeight:"540px",maxHeight:"820px"}}>
      {hp.map((p,i)=>(
        <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i===cur?"opacity-100":"opacity-0"}`}
          style={{backgroundImage:`url(${p.src})`,backgroundSize:"cover",backgroundPosition:"center",animation:i===cur?"heroKB 8s ease-out both":"none"}}>
          <div className="absolute inset-0" style={{background:"linear-gradient(to bottom,rgba(0,0,0,0.12) 0%,rgba(0,0,0,0.5) 55%,rgba(0,0,0,0.82) 100%)"}} />
        </div>
      ))}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 backdrop-blur-md" style={{background:"rgba(255,255,255,0.08)"}}>
          <span className="w-2 h-2 rounded-full bg-yellow-400" style={{animation:"heroPing 2s infinite"}} />
          <span className="text-white/85 text-xs font-semibold tracking-widest uppercase" style={{fontFamily:sans}}>{hp[cur].loc}</span>
        </div>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10 text-center">
        <p className="text-yellow-400 text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-5" style={{fontFamily:sans}}>KiriTour Madagascar</p>
        <h1 style={{fontFamily:serif,fontSize:"clamp(3rem,9vw,7rem)",fontWeight:900,lineHeight:0.92,color:"#fff",textShadow:"0 4px 50px rgba(0,0,0,0.6)",letterSpacing:"-0.02em"}} className="mb-4">
          À Travers<br /><em style={{color:"#facc15"}}>Notre Objectif</em>
        </h1>
        <p className="text-white/65 text-sm md:text-base max-w-sm mb-10" style={{fontFamily:sans}}>{hp[cur].title} — {hp[cur].desc?.slice(0,65)}…</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={()=>setLbIdx(cur)}
            className="px-8 py-3.5 rounded-full font-black text-green-900 text-sm hover:scale-105 active:scale-95 transition-all"
            style={{background:"linear-gradient(135deg,#facc15,#f59e0b)",boxShadow:"0 0 30px rgba(250,204,21,0.4)",fontFamily:sans}}>
            Voir en plein écran
          </button>
          <button onClick={()=>document.getElementById("gallery-grid")?.scrollIntoView({behavior:"smooth"})}
            className="px-8 py-3.5 rounded-full font-semibold text-white border-2 border-white/20 hover:bg-white/10 transition-all text-sm"
            style={{fontFamily:sans}}>
            Parcourir la galerie ↓
          </button>
        </div>
      </div>
      {[["left-4","‹",p=>(p-1+hp.length)%hp.length],["right-4","›",p=>(p+1)%hp.length]].map(([pos,chr,fn],i)=>(
        <button key={i} onClick={()=>setCur(fn)} className={`absolute ${pos} top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center text-white text-xl border border-white/10 transition-all hover:bg-white/15`} style={{background:"rgba(0,0,0,0.4)"}}>{chr}</button>
      ))}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {hp.map((_,i)=>(
          <button key={i} onClick={()=>setCur(i)} className="rounded-full transition-all duration-300"
            style={{width:i===cur?28:10,height:10,background:i===cur?"#facc15":"rgba(255,255,255,0.3)"}} />
        ))}
      </div>
      {lbIdx!==null && <Lightbox photos={hp} startIndex={lbIdx} onClose={()=>setLbIdx(null)} />}
    </section>
  );
}

/* ═══ MAIN PAGE ════════════════════════════════════════════ */
export default function Gallery() {
  const [cat,setCat]=useState("all");
  const [lbIdx,setLbIdx]=useState(null);
  const filtered=cat==="all"?allPhotos:allPhotos.filter(p=>p.cat===cat);
  const openLb=useCallback(i=>setLbIdx(i),[]);
  const [gridRef,gridVis]=useInView(0.1);
  const [testRef,testVis]=useInView(0.1);

  return (
    <div className="min-h-screen" style={{background:"#fafaf8",fontFamily:sans}}>

      {/* 1. HERO */}
      <HeroSlideshow />

      {/* 2. STATS STRIP */}
      <section className="py-14 px-4" style={{background:"linear-gradient(135deg,#020d06,#0a2415,#071a0e)"}}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {awards.map((s,i)=>(
            <div key={i} className="group hover:-translate-y-1 transition-transform duration-300">
              <div className="text-3xl md:text-4xl font-black mb-1" style={{fontFamily:serif,color:s.color}}>{s.v}</div>
              <p className="text-white text-sm font-bold mb-0.5" style={{fontFamily:sans}}>{s.l}</p>
              <p className="text-green-400/50 text-xs" style={{fontFamily:sans}}>{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ABOUT */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-yellow-600 text-xs font-bold tracking-widest uppercase mb-3" style={{fontFamily:sans}}>Derrière l'Objectif</p>
            <h2 style={{fontFamily:serif,color:"#14532d",fontSize:"clamp(1.8rem,3.5vw,2.8rem)",lineHeight:1.12}} className="font-black mb-5">
              Chaque Photo<br/>Raconte une Histoire
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4 text-sm" style={{fontFamily:sans}}>
              Ces photographies ont été capturées lors de nos tours dans la région Menabe — par nos guides, nos voyageurs et notre équipe. Chaque image est un moment réel : non posé, non filtré, irremplaçable.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8 text-sm" style={{fontFamily:sans}}>
              Des formations calcaires du Tsingy aux silhouettes ancestrales de l'Avenue des Baobabs — voici Madagascar tel qu'il est vraiment. Sauvage, brut et extraordinaire.
            </p>
            <button onClick={()=>waOpen("Hello KiriTour! Je voudrais réserver un tour pour créer mes propres souvenirs.")}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-white text-sm hover:scale-105 active:scale-95 transition-all shadow-xl"
              style={{background:"linear-gradient(135deg,#166534,#15803d)",fontFamily:sans}}>
              📲 Créez Vos Propres Souvenirs
            </button>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img src="https://i.ibb.co/cSCpRsJ9/LMC-20250706-070913-Color-boost-by-Riyan-1-1-1.jpg" alt="Featured" className="w-full h-full object-cover" />
              <div className="absolute inset-0 rounded-3xl" style={{background:"linear-gradient(to top,rgba(5,46,22,0.5),transparent 55%)"}} />
            </div>
            <div className="absolute -bottom-5 -left-5 rounded-2xl px-5 py-3.5 shadow-2xl" style={{background:"linear-gradient(135deg,#14532d,#166534)",border:"1px solid rgba(250,204,21,0.2)"}}>
              <p className="text-yellow-400 font-black text-xl" style={{fontFamily:serif}}>4.7 ★</p>
              <p className="text-green-200 text-xs" style={{fontFamily:sans}}>260+ voyageurs</p>
            </div>
            <div className="absolute -top-4 -right-4 rounded-2xl px-4 py-3 shadow-xl border border-gray-100" style={{background:"white"}}>
              <p className="text-green-800 font-black text-sm" style={{fontFamily:serif}}>3 ans</p>
              <p className="text-gray-400 text-xs" style={{fontFamily:sans}}>d'expérience</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GALLERY GRID */}
      <section id="gallery-grid" ref={gridRef} className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
            style={{opacity:gridVis?1:0,transform:gridVis?"translateY(0)":"translateY(30px)",transition:"all 0.7s ease"}}>
            <div>
              <p className="text-yellow-600 text-xs font-bold tracking-widest uppercase mb-1" style={{fontFamily:sans}}>Photo Gallery</p>
              <h2 style={{fontFamily:serif,color:"#14532d"}} className="text-3xl md:text-5xl font-black">Explorer par Destination</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(c=>(
                <button key={c.id} onClick={()=>setCat(c.id)}
                  className="px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 hover:scale-105"
                  style={{background:cat===c.id?"#facc15":"white",color:cat===c.id?"#14532d":"#6b7280",border:cat===c.id?"2px solid #facc15":"2px solid #e5e7eb",fontFamily:sans,boxShadow:cat===c.id?"0 0 16px rgba(250,204,21,0.35)":"none"}}>
                  {c.label} <span className="opacity-50">({c.count})</span>
                </button>
              ))}
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-8" style={{fontFamily:sans}}>
            Affichage de <strong style={{color:"#14532d"}}>{filtered.length}</strong> photos
            {cat!=="all" && <> dans <strong style={{color:"#14532d"}}>{categories.find(c=>c.id===cat)?.label}</strong></>}
          </p>
          <MasonryGrid photos={filtered} onOpen={openLb} />
        </div>
      </section>

      {/* 5. ★★★ CINEMATIC DIAPORAMAS ★★★ */}
      <section className="py-20 px-4 relative overflow-hidden" style={{background:"linear-gradient(160deg,#020d06 0%,#071a0e 40%,#0a2415 70%,#020d06 100%)"}}>
        <div className="absolute inset-0 pointer-events-none opacity-15"
          style={{backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",backgroundSize:"180px"}} />
        <div className="absolute top-0 left-0 right-0 h-px" style={{background:"linear-gradient(90deg,transparent,rgba(250,204,21,0.4),transparent)"}} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-400/20 mb-6"
              style={{background:"rgba(250,204,21,0.06)",fontFamily:sans}}>
              <span className="w-2 h-2 rounded-full bg-red-500" style={{animation:"filmRipple 1.5s ease-out infinite"}} />
              <span className="text-yellow-400 text-[10px] font-bold tracking-widest uppercase">Diaporamas Cinématiques</span>
            </div>
            <h2 className="text-white font-black mb-4" style={{fontFamily:serif,fontSize:"clamp(2rem,5vw,3.5rem)",lineHeight:0.95,letterSpacing:"-0.02em"}}>
              Vivez Nos Tours<br /><em style={{color:"#facc15"}}>En Images</em>
            </h2>
            <p className="text-green-300/60 text-sm md:text-base max-w-xl mx-auto" style={{fontFamily:sans}}>
              Cliquez <strong className="text-yellow-400">▶</strong> pour lancer le diaporama — animation Ken Burns, transitions cinématiques, barre de progression en temps réel.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {cinematicFilms.map((film,i)=><CinematicFilm key={film.id} film={film} index={i} />)}
          </div>
          <div className="mt-14 text-center">
            <button onClick={()=>waOpen("Hello KiriTour! Je voudrais voir plus de photos de vos tours.")}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-black text-green-900 text-sm hover:scale-105 transition-all shadow-2xl"
              style={{background:"linear-gradient(135deg,#facc15,#f59e0b)",boxShadow:"0 8px 40px rgba(250,204,21,0.3)",fontFamily:sans}}>
              📲 Demander Plus de Photos via WhatsApp
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{background:"linear-gradient(90deg,transparent,rgba(52,211,153,0.3),transparent)"}} />
      </section>

      {/* 6. PHOTO TIPS */}
      <section className="py-16 px-4 relative overflow-hidden" style={{background:"linear-gradient(135deg,#052e16,#14532d,#166534)"}}>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <p className="text-yellow-400 text-xs font-bold tracking-widest uppercase mb-2" style={{fontFamily:sans}}>Pro Tips</p>
            <h2 style={{fontFamily:serif}} className="text-2xl md:text-3xl font-black text-white">Photographier Madagascar</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {col:"#facc15",tip:"Heure Dorée",   desc:"Baobabs — arrivez 45 min avant le coucher du soleil. La lumière transforme l'avenue en or pur."},
              {col:"#818cf8",tip:"Marches Nocturnes",desc:"Kirindy la nuit : torche rouge uniquement. ISO 3200 minimum pour votre appareil."},
              {col:"#4ade80",tip:"Faune Sauvage",  desc:"Restez immobile et patient. La Fossa inspecte les observateurs curieux sans mouvement."},
              {col:"#fb923c",tip:"Tsingy",          desc:"Photographiez à 7h avant les foules. La lumière rasante crée des ombres spectaculaires."},
            ].map((t,i)=>(
              <div key={i} className="rounded-2xl p-5 border border-white/10 hover:border-yellow-400/30 group transition-all duration-300 hover:-translate-y-1"
                style={{background:"rgba(255,255,255,0.05)",backdropFilter:"blur(12px)"}}>
                <div className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{background:`${t.col}20`,border:`1.5px solid ${t.col}40`}}>
                  <div className="w-3 h-3 rounded-full" style={{background:t.col}} />
                </div>
                <h3 className="font-black text-base mb-2" style={{fontFamily:serif,color:t.col}}>{t.tip}</h3>
                <p className="text-green-200/65 text-xs leading-relaxed" style={{fontFamily:sans}}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section ref={testRef} className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-yellow-600 text-xs font-bold tracking-widest uppercase mb-2" style={{fontFamily:sans}}>Moments Voyageurs</p>
            <h2 style={{fontFamily:serif,color:"#14532d"}} className="text-2xl md:text-4xl font-black">Leurs Mots, Leurs Photos</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonialPhotos.map((t,i)=>(
              <div key={i} className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-400 border border-gray-100"
                style={{opacity:testVis?1:0,transform:testVis?"translateY(0)":"translateY(30px)",transition:`opacity 0.6s ease ${i*0.15}s, transform 0.6s ease ${i*0.15}s`}}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={t.photo} alt={t.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0" style={{background:"linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 50%)"}} />
                  <div className="absolute bottom-3 left-4">
                    <p className="text-white font-black text-sm" style={{fontFamily:serif}}>{t.name} {t.country}</p>
                    <p className="text-yellow-400 text-xs" style={{fontFamily:sans}}>{t.tour}</p>
                  </div>
                </div>
                <div className="bg-white p-5">
                  <div className="flex gap-0.5 mb-3">{[...Array(5)].map((_,j)=><span key={j} className="text-yellow-400 text-sm">★</span>)}</div>
                  <p className="text-gray-600 text-sm italic leading-relaxed" style={{fontFamily:serif}}>« {t.quote} »</p>
                  <p className="text-green-600 text-xs font-bold mt-3 flex items-center gap-1.5" style={{fontFamily:sans}}>
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    Voyageur Vérifié
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. SHARE CTA */}
      <section className="py-16 px-4" style={{background:"#f0fdf4"}}>
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl overflow-hidden relative shadow-2xl" style={{background:"linear-gradient(135deg,#14532d,#15803d)",minHeight:260}}>
            <div className="absolute inset-0 opacity-10" style={{backgroundImage:"url(https://i.ibb.co/5xXLDSZQ/20250729-173834.jpg)",backgroundSize:"cover",backgroundPosition:"center"}} />
            <div className="absolute inset-0 opacity-20" style={{backgroundImage:"radial-gradient(circle at 80% 50%,#facc15 0%,transparent 50%)"}} />
            <div className="relative z-10 p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <p className="text-yellow-400 text-xs font-bold tracking-widest uppercase mb-2" style={{fontFamily:sans}}>📸 Partagez Vos Shots</p>
                <h2 className="text-white font-black mb-3" style={{fontFamily:serif,fontSize:"clamp(1.5rem,3vw,2.2rem)",lineHeight:1.2}}>
                  Vous avez photographié<br />sur un KiriTour ?
                </h2>
                <p className="text-green-200 text-sm max-w-sm" style={{fontFamily:sans}}>
                  Envoyez vos meilleures photos via WhatsApp — nous publions les photos de voyageurs dans notre galerie et nos réseaux sociaux.
                </p>
              </div>
              <div className="flex flex-col gap-3 flex-shrink-0">
                <button onClick={()=>waOpen("Hello KiriTour! Je voudrais partager mes photos de voyage avec vous.")}
                  className="px-8 py-4 rounded-full font-black text-green-900 hover:scale-105 active:scale-95 transition-all shadow-lg text-sm"
                  style={{background:"linear-gradient(135deg,#facc15,#f59e0b)",fontFamily:sans}}>
                  📲 Envoyer Mes Photos
                </button>
                <button onClick={()=>waOpen("Hello KiriTour! Je voudrais réserver un tour.")}
                  className="px-8 py-4 rounded-full font-bold text-white border-2 border-white/25 hover:bg-white/10 transition-all text-sm"
                  style={{fontFamily:sans}}>
                  Réserver un Tour →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="py-20 px-4 relative overflow-hidden" style={{background:"linear-gradient(150deg,#020d06,#0a2415,#020d06)"}}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[600,420,260].map((s,i)=>(
            <div key={i} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{width:s,height:s,border:`1px solid ${i===2?"rgba(250,204,21,0.08)":"rgba(255,255,255,0.03)"}`}} />
          ))}
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <span className="inline-block px-5 py-2 rounded-full text-yellow-400 text-xs font-bold tracking-widest uppercase border border-yellow-400/25 mb-8"
            style={{background:"rgba(250,204,21,0.06)",fontFamily:sans}}>
            🌴 Écrivez Votre Propre Histoire
          </span>
          <h2 className="text-white font-black leading-none mb-5"
            style={{fontFamily:serif,fontSize:"clamp(2rem,5vw,3.5rem)",letterSpacing:"-0.02em"}}>
            Soyez dans la<br /><em style={{color:"#facc15"}}>Prochaine Galerie.</em>
          </h2>
          <p className="text-green-200/70 text-base md:text-lg mb-10 leading-relaxed max-w-xl mx-auto" style={{fontFamily:sans}}>
            Chaque photo de cette galerie a été prise par quelqu'un qui a choisi de venir. Votre aventure — et vos photos — vous attendent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <button onClick={()=>waOpen("Hello KiriTour! Je voudrais réserver un tour et créer des souvenirs.")}
              className="px-10 py-5 rounded-full font-black text-green-900 text-base hover:scale-105 active:scale-95 transition-all"
              style={{background:"linear-gradient(135deg,#facc15,#f59e0b)",boxShadow:"0 0 40px rgba(250,204,21,0.3)",fontFamily:sans}}>
              📲 Réserver Mon Aventure
            </button>
            <button onClick={()=>document.getElementById("gallery-grid")?.scrollIntoView({behavior:"smooth"})}
              className="px-10 py-5 rounded-full font-bold text-white border-2 border-white/20 hover:bg-white/8 transition-all text-base"
              style={{fontFamily:sans}}>
              Parcourir la Galerie ↑
            </button>
          </div>
          <div className="flex flex-wrap gap-6 justify-center text-green-300/60 text-sm" style={{fontFamily:sans}}>
            <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-yellow-400 transition-colors">📱 +261 33 664 0777</a>
            <span>📍 Morondava, Madagascar</span>
            <span>⭐ 4.7/5 · 260+ voyageurs</span>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lbIdx!==null && <Lightbox photos={filtered} startIndex={lbIdx} onClose={()=>setLbIdx(null)} />}

      {/* ═══ KEYFRAMES ═══════════════════════════════════════════ */}
      <style>{`
        @keyframes heroKB    { from{transform:scale(1.08)} to{transform:scale(1)} }
        @keyframes heroPing  { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes lbIn      { from{opacity:0;transform:scale(0.96) translateY(8px)} to{opacity:1;transform:scale(1) translateY(0)} }

        @keyframes kb-zoom-in   { from{transform:scale(1)}    to{transform:scale(1.12)} }
        @keyframes kb-zoom-out  { from{transform:scale(1.12)} to{transform:scale(1)}    }
        @keyframes kb-pan-right { from{transform:scale(1.08) translateX(-3%)} to{transform:scale(1.08) translateX(3%)} }
        @keyframes kb-pan-left  { from{transform:scale(1.08) translateX(3%)} to{transform:scale(1.08) translateX(-3%)} }

        @keyframes filmRipple { 0%{transform:scale(1);opacity:0.7} 100%{transform:scale(2.6);opacity:0} }
      `}</style>
    </div>
  );
}