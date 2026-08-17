import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useShop } from "../context/ShopContext";
import { EASE, fmt, scrollToId, TAX_RATE } from "../lib/helpers";
import { ArrowRightIcon, BasketIcon, MinusIcon, PlusIcon, TrashIcon, XIcon } from "./icons";

export default function CartDrawer() {
  const {
    lines,
    count,
    subtotal,
    cartOpen,
    setCartOpen,
    increment,
    decrement,
    remove,
    clear,
    openCheckout,
    toast,
  } = useShop();

  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCartOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [cartOpen, setCartOpen]);

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[90] bg-espresso/60"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: EASE }}
            className="fixed right-0 top-0 z-[95] flex h-full w-full max-w-md flex-col bg-foam shadow-lift"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-latte px-6 py-5">
              <h2 className="flex items-center gap-3 font-display text-2xl font-semibold text-espresso">
                Your tray
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.4 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 18 }}
                    className="rounded-full bg-gold px-2.5 py-0.5 text-xs font-bold text-espresso"
                  >
                    {count} {count === 1 ? "item" : "items"}
                  </motion.span>
                )}
              </h2>
              <div className="flex items-center gap-2">
                {lines.length > 0 && (
                  <button
                    onClick={() => {
                      clear();
                      toast("Tray cleared", "info");
                    }}
                    className="flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold text-cocoa transition-colors hover:bg-latte/50 hover:text-espresso"
                  >
                    <TrashIcon className="h-3.5 w-3.5" /> Clear
                  </button>
                )}
                <button
                  onClick={() => setCartOpen(false)}
                  aria-label="Close cart"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-latte text-espresso transition-colors hover:bg-latte/50"
                >
                  <XIcon className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>

            {/* items */}
            <div className="thin-scroll flex-1 overflow-y-auto px-6 py-5">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <EmptyCup />
                  <p className="mt-5 font-display text-xl font-semibold text-espresso">
                    Your tray is empty
                  </p>
                  <p className="mt-2 max-w-[16rem] text-sm font-light text-cocoa/80">
                    The espresso machine is idling. Go pick something lovely.
                  </p>
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      window.setTimeout(() => scrollToId("menu"), 250);
                    }}
                    className="mt-6 flex items-center gap-2 rounded-full bg-espresso px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-caramel"
                  >
                    Browse the menu <ArrowRightIcon className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  <AnimatePresence initial={false}>
                    {lines.map((l) => (
                      <motion.li
                        key={l.item.id}
                        layout
                        initial={{ opacity: 0, x: 44 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 60, transition: { duration: 0.2 } }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="flex gap-3.5 rounded-2xl border border-latte bg-paper p-3"
                      >
                        <img
                          src={l.item.image}
                          alt={l.item.name}
                          className="h-20 w-20 shrink-0 rounded-xl bg-latte object-cover"
                          draggable={false}
                        />
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="truncate font-display text-base font-semibold text-espresso">
                                {l.item.name}
                              </p>
                              <p className="mt-0.5 text-xs font-medium text-cocoa/70">
                                {fmt(l.item.price)} each
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                remove(l.item.id);
                                toast(`${l.item.name} removed`, "info");
                              }}
                              aria-label={`Remove ${l.item.name}`}
                              className="rounded-full p-1.5 text-cocoa/60 transition-colors hover:bg-latte/60 hover:text-[#c0563b]"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="mt-auto flex items-center justify-between pt-2">
                            <div className="flex h-8 items-center rounded-full border border-latte bg-foam">
                              <button
                                onClick={() => decrement(l.item.id)}
                                aria-label="Decrease quantity"
                                className="flex h-8 w-8 items-center justify-center rounded-l-full text-espresso transition-colors hover:bg-latte/50"
                              >
                                <MinusIcon className="h-3.5 w-3.5" />
                              </button>
                              <motion.span
                                key={l.qty}
                                initial={{ y: 6, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="w-7 text-center text-sm font-bold text-espresso"
                              >
                                {l.qty}
                              </motion.span>
                              <button
                                onClick={() => increment(l.item.id)}
                                aria-label="Increase quantity"
                                className="flex h-8 w-8 items-center justify-center rounded-r-full text-espresso transition-colors hover:bg-latte/50"
                              >
                                <PlusIcon className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <span className="text-sm font-bold text-espresso">
                              {fmt(l.item.price * l.qty)}
                            </span>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* footer */}
            {lines.length > 0 && (
              <div className="border-t border-latte bg-paper px-6 py-5">
                <div className="space-y-2 text-sm font-medium text-cocoa">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-espresso">{fmt(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (8%)</span>
                    <span className="font-semibold text-espresso">{fmt(tax)}</span>
                  </div>
                  <p className="text-[11px] font-light text-cocoa/65">
                    A $2.50 delivery fee is added at checkout if you choose delivery.
                  </p>
                </div>
                <div className="mt-4 flex items-baseline justify-between border-t border-dashed border-sand pt-4">
                  <span className="text-sm font-bold uppercase tracking-[0.14em] text-cocoa">
                    Total
                  </span>
                  <span className="font-display text-3xl font-semibold text-espresso">
                    {fmt(total)}
                  </span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={openCheckout}
                  className="group mt-5 flex w-full items-center justify-center gap-2.5 rounded-full bg-espresso py-4 text-sm font-semibold text-cream shadow-soft transition-colors hover:bg-caramel"
                >
                  <BasketIcon className="h-4.5 w-4.5" />
                  Proceed to checkout
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function EmptyCup() {
  return (
    <div className="relative">
      <svg viewBox="0 0 120 100" className="h-28 w-32 text-sand">
        <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
          <path d="M25 42h52v20a20 20 0 0 1-20 20H45a20 20 0 0 1-20-20V42Z" />
          <path d="M77 47h8a10 10 0 0 1 0 20h-8" />
          <path d="M20 92h62" />
        </g>
        <g stroke="#b4762a" strokeWidth="4" strokeLinecap="round" fill="none">
          <path className="steam-path" d="M40 30c0-6 5-6 5-12" />
          <path className="steam-path" style={{ animationDelay: "0.7s" }} d="M52 30c0-6 5-6 5-12" />
          <path className="steam-path" style={{ animationDelay: "1.3s" }} d="M64 30c0-6 5-6 5-12" />
        </g>
      </svg>
    </div>
  );
}
