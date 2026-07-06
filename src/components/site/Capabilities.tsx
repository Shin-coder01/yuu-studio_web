import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";

import aether from "@/assets/projects/aether.jpg";
import chronos from "@/assets/projects/chronos.jpg";
import edit from "@/assets/projects/edit.jpg";
import flux from "@/assets/projects/flux.jpg";
import monolith from "@/assets/projects/monolith.jpg";
import obsidian from "@/assets/projects/obsidian.jpg";

const capabilities = [
  {
    title: "Identity",
    project: "Aether Architecture",
    image: aether,
    href: "#project-aether-architecture",
    start: { x: -420, y: -36, rotate: -16 },
    end: { x: -455, y: 8, rotate: -4 },
  },
  {
    title: "Motion",
    project: "Flux Media",
    image: flux,
    href: "#project-flux-media",
    start: { x: -255, y: 70, rotate: 12 },
    end: { x: -275, y: -4, rotate: -2 },
  },
  {
    title: "Commerce",
    project: "Chronos",
    image: chronos,
    href: "#project-chronos",
    start: { x: -58, y: -76, rotate: -8 },
    end: { x: -95, y: 4, rotate: 1 },
  },
  {
    title: "Editorial",
    project: "The Edit",
    image: edit,
    href: "#project-the-edit",
    start: { x: 124, y: 54, rotate: 10 },
    end: { x: 85, y: -4, rotate: -1 },
  },
  {
    title: "Packaging",
    project: "Pressom Monolith",
    image: monolith,
    href: "#project-pressom-monolith",
    start: { x: 296, y: -48, rotate: -12 },
    end: { x: 265, y: 6, rotate: 3 },
  },
  {
    title: "Systems",
    project: "Obsidian OS",
    image: obsidian,
    href: "#project-obsidian-os",
    start: { x: 462, y: 68, rotate: 15 },
    end: { x: 445, y: -2, rotate: 5 },
  },
];

type Capability = (typeof capabilities)[number];

export function Capabilities() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2.5, 2.5]), {
    stiffness: 80,
    damping: 24,
  });
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [1.8, -1.8]), {
    stiffness: 80,
    damping: 24,
  });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const playheadX = useTransform(scrollYProgress, [0.34, 0.78], [-540, 540]);
  const timelineScale = useTransform(scrollYProgress, [0.18, 0.34], [0, 1]);
  const finalOpacity = useTransform(scrollYProgress, [0.78, 0.92], [0, 1]);
  const fragmentsOpacity = useTransform(scrollYProgress, [0, 0.1, 0.94, 1], [0, 1, 1, 0.35]);

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    mouseY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section
      id="capabilities"
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative z-10 h-[190vh] bg-[#060606] text-ink"
      style={{ perspective: 1400 }}
    >
      <div className="sticky top-0 h-screen overflow-hidden px-6 pt-24 lg:px-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.07),transparent_42%)]" />
        <div className="pointer-events-none absolute inset-0 grain-layer" />

        <div className="relative mx-auto h-full max-w-screen-2xl">
          <div className="absolute left-0 top-20 z-20 max-w-3xl">
            <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.3em] text-ink/40">
              01 &nbsp;/&nbsp; Capabilities
            </span>
            <h2 className="font-display text-4xl font-medium tracking-tight text-ink lg:text-6xl">
              The cutting table for <span className="italic">digital craft</span>.
            </h2>
          </div>

          <span className="pointer-events-none absolute bottom-[12vh] left-0 z-0 font-display text-[clamp(4.8rem,9vw,8rem)] font-semibold uppercase leading-none tracking-normal text-[#1d1d1d]">
            MOTION
          </span>
          <span className="pointer-events-none absolute right-0 top-[8vh] z-0 font-display text-[clamp(4.8rem,9vw,8rem)] font-semibold uppercase leading-none tracking-normal text-[#1d1d1d]">
            DESIGN
          </span>

          <motion.div
            className="absolute left-1/2 top-[54%] z-10 hidden h-[440px] w-[1120px] -translate-x-1/2 -translate-y-1/2 lg:block"
            style={{ rotateX, rotateY, opacity: fragmentsOpacity, transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="absolute left-1/2 top-1/2 h-px w-[1080px] -translate-x-1/2 bg-white/12"
              style={{ scaleX: timelineScale, transformOrigin: "left" }}
            />
            <motion.div
              className="absolute left-1/2 top-[calc(50%-54px)] h-[184px] w-px bg-accent/90 shadow-[0_0_30px_rgba(228,228,231,0.24)]"
              style={{ x: playheadX }}
            >
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.28em] text-ink/50">
                playhead
              </span>
            </motion.div>

            {capabilities.map((item, index) => (
              <CapabilityFragment
                key={item.title}
                item={item}
                index={index}
                progress={scrollYProgress}
              />
            ))}
          </motion.div>

          <div className="absolute inset-x-0 top-[42%] z-10 grid gap-4 lg:hidden">
            {capabilities.map((item, index) => (
              <a
                key={item.title}
                href={item.href}
                className="flex items-center justify-between border-b border-white/10 py-4"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/45">
                  0{index + 1} / {item.title}
                </span>
                <span className="text-sm text-ink/70">{item.project}</span>
              </a>
            ))}
          </div>

          <motion.p
            style={{ opacity: finalOpacity }}
            className="absolute bottom-24 left-1/2 z-20 hidden -translate-x-1/2 whitespace-nowrap font-display text-2xl text-ink/90 lg:block"
          >
            Frame by frame, system by system.
          </motion.p>

          <p className="absolute bottom-10 left-0 z-20 max-w-[260px] text-sm leading-relaxed text-ink/55">
            Six modes of digital craft, assembled into one precise sequence.
          </p>
          <a
            href="#work"
            className="absolute bottom-10 right-0 z-20 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/70 transition-colors hover:text-ink"
          >
            VIEW THE CUTS &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}

function CapabilityFragment({
  item,
  index,
  progress,
}: {
  item: Capability;
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const x = useTransform(progress, [0.08, 0.45, 0.88], [item.start.x, item.end.x, item.end.x]);
  const y = useTransform(progress, [0.08, 0.45, 0.88], [item.start.y, item.end.y, item.end.y]);
  const rotate = useTransform(progress, [0.08, 0.45, 0.88], [item.start.rotate, item.end.rotate, item.end.rotate]);
  const labelOpacity = useTransform(
    progress,
    [0.34 + index * 0.055, 0.39 + index * 0.055, 0.82],
    [0.25, 1, 1],
  );

  return (
    <motion.a
      href={item.href}
      aria-label={`View ${item.project}`}
      data-cursor
      data-cursor-label="View"
      className="absolute left-1/2 top-1/2 block h-[190px] w-[150px] overflow-hidden border border-white/12 bg-black shadow-[0_28px_70px_rgba(0,0,0,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      style={{
        x,
        y,
        rotate,
        marginLeft: -75,
        marginTop: -95,
        zIndex: 10 + index,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.985 }}
    >
      <div className="absolute inset-x-0 top-0 z-10 flex h-5 items-center justify-around bg-black px-2">
        {Array.from({ length: 6 }).map((_, hole) => (
          <span key={hole} className="h-2 w-1.5 rounded-[1px] bg-[#060606]" />
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 flex h-5 items-center justify-around bg-black px-2">
        {Array.from({ length: 6 }).map((_, hole) => (
          <span key={hole} className="h-2 w-1.5 rounded-[1px] bg-[#060606]" />
        ))}
      </div>
      <div className="absolute inset-[9px] overflow-hidden bg-surface">
        <img
          src={item.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-80"
          draggable={false}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
      <motion.div
        style={{ opacity: labelOpacity }}
        className="absolute inset-x-3 bottom-8 z-20"
      >
        <span className="mb-1 block font-mono text-[8px] uppercase tracking-[0.24em] text-white/50">
          0{index + 1} / {item.project}
        </span>
        <span className="font-display text-xl leading-none text-white">{item.title}</span>
      </motion.div>
    </motion.a>
  );
}
