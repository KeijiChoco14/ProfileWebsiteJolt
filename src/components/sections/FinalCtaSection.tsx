import React from 'react';
import { Button } from '../ui/Button';
import { ArrowRight, MapPin, Zap } from 'lucide-react';
import { siteConfig } from '../../data/site';
import { EnergyBeanScene } from '../three/EnergyBeanScene';
import { Magnetic, Reveal } from '../ui/Motion';

interface FinalCtaSectionProps {
  onExploreMenu: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onExploreMenu }) => {
  return (
    <section className="relative py-28 sm:py-36 bg-gradient-to-b from-[#064A78] via-[#0878B5] to-[#042E4D] text-white overflow-hidden text-center">
      {/* 3D Interactive Floating Bean & Energy Field */}
      <EnergyBeanScene />

      {/* Dynamic Radial Energy Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#36B9E8]/20 rounded-full blur-[140px] pointer-events-none -z-0" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#0878B5]/40 rounded-full blur-[100px] pointer-events-none -z-0" />

      {/* Subtle Energy Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(54,185,232,0.15)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-5 sm:px-8 relative z-10 flex flex-col items-center">
        {/* Floating Brand Icon with 3D pulse */}
        <Reveal>
          <div
            className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#36B9E8] to-white flex items-center justify-center text-[#064A78] shadow-2xl shadow-[#36B9E8]/60 mb-8 animate-bounce transition-transform duration-300 hover:scale-110 hover:rotate-6 cursor-pointer"
            style={{ animationDuration: '3s' }}
          >
            <Zap className="w-8 h-8 fill-current" />
          </div>
        </Reveal>

        {/* Closing Headline */}
        <Reveal delay={0.1}>
          <h2 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white uppercase leading-[1.05] mb-6">
            Make Room For <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#DCF2FF] to-[#36B9E8] hero-shimmer">
              A Little Jolt.
            </span>
          </h2>
        </Reveal>

        {/* Subtitle */}
        <Reveal delay={0.2}>
          <p className="text-base sm:text-xl text-white/85 max-w-xl font-normal leading-relaxed mb-10">
            Whether you're starting your morning rush or catching up over an iced Spanish latte in Senapelan, the energy is waiting for you.
          </p>
        </Reveal>

        {/* Action CTAs with Magnetic physics */}
        <Reveal delay={0.3} className="flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <Button
              id="cta-explore-menu"
              variant="cream"
              size="lg"
              onClick={onExploreMenu}
              icon={<ArrowRight className="w-4 h-4 text-[#064A78]" />}
              className="group btn-shine shadow-2xl shadow-[#36B9E8]/30"
            >
              EXPLORE THE MENU
            </Button>
          </Magnetic>

          <Magnetic strength={0.25}>
            <a
              href={siteConfig.location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={-1}
            >
              <Button
                id="cta-find-counter"
                variant="secondary"
                size="lg"
                icon={<MapPin className="w-4 h-4 text-[#36B9E8]" />}
              >
                FIND OUR COUNTER
              </Button>
            </a>
          </Magnetic>
        </Reveal>

        {/* Hours ribbon */}
        <Reveal delay={0.4}>
          <p className="mt-8 text-xs tracking-widest text-[#36B9E8] uppercase font-semibold">
            Open Daily from {siteConfig.hours.display} • Jl. Riau No. 118, Pekanbaru
          </p>
        </Reveal>
      </div>
    </section>
  );
};
