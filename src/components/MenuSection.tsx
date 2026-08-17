import { useState } from "react";
import { motion } from "framer-motion";
import AddControl from "./AddControl";
import { CATEGORIES, MENU, type CategoryId } from "../data/menu";
import { EASE, fmt } from "../lib/helpers";

export default function MenuSection() {
  const [active, setActive] = useState<CategoryId | "all">("all");
  const items = active === "all" ? MENU : MENU.filter((m) => m.category === active);

  return (
    <section
      id="menu"
      className="relative scroll-mt-24 overflow-hidden border-y border-latte/70 bg-paper py-24 lg:py-28"
    >
      <div className="coffee-ring -right-28 top-16 h-[24rem] w-[24rem]" />
      <div className="coffee-ring -left-20 bottom-10 h-72 w-72 opacity-80" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-end gap-6 lg:grid-cols-2">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-xs font-bold uppercase tracking-[0.28em] text-caramel"
            >
              The menu
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
              className="mt-4 font-display text-4xl font-semibold tracking-tight text-espresso sm:text-5xl"
            >
              Poured, baked,
              <br />
              <em className="italic text-caramel">buttered.</em>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="max-w-md text-sm font-light leading-relaxed text-cocoa lg:ml-auto lg:text-right"
          >
            Everything below is sample demo data — prices, names and
            descriptions included. Add anything to your tray and check out
            with a QR pickup code.
          </motion.p>
        </div>

        {/* category tabs */}
        <div className="mt-10 flex flex-wrap gap-2.5">
          {CATEGORIES.map((c) => {
            const n = c.id === "all" ? MENU.length : MENU.filter((m) => m.category === c.id).length;
            const isActive = active === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`relative rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                  isActive ? "text-cream" : "border border-sand text-cocoa hover:border-espresso/40 hover:text-espresso"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="menu-tab-pill"
                    className="absolute inset-0 rounded-full bg-espresso shadow-soft"
                    transition={{ duration: 0.35, ease: EASE }}
                  />
                )}
                <span className="relative z-10">
                  {c.label}
                  <span className={`ml-1.5 text-xs font-medium ${isActive ? "text-gold" : "text-cocoa/55"}`}>
                    {n}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* items */}
        <motion.div key={active} className="mt-10 grid gap-5 md:grid-cols-2">
          {items.map((m, i) => (
            <motion.article
              key={m.id}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.05 }}
              className="group flex gap-4 rounded-[26px] border border-latte bg-foam p-4 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-caramel/50 hover:shadow-lift sm:gap-5"
            >
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-[20px] sm:h-32 sm:w-32">
                <img
                  src={m.image}
                  alt={m.name}
                  loading="lazy"
                  className="h-full w-full bg-latte object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                  draggable={false}
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col py-0.5 pr-1">
                <div className="flex items-baseline gap-2.5">
                  <h3 className="font-display text-lg font-semibold leading-snug text-espresso">
                    {m.name}
                  </h3>
                  <span className="mx-1 flex-1 border-b border-dotted border-sand" />
                  <span className="whitespace-nowrap text-sm font-bold text-caramel">
                    {fmt(m.price)}
                  </span>
                </div>
                <p className="mt-1.5 line-clamp-2 text-[13px] font-light leading-relaxed text-cocoa/85">
                  {m.description}
                </p>
                <div className="mt-auto flex items-end justify-between gap-3 pt-3">
                  <div className="flex flex-wrap gap-1.5">
                    {m.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-latte bg-cream px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-cocoa/75"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <AddControl item={m} />
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
