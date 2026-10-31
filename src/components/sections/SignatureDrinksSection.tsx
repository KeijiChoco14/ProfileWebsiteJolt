import React from 'react';
import { signatureDrinks } from '../../data/menu';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { TiltCard, Depth } from '../ui/TiltCard';
import { Reveal } from '../ui/Motion';
import { Sparkles, ArrowRight, Snowflake, Flame, Plus } from 'lucide-react';
import type { MenuItem } from '../../types';

interface SignatureDrinksSectionProps {
  onSelectItem: (item: MenuItem) => void;
  onViewAllMenu: () => void;
}

export const SignatureDrinksSection: React.FC<SignatureDrinksSectionProps> = ({
  onSelectItem,
  onViewAllMenu,
}) => {
  return (
    <section
      id="signature"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-[#0878B5] via-[#064A78] to-[#042E4D] text-white overflow-hidden"
    >
      {/* Background Accent Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#36B9E8]/15 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#0878B5]/25 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <Badge variant="cyan" className="mb-4">
              CRAFTED SPECIALTIES
            </Badge>
            <h2 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white uppercase leading-[1.08]">
              Meet Your <span className="text-[#36B9E8]">Next Favorite.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/80 font-normal">
              Distinctive beverage recipes crafted by our baristas to celebrate taste, texture, and visual excitement.
            </p>
          </div>

          <Button
            id="signature-view-menu"
            variant="secondary"
            onClick={onViewAllMenu}
            icon={<ArrowRight className="w-4 h-4" />}
            className="self-start sm:self-auto group"
          >
            VIEW FULL MENU
          </Button>
        </Reveal>

        {/* 3D Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {signatureDrinks.map((drink, i) => (
            <Reveal key={drink.id} delay={(i % 3) * 0.12}>
              <TiltCard
                max={12}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${drink.name}`}
                onClick={() => onSelectItem(drink)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectItem(drink);
                  }
                }}
                className="group rounded-3xl bg-[#0A3C61]/80 border border-white/10 hover:border-[#36B9E8]/60 transition-colors duration-500 shadow-xl hover:shadow-2xl hover:shadow-[#36B9E8]/25 flex flex-col cursor-pointer h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#36B9E8]"
              >
                {/* Big index number floating behind */}
                <Depth z={-30} className="absolute -top-8 -right-2 pointer-events-none">
                  <span className="font-heading font-bold text-[7rem] leading-none text-white/[0.06] select-none">
                    0{i + 1}
                  </span>
                </Depth>

                {/* Product Image */}
                <div className="relative w-full h-72 sm:h-80 overflow-hidden rounded-t-3xl bg-[#042E4D]">
                  <img
                    src={drink.image}
                    alt={drink.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A3C61] via-transparent to-transparent" />
                </div>

                {/* Badges (pop out) */}
                <Depth z={50} className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-[#0878B5] border border-[#36B9E8]/50 text-xs font-bold text-white tracking-wide flex items-center gap-1 shadow-lg">
                    <Sparkles className="w-3 h-3 text-[#36B9E8]" />
                    SIGNATURE
                  </span>

                  <span className="px-2.5 py-1 rounded-full bg-black/60 border border-white/20 text-xs font-medium text-white flex items-center gap-1 shadow-lg">
                    {drink.temperature === 'iced' && <Snowflake className="w-3 h-3 text-[#36B9E8]" />}
                    {drink.temperature === 'hot' && <Flame className="w-3 h-3 text-orange-400" />}
                    {drink.temperature === 'both' && (
                      <>
                        <Snowflake className="w-3 h-3 text-[#36B9E8]" />
                        <span className="text-[10px]">/</span>
                        <Flame className="w-3 h-3 text-orange-400" />
                      </>
                    )}
                    <span className="capitalize">{drink.temperature}</span>
                  </span>
                </Depth>

                {/* Price pill (pops out further) */}
                <Depth z={80} className="absolute right-4 top-[15.5rem] sm:top-[17.5rem] pointer-events-none">
                  <div className="px-4 py-2 rounded-full bg-[#36B9E8] text-[#064A78] font-heading font-bold text-sm tracking-wide shadow-[0_10px_30px_-5px_rgba(54,185,232,0.8)]">
                    {drink.formattedPrice}
                  </div>
                </Depth>

                {/* Product Content */}
                <Depth z={25} className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-2xl text-white group-hover:text-[#36B9E8] transition-colors mb-2.5 pr-6">
                      {drink.name}
                    </h3>
                    <p className="text-sm text-white/75 leading-relaxed mb-6 font-normal">{drink.description}</p>
                  </div>

                  {drink.tastingNotes && drink.tastingNotes.length > 0 && (
                    <div className="pt-4 border-t border-white/10 flex flex-wrap gap-1.5 items-center">
                      <span className="text-[10px] tracking-wider uppercase text-white/50 mr-1 font-semibold">
                        Notes:
                      </span>
                      {drink.tastingNotes.map((note) => (
                        <span
                          key={note}
                          className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/15"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  )}
                </Depth>

                {/* Hover "open" affordance */}
                <Depth z={60} className="absolute bottom-6 right-6 pointer-events-none">
                  <span className="w-10 h-10 rounded-full bg-white text-[#064A78] flex items-center justify-center shadow-xl opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                    <Plus className="w-5 h-5" />
                  </span>
                </Depth>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
