import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Reveal, RevealWord } from "../Reveal";
import { MagneticButton } from "../fx/MagneticButton";

export function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const project = String(form.get("project") ?? "");
    const subject = encodeURIComponent(`Project inquiry from ${name || "Yuu Studios site"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nProject:\n${project}`);
    setSent(true);
    window.location.href = `mailto:hello@yuu.studio?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative z-10 border-t border-white/5 px-6 pb-20 pt-32 lg:px-12 lg:pb-24 lg:pt-40">
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-16">
          <Reveal>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/40">
              08 &nbsp;/&nbsp; Contact
            </span>
          </Reveal>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="relative"
        >
          <FinalFrameCorners />
          <a href="mailto:hello@yuu.studio" className="group block px-4 py-8 sm:px-8 lg:px-10">
            <h2 className="font-display text-[13vw] font-medium leading-[0.88] tracking-tighter text-balance transition-colors duration-500 group-hover:text-accent sm:text-[11vw] lg:text-[9vw]">
              <RevealWord text="Let's build" />
              <br />
              <span className="italic">
                <RevealWord text="something amazing." />
              </span>
            </h2>
          </a>
        </motion.div>

        <div className="mt-24 grid grid-cols-1 gap-16 lg:mt-32 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-6">
            {sent ? (
              <SuccessStamp />
            ) : (
              <form onSubmit={onSubmit} className="space-y-8">
                <Field label="01 / Your name" name="name" placeholder="Full name" index={0} />
                <Field label="02 / Email" name="email" type="email" placeholder="hello@yourbrand.com" index={1} />
                <Field
                  label="03 / Project"
                  name="project"
                  placeholder="A short description or link"
                  textarea
                  index={2}
                />
                <motion.div
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  className="pt-4"
                >
                  <MagneticButton
                    as="button"
                    type="submit"
                    className="group inline-flex items-center gap-3"
                  >
                    <span className="grid size-12 place-items-center rounded-full bg-accent text-void transition-colors group-hover:bg-white">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.3em]">
                      Send Inquiry
                    </span>
                  </MagneticButton>
                </motion.div>
              </form>
            )}
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:col-span-6 lg:pl-12">
            <ContactBlock label="Email" value="hello@yuu.studio" href="mailto:hello@yuu.studio" />
            <ContactBlock label="Phone" value="+49 30 555 0142" href="tel:+493055501420" />
            <ContactBlock label="Studio" value={`Kottbusser Damm 72\n10967 Berlin, DE`} />
            <div>
              <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.3em] text-ink/40">
                Links
              </span>
              <ul className="space-y-2 text-sm">
                {[
                  { label: "Selected work", href: "#work" },
                  { label: "Services", href: "#services" },
                  { label: "Studio", href: "#studio" },
                  { label: "Email", href: "mailto:hello@yuu.studio" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-3 text-ink transition-colors hover:text-accent"
                    >
                      <span className="inline-block h-px w-4 bg-ink/30 transition-all group-hover:w-8 group-hover:bg-accent" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalFrameCorners() {
  const line = {
    hidden: { scaleX: 0, scaleY: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="pointer-events-none absolute inset-0">
      <motion.span variants={line} className="absolute left-0 top-0 h-px w-20 origin-left bg-white/18" />
      <motion.span variants={line} className="absolute left-0 top-0 h-20 w-px origin-top bg-white/18" />
      <motion.span variants={line} className="absolute right-0 top-0 h-px w-20 origin-right bg-white/18" />
      <motion.span variants={line} className="absolute right-0 top-0 h-20 w-px origin-top bg-white/18" />
      <motion.span variants={line} className="absolute bottom-0 left-0 h-px w-20 origin-left bg-white/18" />
      <motion.span variants={line} className="absolute bottom-0 left-0 h-20 w-px origin-bottom bg-white/18" />
      <motion.span variants={line} className="absolute bottom-0 right-0 h-px w-20 origin-right bg-white/18" />
      <motion.span variants={line} className="absolute bottom-0 right-0 h-20 w-px origin-bottom bg-white/18" />
    </div>
  );
}

function SuccessStamp() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-md border border-white/10 bg-surface p-8"
    >
      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-8 top-8 h-px w-32 origin-left bg-accent"
      />
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.22 }}
        className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-accent"
      >
        Inquiry received
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
        className="mt-3 font-display text-2xl"
      >
        Thanks. We'll be in touch.
      </motion.p>
      <p className="mt-2 text-sm text-ink/60">
        A member of the studio will reply within one business day.
      </p>
    </motion.div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  textarea,
  index,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
  index: number;
}) {
  return (
    <motion.label
      initial={{ opacity: 0, x: -18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="block"
    >
      <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.3em] text-ink/40">
        {label}
      </span>
      <div className="group relative border-b border-white/15 transition-colors focus-within:border-accent">
        <span className="pointer-events-none absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 group-focus-within:scale-x-100" />
        {textarea ? (
          <textarea
            name={name}
            required
            rows={2}
            placeholder={placeholder}
            className="w-full resize-none bg-transparent py-3 text-base placeholder:text-ink/25 focus:outline-none"
          />
        ) : (
          <input
            name={name}
            type={type}
            required
            placeholder={placeholder}
            className="w-full bg-transparent py-3 text-base placeholder:text-ink/25 focus:outline-none"
          />
        )}
      </div>
    </motion.label>
  );
}

function ContactBlock({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <span className="whitespace-pre-line text-base text-ink transition-colors group-hover:text-accent">
      {value}
    </span>
  );
  return (
    <div>
      <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.3em] text-ink/40">
        {label}
      </span>
      {href ? (
        <a href={href} className="group inline-block">
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
}
