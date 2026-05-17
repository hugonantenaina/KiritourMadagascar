import React, { useState, useEffect, useRef } from "react";

/* ── Fonts ── */
if (typeof document !== "undefined" && !document.getElementById("kt-faq-f")) {
  const l = document.createElement("link");
  l.id = "kt-faq-f"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap";
  document.head.appendChild(l);
}

const serif = "'Cormorant Garamond', serif";
const sans  = "'Outfit', sans-serif";
const WA    = "261336640777";
const wa    = (m) => window.open(`https://wa.me/${WA}?text=${encodeURIComponent(m)}`, "_blank");

/* ══════════════════════════════════════════════════════════
   FAQ DATA
══════════════════════════════════════════════════════════ */
const CATEGORIES = [
  {
    id: "planning",
    icon: "🗓️",
    label: "Trip Planning",
    color: "#facc15",
    colorDim: "rgba(250,204,21,.12)",
    colorBorder: "rgba(250,204,21,.25)",
    faqs: [
      {
        q: "What is the best time of year to visit Madagascar?",
        a: "The best time to visit western Madagascar (Morondava, Tsingy, Kirindy) is during the dry season from April to November. July and August are peak months — perfect weather, clear roads, and excellent wildlife sightings. Avoid December to March as heavy rains can make roads impassable.",
      },
      {
        q: "How many days do I need for a complete tour?",
        a: "We recommend a minimum of 7 days to cover the main highlights: Tsingy de Bemaraha (2–3 days), Kirindy Forest (1–2 days), and the Avenue of the Baobabs (1 day). For a more in-depth experience including the Tsiribihina River, plan 10–14 days.",
      },
      {
        q: "Can I combine multiple destinations in one trip?",
        a: "Absolutely! Our most popular combo is Tsingy + Baobabs + Kirindy, all departing from Morondava. We can also arrange connections to Andasibe (eastern rainforest) or Isalo National Park for a full Madagascar experience. Just tell us your interests and available time.",
      },
      {
        q: "Is Madagascar suitable for families with children?",
        a: "Yes! Madagascar is a wonderful family destination. Lemur encounters, baobab sunsets, and wildlife spotting are magical for children. We recommend ages 6+ for Tsingy (involves some climbing), while Kirindy and Baobabs are accessible for all ages. We adapt tours to your family's pace.",
      },
    ],
  },
  {
    id: "pricing",
    icon: "💰",
    label: "Pricing & Payment",
    color: "#34d399",
    colorDim: "rgba(52,211,153,.12)",
    colorBorder: "rgba(52,211,153,.25)",
    faqs: [
      {
        q: "How much does a tour cost?",
        a: "Prices vary depending on the duration, group size, and included services. As a guide: a 1-day Baobabs tour starts from €60/person, a 4-day Tsingy tour from €280/person, and a 7-day full western circuit from €550/person. All prices include local transport, guides, and entrance fees. Contact us for a personalised quote.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept bank transfer (international wire), cash on arrival (EUR, USD, MGA), and mobile money (MVola, Orange Money). A 30% deposit is required to confirm your booking, with the balance paid upon arrival in Morondava. We do not currently accept credit cards directly.",
      },
      {
        q: "What is included in the tour price?",
        a: "Our tours typically include: local 4x4 transport, professional English/French-speaking guide, national park entrance fees, and boat crossings where applicable. Flights, international transfers, hotels, and meals are usually not included unless specified in your custom quote.",
      },
      {
        q: "What is your cancellation policy?",
        a: "Cancellations made 30+ days before departure receive a full refund. 15–29 days before: 50% refund. Less than 15 days: no refund, but we offer free rescheduling. We strongly recommend travel insurance. In case of weather-related cancellations on our side, we offer a full refund or free rescheduling.",
      },
    ],
  },
  {
    id: "practical",
    icon: "🛂",
    label: "Visas & Health",
    color: "#60a5fa",
    colorDim: "rgba(96,165,250,.12)",
    colorBorder: "rgba(96,165,250,.25)",
    faqs: [
      {
        q: "Do I need a visa to visit Madagascar?",
        a: "Most nationalities can obtain a tourist visa on arrival at Ivato International Airport (Antananarivo). The visa costs approximately €35 for 30 days, extendable to 60 or 90 days. We recommend checking with your country's embassy before travel. European, American, and Australian citizens typically face no issues.",
      },
      {
        q: "Are there any vaccinations required?",
        a: "No vaccinations are officially mandatory, but we strongly recommend: Yellow Fever (if coming from an endemic country), Hepatitis A & B, Typhoid, and Rabies (for longer stays). Malaria prophylaxis is highly recommended for western Madagascar. Consult your doctor at least 4–6 weeks before departure.",
      },
      {
        q: "Is Madagascar safe for tourists?",
        a: "The tourist areas we operate in — Morondava, Tsingy, Kirindy, and the Baobabs — are generally safe. Petty theft can occur in cities, so normal precautions apply. Travelling with a reputable local operator like KiriTour significantly improves your safety. We monitor local conditions and always accompany our clients.",
      },
      {
        q: "What currency should I bring?",
        a: "The local currency is the Malagasy Ariary (MGA). We recommend bringing Euros or US Dollars in cash, which are widely accepted by operators. ATMs exist in Morondava but are often unreliable — bring enough cash for your entire trip. Exchange rates at local banks are generally fair.",
      },
    ],
  },
  {
    id: "ontour",
    icon: "🎒",
    label: "On Tour",
    color: "#f97316",
    colorDim: "rgba(249,115,22,.12)",
    colorBorder: "rgba(249,115,22,.25)",
    faqs: [
      {
        q: "What should I pack for a Madagascar tour?",
        a: "Essentials: lightweight, breathable clothing (neutral colours for wildlife), sturdy walking shoes or hiking boots, sun hat and sunglasses, sunscreen (SPF 50+), insect repellent (DEET-based), a head torch, and a reusable water bottle. For Tsingy, long trousers and gloves are recommended. A light rain jacket is useful even in dry season.",
      },
      {
        q: "Do your guides speak English?",
        a: "Yes! All our guides are fluent in English and French, with some also speaking Italian or German. Our guides are certified local experts with deep knowledge of the flora, fauna, and local culture. Many have been working in the field for over 10 years.",
      },
      {
        q: "What are the road conditions like?",
        a: "Roads in western Madagascar can be rough, especially the RN8 towards Tsingy. We use sturdy 4x4 vehicles and experienced drivers. Journey times can be longer than expected — Morondava to Tsingy takes approximately 6–8 hours depending on road conditions. We always aim to make the journey comfortable and scenic.",
      },
      {
        q: "Will I have mobile signal and WiFi?",
        a: "Mobile signal (Telma, Airtel, Orange) is available in most towns and along main routes, but patchy in Tsingy and Kirindy. We recommend purchasing a local SIM card in Antananarivo or Morondava. WiFi is available at most hotels in Morondava. In the forest, you'll be offline — which is part of the magic!",
      },
    ],
  },
  {
    id: "booking",
    icon: "📞",
    label: "Booking",
    color: "#a78bfa",
    colorDim: "rgba(167,139,250,.12)",
    colorBorder: "rgba(167,139,250,.25)",
    faqs: [
      {
        q: "How far in advance should I book?",
        a: "We recommend booking at least 2–4 weeks in advance, especially for July–September (peak season). Last-minute bookings can sometimes be accommodated — contact us via WhatsApp for availability. For large groups (8+ people) or custom itineraries, 4–6 weeks advance booking is ideal.",
      },
      {
        q: "How do I make a booking?",
        a: "Simply contact us via WhatsApp (+261 33 664 07 77), email, or the contact form on this website. Tell us your travel dates, group size, interests, and budget. We'll respond within 2 hours with a personalised itinerary and quote. Once agreed, a 30% deposit confirms your booking.",
      },
      {
        q: "Can I customise my itinerary?",
        a: "Absolutely — customisation is our speciality. Whether you want a photography-focused trip, a wildlife-only tour, a family-friendly adventure, or a romantic getaway, we build the tour around you. We can also combine different regions of Madagascar into a single seamless journey.",
      },
      {
        q: "Do you organise airport transfers and hotel bookings?",
        a: "Yes! We can arrange transfers from Morondava Airport and help you book accommodation ranging from budget guesthouses to eco-lodges. Our partner hotel, the Relais de Kirindy, is ideal for Kirindy Forest stays. We handle all logistics so you can focus on the adventure.",
      },
    ],
  },
];

/* ── useReveal hook ── */
function useReveal(threshold = 0.08) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setV(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return [ref, v];
}

function R({ children, d = 0, className = "" }) {
  const [ref, v] = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: v ? 1 : 0,
      transform: v ? "none" : "translateY(28px)",
      transition: `opacity .8s cubic-bezier(.16,1,.3,1) ${d}s, transform .8s cubic-bezier(.16,1,.3,1) ${d}s`,
    }}>{children}</div>
  );
}

/* ── Single FAQ accordion item ── */
function FAQItem({ faq, index, color, isOpen, onToggle }) {
  const bodyRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (bodyRef.current) {
      setHeight(isOpen ? bodyRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className="overflow-hidden rounded-2xl transition-all duration-300"
      style={{
        background: isOpen ? "rgba(255,255,255,.06)" : "rgba(255,255,255,.03)",
        border: `1.5px solid ${isOpen ? color.replace(")", ",.35)").replace("rgb", "rgba") : "rgba(255,255,255,.07)"}`,
        boxShadow: isOpen ? `0 8px 32px rgba(0,0,0,.3)` : "none",
      }}>
      {/* Question */}
      <button onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left group"
        style={{ cursor: "pointer" }}>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="text-sm font-bold flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ background: isOpen ? color.replace(")", ",.2)").replace("rgb", "rgba") : "rgba(255,255,255,.05)", color: isOpen ? color : "rgba(255,255,255,.3)", fontFamily: sans, fontSize: 11, border: `1px solid ${isOpen ? color.replace(")", ",.3)").replace("rgb", "rgba") : "rgba(255,255,255,.08)"}` }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <p style={{ fontFamily: sans, fontSize: "clamp(13px,1.5vw,15px)", color: isOpen ? "white" : "rgba(255,255,255,.75)", fontWeight: isOpen ? 600 : 400, lineHeight: 1.4 }}>
            {faq.q}
          </p>
        </div>
        {/* Toggle icon */}
        <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
          style={{ background: isOpen ? color.replace(")", ",.15)").replace("rgb", "rgba") : "rgba(255,255,255,.06)", border: `1px solid ${isOpen ? color.replace(")", ",.3)").replace("rgb", "rgba") : "rgba(255,255,255,.1)"}` }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
            style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .3s ease", stroke: isOpen ? color : "rgba(255,255,255,.4)", strokeWidth: 2 }}>
            <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </button>

      {/* Answer */}
      <div style={{ height, overflow: "hidden", transition: "height .35s cubic-bezier(.16,1,.3,1)" }}>
        <div ref={bodyRef} className="px-5 pb-5 pt-0">
          <div className="pl-9">
            <div className="h-px mb-4" style={{ background: `linear-gradient(90deg,${color.replace(")", ",.3)").replace("rgb", "rgba")},transparent)` }} />
            <p style={{ fontFamily: sans, fontSize: 14, color: "rgba(255,255,255,.55)", lineHeight: 1.75 }}>
              {faq.a}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Category tab ── */
function CategoryTab({ cat, isActive, onClick }) {
  return (
    <button onClick={onClick}
      className="flex items-center gap-2 px-4 py-2.5 rounded-2xl font-semibold text-sm transition-all duration-300 whitespace-nowrap"
      style={{
        fontFamily: sans,
        background: isActive ? cat.colorDim : "rgba(255,255,255,.04)",
        border: `1.5px solid ${isActive ? cat.colorBorder : "rgba(255,255,255,.08)"}`,
        color: isActive ? cat.color : "rgba(255,255,255,.5)",
        transform: isActive ? "translateY(-2px)" : "none",
        boxShadow: isActive ? `0 8px 24px rgba(0,0,0,.25)` : "none",
      }}>
      <span style={{ fontSize: 16 }}>{cat.icon}</span>
      {cat.label}
    </button>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════════ */
export default function FAQ() {
  const [in_, setIn]         = useState(false);
  const [activeTab, setTab]  = useState("planning");
  const [openIdx, setOpen]   = useState(0);
  const [search, setSearch]  = useState("");

  useEffect(() => { window.scrollTo(0, 0); setTimeout(() => setIn(true), 80); }, []);

  /* search filter */
  const filtered = search.trim().length > 1
    ? CATEGORIES.map(cat => ({
        ...cat,
        faqs: cat.faqs.filter(f =>
          f.q.toLowerCase().includes(search.toLowerCase()) ||
          f.a.toLowerCase().includes(search.toLowerCase())
        ),
      })).filter(cat => cat.faqs.length > 0)
    : CATEGORIES.filter(cat => cat.id === activeTab);

  const activeCat = CATEGORIES.find(c => c.id === activeTab);
  const totalFAQs = CATEGORIES.reduce((a, c) => a + c.faqs.length, 0);

  return (
    <div style={{ background: "#0b1a0e", minHeight: "100svh", fontFamily: sans }}>

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden flex items-end"
        style={{ minHeight: "clamp(300px,40vh,460px)", background: "linear-gradient(160deg,#030f07 0%,#0d2e1a 55%,#0b1a0e 100%)" }}>
        {/* Orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute rounded-full" style={{ width: 500, height: 500, top: -180, right: -120, background: "radial-gradient(circle,rgba(250,204,21,.07) 0%,transparent 70%)", animation: "faqOrb 9s ease-in-out infinite" }} />
          <div className="absolute rounded-full" style={{ width: 400, height: 400, bottom: -120, left: -80, background: "radial-gradient(circle,rgba(52,211,153,.05) 0%,transparent 70%)", animation: "faqOrb 11s ease-in-out infinite reverse" }} />
        </div>
        {/* Noise */}
        <div className="absolute inset-0 opacity-[.06] pointer-events-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "160px" }} />
        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[.03]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)", backgroundSize: "55px 55px" }} />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 pb-14 pt-24">
          <div style={{ opacity: in_ ? 1 : 0, transform: in_ ? "none" : "translateY(24px)", transition: "all .9s cubic-bezier(.16,1,.3,1) .1s" }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-12" style={{ background: "linear-gradient(90deg,#facc15,transparent)" }} />
              <span style={{ fontFamily: sans, fontSize: 10, color: "#facc15", textTransform: "uppercase", letterSpacing: ".45em", fontWeight: 700 }}>
                Help Centre
              </span>
            </div>
            <h1 style={{ fontFamily: serif, fontSize: "clamp(3rem,8vw,5.5rem)", color: "white", fontWeight: 700, lineHeight: .95, letterSpacing: "-.025em" }}>
              Frequently<br />
              <em style={{ color: "#facc15", fontStyle: "italic" }}>Asked Questions</em>
            </h1>
            <p style={{ fontFamily: sans, fontSize: "clamp(.9rem,1.5vw,1.05rem)", color: "rgba(255,255,255,.4)", marginTop: 14, maxWidth: 480, lineHeight: 1.7 }}>
              Everything you need to know before booking your Madagascar adventure. {totalFAQs} questions answered.
            </p>

            {/* Search bar */}
            <div className="relative mt-8 max-w-md"
              style={{ opacity: in_ ? 1 : 0, transform: in_ ? "none" : "translateY(16px)", transition: "all .7s ease .4s" }}>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.3)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </div>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search any question..."
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,.07)",
                  border: "1.5px solid rgba(255,255,255,.12)",
                  color: "white", fontFamily: sans, fontSize: 14,
                }}
                onFocus={e => e.target.style.borderColor = "rgba(250,204,21,.4)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,.12)"}
              />
              {search && (
                <button onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(250,204,21,.35),transparent)" }} />
      </section>

      {/* ══ BODY ══════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 flex flex-col gap-10">

        {/* ── Category tabs (hidden during search) ── */}
        {!search && (
          <R d={0}>
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
              {CATEGORIES.map(cat => (
                <CategoryTab key={cat.id} cat={cat} isActive={activeTab === cat.id}
                  onClick={() => { setTab(cat.id); setOpen(0); }} />
              ))}
            </div>
          </R>
        )}

        {/* ── FAQ list ── */}
        {filtered.map((cat, ci) => (
          <div key={cat.id}>
            {/* Search mode: show category header */}
            {search && (
              <R d={ci * .05}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
                    style={{ background: cat.colorDim, border: `1.5px solid ${cat.colorBorder}` }}>
                    {cat.icon}
                  </div>
                  <h3 style={{ fontFamily: serif, fontSize: "1.3rem", color: "white", fontWeight: 700 }}>{cat.label}</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                    style={{ background: cat.colorDim, color: cat.color, fontFamily: sans }}>
                    {cat.faqs.length}
                  </span>
                </div>
              </R>
            )}

            {/* Normal mode: category header */}
            {!search && (
              <R d={0}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl"
                    style={{ background: cat.colorDim, border: `1.5px solid ${cat.colorBorder}` }}>
                    {cat.icon}
                  </div>
                  <div>
                    <h2 style={{ fontFamily: serif, fontSize: "clamp(1.4rem,3vw,2rem)", color: "white", fontWeight: 700 }}>
                      {cat.label}
                    </h2>
                    <p style={{ fontFamily: sans, fontSize: 12, color: "rgba(255,255,255,.35)" }}>
                      {cat.faqs.length} questions
                    </p>
                  </div>
                </div>
              </R>
            )}

            {/* Accordion items */}
            <div className="flex flex-col gap-3">
              {cat.faqs.map((faq, i) => (
                <R key={i} d={i * .04}>
                  <FAQItem
                    faq={faq}
                    index={i}
                    color={cat.color}
                    isOpen={!search && openIdx === i}
                    onToggle={() => setOpen(openIdx === i ? -1 : i)}
                  />
                </R>
              ))}
            </div>

            {search && ci < filtered.length - 1 && (
              <div className="mt-8 mb-2 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent)" }} />
            )}
          </div>
        ))}

        {/* No results */}
        {search && filtered.length === 0 && (
          <R d={0}>
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <span style={{ fontSize: 48 }}>🔍</span>
              <p style={{ fontFamily: serif, fontSize: "1.5rem", color: "white", fontWeight: 700 }}>No results found</p>
              <p style={{ fontFamily: sans, fontSize: 14, color: "rgba(255,255,255,.4)" }}>Try different keywords or browse the categories above</p>
              <button onClick={() => setSearch("")}
                className="mt-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                style={{ background: "rgba(250,204,21,.12)", color: "#facc15", border: "1px solid rgba(250,204,21,.25)", fontFamily: sans }}>
                Clear search
              </button>
            </div>
          </R>
        )}

        {/* ── Still have questions CTA ── */}
        <R d={0.05}>
          <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12"
            style={{ background: "linear-gradient(135deg,#14532d,#166534)" }}>
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle at 80% 20%,white 0%,transparent 55%)" }} />
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg,transparent,rgba(250,204,21,.5),transparent)" }} />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <p style={{ fontFamily: sans, fontSize: 10, color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: ".35em", marginBottom: 8 }}>
                  Still have questions?
                </p>
                <h3 style={{ fontFamily: serif, fontSize: "clamp(1.6rem,3vw,2.4rem)", color: "white", fontWeight: 700, marginBottom: 10 }}>
                  We're here to help<br />
                  <em style={{ color: "#facc15", fontStyle: "italic" }}>anytime.</em>
                </h3>
                <p style={{ fontFamily: sans, fontSize: 14, color: "rgba(255,255,255,.5)", maxWidth: 400, lineHeight: 1.7 }}>
                  Can't find the answer you're looking for? Our team replies within 2 hours on WhatsApp — no bots, just real local experts.
                </p>
              </div>
              <div className="flex flex-col gap-3 flex-shrink-0 w-full md:w-auto">
                <button onClick={() => wa("Hello KiriTour! I have a question about booking a tour.")}
                  className="flex items-center justify-center gap-2.5 rounded-2xl font-bold transition-all hover:scale-[1.03] active:scale-[.97]"
                  style={{ padding: "15px 32px", background: "linear-gradient(135deg,#facc15,#f59e0b)", color: "#0b1a0e", fontFamily: sans, fontSize: 15, boxShadow: "0 8px 28px rgba(250,204,21,.4)", minWidth: 230 }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="#0b1a0e"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a9.87 9.87 0 00-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Ask on WhatsApp
                </button>
                <p style={{ fontFamily: sans, fontSize: 11, color: "rgba(255,255,255,.3)", textAlign: "center" }}>
                  +261 33 664 07 77 · Reply within 2h
                </p>
              </div>
            </div>
          </div>
        </R>
      </div>

      <style>{`
        @keyframes faqOrb {
          0%,100% { transform:translateY(0) scale(1); }
          50%      { transform:translateY(-25px) scale(1.04); }
        }
        .scrollbar-hide::-webkit-scrollbar { display:none; }
      `}</style>
    </div>
  );
}