/* ══════════════════════════════════════════════════════════════
   INTERNAL LINKING MAP — Tour ↔ Blog ↔ Related Tours
   Manampy Google mahita ny "web" eo amin'ny page rehetra
══════════════════════════════════════════════════════════════ */

/* Tour ID → blog slug(s) related (azo manana maro) */
export const TOUR_TO_BLOG = {
  "western-1d":          ["best-time-visit-avenue-baobabs-madagascar"],
  "kirindy-1d":           ["kirindy-forest-fossa-lemurs-guide", "what-to-pack-madagascar-safari"],
  "kirindy-2d":           ["kirindy-forest-fossa-lemurs-guide", "what-to-pack-madagascar-safari"],
  "tsingy-3d":            ["tsingy-de-bemaraha-travel-guide"],
  "tsingy-4d":            ["tsingy-de-bemaraha-travel-guide", "best-time-visit-avenue-baobabs-madagascar"],
  "tsiribihina-3d":       ["tsiribihina-river-descent-complete-guide"],
  "tsiribihina-4d":       ["tsiribihina-river-descent-complete-guide", "kirindy-forest-fossa-lemurs-guide"],
  "tsiribihina-5d":       ["tsiribihina-river-descent-complete-guide", "madagascar-itinerary-from-morondava"],
  "tsiribihina-6d":       ["tsiribihina-river-descent-complete-guide", "tsingy-de-bemaraha-travel-guide"],
  "tsiribihina-8d":       ["madagascar-itinerary-from-morondava", "what-to-pack-madagascar-safari"],
  "andasibe-3d":          ["madagascar-itinerary-from-morondava"],
  "andasibe-4d":          ["madagascar-itinerary-from-morondava"],
  "andasibe-5d":          ["madagascar-itinerary-from-morondava", "what-to-pack-madagascar-safari"],
  "andasibe-palmarium":   ["madagascar-itinerary-from-morondava"],
};

/* Blog slug → recommended tours (already have relatedTour in blogData,
   this gives a SECOND/THIRD suggestion for "you might also like") */
export const BLOG_TO_MORE_TOURS = {
  "best-time-visit-avenue-baobabs-madagascar": ["kirindy-1d", "kirindy-2d"],
  "tsingy-de-bemaraha-travel-guide":            ["tsingy-3d", "kirindy-2d"],
  "kirindy-forest-fossa-lemurs-guide":          ["kirindy-1d", "western-1d"],
  "tsiribihina-river-descent-complete-guide":   ["tsiribihina-4d", "tsiribihina-6d"],
  "madagascar-itinerary-from-morondava":        ["tsiribihina-5d", "tsingy-4d"],
  "what-to-pack-madagascar-safari":             ["tsingy-4d", "kirindy-2d"],
};