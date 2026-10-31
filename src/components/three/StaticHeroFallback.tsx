import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface StaticHeroFallbackProps {
  onExploreMenu: () => void;
}

export const StaticHeroFallback: React.FC<StaticHeroFallbackProps> = ({ onExploreMenu }) => {
  return (
    <div className="relative w-full h-[520px] md:h-[640px] flex items-center justify-center">
      {/* Radiant Glow Behind Cup */}
      <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-[#0878B5]/40 blur-3xl animate-pulse -z-10" />
      <div className="absolute w-48 h-48 rounded-full bg-[#36B9E8]/30 blur-2xl -z-10" />

      {/* Hero Product Visual Display */}
      <div className="relative group cursor-pointer" onClick={onExploreMenu}>
        <div className="relative z-10 w-64 md:w-80 h-80 md:h-[420px] rounded-3xl overflow-hidden border-2 border-[#36B9E8]/40 shadow-2xl shadow-[#0878B5]/50 transition-all duration-700 group-hover:scale-105 group-hover:border-[#36B9E8]">
          <img
            src="/images/jolt_signature_coldbrew.jpg"
            alt="Jolt Signature Cold Brew"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#064A78] via-transparent to-transparent opacity-80" />
          
          {/* Badge Overlay */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#064A78]/80 backdrop-blur-md border border-[#36B9E8]/60 text-xs font-semibold text-[#36B9E8]">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            <span>SIGNATURE BREW</span>
          </div>

          <div className="absolute bottom-5 left-5 right-5 text-white">
            <p className="text-xs tracking-widest text-[#36B9E8] uppercase font-semibold">Slow Steeped 18H</p>
            <h3 className="text-xl font-bold font-heading">Jolt Cold Foam Brew</h3>
            <p className="text-xs text-white/80 mt-1 flex items-center gap-1">
              Click to view menu <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </p>
          </div>
        </div>

        {/* Orbiting Aesthetic Floating Pill */}
        <div className="absolute -bottom-4 -left-6 md:-left-8 px-4 py-2.5 rounded-2xl bg-[#064A78]/90 backdrop-blur-md border border-white/20 shadow-xl text-xs flex items-center gap-2 text-white animate-bounce" style={{ animationDuration: '4s' }}>
          <span className="w-2.5 h-2.5 rounded-full bg-[#36B9E8] animate-ping" />
          <span className="font-medium">100% Arabica Blend</span>
        </div>
      </div>
    </div>
  );
};
