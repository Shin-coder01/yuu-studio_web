import { useRef, type MouseEvent as ReactMouseEvent } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { Reveal } from "../Reveal";

import aether from "@/assets/projects/aether.jpg";
import flux from "@/assets/projects/flux.jpg";
import chronos from "@/assets/projects/chronos.jpg";
import edit from "@/assets/projects/edit.jpg";
import monolith from "@/assets/projects/monolith.jpg";
import obsidian from "@/assets/projects/obsidian.jpg";

type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  desc: string;
  image: string;
  aspect: string;
  colSpan: string;
  offset: string;
};

const projects: Project[] = [
  {
    id: "aether-architecture",
    title: "Aether Architecture",
    category: "Web Design",
    year: "2025",
    desc: "Global rebranding and digital ecosystem for a boutique architecture firm.",
    image: aether,
    aspect: "aspect-[16/10]",
    colSpan: "lg:col-span-8",
    offset: "",
  },
  {
    id: "flux-media",
    title: "Flux Media",
    category: "Branding",
    year: "2025",
    desc: "Generative visual identity for an experimental motion research lab.",
    image: flux,
    aspect: "aspect-[4/5]",
    colSpan: "lg:col-span-4",
    offset: "lg:mt-48",
  },
  {
    id: "chronos",
    title: "Chronos",
    category: "E-Commerce",
    year: "2024",
    desc: "Digital flagship for a luxury timepiece maker - quiet, mechanical.",
    image: chronos,
    aspect: "aspect-square",
    colSpan: "lg:col-span-5",
    offset: "",
  },
  {
    id: "the-edit",
    title: "The Edit",
    category: "Editorial",
    year: "2024",
    desc: "High-fashion digital publication with fluid, typographic pacing.",
    image: edit,
    aspect: "aspect-[4/3]",
    colSpan: "lg:col-span-7",
    offset: "lg:-mt-24",
  },
  {
    id: "pressom-monolith",
    title: "Pressom Monolith",
    category: "Packaging",
    year: "2024",
    desc: "Full brand and packaging system for a minimalist fragrance house.",
    image: monolith,
    aspect: "aspect-[4/5]",
    colSpan: "lg:col-span-5",
    offset: "lg:mt-24",
  },
  {
    id: "obsidian-os",
    title: "Obsidian OS",
    category: "Product / Mobile",
    year: "2023",
    desc: "iOS companion for a spatial computing platform.",
    image: obsidian,
    aspect: "aspect-[4/3]",
    colSpan: "lg:col-span-7",
    offset: "",
  },
];

export function Projects() {
  return (
    <section id="work" className="relative z-10 px-6 py-32 lg:px-12 lg:py-40">
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-20 flex items-end justify-between lg:mb-28">
          <div>
            <Reveal>
              <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.3em] text-ink/40">
                02 &nbsp;/&nbsp; Selected Works
              </span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="font-display text-4xl font-medium tracking-tight lg:text-6xl">
                Case Studies
              </h2>
            </Reveal>
          </div>
          <Reveal delay={2}>
            <a
              href="#contact"
              className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50 transition-colors hover:text-ink sm:inline-flex"
            >
              Start a project &nbsp;-&gt;
            </a>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-y-24 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-40">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 18, mass: 0.4 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18, mass: 0.4 });
  const spx = useSpring(px, { stiffness: 180, damping: 20, mass: 0.4 });
  const spy = useSpring(py, { stiffness: 180, damping: 20, mass: 0.4 });

  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = imageWrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    ry.set(nx * 7);
    rx.set(-ny * 7);
    px.set(nx * 12);
    py.set(ny * 12);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      id={`project-${project.id}`}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`${project.colSpan} ${project.offset} group`}
    >
      <a href="#contact" data-cursor data-cursor-label="Inquire" className="block">
        <motion.div
          ref={imageWrapRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000, transformStyle: "preserve-3d" }}
          className={`relative mb-6 overflow-hidden rounded-md bg-surface outline outline-1 -outline-offset-1 outline-white/5 ${project.aspect}`}
        >
          <motion.img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            style={{ y, x: spx, translateZ: 40 }}
            className="absolute inset-0 h-[112%] w-full object-cover transition-transform duration-[1400ms] ease-out will-change-transform group-hover:scale-[1.04]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/40 via-transparent to-transparent opacity-70" />
          <motion.div style={{ y: spy }} className="absolute left-4 top-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] text-ink/70">
            <span className="tabular-nums">0{index + 1}</span>
            <span className="inline-block h-px w-6 bg-ink/40" />
            <span>{project.category}</span>
          </motion.div>
        </motion.div>
        <div className="flex items-start justify-between gap-6">
          <div className="max-w-[46ch]">
            <h3 className="mb-2 font-display text-2xl transition-colors group-hover:text-accent lg:text-3xl">
              {project.title}
            </h3>
            <p className="text-pretty text-sm text-ink/55">{project.desc}</p>
          </div>
          <span className="whitespace-nowrap pt-2 font-mono text-[10px] uppercase tracking-widest text-ink/30">
            {project.year}
          </span>
        </div>
      </a>
    </motion.div>
  );
}
