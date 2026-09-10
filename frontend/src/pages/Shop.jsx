import React, { useEffect, useState } from "react";
import { Star, Plus, Minus, Check, ArrowRight, RefreshCw, ShoppingBag } from "lucide-react";
import Reveal from "../components/Reveal";
import { PRODUCT, FAQS, AMAZON_URL } from "../mock/mock";
import { getCatalog, getReviews, createReview } from "../lib/api";
import { useCart } from "../context/CartContext";

const Stars = ({ value, size = 14 }) => (
  <span className="inline-flex gap-0.5 text-[var(--accent)]">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={size}
        fill={i < Math.round(value) ? "currentColor" : "none"}
        strokeWidth={1.4}
      />
    ))}
  </span>
);

const Shop = () => {
  const { addItem, setSubscription, subscription, openCart } = useCart();

  const [catalog, setCatalog] = useState(null);
  const [reviews, setReviews] = useState(null);

  const [active, setActive] = useState(0);
  const [colour, setColour] = useState(PRODUCT.colours[0].name);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [planIdx, setPlanIdx] = useState(1);

  // review form
  const [rf, setRf] = useState({ name: "", rating: 5, title: "", body: "" });
  const [submitting, setSubmitting] = useState(false);
  const [thanks, setThanks] = useState(false);

  useEffect(() => {
    getCatalog().then(setCatalog).catch(() => {});
    getReviews().then(setReviews).catch(() => {});
  }, []);

  const price = catalog?.product?.price ?? PRODUCT.price;
  const colours = (catalog?.product?.colours || PRODUCT.colours.map((c) => c.name)).map(
    (name) => ({
      name,
      hex: PRODUCT.colours.find((c) => c.name === name)?.hex || "#c9bda6",
    })
  );
  const plans = catalog?.plans || [
    { interval_months: 2, discount_pct: 20, label: "Every 2 months" },
    { interval_months: 3, discount_pct: 15, label: "Every 3 months" },
    { interval_months: 4, discount_pct: 10, label: "Every 4 months" },
  ];
  const refillPrice = catalog?.refill?.price ?? 19;
  const stockLeft = catalog?.stock?.[`SH001::${colour}`];
  const outOfStock = typeof stockLeft === "number" && stockLeft <= 0;

  const reviewList = reviews && reviews.length ? reviews : PRODUCT_REVIEWS_FALLBACK;
  const avgRating =
    reviewList.reduce((s, r) => s + r.rating, 0) / (reviewList.length || 1);

  const addToBag = () => {
    if (outOfStock) return;
    addItem({
      sku: "SH001",
      colour,
      qty,
      name: "Floenzy Filtered Shower Head",
      price,
      image: PRODUCT.images[0],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const chosenPlan = plans[planIdx];
  const subPrice = +(refillPrice * (1 - chosenPlan.discount_pct / 100)).toFixed(2);
  const subActive = subscription?.interval_months === chosenPlan.interval_months;

  const toggleSubscription = () => {
    if (subActive) {
      setSubscription(null);
    } else {
      setSubscription({
        interval_months: chosenPlan.interval_months,
        discount_pct: chosenPlan.discount_pct,
        label: chosenPlan.label,
        price: subPrice,
      });
      openCart();
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const created = await createReview(rf);
      setReviews((prev) => [created, ...(prev || [])]);
      setRf({ name: "", rating: 5, title: "", body: "" });
      setThanks(true);
      setTimeout(() => setThanks(false), 3000);
    } catch (e) {
      /* ignore */
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="bg-[var(--cream)]">
      {/* ---------- product ---------- */}
      <section className="pt-32 pb-24">
        <div className="container-lux grid md:grid-cols-12 gap-10 md:gap-16">
          {/* gallery */}
          <div className="md:col-span-7">
            <div className="img-zoom aspect-[4/5] bg-[var(--paper)] border border-[var(--line)]">
              <img
                src={PRODUCT.images[active]}
                alt={PRODUCT.name}
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="grid grid-cols-6 gap-3 mt-4">
              {PRODUCT.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`aspect-square bg-[var(--paper)] border overflow-hidden transition-colors ${
                    active === i ? "border-[var(--ink)]" : "border-[var(--line)]"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* info */}
          <div className="md:col-span-5 md:pt-6">
            <p className="kicker">{PRODUCT.tagline}</p>
            <h1 className="display text-6xl md:text-7xl mt-4">{PRODUCT.name}</h1>
            <p className="font-serif-display text-2xl italic mt-2 text-[#4a463e]">
              {PRODUCT.title}
            </p>

            <div className="flex items-center gap-3 mt-5">
              <Stars value={avgRating} />
              <span className="body-copy text-sm">
                {avgRating.toFixed(1)} · {reviewList.length} reviews
              </span>
            </div>

            <p className="display text-5xl mt-8">£{price.toFixed(2)}</p>

            {/* colours */}
            <div className="mt-8">
              <p className="kicker">colour — {colour}</p>
              <div className="flex gap-3 mt-4">
                {colours.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColour(c.name)}
                    aria-label={c.name}
                    className={`w-10 h-10 rounded-full border transition-transform ${
                      colour === c.name
                        ? "ring-1 ring-offset-2 ring-[var(--ink)] scale-105"
                        : "border-[var(--line)]"
                    }`}
                    style={{ background: c.hex, borderColor: c.hex }}
                  />
                ))}
              </div>
              {typeof stockLeft === "number" && (
                <p className="body-copy text-xs mt-3">
                  {outOfStock
                    ? "Currently out of stock"
                    : stockLeft <= 20
                    ? `Only ${stockLeft} left in ${colour}`
                    : "In stock · ships within 48 hours"}
                </p>
              )}
            </div>

            {/* qty + add */}
            <div className="flex items-center gap-4 mt-10">
              <div className="flex items-center border border-[var(--ink)]">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-4">
                  <Minus size={14} />
                </button>
                <span className="px-3 font-sans-ui text-sm w-8 text-center">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="px-4 py-4">
                  <Plus size={14} />
                </button>
              </div>
              <button
                onClick={addToBag}
                disabled={outOfStock}
                className="btn-solid flex-1 justify-center disabled:opacity-40"
              >
                {added ? (
                  <>Added <Check size={15} /></>
                ) : outOfStock ? (
                  <>Out of stock</>
                ) : (
                  <>Add to bag <ShoppingBag size={15} /></>
                )}
              </button>
            </div>

            {/* subscription */}
            <div className="mt-8 border border-[var(--line)] p-5 bg-[var(--paper)]">
              <div className="flex items-center gap-2">
                <RefreshCw size={15} className="text-[var(--accent)]" />
                <p className="font-sans-ui uppercase tracking-[0.2em] text-[0.68rem]">
                  Refill subscription — subscribe & save
                </p>
              </div>
              <p className="body-copy text-sm mt-3">
                Fresh filter cartridges, auto-shipped so your water never slips back.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {plans.map((p, i) => (
                  <button
                    key={p.interval_months}
                    onClick={() => setPlanIdx(i)}
                    className={`px-3 py-2 border text-[0.72rem] font-sans-ui tracking-wide transition-colors ${
                      planIdx === i
                        ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--cream)]"
                        : "border-[var(--line)]"
                    }`}
                  >
                    {p.label} · save {p.discount_pct}%
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between mt-5">
                <span className="font-serif-display text-2xl">
                  £{subPrice.toFixed(2)}
                  <span className="body-copy text-sm ml-2 line-through">
                    £{refillPrice.toFixed(2)}
                  </span>
                  <span className="body-copy text-sm"> / cartridge</span>
                </span>
                <button onClick={toggleSubscription} className="btn-line">
                  {subActive ? "Remove" : "Add refills"}
                </button>
              </div>
            </div>

            <a
              href={AMAZON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-line mt-8"
            >
              Buy on Amazon <ArrowRight size={14} />
            </a>

            <div className="mt-10 pt-8 border-t border-[var(--line)] space-y-3">
              {PRODUCT.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check size={16} className="text-[var(--accent)] mt-1 shrink-0" />
                  <span className="body-copy">{h}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--line)] grid grid-cols-3 gap-3">
              {PRODUCT.assurances.map((a, i) => (
                <div key={i} className="text-center">
                  <span className="font-sans-ui uppercase tracking-[0.14em] text-[0.62rem] text-[var(--muted)] leading-tight block">
                    {a}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- description ---------- */}
      <section className="py-24 border-t border-[var(--line)]">
        <div className="container-lux max-w-[820px] mx-auto text-center">
          <Reveal>
            <p className="kicker">the everyday ritual</p>
            <p className="lede text-3xl md:text-4xl mt-6 leading-[1.3]">
              {PRODUCT.description}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="py-24 border-t border-[var(--line)]">
        <div className="container-lux grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <Reveal>
              <p className="kicker">good to know</p>
              <h2 className="display text-5xl md:text-6xl mt-4">
                Questions,
                <br />
                <em>answered.</em>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            {FAQS.map((f, i) => (
              <div key={i} className="border-b border-[var(--line)]">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  className="w-full flex items-center justify-between py-6 text-left"
                >
                  <span className="font-serif-display text-2xl md:text-3xl pr-6">{f.q}</span>
                  {openFaq === i ? <Minus size={20} /> : <Plus size={20} />}
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    openFaq === i ? "max-h-52 pb-6" : "max-h-0"
                  }`}
                >
                  <p className="body-copy text-lg max-w-[540px]">{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- reviews ---------- */}
      <section className="py-24 border-t border-[var(--line)]">
        <div className="container-lux">
          <Reveal>
            <div className="flex items-end justify-between flex-wrap gap-6">
              <h2 className="display text-5xl md:text-7xl">
                Loved <em>in the wild.</em>
              </h2>
              <div className="flex items-center gap-3">
                <Stars value={avgRating} size={18} />
                <span className="body-copy">
                  {avgRating.toFixed(1)} out of 5 · {reviewList.length} reviews
                </span>
              </div>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {reviewList.slice(0, 6).map((r, i) => (
              <Reveal key={r.id || i} delay={(i % 3) * 120}>
                <div className="border-t border-[var(--ink)] pt-6 h-full">
                  <Stars value={r.rating} />
                  <h3 className="font-serif-display text-2xl mt-4">{r.title}</h3>
                  <p className="body-copy mt-4">{r.body}</p>
                  <p className="kicker mt-6">
                    {r.name} · {r.location}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* write a review */}
          <div className="mt-20 grid md:grid-cols-12 gap-12 border-t border-[var(--line)] pt-16">
            <div className="md:col-span-4">
              <p className="kicker">share yours</p>
              <h3 className="display text-4xl md:text-5xl mt-4">
                Write a <em>review.</em>
              </h3>
            </div>
            <form onSubmit={submitReview} className="md:col-span-7 md:col-start-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <input
                  required
                  placeholder="Your name"
                  value={rf.name}
                  onChange={(e) => setRf({ ...rf, name: e.target.value })}
                  className="bg-transparent border-b border-[var(--line)] focus:border-[var(--ink)] outline-none py-2 font-sans-ui transition-colors"
                />
                <div className="flex items-center gap-2">
                  <span className="kicker">rating</span>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setRf({ ...rf, rating: i + 1 })}
                    >
                      <Star
                        size={20}
                        className="text-[var(--accent)]"
                        fill={i < rf.rating ? "currentColor" : "none"}
                        strokeWidth={1.4}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <input
                required
                placeholder="Headline"
                value={rf.title}
                onChange={(e) => setRf({ ...rf, title: e.target.value })}
                className="w-full bg-transparent border-b border-[var(--line)] focus:border-[var(--ink)] outline-none py-2 font-sans-ui transition-colors"
              />
              <textarea
                required
                rows={3}
                placeholder="Tell us about your Floenzy experience…"
                value={rf.body}
                onChange={(e) => setRf({ ...rf, body: e.target.value })}
                className="w-full bg-transparent border-b border-[var(--line)] focus:border-[var(--ink)] outline-none py-2 font-sans-ui resize-none transition-colors"
              />
              <button type="submit" className="btn-solid" disabled={submitting}>
                {thanks ? "Thank you!" : submitting ? "Posting…" : "Post review"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

// fallback if API unavailable
const PRODUCT_REVIEWS_FALLBACK = [
  {
    name: "Christiany",
    location: "United Kingdom",
    rating: 5,
    title: "A noticeable difference in the shower",
    body: "Straightforward to fit onto my existing UK shower hose — no tools needed. The water feels nicer on my skin, and it doesn't look out of place in the bathroom.",
  },
  {
    name: "Recommended Reviews",
    location: "United Kingdom",
    rating: 5,
    title: "The flo that steals the show",
    body: "Fitting it was quick and simple. The pressure is excellent and consistent, and the modern design looks great. Highly recommended.",
  },
  {
    name: "Fab Finds",
    location: "United Kingdom",
    rating: 4,
    title: "Noticeable difference in skin and hair",
    body: "After a couple of weeks, skin feels far less dry and hair feels softer. The pressure stays strong through the multi-stage filter.",
  },
];

export default Shop;
