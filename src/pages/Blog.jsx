import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { posts } from "./blogData";

if (typeof document !== "undefined" && !document.getElementById("kt-blog-f")) {
  const l = document.createElement("link"); l.id = "kt-blog-f"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap";
  document.head.appendChild(l);
}

const serif = "'Playfair Display', serif";
const sans  = "'DM Sans', sans-serif";

function fmtDate(d) {
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function Blog() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Madagascar Travel Blog — Tips & Guides | KiriTour Madagascar";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta); }
    meta.content = "Expert Madagascar travel guides: when to visit the Baobabs, Tsingy de Bemaraha tips, Kirindy Forest wildlife and more. Plan your Morondava adventure with KiriTour.";

    let canon = document.querySelector('link[rel="canonical"]');
    if (!canon) { canon = document.createElement("link"); canon.rel = "canonical"; document.head.appendChild(canon); }
    canon.href = "https://kiritourmadagascar.com/blog";

    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#f5f7fb", fontFamily: sans }}>

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg,#047857 0%,#0f766e 40%,#0369a1 100%)" }}>
        <div className="absolute inset-0" style={{ backgroundImage: "url(https://i.ibb.co/zhTgMVW2/IMG-20250915-211514.jpg)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.15 }} />
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 md:py-24 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-emerald-900 text-xs font-bold tracking-widest uppercase mb-6" style={{ background: "rgba(236,252,203,0.9)", fontFamily: sans }}>
            🌴 Travel Guides & Tips
          </span>
          <h1 className="text-white font-black leading-none mb-5" style={{ fontFamily: serif, fontSize: "clamp(2.2rem,6vw,4rem)", letterSpacing: "-0.03em" }}>
            Madagascar Travel Blog
          </h1>
          <p className="text-emerald-50/90 text-base md:text-lg max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: sans }}>
            Expert guides, tips and stories to help you plan the perfect adventure in western Madagascar — from baobabs to Tsingy and beyond.
          </p>
        </div>
      </section>

      {/* POSTS GRID */}
      <section className="py-14 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                onClick={() => navigate(`/blog/${post.slug}`)}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col border border-slate-100"
              >
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                  <img src={post.cover} alt={post.title} width="400" height="192" loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => { e.target.src = "https://i.ibb.co/5xXLDSZQ/20250729-173834.jpg"; }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(15,23,42,0.5) 0%,transparent 55%)" }} />
                  <span className="absolute top-3 left-3 text-emerald-900 text-[11px] font-black px-2.5 py-1 rounded-full shadow-sm" style={{ background: "#facc15", fontFamily: sans }}>
                    {post.category}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2" style={{ fontFamily: sans }}>
                    <span>{fmtDate(post.date)}</span>
                    <span>·</span>
                    <span>{post.readTime} read</span>
                  </div>
                  <h2 className="text-slate-800 font-black text-lg leading-tight mb-2 group-hover:text-emerald-700 transition-colors" style={{ fontFamily: serif }}>
                    {post.title}
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-4" style={{ fontFamily: sans }}>
                    {post.excerpt}
                  </p>
                  <span className="mt-auto text-emerald-700 text-sm font-bold inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all" style={{ fontFamily: sans }}>
                    Read more →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4" style={{ background: "linear-gradient(135deg,#0f766e 0%,#0369a1 100%)" }}>
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="font-black leading-tight mb-4" style={{ fontFamily: serif, fontSize: "clamp(1.6rem,4vw,2.6rem)" }}>
            Ready to explore Madagascar?
          </h2>
          <p className="text-emerald-50/90 text-base mb-8" style={{ fontFamily: sans }}>
            Browse our tours or message us to plan a custom adventure.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button onClick={() => navigate("/tours")}
              className="px-8 py-3.5 rounded-full font-black text-emerald-900 hover:scale-105 transition-all text-sm shadow-lg"
              style={{ background: "linear-gradient(135deg,#facc15,#fbbf24,#f59e0b)", fontFamily: sans }}>
              Explore All Tours
            </button>
            <button onClick={() => window.open("https://wa.me/261336640777?text=" + encodeURIComponent("Hello! I read your blog and I'd like to plan a tour."), "_blank")}
              className="px-6 py-3.5 rounded-full text-sm font-semibold border border-emerald-100/80 text-emerald-50 hover:bg-emerald-50/10 transition-all"
              style={{ fontFamily: sans }}>
              📲 Plan via WhatsApp
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}