export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const fmt = (n: number) => `$${n.toFixed(2)}`;

export const genId = (prefix: string) =>
  `${prefix}-${Date.now().toString(36).toUpperCase().slice(-5)}${Math.floor(
    Math.random() * 90 + 10,
  )}`;

export const scrollToId = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

export const todayISO = () => {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
};

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

export const formatClock = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
};

export const TAX_RATE = 0.08;
export const DELIVERY_FEE = 2.5;
