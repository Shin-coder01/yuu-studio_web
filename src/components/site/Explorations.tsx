import { motion } from "motion/react";
import { Reveal, RevealWord } from "../Reveal";
import kinetic from "@/assets/explorations/kinetic-identity.svg";
import editorial from "@/assets/explorations/editorial-interface.svg";
import spatial from "@/assets/explorations/spatial-web.svg";

const explorations = [
  {
    code: "EX.01",
    title: "Kinetic identity studies",
    desc: "Motion tests for marks, title systems, and launch moments before they become production rules.",
    image: kinetic,
  },
  {
    code: "EX.02",
    title: "Editorial interaction drafts",
    desc: "Interface compositions that borrow from magazines, cinema frames, and gallery pacing.",
    image: editorial,
  },
  {
    code: "EX.03",
    title: "Spatial web prototypes",
    desc: "Lean WebGL and perspective studies used only when depth supports the story.",
    image: spatial,
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
          <Reveal delay={2}>
            <div className="mt-16 hidden max-w-[30rem] border border-white/10 bg-surface/25 p-6 lg:block">
              <div className="mb-10 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.28em] text-ink/35">
                <span>Research board</span>
                <span>Live studies</span>
              </div>
              <div className="space-y-5">
                {explorations.map((item, index) => (
                  <a
                    key={item.code}
                    href={`#exploration-${item.code.toLowerCase().replace(".", "-")}`}
                    className="group grid grid-cols-[3.5rem_1fr] gap-4 border-t border-white/10 pt-5"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/35 transition-colors group-hover:text-accent">
                      0{index + 1}
                    </span>
                    <span>
                      <span className="block font-display text-xl tracking-tight text-ink/80 transition-colors group-hover:text-accent">
                        {item.title}
                      </span>
                      <span className="mt-2 block text-xs leading-5 text-ink/40">
                        {item.desc.split(".")[0]}.
                      </span>
                    </span>
                  </a>
                ))}
              </div>
              <div className="mt-10 grid grid-cols-3 gap-px bg-white/10">
                {["Motion", "Type", "Depth"].map((label) => (
                  <div key={label} className="bg-void p-4">
                    <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-ink/35">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={1}>
            <p className="max-w-[56ch] text-pretty text-ink/60 lg:text-lg">
              Not every experiment becomes a case study. This is where Yuu tests motion,
              composition, and technical language before a project needs it.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5">
            {explorations.map((item, index) => (
              <motion.article
                id={`exploration-${item.code.toLowerCase().replace(".", "-")}`}
                key={item.code}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.72, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="group grid gap-5 border border-white/10 bg-surface/30 p-4 transition-colors hover:border-white/20 hover:bg-surface/60 sm:grid-cols-[minmax(13rem,0.72fr)_1fr] sm:p-5"
              >
                <div className="relative aspect-[16/11] overflow-hidden bg-void">
                  <img
                    src={item.image}
                    alt={`${item.title} visual`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/30 via-transparent to-transparent" />
                </div>
                <div className="flex flex-col justify-between py-1">
                  <span className="mb-8 block font-mono text-[10px] uppercase tracking-[0.3em] text-ink/35 transition-colors group-hover:text-accent sm:mb-0">
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
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
