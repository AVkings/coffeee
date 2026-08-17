import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useShop } from "../context/ShopContext";
import type { MenuItem } from "../data/menu";
import { EASE } from "../lib/helpers";
import { CheckIcon, MinusIcon, PlusIcon } from "./icons";

interface AddControlProps {
  item: MenuItem;
  wide?: boolean;
}

export default function AddControl({ item, wide = false }: AddControlProps) {
  const { lines, add, increment, decrement, toast } = useShop();
  const qty = lines.find((l) => l.item.id === item.id)?.qty ?? 0;
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    add(item);
    setJustAdded(true);
    toast(`${item.name} added to your tray`);
    window.setTimeout(() => setJustAdded(false), 850);
  };

  return (
    <div className="flex h-10 items-center justify-end">
      <AnimatePresence mode="wait" initial={false}>
        {justAdded ? (
          <motion.span
            key="added"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 480, damping: 22 }}
            className="flex h-10 items-center gap-1.5 rounded-full bg-caramel px-4 text-sm font-semibold text-foam"
          >
            <CheckIcon className="h-4 w-4" strokeWidth={2.6} /> Added
          </motion.span>
        ) : qty > 0 ? (
          <motion.div
            key="stepper"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="flex h-10 items-center rounded-full border border-espresso/15 bg-paper shadow-soft"
          >
            <motion.button
              whileTap={{ scale: 0.82 }}
              onClick={() => decrement(item.id)}
              aria-label={`Decrease ${item.name}`}
              className="flex h-10 w-9 items-center justify-center rounded-l-full text-espresso transition-colors hover:bg-latte/50"
            >
              <MinusIcon className="h-4 w-4" />
            </motion.button>
            <motion.span
              key={qty}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="w-7 text-center text-sm font-bold text-espresso"
            >
              {qty}
            </motion.span>
            <motion.button
              whileTap={{ scale: 0.82 }}
              onClick={() => increment(item.id)}
              aria-label={`Increase ${item.name}`}
              className="flex h-10 w-9 items-center justify-center rounded-r-full text-espresso transition-colors hover:bg-latte/50"
            >
              <PlusIcon className="h-4 w-4" />
            </motion.button>
          </motion.div>
        ) : (
          <motion.button
            key="add"
            whileTap={{ scale: 0.92 }}
            onClick={handleAdd}
            className={`group flex h-10 items-center justify-center gap-1.5 rounded-full bg-espresso text-sm font-semibold text-cream shadow-soft transition-colors hover:bg-caramel ${
              wide ? "w-full" : "px-5"
            }`}
          >
            <PlusIcon className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" strokeWidth={2.2} />
            Add
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
