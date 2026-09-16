import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal";
import { IMAGES, STATS, FLOENZY_PHOTOS } from "../mock/mock";
import WaterChecker from "../components/WaterChecker";

const points = [
  {
    title: "Calcium & Magnesium",
    body: "The minerals that make water 'hard'. They bind with soap, leave residue on skin and hair, and build limescale on every surface they touch.",
  },
  {
    title: "Chlorine",
    body: "Added to disinfect your supply, chlorine strips the natural oils from skin and hair — the leading cause of tightness, dryness and dullness after a shower.",
  },
  {
    title: "Heavy Metals",
    body: "Trace metals travel through ageing pipework and settle into the water you shower in every single day, quietly compromising skin's barrier.",
  },
];

const TheWater = () => {
  return (
    <main className="bg-[var(--cream)]">
      <section className="pt-44 pb-16">
        <div className="container-lux">
          <Reveal>
            <p className="kicker text-center">the problem beneath the surface</p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="display text-center text-7xl md:text-[10vw] mt-8 leading-[0.9]">
              Over <em>60%</em> of UK homes
              <br />
              have <em>hard</em> water.
            </h1>
          </Reveal>
          <Reveal delay={220}>
            <p className="lede text-center max-w-[600px] mx-auto text-2xl mt-12 text-[#5b616a]">
              If you live in London, the South East or the Midlands, the water
              you shower in carries minerals, chlorine and metals at levels
              that visibly affect hair and skin.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-lux">
          <Reveal className="img-zoom aspect-[16/8] bg-[var(--sand)]">
            <img src={FLOENZY_PHOTOS.waterMap} alt="UK hard water map and limescale effects" />
          </Reveal>
        </div>
      </section>

      <section className="pb-28">
        <div className="container-lux grid md:grid-cols-3 gap-10 md:gap-14">
          {points.map((p, i) => (
            <Reveal key={i} delay={i * 120}>
              <p className="font-serif-display italic text-2xl text-[var(--accent)]">
                0{i + 1}
              </p>
              <h3 className="font-serif-display text-4xl mt-3">{p.title}</h3>
              <p className="body-copy mt-5">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--line)]">
        <div className="container-lux grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal
              key={i}
              delay={i * 90}
              className={`py-16 text-center ${
                i % 2 === 0 ? "border-r" : ""
              } md:border-r ${i < 2 ? "border-b md:border-b-0" : ""} border-[var(--line)]`}
            >
              <p className="display text-6xl">{s.value}</p>
              <p className="body-copy text-sm mt-3">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-28 md:py-36 border-y border-[var(--line)]">
        <div className="container-lux text-center">
          <Reveal>
            <p className="kicker">check your postcode</p>
            <h2 className="display text-5xl md:text-7xl mt-6">
              How <em>hard</em> is your water?
            </h2>
            <p className="lede text-xl md:text-2xl mt-6 max-w-[560px] mx-auto text-[#5b616a]">
              Enter your UK postcode to see your local hardness level — and whether
              Floenzy is right for you.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-14">
              <WaterChecker />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-32 text-center">
        <div className="container-lux">
          <Reveal>
            <h2 className="display text-6xl md:text-8xl">
              So we built the <em>answer.</em>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <div className="flex justify-center mt-12">
              <Link to="/filtration" className="btn-solid">
                Meet the filtration <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default TheWater;
