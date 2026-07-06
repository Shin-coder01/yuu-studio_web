import { motion } from "motion/react";
import { Reveal, RevealWord } from "../Reveal";

const explorations = [
  {
    code: "EX.01",
    title: "Kinetic identity studies",
    desc: "Motion tests for marks, title systems, and launch moments before they become production rules.",
  },
  {
    code: "EX.02",
    title: "Editorial interaction drafts",
    desc: "Interface compositions that borrow from magazines, cinema frames, and gallery pacing.",
  },
  {
    code: "EX.03",
    title: "Spatial web prototypes",
    desc: "Lean WebGL and perspective studies used only when depth supports the story.",
  },
];

export function Explorations() {
  return (
    <section id="explorations" className="relative z-10 border-t border-white/5 px-6 py-28 lg:px-12 lg:py-36">
      <div className="mx-auto grid max-w-screen-2xl gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <Reveal>
            <span className="mb-6 block font-mono text-[10px] uppercase tracking-[0.3em] text-ink/40">
              03 &nbsp;/&nbsp; Explorations
            </span>
          </Reveal>
          <h2 className="max-w-[12ch] font-display text-4xl font-medium tracking-tight text-balance lg:text-6xl">
            <RevealWord text="Studies before the final frame." />
          </h2>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={1}>
            <p className="max-w-[56ch] text-pretty text-ink/60 lg:text-lg">
              Not every experiment becomes a case study. This is where Yuu tests motion,
              composition, and technical language before a project needs it.
            </p>
          </Reveal>

          <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
            {explorations.map((item, index) => (
              <motion.article
                key={item.code}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.72, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="group grid gap-5 py-8 sm:grid-cols-[8rem_1fr] sm:py-10"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/35 transition-colors group-hover:text-accent">
                  {item.code}
                </span>
                <div>
                  <h3 className="font-display text-2xl tracking-tight transition-colors group-hover:text-accent lg:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-[54ch] text-sm leading-6 text-ink/55">
                    {item.desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
