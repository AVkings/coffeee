import { BeanIcon } from "./icons";

const ITEMS = [
  "Single origin espresso",
  "Slow bar on weekends",
  "Pastries out of the oven at 7 AM",
  "Oat milk, no upcharge",
  "Roasted in-house every Tuesday",
  "Dog-friendly terrace",
  "Loyalty card — 9th cup on us",
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {ITEMS.map((t) => (
        <span key={t} className="flex items-center">
          <span className="whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.24em] text-cream/90">
            {t}
          </span>
          <BeanIcon className="mx-7 h-4 w-4 shrink-0 text-gold" />
        </span>
      ))}
    </div>
  );
}

export default function Ticker() {
  return (
    <div className="relative -rotate-[0.7deg] scale-[1.02] border-y border-gold/25 bg-espresso py-3.5">
      <div className="flex w-max animate-marquee">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
