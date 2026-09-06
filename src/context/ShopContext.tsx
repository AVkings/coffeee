import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { MenuItem } from "../data/menu";

export interface CartLine {
  item: MenuItem;
  qty: number;
}

export interface ToastMsg {
  id: number;
  message: string;
  tone: "success" | "info";
}

interface ShopContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (item: MenuItem) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  checkoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
  toasts: ToastMsg[];
  toast: (message: string, tone?: "success" | "info") => void;
  dismissToast: (id: number) => void;
}

const ShopContext = createContext<ShopContextValue | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMsg[]>([]);
  const toastId = useRef(0);

  const add = useCallback((item: MenuItem) => {
    setLines((prev) => {
      const found = prev.find((l) => l.item.id === item.id);
      if (found) {
        return prev.map((l) =>
          l.item.id === item.id ? { ...l, qty: l.qty + 1 } : l,
        );
      }
      return [...prev, { item, qty: 1 }];
    });
  }, []);

  const increment = useCallback((id: string) => {
    setLines((prev) =>
      prev.map((l) => (l.item.id === id ? { ...l, qty: l.qty + 1 } : l)),
    );
  }, []);

  const decrement = useCallback((id: string) => {
    setLines((prev) =>
      prev
        .map((l) => (l.item.id === id ? { ...l, qty: l.qty - 1 } : l))
        .filter((l) => l.qty > 0),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.item.id !== id));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const openCheckout = useCallback(() => {
    setCartOpen(false);
    setCheckoutOpen(true);
  }, []);

  const closeCheckout = useCallback(() => setCheckoutOpen(false), []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message: string, tone: "success" | "info" = "success") => {
      const id = ++toastId.current;
      setToasts((prev) => [...prev.slice(-2), { id, message, tone }]);
      window.setTimeout(() => dismissToast(id), 2800);
    },
    [dismissToast],
  );

  const value = useMemo<ShopContextValue>(() => {
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const subtotal = lines.reduce((s, l) => s + l.qty * l.item.price, 0);
    return {
      lines,
      count,
      subtotal,
      add,
      increment,
      decrement,
      remove,
      clear,
      cartOpen,
      setCartOpen,
      checkoutOpen,
      openCheckout,
      closeCheckout,
      toasts,
      toast,
      dismissToast,
    };
  }, [
    lines,
    cartOpen,
    checkoutOpen,
    toasts,
    add,
    increment,
    decrement,
    remove,
    clear,
    openCheckout,
    closeCheckout,
    toast,
    dismissToast,
  ]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}
