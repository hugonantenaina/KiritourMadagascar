import React, { useState } from "react";
const serif = "'Playfair Display', serif";
const sans  = "'DM Sans', sans-serif";

if (typeof document !== "undefined" && !document.getElementById("kt-fonts")) {
  const link = document.createElement("link");
  link.id = "kt-fonts"; link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap";
  document.head.appendChild(link);
}

function Section({ number, title, children }) {
  return (
    <div className="mb-8 pb-8 border-b border-gray-100 last:border-0">
      <div className="flex items-start gap-4 mb-3">
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-700 text-white text-sm font-black flex items-center justify-center" style={{ fontFamily: sans }}>
          {number}
        </span>
        <h3 className="text-xl font-black text-green-800 pt-0.5" style={{ fontFamily: serif }}>{title}</h3>
      </div>
      <div className="ml-12 text-gray-600 text-sm leading-relaxed" style={{ fontFamily: sans }}>
        {children}
      </div>
    </div>
  );
}

function CancellationTable() {
  const rows = [
    { period: "Plus de 60 jours / 60+ days",  fr: "100% remboursé",  en: "Full refund",          color: "bg-green-50 text-green-700" },
    { period: "30 – 60 jours / 30–60 days",   fr: "50% remboursé",   en: "50% refund",           color: "bg-yellow-50 text-yellow-700" },
    { period: "15 – 30 jours / 15–30 days",   fr: "25% remboursé",   en: "25% refund",           color: "bg-orange-50 text-orange-700" },
    { period: "Moins de 15 jours / Under 15", fr: "0% remboursé",    en: "No refund",            color: "bg-red-50 text-red-700" },
    { period: "No-show",                       fr: "0% + frais supp.", en: "No refund + extras",  color: "bg-red-100 text-red-800" },
  ];
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-100 mt-4">
      <div className="grid grid-cols-3 bg-green-700 text-white text-xs font-bold uppercase tracking-widest px-4 py-3" style={{ fontFamily: sans }}>
        <span>Délai / Timeframe</span>
        <span>Français</span>
        <span>English</span>
      </div>
      {rows.map((r, i) => (
        <div key={i} className={`grid grid-cols-3 px-4 py-3 text-sm border-t border-gray-100 ${r.color}`} style={{ fontFamily: sans }}>
          <span className="font-semibold text-gray-700">{r.period}</span>
          <span className="font-bold">{r.fr}</span>
          <span className="font-bold">{r.en}</span>
        </div>
      ))}
    </div>
  );
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-yellow-600 text-xs font-bold tracking-widest uppercase mb-3" style={{ fontFamily: sans }}>KiriTour Madagascar</p>
          <h1 className="text-4xl md:text-5xl font-black text-green-800 mb-4" style={{ fontFamily: serif }}>
            Terms & Conditions
          </h1>
          <p className="text-gray-400 text-sm" style={{ fontFamily: sans }}>
            Conditions Générales de Réservation — Effective 2026
          </p>
          <div className="mt-4 h-1 w-20 mx-auto rounded-full" style={{ background: "linear-gradient(90deg,#14532d,#facc15)" }} />
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">

          <Section number="1" title="Réservation / Booking">
            <p>Toute réservation devient effective après confirmation écrite et paiement de l'acompte (30% du montant total). L'acompte est non remboursable car il couvre les frais engagés immédiatement auprès de nos prestataires.</p>
            <p className="mt-2 text-gray-400 italic">All bookings become effective upon written confirmation and payment of the deposit (30% of total). The deposit is non-refundable as it covers costs immediately incurred with our suppliers (hotels, vehicles, guides).</p>
          </Section>

          <Section number="2" title="Paiement / Payment">
            <div className="space-y-2">
              <p>Les modalités de paiement sont les suivantes :</p>
              <ul className="list-none space-y-1 mt-2">
                <li className="flex items-center gap-2"><span className="text-green-600 font-bold">→</span> Acompte 30% à la réservation (non remboursable)</li>
                <li className="flex items-center gap-2"><span className="text-green-600 font-bold">→</span> 40% supplémentaires 30 jours avant le départ</li>
                <li className="flex items-center gap-2"><span className="text-green-600 font-bold">→</span> Solde 30% à l'arrivée ou 7 jours avant</li>
              </ul>
              <p className="mt-3 text-gray-400 italic">Payment schedule: 30% deposit at booking (non-refundable) · 40% thirty days before departure · 30% balance on arrival or 7 days prior.</p>
            </div>
          </Section>

          <Section number="3" title="Annulation & Remboursement / Cancellation Policy">
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-4">
              <p className="text-amber-800 text-xs font-bold uppercase tracking-widest mb-2">⚠️ Important</p>
              <p className="text-amber-700 text-sm">KiriTour Madagascar pré-réserve hôtels, véhicules et guides en votre nom dès la confirmation. Les frais d'annulation reflètent les coûts non récupérables déjà engagés auprès de nos prestataires.</p>
              <p className="mt-2 text-amber-600 text-sm italic">KiriTour Madagascar pre-books hotels, vehicles and guides on your behalf upon confirmation. Cancellation fees reflect non-recoverable costs already incurred with our suppliers.</p>
            </div>

            <CancellationTable />

            <div className="mt-4 bg-green-50 rounded-xl p-4 border border-green-100">
              <p className="text-green-800 font-bold text-sm mb-2">💡 Alternative au remboursement / Alternative to refund</p>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>✅ <strong>Report de tour :</strong> Votre réservation peut être reportée à une nouvelle date dans les 12 mois sans frais supplémentaires (sous réserve de disponibilité).</li>
                <li className="mt-1 text-gray-400 italic">✅ <strong>Tour postponement:</strong> Your booking may be rescheduled to a new date within 12 months at no extra charge (subject to availability).</li>
                <li className="mt-2">✅ <strong>Crédit tour :</strong> Un avoir équivalent peut être utilisé pour toute autre prestation KiriTour dans les 18 mois.</li>
                <li className="mt-1 text-gray-400 italic">✅ <strong>Tour credit:</strong> An equivalent credit note may be used for any KiriTour service within 18 months.</li>
              </ul>
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-blue-800 font-bold text-sm mb-1">🛡️ Travel Insurance — Fortement recommandé</p>
              <p className="text-blue-700 text-sm">Nous recommandons vivement la souscription d'une assurance voyage couvrant l'annulation, les frais médicaux et le rapatriement avant toute réservation.</p>
              <p className="mt-1 text-blue-500 text-sm italic">We strongly recommend purchasing travel insurance covering cancellation, medical costs and repatriation before booking.</p>
            </div>
          </Section>

          <Section number="4" title="Force Majeure">
            <p>En cas de force majeure (pandémie, catastrophe naturelle, fermeture de frontières, instabilité politique), KiriTour Madagascar proposera un report sans frais ou un avoir. Aucun remboursement en espèces ne sera dû si des coûts ont déjà été engagés.</p>
            <p className="mt-2 text-gray-400 italic">In the event of force majeure (pandemic, natural disaster, border closure, political instability), KiriTour Madagascar will offer a postponement or credit note. No cash refund will be owed where costs have already been incurred.</p>
          </Section>

          <Section number="5" title="Responsabilité / Liability">
            <p>KiriTour Madagascar agit comme intermédiaire et organisateur de services touristiques. L'agence ne pourra être tenue responsable des retards de transport, mauvaises conditions météorologiques, accidents indépendants de sa volonté ou décisions administratives.</p>
            <p className="mt-2 text-gray-400 italic">KiriTour Madagascar acts as an intermediary and organiser of tourist services. The agency cannot be held responsible for transport delays, adverse weather, accidents beyond its control, or administrative decisions.</p>
          </Section>

          <Section number="6" title="Comportement / Client Conduct">
            <p>Le client doit respecter les horaires, les règles de sécurité et les consignes des guides et chauffeurs. KiriTour Madagascar se réserve le droit d'exclure tout client dont le comportement mettrait en danger les autres participants, sans remboursement.</p>
            <p className="mt-2 text-gray-400 italic">Clients must respect schedules, safety rules and guide instructions. KiriTour Madagascar reserves the right to exclude any client whose behaviour endangers others, without refund.</p>
          </Section>

          <Section number="7" title="Modification du programme / Changes">
            <p>Le programme peut être modifié pour des raisons de sécurité, météo ou indisponibilité. KiriTour Madagascar s'efforcera de proposer des alternatives équivalentes sans frais supplémentaires.</p>
            <p className="mt-2 text-gray-400 italic">The itinerary may be modified for safety, weather or availability reasons. KiriTour Madagascar will endeavour to offer equivalent alternatives at no additional cost.</p>
          </Section>

          <Section number="8" title="Acceptation / Acceptance">
            <p>Toute réservation et tout paiement d'acompte implique l'acceptation pleine et entière des présentes conditions générales.</p>
            <p className="mt-2 text-gray-400 italic">Any booking and deposit payment implies full and unconditional acceptance of these general terms and conditions.</p>
          </Section>

          {/* Contact */}
          <div className="mt-8 bg-green-50 rounded-2xl p-6 border border-green-100 text-center">
            <p className="text-green-800 font-bold text-sm mb-2" style={{ fontFamily: sans }}>Questions? Contact us / Contactez-nous</p>
            <p className="text-gray-500 text-xs" style={{ fontFamily: sans }}>
              📱 +261 33 664 07 77 · ✉️ infokiritourmadagascar@gmail.com
            </p>
            <p className="text-gray-400 text-xs mt-1" style={{ fontFamily: sans }}>
              📍 Morondava, Madagascar 619
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}