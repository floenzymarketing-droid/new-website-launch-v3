import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Droplets, Wind, Layers } from "lucide-react";
import Reveal from "../components/Reveal";
import { STAGES, PRODUCT, FLOENZY_PHOTOS } from "../mock/mock";

const icons = [Wind, Droplets, Layers];

const Filtration = () => {
  return (
    <main className="bg-[var(--cream)]">
      <section className="pt-44 pb-20">
        <div className="container-lux">
          <Reveal>
            <p className="kicker text-center">the floenzy process</p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="display text-center text-7xl md:text-[11vw] mt-8 leading-[0.88]">
              Three <em>stages.</em>
              <br />
              One <em>ritual.</em>
            </h1>
          </Reveal>
          <Reveal delay={220}>
            <p className="lede text-center max-w-[560px] mx-auto text-2xl mt-12 text-[#4a463e]">
              Floenzy filters what your water company can't — combining
              activated carbon fibre, vitamin C and a multi-layer media into a
              single, quiet act of care.
            </p>
          </Reveal>
        </div>
      </section>

      {STAGES.map((st, i) => {
        const Icon = icons[i];
        return (
          <section key={st.no} className="py-14 md:py-24">
            <div className="container-lux grid md:grid-cols-12 gap-12 md:gap-16 items-center">
              <Reveal
                className={`md:col-span-6 ${
                  i % 2 === 1 ? "md:order-2 md:col-start-7" : ""
                }`}
              >
                <div className="img-zoom aspect-[5/4] bg-[var(--sand)]">
                  <img src={st.image} alt={st.title} />
                </div>
              </Reveal>
              <div
                className={`md:col-span-5 ${
                  i % 2 === 1 ? "md:order-1 md:col-start-1" : "md:col-start-8"
                }`}
              >
                <Reveal>
                  <div className="flex items-center gap-4">
                    <span className="display text-7xl text-[var(--accent)]">
                      {st.no}
                    </span>
                    <Icon size={26} strokeWidth={1.4} className="text-[var(--accent)]" />
                  </div>
                </Reveal>
                <Reveal delay={100}>
                  <p className="kicker mt-6">{st.kicker}</p>
                  <h2 className="display text-5xl md:text-6xl mt-3">
                    {st.title}
                  </h2>
                </Reveal>
                <Reveal delay={200}>
                  <p className="body-copy text-lg mt-6 max-w-[440px]">
                    {st.body}
                  </p>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      <section className="py-28">
        <div className="container-lux grid md:grid-cols-12 gap-12 items-center">
          <Reveal className="md:col-span-6">
            <div className="img-zoom aspect-[4/5] bg-[var(--sand)]">
              <img src={FLOENZY_PHOTOS.hand} alt="Floenzy shower head in hand" />
            </div>
          </Reveal>
          <div className="md:col-span-5 md:col-start-8">
            <Reveal>
              <p className="kicker">no compromise</p>
              <h2 className="display text-5xl md:text-7xl mt-5">
                392 micro-holes. <em>Zero</em> pressure drop.
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="body-copy text-lg mt-8 max-w-[460px]">
                Most filters trade pressure for purity. Floenzy refuses to. Our
                392 precision micro-holes accelerate water velocity, giving you
                a stronger, more focused flow — while filtering every drop.
              </p>
            </Reveal>
            <Reveal delay={250}>
              <Link to="/shop" className="btn-solid mt-10">
                Shop Floenzy — £55 <ArrowRight size={15} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Filtration;
