import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal";
import { listProducts } from "../data/products";

const ProductCard = ({ p, delay = 0 }) => (
  <Reveal delay={delay}>
    <Link to={`/shop/${p.slug}`} className="group block">
      <div className="img-zoom aspect-[4/5] bg-[var(--paper)] border border-[var(--line)] flex items-center justify-center">
        <img
          src={p.cardImage}
          alt={p.name}
          className="w-full h-full object-contain p-6"
        />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="kicker">{p.brand}</p>
          <h3 className="font-serif-display text-2xl md:text-[1.7rem] leading-tight mt-1">
            {p.name}
          </h3>
          <p className="body-copy text-sm mt-1">{p.short}</p>
        </div>
        <span className="font-serif-display text-2xl whitespace-nowrap">
          £{p.price.toFixed(2)}
        </span>
      </div>
      <span className="btn-line mt-4 group-hover:gap-[1.4rem]">
        View product <ArrowRight size={14} />
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
            <h1 className="display text-7xl md:text-[9vw] mt-6">
              Shop <em>Floenzy.</em>
            </h1>
          </Reveal>
          <Reveal delay={220}>
            <p className="lede text-2xl mt-8 max-w-[560px] mx-auto text-[#5b616a]">
              Two filter heads. Two refill cartridges. One quietly transformative
              shower.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-32">
        <div className="container-lux grid sm:grid-cols-2 gap-x-10 gap-y-16">
          {products.map((p, i) => (
            <ProductCard key={p.slug} p={p} delay={(i % 2) * 120} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Shop;
