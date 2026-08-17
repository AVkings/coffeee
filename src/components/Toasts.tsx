import { AnimatePresence, motion } from "framer-motion";
import { useShop } from "../context/ShopContext";
import { EASE } from "../lib/helpers";
import { CheckIcon, InfoIcon } from "./icons";

export default function Toasts() {
  const { toasts, dismissToast } = useShop();

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[120] flex w-[min(22rem,calc(100vw-2.5rem))] flex-col gap-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.button
            key={t.id}
            layout
            initial={{ opacity: 0, y: 22, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.94 }}
            transition={{ duration: 0.35, ease: EASE }}
            onClick={() => dismissToast(t.id)}
            className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-latte bg-foam px-4 py-3 text-left shadow-lift"
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                t.tone === "success" ? "bg-caramel text-foam" : "bg-bean text-gold"
              }`}
            >
              {t.tone === "success" ? (
                <CheckIcon className="h-4 w-4" strokeWidth={2.4} />
              ) : (
                <InfoIcon className="h-4 w-4" />
              )}
            </span>
            <span className="text-sm font-medium leading-snug text-espresso">
              {t.message}
            </span>
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}
