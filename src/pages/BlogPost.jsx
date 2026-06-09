import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { POST_BY_SLUG, posts } from "./blogData";

if (typeof document !== "undefined" && !document.getElementById("kt-bp-f")) {
  const l = document.createElement("link"); l.id = "kt-bp-f"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap";
  document.head.appendChild(l);
}

const serif = "'Playfair Display', serif";
const sans  = "'DM Sans', sans-serif";
const WA    = "261336640777";

function fmtDate(d) {
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = POST_BY_SLUG[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!post) return;

    const url = `https://kiritourmadagascar.com/blog/${post.slug}`;
    const title = `${post.title} | KiriTour Madagascar`;

    document.title = title;

    const setMeta = (key, val, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute("content", val);
    };
    setMeta("description", post.excerpt);
    setMeta("keywords", post.keywords);
    setMeta("og:title", title, "property");
    setMeta("og:description", post.excerpt, "property");
    setMeta("og:image", post.cover, "property");
    setMeta("og:url", url, "property");
    setMeta("og:type", "article", "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", post.excerpt);
    setMeta("twitter:image", post.cover);

    let canon = document.querySelector('link[rel="canonical"]');
    if (!canon) { canon = document.createElement("link"); canon.rel = "canonical"; document.head.appendChild(canon); }
    canon.href = url;

    /* JSON-LD Article */
    const ld = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "description": post.excerpt,
      "image": post.cover,
      "datePublished": post.date,
      "dateModified": post.date,
      "author": { "@type": "Organization", "name": "KiriTour Madagascar", "url": "https://kiritourmadagascar.com" },
      "publisher": {
        "@type": "Organization",
        "name": "KiriTour Madagascar",
        "logo": { "@type": "ImageObject", "url": "https://kiritourmadagascar.com/favicon-512.png" }
      },
      "mainEntityOfPage": { "@type": "WebPage", "@id": url }
    };
    let script = document.getElementById("kt-blog-ld");
    if (!script) { script = document.createElement("script"); script.id = "kt-blog-ld"; script.type = "application/ld+json"; document.head.appendChild(script); }
    script.textContent = JSON.stringify(ld);

    return () => {
      document.title = "KiriTour Madagascar | Tours Baobabs, Tsingy & Wildlife — Morondava";
      const s = document.getElementById("kt-blog-ld");
      if (s) s.remove();
    };
  }, [post]);

  if (!post) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6" style={{ background: "#f5f7fb", fontFamily: sans }}>
      <p style={{ color: "#64748b" }}>Article not found.</p>
      <button onClick={() => navigate("/blog")}
        className="px-7 py-3.5 rounded-full font-semibold text-sm text-emerald-900 hover:scale-105 transition-all"
        style={{ background: "linear-gradient(135deg,#facc15,#f59e0b)", fontFamily: sans }}>
        ← All Articles
      </button>
    </div>
  );

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div style={{ background: "#f5f7fb", fontFamily: sans, minHeight: "100vh" }}>

      {/* HERO */}
      <section className="relative" style={{ height: "52vh", minHeight: 340, maxHeight: 520 }}>
        <img src={post.cover} alt={post.title} className="w-full h-full object-cover"
          onError={(e) => { e.target.src = "https://i.ibb.co/5xXLDSZQ/20250729-173834.jpg"; }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom,rgba(3,12,4,.35) 0%,rgba(3,12,4,.15) 40%,rgba(3,12,4,.85) 100%)" }} />

        <button onClick={() => navigate("/blog")}
          className="absolute top-5 left-4 sm:left-7 flex items-center gap-2 rounded-full text-sm font-medium transition-all hover:scale-105 z-20"
          style={{ padding: "10px 18px", background: "rgba(255,255,255,.12)", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,.2)", color: "white", fontFamily: sans }}>
          ← Blog
        </button>

        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-8 sm:pb-12 z-10">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-emerald-900 text-[11px] font-black px-3 py-1 rounded-full" style={{ background: "#facc15", fontFamily: sans }}>
                {post.category}
              </span>
              <span className="text-white/70 text-xs" style={{ fontFamily: sans }}>{fmtDate(post.date)} · {post.readTime} read</span>
            </div>
            <h1 className="text-white font-black leading-tight" style={{ fontFamily: serif, fontSize: "clamp(1.8rem,5vw,3.2rem)", textShadow: "0 4px 30px rgba(0,0,0,.5)" }}>
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      {/* ARTICLE BODY */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        {post.content.map((block, i) => {
          if (block.type === "h2") return (
            <h2 key={i} className="text-slate-800 font-black mt-9 mb-4" style={{ fontFamily: serif, fontSize: "clamp(1.4rem,3vw,2rem)" }}>{block.text}</h2>
          );
          if (block.type === "tip") return (
            <div key={i} className="my-6 p-5 rounded-2xl flex gap-3" style={{ background: "rgba(250,204,21,.1)", border: "1.5px solid rgba(250,204,21,.3)" }}>
              <span className="text-xl flex-shrink-0">💡</span>
              <p className="text-slate-700 text-sm leading-relaxed m-0" style={{ fontFamily: sans }}><strong>Tip:</strong> {block.text}</p>
            </div>
          );
          return (
            <p key={i} className="text-slate-600 leading-relaxed mb-5" style={{ fontFamily: sans, fontSize: 16, lineHeight: 1.8 }}>{block.text}</p>
          );
        })}

        {/* Related tour CTA */}
        <div className="my-10 p-6 sm:p-8 rounded-3xl text-center" style={{ background: "linear-gradient(135deg,#047857,#0369a1)" }}>
          <p className="text-emerald-100/80 text-xs font-bold tracking-widest uppercase mb-2" style={{ fontFamily: sans }}>Recommended Tour</p>
          <h3 className="text-white font-black mb-4" style={{ fontFamily: serif, fontSize: "clamp(1.3rem,3vw,1.8rem)" }}>{post.relatedTourLabel}</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            <button onClick={() => navigate(`/tours/${post.relatedTour}`)}
              className="px-7 py-3 rounded-full font-black text-emerald-900 hover:scale-105 transition-all text-sm shadow-lg"
              style={{ background: "linear-gradient(135deg,#facc15,#f59e0b)", fontFamily: sans }}>
              View Tour & Prices
            </button>
            <button onClick={() => window.open(`https://wa.me/${WA}?text=` + encodeURIComponent(`Hello! I read your article "${post.title}" and I'm interested in the ${post.relatedTourLabel}.`), "_blank")}
              className="px-6 py-3 rounded-full text-sm font-semibold border border-emerald-100/70 text-white hover:bg-white/10 transition-all"
              style={{ fontFamily: sans }}>
              📲 Ask a question
            </button>
          </div>
        </div>
      </article>

      {/* RELATED ARTICLES */}
      {related.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          <h3 className="text-slate-800 font-black mb-5" style={{ fontFamily: serif, fontSize: "1.5rem" }}>Keep reading</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {related.map((p) => (
              <article key={p.slug} onClick={() => navigate(`/blog/${p.slug}`)}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer border border-slate-100 flex flex-col">
                <div className="relative h-36 overflow-hidden">
                  <img src={p.cover} alt={p.title} width="300" height="144" loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => { e.target.src = "https://i.ibb.co/5xXLDSZQ/20250729-173834.jpg"; }} />
                </div>
                <div className="p-4">
                  <h4 className="text-slate-800 font-bold text-sm leading-tight group-hover:text-emerald-700 transition-colors" style={{ fontFamily: serif }}>{p.title}</h4>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}