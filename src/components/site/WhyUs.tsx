import { motion } from "motion/react";
import { Reveal } from "../Reveal";

const features = [
  {
    title: "Creative Thinking",
    desc: "Every project starts with a distinct hypothesis, not a template.",
  },
  {
    title: "Fast Delivery",
    desc: "Small senior team, no handoffs - decisions ship the same week.",
  },
  {
    title: "User-Centered Design",
    desc: "Research-informed interfaces built around measurable outcomes.",
  },
  {
    title: "Modern Technologies",
    desc: "Performance-first stacks: React, TypeScript, WebGL, edge runtimes.",
  },
  {
    title: "Long-Term Support",
    desc: "Retainers and iteration cycles that keep the work alive after launch.",
  },
];

export function WhyUs() {
  return (
    <section id="method" className="relative z-10 border-t border-white/5 px-6 py-32 lg:px-12 lg:py-40">
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-20 flex flex-col justify-between gap-8 lg:mb-24 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.3em] text-ink/40">
                06 &nbsp;/&nbsp; Method
              </span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="max-w-[16ch] font-display text-4xl font-medium tracking-tight text-balance lg:text-6xl">
                Reasons to work with us.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={2}>
            <p className="max-w-[36ch] text-ink/60 lg:text-lg">
              Craft, cadence, and clarity - the three constants across every
              engagement we take on.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-md bg-white/5 sm:grid-cols-2 lg:grid-cols-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden bg-void p-8 transition-colors hover:bg-surface"
            >
              <div className="mb-16 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent/70">
                  0{i + 1}
                </span>
                <span className="block h-px w-8 origin-right scale-x-100 bg-ink/30 transition-transform duration-500 group-hover:origin-left group-hover:scale-x-150 group-hover:bg-accent" />
              </div>
              <h3 className="mb-3 font-display text-xl lg:text-2xl">{f.title}</h3>
              <p className="text-sm text-ink/55">{f.desc}</p>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px scale-x-0 bg-accent transition-transform duration-700 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
