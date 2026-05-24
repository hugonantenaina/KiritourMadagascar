import React, { useState } from "react";

const serif = "'Playfair Display', serif";
const sans  = "'DM Sans', sans-serif";

/* ══════════════════════════════════════════════════════
   GOOGLE MAPS EMBED — Reviews + Map
   Maimaimpoana · Auto · Clickable → Google Maps
   
   📝 Fomba hanovana ny embed URL:
   1. Mankany maps.google.com
   2. Karohy "KiriTour Madagascar Morondava"
   3. Tsindrio "Share" → "Embed a map"
   4. Copy ilay src="..." ao anatin'ny iframe
   5. Soloina EMBED_URL eto ambany
══════════════════════════════════════════════════════ */

const EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3785.1234567890!2d44.2789!3d-20.2841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zKiriTour+Madagascar!5e0!3m2!1sfr!2smg!4v1234567890";

const MAPS_URL =
  "https://maps.google.com/?q=KiriTour+Madagascar+Morondava";

const REVIEW_URL =
  "https://maps.app.goo.gl/TCuJ6BVSJZhCpbk37";

/* ── Client photos avy amin'ny client tena izy ── */
const clientPhotos = [
  { src: "https://i.ibb.co/bRLCScNw/Whats-App-Image-2026-05-16-at-16-04-38-1.jpg", caption: "Tour Moment 1"           },
  { src: "https://i.ibb.co/xWPHrkt/Whats-App-Image-2026-05-16-at-16-04-38.jpg",     caption: "Tour Experience"       },
  { src: "https://i.ibb.co/Z1L1LpqP/Whats-App-Image-2026-05-16-at-16-04-39-1.jpg",   caption: "Adventure Highlights"  },
  { src: "https://i.ibb.co/kgPL8Nxs/Whats-App-Image-2026-05-16-at-16-04-39.jpg",     caption: "Scenic Discovery"      },
  { src: "https://i.ibb.co/5hqCyv6q/Whats-App-Image-2026-05-16-at-16-04-40-1.jpg",   caption: "Nature Exploration"    },
  { src: "https://i.ibb.co/YFt7zn3C/Whats-App-Image-2026-05-16-at-16-04-40.jpg",     caption: "Travel Memories"       },
  { src: "https://i.ibb.co/WWJ9jtHg/Whats-App-Image-2026-05-16-at-16-04-41-1.jpg",   caption: "Tour Highlights"       },
  { src: "https://i.ibb.co/VW3P8dNb/Whats-App-Image-2026-05-16-at-16-04-41.jpg",     caption: "Journey Moments"       },
  { src: "https://i.ibb.co/Q7sjSkbP/Whats-App-Image-2026-05-16-at-16-04-42-1.jpg",   caption: "Unforgettable Views"   },
  { src: "https://i.ibb.co/ksx7M9G2/IMG-20260224-WA0019.jpg",  caption: "Avenue of the Baobabs"  },
  { src: "https://i.ibb.co/YBDp5cM5/20250817-102639.jpg",       caption: "Tsingy de Bemaraha"     },
  { src: "https://i.ibb.co/4ZMwFVFh/IMG-20251030-WA0008.jpg",   caption: "Kirindy Forest"          },
  { src: "https://i.ibb.co/WvgBzyDQ/IMG-20251030-WA0087.jpg",   caption: "Andasibe Rainforest"     },
  { src: "https://i.ibb.co/C5CXsY8M/IMG-20251030-WA0106.jpg",   caption: "Wildlife"                },
  { src: "https://i.ibb.co/5xXLDSZQ/20250729-173834.jpg",       caption: "Sunset Morondava"        },
  { src: "https://i.ibb.co/LXf9Mh2B/IMG-20251211-204008.jpg",   caption: "Tour Adventure"          },
  { src: "https://i.ibb.co/sdZVvf9S/sakorkata1.jpg",            caption: "Sakorkata Beach"         },
  { src: "https://i.ibb.co/WWR5r6cG/IMG-20260224-WA0004.jpg",   caption: "Tsingy Views"            },
  { src: "https://i.ibb.co/HT6LRFzC/20250810-063819.jpg",       caption: "Tsiribihina River"       },
  { src: "https://i.ibb.co/mrxKPM2q/20250817-104453.jpg",       caption: "Tsingy Landscape"        },
  { src: "https://i.ibb.co/0yXHktRS/IMG-20260224-WA0034.jpg",   caption: "Madagascar Nature"       },
  { src: "https://i.ibb.co/TDQGgb1k/Whats-App-Image-2026-05-16-at-16-04-42-2.jpg",   caption: "Guest Adventure"       },
  { src: "https://i.ibb.co/4ZnfvzK2/Whats-App-Image-2026-05-16-at-16-04-43.jpg",     caption: "Madagascar Magic"      },
  { src: "https://i.ibb.co/G3HGh7jK/Whats-App-Image-2026-05-16-at-16-04-44-1.jpg",   caption: "Explorer's Paradise"   },
  { src: "https://i.ibb.co/mVzhX4JG/Whats-App-Image-2026-05-16-at-16-04-44.jpg",     caption: "Tour Experience 2"     },
  
];

/* ── Lightbox ── */
function Lightbox({ photo, onClose }) {
  if (!photo) return null;
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.96)", backdropFilter: "blur(10px)" }}
    >
      <div className="relative max-w-3xl w-full" onClick={e => e.stopPropagation()}>
        <img
          src={photo.src}
          alt={photo.caption}
          className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
        />
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <span className="px-4 py-1.5 rounded-full text-sm font-semibold text-white"
            style={{ background: "rgba(0,0,0,0.6)", fontFamily: sans }}>
            📸 {photo.caption}
          </span>
        </div>
        <button onClick={onClose} aria-label="Close"
          className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-all"
          style={{ background: "rgba(0,0,0,0.5)" }}>
          ✕
        </button>
        {/* Navigation hint */}
        <p className="absolute bottom-4 right-4 text-white/40 text-xs" style={{ fontFamily: sans }}>
          Click outside to close
        </p>
      </div>
    </div>
  );
}

export default function GoogleReviewsSection() {
  const [sel, setSel]         = useState(null);
  const [mapLoaded, setLoaded] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? clientPhotos : clientPhotos.slice(0, 8);

  return (
    <section className="py-20 px-4 bg-white" id="reviews">
      <div className="max-w-6xl mx-auto">

        {/* ══ Header ══ */}
        <div className="text-center mb-12">
          <p className="text-yellow-600 text-xs font-bold tracking-widest uppercase mb-2"
            style={{ fontFamily: sans }}>
            Verified Reviews & Real Moments
          </p>
          <h2 className="text-3xl md:text-5xl font-black mb-3"
            style={{ fontFamily: serif, color: "#14532d" }}>
            What Travellers Say
          </h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto" style={{ fontFamily: sans }}>
            Read authentic reviews directly from Google Maps — updated in real time.
          </p>
        </div>

        {/* ══ Google Maps Embed + Info ══ */}
        <div className="grid md:grid-cols-5 gap-6 mb-14">

          {/* Map embed — col 3 */}
          <div className="md:col-span-3 relative rounded-3xl overflow-hidden shadow-xl"
            style={{ minHeight: 380 }}>
            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-green-50 z-10">
                <div className="text-center">
                  <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-green-700 text-sm font-semibold" style={{ fontFamily: sans }}>
                    Loading Google Maps...
                  </p>
                </div>
              </div>
            )}
            <iframe
              title="KiriTour Madagascar on Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.4709142164716!2d44.29792289999999!3d-20.292750899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1f5ed10017ac9d8b%3A0x102dc5bbd865b59!2skiritourMadagascar!5e1!3m2!1sfr!2smg!4v1779281582013!5m2!1sfr!2smg"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 380, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setLoaded(true)}
            />
            {/* Overlay click → Google Maps */}
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white shadow-xl hover:scale-105 transition-all"
              style={{ background: "rgba(20,83,45,0.92)", fontFamily: sans, backdropFilter: "blur(8px)" }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              Open in Google Maps
            </a>
          </div>

          {/* Info + Review CTA — col 2 */}
          <div className="md:col-span-2 flex flex-col gap-4">

            {/* Google rating card */}
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl p-5 border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-200 bg-white group"
            >
              <div className="flex items-center gap-3 mb-3">
                {/* Google G */}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "#f8f9fa", border: "1px solid #e8eaed" }}>
                  <svg viewBox="0 0 24 24" className="w-6 h-6">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                <div>
                  <p className="font-black text-gray-800 text-sm" style={{ fontFamily: serif }}>
                    Google Maps Reviews
                  </p>
                  <p className="text-gray-400 text-xs" style={{ fontFamily: sans }}>
                    KiriTour Madagascar · Morondava
                  </p>
                </div>
                <svg viewBox="0 0 20 20" fill="currentColor"
                  className="w-4 h-4 text-gray-300 group-hover:text-green-500 transition-colors ml-auto flex-shrink-0">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
              {/* Rating */}
              <div className="flex items-center gap-2 mb-1">
                <span className="text-3xl font-black text-gray-800" style={{ fontFamily: serif }}>4.4</span>
                <div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-lg ${i < 4 ? "text-yellow-400" : "text-gray-200"}`}>★</span>
                    ))}
                  </div>
                  <p className="text-gray-400 text-xs mt-0.5" style={{ fontFamily: sans }}>
                    8 reviews · Updated live
                  </p>
                </div>
              </div>
              <p className="text-green-600 text-xs font-semibold mt-2 flex items-center gap-1"
                style={{ fontFamily: sans }}>
                <span>→</span> Click to read all reviews on Google Maps
              </p>
            </a>

            {/* Leave review */}
            <a
              href={REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 px-5 py-4 rounded-2xl font-black text-white text-sm hover:scale-105 active:scale-95 transition-all shadow-lg"
              style={{ background: "linear-gradient(135deg,#14532d,#16a34a)", fontFamily: sans }}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              ⭐ Leave a Google Review
            </a>

            {/* TripAdvisor */}
            <a
              href="https://www.tripadvisor.fr/Attraction_Review-g298273-d34354540"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl font-bold text-white text-sm hover:scale-105 active:scale-95 transition-all"
              style={{ background: "linear-gradient(135deg,#00aa6c,#007a4e)", fontFamily: sans }}
            >
              🦉 View on TripAdvisor
            </a>

            {/* Address */}
            <div className="rounded-2xl p-4 border border-gray-100 bg-gray-50">
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ fontFamily: sans }}>Our location</p>
              <p className="text-gray-700 text-sm font-semibold" style={{ fontFamily: sans }}>
                📍 P74X+C8, Namahora Nord<br />
                Morondava 619, Madagascar
              </p>
              <p className="text-gray-500 text-xs mt-2" style={{ fontFamily: sans }}>
                📱 +261 33 664 07 77<br />
                🕐 Open 24/7 (WhatsApp)
              </p>
            </div>
          </div>
        </div>

        {/* ══ Client Photos ══ */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-xl font-black text-green-800" style={{ fontFamily: serif }}>
                📸 Real Moments from Our Tours
              </h3>
              <p className="text-gray-400 text-xs mt-1" style={{ fontFamily: sans }}>
                Photos shared by our travellers — click to view
              </p>
            </div>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-green-700 border border-green-200 bg-green-50"
              style={{ fontFamily: sans }}>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {clientPhotos.length} photos
            </span>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
            {visible.map((p, i) => (
              <div
                key={i}
                onClick={() => setSel(p)}
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <img
                  src={p.src}
                  alt={p.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all duration-300" />
                <div className="absolute inset-0 flex items-end p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-[10px] font-semibold bg-black/50 px-2 py-0.5 rounded-full"
                    style={{ fontFamily: sans }}>
                    {p.caption}
                  </span>
                </div>
                {/* Zoom icon */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center shadow">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-gray-700">
                      <path d="M5 8a3 3 0 100-6 3 3 0 000 6zM5 10a5 5 0 014.546 2.916A5.986 5.986 0 0110 14v1H2v-1a5 5 0 015-5zm9-2a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1V9a1 1 0 011-1z"/>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show more */}
          {clientPhotos.length > 8 && (
            <div className="text-center mt-6">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-8 py-3 rounded-full font-bold text-sm text-green-700 border-2 border-green-200 hover:bg-green-50 hover:border-green-400 transition-all"
                style={{ fontFamily: sans }}
              >
                {showAll
                  ? "Show less ↑"
                  : `Show all ${clientPhotos.length} photos ↓`}
              </button>
            </div>
          )}
        </div>

        {/* ══ Share CTA ══ */}
        <div className="mt-12 rounded-3xl p-8 text-center"
          style={{ background: "linear-gradient(135deg,#f0fdf4,#dcfce7)", border: "1px solid #86efac" }}>
          <p className="text-green-800 font-black text-lg mb-1" style={{ fontFamily: serif }}>
            Visited Madagascar with KiriTour? 🌴
          </p>
          <p className="text-gray-500 text-sm mb-6" style={{ fontFamily: sans }}>
            Share your experience and help future travellers discover the magic of Madagascar!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={REVIEW_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white shadow-lg hover:scale-105 transition-all"
              style={{ background: "linear-gradient(135deg,#14532d,#16a34a)", fontFamily: sans }}>
              ⭐ Review on Google
            </a>
            <a href="https://www.tripadvisor.fr/UserReviewEdit-g298273-d34354540"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white shadow-lg hover:scale-105 transition-all"
              style={{ background: "linear-gradient(135deg,#00aa6c,#007a4e)", fontFamily: sans }}>
              🦉 Review on TripAdvisor
            </a>
            <a href={`https://wa.me/261336640777?text=${encodeURIComponent("Hello KiriTour! I'd like to share my photos 📸")}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white shadow-lg hover:scale-105 transition-all"
              style={{ background: "linear-gradient(135deg,#25D366,#128C7E)", fontFamily: sans }}>
              📲 Share Photos via WhatsApp
            </a>
          </div>
        </div>

      </div>

      {/* Lightbox */}
      <Lightbox photo={sel} onClose={() => setSel(null)} />
    </section>
  );
}