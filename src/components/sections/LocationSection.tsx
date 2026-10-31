import React from 'react';
import { siteConfig } from '../../data/site';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { MapPin, Clock, Navigation, ExternalLink, Info } from 'lucide-react';
import { InstagramIcon } from '../ui/Icons';
import { TiltCard, Depth } from '../ui/TiltCard';
import { Reveal, Magnetic } from '../ui/Motion';

export const LocationSection: React.FC = () => {
  return (
    <section
      id="location"
      className="relative py-24 sm:py-32 bg-[#064A78] text-white overflow-hidden"
    >
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#0878B5]/25 rounded-full blur-[140px] pointer-events-none -z-0" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#36B9E8]/15 rounded-full blur-[120px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <Reveal className="flex flex-col items-start max-w-3xl mb-16">
          <Badge variant="cyan" className="mb-4">
            VISIT PEKANBARU
          </Badge>
          <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white uppercase leading-[1.08]">
            Your Next Coffee Is <span className="text-[#36B9E8]">Closer Than You Think.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/80 font-normal">
            Located right along the bustling Jl. Riau corridor in Senapelan. Drop in for your daily caffeine boost or settle in with your laptop.
          </p>
        </Reveal>

        {/* 2-Column Grid: Location Details + Interactive Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Cards for Address, Hours, Contact */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {/* Address Card with 3D Tilt */}
            <Reveal delay={0.1}>
              <TiltCard
                max={9}
                className="p-7 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-[#36B9E8]/50 transition-colors shadow-lg"
              >
                <Depth z={25}>
                  <div className="flex items-center gap-3 text-[#36B9E8] mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#36B9E8]/20 flex items-center justify-center">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-white">Our Address</h3>
                  </div>
                  <p className="text-base text-white/95 font-medium leading-relaxed">
                    {siteConfig.location.fullAddress}
                  </p>
                  <p className="text-xs text-white/60 mt-2">
                    {siteConfig.location.landmark}
                  </p>
                </Depth>

                <Depth z={40} className="mt-6 pt-4 border-t border-white/10">
                  <Magnetic strength={0.2}>
                    <a
                      href={siteConfig.location.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                      tabIndex={-1}
                    >
                      <Button
                        id="location-directions-btn"
                        variant="primary"
                        size="sm"
                        icon={<Navigation className="w-3.5 h-3.5" />}
                        className="w-full btn-shine"
                      >
                        GET DIRECTIONS
                      </Button>
                    </a>
                  </Magnetic>
                </Depth>
              </TiltCard>
            </Reveal>

            {/* Hours Card with 3D Tilt */}
            <Reveal delay={0.2}>
              <TiltCard
                max={9}
                className="p-7 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-[#36B9E8]/50 transition-colors shadow-lg"
              >
                <Depth z={25}>
                  <div className="flex items-center gap-3 text-[#36B9E8] mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#36B9E8]/20 flex items-center justify-center">
                      <Clock className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-white">Opening Hours</h3>
                  </div>

                  <div className="space-y-2.5 text-sm">
                    <div className="flex items-center justify-between text-white/90">
                      <span>Monday — Friday</span>
                      <span className="font-semibold text-[#36B9E8]">{siteConfig.hours.weekdays}</span>
                    </div>
                    <div className="flex items-center justify-between text-white/90">
                      <span>Saturday — Sunday</span>
                      <span className="font-semibold text-[#36B9E8]">{siteConfig.hours.weekends}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Open Everyday — Dine-in & Takeaway</span>
                  </div>
                </Depth>
              </TiltCard>
            </Reveal>

            {/* Social & Contact Card with 3D Tilt */}
            <Reveal delay={0.3}>
              <TiltCard
                max={9}
                className="p-7 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-[#36B9E8]/50 transition-colors shadow-lg"
              >
                <Depth z={25}>
                  <div className="flex items-center gap-3 text-[#36B9E8] mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#36B9E8]/20 flex items-center justify-center">
                      <InstagramIcon className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-white">Connect & Inquiries</h3>
                  </div>

                  <div className="flex flex-col gap-3">
                    <a
                      href={siteConfig.contact.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-[#0878B5]/50 text-white transition-colors group"
                    >
                      <span className="text-sm font-medium">{siteConfig.contact.instagramHandle}</span>
                      <ExternalLink className="w-4 h-4 text-[#36B9E8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>

                    <a
                      href={siteConfig.contact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-[#25D366]/30 text-white transition-colors group"
                    >
                      <span className="text-sm font-medium">WhatsApp Customer Service</span>
                      <span className="text-xs text-[#36B9E8] font-bold group-hover:text-emerald-300">
                        CHAT NOW
                      </span>
                    </a>
                  </div>
                </Depth>
              </TiltCard>
            </Reveal>
          </div>

          {/* Right Column: Google Maps Embed with 3D Tilt Frame */}
          <Reveal delay={0.2} className="lg:col-span-7 flex flex-col">
            <TiltCard
              max={6}
              hoverScale={1.01}
              className="relative w-full h-[450px] lg:h-full min-h-[440px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#042E4D] group"
            >
              <iframe
                title="Jolt Coffee Pekanbaru Location Map"
                src={siteConfig.location.embedMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'contrast(1.1) brightness(0.95)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />

              {/* Map Floating Badge */}
              <Depth z={45} className="absolute top-4 left-4 p-4 rounded-2xl bg-[#064A78]/95 backdrop-blur-md border border-[#36B9E8]/40 shadow-xl max-w-xs text-white pointer-events-none">
                <div className="flex items-center gap-2 text-[#36B9E8] text-xs font-bold tracking-wider uppercase mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  Jolt Coffee Pekanbaru
                </div>
                <p className="text-xs text-white/80">Jl. Riau No. 118, Senapelan</p>
              </Depth>

              {/* Development Verification Notice */}
              <Depth z={35} className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-[11px] text-white/75 flex items-center gap-2 pointer-events-none">
                <Info className="w-4 h-4 text-[#36B9E8] flex-shrink-0" />
                <span>Jl. Riau No. 118, Senapelan, Pekanbaru • Dine-in & Takeaway</span>
              </Depth>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
