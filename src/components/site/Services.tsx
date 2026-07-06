import { motion } from "motion/react";
import { Reveal, RevealWord } from "../Reveal";

const services = [
  { title: "Web Design", desc: "Editorial layouts and interface systems built with cinematic composition." },
  { title: "UI/UX Design", desc: "Interaction models tuned for clarity, hierarchy, and quiet delight." },
  { title: "Branding", desc: "Identity systems, marks, and voice designed to age with intention." },
  { title: "Web Development", desc: "Performant, accessible builds with buttery motion at 60fps." },
  { title: "Mobile Apps", desc: "Native-feeling iOS and Android products crafted end to end." },
  { title: "Motion Design", desc: "Kinetic storytelling that adds weight to every static frame." },
];

export function Services() {
  return (
    <section id="services" className="relative z-10 bg-void px-6 py-32 lg:px-12 lg:py-40">
      <div className="mx-auto max-w-screen-2xl">
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-20">
          <div className="lg:w-1/3">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <span className="mb-6 block font-mono text-[10px] uppercase tracking-[0.3em] text-ink/40">
                  04 &nbsp;/&nbsp; Expertise
                </span>
              </Reveal>
              <h2 className="mb-8 font-display text-4xl font-medium tracking-tight text-balance lg:text-5xl">
                <RevealWord text="Precision in every frame." />
              </h2>
              <Reveal delay={2}>
                <p className="max-w-[32ch] text-pretty text-ink/60 lg:text-lg">
                  Six disciplines under one roof. We operate at the intersection of
                  aesthetic rigor and technical performance.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="border-y border-white/10 lg:w-2/3">
            {services.map((s, i) => (
              <ServiceRow key={s.title} index={i} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceRow({
  title,
  desc,
  index,
}: {
  title: string;
  desc: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden border-b border-white/10 last:border-b-0"
    >
      <div className="absolute inset-0 origin-bottom scale-y-0 bg-white/[0.03] transition-transform duration-700 ease-out group-hover:scale-y-100" />
      <div className="relative flex flex-col justify-between gap-4 px-4 py-10 sm:flex-row sm:items-center sm:px-6 sm:py-12">
        <div className="flex items-baseline gap-6">
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink/30">
            0{index + 1}
          </span>
          <span className="font-display text-2xl transition-transform duration-500 group-hover:translate-x-2 sm:text-3xl lg:text-4xl">
            {title}
          </span>
        </div>
        <span className="max-w-[42ch] text-sm text-ink/50 sm:text-right">{desc}</span>
      </div>
    </motion.div>
  );
}
