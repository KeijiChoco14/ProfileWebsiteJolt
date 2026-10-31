import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { HeroCoffeeScene } from '../three/HeroCoffeeScene';
import { Button } from '../ui/Button';
import { Magnetic, SplitWords } from '../ui/Motion';
import { ArrowRight, Sparkles, MapPin } from 'lucide-react';

interface HeroSectionProps {
  onExploreMenu: () => void;
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreMenu }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Scroll-driven exit: copy drifts up + fades, scene recedes
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  // Pointer-driven parallax for background layers
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const layer1X = useTransform(sx, (v) => v * 40);
  const layer1Y = useTransform(sy, (v) => v * 40);
  const layer2X = useTransform(sx, (v) => v * -70);
  const layer2Y = useTransform(sy, (v) => v * -50);
  const gridX = useTransform(sx, (v) => v * 15);
  const gridY = useTransform(sy, (v) => v * 15);

  const handleMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse') return;
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      onPointerMove={handleMove}
      className="relative min-h-screen pt-28 pb-16 lg:pt-32 lg:pb-24 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#042E4D] via-[#064A78] to-[#0878B5] bg-subtle-noise"
    >
      {/* Parallax light layers */}
      <motion.div
        style={{ x: layer1X, y: layer1Y }}
        className="absolute top-1/4 left-1/3 w-[700px] h-[700px] bg-[#0878B5]/35 rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        style={{ x: layer2X, y: layer2Y }}
        className="absolute top-1/3 right-0 w-[420px] h-[420px] bg-[#36B9E8]/25 rounded-full blur-[120px] pointer-events-none"
      />

      {/* 3D perspective floor grid */}
      <div className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none [perspective:600px] overflow-hidden">
        <motion.div style={{ x: gridX, y: gridY }} className="hero-floor-grid absolute inset-[-50%_-50%_0_-50%]" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          {/* Left: copy */}
          <motion.div
            style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}
            className="lg:col-span-6 flex flex-col justify-center text-left"
          >
            <motion.div
              {...fadeUp(0.1)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0878B5]/40 border border-[#36B9E8]/40 text-[#36B9E8] text-xs font-semibold tracking-wider uppercase backdrop-blur-md mb-6 w-fit shadow-md shadow-[#0878B5]/20"
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
              <span>Contemporary Coffee Culture • Pekanbaru</span>
            </motion.div>

            <h1 className="font-heading font-bold text-4xl sm:text-6xl xl:text-7xl leading-[1.04] tracking-tight text-white mb-6 uppercase">
              <SplitWords text="A Little Jolt." delay={0.2} className="block" />
              <SplitWords
                text="A Lot Of Energy."
                delay={0.45}
                className="block"
                wordClassName="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#DCF2FF] to-[#36B9E8] hero-shimmer"
              />
            </h1>

            <motion.p
              {...fadeUp(0.8)}
              className="text-base sm:text-xl text-white/85 max-w-xl font-normal leading-relaxed mb-8"
            >
              Discover your next coffee moment. Crafted espresso, slow-steeped cold brews, and signature creations
              inside our iconic blue architectural space.
            </motion.p>

            <motion.div {...fadeUp(0.95)} className="flex flex-wrap items-center gap-4 mb-10">
              <Magnetic>
                <Button
                  id="hero-explore-menu"
                  variant="primary"
                  size="lg"
                  onClick={onExploreMenu}
                  icon={<ArrowRight className="w-4 h-4" />}
                  className="group btn-shine"
                >
                  EXPLORE THE MENU
                </Button>
              </Magnetic>

              <Magnetic strength={0.25}>
                <a href="#location" tabIndex={-1}>
                  <Button
                    id="hero-find-us"
                    variant="secondary"
                    size="lg"
                    icon={<MapPin className="w-4 h-4 text-[#36B9E8]" />}
                  >
                    FIND YOUR JOLT
                  </Button>
                </a>
              </Magnetic>
            </motion.div>

            <motion.div
              {...fadeUp(1.1)}
              className="pt-6 border-t border-white/15 grid grid-cols-3 gap-4 max-w-lg"
            >
              {[
                { value: '18', unit: 'H', label: 'Slow Cold Steeped' },
                { value: '100', unit: '%', label: 'Specialty Arabica' },
                { value: '#0878B5', unit: '', label: 'Iconic Blue Identity' },
              ].map((stat) => (
                <div key={stat.label} className="group cursor-default">
                  <p className="font-heading font-bold text-xl sm:text-2xl text-white flex items-center gap-1 transition-transform duration-300 group-hover:-translate-y-1">
                    {stat.value}
                    {stat.unit && <span className="text-[#36B9E8] text-base">{stat.unit}</span>}
                  </p>
                  <p className="text-xs text-white/70">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: interactive 3D scene */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.85, rotateY: -25 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={reduce ? { transformPerspective: 1200 } : { y: sceneY, transformPerspective: 1200 }}
            className="lg:col-span-6 relative flex items-center justify-center"
          >
            <HeroCoffeeScene onExploreMenu={onExploreMenu} />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#story"
        aria-label="Scroll to Brand Story"
        className="absolute bottom-5 left-6 sm:left-1/2 sm:-translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors group z-20"
      >
        <span className="text-[11px] uppercase tracking-widest font-semibold group-hover:text-[#36B9E8]">
          Scroll to explore
        </span>
        <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1 group-hover:border-[#36B9E8]">
          <div className="w-1.5 h-2 rounded-full bg-[#36B9E8] animate-bounce" />
        </div>
      </a>
    </section>
  );
};
