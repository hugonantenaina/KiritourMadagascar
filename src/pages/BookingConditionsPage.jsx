import React from "react";
const serif = "'Playfair Display', serif";
const sans  = "'DM Sans', sans-serif";

export default function BookingConditionsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">

        <div className="text-center mb-12">
          <p className="text-yellow-600 text-xs font-bold tracking-widest uppercase mb-3" style={{ fontFamily: sans }}>KiriTour Madagascar</p>
          <h1 className="text-4xl md:text-5xl font-black text-green-800 mb-4" style={{ fontFamily: serif }}>Booking Conditions</h1>
          <p className="text-gray-400 text-sm" style={{ fontFamily: sans }}>How to book your Madagascar adventure</p>
          <div className="mt-4 h-1 w-20 mx-auto rounded-full" style={{ background: "linear-gradient(90deg,#14532d,#facc15)" }} />
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {[
              { step:"01", title:"Contact Us", desc:"Send us your travel dates, group size, and interests via WhatsApp or email. We respond within 2 hours.", icon:"💬" },
              { step:"02", title:"Receive Your Quote", desc:"We'll send you a personalised itinerary and transparent price quote. No hidden fees.", icon:"📋" },
              { step:"03", title:"Confirm & Deposit", desc:"Confirm your booking by paying the deposit (30% of total). Balance due 7 days before departure.", icon:"✅" },
              { step:"04", title:"Explore Madagascar", desc:"Your guide meets you on arrival. Everything is arranged — transfers, accommodation, permits.", icon:"🌴" },
            ].map((s, i) => (
              <div key={i} className="bg-green-50 rounded-2xl p-6 border border-green-100">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{s.icon}</span>
                  <span className="text-xs font-black text-green-600 tracking-widest uppercase" style={{ fontFamily: sans }}>Step {s.step}</span>
                </div>
                <h3 className="font-black text-green-800 text-lg mb-2" style={{ fontFamily: serif }}>{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: sans }}>{s.desc}</p>
              </div>
            ))}
          </div>

          {/* What's included */}
          <div className="mb-8">
            <h3 className="text-xl font-black text-green-800 mb-4" style={{ fontFamily: serif }}>What's Included</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "✅ Private 4x4 transport",
                "✅ Certified local guide",
                "✅ National park entrance fees",
                "✅ Boat crossings where applicable",
                "✅ Accommodation (where specified)",
                "✅ WhatsApp support 24/7",
              ].map((item, i) => (
                <p key={i} className="text-gray-600 text-sm" style={{ fontFamily: sans }}>{item}</p>
              ))}
            </div>
          </div>

          {/* Not included */}
          <div className="mb-8">
            <h3 className="text-xl font-black text-green-800 mb-4" style={{ fontFamily: serif }}>Not Included</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "❌ International flights",
                "❌ Travel insurance",
                "❌ Personal expenses",
                "❌ Tips (optional but appreciated)",
                "❌ Visa fees",
                "❌ Meals (unless specified)",
              ].map((item, i) => (
                <p key={i} className="text-gray-600 text-sm" style={{ fontFamily: sans }}>{item}</p>
              ))}
            </div>
          </div>

          {/* Payment */}
          <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 mb-8">
            <h3 className="font-black text-amber-800 text-lg mb-3" style={{ fontFamily: serif }}>Payment Methods</h3>
            <ul className="text-gray-600 text-sm space-y-1" style={{ fontFamily: sans }}>
              <li>💶 Bank transfer (EUR/USD)</li>
              <li>📱 MVola / Airtel Money (MGA)</li>
              <li>💵 Cash on arrival (EUR/USD/MGA)</li>
              <li>💳 Western Union / MoneyGram</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="text-center">
            <a href="https://wa.me/261336640777?text=Hello KiriTour! I'd like to book a tour."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-black text-green-900 text-base hover:scale-105 transition-transform"
              style={{ background: "linear-gradient(135deg,#facc15,#f59e0b)", fontFamily: sans }}>
              📲 Book via WhatsApp
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}