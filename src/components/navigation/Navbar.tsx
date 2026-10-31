import React, { useState, useEffect } from 'react';
import { navLinks, siteConfig } from '../../data/site';
import { Button } from '../ui/Button';
import { Menu, X, MapPin, Zap } from 'lucide-react';
import { InstagramIcon } from '../ui/Icons';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#064A78]/90 backdrop-blur-xl border-b border-[#36B9E8]/20 py-3.5 shadow-xl shadow-[#042E4D]/40'
            : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Brand Wordmark */}
          <a
            href="#hero"
            className="flex items-center gap-2 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#36B9E8] rounded-lg p-1"
            aria-label="Jolt Coffee Homepage"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#0878B5] to-[#36B9E8] flex items-center justify-center shadow-md shadow-[#36B9E8]/30 group-hover:scale-105 transition-transform">
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-xl tracking-tight text-white flex items-center gap-1">
                JOLT
                <span className="text-[#36B9E8] text-xs font-semibold px-1.5 py-0.5 rounded bg-[#36B9E8]/20 border border-[#36B9E8]/40">
                  COFFEE
                </span>
              </span>
              <span className="text-[10px] tracking-widest text-[#36B9E8] uppercase -mt-0.5 font-medium">
                Pekanbaru
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors relative py-1 group focus:outline-none focus:text-[#36B9E8]"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#36B9E8] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA Action */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={siteConfig.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Follow us on Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>

            <a href="#location">
              <Button size="sm" variant="primary" icon={<MapPin className="w-3.5 h-3.5" />}>
                FIND US
              </Button>
            </a>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/10 text-white border border-white/20 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#36B9E8]"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#042E4D]/95 backdrop-blur-2xl transition-all duration-300 md:hidden flex flex-col justify-between pt-24 pb-8 px-6 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-6">
          <p className="text-xs uppercase tracking-widest text-[#36B9E8] font-semibold">Navigation</p>
          <nav className="flex flex-col gap-4">
            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-heading font-bold text-white hover:text-[#36B9E8] transition-colors py-1 flex items-center justify-between border-b border-white/10"
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <span>{link.name}</span>
                <span className="text-xs font-normal text-[#36B9E8]">0{idx + 1}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4 pt-6 border-t border-white/15">
          <div className="flex items-center justify-between text-xs text-white/70">
            <span>Pekanbaru, Riau</span>
            <span className="text-[#36B9E8]">{siteConfig.hours.display}</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full"
            >
              <Button size="sm" variant="primary" className="w-full">
                FIND US
              </Button>
            </a>
            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button size="sm" variant="secondary" className="w-full">
                WHATSAPP
              </Button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
