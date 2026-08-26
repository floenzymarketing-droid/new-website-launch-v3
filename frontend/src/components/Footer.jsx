import React from "react";
import { Link } from "react-router-dom";
import { NAV, AMAZON_URL } from "../mock/mock";

const Footer = () => {
  return (
    <footer className="bg-[var(--ink)] text-[var(--cream)]">
      <div className="container-lux py-24">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-6">
            <p className="kicker" style={{ color: "#b3a894" }}>
              step into cleaner water
            </p>
            <h3 className="display text-[13vw] md:text-[7vw] mt-4 leading-[0.9]">
              Your water,
              <br />
              <em>reimagined.</em>
            </h3>
            <a
              href={AMAZON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-line mt-10"
              style={{ color: "var(--cream)", borderColor: "var(--cream)" }}
            >
              Shop Floenzy — £55
            </a>
          </div>

          <div className="md:col-span-3 md:col-start-9">
            <p className="kicker" style={{ color: "#b3a894" }}>
              explore
            </p>
            <ul className="mt-6 space-y-3">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    className="font-serif-display text-2xl hover:italic transition-all"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="kicker" style={{ color: "#b3a894" }}>
              connect
            </p>
            <ul className="mt-6 space-y-3 body-copy" style={{ color: "#cfc6b6" }}>
              <li>Instagram</li>
              <li>Pinterest</li>
              <li>hello@floenzy.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/15 flex flex-col md:flex-row justify-between gap-4">
          <p className="font-sans-ui text-[0.7rem] tracking-[0.2em] uppercase" style={{ color: "#9d9484" }}>
            © {new Date().getFullYear()} Floenzy. Made for UK hard water.
          </p>
          <p className="font-sans-ui text-[0.7rem] tracking-[0.2em] uppercase" style={{ color: "#9d9484" }}>
            Privacy · Terms · Returns
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
