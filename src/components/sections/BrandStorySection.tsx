import React from 'react';
import { Sparkles, Compass, ShieldCheck, Heart } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { TiltCard, Depth } from '../ui/TiltCard';
import { Reveal } from '../ui/Motion';

export const BrandStorySection: React.FC = () => {
  return (
    <section
      id="story"
      className="relative py-24 sm:py-32 bg-[#F5F0E7] text-[#171C20] overflow-hidden"
    >
      {/* Decorative Warm Wood Accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0878B5] via-[#C49A72] to-[#36B9E8]" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <Reveal className="flex flex-col items-start max-w-3xl mb-16">
          <Badge variant="wood" className="mb-4">
            OUR SPATIAL & BRAND IDENTITY
          </Badge>
          <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#171C20] uppercase leading-[1.08]">
            More Than A <span className="text-[#0878B5]">Coffee Break.</span>
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-[#171C20]/80 leading-relaxed font-normal">
            Rooted in Pekanbaru, Jolt Coffee is built upon a distinct architectural philosophy: bold electric blue surfaces, warm wood textures, and an unapologetic passion for contemporary espresso culture.
          </p>
        </Reveal>

        {/* Editorial Layout: Large Showcase Image + Story Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Authentic Counter Interior Image */}
          <Reveal className="lg:col-span-7">
          <TiltCard max={7} hoverScale={1.01} className="relative group rounded-3xl">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#171C20]/25 border-4 border-white">
              <img
                src="/images/jolt_counter_interior.jpg"
                alt="Jolt Coffee Pekanbaru Blue Counter Interior"
                className="w-full h-[420px] sm:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171C20]/70 via-transparent to-transparent" />
              
              {/* Photo Attribution Badge */}
              <div className="absolute bottom-5 left-5 right-5 sm:right-auto text-white flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs tracking-wider uppercase text-[#36B9E8] font-bold">Physical Reference</p>
                  <p className="text-sm font-semibold font-heading">Jolt Coffee Counter & Architectural Bar</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium text-white border border-white/30">
                  Jl. Riau No. 118, Pekanbaru
                </div>
              </div>
            </div>

            {/* Overlapping Warm Wood Floating Card (pops out in 3D) */}
            <Depth z={70} className="hidden sm:flex absolute -bottom-6 -right-6 p-6 rounded-2xl bg-[#FFFFFF] shadow-2xl shadow-[#171C20]/20 border border-[#C49A72]/30 max-w-xs flex-col gap-2">
              <div className="flex items-center gap-2 text-[#0878B5]">
                <Sparkles className="w-5 h-5 text-[#0878B5]" />
                <span className="font-heading font-bold text-sm">Visual Contrast</span>
              </div>
              <p className="text-xs text-[#171C20]/75 leading-relaxed">
                The striking cobalt blue counter harmonizes with organic warm wood countertops to create an energetic yet comfortable sanctuary.
              </p>
            </Depth>
          </TiltCard>
          </Reveal>

          {/* Right Column: Three Core Narrative Pillars */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {[
              {
                icon: <Compass className="w-6 h-6" />,
                iconClass: 'bg-[#0878B5]/10 text-[#0878B5]',
                title: 'Bold Architectural Identity',
                body: 'Rejecting monotonous cafés, our space utilizes a signature royal blue curved canopy and illuminated lettering that immediately signals energy upon walking through the doors.',
              },
              {
                icon: <ShieldCheck className="w-6 h-6" />,
                iconClass: 'bg-[#C49A72]/15 text-[#9B7045]',
                title: 'Precision Brewing Standards',
                body: 'Every espresso shot, slow-dripped cold brew, and signature foam is dialled in on commercial equipment to ensure consistent notes of cocoa, fruit, and sweet cream.',
              },
              {
                icon: <Heart className="w-6 h-6" />,
                iconClass: 'bg-[#36B9E8]/15 text-[#0878B5]',
                title: 'Vibrant Urban Community',
                body: 'Whether you need a morning boost, a quiet corner to study, or an evening gathering spot with friends in Senapelan, Jolt is built for your everyday rituals.',
              },
            ].map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 0.12}>
                <TiltCard
                  max={9}
                  glareColor="rgba(54,185,232,0.35)"
                  className="p-6 sm:p-7 rounded-2xl bg-white shadow-sm border border-[#171C20]/10 hover:shadow-xl hover:shadow-[#0878B5]/10 transition-shadow"
                >
                  <Depth z={35}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${pillar.iconClass}`}>
                      {pillar.icon}
                    </div>
                  </Depth>
                  <Depth z={20}>
                    <h3 className="font-heading font-bold text-xl text-[#171C20] mb-2">{pillar.title}</h3>
                    <p className="text-sm text-[#171C20]/75 leading-relaxed">{pillar.body}</p>
                  </Depth>
                </TiltCard>
              </Reveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
