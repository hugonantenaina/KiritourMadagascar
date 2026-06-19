/* ══════════════════════════════════════════════════════════════
   FAQ DATA — isaky ny category tour
   Mampiasa category mba tsy hila manoratra FAQ 14 imbetsaka
   Ny price/duration miova araka ny tour (template string)
══════════════════════════════════════════════════════════════ */

export function getTourFAQ(tour) {
  const price0 = tour.pricing?.[0]?.price || tour.pricing?.[0]?.range || "";
  const firstNum = (price0.match(/\d+/) || [""])[0];

  const common = [
    {
      q: "How do I book this tour?",
      a: `You can book directly via WhatsApp at +261 33 664 07 77. We typically reply within 2 hours with a personalised quote based on your dates and group size.`,
    },
    {
      q: "Is this tour private or shared with other travellers?",
      a: `All KiriTour Madagascar tours are private. You travel with your own guide and 4x4, not grouped with strangers, so the schedule adapts to you.`,
    },
    {
      q: "Do you speak English?",
      a: `Yes. Our guides speak English, French and Malagasy, so communication is never an issue during your tour.`,
    },
    {
      q: "What is the cancellation policy?",
      a: `We offer flexible terms — please contact us via WhatsApp to discuss cancellation or date changes for your specific booking.`,
    },
  ];

  const byCategory = {
    tsiribihina: [
      {
        q: "Is the Tsiribihina River descent safe?",
        a: "Yes, the descent is gentle and suitable for most fitness levels. Experienced local boatmen handle the pirogue, and basic swimming ability is helpful but not required.",
      },
      {
        q: "What should I pack for the river trip?",
        a: "Sun protection, a hat, a light sleeping bag or liner, insect repellent, a dry bag for electronics, and a headlamp. Your guide provides tents and cooking equipment.",
      },
      {
        q: "Are there toilets or showers during the descent?",
        a: "Facilities are basic and rustic — this is a wild camping experience on river sandbanks. Your crew sets up a simple, private camp each evening.",
      },
    ],
    andasibe: [
      {
        q: "What is the best time to hear the indri lemurs sing?",
        a: "Indri are most vocal in the early morning, typically between 6 AM and 9 AM, which is when most guided walks in Andasibe begin.",
      },
      {
        q: "Is Andasibe suitable for children?",
        a: "Yes, the trails in Analamazaotra are relatively easy and well-suited to families. Mantadia is more demanding with longer, hillier walks.",
      },
      {
        q: "How far is Andasibe from Antananarivo?",
        a: "Andasibe is roughly 140 km east of Antananarivo, about 3 to 4 hours by road through scenic highland landscapes.",
      },
    ],
    tsingy: [
      {
        q: "Is the Tsingy hike difficult?",
        a: "The Grand Tsingy circuit is physically demanding, involving via ferrata harnesses, ladders and narrow passages. The Petit Tsingy is much easier and suits most fitness levels.",
      },
      {
        q: "Is Tsingy de Bemaraha safe for people afraid of heights?",
        a: "The Grand Tsingy involves height and narrow ledges, which may be challenging for those with a fear of heights. The Petit Tsingy is a gentler alternative with similar scenery.",
      },
      {
        q: "How do you get to Bekopaka?",
        a: "Bekopaka is reached by 4x4 from Morondava, with two river ferry crossings along rough dirt roads. The journey takes most of a day and is only possible in the dry season.",
      },
    ],
    kirindy: [
      {
        q: "Will I definitely see a fossa in Kirindy?",
        a: "No guide can guarantee a fossa sighting, as they are wild and unpredictable. Kirindy is the most reliable location in Madagascar, and our guides know the best spots and times to maximise your chances.",
      },
      {
        q: "Is the night walk safe?",
        a: "Yes, night walks are led by an experienced local guide with headlamps, following established forest trails at a relaxed pace.",
      },
      {
        q: "What other animals can I see in Kirindy?",
        a: "Beyond the fossa, Kirindy hosts Verreaux's sifaka, red-fronted brown lemurs, mouse lemurs, chameleons and a wide variety of birds.",
      },
    ],
    western: [
      {
        q: "What is the best time of day to visit the Avenue of the Baobabs?",
        a: "Sunset, roughly between 4:30 PM and 6 PM depending on the season, offers the most dramatic light. Sunrise is a quieter alternative with fewer visitors.",
      },
      {
        q: "How far is the Avenue of the Baobabs from Morondava?",
        a: "The Avenue is about 20 km north of Morondava, around 30 to 45 minutes by car.",
      },
      {
        q: "Can this day tour be combined with other activities?",
        a: "Yes, this circuit easily combines with a Kirindy Forest visit or extends into a multi-day western Madagascar trip including Tsingy de Bemaraha.",
      },
    ],
  };

  const specific = byCategory[tour.category] || [];

  // Insert a price/duration question dynamically at the front
  const dynamic = [
    {
      q: `How much does the ${tour.title} cost?`,
      a: `This tour starts from ${price0}${firstNum ? "" : ""} per person, with the exact price depending on your group size. Contact us via WhatsApp for a personalised quote.`,
    },
    {
      q: `How long does the ${tour.title} take?`,
      a: `This tour runs for ${tour.duration}. We can also tailor the itinerary to fit a shorter or longer schedule on request.`,
    },
  ];

  return [...dynamic, ...specific, ...common].slice(0, 8);
}