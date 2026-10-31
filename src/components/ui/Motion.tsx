import React, { useRef } from 'react';
import { motion, useReducedMotion, useMotionValue, useSpring } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Starting Y offset in px */
  y?: number;
  /** Starting X-axis rotation (3D flip-up) */
  rotateX?: number;
  as?: 'div' | 'section' | 'li';
}

/** Fades + flips content up in 3D when it scrolls into view. */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  y = 48,
  rotateX = 14,
}) => {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, rotateX }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformPerspective: 1200, transformOrigin: '50% 100%' }}
    >
      {children}
    </motion.div>
  );
};

interface SplitWordsProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
}

/** Splits a line into words that flip up one-by-one in 3D. */
export const SplitWords: React.FC<SplitWordsProps> = ({
  text,
  className = '',
  wordClassName = '',
  delay = 0,
  stagger = 0.08,
}) => {
  const reduce = useReducedMotion();
  const words = text.split(' ');

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
            <motion.span
              className={`inline-block ${wordClassName}`}
              initial={reduce ? false : { y: '110%', rotateX: -80, opacity: 0 }}
              animate={{ y: '0%', rotateX: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformPerspective: 800, transformOrigin: '50% 100%' }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && '\u00A0'}
          </span>
        ))}
      </span>
    </span>
  );
};

/** Wrapper that pulls its child toward the cursor (magnetic hover). */
export const Magnetic: React.FC<{ children: React.ReactNode; strength?: number; className?: string }> = ({
  children,
  strength = 0.35,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 18, mass: 0.5 });
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 18, mass: 0.5 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};
