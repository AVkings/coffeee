import { motion } from "framer-motion";
import { EASE } from "../lib/helpers";
import { CheckIcon } from "./icons";

interface StepsProps {
  steps: string[];
  current: number; // 0-based; values >= steps.length mean "all done"
  className?: string;
}

export default function Steps({ steps, current, className = "" }: StepsProps) {
  return (
    <div className={`flex items-center ${className}`}>
      {steps.map((label, i) => {
        const done = current > i;
        const active = current === i;
        return (
          <div key={label} className={`flex items-center ${i > 0 ? "flex-1" : ""}`}>
            {i > 0 && (
              <div className="relative mx-2 h-[2px] flex-1 overflow-hidden rounded-full bg-latte sm:mx-3">
                <motion.div
                  className="absolute inset-0 origin-left bg-caramel"
                  initial={false}
                  animate={{ scaleX: done || active ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                />
              </div>
            )}
            <div className="flex flex-col items-center gap-1.5">
              <motion.div
                animate={
                  done
                    ? { backgroundColor: "#b4762a", color: "#fffdf6", scale: 1 }
                    : active
                      ? { backgroundColor: "#211307", color: "#f9f3e5", scale: 1 }
                      : { backgroundColor: "#fffdf6", color: "#6f4c2c", scale: 0.92 }
                }
                transition={{ duration: 0.3, ease: EASE }}
                className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold ${
                  done
                    ? "border-caramel"
                    : active
                      ? "border-espresso shadow-soft"
                      : "border-sand"
                }`}
              >
                {done ? <CheckIcon className="h-4 w-4" strokeWidth={2.2} /> : i + 1}
              </motion.div>
              <span
                className={`whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                  active ? "text-espresso" : done ? "text-caramel" : "text-cocoa/50"
                }`}
              >
                {label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
