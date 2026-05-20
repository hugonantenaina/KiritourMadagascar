import React from "react";
const serif = "'Playfair Display', serif";
const sans  = "'DM Sans', sans-serif";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">

        <div className="text-center mb-12">
          <p className="text-yellow-600 text-xs font-bold tracking-widest uppercase mb-3" style={{ fontFamily: sans }}>KiriTour Madagascar</p>
          <h1 className="text-4xl md:text-5xl font-black text-green-800 mb-4" style={{ fontFamily: serif }}>Privacy Policy</h1>
          <p className="text-gray-400 text-sm" style={{ fontFamily: sans }}>Last updated: May 2026</p>
          <div className="mt-4 h-1 w-20 mx-auto rounded-full" style={{ background: "linear-gradient(90deg,#14532d,#facc15)" }} />
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 space-y-8">

          {[
            {
              title: "Information We Collect",
              content: "We collect information you provide when making a booking: name, email, phone number, nationality, and tour preferences. We do not collect payment card data — payments are handled via direct transfer or mobile money."
            },
            {
              title: "How We Use Your Information",
              content: "Your information is used solely to organise and confirm your tour, communicate about your booking, and improve our services. We never sell your personal data to third parties."
            },
            {
              title: "WhatsApp & Communication",
              content: "When you contact us via WhatsApp, your messages are processed by WhatsApp (Meta). We retain booking conversations for operational purposes. You can request deletion at any time."
            },
            {
              title: "Cookies",
              content: "Our website uses minimal cookies for analytics (Google Analytics) to understand how visitors use our site. No advertising cookies are used. You can disable cookies in your browser settings."
            },
            {
              title: "Data Security",
              content: "We take reasonable measures to protect your personal information. Our website is served over HTTPS. Booking information is stored securely and accessible only to authorised staff."
            },
            {
              title: "Your Rights",
              content: "You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at infokiritourmadagascar@gmail.com or via WhatsApp."
            },
            {
              title: "Contact",
              content: "For any privacy concerns: infokiritourmadagascar@gmail.com · +261 33 664 07 77 · Morondava, Madagascar 619"
            }
          ].map((s, i) => (
            <div key={i} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
              <h3 className="text-lg font-black text-green-800 mb-2" style={{ fontFamily: serif }}>{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: sans }}>{s.content}</p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}