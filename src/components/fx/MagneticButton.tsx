import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type Props = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
  as?: "button" | "a";
  href?: string;
  type?: "button" | "submit";
};

export function MagneticButton({
  children,
  className,
  onClick,
  strength = 0.35,
  as = "button",
  href,
  type = "button",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 20, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 250, damping: 20, mass: 0.3 });

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(finePointer && !reducedMotion);
  }, []);

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };
  const onLeave = () => {
    if (!enabled) return;
    x.set(0);
    y.set(0);
  };

  const commonProps = {
    ref: ref as never,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    onClick,
    className,
    style: { x: sx, y: sy },
  };

  if (as === "a") {
    return (
      <motion.a href={href} {...commonProps}>
        {children}
      </motion.a>
    );
  }
  return <motion.button type={type} {...commonProps}>{children}</motion.button>;
}
