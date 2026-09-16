import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Plus, Minus, Check, ChevronRight, ShoppingBag, Truck } from "lucide-react";
import Reveal from "../components/Reveal";
import { useCart } from "../context/CartContext";

const A = "https://customer-assets-lxgj4vgw.emergentagent.net/job_shower-refresh/artifacts/";

const IMG = {
  beigeStudio: A + "i4camxnb_61c%2BFmq6exL._AC_SL1500_.jpg",
  beigeMain: A + "i5yqy36a_41%2BeUCNwpTL._AC_SL1000_.jpg",
  beigeRail: A + "2us2rrc6_FLOENZY%20PHOTO%2021%20Large%20Large.jpeg",
  attach: A + "96677qhj_FLOENZY%20PHOTO%2010.webp",
  marble: A + "mgybwcdo_sdfsdfsd.jpeg",
  waterMap: A + "h5lnzup0_04d73c13-1703-4fc0-9ca5-635d9089d136.png",
  beauty: A + "9shpsz3e_IMG_20260427_161047.webp",
  washHair: A + "pwxvulkw_FLOENZY%20PHOTO%2011%20Large%20Large.jpeg",
};

const GALLERY = [IMG.beigeStudio, IMG.beigeRail, IMG.beigeMain, IMG.attach, IMG.marble];

const COLOURS = [
  { name: "Beige", hex: "#D8CBB6" },
  { name: "Grey-red", hex: "#8C7A76" },
];

const BULLETS = [
  ["Stop hard water damaging your hair & skin", "Floenzy's 3-stage Vitamin C + Activated Carbon filter reduces chlorine, limescale and heavy metals that strip moisture, cause hair breakage and leave skin dry and itchy. Designed specifically for UK hard water areas."],
  ["Vitamin C filtration used in professional spas", "Neutralises up to 98% of chlorine on contact, the same method used by dermatologists and trichologists. Noticeably softer skin and shinier, less frizzy hair from your very first shower."],
  ["Built for London, the South East & Midlands", "Over 60% of UK homes have hard or very hard water, containing calcium, magnesium and chlorine at levels that visibly damage hair and clog pores."],
  ["No pressure drop, even with filtration", "392 precision micro-holes boost water velocity for spa-level pressure while filtering. No weak dribble, no compromise."],
  ["Easy installation – universal fit", "Fits standard UK ½″ shower hoses and arms. Tool-free install in minutes. Works with overhead or hand-held showers. Sleek premium finish upgrades any bathroom."],
];

const APLUS = [
  { title: "It's your water, not shampoo", body: "Over 60% of UK homes have hard water. It can dry skin, affect hair and cause limescale. Floenzy tackles the problem at its source — your water.", image: IMG.waterMap },
  { title: "Beauty starts in your shower", body: "When you remove what's damaging your hair and skin at the source, everything else works better — your conditioner, your moisturiser, your skin routine.", image: IMG.beauty },
  { title: "Advanced filtration for shower", body: "Floenzy's 3-stage filtration uses Activated Carbon Fibre, Vitamin C & multi-layer filtration to reduce chlorine, heavy metals and hard-water minerals.", image: IMG.marble },
  { title: "Premium Design, Built to Last", body: "Floenzy combines premium design with durable construction, creating a stylish filtered shower head that elevates your bathroom and daily shower.", image: IMG.beigeRail },
  { title: "Set up in under 2 minutes, no tools needed", body: "Floenzy fits all standard UK ½″ shower hoses and arms. A snug hand-tighten is all it takes — no plumber, no fuss.", image: IMG.attach },
];

const FAQS = [
  { q: "Will it reduce my water pressure?", a: "No — Floenzy is engineered to maintain and even boost pressure while filtering. Its 392 precision micro-holes increase water velocity for a stronger, more focused flow than a standard shower head." },
  { q: "How do I know when to replace the filter cartridge?", a: "Each cartridge lasts approximately 2–3 months with typical daily use. Replace it when the flow begins to soften or the internal media visibly discolours." },
  { q: "Will it fit my shower? I have a standard UK shower hose.", a: "Yes — Floenzy uses a universal ½″ BSP connection, the standard fitting on virtually all UK shower hoses and arms. It installs tool-free in minutes." },
  { q: "Will it work with my electric shower or combi boiler?", a: "Yes — Floenzy is compatible with both combi boiler systems (gravity and pressurised) and electric shower systems." },
];

const SPECS = [
  ["Manufacturer", "FLOENZY"],
  ["Dimensions", "22 × 6 × 2 cm; 370 g"],
  ["Model No.", "SH001"],
  ["Colour", "Beige"],
  ["Style", "Modern"],
  ["Finish", "Matt"],
  ["Material", "ABS Resin, Stainless Steel"],
  ["Shape", "Oval"],
  ["Installation", "Wall Mounted"],
  ["Package Qty", "1"],
  ["Special Features", "Detachable"],
  ["Included", "Shower Head, filter"],
];

const Stars = ({ value, size = 15 }) => (
  <span className="inline-flex gap-0.5 text-[var(--accent)]">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={size} fill={i < Math.round(value) ? "currentColor" : "none"} strokeWidth={1.4} />
    ))}
  </span>
);

const ProductDetail = () => {
  const { addItem } = useCart();
  const [active, setActive] = useState(0);
  const [colour, setColour] = useState("Beige");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const price = 65.41;

  const addToCart = () => {
    addItem({
      sku: "SH001",
      colour,
      qty,
      name: "Floenzy Filtered Shower Head",
      price,
      image: IMG.beigeStudio,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <main className="bg-[var(--cream)]">
      {/* breadcrumb */}
      <div className="container-lux pt-28 pb-6">
        <div className="flex items-center gap-2 kicker">
          <Link to="/shop" className="hover:text-[var(--ink)]">Shop</Link>
          <ChevronRight size={12} />
          <span>Hard Water Shower Filter Head</span>
        </div>
      </div>

      {/* ---------- product ---------- */}
      <section className="pb-24">
        <div className="container-lux grid md:grid-cols-12 gap-10 md:gap-16">
          {/* gallery */}
          <div className="md:col-span-7">
            <div className="aspect-[4/5] bg-[var(--paper)] border border-[var(--line)] overflow-hidden">
              <img src={GALLERY[active]} alt="Floenzy shower filter head" className="w-full h-full object-contain" />
            </div>
            <div className="grid grid-cols-5 gap-3 mt-4">
              {GALLERY.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`aspect-square bg-[var(--paper)] border overflow-hidden transition-colors ${active === i ? "border-[var(--ink)]" : "border-[var(--line)]"}`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* info */}
          <div className="md:col-span-5 md:pt-2">
            <p className="kicker">FLOENZY</p>
            <h1 className="font-serif-display text-3xl md:text-[2.35rem] leading-[1.15] mt-3">
              Hard Water Shower Filter Head
            </h1>
            <p className="body-copy text-sm mt-3 leading-relaxed">
              Reduces Chlorine, Limescale &amp; Heavy Metals · 3-Stage Vitamin C
              Filtration for Softer Skin &amp; Less Hair Fall · High Pressure ·
              Fits UK ½″ Hose
            </p>

            {/* ratings badge */}
            <div className="flex items-center gap-3 mt-5">
              <Stars value={4.3} />
              <span className="body-copy text-sm">4.3 · 12 reviews</span>
            </div>

            <div className="flex items-baseline gap-3 mt-7">
              <p className="display text-5xl">£{price.toFixed(2)}</p>
              <span className="flex items-center gap-1.5 kicker">
                <Truck size={14} /> Free returns
              </span>
            </div>

            {/* colours */}
            <div className="mt-8">
              <p className="kicker">colour — {colour}</p>
              <div className="flex gap-3 mt-4">
                {COLOURS.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColour(c.name)}
                    aria-label={c.name}
                    className={`w-10 h-10 rounded-full border transition-transform ${colour === c.name ? "ring-1 ring-offset-2 ring-[var(--ink)] scale-105" : "border-[var(--line)]"}`}
                    style={{ background: c.hex, borderColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* qty + add */}
            <div className="flex items-center gap-4 mt-9">
              <div className="flex items-center border border-[var(--ink)]">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-4"><Minus size={14} /></button>
                <span className="px-3 font-sans-ui text-sm w-8 text-center">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="px-4 py-4"><Plus size={14} /></button>
              </div>
              <button onClick={addToCart} className="btn-solid flex-1 justify-center">
                {added ? (<>Added <Check size={15} /></>) : (<>Add to Cart <ShoppingBag size={15} /></>)}
              </button>
            </div>

            {/* feature bullets */}
            <ul className="mt-10 pt-8 border-t border-[var(--line)] space-y-5">
              {BULLETS.map(([lead, rest], i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check size={16} className="text-[var(--accent)] mt-1 shrink-0" />
                  <span className="body-copy">
                    <strong className="font-sans-ui font-medium text-[var(--ink)]">{lead}</strong>
                    {" — "}{rest}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- A+ content ---------- */}
      <section className="border-t border-[var(--line)]">
        {APLUS.map((s, i) => (
          <div key={i} className="py-14 md:py-24">
            <div className="container-lux grid md:grid-cols-12 gap-10 md:gap-16 items-center">
              <Reveal className={`md:col-span-6 ${i % 2 === 1 ? "md:order-2 md:col-start-7" : ""}`}>
                <div className="img-zoom aspect-[5/4] bg-[var(--sand)]">
                  <img src={s.image} alt={s.title} />
                </div>
              </Reveal>
              <div className={`md:col-span-5 ${i % 2 === 1 ? "md:order-1 md:col-start-1" : "md:col-start-8"}`}>
                <Reveal>
                  <p className="kicker">0{i + 1}</p>
                  <h2 className="display text-4xl md:text-6xl mt-4">{s.title}</h2>
                </Reveal>
                <Reveal delay={120}>
                  <p className="body-copy text-lg mt-6 max-w-[440px]">{s.body}</p>
                </Reveal>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ---------- specs ---------- */}
      <section className="py-24 border-t border-[var(--line)]">
        <div className="container-lux grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <Reveal>
              <p className="kicker">the detail</p>
              <h2 className="display text-5xl md:text-6xl mt-4">Technical <em>specs.</em></h2>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <table className="w-full">
              <tbody>
                {SPECS.map(([k, v], i) => (
                  <tr key={i} className="border-b border-[var(--line)]">
                    <td className="py-4 pr-6 kicker align-top w-40">{k}</td>
                    <td className="py-4 font-serif-display text-lg">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="py-24 border-t border-[var(--line)]">
        <div className="container-lux grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <Reveal>
              <p className="kicker">good to know</p>
              <h2 className="display text-5xl md:text-6xl mt-4">Questions,<br /><em>answered.</em></h2>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            {FAQS.map((f, i) => (
              <div key={i} className="border-b border-[var(--line)]">
                <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} className="w-full flex items-center justify-between py-6 text-left">
                  <span className="font-serif-display text-2xl md:text-[1.7rem] pr-6">{f.q}</span>
                  {openFaq === i ? <Minus size={20} /> : <Plus size={20} />}
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${openFaq === i ? "max-h-60 pb-6" : "max-h-0"}`}>
                  <p className="body-copy text-lg max-w-[560px]">{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- reviews badge ---------- */}
      <section className="py-20 border-t border-[var(--line)]">
        <div className="container-lux flex flex-col items-center text-center gap-4">
          <Stars value={4.3} size={22} />
          <p className="display text-5xl md:text-6xl">4.3 out of 5</p>
          <p className="kicker">based on 12 verified reviews</p>
          <Link to="/shop" className="btn-line mt-4">Read customer reviews <ChevronRight size={14} /></Link>
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;
