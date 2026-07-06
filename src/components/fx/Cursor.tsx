import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 });
  const raf = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduced) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(
        'a, button, [role="button"], input, textarea, [data-cursor]',
      ) as HTMLElement | null;
      setHover(!!interactive);
      setLabel(interactive?.dataset.cursorLabel ?? null);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      >
        <motion.div
          animate={{
            width: hover ? 56 : 10,
            height: hover ? 56 : 10,
            backgroundColor: hover ? "rgba(228,228,231,0.15)" : "#e4e4e7",
            borderColor: hover ? "rgba(228,228,231,0.9)" : "rgba(228,228,231,0)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="grid place-items-center rounded-full border"
        >
          {label && (
            <span className="font-mono text-[9px] uppercase tracking-widest text-ink">
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>
      <style>{`@media (hover: hover) and (pointer: fine) { body { cursor: none; } a, button, [role="button"], [data-cursor] { cursor: none; } input, textarea, select { cursor: text; } }`}</style>
    </>
  );
}
