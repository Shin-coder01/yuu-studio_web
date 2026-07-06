import { motion } from "motion/react";
import { Reveal, RevealWord } from "../Reveal";
import studio from "@/assets/projects/studio.jpg";

export function About() {
  return (
    <section id="studio" className="relative z-10 border-t border-white/5 px-6 py-32 lg:px-12 lg:py-40">
      <div className="mx-auto grid max-w-screen-2xl gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <Reveal>
            <span className="mb-6 block font-mono text-[10px] uppercase tracking-[0.3em] text-ink/40">
              05 &nbsp;/&nbsp; Studio
            </span>
          </Reveal>

          <Reveal delay={1}>
            <h2 className="font-display text-4xl font-medium tracking-tight text-balance lg:text-6xl">
              <RevealWord text="A quiet studio with intense attention to every detail." />
            </h2>
          </Reveal>

          <Reveal delay={2}>
            <p className="mt-8 max-w-[45ch] text-pretty text-ink/60 lg:text-lg">
              Yuu Studios designs digital experiences that feel effortless and exacting at once.
              We combine editorial discipline, motion-led interfaces, and polished technical craft to
              make every interaction feel considered.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {[
              "Brand systems and identity direction.",
              "Performance-focused web and app development.",
              "Motion and interaction systems for premium launches.",
              "Long-term support with a lean senior team.",
            ].map((line) => (
              <Reveal key={line} delay={3} as="div">
                <motion.div className="rounded-xl border border-white/10 bg-void/80 p-6 text-sm text-ink/55 transition-colors hover:border-accent/30 hover:bg-surface">
                  {line}
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={4} as="div">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[2rem] bg-surface shadow-2xl shadow-black/30"
          >
            <img
              src={studio}
              alt="Yuu studio environment"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
