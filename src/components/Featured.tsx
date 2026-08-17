import { motion, type Variants } from "framer-motion";
import AddControl from "./AddControl";
import { CATEGORY_LABEL, FEATURED } from "../data/menu";
import { EASE, fmt, scrollToId } from "../lib/helpers";
import { ArrowRightIcon } from "./icons";

const card: Variants = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function Featured() {
  return (
    <section id="favourites" className="relative scroll-mt-24 py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-end gap-6 lg:grid-cols-2">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-xs font-bold uppercase tracking-[0.28em] text-caramel"
            >
              House favourites
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
              className="mt-4 font-display text-4xl font-semibold tracking-tight text-espresso sm:text-5xl"
            >
              What the regulars
              <br className="hidden sm:block" /> order{" "}
              <em className="italic text-caramel">before sitting down.</em>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="flex items-end justify-between gap-6 lg:justify-end lg:gap-10"
          >
            <p className="max-w-xs text-sm font-light leading-relaxed text-cocoa">
              Four cups and bakes that never leave the board. Tried, tested,
              and quietly guarded recipes.
            </p>
            <button
              onClick={() => scrollToId("menu")}
              className="group flex shrink-0 items-center gap-2 text-sm font-semibold text-espresso"
            >
              Full menu
              <ArrowRightIcon className="h-4 w-4 rotate-90 text-caramel transition-transform duration-300 group-hover:translate-y-1" />
            </button>
          </motion.div>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED.map((m, i) => (
            <motion.article
              key={m.id}
              variants={card}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.09 }}
              whileHover={{ y: -9 }}
              className={`group rounded-[26px] border border-latte bg-foam p-4 shadow-card transition-shadow duration-300 hover:shadow-lift ${
                i % 2 === 1 ? "lg:mt-10" : ""
              }`}
            >
              <div className="relative overflow-hidden rounded-[20px]">
                <img
                  src={m.image}
                  alt={m.name}
                  loading="lazy"
                  className="aspect-square w-full bg-latte object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  draggable={false}
                />
                <span className="absolute right-3 top-3 rounded-full bg-espresso/85 px-2.5 py-1 text-xs font-bold text-cream">
                  {fmt(m.price)}
                </span>
                <span className="absolute bottom-3 left-3 rounded-full bg-foam/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-caramel">
                  {CATEGORY_LABEL[m.category]}
                </span>
              </div>
              <div className="px-1.5 pb-1 pt-4">
                <h3 className="font-display text-xl font-semibold text-espresso">{m.name}</h3>
                {m.quote && (
                  <p className="mt-1.5 text-xs italic leading-relaxed text-cocoa/75">{m.quote}</p>
                )}
                <div className="mt-4">
                  <AddControl item={m} wide />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
