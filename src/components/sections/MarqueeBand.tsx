import React, { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { Zap } from 'lucide-react';

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

interface VelocityRowProps {
  items: string[];
  baseVelocity: number;
  className?: string;
}

/** Infinite marquee row whose speed + direction react to scroll velocity. */
const VelocityRow: React.FC<VelocityRowProps> = ({ items, baseVelocity, className = '' }) => {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const skew = useTransform(smoothVelocity, [-2000, 2000], [8, -8]);
  const direction = useRef(1);

  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) direction.current = -1;
    else if (vf > 0) direction.current = 1;
    moveBy += direction.current * moveBy * vf;
    baseX.set(baseX.get() + moveBy);
  });

  const content = (
    <>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-6 pr-6">
          <span>{item}</span>
          <Zap className="w-[0.6em] h-[0.6em] fill-current opacity-80 shrink-0" />
        </span>
      ))}
    </>
  );

  return (
    <div className={`overflow-hidden whitespace-nowrap flex ${className}`}>
      <motion.div className="flex whitespace-nowrap" style={{ x, skewX: reduce ? 0 : skew }}>
        {content}
        {content}
        {content}
        {content}
      </motion.div>
    </div>
  );
};

/** Two crossing, tilted marquee bands that sit between sections. */
export const MarqueeBand: React.FC = () => {
  const primary = ['A Little Jolt', 'A Lot Of Energy', 'Cold Brew', 'Spanish Latte', 'Blue Velvet', 'Pekanbaru'];
  const secondary = ['Experience The Energy', 'Crafted Espresso', 'Iconic Blue Counter', 'Jl. Riau 118', 'Contemporary Coffee Culture'];

  return (
    <section
      aria-label="Jolt Coffee highlights"
      className="relative h-44 sm:h-56 overflow-hidden bg-gradient-to-b from-[#0878B5] to-[#F5F0E7] flex items-center"
    >
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[4deg] bg-[#042E4D] py-3 sm:py-4 shadow-2xl">
        <VelocityRow
          items={secondary}
          baseVelocity={2}
          className="font-heading font-bold uppercase text-2xl sm:text-3xl text-white/25"
        />
      </div>
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 -rotate-[3deg] bg-[#36B9E8] py-3 sm:py-5 shadow-[0_20px_60px_-10px_rgba(4,46,77,0.6)] border-y-2 border-white/40">
        <VelocityRow
          items={primary}
          baseVelocity={-3}
          className="font-heading font-bold uppercase text-3xl sm:text-5xl text-[#042E4D]"
        />
      </div>
    </section>
  );
};
