import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const WORDS = ["DIRECTION", "IDENTITY", "MOTION", "SYSTEMS"];

export function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const groups = Array.from({ length: 8 }, (_, group) => group);

  return (
    <section
      ref={ref}
      aria-hidden
      className="relative z-10 select-none overflow-hidden border-y border-white/5 py-10 lg:py-14"
    >
      <motion.div style={{ x }} className="flex whitespace-nowrap will-change-transform">
        <span className="marquee-track flex whitespace-nowrap font-display text-[14vw] font-medium leading-none tracking-tighter text-ink/90 lg:text-[11vw]">
          <span className="flex items-center pr-[0.34em]">
            {groups.map((group) => (
              <WordGroup key={`a-${group}`} />
            ))}
          </span>
          <span aria-hidden className="flex items-center pr-[0.34em]">
            {groups.map((group) => (
              <WordGroup key={`b-${group}`} />
            ))}
          </span>
        </span>
      </motion.div>
    </section>
  );
}

function WordGroup() {
  return (
    <>
      {WORDS.map((word) => (
        <span key={word} className="flex items-center">
          <span>{word}</span>
          <span className="mx-[0.22em] inline-block size-[0.08em] rounded-full bg-ink/45" />
        </span>
      ))}
    </>
  );
}
