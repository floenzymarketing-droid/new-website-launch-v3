import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal";
import { FLOENZY_PHOTOS } from "../mock/mock";

const OurStory = () => {
  return (
    <main className="bg-[var(--cream)]">
      {/* ---------------- HERO ---------------- */}
      <section className="min-h-[92vh] flex flex-col justify-center pt-32 pb-16">
        <div className="container-lux">
          <Reveal>
            <p className="kicker">our story</p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="display text-[13vw] md:text-[8.5vw] leading-[0.9] mt-8 max-w-[1100px]">
              Why we brought
              <br />
              Floenzy <em>to the UK.</em>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <div className="flex items-start gap-6 mt-14 max-w-[620px]">
              <span className="w-px h-24 bg-[var(--ink)] shrink-0 mt-1" />
              <p className="lede text-2xl md:text-[1.7rem] text-[#4a463e]">
                A quiet complaint, heard in home after home — and the
                engineering answer we built in response.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- FOUNDER SPLIT ---------------- */}
      <section className="py-16 md:py-28">
        <div className="container-lux grid md:grid-cols-12 gap-12 md:gap-16 items-center">
          <Reveal className="md:col-span-5">
            <div className="img-zoom aspect-[4/5] bg-[var(--sand)]">
              <img src={FLOENZY_PHOTOS.marble} alt="Floenzy shower head" />
            </div>
          </Reveal>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal>
              <p className="kicker">the beginning</p>
            </Reveal>
            <Reveal delay={100}>
              <p className="lede text-3xl md:text-[2.4rem] leading-[1.3] mt-6">
                As a plumbing and heating engineer, I spent years inside British
                homes — called out for one issue or another. But behind almost
                every visit sat the same quiet complaint:{" "}
                <em>
                  hair losing its thickness, skin that felt tight after every
                  shower, water that left more behind than it washed away.
                </em>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- FULL-BLEED BANNER ---------------- */}
      <section
        className="relative h-[64vh] md:h-[82vh] bg-cover bg-center bg-fixed flex items-end"
        style={{ backgroundImage: `url(${FLOENZY_PHOTOS.using})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
        <div className="container-lux relative z-10 pb-16 md:pb-24">
          <Reveal>
            <h2 className="display text-white text-5xl md:text-8xl max-w-[1000px]">
              The cause was rarely the boiler.
              <br />
              It was the <em>water itself.</em>
            </h2>
          </Reveal>
        </div>
      </section>

      {/* ---------------- PROBLEM / DECISION ---------------- */}
      <section className="py-20 md:py-32">
        <div className="container-lux grid md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-6">
            <Reveal>
              <p className="body-copy text-xl md:text-2xl leading-[1.7] font-serif-display text-[#3a362f]">
                Hard, mineral-laden water, running through fittings never
                designed to filter it. The usual remedy — a full water softening
                system — was rarely the answer.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="flex flex-wrap gap-x-10 gap-y-3 mt-10">
                {["Expensive to install", "Disruptive to a home", "More machinery than needed"].map(
                  (t, i) => (
                    <div key={i} className="flex items-baseline gap-3">
                      <span className="font-serif-display italic text-2xl text-[var(--accent)]">
                        0{i + 1}
                      </span>
                      <span className="kicker">{t}</span>
                    </div>
                  )
                )}
              </div>
            </Reveal>
          </div>
          <Reveal className="md:col-span-5 md:col-start-8">
            <div className="img-zoom aspect-[5/4] bg-[var(--sand)]">
              <img src={FLOENZY_PHOTOS.install} alt="Installing the Floenzy cartridge" />
            </div>
          </Reveal>
        </div>

        <div className="container-lux mt-16 md:mt-24">
          <Reveal>
            <p className="lede text-3xl md:text-5xl leading-[1.3] max-w-[1000px]">
              So we set out to engineer something more considered — precision
              filtration built to the same standard as{" "}
              <em>professional plumbing work</em>, distilled into a single
              fitting that installs in minutes and asks nothing of the home
              around it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- PULL QUOTE ---------------- */}
      <section className="py-24 md:py-40 border-y border-[var(--line)]">
        <div className="container-lux max-w-[1000px] mx-auto text-center">
          <Reveal>
            <p className="display text-4xl md:text-[4rem] leading-[1.12]">
              “Professional-grade water care,{" "}
              <em>engineered to disappear</em> quietly into an everyday shower.”
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="flex items-center justify-center gap-4 mt-12">
              <span className="w-10 h-px bg-[var(--accent)]" />
              <p className="font-sans-ui uppercase tracking-[0.28em] text-[0.72rem] text-[var(--accent)]">
                Founder, Floenzy
              </p>
              <span className="w-10 h-px bg-[var(--accent)]" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- CLOSE / CTA ---------------- */}
      <section className="py-20 md:py-32">
        <div className="container-lux grid md:grid-cols-12 gap-12 md:gap-16 items-center">
          <Reveal className="md:col-span-6">
            <div className="img-zoom aspect-[5/4] bg-[var(--sand)]">
              <img src={FLOENZY_PHOTOS.box} alt="Floenzy shower head and filter cartridges" />
            </div>
          </Reveal>
          <div className="md:col-span-5 md:col-start-8">
            <Reveal>
              <p className="kicker">from our home to yours</p>
              <h2 className="display text-5xl md:text-7xl mt-5">
                Made for the way <em>Britain</em> showers.
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="body-copy text-lg mt-8 max-w-[440px]">
                One considered fitting. Professional-grade filtration. A shower
                that finally gives back more than it takes away.
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

export default OurStory;
