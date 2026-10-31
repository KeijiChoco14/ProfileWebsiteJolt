import React from 'react';
import { siteConfig, navLinks } from '../../data/site';
import { Zap, MapPin, Clock, ArrowUp } from 'lucide-react';
import { InstagramIcon } from '../ui/Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#042E4D] text-white pt-20 pb-12 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Info (Cols 1-5) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#0878B5] to-[#36B9E8] flex items-center justify-center text-white">
                <Zap className="w-4 h-4 fill-current" />
              </div>
              <span className="font-heading font-black text-2xl tracking-tight text-white flex items-center gap-1.5">
                JOLT
                <span className="text-[#36B9E8] text-xs font-semibold px-1.5 py-0.5 rounded bg-[#36B9E8]/20 border border-[#36B9E8]/40">
                  COFFEE
                </span>
              </span>
            </div>

            <p className="text-sm text-white/75 max-w-sm leading-relaxed mb-6 font-normal">
              Translating Pekanbaru's contemporary coffee culture through bold architectural blue identity, slow-crafted roasts, and uncompromised energy.
            </p>

            <div className="flex items-center gap-3">
              <a
                href={siteConfig.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-[#0878B5] transition-colors"
                aria-label="Jolt Coffee Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-[#0878B5] transition-colors"
                aria-label="Google Maps Location"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Nav Links (Cols 6-8) */}
          <div className="lg:col-span-3">
            <h4 className="font-heading font-bold text-sm tracking-wider uppercase text-[#36B9E8] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Hours (Cols 9-12) */}
          <div className="lg:col-span-4 flex flex-col gap-4 text-sm">
            <h4 className="font-heading font-bold text-sm tracking-wider uppercase text-[#36B9E8] mb-1">
              Coffee Counter
            </h4>
            
            <div className="flex items-start gap-2.5 text-white/80">
              <MapPin className="w-4 h-4 text-[#36B9E8] flex-shrink-0 mt-0.5" />
              <span>{siteConfig.location.fullAddress}</span>
            </div>

            <div className="flex items-center gap-2.5 text-white/80">
              <Clock className="w-4 h-4 text-[#36B9E8] flex-shrink-0" />
              <span>{siteConfig.hours.display}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 mt-2 text-xs text-white/60">
              {siteConfig.disclaimer}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {new Date().getFullYear()} Jolt Coffee. All rights reserved. Pekanbaru, Indonesia.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-white/70 hover:text-[#36B9E8] transition-colors cursor-pointer group"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
};
