import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";
import { NAV, FLOENZY_LOGO } from "../mock/mock";
import { useCart } from "../context/CartContext";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { count, openCart } = useCart();

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
          <Link to="/" className="flex items-center">
            <img
              src={FLOENZY_LOGO}
              alt="Floenzy"
              className="h-7 md:h-8 w-auto"
            />
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

          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/shop"
              className="font-sans-ui uppercase text-[0.7rem] tracking-[0.24em] hover:opacity-60 transition-opacity"
            >
              £55
            </Link>
            <button
              onClick={openCart}
              className="relative flex items-center"
              aria-label="Open bag"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--ink)] text-[var(--cream)] text-[0.6rem] font-sans-ui w-4 h-4 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
          </div>

          <div className="flex items-center gap-5 md:hidden">
            <button onClick={openCart} className="relative" aria-label="Open bag">
              <ShoppingBag size={22} strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--ink)] text-[var(--cream)] text-[0.6rem] font-sans-ui w-4 h-4 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
            <button onClick={() => setOpen((o) => !o)} aria-label="Menu">
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
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
