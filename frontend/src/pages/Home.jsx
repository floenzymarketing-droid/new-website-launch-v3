import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal";
import { IMAGES, PRODUCT, STAGES, BENEFITS, STATS, FLOENZY_PHOTOS } from "../mock/mock";

const Home = () => {
  return (
    <main className="bg-[var(--cream)]">
      {/* ---------------- HERO ---------------- */}
      <section className="min-h-screen flex flex-col justify-center pt-28 pb-16">
        <div className="container-lux">
          <Reveal>
            <p className="kicker text-center">
              premium filtered shower head
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="display text-center mt-8 text-[19vw] md:text-[12.5vw] leading-[0.86]">
              where <em>hard</em> water
              <br />
              becomes <em>soft.</em>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <div className="flex flex-col items-center gap-8 mt-14">
              <p className="lede text-center max-w-[540px] text-2xl md:text-[1.7rem] text-[#4a463e]">
                A three-stage vitamin&nbsp;C filtration ritual — engineered for
                UK hard water, designed for softer skin and healthier hair.
              </p>
              <Link to="/shop" className="btn-solid">
                Discover Floenzy <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- MARQUEE ---------------- */}
      <section className="border-y border-[var(--line)] py-6 overflow-hidden">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex items-center">
              {[
                "reduces chlorine",
                "vitamin c infused",
                "softer skin",
                "less hair fall",
                "spa-level pressure",
                "fits UK ½″ hose",
              ].map((w, j) => (
                <span key={j} className="flex items-center">
                  <span className="font-serif-display italic text-3xl md:text-4xl px-8">
                    {w}
                  </span>
                  <span className="text-[var(--accent)] text-lg">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </section>

      {/* ---------------- INTRO / PRODUCT ---------------- */}
      <section className="py-28 md:py-40">
        <div className="container-lux grid md:grid-cols-12 gap-12 md:gap-16 items-center">
          <Reveal className="md:col-span-6">
            <div className="img-zoom aspect-[4/5] bg-[var(--sand)]">
              <img src={FLOENZY_PHOTOS.marble} alt="Floenzy shower head in a marble bathroom" />
            </div>
          </Reveal>
          <div className="md:col-span-5 md:col-start-8">
            <Reveal>
              <p className="kicker">the truth about your shower</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="display text-6xl md:text-7xl mt-6">
                It's your <em>water,</em>
                <br />
                not your shampoo.
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="body-copy text-lg mt-8 max-w-[440px]">
                Over 60% of UK homes have hard water. It dries skin, dulls hair
                and leaves limescale behind. Floenzy tackles the problem at its
                source — the water itself — so everything that follows simply
                works better.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <Link to="/the-water" className="btn-line mt-10">
                Understand the water <ArrowRight size={14} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- STATS ---------------- */}
      <section className="border-y border-[var(--line)]">
        <div className="container-lux grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal
              key={i}
              delay={i * 90}
              className={`py-14 md:py-20 text-center border-[var(--line)] ${
                i !== STATS.length - 1 ? "md:border-r" : ""
              } ${i % 2 === 0 ? "border-r md:border-r" : ""} ${
                i < 2 ? "border-b md:border-b-0" : ""
              }`}
            >
              <p className="display text-6xl md:text-7xl">{s.value}</p>
              <p className="body-copy text-sm mt-3 tracking-wide">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- PROCESS TEASER ---------------- */}
      <section className="py-28 md:py-40">
        <div className="container-lux">
          <Reveal>
            <p className="kicker text-center">a ritual in three stages</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="display text-center text-6xl md:text-8xl mt-6">
              Advanced filtration,
              <br />
              <em>quietly</em> at work.
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 md:gap-10 mt-20">
            {STAGES.map((st, i) => (
              <Reveal key={st.no} delay={i * 120}>
                <div className="group">
                  <div className="img-zoom aspect-[3/4] bg-[var(--sand)]">
                    <img src={st.image} alt={st.title} />
                  </div>
                  <div className="flex items-baseline gap-4 mt-6">
                    <span className="font-serif-display italic text-3xl text-[var(--accent)]">
                      {st.no}
                    </span>
                    <div>
                      <p className="kicker">{st.kicker}</p>
                      <h3 className="font-serif-display text-3xl mt-1">
                        {st.title}
                      </h3>
                    </div>
                  </div>
                  <p className="body-copy mt-4">{st.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="flex justify-center mt-16">
              <Link to="/filtration" className="btn-line">
                See the full process <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- BENEFITS ---------------- */}
      {BENEFITS.map((b, i) => (
        <section
          key={i}
          className={`py-10 md:py-24 ${i === 0 ? "" : ""}`}
        >
          <div
            className={`container-lux grid md:grid-cols-12 gap-12 md:gap-16 items-center`}
          >
            <Reveal
              className={`md:col-span-6 ${
                i % 2 === 1 ? "md:order-2 md:col-start-7" : ""
              }`}
            >
              <div className="img-zoom aspect-[4/5] bg-[var(--sand)]">
                <img src={b.image} alt={b.title} />
              </div>
            </Reveal>
            <div
              className={`md:col-span-5 ${
                i % 2 === 1 ? "md:order-1 md:col-start-1" : "md:col-start-8"
              }`}
            >
              <Reveal>
                <p className="kicker">{b.kicker}</p>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="display text-5xl md:text-7xl mt-6">{b.title}</h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="body-copy text-lg mt-8 max-w-[440px]">{b.body}</p>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* ---------------- FULL-BLEED LIFESTYLE BANNER ---------------- */}
      <section
        className="relative h-[70vh] md:h-[88vh] bg-cover bg-center bg-fixed flex items-end"
        style={{ backgroundImage: `url(${FLOENZY_PHOTOS.using})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="container-lux relative z-10 pb-16 md:pb-24">
          <Reveal>
            <p className="kicker" style={{ color: "#e8dfce" }}>
              from the very first shower
            </p>
            <h2 className="display text-white text-5xl md:text-8xl mt-4 max-w-[900px]">
              Softer skin. <em>Shinier</em> hair.
              <br />
              A moment that feels like <em>more.</em>
            </h2>
          </Reveal>
        </div>
      </section>

      {/* ---------------- QUOTE ---------------- */}
      <section className="py-28 md:py-44">
        <div className="container-lux max-w-[900px] mx-auto text-center">
          <Reveal>
            <p className="display text-4xl md:text-6xl leading-[1.15]">
              “Beauty starts in your shower. Remove what's damaging your hair
              and skin <em>at the source</em>, and everything else works
              better.”
            </p>
          </Reveal>
          <Reveal delay={150}>
            <p className="kicker mt-10">the floenzy philosophy</p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- GALLERY TEASER ---------------- */}
      <section className="pb-28 md:pb-40">
        <div className="container-lux">
          <div className="grid md:grid-cols-3 gap-6">
            <Reveal className="img-zoom aspect-[3/4] bg-[var(--sand)]">
              <img src={FLOENZY_PHOTOS.install} alt="Installing Floenzy" />
            </Reveal>
            <Reveal delay={120} className="img-zoom aspect-[3/4] bg-[var(--sand)] md:mt-16">
              <img src={IMAGES.beauty.hair[1]} alt="Healthy hair" />
            </Reveal>
            <Reveal delay={240} className="img-zoom aspect-[3/4] bg-[var(--sand)]">
              <img src={IMAGES.bathrooms[2]} alt="Bathroom" />
            </Reveal>
          </div>
          <Reveal delay={200}>
            <div className="flex justify-center mt-16">
              <Link to="/gallery" className="btn-line">
                Explore the gallery <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default Home;
