import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring } from 'framer-motion';

/** Thin gradient bar at the top showing page scroll progress. */
export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left bg-gradient-to-r from-[#0878B5] via-[#36B9E8] to-white shadow-[0_0_12px_#36B9E8]"
      style={{ scaleX }}
    />
  );
};

/** Soft cyan spotlight + ring that follow the mouse (desktop only). */
export const CursorGlow: React.FC = () => {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [pressed, setPressed] = useState(false);
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const glowX = useSpring(x, { stiffness: 80, damping: 20, mass: 0.6 });
  const glowY = useSpring(y, { stiffness: 80, damping: 20, mass: 0.6 });
  const ringX = useSpring(x, { stiffness: 600, damping: 35 });
  const ringY = useSpring(y, { stiffness: 600, damping: 35 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    setEnabled(fine && !reduce);
    if (!fine || reduce) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[5] w-[520px] h-[520px] -ml-[260px] -mt-[260px] rounded-full mix-blend-screen"
        style={{
          x: glowX,
          y: glowY,
          background: 'radial-gradient(circle, rgba(54,185,232,0.16) 0%, rgba(8,120,181,0.08) 35%, transparent 70%)',
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[70] w-8 h-8 -ml-4 -mt-4 rounded-full border border-[#36B9E8]/70 mix-blend-difference transition-transform duration-150"
        style={{ x: ringX, y: ringY, scale: pressed ? 0.6 : 1 }}
      />
    </>
  );
};
