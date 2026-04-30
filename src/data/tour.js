const tours = [
  // --- Tsingy de Bemaraha, Kirindy & Avenue of Baobabs 4 Days ---
  {
    id: "tsingy-kirindy-baobabs-2025-4days",
    title: "Tsingy de Bemaraha, Kirindy Forest Reserve & Avenue of Baobabs – 2025 (4 Days)",
    image: "/images/tsingy-cover.jpg",
    images: ["/images/tsingy1.jpg", "/images/tsingy2.jpg", "/images/tsingy3.jpg", "/images/tsingy4.jpg"],
    shortDesc: "Typical 4-Day Excursion through Menabe Sakalava Kingdom: Morondava, Tsingy, Kirindy, Avenue of Baobabs.",
    shortDescFR: "Vivez l'Immersion au Cœur de la Nature Sauvage de Madagascar. Respirez l'air de l'Aventure… plongez dans la culture malgache et partagez des moments vrais avec la faune endémique et les communautés locales.",
    shortDescENG: "Experience an immersive journey into the wild nature of Madagascar. Feel the wind and red earth, engage with Malagasy culture and share authentic moments with endemic wildlife and local communities.",
    itinerary: [
      { day: 1, location: "Morondava – Bekopaka", activity: "Early morning departure north for Belo Tsiribihina. Ferry crossing. Overnight in Bekopaka. (D)", activityFR: "Jour 1 : Lancement de l'Aventure 4x4 vers Bekopaka… trajet incluant l'Allée des Baobabs et les traversées en bac.", activityENG: "Day 1: Start of the 4x4 adventure to Bekopaka… journey includes Avenue of Baobabs and ferry crossings." },
      { day: 2, location: "Bekopaka", activity: "Explore Grand Tsingy. Afternoon Petit Tsingy visit. Overnight in Bekopaka. (B,D)", activityFR: "Jour 2 : Exploration Intense du Grand et Petit Tsingy… ascension du Grand Tsingy et randonnée technique, après-midi Petit Tsingy.", activityENG: "Day 2: Intense exploration of Grand and Petit Tsingy… early Grand Tsingy ascent, technical hike, afternoon Petit Tsingy visit." },
      { day: 3, location: "Bekopaka – Kirindy", activity: "Drive to Kirindy. Afternoon forest walks. Overnight near Kirindy. (B,D)", activityFR: "Jour 3 : De la Gorge du Manambolo à la Faune Nocturne de Kirindy… visite de grottes sacrées et marche nocturne pour observer la faune endémique.", activityENG: "Day 3: From Manambolo Gorge to Kirindy nocturnal wildlife… visit sacred caves and guided night walk to observe endemic fauna." },
      { day: 4, location: "Kirindy – Morondava", activity: "Morning forest walk. Visit Avenue of Baobabs. Return to Morondava. (B,D)", activityFR: "Jour 4 : Faune Diurne et Grand Final à l'Allée des Baobabs… marche matinale à Kirindy et coucher de soleil sur les Baobabs.", activityENG: "Day 4: Diurnal wildlife and grand finale at Avenue of Baobabs… morning walk in Kirindy and sunset at the Baobabs." }
    ],
    pricing: [
      { hotel: "Hotel Tanankoay & Relais du Kirindy", euro: ["920€","530€","450€","390€"], ar: ["4,650,000Ar","2,675,000Ar","2,275,000Ar","1,950,000Ar"] },
      { hotel: "Hotel Olympe de Bemaraha & Relais du Kirindy", euro: ["1,035€","595€","545€","435€"], ar: ["5,225,000Ar","3,000,000Ar","2,725,000Ar","2,200,000Ar"] },
      { hotel: "Hotel Soleil de Tsingy & Relais du Kirindy", euro: ["1,140€","650€","600€","490€"], ar: ["5,730,000Ar","3,275,000Ar","3,030,000Ar","2,475,000Ar"] }
    ],
    pax: ["1","2","3","4"],
    inclusions: [
      "English-speaking naturalist guide",
      "Transportation Morondava-Bekopaka-Morondava",
      "Tsiribihina & Manambolo Rivers ferry fees",
      "Vehicle, driver, fuel, driver accommodation & food, vehicle insurance",
      "Tsingy & Kirindy entry fees & local guide",
      "Avenue of Baobabs excursion at sunset",
      "Room taxes"
    ],
    exclusions: [
      "Flights, visa, airport taxes, lunches & drinks not included, insurance, tips, personal expenses"
    ],
    copyright: "Copyright © 2025 – KiriTour Madagascar",
    contact: "Mail us for further information"
  },

  // --- Tsingy 3 Days ---
  {
    id: "tsingy-kirindy-baobabs-2025-3days",
    title: "Tsingy de Bemaraha, Kirindy Forest Reserve & Avenue of Baobabs – 2025 (3 Days)",
    image: "/images/tsingy-cover.jpg",
    images: ["/images/tsingy1.jpg","/images/tsingy2.jpg","/images/tsingy3.jpg"],
    shortDesc: "Affordable 3-day package for forest walk, Grand Tsingy & Baobabs.",
    shortDescFR: "Boucle de l'Ouest : Tsingy, Kirindy et Baobabs en 3 jours. Les Tsingy de Bemaraha est une odyssée géologique et culturelle sur 160 millions d'années…",
    shortDescENG: "The Western Loop: Tsingy, Kirindy, and Baobabs in 3 days. The Tsingy of Bemaraha is a geological and cultural odyssey spanning 160 million years…",
    itinerary: [
      { day: 1, location: "Morondava – Bekopaka", activity: "Forest walk & travel to Bekopaka. Lunch in Belo Tsiribihina (own). Overnight Bekopaka. (B,D)", activityFR: "Jour 1 : Lancement de l'Aventure 4x4 vers Bekopaka…", activityENG: "Day 1: Start of the 4x4 adventure to Bekopaka…" },
      { day: 2, location: "Bekopaka", activity: "Full day Grand Tsingy & Petite Tsingy at sunset. Overnight Bekopaka. (B,D)", activityFR: "Jour 2 : Exploration Physique des Tsingy…", activityENG: "Day 2: Physical Exploration of the Tsingy…" },
      { day: 3, location: "Bekopaka – Morondava", activity: "Visit Gorges of Manambolo, stop Baobabs, return to Morondava. End of service. (B)", activityFR: "Jour 3 : Coucher de Soleil Grandiose et Retour Final…", activityENG: "Day 3: Grand Sunset and Final Return…" }
    ],
    pricing: [
      { hotel: "Hotel Tanankoay", euro:["667€","350€","290€","235€"], ar:["3,355,000Ar","1,750,000Ar","1,450,000Ar","1,175,000Ar"] },
      { hotel: "Hotel Olympe de Bemaraha", euro:["680€","400€","345€","285€"], ar:["3,400,000Ar","2,000,000Ar","1,725,000Ar","1,425,000Ar"] },
      { hotel: "Hotel Soleil de Tsingy", euro:["830€","480€","450€","355€"], ar:["4,150,000Ar","2,400,000Ar","2,250,000Ar","1,775,000Ar"] }
    ],
    pax: ["1","2","3","4"],
    inclusions: [
      "Transportation Morondava – Bekopaka – Morondava",
      "Ferry fees on rivers",
      "Vehicle & driver",
      "Tsingy entry & guide",
      "Avenue of Baobabs excursion",
      "Room taxes"
    ],
    exclusions: [
      "Flights, visa, airport taxes, lunches & drinks not included, insurance, tips, personal expenses"
    ],
    copyright: "Copyright © 2025 – KiriTour Madagascar",
    contact: "Mail us for further information"
  },

  // --- Kirindy 2 Days ---
  {
    id: "kirindy-2days-2025",
    title: "Kirindy Forest Reserve & Baobabs – 2025 (2 Days)",
    image: "/images/kirindy-cover.jpg",
    images: ["/images/kimony1.jpg","/images/kimony2.jpg","/images/kimony3.jpg"],
    shortDesc: "2-Day adventure in Kirindy Forest and Baobabs.",
    shortDescFR: "Aventure de 2 jours dans la forêt de Kirindy et les Baobabs… immersion nocturne et observation de la faune endémique.",
    shortDescENG: "2-Day adventure in Kirindy Forest and Baobabs… night immersion and observation of endemic wildlife.",
    itinerary: [
      { day: 1, location: "Morondava – Kirindy", activity: "Morning departure to Kirindy. Afternoon forest walk. Overnight lodge. (B,D)", activityFR: "Jour 1 : Morondava → Kirindy… marche guidée nocturne pour observer le Fosa et lémuriens.", activityENG: "Day 1: Morondava → Kirindy… guided night walk to observe Fosa and lemurs." },
      { day: 2, location: "Kirindy – Morondava", activity: "Early morning forest walk. Return Morondava, visit Avenue of Baobabs. End service. (B)", activityFR: "Jour 2 : Faune diurne et coucher de soleil sur l'Allée des Baobabs… retour Morondava.", activityENG: "Day 2: Diurnal wildlife and sunset at Avenue of Baobabs… return to Morondava." }
    ],
    pricing: [
      { hotel: "Relais du Kirindy", euro:["480€","250€"], ar:["2,400,000Ar","1,250,000Ar"] }
    ],
    pax: ["1","2"],
    inclusions:["Guide, Transport, Kirindy entrance, Baobabs visit"],
    exclusions:["Flights, meals not listed, personal expenses, tips"],
    copyright:"Copyright © 2025 – KiriTour Madagascar",
    contact:"Mail us for further information"
  },

  // --- Kivalo / Mangroves 1 Day ---
  {
    id: "kivalo-mangroves-1day-2025",
    title: "Kivalo Village & Mangroves – 2025 (1 Day)",
    image: "/images/kivalo-cover.jpg",
    images: ["/images/CA (5).jpg","/images/CA (5).jpg"],
    shortDesc: "Relaxing 1-day excursion to Kivalo Village & Mangroves.",
    shortDescFR: "Excursion d'une journée relaxante à Kivalo et ses mangroves… balade en bateau et visite du village.",
    shortDescENG: "Relaxing 1-day excursion to Kivalo Village & Mangroves… boat ride and village visit.",
    itinerary: [
      { day: 1, location: "Morondava – Kivalo", activity: "Morning boat ride & village visit. Return Morondava afternoon. (B,L)", activityFR: "Balade en bateau le matin et visite du village. Retour à Morondava l'après-midi.", activityENG: "Morning boat ride & village visit. Return Morondava afternoon." }
    ],
    pricing: [
      { hotel: "N/A", euro:["150€"], ar:["750,000Ar"] }
    ],
    pax:["1","2","3","4"],
    inclusions:["Transport, Boat ride, Local guide"],
    exclusions:["Meals not included, personal expenses, tips"],
    copyright:"Copyright © 2025 – KiriTour Madagascar",
    contact:"Mail us for further information"
  },

  // --- Avenue of Baobabs Sunset 1 Day ---
  {
    id: "baobabs-sunset-1day-2025",
    title: "Avenue of the Baobabs Sunset – 2025 (1 Day)",
    image: "/images/baobabs-cover.jpg",
    images: ["/images/CA (5).jpg","/images/CA (5).jpg"],
    shortDesc: "Short 1-day tour to see the famous Avenue of Baobabs at sunset.",
    shortDescFR: "Excursion d'une journée pour admirer l'Allée des Baobabs au coucher du soleil… site classé Monument Naturel.",
    shortDescENG: "Short 1-day tour to see the famous Avenue of Baobabs at sunset… classified Natural Monument.",
    itinerary:[
      { day: 1, location:"Morondava", activity:"Morning free. Afternoon trip to Avenue of Baobabs for sunset photography. Return Morondava. (L)", activityFR:"Matinée libre. Après-midi visite de l'Allée des Baobabs pour le coucher du soleil.", activityENG:"Morning free. Afternoon trip to Avenue of Baobabs for sunset photography. Return Morondava." }
    ],
    pricing:[{hotel:"N/A", euro:["100€"], ar:["500,000Ar"]}],
    pax:["1","2","3","4"],
    inclusions:["Transport, Guide, Sunset visit"],
    exclusions:["Meals, personal expenses, tips"],
    copyright:"Copyright © 2025 – KiriTour Madagascar",
    contact:"Mail us for further information"
  }
];

export default tours;
