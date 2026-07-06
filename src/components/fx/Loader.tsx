import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export function Loader() {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let n = 0;
    const id = window.setInterval(() => {
      n += Math.max(1, Math.round((100 - n) * 0.08));
      if (n >= 100) {
        n = 100;
        window.clearInterval(id);
        window.setTimeout(() => setDone(true), 420);
      }
      setCount(n);
    }, 40);
    return () => window.clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.85, 0, 0.15, 1] }}
          className="fixed inset-0 z-[200] grid place-items-center bg-void"
        >
          <div className="flex items-baseline gap-6 px-6">
            <span className="font-display text-4xl font-semibold tracking-tighter sm:text-6xl">
              YUU
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-ink/40 tabular-nums">
              {String(count).padStart(3, "0")}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 h-px w-full bg-white/10">
            <motion.div
              className="h-full bg-accent"
              initial={{ width: "0%" }}
              animate={{ width: `${count}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
