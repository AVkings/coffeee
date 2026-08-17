import { motion } from "framer-motion";
import { EASE } from "../lib/helpers";
import { BeanIcon } from "./icons";

const ROWS = [
  { label: "Origins in rotation", value: "Ethiopia · Colombia · Sumatra" },
  { label: "Roast profile", value: "Medium-dark, rested five days" },
  { label: "Milk bar", value: "Oat · almond · local whole" },
  { label: "Slow bar", value: "V60 & siphon, weekends only" },
  { label: "Open", value: "Every day, 7:00 — 20:00" },
];

export default function CraftSection() {
  return (
    <section id="craft" className="relative scroll-mt-24 overflow-hidden bg-espresso py-24 text-cream lg:py-32">
      {/* ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(44rem_30rem_at_85%_0%,rgb(217_164_65/0.12),transparent_60%),radial-gradient(36rem_28rem_at_0%_100%,rgb(180_118_42/0.1),transparent_55%)]" />
      <BeanIcon className="pointer-events-none absolute -left-10 top-10 h-44 w-44 rotate-12 text-cream/[0.04]" />
      <BeanIcon className="pointer-events-none absolute -right-8 bottom-6 h-56 w-56 -rotate-[24deg] text-cream/[0.04]" />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-xs font-bold uppercase tracking-[0.28em] text-gold"
          >
            Our craft
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
            className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl"
          >
            Roasted on Tuesdays.
            <br />
            <em className="italic text-gold">Poured every day.</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.16 }}
            className="mt-6 max-w-md text-base font-light leading-relaxed text-cream/70"
          >
            We buy small lots directly, roast them six kilos at a time, and
            let them rest before they ever meet the grinder. If a cup isn't
            right, it doesn't leave the bar. Simple as that.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.22 }}
            className="mt-6 font-display text-lg italic text-gold"
          >
            — Mara &amp; Jon, founders
          </motion.p>

          {/* stamp */}
          <motion.div
            initial={{ opacity: 0, rotate: -24, scale: 0.8 }}
            whileInView={{ opacity: 1, rotate: -10, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
            className="mt-10 hidden h-32 w-32 items-center justify-center sm:flex"
          >
            <span className="absolute h-32 w-32 animate-spin-slow rounded-full border-2 border-dashed border-gold/40" />
            <span className="px-4 text-center text-[10px] font-bold uppercase leading-relaxed tracking-[0.2em] text-gold/80">
              Small batch
              <br />· since 2019 ·
            </span>
          </motion.div>
        </div>

        <div className="lg:col-span-6">
          <dl>
            {ROWS.map((row, i) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, x: 34 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                className="flex items-baseline justify-between gap-8 border-b border-cream/12 py-5"
              >
                <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-cream/50">
                  {row.label}
                </dt>
                <dd className="text-right text-base font-medium text-cream">{row.value}</dd>
              </motion.div>
            ))}
          </dl>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.42 }}
            className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm font-light text-cream/60"
          >
            <span>Wi-Fi password — ask nicely.</span>
            <span>Dogs — always welcome.</span>
            <span>Laptops — fine until the queue forms.</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
