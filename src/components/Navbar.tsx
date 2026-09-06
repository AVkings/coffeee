import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useShop } from "../context/ShopContext";
import { EASE, scrollToId } from "../lib/helpers";
import { BasketIcon, CupIcon, XIcon } from "./icons";

const LINKS = [
  { id: "favourites", label: "Favourites" },
  { id: "menu", label: "Menu" },
  { id: "craft", label: "Our Craft" },
];

export default function Navbar() {
  const { count, setCartOpen } = useShop();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setMobileOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[80] transition-all duration-500 ${
        scrolled
          ? "border-b border-latte/80 bg-cream/95 shadow-soft backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center gap-2.5"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-espresso text-gold shadow-soft transition-transform duration-300 group-hover:-rotate-6">
            <CupIcon className="h-5 w-5" />
          </span>
          <span className="text-left leading-none">
            <span className="block font-display text-xl font-semibold tracking-tight text-espresso">
              Brew Haven
            </span>
            <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-[0.3em] text-caramel">
              Est. 2019 · Demo
            </span>
          </span>
        </button>

        {/* desktop links */}
        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="group relative py-2 text-sm font-semibold text-cocoa transition-colors hover:text-espresso"
            >
              {l.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-[2px] origin-left scale-x-0 rounded-full bg-caramel transition-transform duration-300 group-hover:scale-x-100" />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => go("book")}
            className="hidden rounded-full border-[1.5px] border-espresso px-5 py-2.5 text-sm font-semibold text-espresso transition-all duration-300 hover:bg-espresso hover:text-cream sm:block"
          >
            Book a Table
          </button>

          {/* cart */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setCartOpen(true)}
            aria-label="Open cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-espresso text-cream shadow-soft transition-colors hover:bg-caramel"
          >
            <BasketIcon className="h-5 w-5" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.3, y: -4 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 520, damping: 18 }}
                  className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[11px] font-bold text-espresso shadow-soft"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-espresso/20 text-espresso md:hidden"
          >
            {mobileOpen ? (
              <XIcon className="h-5 w-5" />
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M4 7h16M4 12h10M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden border-b border-latte bg-cream/98 md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className="rounded-xl px-4 py-3 text-left text-sm font-semibold text-espresso transition-colors hover:bg-latte/50"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => go("book")}
                className="mt-2 rounded-xl bg-espresso px-4 py-3 text-left text-sm font-semibold text-cream"
              >
                Book a Table
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
