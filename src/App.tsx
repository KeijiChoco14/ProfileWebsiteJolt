import { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { Navbar } from './components/navigation/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { MarqueeBand } from './components/sections/MarqueeBand';
import { BrandStorySection } from './components/sections/BrandStorySection';
import { SignatureDrinksSection } from './components/sections/SignatureDrinksSection';
import { MenuSection } from './components/sections/MenuSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { LocationSection } from './components/sections/LocationSection';
import { FinalCtaSection } from './components/sections/FinalCtaSection';
import { Footer } from './components/sections/Footer';
import { ItemModal } from './components/ui/Modal';
import { ScrollProgress, CursorGlow } from './components/ui/Effects';
import type { MenuItem } from './types';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from './data/site';

export function App() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-[#064A78] text-white selection:bg-[#36B9E8] selection:text-[#064A78]">
        {/* Scroll Progress Bar at top */}
        <ScrollProgress />

        {/* Ambient Interactive Cursor Spotlight (desktop only) */}
        <CursorGlow />

        {/* Global Navigation */}
        <Navbar />

        {/* Main Content Sections */}
        <main>
          {/* 1. Immersive 3D Hero */}
          <HeroSection onExploreMenu={() => scrollToSection('menu')} />

          {/* 2. Dynamic 3D Velocity Marquee Band */}
          <MarqueeBand />

          {/* 3. Brand Story / Spatial Identity */}
          <BrandStorySection />

          {/* 4. Signature Drinks 3D Showcase */}
          <SignatureDrinksSection
            onSelectItem={(item) => setSelectedItem(item)}
            onViewAllMenu={() => scrollToSection('menu')}
          />

          {/* 5. Interactive Menu Explorer with 3D Flip & Filters */}
          <MenuSection onSelectItem={(item) => setSelectedItem(item)} />

          {/* 6. The Jolt Experience & Physical Space with 3D Depth */}
          <ExperienceSection />

          {/* 7. Location & Contact Section with 3D Tilt Cards */}
          <LocationSection />

          {/* 8. Final Energy Call to Action with 3D Bean Field Climax */}
          <FinalCtaSection onExploreMenu={() => scrollToSection('menu')} />
        </main>

        {/* Footer */}
        <Footer />

        {/* Product Details Modal */}
        <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />

        {/* Floating WhatsApp Quick Action Button */}
        <a
          href={siteConfig.contact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center border-2 border-white/30 group"
          aria-label="Chat with Jolt Coffee on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 fill-white" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold pl-0 group-hover:pl-2">
            Chat With Us
          </span>
        </a>
      </div>
    </MotionConfig>
  );
}

export default App;
