import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { NAV } from "../mock/mock";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[var(--cream)]/92 backdrop-blur-md border-b border-[var(--line)]"
            : "bg-transparent"
        }`}
      >
        <div className="container-lux flex items-center justify-between h-[76px]">
          <Link
            to="/"
            className="font-serif-display text-2xl tracking-[0.18em] uppercase"
            style={{ fontWeight: 500 }}
          >
            Floenzy
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="font-sans-ui uppercase text-[0.7rem] tracking-[0.24em] text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link
              to="/shop"
              className="font-sans-ui uppercase text-[0.7rem] tracking-[0.24em] border-b border-[var(--ink)] pb-1 hover:opacity-60 transition-opacity"
            >
              £55 · Shop
            </Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-[var(--cream)] transition-all duration-500 md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="font-serif-display text-4xl italic"
            >
              {n.label}
            </Link>
          ))}
          <Link to="/shop" className="btn-solid mt-6">
            Shop · £55
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
