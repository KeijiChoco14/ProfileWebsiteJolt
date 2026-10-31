import React, { useState, useMemo } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { menuCategories, menuItems } from '../../data/menu';
import type { CategoryType, MenuItem } from '../../types';
import { Badge } from '../ui/Badge';
import { TiltCard, Depth } from '../ui/TiltCard';
import { Reveal } from '../ui/Motion';
import { Search, Snowflake, Flame, Sparkles, Filter, X } from 'lucide-react';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectItem }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tempFilter, setTempFilter] = useState<'all' | 'iced' | 'hot'>('all');
  const reduce = useReducedMotion();

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category match
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;

      // Temperature match
      const matchesTemp =
        tempFilter === 'all' ||
        item.temperature === 'both' ||
        item.temperature === tempFilter;

      // Search query match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        (item.tastingNotes && item.tastingNotes.some((n) => n.toLowerCase().includes(query)));

      return matchesCategory && matchesTemp && matchesSearch;
    });
  }, [activeCategory, tempFilter, searchQuery]);

  return (
    <section
      id="menu"
      className="relative py-24 sm:py-32 bg-[#064A78] text-white overflow-hidden"
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#36B9E8_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <Reveal className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <Badge variant="cyan" className="mb-4">
            FRESH EXTRACTION & REFRESHMENTS
          </Badge>
          <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white uppercase leading-[1.08]">
            Interactive <span className="text-[#36B9E8]">Menu Explorer.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/80 max-w-xl font-normal">
            Browse through our curated menu of single origin espressos, slow brews, layered non-coffee creations, and bakery pastries.
          </p>
        </Reveal>

        {/* Filter Controls Bar */}
        <div className="flex flex-col gap-6 mb-12">
          
          {/* Search & Temp Filter Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                type="text"
                placeholder="Search coffee, matcha, pastry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-full bg-white/10 border border-white/20 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#36B9E8] focus:ring-1 focus:ring-[#36B9E8] backdrop-blur-md transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Temperature Quick Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 self-stretch sm:self-auto justify-center">
              <button
                onClick={() => setTempFilter('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  tempFilter === 'all'
                    ? 'bg-[#36B9E8] text-[#064A78] shadow-sm'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                ALL TEMPS
              </button>
              <button
                onClick={() => setTempFilter('iced')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider flex items-center gap-1 transition-all cursor-pointer ${
                  tempFilter === 'iced'
                    ? 'bg-[#36B9E8] text-[#064A78] shadow-sm'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <Snowflake className="w-3.5 h-3.5" />
                ICED
              </button>
              <button
                onClick={() => setTempFilter('hot')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider flex items-center gap-1 transition-all cursor-pointer ${
                  tempFilter === 'hot'
                    ? 'bg-[#36B9E8] text-[#064A78] shadow-sm'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                HOT
              </button>
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" role="tablist" aria-label="Menu categories">
            {menuCategories.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`menu-tab-${cat.id}`}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-colors duration-300 border cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#36B9E8] ${
                    active
                      ? 'text-[#064A78] border-white'
                      : 'bg-white/5 text-white/80 border-white/15 hover:bg-white/15 hover:border-white/30'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="menu-active-pill"
                      className="absolute inset-0 rounded-full bg-white shadow-lg shadow-white/20"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Menu Items Grid */}
        {filteredItems.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout" initial={false}>
            {filteredItems.map((item, i) => (
              <motion.div
                key={item.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, rotateY: -70, scale: 0.85 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, rotateY: 70, scale: 0.85 }}
                transition={{ duration: 0.5, delay: reduce ? 0 : Math.min(i, 8) * 0.03, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformPerspective: 1000 }}
              >
              <TiltCard
                max={8}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${item.name}`}
                onClick={() => onSelectItem(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectItem(item);
                  }
                }}
                className="group h-full p-5 rounded-2xl bg-[#0B5486]/60 hover:bg-[#0B5486]/90 border border-white/10 hover:border-[#36B9E8]/50 transition-colors duration-300 hover:shadow-xl hover:shadow-[#0878B5]/30 flex gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#36B9E8]"
              >
                {/* Product Thumbnail */}
                <Depth z={40} className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 relative">
                  <div className="w-full h-full rounded-xl overflow-hidden bg-[#042E4D] shadow-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  </div>
                  {item.isSignature && (
                    <div className="absolute top-1 left-1 p-1 rounded-md bg-[#0878B5]/90 text-[#36B9E8]">
                      <Sparkles className="w-3 h-3" />
                    </div>
                  )}
                </Depth>

                {/* Info */}
                <Depth z={20} className="flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-heading font-bold text-base text-white group-hover:text-[#36B9E8] transition-colors leading-snug">
                        {item.name}
                      </h4>
                    </div>

                    <p className="text-xs text-white/70 line-clamp-2 leading-relaxed mb-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="font-heading font-bold text-sm text-[#36B9E8]">
                      {item.formattedPrice}
                    </span>

                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-white/80 font-medium capitalize">
                      {item.temperature}
                    </span>
                  </div>
                </Depth>
              </TiltCard>
            </motion.div>
          ))}
          </AnimatePresence>
        </motion.div>
      ) : (
          /* Empty State */
          <div className="py-20 text-center flex flex-col items-center justify-center rounded-3xl bg-white/5 border border-white/10">
            <Filter className="w-12 h-12 text-[#36B9E8]/60 mb-4 animate-bounce" />
            <h3 className="font-heading font-bold text-2xl text-white mb-2">No drinks found</h3>
            <p className="text-sm text-white/70 max-w-sm mb-6">
              We couldn't find any menu item matching "{searchQuery}". Try searching for cold brew, matcha, or croissant.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setTempFilter('all');
              }}
              className="px-6 py-2.5 rounded-full bg-[#36B9E8] text-[#064A78] text-xs font-bold tracking-wider hover:bg-white transition-colors cursor-pointer"
            >
              RESET FILTERS
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
