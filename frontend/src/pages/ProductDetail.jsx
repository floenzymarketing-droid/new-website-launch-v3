import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Star, Plus, Minus, Check, ChevronRight, ShoppingBag, Truck, ZoomIn, X } from "lucide-react";
import Reveal from "../components/Reveal";
import { useCart } from "../context/CartContext";
import { getProduct } from "../data/products";

const Stars = ({ value, size = 15 }) => (
  <span className="inline-flex gap-0.5 text-[var(--accent)]">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={size} fill={i < Math.round(value) ? "currentColor" : "none"} strokeWidth={1.4} />
    ))}
  </span>
);

const ProductDetail = ({ slugOverride }) => {
  const params = useParams();
  const navigate = useNavigate();
  const slug = slugOverride || params.slug;
  const product = getProduct(slug);

  const { addItem, openCart } = useCart();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    setActive(0);
    setQty(1);
  }, [slug]);

  if (!product) {
    return (
      <main className="bg-[var(--cream)] min-h-screen pt-40 pb-32 text-center">
        <div className="container-lux">
          <h1 className="display text-6xl">Product not found.</h1>
          <Link to="/shop" className="btn-solid mt-8">Back to Shop</Link>
        </div>
      </main>
    );
  }

  const isHead = product.type === "head";

  const addToCart = () => {
    addItem({
      sku: product.sku,
      colour: product.colour,
      qty,
      name: product.name,
      price: product.price,
      image: product.cardImage,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const buyNow = () => {
    addToCart();
    navigate("/checkout");
  };

  return (
    <main className="bg-[var(--cream)]">
      {/* zoom lightbox */}
      {zoom && (
        <div
          onClick={() => setZoom(false)}
          className="fixed inset-0 z-[80] bg-black/80 flex items-center justify-center p-6 cursor-zoom-out"
        >
          <button
            onClick={() => setZoom(false)}
            className="absolute top-6 right-6 text-white/80 hover:text-white"
            aria-label="Close"
          >
            <X size={30} />
          </button>
          <img
            src={product.images[active]}
            alt={product.name}
            className="max-w-[92vw] max-h-[88vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      {/* breadcrumb */}
      <div className="container-lux pt-28 pb-6">
        <div className="flex items-center gap-2 kicker">
          <Link to="/shop" className="hover:text-[var(--ink)]">Shop</Link>
          <ChevronRight size={12} />
          <span>{product.name}</span>
        </div>
      </div>

      {/* ---------- product ---------- */}
      <section className="pb-24">
        <div className="container-lux grid md:grid-cols-12 gap-10 md:gap-16">
          {/* gallery */}
          <div className="md:col-span-7">
            <button
              onClick={() => setZoom(true)}
              className="group relative w-full aspect-square bg-[var(--paper)] border border-[var(--line)] overflow-hidden cursor-zoom-in"
            >
              <img src={product.images[active]} alt={product.name} className="w-full h-full object-contain p-6" />
              <span className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-[var(--cream)]/90 border border-[var(--line)] px-3 py-1.5 kicker">
                <ZoomIn size={13} /> Click to zoom
              </span>
            </button>
          </div>

          {/* info */}
          <div className="md:col-span-5 md:pt-2">
            <p className="kicker">{product.brand}</p>
            <h1 className="font-serif-display text-2xl md:text-3xl leading-[1.2] mt-3">
              {product.name}
            </h1>
            <p className="body-copy text-xs mt-3 leading-relaxed">{product.tagline}</p>

            {isHead && (
              <div className="flex items-center gap-3 mt-5">
                <Stars value={product.rating} />
                <span className="body-copy text-sm">{product.rating} · {product.reviewCount} reviews</span>
              </div>
            )}

            <div className="flex items-baseline gap-3 mt-7">
              <p className="display text-5xl">£{product.price.toFixed(2)}</p>
              <span className="flex items-center gap-1.5 kicker"><Truck size={14} /> Free returns</span>
            </div>

            {/* colour link for heads */}
            {isHead && (
              <div className="mt-8">
                <p className="kicker">colour — {product.colour === "Beige" ? "Beige" : "Grey"}</p>
                <div className="flex gap-3 mt-4">
                  <Link
                    to="/shop/hard-water-filter-beige"
                    aria-label="Beige"
                    className={`w-10 h-10 rounded-full border transition-transform ${product.colour === "Beige" ? "ring-1 ring-offset-2 ring-[var(--ink)] scale-105" : "border-[var(--line)]"}`}
                    style={{ background: "#D8CBB6", borderColor: "#D8CBB6" }}
                  />
                  <Link
                    to="/shop/hard-water-filter-grey"
                    aria-label="Grey"
                    className={`w-10 h-10 rounded-full border transition-transform ${product.colour !== "Beige" ? "ring-1 ring-offset-2 ring-[var(--ink)] scale-105" : "border-[var(--line)]"}`}
                    style={{ background: "#4b4f55", borderColor: "#4b4f55" }}
                  />
                </div>
              </div>
            )}

            {/* qty + buttons */}
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
            <button onClick={buyNow} className="btn-line mt-6">Buy now <ChevronRight size={14} /></button>

            {/* cartridge description */}
            {!isHead && (
              <p className="body-copy text-base mt-8 pt-8 border-t border-[var(--line)]">{product.description}</p>
            )}

            {/* feature bullets */}
            <ul className="mt-8 pt-8 border-t border-[var(--line)] space-y-5">
              {product.features.map(([lead, rest], i) => (
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

      {/* ---------- marketing / A+ image stack ---------- */}
      {product.marketingImages && (
        <section className="border-t border-[var(--line)]">
          <div className="container-lux py-14 md:py-20 max-w-[1000px] mx-auto space-y-8">
            {product.marketingImages.map((img, i) => (
              <Reveal key={i} delay={(i % 2) * 100}>
                <img
                  src={img}
                  alt={`${product.name} feature ${i + 1}`}
                  className="w-full border border-[var(--line)]"
                />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ---------- A+ content (heads) ---------- */}
      {isHead && product.aplus && (
        <section className="border-t border-[var(--line)]">
          {product.aplus.map((s, i) => (
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
      )}

      {/* ---------- specs (heads) ---------- */}
      {isHead && product.specs && (
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
                  {product.specs.map(([k, v], i) => (
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
      )}

      {/* ---------- FAQ ---------- */}
      {product.faqs && (
        <section className="py-24 border-t border-[var(--line)]">
          <div className="container-lux grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <Reveal>
                <p className="kicker">good to know</p>
                <h2 className="display text-5xl md:text-6xl mt-4">Questions,<br /><em>answered.</em></h2>
              </Reveal>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              {product.faqs.map((f, i) => (
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
      )}
    </main>
  );
};

export default ProductDetail;
