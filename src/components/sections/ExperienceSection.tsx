import React, { useState } from 'react';
import { Badge } from '../ui/Badge';
import { Sparkles, Eye, X, MapPin, Wifi, SunMedium, Coffee } from 'lucide-react';
import { TiltCard, Depth } from '../ui/TiltCard';
import { Reveal } from '../ui/Motion';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryPhoto {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
  description: string;
  aspectClass: string;
}

export const ExperienceSection: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const photos: GalleryPhoto[] = [
    {
      id: 'photo-counter',
      title: 'Architectural Blue Counter Bar',
      subtitle: 'The Heart of Jolt Coffee',
      image: '/images/jolt_counter_interior.jpg',
      tag: 'Interior Reference',
      description:
        'The signature cobalt blue curved architectural counter, warm wood finishes, illuminated JOLT COFFEE signage, and commercial espresso bar setup in Pekanbaru.',
      aspectClass: 'md:col-span-8 md:row-span-2 h-[420px] md:h-[540px]',
    },
    {
      id: 'photo-barista',
      title: 'Artisan Latte Extraction',
      subtitle: 'Barista Craftsmanship',
      image: '/images/jolt_barista_craft.jpg',
      tag: 'Craft',
      description:
        'Dialling in extraction profiles and hand-pouring silky textured microfoam into custom blue ceramic cups.',
      aspectClass: 'md:col-span-4 h-[250px] md:h-[258px]',
    },
    {
      id: 'photo-pastry',
      title: 'Fresh Daily Viennoiseries',
      subtitle: 'Bakery & Light Bites',
      image: '/images/jolt_pastry_food.jpg',
      tag: 'Pastry',
      description:
        'Artisanal double-baked almond croissants and cinnamon brioche baked fresh every morning to pair with single origin roasts.',
      aspectClass: 'md:col-span-4 h-[250px] md:h-[258px]',
    },
  ];

  return (
    <section
      id="space"
      className="relative py-24 sm:py-32 bg-[#042E4D] text-white overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#0878B5]/20 rounded-full blur-[140px] pointer-events-none -z-0" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#36B9E8]/15 rounded-full blur-[120px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Header */}
        <Reveal className="flex flex-col items-start max-w-3xl mb-14">
          <Badge variant="cyan" className="mb-4">
            SPATIAL & ATMOSPHERE
          </Badge>
          <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white uppercase leading-[1.08]">
            The Jolt <span className="text-[#36B9E8]">Experience.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/80 font-normal">
            An intentionally designed space where clean architectural minimalism meets warm Indonesian hospitality and serious specialty coffee.
          </p>
        </Reveal>

        {/* 3D Interactive Asymmetrical Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {photos.map((photo, idx) => (
            <Reveal key={photo.id} delay={idx * 0.15} className={photo.aspectClass}>
              <TiltCard
                max={9}
                role="button"
                tabIndex={0}
                aria-label={`View photo ${photo.title}`}
                onClick={() => setSelectedPhoto(photo)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedPhoto(photo);
                  }
                }}
                className="group relative w-full h-full rounded-3xl overflow-hidden cursor-pointer border border-white/10 hover:border-[#36B9E8]/60 shadow-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#36B9E8]"
              >
                {/* Image */}
                <div className="absolute inset-0 bg-[#064A78]">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#042E4D] via-[#042E4D]/25 to-transparent opacity-85 group-hover:opacity-70 transition-opacity" />
                </div>

                {/* Tag Badge (pop out in 3D) */}
                <Depth z={45} className="absolute top-4 left-4 pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-[#064A78]/85 backdrop-blur-md border border-[#36B9E8]/50 text-xs font-semibold text-[#36B9E8] flex items-center gap-1.5 shadow-lg">
                    <Sparkles className="w-3 h-3" />
                    {photo.tag}
                  </span>
                </Depth>

                {/* Hover Eye Icon (pops out further) */}
                <Depth z={65} className="absolute top-4 right-4 pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 group-hover:text-white group-hover:bg-[#36B9E8] group-hover:text-[#064A78] group-hover:scale-110 transition-all opacity-0 group-hover:opacity-100 shadow-xl">
                    <Eye className="w-4 h-4" />
                  </div>
                </Depth>

                {/* Caption Bottom Overlay (Depth pop-out) */}
                <Depth z={35} className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                  <p className="text-xs uppercase tracking-widest text-[#36B9E8] font-bold">
                    {photo.subtitle}
                  </p>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl mt-1 leading-snug">
                    {photo.title}
                  </h3>
                </Depth>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* Space Features Ribbon with 3D TiltCards */}
        <Reveal delay={0.2} className="mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <TiltCard
              max={8}
              className="p-7 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-[#36B9E8]/40 transition-colors"
            >
              <Depth z={30} className="flex flex-col gap-2">
                <div className="w-10 h-10 rounded-xl bg-[#36B9E8]/15 text-[#36B9E8] flex items-center justify-center mb-1">
                  <SunMedium className="w-5 h-5" />
                </div>
                <span className="text-xs text-[#36B9E8] font-bold tracking-wider uppercase">01 / Ambiance</span>
                <h4 className="font-heading font-bold text-lg text-white">Natural Light & High Ceilings</h4>
                <p className="text-xs text-white/70 leading-relaxed">
                  Spacious seating ideal for collaborative group work or quiet individual focus.
                </p>
              </Depth>
            </TiltCard>

            <TiltCard
              max={8}
              className="p-7 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-[#36B9E8]/40 transition-colors"
            >
              <Depth z={30} className="flex flex-col gap-2">
                <div className="w-10 h-10 rounded-xl bg-[#36B9E8]/15 text-[#36B9E8] flex items-center justify-center mb-1">
                  <Wifi className="w-5 h-5" />
                </div>
                <span className="text-xs text-[#36B9E8] font-bold tracking-wider uppercase">02 / Connectivity</span>
                <h4 className="font-heading font-bold text-lg text-white">High-Speed Wi-Fi & Outlets</h4>
                <p className="text-xs text-white/70 leading-relaxed">
                  Accessible power plugs at every table to keep your productivity fully energized.
                </p>
              </Depth>
            </TiltCard>

            <TiltCard
              max={8}
              className="p-7 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-[#36B9E8]/40 transition-colors"
            >
              <Depth z={30} className="flex flex-col gap-2">
                <div className="w-10 h-10 rounded-xl bg-[#36B9E8]/15 text-[#36B9E8] flex items-center justify-center mb-1">
                  <Coffee className="w-5 h-5" />
                </div>
                <span className="text-xs text-[#36B9E8] font-bold tracking-wider uppercase">03 / Barista Bar</span>
                <h4 className="font-heading font-bold text-lg text-white">Open Extraction Counter</h4>
                <p className="text-xs text-white/70 leading-relaxed">
                  Watch your manual pour-overs and espresso extraction performed live up close.
                </p>
              </Depth>
            </TiltCard>
          </div>
        </Reveal>
      </div>

      {/* Lightbox Modal with Framer Motion AnimatePresence */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full bg-[#064A78] rounded-3xl border border-[#36B9E8]/40 overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-[#36B9E8] hover:text-[#064A78] transition-colors cursor-pointer"
                aria-label="Close photo preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="md:col-span-8 bg-black/40 flex items-center justify-center max-h-[500px]">
                  <img
                    src={selectedPhoto.image}
                    alt={selectedPhoto.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="md:col-span-4 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <Badge variant="cyan" className="mb-3">
                      {selectedPhoto.tag}
                    </Badge>
                    <h3 className="font-heading font-bold text-2xl text-white mb-2 leading-tight">
                      {selectedPhoto.title}
                    </h3>
                    <p className="text-xs text-[#36B9E8] uppercase tracking-wider font-semibold mb-4">
                      {selectedPhoto.subtitle}
                    </p>
                    <p className="text-sm text-white/80 leading-relaxed font-normal">
                      {selectedPhoto.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex items-center gap-2 text-xs text-white/70">
                    <MapPin className="w-4 h-4 text-[#36B9E8]" />
                    <span>Jl. Riau No. 118, Pekanbaru</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
