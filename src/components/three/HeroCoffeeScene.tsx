import React, { useCallback, useEffect, useRef, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  PresentationControls,
  Sparkles,
} from '@react-three/drei';
import confetti from 'canvas-confetti';
import { Zap, Hand, MousePointerClick } from 'lucide-react';
import { JoltCup } from './JoltCup';
import { StaticHeroFallback } from './StaticHeroFallback';
import { drinkPresets } from '../../data/drinkPresets';

interface HeroCoffeeSceneProps {
  onExploreMenu: () => void;
}

const ENERGY_PER_TAP = 25;

export const HeroCoffeeScene: React.FC<HeroCoffeeSceneProps> = ({ onExploreMenu }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [quality, setQuality] = useState<'high' | 'low'>('high');
  const [inView, setInView] = useState(true);
  const [drinkIndex, setDrinkIndex] = useState(0);
  const [joltSignal, setJoltSignal] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [fullyJolted, setFullyJolted] = useState(false);

  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const drink = drinkPresets[drinkIndex];

  // Capability checks
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    const isSmall = window.innerWidth < 768;
    const lowCores = (navigator.hardwareConcurrency || 8) <= 4;
    setQuality(isSmall || lowCores ? 'low' : 'high');

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Pointer + scroll stored in refs (no React re-render per frame)
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      scroll.current = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1.5);
    };
    onScroll();
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Stop rendering when the hero is off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: '100px',
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Energy slowly drains
  useEffect(() => {
    if (energy <= 0) return;
    const id = window.setTimeout(() => setEnergy((e) => Math.max(0, e - 2)), 120);
    return () => window.clearTimeout(id);
  }, [energy]);

  const fireConfetti = useCallback(() => {
    if (reducedMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    const origin = rect
      ? {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height * 0.45) / window.innerHeight,
        }
      : { x: 0.7, y: 0.5 };
    const colors = ['#36B9E8', '#0878B5', '#FFFFFF', '#C49A72'];
    confetti({ particleCount: 90, spread: 80, startVelocity: 42, origin, colors, scalar: 0.9 });
    confetti({ particleCount: 50, spread: 120, startVelocity: 30, origin, colors, shapes: ['circle'] });
  }, [reducedMotion]);

  const handleJolt = useCallback(() => {
    setJoltSignal((n) => n + 1);
    setEnergy((e) => {
      const next = e + ENERGY_PER_TAP;
      if (next >= 100) {
        fireConfetti();
        setFullyJolted(true);
        window.setTimeout(() => setFullyJolted(false), 2200);
        return 0;
      }
      return next;
    });
  }, [fireConfetti]);

  const cycleDrink = (index: number) => {
    setDrinkIndex(index);
    setJoltSignal((n) => n + 1);
  };

  if (!hasWebGL) {
    return <StaticHeroFallback onExploreMenu={onExploreMenu} />;
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[520px] sm:h-[600px] lg:h-[720px] flex items-center justify-center"
    >
      {/* Giant outlined wordmark behind the cup */}
      <span
        aria-hidden="true"
        className="hero-outline-word absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-heading font-bold leading-none select-none pointer-events-none"
      >
        JOLT
      </span>

      {/* Drink-tinted aura */}
      <div
        className="absolute w-80 h-80 md:w-[520px] md:h-[520px] rounded-full blur-[100px] -z-10 pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: `${drink.glow}55` }}
      />
      <div className="absolute w-60 h-60 rounded-full bg-[#36B9E8]/25 blur-[60px] -z-10 pointer-events-none" />

      <Suspense fallback={<StaticHeroFallback onExploreMenu={onExploreMenu} />}>
        <Canvas
          frameloop={inView ? 'always' : 'never'}
          camera={{ position: [0, 0.4, 6.4], fov: 40 }}
          dpr={quality === 'high' ? [1, 1.75] : [1, 1.25]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="w-full h-full touch-pan-y"
          onCreated={({ gl }) => {
            gl.toneMappingExposure = 1.15;
          }}
          aria-label="Interactive 3D Jolt Coffee cup. Drag to rotate, tap to give it a jolt."
        >
          <ambientLight intensity={0.5} color="#EAF3FA" />
          <directionalLight position={[4, 6, 4]} intensity={2} color="#FFFBF0" />
          <pointLight position={[-3, -1, -2]} intensity={4} color="#0878B5" distance={10} />
          <pointLight position={[3, 3, -2]} intensity={5} color={drink.glow} distance={10} />

          {/* Studio reflections built from light-formers (no external HDR download) */}
          <Environment resolution={256} frames={1}>
            <Lightformer form="rect" intensity={3} color="#FFFFFF" position={[0, 5, 2]} rotation-x={Math.PI / 2} scale={[10, 2, 1]} />
            <Lightformer form="rect" intensity={4} color="#36B9E8" position={[-5, 0.5, 1]} rotation-y={Math.PI / 2} scale={[4, 8, 1]} />
            <Lightformer form="rect" intensity={3} color="#0878B5" position={[5, 0.5, 1]} rotation-y={-Math.PI / 2} scale={[4, 8, 1]} />
            <Lightformer form="ring" intensity={2.5} color="#FFFFFF" position={[0, 1, 6]} scale={2.5} />
            <Lightformer form="rect" intensity={1.5} color="#C49A72" position={[0, -4, 0]} rotation-x={-Math.PI / 2} scale={[8, 8, 1]} />
          </Environment>

          <PresentationControls
            global={false}
            cursor
            snap
            speed={1.6}
            zoom={1}
            polar={[-0.35, 0.35]}
            azimuth={[-Math.PI, Math.PI]}
            damping={0.25}
          >
            <Float
              enabled={!reducedMotion}
              speed={1.6}
              rotationIntensity={0.25}
              floatIntensity={0.6}
              floatingRange={[-0.08, 0.08]}
            >
              <JoltCup
                drink={drink}
                pointer={pointer}
                scroll={scroll}
                joltSignal={joltSignal}
                onJolt={handleJolt}
                quality={quality}
                reducedMotion={reducedMotion}
              />
            </Float>
          </PresentationControls>

          <Sparkles
            count={quality === 'high' ? 60 : 25}
            scale={[7, 5, 4]}
            size={3}
            speed={reducedMotion ? 0 : 0.4}
            color="#36B9E8"
            opacity={0.8}
          />

          <ContactShadows
            position={[0, -1.85, 0]}
            opacity={0.55}
            scale={7}
            blur={2.6}
            far={3}
            resolution={quality === 'high' ? 512 : 256}
            color="#021A2D"
            frames={reducedMotion ? 1 : Infinity}
          />
        </Canvas>
      </Suspense>

      {/* Energy meter */}
      <div className="absolute top-4 right-2 sm:right-6 flex flex-col items-center gap-2 pointer-events-none">
        <div className="relative w-3 h-36 rounded-full bg-white/10 border border-white/20 overflow-hidden backdrop-blur-md">
          <div
            className="absolute bottom-0 inset-x-0 rounded-full bg-gradient-to-t from-[#0878B5] via-[#36B9E8] to-white transition-[height] duration-150 shadow-[0_0_20px_#36B9E8]"
            style={{ height: `${energy}%` }}
          />
        </div>
        <Zap
          className={`w-4 h-4 transition-all ${energy > 0 ? 'text-[#36B9E8] fill-[#36B9E8] scale-125' : 'text-white/50'}`}
        />
        <span className="text-[10px] tracking-[0.2em] uppercase text-white/60 font-semibold [writing-mode:vertical-rl]">
          Energy
        </span>
      </div>

      {/* "Fully jolted" toast */}
      <div
        role="status"
        aria-live="polite"
        className={`absolute top-10 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full bg-white text-[#064A78] font-heading font-bold text-sm tracking-wider shadow-2xl shadow-[#36B9E8]/50 flex items-center gap-2 transition-all duration-500 pointer-events-none ${
          fullyJolted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-90'
        }`}
      >
        <Zap className="w-4 h-4 fill-current" /> FULLY JOLTED!
      </div>

      {/* Drink switcher + hint */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 w-[min(100%,26rem)] px-3">
        <div
          role="group"
          aria-label="Choose a drink to preview in 3D"
          className="flex items-center gap-1 p-1 rounded-full bg-[#042E4D]/70 backdrop-blur-xl border border-white/15 shadow-xl"
        >
          {drinkPresets.map((d, i) => (
            <button
              key={d.id}
              id={`hero-drink-${d.id}`}
              type="button"
              aria-pressed={i === drinkIndex}
              onClick={() => cycleDrink(i)}
              className={`relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#36B9E8] ${
                i === drinkIndex ? 'bg-white text-[#064A78] shadow-lg' : 'text-white/75 hover:text-white hover:bg-white/10'
              }`}
            >
              <span
                className="w-3 h-3 rounded-full border border-white/50 shrink-0"
                style={{ background: `linear-gradient(180deg, ${d.top}, ${d.base})` }}
              />
              {d.shortName}
            </button>
          ))}
        </div>
        <p className="hidden sm:flex items-center gap-3 text-[11px] text-white/65 tracking-wide">
          <span className="flex items-center gap-1">
            <Hand className="w-3.5 h-3.5 text-[#36B9E8]" /> Drag to rotate
          </span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span className="flex items-center gap-1">
            <MousePointerClick className="w-3.5 h-3.5 text-[#36B9E8]" /> Tap the cup for a jolt
          </span>
        </p>
      </div>
    </div>
  );
};
