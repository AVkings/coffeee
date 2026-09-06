import { useEffect, useState, type ComponentType, type SVGProps } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import QRCard from "./QRCard";
import Steps from "./Steps";
import { SuccessCheck } from "./BookingSection";
import { useShop } from "../context/ShopContext";
import { DELIVERY_FEE, EASE, fmt, genId, TAX_RATE } from "../lib/helpers";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BagIcon,
  CardIcon,
  CashIcon,
  CheckIcon,
  CupIcon,
  InfoIcon,
  PinIcon,
  WalletIcon,
  XIcon,
} from "./icons";

type OrderType = "pickup" | "delivery" | "dine-in";
type MethodId = "card" | "wallet" | "cash";

interface OrderSnapshot {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  orderType: OrderType;
  method: MethodId;
  items: { name: string; quantity: number; price: number }[];
  subtotal: number;
  tax: number;
  fee: number;
  total: number;
  qr: string;
}

const ORDER_TYPES: {
  id: OrderType;
  label: string;
  desc: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}[] = [
  { id: "pickup", label: "Pickup", desc: "Ready at the counter in ~12 min", Icon: BagIcon },
  { id: "delivery", label: "Delivery", desc: "Sample courier · +$2.50", Icon: PinIcon },
  { id: "dine-in", label: "Dine-in", desc: "We'll bring it to your table", Icon: CupIcon },
];

const METHODS: {
  id: MethodId;
  label: string;
  desc: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}[] = [
  { id: "card", label: "Card", desc: "Demo card — nothing is charged", Icon: CardIcon },
  { id: "wallet", label: "QR / Wallet", desc: "Scan-to-pay simulation", Icon: WalletIcon },
  { id: "cash", label: "Cash at counter", desc: "Pay when you arrive", Icon: CashIcon },
];

const PROCESS_MSGS = [
  "Contacting demo bank…",
  "Approving sample payment…",
  "Inking your QR ticket…",
];

const stepVariants: Variants = {
  enter: (d: number) => ({ opacity: 0, x: d > 0 ? 44 : -44 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.38, ease: EASE } },
  exit: (d: number) => ({ opacity: 0, x: d > 0 ? -44 : 44, transition: { duration: 0.22, ease: EASE } }),
};

const inputCls =
  "w-full rounded-xl border bg-paper px-4 py-3 text-sm font-medium text-espresso placeholder:text-cocoa/40 outline-none transition-all focus:border-caramel focus:ring-2 focus:ring-caramel/25";

const r2 = (n: number) => Math.round(n * 100) / 100;

export default function CheckoutModal() {
  const { lines, subtotal, checkoutOpen, closeCheckout, clear, toast } = useShop();

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [orderType, setOrderType] = useState<OrderType>("pickup");
  const [details, setDetails] = useState({ name: "", phone: "", email: "", notes: "" });
  const [method, setMethod] = useState<MethodId>("card");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);
  const [msgIdx, setMsgIdx] = useState(0);
  const [order, setOrder] = useState<OrderSnapshot | null>(null);

  const fee = orderType === "delivery" ? DELIVERY_FEE : 0;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + fee;

  // reset each time the modal opens
  useEffect(() => {
    if (checkoutOpen) {
      setStep(0);
      setDir(1);
      setOrderType("pickup");
      setDetails({ name: "", phone: "", email: "", notes: "" });
      setMethod("card");
      setErrors({});
      setProcessing(false);
      setOrder(null);
    }
  }, [checkoutOpen]);

  useEffect(() => {
    if (!checkoutOpen || processing) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCheckout();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [checkoutOpen, processing, closeCheckout]);

  // fake payment run
  useEffect(() => {
    if (!processing) return;
    const iv = window.setInterval(
      () => setMsgIdx((i) => (i + 1) % PROCESS_MSGS.length),
      650,
    );
    const to = window.setTimeout(() => {
      const id = genId("BH");
      const createdAt = new Date().toISOString();
      const items = lines.map((l) => ({
        name: l.item.name,
        quantity: l.qty,
        price: l.item.price,
      }));
      const snap: OrderSnapshot = {
        id,
        createdAt,
        name: details.name,
        phone: details.phone,
        orderType,
        method,
        items,
        subtotal: r2(subtotal),
        tax: r2(tax),
        fee: r2(fee),
        total: r2(total),
        qr: JSON.stringify({
          orderId: id,
          customerName: details.name,
          phone: details.phone,
          orderType,
          items,
          subtotal: r2(subtotal),
          tax: r2(tax),
          ...(fee > 0 ? { deliveryFee: r2(fee) } : {}),
          total: r2(total),
          status: "PAID_DEMO",
          createdAt,
        }),
      };
      setOrder(snap);
      setProcessing(false);
      setDir(1);
      setStep(3);
    }, 1900);
    return () => {
      window.clearInterval(iv);
      window.clearTimeout(to);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processing]);

  const setDetail = (key: keyof typeof details, value: string) => {
    setDetails((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const next = () => {
    if (step === 1) {
      const e: Record<string, string> = {};
      if (details.name.trim().length < 2) e.name = "We need a name for the order.";
      if (details.phone.replace(/\D/g, "").length < 7) e.phone = "Enter a valid phone number.";
      setErrors(e);
      if (Object.keys(e).length > 0) return;
    }
    setDir(1);
    setStep((s) => s + 1);
  };

  const back = () => {
    setDir(-1);
    setStep((s) => Math.max(0, s - 1));
  };

  const pay = () => setProcessing(true);

  const finish = () => {
    clear();
    closeCheckout();
    toast("Order placed — your QR ticket is ready!");
  };

  const typeLabel = (t: OrderType) =>
    ORDER_TYPES.find((o) => o.id === t)?.label ?? t;

  return (
    <AnimatePresence>
      {checkoutOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !processing && closeCheckout()}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-espresso/70 p-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 44, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97, transition: { duration: 0.25 } }}
            transition={{ duration: 0.45, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="thin-scroll relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[32px] border border-latte bg-foam shadow-lift"
          >
            {/* header */}
            <div className="sticky top-0 z-10 border-b border-latte bg-foam/95 px-6 py-5 backdrop-blur-sm sm:px-8">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl font-semibold text-espresso">
                  {step === 3 ? "Order confirmed" : "Checkout"}
                </h2>
                {!processing && (
                  <button
                    onClick={closeCheckout}
                    aria-label="Close checkout"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-latte text-espresso transition-colors hover:bg-latte/50"
                  >
                    <XIcon className="h-4.5 w-4.5" />
                  </button>
                )}
              </div>
              {step < 3 && (
                <Steps steps={["Order type", "Details", "Payment"]} current={step} className="mt-5" />
              )}
            </div>

            <div className="relative px-6 py-7 sm:px-8">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={step}
                  custom={dir}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  {/* STEP 1 — order type */}
                  {step === 0 && (
                    <div>
                      <h3 className="font-display text-xl font-semibold text-espresso">
                        How would you like your order?
                      </h3>
                      {lines.length === 0 ? (
                        <p className="mt-6 rounded-xl border border-dashed border-caramel/50 bg-gold/10 p-4 text-sm font-medium text-cocoa">
                          Your tray is empty — add something from the menu first.
                        </p>
                      ) : (
                        <div className="mt-6 grid gap-3 sm:grid-cols-3">
                          {ORDER_TYPES.map((t) => {
                            const selected = orderType === t.id;
                            return (
                              <motion.button
                                key={t.id}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setOrderType(t.id)}
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
                      )}
                    </div>
                  )}

                  {/* STEP 2 — details */}
                  {step === 1 && (
                    <div>
                      <h3 className="font-display text-xl font-semibold text-espresso">
                        A few details, please.
                      </h3>
                      <div className="mt-6 grid gap-5 sm:grid-cols-2">
                        <div>
                          <label className={label}>Full name *</label>
                          <input
                            value={details.name}
                            onChange={(e) => setDetail("name", e.target.value)}
                            placeholder="e.g. Jamie Latte"
                            className={`${inputCls} ${errors.name ? "border-[#c0563b]" : "border-latte"}`}
                          />
                          {errors.name && <FieldError msg={errors.name} />}
                        </div>
                        <div>
                          <label className={label}>Phone *</label>
                          <input
                            value={details.phone}
                            onChange={(e) => setDetail("phone", e.target.value)}
                            placeholder="(555) 000-0000"
                            inputMode="tel"
                            className={`${inputCls} ${errors.phone ? "border-[#c0563b]" : "border-latte"}`}
                          />
                          {errors.phone && <FieldError msg={errors.phone} />}
                        </div>
                      </div>
                      <div className="mt-5">
                        <label className={label}>Email (optional)</label>
                        <input
                          value={details.email}
                          onChange={(e) => setDetail("email", e.target.value)}
                          placeholder="you@somewhere.com"
                          inputMode="email"
                          className={`${inputCls} border-latte`}
                        />
                      </div>
                      <div className="mt-5">
                        <label className={label}>Notes for the baristas (optional)</label>
                        <textarea
                          value={details.notes}
                          onChange={(e) => setDetail("notes", e.target.value)}
                          rows={2}
                          placeholder="Extra hot, no foam, ring the bell twice…"
                          className={`${inputCls} resize-none border-latte`}
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 3 — payment */}
                  {step === 2 && (
                    <div>
                      <h3 className="font-display text-xl font-semibold text-espresso">
                        Almost there — how are we settling up?
                      </h3>

                      <div className="mt-6 grid gap-5 lg:grid-cols-2">
                        {/* summary */}
                        <div className="rounded-2xl border border-latte bg-paper p-5">
                          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cocoa/60">
                            Order summary
                          </p>
                          <ul className="mt-3 space-y-2.5">
                            {lines.map((l) => (
                              <li
                                key={l.item.id}
                                className="flex items-baseline justify-between gap-3 text-sm"
                              >
                                <span className="font-medium text-espresso">
                                  <span className="mr-1.5 inline-block min-w-6 rounded-md bg-latte/70 px-1.5 py-0.5 text-center text-[11px] font-bold text-cocoa">
                                    {l.qty}×
                                  </span>
                                  {l.item.name}
                                </span>
                                <span className="whitespace-nowrap font-semibold text-cocoa">
                                  {fmt(l.item.price * l.qty)}
                                </span>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4 space-y-1.5 border-t border-dashed border-sand pt-3.5 text-sm font-medium text-cocoa">
                            <div className="flex justify-between">
                              <span>Subtotal</span>
                              <span className="font-semibold text-espresso">{fmt(subtotal)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Tax (8%)</span>
                              <span className="font-semibold text-espresso">{fmt(tax)}</span>
                            </div>
                            {fee > 0 && (
                              <div className="flex justify-between">
                                <span>Delivery fee</span>
                                <span className="font-semibold text-espresso">{fmt(fee)}</span>
                              </div>
                            )}
                            <div className="flex items-baseline justify-between pt-2">
                              <span className="text-xs font-bold uppercase tracking-[0.14em]">Total</span>
                              <span className="font-display text-2xl font-semibold text-espresso">
                                {fmt(total)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* methods */}
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cocoa/60">
                            Payment method
                          </p>
                          <div className="mt-3 space-y-2.5">
                            {METHODS.map((m) => {
                              const selected = method === m.id;
                              return (
                                <motion.button
                                  key={m.id}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => setMethod(m.id)}
                                  className={`flex w-full items-center gap-3.5 rounded-2xl border p-3.5 text-left transition-all duration-300 ${
                                    selected
                                      ? "border-caramel bg-gold/10 shadow-soft"
                                      : "border-latte bg-paper hover:border-caramel/50"
                                  }`}
                                >
                                  <span
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                                      selected ? "bg-caramel text-foam" : "bg-espresso text-gold"
                                    }`}
                                  >
                                    <m.Icon className="h-4.5 w-4.5" />
                                  </span>
                                  <span className="min-w-0 flex-1">
                                    <span className="block text-sm font-bold text-espresso">{m.label}</span>
                                    <span className="block text-xs font-light text-cocoa/80">{m.desc}</span>
                                  </span>
                                  <span
                                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                                      selected ? "border-caramel" : "border-sand"
                                    }`}
                                  >
                                    {selected && (
                                      <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="h-2.5 w-2.5 rounded-full bg-caramel"
                                      />
                                    )}
                                  </span>
                                </motion.button>
                              );
                            })}
                          </div>
                          <p className="mt-4 flex items-start gap-2 rounded-xl border border-dashed border-caramel/50 bg-gold/10 p-3 text-[11px] font-medium leading-relaxed text-cocoa">
                            <InfoIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-caramel" />
                            Demo checkout — no real payment is processed and no
                            card details are requested.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 4 — success */}
                  {step === 3 && order && (
                    <div>
                      <SuccessCheck />
                      <h3 className="mt-5 text-center font-display text-3xl font-semibold text-espresso">
                        Payment complete!
                      </h3>
                      <p className="mt-2 text-center text-sm font-light text-cocoa">
                        Order <span className="font-bold text-caramel">{order.id}</span> is in the
                        queue. Show this QR ticket at the counter.
                      </p>

                      <div className="mt-7">
                        <QRCard
                          code={order.qr}
                          filename={`brew-haven-order-${order.id}.png`}
                          eyebrow="Order ticket"
                          title={`${typeLabel(order.orderType)} order`}
                          status="PAID_DEMO"
                          notchClass="bg-foam"
                          meta={[
                            { label: "Order ID", value: order.id },
                            { label: "Customer", value: order.name },
                            { label: "Order type", value: typeLabel(order.orderType) },
                            {
                              label: "Payment",
                              value: METHODS.find((m) => m.id === order.method)?.label ?? "",
                            },
                            {
                              label: "Placed",
                              value: new Date(order.createdAt).toLocaleString("en-US", {
                                month: "short",
                                day: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                              }),
                            },
                            { label: "Total", value: fmt(order.total) },
                          ]}
                          note="Demo receipt — nothing was really charged."
                        />
                      </div>

                      {/* human-readable summary */}
                      <div className="mx-auto mt-6 w-full max-w-sm rounded-2xl border border-latte bg-paper p-5">
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cocoa/60">
                          Order summary
                        </p>
                        <ul className="mt-3 space-y-2">
                          {order.items.map((it) => (
                            <li key={it.name} className="flex justify-between gap-3 text-sm">
                              <span className="font-medium text-espresso">
                                {it.quantity}× {it.name}
                              </span>
                              <span className="font-semibold text-cocoa">{fmt(it.price * it.quantity)}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-3 space-y-1 border-t border-dashed border-sand pt-3 text-sm font-medium text-cocoa">
                          <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="font-semibold text-espresso">{fmt(order.subtotal)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax</span>
                            <span className="font-semibold text-espresso">{fmt(order.tax)}</span>
                          </div>
                          {order.fee > 0 && (
                            <div className="flex justify-between">
                              <span>Delivery</span>
                              <span className="font-semibold text-espresso">{fmt(order.fee)}</span>
                            </div>
                          )}
                          <div className="flex justify-between pt-1 text-base font-bold text-espresso">
                            <span>Total</span>
                            <span>{fmt(order.total)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-7 text-center">
                        <motion.button
                          whileTap={{ scale: 0.96 }}
                          onClick={finish}
                          className="group inline-flex items-center gap-2.5 rounded-full bg-espresso px-8 py-4 text-sm font-semibold text-cream shadow-soft transition-colors hover:bg-caramel"
                        >
                          Back to the café
                          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </motion.button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* nav buttons */}
              {step < 3 && lines.length > 0 && (
                <div className="mt-8 flex items-center justify-between gap-4">
                  {step > 0 ? (
                    <button
                      onClick={back}
                      disabled={processing}
                      className="flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-cocoa transition-colors hover:text-espresso disabled:opacity-40"
                    >
                      <ArrowLeftIcon className="h-4 w-4" /> Back
                    </button>
                  ) : (
                    <span />
                  )}
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={step === 2 ? pay : next}
                    disabled={processing}
                    className="group flex items-center gap-2.5 rounded-full bg-espresso px-7 py-3.5 text-sm font-semibold text-cream shadow-soft transition-colors hover:bg-caramel disabled:opacity-60"
                  >
                    {step === 2 ? (method === "cash" ? "Confirm Order" : `Pay ${fmt(total)}`) : "Continue"}
                    {step < 2 && (
                      <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    )}
                    {step === 2 && <CheckIcon className="h-4 w-4" strokeWidth={2.4} />}
                  </motion.button>
                </div>
              )}

              {/* processing overlay */}
              <AnimatePresence>
                {processing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-5 rounded-b-[32px] bg-foam/94 backdrop-blur-[2px]"
                  >
                    <span className="h-14 w-14 animate-spin rounded-full border-[3.5px] border-latte border-t-caramel" />
                    <div className="h-5 overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={msgIdx}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -12 }}
                          transition={{ duration: 0.25 }}
                          className="text-sm font-semibold text-cocoa"
                        >
                          {PROCESS_MSGS[msgIdx]}
                        </motion.p>
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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
