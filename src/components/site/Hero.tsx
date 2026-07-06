import { Suspense, lazy, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { MagneticButton } from "../fx/MagneticButton";

const HeroScene = lazy(() =>
  import("./HeroScene").then((module) => ({ default: module.HeroScene })),
);

export function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const tx = useTransform(sx, (v) => v * 40);
  const ty = useTransform(sy, (v) => v * 40);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window;
      mx.set(e.clientX / w - 0.5);
      my.set(e.clientY / h - 0.5);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const line1 = ["We", "shape"];
  const line2 = ["remarkable"];
  const line3 = ["digital", "worlds."];

  return (
    <section
      id="top"
      className="relative z-10 flex min-h-[100svh] flex-col justify-end px-6 pb-16 pt-32 lg:px-12 lg:pb-24"
    >
      <motion.div
        aria-hidden
        style={{ x: tx, y: ty }}
        className="pointer-events-none absolute left-1/4 top-1/3 -z-10 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(228,228,231,0.09),transparent_70%)] blur-3xl"
      />
      <motion.div
        aria-hidden
        style={{ x: useTransform(sx, (v) => v * -30), y: useTransform(sy, (v) => v * -30) }}
        className="pointer-events-none absolute -right-24 top-24 -z-10 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(160,160,170,0.08),transparent_70%)] blur-3xl"
      />

      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      <HeroLabel />

      <div className="mx-auto w-full max-w-screen-2xl">
        <h1 className="max-w-[12ch] font-display text-[13.5vw] font-medium leading-[0.88] tracking-tighter text-balance sm:text-[10vw] lg:text-[9.4vw]">
          <HeroWords words={line1} delay={0.6} />
          <br />
          <span className="pl-[8vw] italic">
            <HeroWords words={line2} delay={0.85} />
          </span>
          <br />
          <HeroWords words={line3} delay={1.05} />
        </h1>

        <div className="mt-14 flex flex-col justify-between gap-10 lg:mt-20 lg:flex-row lg:items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[44ch] text-pretty text-base leading-relaxed text-ink/70 lg:text-lg"
          >
            A design, branding & development studio crafting cinematic digital experiences with
            precision craft, calm confidence, and a sharp eye for detail.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <MagneticButton
              as="a"
              href="#work"
              className="group inline-flex h-12 items-center justify-center gap-3 rounded-full bg-accent px-7 text-sm font-medium text-void transition-colors hover:bg-white"
            >
              <span>View Work</span>
              <ArrowRight />
            </MagneticButton>
            <MagneticButton
              as="a"
              href="#contact"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-7 text-sm font-medium text-ink transition-colors hover:bg-white/5"
            >
              Start a Project
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      <ScrollCue />
    </section>
  );
}

function HeroLabel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mb-8 flex w-full max-w-screen-2xl items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50 lg:mb-12"
    >
      <span className="inline-block h-px w-8 bg-ink/30" />
      <span>Design / Branding / Development / Est. 2021</span>
    </motion.div>
  );
}

function HeroWords({ words, delay }: { words: string[]; delay: number }) {
  return (
    <>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pr-[0.18em]">
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "115%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.06,
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </>
  );
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-0.5">
      <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ScrollCue() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.9, duration: 1 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
    >
      <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink/40">Scroll</span>
      <div className="relative h-12 w-px overflow-hidden bg-white/10">
        <motion.div
          className="absolute inset-x-0 top-0 h-6 bg-accent"
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
