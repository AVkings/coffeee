import type { CSSProperties } from "react";
import { motion, type Variants } from "framer-motion";
import { IMAGES } from "../data/menu";
import { EASE, scrollToId } from "../lib/helpers";
import { ArrowRightIcon, BeanIcon, CupIcon, StarIcon } from "./icons";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24">
      {/* ambient rings */}
      <div className="coffee-ring -left-24 -top-24 h-96 w-96" />
      <div className="coffee-ring -bottom-32 right-[38%] h-[26rem] w-[26rem] opacity-70" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
        {/* copy */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="lg:col-span-6"
        >
          <motion.p
            variants={item}
            className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.28em] text-caramel"
          >
            <CupIcon className="h-4 w-4" />
            Est. 2019 · Small-batch roasters
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-[2.85rem] font-semibold leading-[1.02] tracking-tight text-espresso sm:text-6xl lg:text-[4.3rem]"
          >
            Fresh coffee,
            <br />
            made with
            <br />
            <span className="relative inline-block italic text-caramel">
              love.
              <svg
                viewBox="0 0 130 14"
                className="absolute -bottom-2 left-0 w-full"
                fill="none"
                aria-hidden
              >
                <motion.path
                  d="M4 10C34 4 70 3 126 7"
                  stroke="#d9a441"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, delay: 1.15, ease: EASE }}
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-7 max-w-md text-lg font-light leading-relaxed text-cocoa"
          >
            Slow-roasted beans, hand-poured cups, and pastries that leave the
            oven before the sun is properly up. Pull up a chair — the kettle's
            already on.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollToId("menu")}
              className="group flex items-center gap-2.5 rounded-full bg-espresso px-7 py-3.5 text-sm font-semibold text-cream shadow-lift transition-colors hover:bg-caramel"
            >
              View Menu
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollToId("book")}
              className="rounded-full border-[1.5px] border-espresso/30 px-7 py-3.5 text-sm font-semibold text-espresso transition-colors hover:border-espresso hover:bg-espresso hover:text-cream"
            >
              Book a Table
            </motion.button>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 flex flex-wrap items-center gap-x-9 gap-y-4 border-t border-espresso/10 pt-7"
          >
            <div>
              <p className="flex items-center gap-1.5 font-display text-2xl font-semibold text-espresso">
                4.9 <StarIcon className="h-4 w-4 text-gold" />
              </p>
              <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.14em] text-cocoa/70">
                2.1k neighbour reviews
              </p>
            </div>
            <div className="hidden h-10 w-px bg-espresso/10 sm:block" />
            <div>
              <p className="font-display text-2xl font-semibold text-espresso">12</p>
              <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.14em] text-cocoa/70">
                Origins in rotation
              </p>
            </div>
            <div className="hidden h-10 w-px bg-espresso/10 sm:block" />
            <div>
              <p className="font-display text-2xl font-semibold text-espresso">7 AM</p>
              <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.14em] text-cocoa/70">
                Doors open, daily
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* visual */}
        <div className="relative lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, scale: 1.08, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.25 }}
            className="relative mx-auto max-w-md lg:ml-auto"
          >
            <div className="overflow-hidden rounded-b-[44px] rounded-t-full border-[10px] border-foam bg-latte shadow-lift">
              <motion.img
                src={IMAGES.hero}
                alt="A hand-poured cappuccino with rosetta latte art at Brew Haven"
                className="aspect-[4/5] w-full rounded-b-[34px] rounded-t-full object-cover"
                initial={{ scale: 1.12 }}
                animate={{ scale: 1 }}
                transition={{ duration: 7, ease: "linear" }}
                draggable={false}
              />
            </div>

            {/* rotating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, type: "spring", stiffness: 200, damping: 16 }}
              className="absolute -bottom-7 -left-4 hidden h-28 w-28 sm:block lg:-left-10"
            >
              <svg viewBox="0 0 100 100" className="h-full w-full animate-spin-slow text-espresso">
                <defs>
                  <path id="badge-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
                </defs>
                <text fontSize="9" fontWeight="700" letterSpacing="2.6" fill="currentColor">
                  <textPath href="#badge-circle">
                    FRESHLY ROASTED · SMALL BATCH · SINCE 2019 ·
                  </textPath>
                </text>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-espresso shadow-soft">
                  <CupIcon className="h-6 w-6" />
                </span>
              </span>
            </motion.div>

            {/* floating ticket */}
            <motion.div
              initial={{ opacity: 0, x: 30, rotate: 10 }}
              animate={{ opacity: 1, x: 0, rotate: 5 }}
              transition={{ delay: 1.05, duration: 0.7, ease: EASE }}
              className="absolute -right-2 top-14 sm:-right-6"
            >
              <div
                className="animate-floaty rounded-2xl border border-latte bg-foam px-4 py-3 shadow-lift"
                style={{ "--tilt": "0deg" } as CSSProperties}
              >
                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-caramel">
                  Today's pour
                </p>
                <p className="mt-1 font-display text-lg font-semibold leading-none text-espresso">
                  Honey Cold Brew
                </p>
                <p className="mt-1 text-xs font-medium text-cocoa/75">$4.90 · 18-hr steep</p>
              </div>
            </motion.div>

            {/* floating beans */}
            <BeanIcon
              className="animate-floaty absolute -left-8 top-1/4 h-7 w-7 text-caramel/45"
              style={{ animationDelay: "0.8s" }}
            />
            <BeanIcon
              className="animate-floaty absolute -right-5 bottom-24 h-5 w-5 text-cocoa/35"
              style={{ animationDelay: "1.6s" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
