import { useRef } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { EASE } from "../lib/helpers";
import { DownloadIcon, InfoIcon } from "./icons";

interface MetaRow {
  label: string;
  value: string;
}

interface QRCardProps {
  code: string;
  filename: string;
  eyebrow: string;
  title: string;
  meta: MetaRow[];
  status: string;
  notchClass?: string;
  note?: string;
}

export default function QRCard({
  code,
  filename,
  eyebrow,
  title,
  meta,
  status,
  notchClass = "bg-cream",
  note = "Demo ticket — no real purchase was made.",
}: QRCardProps) {
  const qrWrap = useRef<HTMLDivElement>(null);

  const download = () => {
    const svg = qrWrap.current?.querySelector("svg");
    if (!svg) return;
    const xml = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([xml], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 640;
      canvas.height = 640;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 640, 640);
      ctx.drawImage(img, 40, 40, 560, 560);
      URL.revokeObjectURL(url);
      const a = document.createElement("a");
      a.download = filename;
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    img.src = url;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
      className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[28px] border border-latte bg-foam shadow-lift"
    >
      {/* header */}
      <div className="px-7 pt-7">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-caramel">
          {eyebrow}
        </p>
        <div className="mt-2 flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl font-semibold leading-tight text-espresso">
            {title}
          </h3>
          <span className="mt-1 shrink-0 rounded-full border border-gold/50 bg-gold/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-caramel">
            {status}
          </span>
        </div>
      </div>

      {/* QR */}
      <motion.div
        ref={qrWrap}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.45 }}
        className="mx-auto mt-5 w-fit rounded-3xl border border-latte bg-white p-3.5 shadow-soft"
      >
        <QRCodeSVG value={code} size={148} fgColor="#211307" bgColor="#ffffff" level="M" />
      </motion.div>
      <p className="mt-2.5 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-cocoa/60">
        Scan at the counter
      </p>

      {/* perforation */}
      <div className="relative mt-6">
        <span
          className={`absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border-r border-latte ${notchClass}`}
        />
        <span
          className={`absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border-l border-latte ${notchClass}`}
        />
        <div className="border-t-2 border-dashed border-latte" />
      </div>

      {/* meta */}
      <dl className="grid grid-cols-2 gap-x-5 gap-y-3 px-7 py-6">
        {meta.map((row) => (
          <div key={row.label} className={row.label === "Items" ? "col-span-2" : ""}>
            <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-cocoa/55">
              {row.label}
            </dt>
            <dd className="mt-0.5 text-sm font-medium leading-snug text-espresso">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      {/* footer */}
      <div className="flex items-center justify-between gap-3 border-t border-latte/70 px-7 py-4">
        <p className="flex items-center gap-1.5 text-[11px] font-medium text-cocoa/65">
          <InfoIcon className="h-3.5 w-3.5" /> {note}
        </p>
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={download}
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-espresso px-4 py-2 text-xs font-semibold text-cream transition-colors hover:bg-bean"
        >
          <DownloadIcon className="h-3.5 w-3.5" /> Save QR
        </motion.button>
      </div>
    </motion.div>
  );
}
