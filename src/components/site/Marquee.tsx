import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const WORDS = ["IMPACT", "INSPIRE", "INNOVATE"];

export function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Scroll-linked drift + baseline auto scroll via CSS
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  // Build a long, repeated string so the track always overflows.
  const line = Array.from({ length: 8 }, () => WORDS.join("  ·  ")).join("  ·  ");

  return (
    <section
      ref={ref}
      aria-hidden
      className="relative z-10 select-none overflow-hidden border-y border-white/5 py-10 lg:py-14"
    >
      <motion.div
        style={{ x }}
        className="flex whitespace-nowrap will-change-transform"
      >
        <span className="marquee-track flex whitespace-nowrap font-display text-[14vw] font-medium leading-none tracking-tighter text-ink/90 lg:text-[11vw]">
          <span className="pr-[0.4em]">{line}</span>
          <span aria-hidden className="pr-[0.4em]">{line}</span>
        </span>
      </motion.div>
    </section>
  );
}
