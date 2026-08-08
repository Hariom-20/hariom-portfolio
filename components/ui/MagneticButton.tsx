"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { type ReactNode, useRef } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
  ariaLabel?: string;
  target?: string;
  rel?: string;
};

export default function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  strength = 0.35,
  ariaLabel,
  target,
  rel,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const commonProps = {
    ref: ref as never,
    onMouseMove: handleMove,
    onMouseLeave: reset,
    onClick,
    className,
    style: { x: sx, y: sy },
    "aria-label": ariaLabel,
  };

  if (href) {
    return (
      <motion.a href={href} target={target} rel={rel} {...commonProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" {...commonProps}>
      {children}
    </motion.button>
  );
}
