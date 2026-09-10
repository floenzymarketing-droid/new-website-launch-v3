import React, { useState } from "react";
import { Star, Plus, Minus, Check, ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal";
import { PRODUCT, FAQS, REVIEWS, AMAZON_URL } from "../mock/mock";

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
  const [active, setActive] = useState(0);
  const [colour, setColour] = useState(PRODUCT.colours[0].name);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const addToBag = () => {
    const bag = { name: PRODUCT.name, colour, qty, price: PRODUCT.price };
    try {
      localStorage.setItem("floenzy_bag", JSON.stringify(bag));
    } catch (e) {}
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
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
            <div className="grid grid-cols-5 gap-3 mt-4">
              {PRODUCT.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`aspect-square bg-[var(--paper)] border overflow-hidden transition-colors ${
                    active === i ? "border-[var(--ink)]" : "border-[var(--line)]"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* info */}
          <div className="md:col-span-5 md:pt-6">
            <p className="kicker">{PRODUCT.tagline}</p>
            <h1 className="display text-6xl md:text-7xl mt-4">
              {PRODUCT.name}
            </h1>
            <p className="font-serif-display text-2xl italic mt-2 text-[#4a463e]">
              {PRODUCT.title}
            </p>

            <div className="flex items-center gap-3 mt-5">
              <Stars value={PRODUCT.rating} />
              <span className="body-copy text-sm">
                {PRODUCT.rating} · {PRODUCT.reviewCount} reviews
              </span>
            </div>

            <p className="display text-5xl mt-8">
              {PRODUCT.currency}
              {PRODUCT.price.toFixed(2)}
            </p>

            {/* colours */}
            <div className="mt-8">
              <p className="kicker">colour — {colour}</p>
              <div className="flex gap-3 mt-4">
                {PRODUCT.colours.map((c) => (
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
            </div>

            {/* qty + add */}
            <div className="flex items-center gap-4 mt-10">
              <div className="flex items-center border border-[var(--ink)]">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-4 py-4"
                >
                  <Minus size={14} />
                </button>
                <span className="px-3 font-sans-ui text-sm w-8 text-center">
                  {qty}
                </span>
                <button onClick={() => setQty((q) => q + 1)} className="px-4 py-4">
                  <Plus size={14} />
                </button>
              </div>
              <button onClick={addToBag} className="btn-solid flex-1 justify-center">
                {added ? (
                  <>
                    Added <Check size={15} />
                  </>
                ) : (
                  <>Add to bag</>
                )}
              </button>
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
                  <span className="font-serif-display text-2xl md:text-3xl pr-6">
                    {f.q}
                  </span>
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
                <Stars value={PRODUCT.rating} size={18} />
                <span className="body-copy">
                  {PRODUCT.rating} out of 5 · {PRODUCT.reviewCount} reviews
                </span>
              </div>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {REVIEWS.map((r, i) => (
              <Reveal key={i} delay={i * 120}>
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
        </div>
      </section>
    </main>
  );
};

export default Shop;
