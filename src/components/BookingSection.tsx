import { useState, type ComponentType, type ReactNode, type SVGProps } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import QRCard from "./QRCard";
import Steps from "./Steps";
import { useShop } from "../context/ShopContext";
import { EASE, formatDate, formatClock, genId, todayISO } from "../lib/helpers";
import {
  ArmchairIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  BagIcon,
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  InfoIcon,
  MinusIcon,
  PhoneIcon,
  PinIcon,
  PlusIcon,
  SparkIcon,
} from "./icons";

type BookingType = "table" | "pickup" | "tasting";

interface BookingForm {
  type: BookingType | null;
  date: string;
  time: string;
  guests: number;
  name: string;
  phone: string;
  notes: string;
}

const INITIAL: BookingForm = {
  type: null,
  date: "",
  time: "",
  guests: 2,
  name: "",
  phone: "",
  notes: "",
};

const TYPES: {
  id: BookingType;
  label: string;
  desc: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}[] = [
  {
    id: "table",
    label: "Table",
    desc: "A cosy table in the main room or out on the terrace.",
    Icon: ArmchairIcon,
  },
  {
    id: "pickup",
    label: "Pickup",
    desc: "Order ahead, skip the queue — ready at your time.",
    Icon: BagIcon,
  },
  {
    id: "tasting",
    label: "Tasting",
    desc: "A 45-minute guided flight of three single origins.",
    Icon: SparkIcon,
  },
];

const SLOTS = Array.from({ length: 24 }, (_, i) => {
  const h = 8 + Math.floor(i / 2);
  const m = i % 2 ? "30" : "00";
  return `${String(h).padStart(2, "0")}:${m}`;
});

const stepVariants: Variants = {
  enter: (d: number) => ({ opacity: 0, x: d > 0 ? 44 : -44 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } },
  exit: (d: number) => ({ opacity: 0, x: d > 0 ? -44 : 44, transition: { duration: 0.24, ease: EASE } }),
};

const inputCls =
  "w-full rounded-xl border bg-paper px-4 py-3 text-sm font-medium text-espresso placeholder:text-cocoa/40 outline-none transition-all focus:border-caramel focus:ring-2 focus:ring-caramel/25";

export default function BookingSection() {
  const { toast } = useShop();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [form, setForm] = useState<BookingForm>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirming, setConfirming] = useState(false);
  const [result, setResult] = useState<{ id: string; createdAt: string } | null>(null);

  const set = <K extends keyof BookingForm>(key: K, value: BookingForm[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validate = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 0 && !form.type) e.type = "Pick a booking type to continue.";
    if (s === 1) {
      if (!form.date) e.date = "Choose a date.";
      if (!form.time) e.time = "Pick a time slot.";
    }
    if (s === 2) {
      if (form.name.trim().length < 2) e.name = "We need a name for the booking.";
      if (form.phone.replace(/\D/g, "").length < 7) e.phone = "Enter a valid phone number.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate(step)) return;
    setDir(1);
    setStep((s) => s + 1);
  };

  const back = () => {
    setDir(-1);
    setStep((s) => Math.max(0, s - 1));
  };

  const confirm = () => {
    setConfirming(true);
    window.setTimeout(() => {
      setResult({ id: genId("BH"), createdAt: new Date().toISOString() });
      setConfirming(false);
      setDir(1);
      setStep(4);
      toast("Booking confirmed — see you soon!");
    }, 1400);
  };

  const reset = () => {
    setForm(INITIAL);
    setErrors({});
    setResult(null);
    setDir(-1);
    setStep(0);
  };

  const typeLabel = TYPES.find((t) => t.id === form.type)?.label ?? "";

  const qrPayload = result
    ? JSON.stringify({
        bookingId: result.id,
        customerName: form.name,
        phone: form.phone,
        bookingType: form.type,
        date: form.date,
        time: form.time,
        guests: form.type === "pickup" ? null : form.guests,
        notes: form.notes || null,
        status: "CONFIRMED_DEMO",
        createdAt: result.createdAt,
      })
    : "";

  return (
    <section id="book" className="relative scroll-mt-24 overflow-hidden py-24 lg:py-28">
      <div className="coffee-ring -right-24 top-8 h-[22rem] w-[22rem]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        {/* intro */}
        <div className="lg:col-span-5">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-xs font-bold uppercase tracking-[0.28em] text-caramel"
          >
            Reservations
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
            className="mt-4 font-display text-4xl font-semibold tracking-tight text-espresso sm:text-5xl"
          >
            Book a table,
            <br />
            <em className="italic text-caramel">a pickup, a tasting.</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="mt-6 max-w-md text-base font-light leading-relaxed text-cocoa"
          >
            Four quick steps and you'll get a QR confirmation ticket. Show it
            at the counter — no account, no deposit, no fuss.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.22 }}
            className="mt-9 space-y-4"
          >
            {[
              { Icon: ClockIcon, text: "Every day · 7:00 — 20:00" },
              { Icon: PhoneIcon, text: "(555) 010-BREW — demo line" },
              { Icon: PinIcon, text: "12 Roastery Lane, Old Quarter" },
            ].map(({ Icon, text }) => (
              <li key={text} className="flex items-center gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-latte bg-foam text-caramel shadow-soft">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <span className="text-sm font-medium text-espresso">{text}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 rounded-2xl border border-dashed border-caramel/50 bg-gold/10 p-4"
          >
            <p className="flex items-start gap-2.5 text-xs font-medium leading-relaxed text-cocoa">
              <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-caramel" />
              This is a sample workflow — bookings are simulated in your
              browser and nothing is sent anywhere.
            </p>
          </motion.div>
        </div>

        {/* wizard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="relative lg:col-span-7"
        >
          <div className="relative overflow-hidden rounded-[32px] border border-latte bg-foam p-6 shadow-lift sm:p-9">
            {step < 4 && (
              <Steps
                steps={["Type", "Date & time", "Details", "Confirm"]}
                current={step}
                className="mb-9"
              />
            )}

            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={step}
                custom={dir}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {/* STEP 1 — type */}
                {step === 0 && (
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-espresso">
                      What are we saving for you?
                    </h3>
                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {TYPES.map((t) => {
                        const selected = form.type === t.id;
                        return (
                          <motion.button
                            key={t.id}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => set("type", t.id)}
                            className={`relative rounded-2xl border p-4 text-left transition-all duration-300 ${
                              selected
                                ? "border-caramel bg-gold/10 shadow-soft"
                                : "border-latte bg-paper hover:border-caramel/50"
                            }`}
                          >
                            <span
                              className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${
                                selected ? "bg-caramel text-foam" : "bg-espresso text-gold"
                              }`}
                            >
                              <t.Icon className="h-5 w-5" />
                            </span>
                            <span className="mt-3 block font-display text-lg font-semibold text-espresso">
                              {t.label}
                            </span>
                            <span className="mt-1 block text-xs font-light leading-relaxed text-cocoa/85">
                              {t.desc}
                            </span>
                            {selected && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-caramel text-foam"
                              >
                                <CheckIcon className="h-3.5 w-3.5" strokeWidth={2.6} />
                              </motion.span>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                    {errors.type && <FieldError msg={errors.type} />}
                  </div>
                )}

                {/* STEP 2 — date & time */}
                {step === 1 && (
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-espresso">
                      When should we expect you?
                    </h3>
                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className={label}>Date</label>
                        <div className="relative">
                          <input
                            type="date"
                            min={todayISO()}
                            value={form.date}
                            onChange={(e) => set("date", e.target.value)}
                            className={`${inputCls} ${errors.date ? "border-[#c0563b]" : "border-latte"}`}
                          />
                          <CalendarIcon className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cocoa/50" />
                        </div>
                        {errors.date && <FieldError msg={errors.date} />}
                      </div>
                      <div>
                        <label className={label}>Time</label>
                        <div className="relative">
                          <select
                            value={form.time}
                            onChange={(e) => set("time", e.target.value)}
                            className={`${inputCls} appearance-none pr-10 ${errors.time ? "border-[#c0563b]" : "border-latte"}`}
                          >
                            <option value="">Select a slot…</option>
                            {SLOTS.map((s) => (
                              <option key={s} value={s}>
                                {formatClock(s)}
                              </option>
                            ))}
                          </select>
                          <ClockIcon className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cocoa/50" />
                        </div>
                        {errors.time && <FieldError msg={errors.time} />}
                      </div>
                    </div>

                    {form.type !== "pickup" ? (
                      <div className="mt-6">
                        <label className={label}>Guests</label>
                        <div className="flex w-fit items-center rounded-full border border-latte bg-paper shadow-soft">
                          <StepperBtn
                            onClick={() => set("guests", Math.max(1, form.guests - 1))}
                            disabled={form.guests <= 1}
                          >
                            <MinusIcon className="h-4 w-4" />
                          </StepperBtn>
                          <motion.span
                            key={form.guests}
                            initial={{ y: 8, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="w-16 text-center text-base font-bold text-espresso"
                          >
                            {form.guests} {form.guests === 1 ? "guest" : "guests"}
                          </motion.span>
                          <StepperBtn
                            onClick={() => set("guests", Math.min(12, form.guests + 1))}
                            disabled={form.guests >= 12}
                          >
                            <PlusIcon className="h-4 w-4" />
                          </StepperBtn>
                        </div>
                      </div>
                    ) : (
                      <p className="mt-6 flex items-start gap-2.5 rounded-xl border border-dashed border-caramel/50 bg-gold/10 p-3.5 text-xs font-medium leading-relaxed text-cocoa">
                        <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-caramel" />
                        Pickup window is ±15 minutes around your chosen time.
                        We'll text you when it's on the counter.
                      </p>
                    )}
                  </div>
                )}

                {/* STEP 3 — details */}
                {step === 2 && (
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-espresso">
                      Who's the booking for?
                    </h3>
                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className={label}>Full name *</label>
                        <input
                          value={form.name}
                          onChange={(e) => set("name", e.target.value)}
                          placeholder="e.g. Jamie Latte"
                          className={`${inputCls} ${errors.name ? "border-[#c0563b]" : "border-latte"}`}
                        />
                        {errors.name && <FieldError msg={errors.name} />}
                      </div>
                      <div>
                        <label className={label}>Phone *</label>
                        <input
                          value={form.phone}
                          onChange={(e) => set("phone", e.target.value)}
                          placeholder="(555) 000-0000"
                          inputMode="tel"
                          className={`${inputCls} ${errors.phone ? "border-[#c0563b]" : "border-latte"}`}
                        />
                        {errors.phone && <FieldError msg={errors.phone} />}
                      </div>
                    </div>
                    <div className="mt-5">
                      <label className={label}>Special notes (optional)</label>
                      <textarea
                        value={form.notes}
                        onChange={(e) => set("notes", e.target.value)}
                        rows={3}
                        placeholder="Window seat, birthday candle, oat milk only…"
                        className={`${inputCls} resize-none border-latte`}
                      />
                    </div>
                  </div>
                )}

                {/* STEP 4 — confirm */}
                {step === 3 && (
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-espresso">
                      One last look.
                    </h3>
                    <dl className="mt-6 overflow-hidden rounded-2xl border border-latte bg-paper">
                      {[
                        ["Booking type", typeLabel],
                        ["Date", form.date ? formatDate(form.date) : "—"],
                        ["Time", form.time ? formatClock(form.time) : "—"],
                        form.type !== "pickup"
                          ? ["Guests", `${form.guests}`]
                          : ["Pickup", "Counter pickup"],
                        ["Name", form.name],
                        ["Phone", form.phone],
                        ...(form.notes ? [["Notes", form.notes] as [string, string]] : []),
                      ].map(([k, v], i, arr) => (
                        <div
                          key={k}
                          className={`flex items-baseline justify-between gap-6 px-5 py-3.5 ${
                            i < arr.length - 1 ? "border-b border-latte/70" : ""
                          }`}
                        >
                          <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-cocoa/55">
                            {k}
                          </dt>
                          <dd className="text-right text-sm font-semibold text-espresso">{v}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="mt-4 flex items-start gap-2 text-xs font-medium text-cocoa/70">
                      <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-caramel" />
                      Confirming generates a demo QR ticket instantly.
                    </p>
                  </div>
                )}

                {/* STEP 5 — QR */}
                {step === 4 && result && (
                  <div>
                    <SuccessCheck />
                    <h3 className="mt-5 text-center font-display text-3xl font-semibold text-espresso">
                      You're booked in!
                    </h3>
                    <p className="mt-2 text-center text-sm font-light text-cocoa">
                      Here's your QR ticket, {form.name.split(" ")[0]} — show it at the counter.
                    </p>
                    <div className="mt-7">
                      <QRCard
                        code={qrPayload}
                        filename={`brew-haven-booking-${result.id}.png`}
                        eyebrow="Booking ticket"
                        title={form.date ? formatDate(form.date) : "Your booking"}
                        status="CONFIRMED_DEMO"
                        notchClass="bg-foam"
                        meta={[
                          { label: "Booking ID", value: result.id },
                          { label: "Type", value: typeLabel },
                          { label: "Name", value: form.name },
                          { label: "Phone", value: form.phone },
                          { label: "Time", value: formatClock(form.time) },
                          {
                            label: form.type === "pickup" ? "Pickup" : "Guests",
                            value: form.type === "pickup" ? "Counter pickup" : `${form.guests}`,
                          },
                          ...(form.notes ? [{ label: "Notes", value: form.notes }] : []),
                        ]}
                        note="Demo booking — nothing was reserved for real."
                      />
                    </div>
                    <div className="mt-6 text-center">
                      <button
                        onClick={reset}
                        className="rounded-full border-[1.5px] border-espresso/25 px-6 py-3 text-sm font-semibold text-espresso transition-colors hover:border-espresso hover:bg-espresso hover:text-cream"
                      >
                        Make another booking
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* nav buttons */}
            {step < 4 && (
              <div className="mt-9 flex items-center justify-between gap-4">
                {step > 0 ? (
                  <button
                    onClick={back}
                    className="flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-cocoa transition-colors hover:text-espresso"
                  >
                    <ArrowLeftIcon className="h-4 w-4" /> Back
                  </button>
                ) : (
                  <span />
                )}
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={step === 3 ? confirm : next}
                  className="group flex items-center gap-2.5 rounded-full bg-espresso px-7 py-3.5 text-sm font-semibold text-cream shadow-soft transition-colors hover:bg-caramel"
                >
                  {step === 3 ? "Confirm booking" : "Continue"}
                  {step < 3 && (
                    <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  )}
                  {step === 3 && <CheckIcon className="h-4 w-4" strokeWidth={2.4} />}
                </motion.button>
              </div>
            )}

            {/* confirming overlay */}
            <AnimatePresence>
              {confirming && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 rounded-[32px] bg-foam/92 backdrop-blur-[2px]"
                >
                  <span className="h-12 w-12 animate-spin rounded-full border-[3px] border-latte border-t-caramel" />
                  <motion.p
                    key="reserving"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm font-semibold text-cocoa"
                  >
                    Reserving your spot…
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- small pieces ---------- */

function StepperBtn({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.82 }}
      onClick={onClick}
      disabled={disabled}
      className="flex h-11 w-11 items-center justify-center text-espresso transition-colors enabled:hover:bg-latte/50 disabled:opacity-30"
    >
      {children}
    </motion.button>
  );
}

export function SuccessCheck() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="mx-auto flex h-20 w-20 items-center justify-center"
    >
      <svg viewBox="0 0 52 52" className="h-20 w-20">
        <motion.circle
          cx="26"
          cy="26"
          r="23"
          fill="none"
          stroke="#b4762a"
          strokeWidth="2.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
        />
        <motion.path
          d="M15.5 27l7.5 7.5L37 19.5"
          fill="none"
          stroke="#b4762a"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 0.55, ease: EASE }}
        />
      </svg>
    </motion.div>
  );
}

const label =
  "mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-cocoa/65";

function FieldError({ msg }: { msg: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-1.5 text-xs font-semibold text-[#c0563b]"
    >
      {msg}
    </motion.p>
  );
}
