// Floenzy product catalog (frontend data). Drives the Shop listing,
// individual product pages, and the Home product grid.

const A =
  "https://customer-assets-lxgj4vgw.emergentagent.net/job_shower-refresh/artifacts/";

export const IMG = {
  beigeClean: A + "i9ogdn4j_41%2BeUCNwpTL._AC_SY879_-removebg-preview.png",
  grayClean: A + "dpsaj15d_51efh1TBJYL._AC_SY879_-removebg-preview.png",
  beigeStudio: A + "i4camxnb_61c%2BFmq6exL._AC_SL1500_.jpg",
  beigeMain: A + "i5yqy36a_41%2BeUCNwpTL._AC_SL1000_.jpg",
  beigeRail: A + "2us2rrc6_FLOENZY%20PHOTO%2021%20Large%20Large.jpeg",
  grayStudio: A + "84mm8k96_51efh1TBJYL._AC_SL1500_.jpg",
  cartVitC: A + "kpwypjfd_41TXjiOb3gL._AC_SL1080_.jpg",
  cartNoAroma: A + "prn3dk0t_41qmR-34jOL._AC_SL1080_.jpg",
  attach: A + "96677qhj_FLOENZY%20PHOTO%2010.webp",
  marble: A + "mgybwcdo_sdfsdfsd.jpeg",
  washHair: A + "pwxvulkw_FLOENZY%20PHOTO%2011%20Large%20Large.jpeg",
  faceBlack: A + "an56fqb0_FLOENZY%20PHOTO%2017%20Large%20Large.jpeg",
  waterMap: A + "h5lnzup0_04d73c13-1703-4fc0-9ca5-635d9089d136.png",
  beauty: A + "9shpsz3e_IMG_20260427_161047.webp",
  carbonCart: A + "xrn62fsl_22472cce-b408-488d-92f3-ed0d278dfed9.png",
  vitcCart: A + "xze313nn_7ca8d537-de72-4e43-bbf0-f1e3d5628bc3.png",
  adFiltration: A + "ldkw3rcq_ChatGPT%20Image%20Sep%2017%2C%202026%2C%2011_56_50%20AM.png",
  adBenefits: A + "61qi8ul6_ChatGPT%20Image%20Sep%2017%2C%202026%2C%2011_57_16%20AM.png",
  adSpecs: A + "g21woqom_ChatGPT%20Image%20Sep%2017%2C%202026%2C%2011_57_21%20AM.png",
};

const HEAD_FEATURES = [
  ["Stop hard water damaging your hair & skin", "Floenzy's 3-stage Vitamin C + Activated Carbon filter reduces chlorine, limescale and heavy metals that strip moisture, cause hair breakage and leave skin dry and itchy. Designed specifically for UK hard water areas."],
  ["Vitamin C filtration used in professional spas", "Neutralises up to 98% of chlorine on contact, the same method used by dermatologists and trichologists. Noticeably softer skin and shinier, less frizzy hair from your very first shower."],
  ["Built for London, the South East & Midlands", "Over 60% of UK homes have hard or very hard water, containing calcium, magnesium and chlorine at levels that visibly damage hair and clog pores."],
  ["No pressure drop, even with filtration", "392 precision micro-holes boost water velocity for spa-level pressure while filtering. No weak dribble, no compromise."],
  ["Easy installation – universal fit", "Fits standard UK ½″ shower hoses and arms. Tool-free install in minutes. Works with overhead or hand-held showers. Sleek premium finish upgrades any bathroom."],
];

const HEAD_APLUS = [
  { title: "It's your water, not shampoo", body: "Over 60% of UK homes have hard water. It can dry skin, affect hair and cause limescale. Floenzy tackles the problem at its source — your water.", image: IMG.waterMap },
  { title: "Beauty starts in your shower", body: "When you remove what's damaging your hair and skin at the source, everything else works better — your conditioner, your moisturiser, your skin routine.", image: IMG.beauty },
  { title: "Advanced filtration for shower", body: "Floenzy's 3-stage filtration uses Activated Carbon Fibre, Vitamin C & multi-layer filtration to reduce chlorine, heavy metals and hard-water minerals.", image: IMG.marble },
  { title: "Premium Design, Built to Last", body: "Floenzy combines premium design with durable construction, creating a stylish filtered shower head that elevates your bathroom and daily shower.", image: IMG.beigeRail },
  { title: "Set up in under 2 minutes, no tools needed", body: "Floenzy fits all standard UK ½″ shower hoses and arms. A snug hand-tighten is all it takes — no plumber, no fuss.", image: IMG.attach },
];

const HEAD_FAQS = [
  { q: "Will it reduce my water pressure?", a: "No — Floenzy is engineered to maintain and even boost pressure while filtering. Its 392 precision micro-holes increase water velocity for a stronger, more focused flow than a standard shower head." },
  { q: "How do I know when to replace the filter cartridge?", a: "Each cartridge lasts approximately 2–3 months with typical daily use. Replace it when the flow begins to soften or the internal media visibly discolours." },
  { q: "Will it fit my shower? I have a standard UK shower hose.", a: "Yes — Floenzy uses a universal ½″ BSP connection, the standard fitting on virtually all UK shower hoses and arms. It installs tool-free in minutes." },
  { q: "Will it work with my electric shower or combi boiler?", a: "Yes — Floenzy is compatible with both combi boiler systems (gravity and pressurised) and electric shower systems." },
];

const headSpecs = (colour) => [
  ["Manufacturer", "FLOENZY"],
  ["Dimensions", "22 × 6 × 2 cm; 370 g"],
  ["Model No.", "SH001"],
  ["Colour", colour],
  ["Style", "Modern"],
  ["Finish", "Matt"],
  ["Material", "ABS Resin, Stainless Steel"],
  ["Shape", "Oval"],
  ["Installation", "Wall Mounted"],
  ["Package Qty", "1"],
  ["Special Features", "Detachable"],
  ["Included", "Shower Head, filter"],
];

const CART_FAQS = [
  { q: "How often should I replace the cartridge?", a: "Every 2–3 months with typical daily use, or when you notice the flow softening or the media discolouring." },
  { q: "Does it fit every Floenzy shower head?", a: "Yes — a single universal cartridge fits both the Beige and Gray Floenzy filter heads." },
  { q: "How do I change it?", a: "Unscrew the lower barrel of your Floenzy head, lift out the old cartridge, drop in the new one and screw back on. Under a minute, no tools." },
];

export const PRODUCTS = [
  {
    slug: "hard-water-filter-beige",
    type: "head",
    brand: "FLOENZY",
    name: "Hard Water Shower Filter Head — Beige",
    tagline:
      "Reduces Chlorine, Limescale & Heavy Metals · 3-Stage Vitamin C Filtration · High Pressure · Fits UK ½″ Hose",
    short: "3-stage Vitamin C filter head in warm beige.",
    price: 65.41,
    sku: "SH001",
    colour: "Beige",
    rating: 4.3,
    reviewCount: 12,
    cardImage: IMG.beigeClean,
    images: [IMG.beigeClean, IMG.beigeStudio, IMG.beigeRail, IMG.beigeMain, IMG.attach, IMG.marble, IMG.adFiltration, IMG.adBenefits, IMG.adSpecs],
    features: HEAD_FEATURES,
    aplus: HEAD_APLUS,
    faqs: HEAD_FAQS,
    specs: headSpecs("Beige"),
  },
  {
    slug: "hard-water-filter-gray",
    type: "head",
    brand: "FLOENZY",
    name: "Hard Water Shower Filter Head — Gray",
    tagline:
      "Reduces Chlorine, Limescale & Heavy Metals · 3-Stage Vitamin C Filtration · High Pressure · Fits UK ½″ Hose",
    short: "The same 3-stage filter head in graphite gray.",
    price: 65.41,
    sku: "SH001",
    colour: "Grey-red",
    rating: 4.3,
    reviewCount: 12,
    cardImage: IMG.grayClean,
    images: [IMG.grayClean, IMG.grayStudio, IMG.marble, IMG.washHair, IMG.faceBlack, IMG.attach, IMG.adFiltration, IMG.adBenefits, IMG.adSpecs],
    features: HEAD_FEATURES,
    aplus: HEAD_APLUS,
    faqs: HEAD_FAQS,
    specs: headSpecs("Grey-red"),
  },
  {
    slug: "cartridge-vitamin-c",
    type: "cartridge",
    brand: "FLOENZY",
    name: "Shower Filter Replacement Cartridge — Vitamin C Aroma",
    tagline: "ACF Carbon Fibre Water Filter · Vitamin C Aroma",
    short: "Vitamin C infused refill cartridge.",
    price: 21.99,
    sku: "FILTER-REFILL",
    colour: "Vitamin C",
    cardImage: IMG.cartVitC,
    images: [IMG.cartVitC, IMG.vitcCart],
    features: [
      ["Vitamin C aroma refill", "Infuses each shower with a gentle citrus aroma while neutralising up to 98% of chlorine on contact — for softer skin and shinier hair."],
      ["ACF activated carbon fibre core", "A dense carbon-fibre layer captures chlorine, sediment and dissolved heavy metals at the source."],
      ["Universal Floenzy fit", "Fits both the Beige and Gray Floenzy filter heads. Lasts approximately 2–3 months with daily use."],
    ],
    description:
      "Keep your Floenzy performing at its best. This Vitamin C aroma cartridge pairs an activated carbon fibre core with a vitamin C infusion — reducing chlorine and hard-water minerals while adding a subtle, spa-like citrus note to every shower.",
    faqs: CART_FAQS,
  },
  {
    slug: "cartridge-no-aroma",
    type: "cartridge",
    brand: "FLOENZY",
    name: "Shower Filter Replacement Cartridge — No Aroma",
    tagline: "ACF Carbon Fibre Water Filter · Unscented",
    short: "Unscented activated carbon fibre refill.",
    price: 18.99,
    sku: "FILTER-REFILL",
    colour: "No Aroma",
    cardImage: IMG.cartNoAroma,
    images: [IMG.cartNoAroma, IMG.carbonCart],
    features: [
      ["Pure, unscented filtration", "For those who prefer no fragrance — clean, filtered water with nothing added."],
      ["ACF activated carbon fibre core", "Captures chlorine, sediment and dissolved heavy metals that dry skin and damage hair."],
      ["Universal Floenzy fit", "Fits both the Beige and Gray Floenzy filter heads. Lasts approximately 2–3 months with daily use."],
    ],
    description:
      "The essentials-only refill. A high-density activated carbon fibre cartridge that reduces chlorine, heavy metals and hard-water minerals — no aroma, no additives, just cleaner, softer water for your Floenzy head.",
    faqs: CART_FAQS,
  },
];

// Home / listing display order (bottom-to-top from the brief: heads first, then cartridges)
export const PRODUCT_ORDER = [
  "hard-water-filter-beige",
  "hard-water-filter-gray",
  "cartridge-vitamin-c",
  "cartridge-no-aroma",
];

export const getProduct = (slug) => {
  const aliases = { "hard-water-shower-filter-head-beige": "hard-water-filter-beige" };
  const s = aliases[slug] || slug;
  return PRODUCTS.find((p) => p.slug === s);
};

export const listProducts = () =>
  PRODUCT_ORDER.map((s) => PRODUCTS.find((p) => p.slug === s)).filter(Boolean);
