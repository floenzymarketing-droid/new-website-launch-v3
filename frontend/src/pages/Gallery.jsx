import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal";
import { IMAGES, PRODUCT, FLOENZY_PHOTOS } from "../mock/mock";

const gallery = [
  { src: FLOENZY_PHOTOS.marble, ratio: "aspect-[3/4]", label: "Floenzy · Graphite" },
  { src: FLOENZY_PHOTOS.using, ratio: "aspect-[4/3]", label: "The morning ritual" },
  { src: IMAGES.beauty.skin[0], ratio: "aspect-[3/4]", label: "Softer skin" },
  { src: FLOENZY_PHOTOS.install, ratio: "aspect-[4/3]", label: "Tool-free install" },
  { src: IMAGES.bathrooms[1], ratio: "aspect-[3/4]", label: "The ritual" },
  { src: PRODUCT.images[2], ratio: "aspect-[3/4]", label: "Installed" },
  { src: IMAGES.beauty.hair[0], ratio: "aspect-[3/4]", label: "Healthier hair" },
  { src: IMAGES.water[2], ratio: "aspect-[3/4]", label: "Spa pressure" },
  { src: IMAGES.beauty.droplets[1], ratio: "aspect-[3/4]", label: "On the skin" },
];

const Gallery = () => {
  return (
    <main className="bg-[var(--cream)]">
      <section className="pt-44 pb-20 text-center">
        <div className="container-lux">
          <Reveal>
            <p className="kicker">the floenzy world</p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="display text-7xl md:text-[11vw] mt-8">
              A <em>quieter</em> luxury.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="pb-28">
        <div className="container-lux columns-1 sm:columns-2 lg:columns-3 gap-6 [&>*]:mb-6">
          {gallery.map((g, i) => (
            <Reveal key={i} delay={(i % 3) * 100} className="break-inside-avoid">
              <div className={`img-zoom ${g.ratio} bg-[var(--sand)] group relative`}>
                <img src={g.src} alt={g.label} />
                <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/40 to-transparent">
                  <span className="font-sans-ui uppercase tracking-[0.24em] text-[0.68rem] text-white">
                    {g.label}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pb-40 text-center">
        <div className="container-lux">
          <Reveal>
            <h2 className="display text-5xl md:text-7xl">
              Bring it <em>home.</em>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <div className="flex justify-center mt-10">
              <Link to="/shop" className="btn-solid">
                Shop Floenzy — £55 <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default Gallery;
