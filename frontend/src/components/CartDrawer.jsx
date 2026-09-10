import React from "react";
import { useNavigate } from "react-router-dom";
import { X, Plus, Minus, ShoppingBag, RefreshCw } from "lucide-react";
import { useCart } from "../context/CartContext";

const CartDrawer = () => {
  const {
    items,
    subscription,
    isOpen,
    closeCart,
    updateQty,
    removeItem,
    subtotal,
  } = useCart();
  const navigate = useNavigate();

  const goCheckout = () => {
    closeCart();
    navigate("/checkout");
  };

  return (
    <>
      {/* overlay */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      {/* panel */}
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-[440px] bg-[var(--paper)] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-7 h-[76px] border-b border-[var(--line)]">
          <span className="kicker">Your bag ({items.length})</span>
          <button onClick={closeCart} aria-label="Close">
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-7 py-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-20">
              <ShoppingBag size={30} strokeWidth={1.2} className="text-[var(--muted)]" />
              <p className="font-serif-display text-3xl">Your bag is empty.</p>
              <button onClick={closeCart} className="btn-line">
                Continue browsing
              </button>
            </div>
          ) : (
            <div className="space-y-7">
              {items.map((i) => {
                const key = `${i.sku}::${i.colour || ""}`;
                return (
                  <div key={key} className="flex gap-4">
                    <div className="w-20 h-24 bg-[var(--cream)] border border-[var(--line)] shrink-0 overflow-hidden">
                      <img
                        src={i.image}
                        alt={i.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between gap-2">
                        <p className="font-serif-display text-xl leading-tight">
                          {i.name}
                        </p>
                        <button
                          onClick={() => removeItem(key)}
                          className="text-[var(--muted)] hover:text-[var(--ink)]"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      {i.colour && (
                        <p className="kicker mt-1">{i.colour}</p>
                      )}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[var(--line)]">
                          <button
                            onClick={() => updateQty(key, i.qty - 1)}
                            className="px-3 py-2"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-2 font-sans-ui text-sm">{i.qty}</span>
                          <button
                            onClick={() => updateQty(key, i.qty + 1)}
                            className="px-3 py-2"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="font-serif-display text-lg">
                          £{(i.price * i.qty).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {subscription && (
                <div className="flex items-start gap-3 border border-[var(--line)] p-4 bg-[var(--cream)]">
                  <RefreshCw size={16} className="text-[var(--accent)] mt-0.5" />
                  <div>
                    <p className="font-sans-ui text-sm">
                      Refill subscription · {subscription.label}
                    </p>
                    <p className="body-copy text-xs mt-1">
                      £{subscription.price.toFixed(2)} per cartridge ·{" "}
                      {subscription.discount_pct}% off, ships automatically
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="px-7 py-6 border-t border-[var(--line)]">
            <div className="flex justify-between items-baseline mb-5">
              <span className="kicker">Subtotal</span>
              <span className="font-serif-display text-3xl">
                £{subtotal.toFixed(2)}
              </span>
            </div>
            <button
              onClick={goCheckout}
              className="btn-solid w-full justify-center"
            >
              Checkout
            </button>
            <p className="body-copy text-xs text-center mt-3">
              Complimentary UK delivery · 30-day returns
            </p>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;
