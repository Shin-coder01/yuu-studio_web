import { useEffect, useState } from "react";
import { Reveal, RevealWord } from "../Reveal";
import { MagneticButton } from "../fx/MagneticButton";

const cols = [
  {
    title: "Studio",
    links: [
      { label: "Studio", href: "#studio" },
      { label: "Method", href: "#method" },
      { label: "Contact", href: "#contact" },
      { label: "Email", href: "mailto:yuustudio.in@gmail.com" },
    ],
  },
  {
    title: "Work",
    links: [
      { label: "Selected work", href: "#work" },
      { label: "Capabilities", href: "#capabilities" },
      { label: "Explorations", href: "#explorations" },
      { label: "Services", href: "#services" },
    ],
  },
  {
    title: "Direct",
    links: [
      { label: "Start a project", href: "#contact" },
      { label: "yuustudio.in@gmail.com", href: "mailto:yuustudio.in@gmail.com" },
      { label: "+91 9597673411", href: "https://wa.me/919597673411" },
      { label: "Back to top", href: "#top" },
    ],
  },
];

const quickLinks = [
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/5 bg-void px-6 pb-10 pt-24 lg:px-12 lg:pt-32">
      <div className="mx-auto max-w-screen-2xl">
        <FooterCTA />

        <div className="mt-24 grid grid-cols-2 gap-10 sm:grid-cols-4 lg:mt-32">
          <div className="col-span-2 sm:col-span-1">
            <span className="font-display text-3xl font-semibold tracking-tighter">
              YUU<span className="text-accent">.</span>
            </span>
            <p className="mt-4 max-w-[24ch] text-sm text-ink/50">
              A design, branding and development studio. Chennai, Tamil Nadu.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.3em] text-ink/40">
                {c.title}
              </span>
              <ul className="space-y-2 text-sm">
                {c.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-ink/80 transition-colors hover:text-accent"
                    >
                      <span className="inline-block h-px w-0 bg-accent transition-all group-hover:w-4" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Reveal>
          <div className="pointer-events-none my-16 select-none overflow-hidden lg:my-24">
            <div className="font-display text-[22vw] font-medium leading-[0.85] tracking-tighter text-ink/[0.06]">
              YUU STUDIOS
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col-reverse items-start justify-between gap-4 border-t border-white/5 pt-8 font-mono text-[10px] uppercase tracking-widest text-ink/30 sm:flex-row sm:items-center">
          <span>(c) {new Date().getFullYear()} Yuu Studios / Precision built</span>
          <div className="flex gap-6">
            <a href="mailto:yuustudio.in@gmail.com?subject=Privacy" className="hover:text-ink">Privacy</a>
            <a href="mailto:yuustudio.in@gmail.com?subject=Imprint" className="hover:text-ink">Imprint</a>
            <a href="#top" className="hover:text-ink">Back to top</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCTA() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#141418] to-[#0b0b0d] p-8 sm:p-12 lg:p-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(228,228,231,0.08),transparent_60%)]" />
      <ISTClock />

      <span className="mb-6 block font-mono text-[10px] uppercase tracking-[0.3em] text-ink/40">
        09 &nbsp;/&nbsp; Let's talk
      </span>

      <h3 className="max-w-5xl font-display text-4xl font-medium leading-[0.95] tracking-tighter sm:text-6xl lg:text-[6.5vw]">
        <RevealWord text="Ready to build" />
        <br />
        <span className="italic">
          <RevealWord text="something bold?" />
        </span>
      </h3>

      <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="grid gap-1">
          <a href="mailto:yuustudio.in@gmail.com" className="font-display text-xl text-ink hover:text-accent">
            yuustudio.in@gmail.com
          </a>
          <a href="https://wa.me/919597673411" className="font-mono text-xs uppercase tracking-widest text-ink/50 hover:text-ink">
            WhatsApp +91 9597673411
          </a>
        </div>

        <MagneticButton
          as="a"
          href="#contact"
          className="group inline-flex h-14 items-center gap-3 rounded-full bg-accent px-8 text-sm font-medium text-void transition-colors hover:bg-white"
        >
          <span>Start a Project</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-0.5">
            <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </MagneticButton>
      </div>

      <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50">
        {quickLinks.map((link) => (
          <a key={link.label} href={link.href} className="transition-colors hover:text-ink">
            {link.label} -&gt;
          </a>
        ))}
      </div>
    </div>
  );
}

function ISTClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    });

    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="absolute right-6 top-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50 sm:right-8 sm:top-8">
      <span className="inline-block size-1.5 animate-pulse rounded-full bg-accent" />
      <span>IST</span>
      <span className="tabular-nums text-ink">{time || "--:--:--"}</span>
    </div>
  );
}
