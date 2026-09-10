import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, ArrowLeft, RefreshCw } from "lucide-react";
import { useCart } from "../context/CartContext";
import { createOrder } from "../lib/api";

const Field = ({ label, ...props }) => (
  <label className="block">
    <span className="kicker">{label}</span>
    <input
      {...props}
      className="w-full mt-2 bg-transparent border-b border-[var(--line)] focus:border-[var(--ink)] outline-none py-2 font-sans-ui text-base transition-colors"
    />
  </label>
);

const Checkout = () => {
  const { items, subscription, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postcode: "",
  });
  const [placing, setPlacing] = useState(false);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const placeOrder = async (e) => {
    e.preventDefault();
    setError("");
    setPlacing(true);
    try {
      const payload = {
        items: items.map((i) => ({ sku: i.sku, colour: i.colour || null, qty: i.qty })),
        customer: form,
        subscription: subscription
          ? { interval_months: subscription.interval_months }
          : null,
      };
      const res = await createOrder(payload);
      setOrder(res);
      clear();
      window.scrollTo({ top: 0 });
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
          "Something went wrong placing your order. Please try again."
      );
    } finally {
      setPlacing(false);
    }
  };

  // ---- confirmation ----
  if (order) {
    return (
      <main className="bg-[var(--cream)] min-h-screen pt-40 pb-32">
        <div className="container-lux max-w-[720px] mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--ink)] text-[var(--cream)] flex items-center justify-center mx-auto">
            <Check size={26} />
          </div>
          <p className="kicker mt-8">order {order.id.slice(0, 8)} confirmed</p>
          <h1 className="display text-6xl md:text-8xl mt-4">
            Thank you, <em>{order.customer.name.split(" ")[0] || "friend"}.</em>
          </h1>
          <p className="lede text-2xl mt-8 text-[#4a463e]">
            Your Floenzy is on its way. A confirmation has been sent to{" "}
            {order.customer.email}.
          </p>

          <div className="mt-12 text-left border-t border-[var(--line)]">
            {order.items.map((i, idx) => (
              <div
                key={idx}
                className="flex justify-between py-4 border-b border-[var(--line)]"
              >
                <span className="font-serif-display text-xl">
                  {i.name} {i.colour ? `· ${i.colour}` : ""} × {i.qty}
                </span>
                <span className="font-serif-display text-xl">
                  £{i.line_total.toFixed(2)}
                </span>
              </div>
            ))}
            {order.subscription && (
              <div className="flex items-center gap-3 py-4 border-b border-[var(--line)]">
                <RefreshCw size={16} className="text-[var(--accent)]" />
                <span className="body-copy">
                  Refill subscription every {order.subscription.interval_months}{" "}
                  months · £{order.subscription.price.toFixed(2)} / cartridge
                </span>
              </div>
            )}
            <div className="flex justify-between py-5">
              <span className="kicker">Total paid</span>
              <span className="display text-4xl">£{order.total.toFixed(2)}</span>
            </div>
          </div>

          <Link to="/" className="btn-solid mt-10">
            Back to home
          </Link>
        </div>
      </main>
    );
  }

  // ---- empty ----
  if (items.length === 0) {
    return (
      <main className="bg-[var(--cream)] min-h-screen pt-40 pb-32">
        <div className="container-lux text-center">
          <h1 className="display text-6xl md:text-8xl">Your bag is empty.</h1>
          <Link to="/shop" className="btn-solid mt-10">
            Discover Floenzy
          </Link>
        </div>
      </main>
    );
  }

  // ---- checkout form ----
  return (
    <main className="bg-[var(--cream)] min-h-screen pt-32 pb-32">
      <div className="container-lux">
        <Link to="/shop" className="btn-line mb-12">
          <ArrowLeft size={14} /> Continue shopping
        </Link>
        <div className="grid md:grid-cols-12 gap-12 md:gap-20">
          {/* form */}
          <div className="md:col-span-6">
            <p className="kicker">checkout</p>
            <h1 className="display text-5xl md:text-6xl mt-4">Your details.</h1>
            <form onSubmit={placeOrder} className="mt-10 space-y-7">
              <Field label="Full name" required value={form.name} onChange={set("name")} />
              <Field
                label="Email"
                type="email"
                required
                value={form.email}
                onChange={set("email")}
              />
              <Field label="Address" required value={form.address} onChange={set("address")} />
              <div className="grid grid-cols-2 gap-6">
                <Field label="Town / City" required value={form.city} onChange={set("city")} />
                <Field
                  label="Postcode"
                  required
                  value={form.postcode}
                  onChange={set("postcode")}
                />
              </div>
              {error && <p className="body-copy text-sm text-[#8a4b3a]">{error}</p>}
              <button type="submit" className="btn-solid w-full justify-center" disabled={placing}>
                {placing ? "Placing order…" : `Pay £${subtotal.toFixed(2)}`}
              </button>
              <p className="body-copy text-xs text-center">
                This is a demo checkout — no real payment is taken.
              </p>
            </form>
          </div>

          {/* summary */}
          <div className="md:col-span-5 md:col-start-8">
            <div className="border-t border-[var(--ink)] pt-6 sticky top-28">
              <p className="kicker mb-6">order summary</p>
              {items.map((i) => {
                const key = `${i.sku}::${i.colour || ""}`;
                return (
                  <div key={key} className="flex gap-4 mb-6">
                    <div className="w-16 h-20 bg-[var(--paper)] border border-[var(--line)] shrink-0 overflow-hidden">
                      <img src={i.image} alt={i.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1">
                      <p className="font-serif-display text-lg leading-tight">{i.name}</p>
                      {i.colour && <p className="kicker mt-1">{i.colour}</p>}
                      <p className="body-copy text-sm mt-1">Qty {i.qty}</p>
                    </div>
                    <span className="font-serif-display text-lg">
                      £{(i.price * i.qty).toFixed(2)}
                    </span>
                  </div>
                );
              })}
              {subscription && (
                <div className="flex items-start gap-3 border border-[var(--line)] p-4 bg-[var(--paper)] mb-6">
                  <RefreshCw size={16} className="text-[var(--accent)] mt-0.5" />
                  <p className="body-copy text-sm">
                    Refill subscription · {subscription.label} ·{" "}
                    {subscription.discount_pct}% off future cartridges
                  </p>
                </div>
              )}
              <div className="flex justify-between py-4 border-t border-[var(--line)]">
                <span className="body-copy">Delivery</span>
                <span className="body-copy">Complimentary</span>
              </div>
              <div className="flex justify-between items-baseline pt-2">
                <span className="kicker">Total</span>
                <span className="display text-4xl">£{subtotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
