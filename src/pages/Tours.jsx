import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

if (typeof document !== "undefined" && !document.getElementById("kt-fonts")) {
  const l = document.createElement("link");
  l.id = "kt-fonts";
  l.rel = "stylesheet";
  l.href =
    "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap";
  document.head.appendChild(l);
}

const WA = "261336640777";
const wa = (msg) =>
  window.open(
    `https://wa.me/${WA}?text=${encodeURIComponent(msg || "Hello KiriTour!")}`,
    "_blank"
  );
const serif = "'Playfair Display', serif";
const sans = "'DM Sans', sans-serif";

const categories = [
  { id: "all",         label: "All Tours",           emoji: "🗺️", count: 14 },
  { id: "tsiribihina", label: "Tsiribihina River",   emoji: "🚣", count: 5  },
  { id: "andasibe",    label: "Andasibe Rainforest",  emoji: "🦎", count: 4  },
  { id: "tsingy",      label: "Tsingy de Bemaraha",   emoji: "⛰️", count: 2  },
  { id: "kirindy",     label: "Kirindy Forest",        emoji: "🌳", count: 2  },
  { id: "western",     label: "Western Day Tours",     emoji: "🌅", count: 1  },
];

/* ══════════════════════════════════════════════════════════════
   UUID MAP — chaque tour a un UUID fixe et permanent
   Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
   URL résultante: /tours/bf406213-f18d-465b-8ecc-e605c9a42a4b
══════════════════════════════════════════════════════════════ */
export const TOUR_UUID_MAP = {
  "tsiribihina-3d":      "a1b2c3d4-e5f6-4a7b-8c9d-e0f1a2b3c4d5",
  "tsiribihina-4d":      "b2c3d4e5-f6a7-4b8c-9d0e-f1a2b3c4d5e6",
  "tsiribihina-5d":      "c3d4e5f6-a7b8-4c9d-0e1f-a2b3c4d5e6f7",
  "tsiribihina-6d":      "d4e5f6a7-b8c9-4d0e-1f2a-b3c4d5e6f7a8",
  "tsiribihina-8d":      "e5f6a7b8-c9d0-4e1f-2a3b-c4d5e6f7a8b9",
  "andasibe-3d":         "f6a7b8c9-d0e1-4f2a-3b4c-d5e6f7a8b9c0",
  "andasibe-4d":         "a7b8c9d0-e1f2-4a3b-4c5d-e6f7a8b9c0d1",
  "andasibe-5d":         "b8c9d0e1-f2a3-4b4c-5d6e-f7a8b9c0d1e2",
  "andasibe-palmarium":  "c9d0e1f2-a3b4-4c5d-6e7f-a8b9c0d1e2f3",
  "tsingy-4d":           "d0e1f2a3-b4c5-4d6e-7f8a-b9c0d1e2f3a4",
  "tsingy-3d":           "e1f2a3b4-c5d6-4e7f-8a9b-c0d1e2f3a4b5",
  "kirindy-2d":          "f2a3b4c5-d6e7-4f8a-9b0c-d1e2f3a4b5c6",
  "kirindy-1d":          "a3b4c5d6-e7f8-4a9b-0c1d-e2f3a4b5c6d7",
  "western-1d":          "b4c5d6e7-f8a9-4b0c-1d2e-f3a4b5c6d7e8",
};

/* UUID → tour id (reverse lookup) */
export const UUID_TO_TOUR_ID = Object.fromEntries(
  Object.entries(TOUR_UUID_MAP).map(([tourId, uuid]) => [uuid, tourId])
);

export const tours = [
  // ----- TSIRIBIHINA & WEST -----
  {
    id: "tsiribihina-3d",
    category: "tsiribihina",
    title: "Sacred River & Wild Camps",
    subtitle: "3-Day Pirogue Descent",
    duration: "3 Days",
    tag: "Adventure",
    tagColor: "#0369a1",
    images: [
      "https://i.ibb.co/39X0PJvp/549159438-790143160593489-7850289184231709116-n.jpg",
      "https://i.ibb.co/BK47QxVF/487170957-642659705341836-3523930015298641710-n.jpg",
    ],
    desc: "Three days following the legendary Tsiribihina River, drifting past red cliffs, sacred Sakalava villages and lush riverine forest. Calm days on the water and starry nights on sandbank camps make this a pure, authentic Menabe experience.",
    rating: 5,
    pricing: [
      { pax: "1 Pax", price: "529€" },
      { pax: "4 Pax", price: "843€" },
      { pkg: "Price varies depending on group size." },
    ],
    itinerary: [
      { day: 1, loc: "Morondava → Miandrivazo", act: "4x4 drive north through changing highland and western landscapes. Board your traditional pirogue in the afternoon and begin the gentle descent. First riverside camp under the stars." },
      { day: 2, loc: "Tsiribihina River",        act: "Full day on the river, passing sacred villages, cliffs and natural pools. Swimming, birdwatching and relaxed campfire evening on a wild sandbank." },
      { day: 3, loc: "Final Descent",             act: "Last stretch to Belo-sur-Tsiribihina. Disembark, meet your 4x4 and continue towards Morondava with an optional Baobabs sunset stop." },
    ],
    inclusions: ["Traditional pirogue and crew","Local river guide","Camping equipment on the river","All river transfers during the descent"],
    exclusions: ["Flights and airport taxes","Meals and drinks in towns","Travel insurance","Tips and personal expenses"],
  },
  {
    id: "tsiribihina-4d",
    category: "tsiribihina",
    title: "River to Forest — Kirindy Extension",
    subtitle: "4-Day River + Wildlife",
    duration: "4 Days",
    tag: "Popular",
    tagColor: "#f97316",
    images: [
      "https://i.ibb.co/r20kzgq7/487467732-642658478675292-3652683727424298490-n.jpg",
      "https://i.ibb.co/0yXHktRS/IMG-20260224-WA0034.jpg",
    ],
    desc: "A balanced four-day escape combining the peaceful Tsiribihina River with the dry forest of Kirindy. Drift past villages, camp on the riverbank and then search for fossa and lemurs in one of Madagascar's most important forests.",
    rating: 5,
    pricing: [
      { pax: "1 Pax", price: "857€" },
      { pax: "4 Pax", price: "1 570€" },
      { pkg: "Price varies depending on group size." },
    ],
    itinerary: [
      { day: 1, loc: "Morondava → Miandrivazo", act: "Drive north to Miandrivazo, board your pirogue and start the descent with a first riverside camp at sunset." },
      { day: 2, loc: "Tsiribihina River",        act: "Full day on the water with stops at sacred sites, villages and natural pools. Overnight in a wild camp with simple Malagasy meals." },
      { day: 3, loc: "Belo → Kirindy",           act: "Arrive at Belo-sur-Tsiribihina and transfer by 4x4 to Kirindy Forest. Evening night walk to look for fossa and nocturnal wildlife." },
      { day: 4, loc: "Kirindy → Morondava",      act: "Dawn walk in the forest, then drive back to Morondava with a sunset at the Avenue of Baobabs." },
    ],
    inclusions: ["Pirogue descent on the Tsiribihina","4x4 transfers river ↔ Kirindy","Guided walks in Kirindy","Camping equipment on the river"],
    exclusions: ["International flights and visa","Meals not mentioned","Travel insurance","Tips and personal purchases"],
  },
  {
    id: "tsiribihina-5d",
    category: "tsiribihina",
    title: "Complete Western Circuit",
    subtitle: "5-Day River + Kirindy + Baobabs",
    duration: "5 Days",
    tag: "Best Value",
    tagColor: "#16a34a",
    images: [
      "https://i.ibb.co/842chRZk/539419198-771015829172889-8883411045894766482-n.jpg",
      "https://i.ibb.co/wNxNYYxT/IMG-20260224-WA0014.jpg",
    ],
    desc: "Five days to experience western Madagascar's essentials: Tsiribihina River, Kirindy Forest and the Avenue of Baobabs. A compact but complete loop for first-time visitors to Menabe.",
    rating: 5,
    pricing: [
      { pax: "1 Pax", price: "1 334€" },
      { pax: "4 Pax", price: "2 053€" },
      { pkg: "Price varies depending on group size." },
    ],
    itinerary: [
      { day: 1, loc: "TNR or Morondava → Miandrivazo", act: "Drive or fly to Miandrivazo, meet your crew and begin the river descent in the afternoon. First camp on the riverbank." },
      { day: 2, loc: "Tsiribihina River",               act: "Full day descent with village visits, swimming and birdwatching. Evening campfire and night under the stars." },
      { day: 3, loc: "Belo → Kirindy",                  act: "Land in Belo-sur-Tsiribihina, then continue by 4x4 to Kirindy Forest. Night walk searching for fossa and nocturnal lemurs." },
      { day: 4, loc: "Kirindy Full Day",                act: "Morning and late afternoon walks to maximise wildlife sightings. Free time at the lodge during the heat of the day." },
      { day: 5, loc: "Return + Baobabs",                act: "Drive back to Morondava with a final photo session at the Avenue of Baobabs at golden hour." },
    ],
    inclusions: ["Pirogue descent and camping","Private 4x4 with driver","Guided activities in Kirindy","Baobabs sunset stop"],
    exclusions: ["Domestic flights (if chosen)","Some meals and drinks","Travel insurance","Tips for guides and driver"],
  },
  {
    id: "tsiribihina-6d",
    category: "tsiribihina",
    title: "River, Tsingy & Sunset Magic",
    subtitle: "6-Day Extended Loop",
    duration: "6 Days",
    tag: "Extended",
    tagColor: "#7c2d12",
    images: [
      "https://i.ibb.co/twgdVcTx/548872959-787382534202885-5235352075499216038-n.jpg",
      "https://i.ibb.co/tgr2Kkz/PXL-20250617-065209669.jpg",
    ],
    desc: "A six-day loop for travellers who want the river, the Tsingy and Kirindy in one trip.",
    rating: 5,
    pricing: [
      { pax: "1 Pax", price: "1 558€" },
      { pax: "4 Pax", price: "3 068€" },
      { pkg: "Price varies depending on group size." },
    ],
    itinerary: [
      { day: 1, loc: "Morondava → River",   act: "Drive to Miandrivazo and board the pirogue. Begin the descent with your first wild camp on a sandbank." },
      { day: 2, loc: "Tsiribihina",         act: "Full day descent, visiting waterfalls, pools and riverside villages. Camp under a sky full of stars." },
      { day: 3, loc: "Belo → Bekopaka",     act: "Arrive at Belo and continue by 4x4 to Bekopaka, gateway to Tsingy de Bemaraha. Evening at the lodge." },
      { day: 4, loc: "Petit Tsingy",        act: "Morning hike in Petit Tsingy with viewpoints and narrow passages. Afternoon transfer towards Kirindy Forest." },
      { day: 5, loc: "Kirindy",             act: "Day and night walks in Kirindy to look for lemurs, birds and the fossa." },
      { day: 6, loc: "Return",              act: "Drive back to Morondava with a last Baobabs sunset on the way." },
    ],
    inclusions: ["Pirogue descent on Tsiribihina","4x4 transfers Belo ↔ Bekopaka ↔ Kirindy","Guided Tsingy and Kirindy visits","Baobabs sunset stop"],
    exclusions: ["Park entrance fees not specified","Meals in towns","Travel insurance","Personal expenses and tips"],
  },
  {
    id: "tsiribihina-8d",
    category: "tsiribihina",
    title: "Epic Menabe Grand Tour",
    subtitle: "8-Day Ultimate Adventure",
    duration: "8 Days",
    tag: "Epic",
    tagColor: "#7c2d12",
    images: [
      "https://i.ibb.co/zTPWvkwR/548080866-787382674202871-303494620730471973-n.jpg",
      "https://i.ibb.co/r20kzgq7/487467732-642658478675292-3652683727424298490-n.jpg",
    ],
    desc: "An eight-day grand tour for travellers who want to explore western Madagascar in depth.",
    rating: 5,
    pricing: [
      { pax: "1 Pax", price: "2 148€" },
      { pax: "4 Pax", price: "3 045€" },
      { pkg: "Price varies depending on group size." },
    ],
    itinerary: [
      { day: 1, loc: "TNR → Antsirabe",        act: "Drive south from Antananarivo to the thermal town of Antsirabe. Explore local workshops and markets before overnight." },
      { day: 2, loc: "Antsirabe → Miandrivazo", act: "Continue west to Miandrivazo, the gateway to the Tsiribihina River. Board the pirogue in the afternoon." },
      { day: 3, loc: "Tsiribihina River",        act: "Full day descent with swimming, birdwatching and village life. Camp on a wild sandbank." },
      { day: 4, loc: "Belo → Bekopaka",          act: "Arrive in Belo-sur-Tsiribihina, then drive through Bemaraha plateau landscapes to Bekopaka." },
      { day: 5, loc: "Grand Tsingy",             act: "Full-day technical hike in the Grand Tsingy with harnesses, ladders and panoramic viewpoints." },
      { day: 6, loc: "Bekopaka → Kirindy",       act: "Visit Manambolo Gorge by pirogue, then drive south to Kirindy Forest for a night walk." },
      { day: 7, loc: "Kirindy Wildlife",          act: "Dawn and dusk walks in Kirindy to spot lemurs, fossa and dry forest birds." },
      { day: 8, loc: "Return + Baobabs",          act: "Drive back to Morondava with a final sunset at the Avenue of Baobabs for unforgettable photos." },
    ],
    inclusions: ["All ground transportation by private 4x4","Pirogue descent and camping","Tsingy and Kirindy guided visits","Manambolo Gorge excursion"],
    exclusions: ["International and domestic flights","Meals not specified","Personal insurance","Tips and optional activities"],
  },

  // ----- ANDASIBE -----
  {
    id: "andasibe-3d",
    category: "andasibe",
    title: "Indri Calls & Night Walks",
    subtitle: "3-Day Rainforest Discovery",
    duration: "3 Days",
    tag: "Wildlife",
    tagColor: "#16a34a",
    images: [
      "https://i.ibb.co/CsJNYXX1/IMG-20260224-WA0050.jpg",
      "https://i.ibb.co/HTR6DHck/IMG-20260224-WA0062.jpg",
    ],
    desc: "A short but rich escape into the Andasibe rainforest. Listen to the haunting call of the indri, explore community reserves and join night walks in search of chameleons, frogs and nocturnal lemurs.",
    rating: 5,
    pricing: [
      { pax: "1 Pax", price: "996€" },
      { pax: "4 Pax", price: "1 868€" },
      { pkg: "Price varies depending on group size." },
    ],
    itinerary: [
      { day: 1, loc: "TNR → Andasibe",        act: "Drive east through highland scenery to Andasibe. Visit Exotic Park and VoiMMA community reserve. Night walk in the forest." },
      { day: 2, loc: "Mantadia NP",            act: "Full day in Mantadia National Park and Mitsinjo Reserve, looking for indri, diademed sifaka and rainforest birds." },
      { day: 3, loc: "Analamazaotra → TNR",   act: "Morning visit to Analamazaotra for close encounters with indri families. Optional Lemur Island before returning to Antananarivo." },
    ],
    inclusions: ["Private vehicle with driver from TNR","Visits to listed parks and reserves","Local guide in the parks","One night walk"],
    exclusions: ["Meals and drinks not included","Optional activity entrance fees","Travel insurance","Tips and personal purchases"],
  },
  {
    id: "andasibe-4d",
    category: "andasibe",
    title: "Lemur Kingdom Deep Dive",
    subtitle: "4-Day Extended Immersion",
    duration: "4 Days",
    tag: "Best Seller",
    tagColor: "#ef4444",
    images: [
      "https://i.ibb.co/LdLR5fWc/IMG-20260224-WA0033.jpg",
      "https://i.ibb.co/0j4kszqL/IMG-20260224-WA0035.jpg",
    ],
    desc: "Four days dedicated to Andasibe's different habitats: Mantadia's primary forest, Analamazaotra's indri territories and Lemur Island.",
    rating: 5,
    pricing: [
      { pax: "1 Pax", price: "1 328€" },
      { pax: "4 Pax", price: "2 508€" },
      { pkg: "Price varies depending on group size." },
    ],
    itinerary: [
      { day: 1, loc: "TNR → Andasibe",        act: "Drive east to Andasibe. Visit Exotic Park and enjoy an evening walk around the lodge or nearby forest." },
      { day: 2, loc: "Mantadia",              act: "Full day exploring Mantadia's network of trails with picnic lunch in the forest." },
      { day: 3, loc: "Analamazaotra + Lemur Island", act: "Morning walk in Analamazaotra National Park following indri calls. Afternoon at Lemur Island for close viewing and photos." },
      { day: 4, loc: "Return TNR",            act: "Optional short walk or village visit before driving back to Antananarivo." },
    ],
    inclusions: ["Transport TNR – Andasibe – TNR","All listed park and reserve visits","Professional local guide","One night walk"],
    exclusions: ["Some meals and drinks","Travel insurance","Tips and personal spending","Additional optional excursions"],
  },
  {
    id: "andasibe-5d",
    category: "andasibe",
    title: "Forest Immersion Experience",
    subtitle: "5-Day Multi-Park Explorer",
    duration: "5 Days",
    tag: "Immersive",
    tagColor: "#7c3aed",
    images: [
      "https://i.ibb.co/jvpX6s9d/IMG-20260224-WA0031.jpg",
      "https://i.ibb.co/mV4TGzGs/IMG-20260224-WA0018.jpg",
    ],
    desc: "A five-day Andasibe immersion for keen nature lovers.",
    rating: 5,
    pricing: [
      { pax: "1 Pax", price: "1 681€" },
      { pax: "4 Pax", price: "2 939€" },
      { pkg: "Price varies depending on group size." },
    ],
    itinerary: [
      { day: 1, loc: "TNR → Andasibe",        act: "Drive east from Antananarivo. Visit VoiMMA community reserve and join an evening forest walk." },
      { day: 2, loc: "Mantadia",              act: "Morning hike in Mantadia, afternoon in Mitsinjo Reserve discovering ferns and orchids." },
      { day: 3, loc: "Analamazaotra",         act: "Full day in Analamazaotra with flexible walks depending on weather and wildlife activity." },
      { day: 4, loc: "Vakona + Lemur Island", act: "Visit private reserves and Lemur Island for close-up lemur encounters." },
      { day: 5, loc: "Return",                act: "Optional early morning walk before returning by road to Antananarivo." },
    ],
    inclusions: ["Private vehicle and driver","Access to multiple parks and reserves","Local guide on all forest walks","Night walk and Lemur Island visit"],
    exclusions: ["Meals and drinks not stated as included","Insurance","Tips and souvenirs","Optional extra activities"],
  },
  {
    id: "andasibe-palmarium",
    category: "andasibe",
    title: "Rainforest to Aye-Aye Reserve",
    subtitle: "5-Day Andasibe + Palmarium",
    duration: "5 Days",
    tag: "Adventure",
    tagColor: "#0369a1",
    images: [
      "https://i.ibb.co/wZg61RGQ/IMG-20260224-WA0016.jpg",
      "https://i.ibb.co/k65y6VK8/IMG-20260224-WA0017.jpg",
    ],
    desc: "From Andasibe's cool rainforest to the tranquil waters of the Pangalanes Canal and the mysterious aye-aye of Palmarium.",
    rating: 5,
    pricing: [
      { pax: "1 Pax", price: "1 587€" },
      { pax: "4 Pax", price: "3 262€" },
      { pkg: "Price varies depending on group size." },
    ],
    itinerary: [
      { day: 1, loc: "TNR → Andasibe",                      act: "Drive east to Andasibe. Visit VoiMMA Reserve and join an evening forest walk." },
      { day: 2, loc: "Mantadia",                             act: "Full-day exploration of Mantadia National Park with picnic in the forest." },
      { day: 3, loc: "Andasibe → Manambato → Palmarium",    act: "Morning rainforest walk. Drive to Manambato and cross the Pangalanes Canal by boat to Palmarium." },
      { day: 4, loc: "Palmarium",                            act: "Guided walks in the private reserve, boat excursion on the canal and night outing to observe aye-aye." },
      { day: 5, loc: "Return TNR",                           act: "Boat back to Manambato and road transfer to Antananarivo with scenic stops." },
    ],
    inclusions: ["Transport TNR → Andasibe → Manambato → TNR","Boat transfers on the Pangalanes","Guided walks in Andasibe and Palmarium","Night aye-aye excursion"],
    exclusions: ["Beverages and some meals","Insurance","Tips","Optional extra boat trips"],
  },

  // ----- TSINGY -----
  {
    id: "tsingy-4d",
    category: "tsingy",
    title: "Limestone Cathedrals & Wildlife",
    subtitle: "4-Day Tsingy Grand Circuit",
    duration: "4 Days",
    tag: "UNESCO",
    tagColor: "#ef4444",
    images: [
      "https://i.ibb.co/zhTgMVW2/IMG-20250915-211514.jpg",
      "https://i.ibb.co/rftnZBYj/IMG-20260224-WA0013.jpg",
    ],
    desc: "Four days around Tsingy de Bemaraha, combining Grand and Petit Tsingy with Kirindy Forest and the Avenue of Baobabs.",
    rating: 5,
    pricing: [
      { pkg: "Car Hire Only",              range: "488€ – 858€"   },
      { pkg: "Car + Guide",                range: "590€ – 933€"   },
      { pkg: "Car + Excursions + Guide",   range: "795€ – 1 265€" },
      { pkg: "Full Package",               range: "1 004€ – 1 196€" },
      { pkg: "Price varies depending on group size." },
    ],
    itinerary: [
      { day: 1, loc: "Morondava → Bekopaka", act: "Depart Morondava by 4x4, stop at the Avenue of Baobabs, then continue with ferry crossings to Bekopaka." },
      { day: 2, loc: "Grand & Petit Tsingy", act: "Technical hike in Grand Tsingy using harnesses and ladders, then explore Petit Tsingy's canyons and viewpoints." },
      { day: 3, loc: "Bekopaka → Kirindy",   act: "Optional pirogue visit to Manambolo Gorge. Drive south to Kirindy Forest and join a night walk." },
      { day: 4, loc: "Kirindy → Morondava",  act: "Morning walk in Kirindy. Return to Morondava with a final sunset at the Avenue of Baobabs." },
    ],
    inclusions: ["Private 4x4 and driver (depending on option)","Tsingy park entry and local guide (on full options)","Kirindy walks (on excursion / full packages)","Avenue of Baobabs visit"],
    exclusions: ["Flights and visa","Meals not specified in the chosen option","Travel insurance","Tips and personal expenses"],
  },
  {
    id: "tsingy-3d",
    category: "tsingy",
    title: "Quick Tsingy Adventure Loop",
    subtitle: "3-Day Express Circuit",
    duration: "3 Days",
    tag: "Popular",
    tagColor: "#f97316",
    images: [
      "https://i.ibb.co/DDm4hQf8/IMG-20251030-WA0015.jpg",
      "https://i.ibb.co/YBDp5cM5/20250817-102639.jpg",
    ],
    desc: "A compact three-day loop for travellers with limited time who still want to experience the Tsingy.",
    rating: 5,
    pricing: [
      { pkg: "Car Hire Only",            range: "369€ – 728€" },
      { pkg: "Car + Excursions + Guide", range: "597€ – 965€" },
      { pkg: "Full Package",             range: "722€ – 912€" },
      { pkg: "Price varies depending on group size." },
    ],
    itinerary: [
      { day: 1, loc: "Morondava → Bekopaka", act: "Drive west with a brief stop at the Avenue of Baobabs, then continue over ferries and dirt tracks to Bekopaka." },
      { day: 2, loc: "Grand & Petit Tsingy", act: "Full day exploring Grand and Petit Tsingy with a local guide, using bridges, ladders and viewpoints." },
      { day: 3, loc: "Bekopaka → Morondava", act: "Optional Manambolo Gorge visit by pirogue. Return to Morondava with Baobabs sunset stop." },
    ],
    inclusions: ["4x4 transfers Morondava ↔ Bekopaka","Tsingy excursions (on selected options)","Baobabs stops both ways"],
    exclusions: ["Flights and visa","Meals not included in your package","Insurance","Tips and personal items"],
  },

  // ----- KIRINDY -----
  {
    id: "kirindy-2d",
    category: "kirindy",
    title: "Fossa & Nocturnal Wildlife Hunt",
    subtitle: "2-Day or 3-Day Forest Immersion",
    duration: "2 Days or 3 Days (with Baobabs)",
    tag: "Wildlife",
    tagColor: "#16a34a",
    images: [
      "https://i.ibb.co/C5CXsY8M/IMG-20251030-WA0106.jpg",
      "https://i.ibb.co/N2Yp5zg5/LMC-20250613-155735-Color-boost-LMC8-4by-Riyan-1-PORTRAIT.jpg",
    ],
    desc: "Two days in Kirindy Forest to maximise your chances of seeing fossa, sifakas and nocturnal species.",
    rating: 5,
    pricing: [
      { pkg: "Full Package 3 days for 1pax", range: "718€ – 808€" },
      { pkg: "Full Package 2 days for 1pax", range: "344€ – 523€" },
      { pkg: "Car + Excursion",              range: "336€ – 417€" },
      { pkg: "Car Hire Only",                range: "253€ – 313€" },
      { pkg: "Price varies depending on group size." },
    ],
    itinerary: [
      { day: 1, loc: "Morondava → Kirindy", act: "Morning departure to Kirindy. Afternoon forest walk, then night walk looking for fossa, mouse lemurs and chameleons." },
      { day: 2, loc: "Kirindy",             act: "Visit the dry forest in the early morning to see sifakas and birds. Free time at the lodge during the heat of the day." },
      { day: 3, loc: "Kirindy → Baobabs → Morondava", act: "Dawn walk in cool morning air, then drive back to Morondava with a Baobabs sunset stop." },
    ],
    inclusions: ["4x4 Morondava ↔ Kirindy","Guided day & night walks (on excursion/full)","Kirindy entry fees (full package)","Baobabs sunset stop"],
    exclusions: ["Flights and visa","Meals on car-hire-only options","Insurance","Tips and personal expenses"],
  },
  {
    id: "kirindy-1d",
    category: "kirindy",
    title: "One Day in the Wild Forest",
    subtitle: "1-Day Kirindy Express",
    duration: "1 Day",
    tag: "Day Tour",
    tagColor: "#2563eb",
    images: [
      "https://i.ibb.co/JbNhtyq/IMG-20251030-WA0083.jpg",
      "https://i.ibb.co/WvgBzyDQ/IMG-20251030-WA0087.jpg",
    ],
    desc: "A full-day excursion from Morondava to Kirindy for travellers short on time.",
    rating: 5,
    pricing: [{ pkg: "Car + Excursion + Guide  (Price varies depending on group size.)", range: "191€ – 224€" }],
    itinerary: [
      { day: 1, loc: "Morondava → Kirindy → Morondava", act: "Early departure, guided walks in Kirindy, then drive back with a Baobabs sunset stop before reaching Morondava." },
    ],
    inclusions: ["4x4 Morondava ↔ Kirindy","Guided forest walk","Baobabs sunset stop"],
    exclusions: ["Meals and drinks","Insurance","Tips and personal purchases"],
  },

  // ----- WESTERN DAY -----
  {
    id: "western-1d",
    category: "western",
    title: "Betania, Kimony & Sacred Sites",
    subtitle: "1-Day Western Highlights",
    duration: "1 Day",
    tag: "Culture",
    tagColor: "#7c3aed",
    images: [
      "https://i.ibb.co/svSCbRxM/IMG-20260224-WA0036.jpg",
      "https://i.ibb.co/WWR5r6cG/IMG-20260224-WA0004.jpg",
    ],
    desc: "A relaxed cultural and coastal day around Morondava: Betania fishing village, Kimony Beach, local sacred sites and the Avenue of Baobabs at sunset.",
    rating: 5,
    pricing: [{ pkg: "Car + Excursion + Guide", range: "145€ – 205€" }],
    itinerary: [
      { day: 1, loc: "Morondava Circuit", act: "Boat or 4x4 to Betania village, beach time at Kimony, visit to Zazamambe sacred site and Baobabs Alley at sunset." },
    ],
    inclusions: ["Transport for the full-day circuit","Local guide","Stops at Betania, Kimony and Baobabs"],
    exclusions: ["Meals and drinks","Travel insurance","Tips and personal expenses"],
  },
];

/* ══ TOUR CARD ════════════════════════════════════════════════════ */
function TourCard({ tour, onOpen }) {
  const [ci, setCi] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (tour.images.length <= 1) return;
    const t = setInterval(() => setCi((i) => (i + 1) % tour.images.length), 3800);
    return () => clearInterval(t);
  }, [tour.images.length]);

  const firstPrice = tour.pricing?.[0]?.price || tour.pricing?.[0]?.range || "";
  const lastItem   = tour.pricing?.[tour.pricing.length - 1];
  const lastPrice  = lastItem?.price || lastItem?.range || "";

  const handleDetails = (e) => {
    e?.stopPropagation();
    const uuid = TOUR_UUID_MAP[tour.id];
    navigate(`/tours/${uuid}`);
  };

  return (
    <div
      className="group bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col border border-slate-100 cursor-pointer"
      onClick={handleDetails}
    >
      <div className="relative h-52 overflow-hidden flex-shrink-0">
        <img
          src={tour.images[ci]}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={(e) => { e.target.src = "https://i.ibb.co/5xXLDSZQ/20250729-173834.jpg"; }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(15,23,42,0.55) 0%,transparent 55%)" }} />
        <span className="absolute top-3 left-3 text-emerald-900 text-[11px] font-black px-2.5 py-1 rounded-full shadow-sm" style={{ background: tour.tagColor, fontFamily: sans }}>
          {tour.tag}
        </span>
        <span className="absolute top-3 right-3 text-emerald-900 text-[11px] font-black px-3 py-1 rounded-full shadow-sm" style={{ background: "#facc15", fontFamily: sans }}>
          {tour.duration}
        </span>
        {tour.images.length > 1 && (
          <>
            <button onClick={(e) => { e.stopPropagation(); setCi((i) => (i - 1 + tour.images.length) % tour.images.length); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-slate-900/40 hover:bg-slate-900/70 text-amber-300 flex items-center justify-center text-base transition-all">‹</button>
            <button onClick={(e) => { e.stopPropagation(); setCi((i) => (i + 1) % tour.images.length); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-slate-900/40 hover:bg-slate-900/70 text-amber-300 flex items-center justify-center text-base transition-all">›</button>
          </>
        )}
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="text-white font-black text-lg leading-tight mb-0.5" style={{ fontFamily: serif, textShadow: "0 2px 10px rgba(15,23,42,0.7)" }}>{tour.title}</h3>
          <p className="text-slate-100/80 text-xs italic line-clamp-1" style={{ fontFamily: sans }}>{tour.subtitle}</p>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex gap-0.5 mb-3 items-center">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-sm ${i < tour.rating ? "text-amber-400" : "text-slate-200"}`}>★</span>
          ))}
          <span className="text-slate-400 text-xs ml-1.5" style={{ fontFamily: sans }}>{tour.rating}.0</span>
        </div>
        <p className="text-slate-600 text-xs mb-4 line-clamp-3" style={{ fontFamily: sans }}>{tour.desc}</p>
        <div className="mb-4 mt-auto">
          <p className="text-[10px] text-slate-400 font-semibold tracking-widest uppercase mb-0.5" style={{ fontFamily: sans }}>From</p>
          <div className="flex items-baseline flex-wrap gap-x-1.5">
            <span className="text-amber-600 text-xl font-black leading-none" style={{ fontFamily: serif }}>{firstPrice}</span>
            {lastPrice && lastPrice !== firstPrice && (
              <>
                <span className="text-slate-400 text-xs" style={{ fontFamily: sans }}>to</span>
                <span className="text-emerald-700 text-base font-bold leading-none" style={{ fontFamily: serif }}>{lastPrice}</span>
              </>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleDetails}
            className="flex-1 py-2.5 rounded-full text-sm font-semibold border-2 border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white transition-all duration-300"
            style={{ fontFamily: sans }}
          >
            Details
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); wa(`Hello! Interested in: ${tour.title}`); }}
            className="flex-1 py-2.5 rounded-full text-sm font-bold text-emerald-900 hover:scale-105 transition-all shadow-md"
            style={{ background: "linear-gradient(135deg,#facc15,#fbbf24,#f59e0b)", fontFamily: sans }}
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══ MAIN ═════════════════════════════════════════════════════════ */
export default function Tours() {
  const [cat, setCat] = useState("all");
  const filtered = cat === "all" ? tours : tours.filter((t) => t.category === cat);

  return (
    <div className="min-h-screen" style={{ background: "#f5f7fb", fontFamily: sans }}>

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ minHeight: "70vh", background: "linear-gradient(135deg,#047857 0%,#0f766e 35%,#0369a1 70%,#1d4ed8 100%)" }}>
        <div className="absolute inset-0" style={{ backgroundImage: "url(https://i.ibb.co/4ZMwFVFh/IMG-20251030-WA0008.jpg)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.18 }} />
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 md:py-28">
          <span className="inline-block px-4 py-1.5 rounded-full text-emerald-900 text-xs font-bold tracking-widest uppercase border border-emerald-100/80 mb-6" style={{ background: "rgba(236,252,203,0.9)", fontFamily: sans }}>
            🌴 Menabe · Madagascar
          </span>
          <h1 className="text-white font-black leading-none mb-5" style={{ fontFamily: serif, fontSize: "clamp(2.6rem,6vw,4.6rem)", letterSpacing: "-0.03em" }}>
            Discover Our<br />
            <em style={{ color: "#fde68a" }}>Signature Adventures</em>
          </h1>
          <p className="text-emerald-50/90 text-base md:text-lg mb-8 leading-relaxed max-w-xl" style={{ fontFamily: sans }}>
            14 carefully designed journeys combining UNESCO sites, endemic wildlife, sacred rivers and golden sunsets over iconic baobabs.
          </p>
          <div className="flex flex-wrap gap-3 items-center">
            <button onClick={() => document.getElementById("tours")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3.5 rounded-full font-black text-emerald-900 hover:scale-105 transition-all duration-300 text-sm shadow-lg"
              style={{ background: "linear-gradient(135deg,#facc15,#fbbf24,#f59e0b)", fontFamily: sans }}>
              Explore All 14 Tours
            </button>
            <button onClick={() => wa("Hello! I'd like some help choosing the right tour.")}
              className="px-6 py-3 rounded-full text-sm font-semibold border border-emerald-100/80 text-emerald-50 hover:bg-emerald-50/10 transition-all"
              style={{ fontFamily: sans }}>
              💬 Get personal advice
            </button>
          </div>
        </div>
      </section>

      {/* TOURS LIST */}
      <section id="tours" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-amber-500 text-xs font-bold tracking-widest uppercase mb-2" style={{ fontFamily: sans }}>All packages</p>
            <h2 style={{ fontFamily: serif, color: "#065f46" }} className="text-3xl md:text-4xl font-black mb-3">Choose Your Adventure</h2>
            <p className="text-slate-500 text-sm" style={{ fontFamily: sans }}>{filtered.length} curated tours across river, forest, stone and coast.</p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((c) => (
              <button key={c.id} onClick={() => setCat(c.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${cat === c.id ? "scale-105 text-emerald-900 shadow-md" : "text-slate-600 border border-slate-200 hover:border-amber-300"}`}
                style={{ background: cat === c.id ? "#facc15" : "#ffffff", fontFamily: sans }}>
                {c.emoji} {c.label} ({c.count})
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((t) => (
              <TourCard key={t.id} tour={t} onOpen={() => {}} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#0f766e 0%,#0369a1 45%,#1d4ed8 100%)" }}>
        <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
          <h2 className="font-black leading-none mb-5" style={{ fontFamily: serif, fontSize: "clamp(2rem,5vw,3.5rem)" }}>
            Your Perfect Tour<br />
            <em style={{ color: "#fde68a" }}>Starts with one message.</em>
          </h2>
          <p className="text-emerald-50/90 text-base md:text-lg mb-10 leading-relaxed" style={{ fontFamily: sans }}>
            Tell us your travel dates and interests, and we will design a western Madagascar itinerary just for you.
          </p>
          <button onClick={() => wa("Hello! I'd like to plan my tour with you.")}
            className="px-10 py-5 rounded-full font-black text-emerald-900 text-lg hover:scale-105 transition-all"
            style={{ background: "linear-gradient(135deg,#facc15,#fbbf24,#f59e0b)", boxShadow: "0 0 40px rgba(250,204,21,0.45)", fontFamily: sans }}>
            📲 Plan via WhatsApp
          </button>
        </div>
      </section>
    </div>
  );
}