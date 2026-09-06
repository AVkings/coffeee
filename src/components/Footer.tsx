import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useShop } from "../context/ShopContext";
import { scrollToId } from "../lib/helpers";
import { AtIcon, BeanIcon, CameraIcon, CupIcon, MailIcon, PhoneIcon, PinIcon, ArrowRightIcon } from "./icons";

const HOURS = [
  ["Mon — Fri", "7:00 — 20:00"],
  ["Saturday", "8:00 — 21:00"],
  ["Sunday", "8:00 — 18:00"],
];

export default function Footer() {
  const { toast } = useShop();
  const [email, setEmail] = useState("");

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast("That email looks a little off — try again?", "info");
      return;
    }
    toast("Subscribed! (demo — no emails will actually be sent)");
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden bg-espresso pb-8 pt-16 text-cream">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(40rem_26rem_at_15%_0%,rgb(217_164_65/0.09),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          {/* brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold text-espresso">
                <CupIcon className="h-5 w-5" />
              </span>
              <span className="leading-none">
                <span className="block font-display text-xl font-semibold">Brew Haven</span>
                <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-[0.3em] text-gold">
                  Est. 2019 · Demo
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm font-light leading-relaxed text-cream/60">
              A fictional neighbourhood café built as a client-side demo —
              menu, cart, checkout and bookings all run in your browser.
            </p>
            <div className="mt-6 flex gap-2.5">
              {[
                { Icon: CameraIcon, label: "Instagram (demo)" },
                { Icon: AtIcon, label: "Mastodon (demo)" },
                { Icon: BeanIcon, label: "Beanbook (demo)" },
              ].map(({ Icon, label: l }) => (
                <button
                  key={l}
                  aria-label={l}
                  onClick={() => toast("Social links are decorative in this demo", "info")}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:text-gold"
                >
                  <Icon className="h-4.5 w-4.5" />
                </button>
              ))}
            </div>
          </div>

          {/* visit */}
          <div className="md:col-span-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold">Visit</p>
            <ul className="mt-5 space-y-3.5 text-sm font-medium text-cream/80">
              <li className="flex items-start gap-3">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold/80" />
                12 Roastery Lane,
                <br />
                Old Quarter
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon className="h-4 w-4 shrink-0 text-gold/80" />
                (555) 010-BREW
              </li>
              <li className="flex items-center gap-3">
                <MailIcon className="h-4 w-4 shrink-0 text-gold/80" />
                hello@brewhaven.demo
              </li>
            </ul>
          </div>

          {/* hours */}
          <div className="md:col-span-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold">Hours</p>
            <ul className="mt-5 space-y-3 text-sm">
              {HOURS.map(([d, h]) => (
                <li key={d} className="flex flex-col">
                  <span className="font-medium text-cream/80">{d}</span>
                  <span className="font-light text-cream/50">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* newsletter */}
          <div className="md:col-span-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold">
              The Grind — our letter
            </p>
            <p className="mt-5 text-sm font-light leading-relaxed text-cream/60">
              Roast schedules, new origins and pastry experiments. Once a
              month, no froth.
            </p>
            <form onSubmit={subscribe} className="mt-4 flex overflow-hidden rounded-full border border-cream/15 bg-cream/5 focus-within:border-gold/60">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@somewhere.com"
                inputMode="email"
                className="w-full min-w-0 bg-transparent px-4 py-3 text-sm font-medium text-cream placeholder:text-cream/35 outline-none"
              />
              <motion.button
                whileTap={{ scale: 0.9 }}
                type="submit"
                aria-label="Subscribe"
                className="m-1 flex h-9 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-espresso transition-colors hover:bg-caramel hover:text-foam"
              >
                <ArrowRightIcon className="h-4 w-4" />
              </motion.button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-cream/10 pt-6 text-xs font-light text-cream/45 sm:flex-row">
          <p>© 2026 Brew Haven — a fictional demo. No real payments, bookings or beans were harmed.</p>
          <p className="flex items-center gap-1.5">
            Built with <BeanIcon className="h-3.5 w-3.5 text-gold/70" /> React, Tailwind &amp; Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
