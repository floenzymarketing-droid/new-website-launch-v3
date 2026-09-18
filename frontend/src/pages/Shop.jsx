import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal";
import { listProducts } from "../data/products";

const ProductCard = ({ p, delay = 0 }) => (
  <Reveal delay={delay}>
    <Link to={`/shop/${p.slug}`} className="group block">
      <div className="aspect-square bg-[var(--paper)] border border-[var(--line)] flex items-center justify-center overflow-hidden">
        <img
          src={p.cardImage}
          alt={p.name}
          className="max-w-full max-h-full object-contain p-8"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="kicker">{p.brand}</p>
          <h3 className="font-serif-display text-lg md:text-xl leading-tight mt-1">
            {p.name}
          </h3>
          <p className="body-copy text-xs mt-1">{p.short}</p>
        </div>
        <span className="font-serif-display text-lg whitespace-nowrap">
          £{p.price.toFixed(2)}
        </span>
      </div>
      <span className="btn-line mt-3 group-hover:gap-[1.4rem] text-[0.62rem]">
        View product <ArrowRight size={13} />
      </span>
    </Link>
  </Reveal>
);

const Shop = () => {
  const products = listProducts();
  return (
    <main className="bg-[var(--cream)]">
      <section className="pt-40 pb-16 text-center">
        <div className="container-lux">
          <Reveal>
            <p className="kicker">the collection</p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="display text-6xl md:text-7xl mt-6">
              Shop <em>Floenzy.</em>
            </h1>
          </Reveal>
          <Reveal delay={220}>
            <p className="lede text-xl mt-6 max-w-[520px] mx-auto text-[#5b616a]">
              Two filter heads. Two refill cartridges. One quietly transformative
              shower.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-32">
        <div className="container-lux grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {products.map((p, i) => (
            <ProductCard key={p.slug} p={p} delay={(i % 4) * 90} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Shop;
