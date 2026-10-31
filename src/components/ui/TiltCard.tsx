import React, { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface TiltCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode;
  /** Max rotation in degrees */
  max?: number;
  /** Hover scale */
  hoverScale?: number;
  /** Show moving light glare */
  glare?: boolean;
  /** Glare tint */
  glareColor?: string;
}

/**
 * Card that tilts in 3D toward the pointer with a moving specular glare.
 * Children can use <Depth z={..}> to pop out of the card plane.
 */
export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  max = 10,
  hoverScale = 1.02,
  glare = true,
  glareColor = 'rgba(255,255,255,0.35)',
  className = '',
  style,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const hover = useMotionValue(0);

  const springCfg = { stiffness: 220, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), springCfg);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), springCfg);
  const scale = useSpring(useTransform(hover, [0, 1], [1, hoverScale]), springCfg);
  const glareOpacity = useSpring(hover, springCfg);

  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, ${glareColor}, transparent 55%)`;

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const handleEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return;
    hover.set(1);
  };

  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
    hover.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      style={{
        rotateX: reduce ? 0 : rotateX,
        rotateY: reduce ? 0 : rotateY,
        scale: reduce ? 1 : scale,
        transformPerspective: 1100,
        transformStyle: 'preserve-3d',
        ...style,
      }}
      className={`relative will-change-transform ${className}`}
      {...rest}
    >
      {children}
      {glare && !reduce && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-overlay z-30"
          style={{ background: glareBg, opacity: glareOpacity }}
        />
      )}
    </motion.div>
  );
};

/** Pushes children forward along Z inside a TiltCard. */
export const Depth: React.FC<{ z?: number; className?: string; children: React.ReactNode }> = ({
  z = 40,
  className = '',
  children,
}) => (
  <div className={className} style={{ transform: `translateZ(${z}px)`, transformStyle: 'preserve-3d' }}>
    {children}
  </div>
);
