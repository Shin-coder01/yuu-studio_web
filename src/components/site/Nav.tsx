import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#studio", label: "Studio" },
  { href: "#contact", label: "Contact" },
];

const scenes = [
  { id: "top", label: "Opening" },
  { id: "capabilities", label: "Capabilities" },
  { id: "work", label: "Work" },
  { id: "explorations", label: "Explorations" },
  { id: "services", label: "Services" },
  { id: "studio", label: "Studio" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(scenes[0]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const scene = scenes.find((item) => item.id === visible.target.id);
        if (scene) setActive(scene);
      },
      {
        rootMargin: "-34% 0px -50% 0px",
        threshold: [0.08, 0.18, 0.32, 0.5],
      },
    );

    scenes.forEach((scene) => {
      const node = document.getElementById(scene.id);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  const sceneNumber = String(scenes.findIndex((scene) => scene.id === active.id) + 1).padStart(2, "0");

  return (
    <>
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
        className={`fixed top-0 z-50 w-full transition-colors duration-500 ${
          scrolled
            ? "border-b border-white/5 bg-void/70 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="relative mx-auto flex h-16 w-full max-w-screen-2xl items-center justify-between px-6 lg:h-20 lg:px-12">
          <a
            href="#top"
            className="font-display text-lg font-semibold tracking-tighter"
            data-cursor
          >
            YUU<span className="text-accent">.</span>
          </a>

          <div className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 overflow-hidden font-mono text-[9px] uppercase tracking-[0.28em] text-ink/45 lg:block">
            <AnimatePresence mode="wait">
              <motion.span
                key={active.id}
                initial={{ y: "120%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-120%", opacity: 0 }}
                transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                className="block whitespace-nowrap"
              >
                Scene {sceneNumber} / {active.label}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="hidden items-center gap-10 sm:flex">
            {links.map((l) => {
              const isActive = active.id === l.href.slice(1);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className="group relative font-mono text-[11px] uppercase tracking-[0.25em] text-ink/60 transition-colors hover:text-ink"
                >
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="scene-playhead"
                      className="absolute -bottom-1 left-0 h-px w-full bg-accent"
                      transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent/50 transition-all duration-500 group-hover:w-full" />
                </a>
              );
            })}
          </div>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex size-10 flex-col items-end justify-center gap-1.5 sm:hidden"
          >
            <span
              className={`h-px bg-ink transition-all ${open ? "w-6 translate-y-[3px] rotate-45" : "w-6"}`}
            />
            <span
              className={`h-px bg-ink transition-all ${open ? "w-6 -translate-y-[3px] -rotate-45" : "w-4"}`}
            />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.85, 0, 0.15, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-void px-6 pb-10 pt-24 sm:hidden"
          >
            <ul className="flex flex-col gap-6">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl tracking-tighter"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="flex items-end justify-between font-mono text-[10px] uppercase tracking-widest text-ink/40">
              <span>Scene {sceneNumber}</span>
              <span>{active.label}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
