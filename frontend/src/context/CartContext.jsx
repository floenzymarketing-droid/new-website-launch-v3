import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);
const KEY = "floenzy_cart_v1";

const load = () => {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return { items: [], subscription: null };
};

export const CartProvider = ({ children }) => {
  const [state, setState] = useState(load);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {}
  }, [state]);

  const addItem = (item) => {
    setState((prev) => {
      const key = `${item.sku}::${item.colour || ""}`;
      const items = [...prev.items];
      const idx = items.findIndex(
        (i) => `${i.sku}::${i.colour || ""}` === key
      );
      if (idx >= 0) {
        items[idx] = { ...items[idx], qty: items[idx].qty + (item.qty || 1) };
      } else {
        items.push({ ...item, qty: item.qty || 1 });
      }
      return { ...prev, items };
    });
    setIsOpen(true);
  };

  const updateQty = (key, qty) =>
    setState((prev) => ({
      ...prev,
      items: prev.items
        .map((i) =>
          `${i.sku}::${i.colour || ""}` === key
            ? { ...i, qty: Math.max(1, qty) }
            : i
        ),
    }));

  const removeItem = (key) =>
    setState((prev) => ({
      ...prev,
      items: prev.items.filter(
        (i) => `${i.sku}::${i.colour || ""}` !== key
      ),
    }));

  const setSubscription = (sub) =>
    setState((prev) => ({ ...prev, subscription: sub }));

  const clear = () => setState({ items: [], subscription: null });

  const count = state.items.reduce((n, i) => n + i.qty, 0);
  const subtotal = state.items.reduce((s, i) => s + i.price * i.qty, 0);

  const value = useMemo(
    () => ({
      ...state,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      updateQty,
      removeItem,
      setSubscription,
      clear,
      count,
      subtotal,
    }),
    [state, isOpen, count, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
