import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "../Reveal";

const items = [
  {
    quote:
      "Yuu didn't just design a website - they redefined how our brand speaks to the world. A masterclass in restraint.",
    author: "Alexander Vance",
    role: "CEO, Aeris Global",
  },
  {
    quote:
      "The most disciplined creative partner we have ever worked with. Every detail carries intent.",
    author: "Mira Okafor",
    role: "Head of Brand, Flux Media",
  },
  {
    quote:
      "They shipped a launch experience our board still quotes back to us. Cinematic, calm, and precise.",
    author: "Julien Roche",
    role: "Founder, Chronos",
  },
  {
    quote:
      "Craft you can feel. From the first workshop to the last commit, it moved with grace.",
    author: "Han Ito",
    role: "Creative Director, The Edit",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (paused || manual) return;
    const id = window.setInterval(() => {
      setI((n) => (n + 1) % items.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, [paused, manual]);

  const current = items[i];

  return (
    <section
      id="testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative z-10 border-t border-white/5 bg-surface px-6 py-32 lg:px-12 lg:py-40"
    >
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-16">
          <Reveal>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/40">
              07 &nbsp;/&nbsp; Verdict
            </span>
          </Reveal>
        </div>

        <div className="grid min-h-[26rem] grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:min-h-[22rem]">
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-3xl font-medium leading-[1.15] tracking-tight text-balance sm:text-4xl lg:text-6xl"
              >
                <span className="text-accent">"</span>
                {current.quote}
                <span className="text-accent">"</span>
              </motion.blockquote>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.figcaption
                key={`f-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="mt-10 flex items-center gap-4 font-mono text-[11px] uppercase tracking-widest text-ink/60"
              >
                <span className="inline-block h-px w-8 bg-ink/40" />
                <span className="text-ink">{current.author}</span>
                <span className="text-ink/40">/ {current.role}</span>
              </motion.figcaption>
            </AnimatePresence>
          </div>

          <div className="flex items-end gap-2 lg:col-span-3 lg:justify-end">
            {items.map((_, n) => (
              <button
                key={n}
                onClick={() => {
                  setManual(true);
                  setI(n);
                }}
                aria-label={`Show testimonial ${n + 1}`}
                className="group relative h-8 w-8"
              >
                <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/15" />
                <span
                  className={`absolute inset-x-0 top-1/2 h-px -translate-y-1/2 origin-left bg-accent transition-transform duration-500 ${
                    n === i ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
