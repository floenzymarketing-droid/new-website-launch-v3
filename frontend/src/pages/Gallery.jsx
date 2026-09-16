import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal";
import { PRODUCT, FLOENZY_PHOTOS } from "../mock/mock";

const INSTALL_VIDEO =
  "https://customer-assets-lxgj4vgw.emergentagent.net/job_shower-refresh/artifacts/52ts3wfh_FLOENZY%20INSTALATION%20-%20ORIGINAL.mp4";

const G = {
  install:
    "https://customer-assets-lxgj4vgw.emergentagent.net/job_shower-refresh/artifacts/e1t57j27_FLOENZY%20PHOTO%2001%20Large%20Large.jpeg",
  faceBlack:
    "https://customer-assets-lxgj4vgw.emergentagent.net/job_shower-refresh/artifacts/an56fqb0_FLOENZY%20PHOTO%2017%20Large%20Large.jpeg",
  showerBeige:
    "https://customer-assets-lxgj4vgw.emergentagent.net/job_shower-refresh/artifacts/t1hac89x_FLOENZY%20PHOTO%2016%20%281%29.webp",
  washHair:
    "https://customer-assets-lxgj4vgw.emergentagent.net/job_shower-refresh/artifacts/pwxvulkw_FLOENZY%20PHOTO%2011%20Large%20Large.jpeg",
  onRail:
    "https://customer-assets-lxgj4vgw.emergentagent.net/job_shower-refresh/artifacts/2us2rrc6_FLOENZY%20PHOTO%2021%20Large%20Large.jpeg",
  softSkin:
    "https://customer-assets-lxgj4vgw.emergentagent.net/job_shower-refresh/artifacts/x8z5hl3k_FLOENZY%20PHOTO%2018%20%281%29%20Large%20Large.jpeg",
  closeup:
    "https://customer-assets-lxgj4vgw.emergentagent.net/job_shower-refresh/artifacts/2i3eitbi_fullbanner31.webp",
  galleryPortrait:
    "https://customer-assets-lxgj4vgw.emergentagent.net/job_shower-refresh/artifacts/cip3rdvx_Gray%20Minimalist%20Photo%20COllage%20Portrait%20Instagram%20Post.png",
  faceBeige:
    "https://customer-assets-lxgj4vgw.emergentagent.net/job_shower-refresh/artifacts/9shpsz3e_IMG_20260427_161047.webp",
  attachBlack:
    "https://customer-assets-lxgj4vgw.emergentagent.net/job_shower-refresh/artifacts/96677qhj_FLOENZY%20PHOTO%2010.webp",
};

const gallery = [
  { src: G.onRail, ratio: "aspect-[3/4]", label: "Floenzy · Graphite" },
  { src: G.galleryPortrait, ratio: "aspect-[3/4]", label: "In the gallery" },
  { src: G.showerBeige, ratio: "aspect-[4/3]", label: "The morning ritual" },
  { src: G.faceBlack, ratio: "aspect-[4/3]", label: "Softer skin" },
  { src: G.attachBlack, ratio: "aspect-[4/3]", label: "Fit the cartridge" },
  { src: G.washHair, ratio: "aspect-[4/3]", label: "Healthier hair" },
  { src: FLOENZY_PHOTOS.marble, ratio: "aspect-[3/4]", label: "On marble" },
  { src: G.install, ratio: "aspect-[4/3]", label: "Tool-free install" },
  { src: G.faceBeige, ratio: "aspect-[3/4]", label: "Soft to the touch" },
  { src: G.softSkin, ratio: "aspect-[4/3]", label: "Spa pressure" },
  { src: G.closeup, ratio: "aspect-[4/3]", label: "Engineered in hand" },
  { src: PRODUCT.images[1], ratio: "aspect-[4/3]", label: "The kit" },
];

const INSTALL_STEPS = [
  {
    no: "01",
    title: "Unscrew",
    body: "Remove your existing shower head from the hose — by hand, no tools required.",
  },
  {
    no: "02",
    title: "Attach",
    body: "Screw Floenzy onto the standard UK ½″ hose. A snug hand-tighten is all it takes.",
  },
  {
    no: "03",
    title: "Enjoy",
    body: "Turn on the water. Filtered, softer water flows from the very first shower.",
  },
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

      {/* ---------- HOW TO INSTALL ---------- */}
      <section className="py-24 border-t border-[var(--line)]">
        <div className="container-lux">
          <Reveal>
            <p className="kicker text-center">under two minutes, no tools</p>
            <h2 className="display text-center text-5xl md:text-8xl mt-6 mb-14">
              How to <em>install.</em>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="aspect-video bg-[var(--ink)] border border-[var(--line)] overflow-hidden max-w-[1000px] mx-auto">
              <video
                src={INSTALL_VIDEO}
                poster={G.install}
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-10 md:gap-14 mt-16 max-w-[1000px] mx-auto">
            {INSTALL_STEPS.map((s, i) => (
              <Reveal key={s.no} delay={i * 120}>
                <div className="border-t border-[var(--ink)] pt-6">
                  <span className="font-serif-display italic text-4xl text-[var(--accent)]">
                    {s.no}
                  </span>
                  <h3 className="font-serif-display text-3xl mt-3">{s.title}</h3>
                  <p className="body-copy mt-3">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
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
