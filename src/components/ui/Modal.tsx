import React, { useEffect } from 'react';
import type { MenuItem } from '../../types';
import { Badge } from './Badge';
import { Button } from './Button';
import { X, Sparkles, Snowflake, Flame, MessageCircle, MapPin } from 'lucide-react';

interface ItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const ItemModal: React.FC<ItemModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && item) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  const whatsappInquiryUrl = `https://wa.me/6281270001928?text=${encodeURIComponent(
    `Halo Jolt Coffee, saya mau tanya ketersediaan menu "${item.name}" (${item.formattedPrice}) di counter Jl. Riau.`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full bg-[#064A78] rounded-3xl border border-[#36B9E8]/40 overflow-hidden shadow-2xl flex flex-col md:flex-row text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="md:w-1/2 relative bg-[#042E4D] h-64 md:h-auto min-h-[260px]">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#064A78] via-transparent to-transparent opacity-80" />

          {item.isSignature && (
            <div className="absolute top-4 left-4">
              <Badge variant="cyan" className="shadow-lg">
                <Sparkles className="w-3 h-3" />
                SIGNATURE RECIPE
              </Badge>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-wider text-[#36B9E8] font-bold">
                {item.category}
              </span>
              <span className="text-white/40">•</span>
              <span className="text-xs text-white/70 flex items-center gap-1">
                {item.temperature === 'iced' && <Snowflake className="w-3 h-3 text-[#36B9E8]" />}
                {item.temperature === 'hot' && <Flame className="w-3 h-3 text-orange-400" />}
                <span className="capitalize">{item.temperature}</span>
              </span>
            </div>

            <h3 className="font-heading font-bold text-2xl text-white mb-2 leading-tight">
              {item.name}
            </h3>

            <p className="font-heading font-bold text-xl text-[#36B9E8] mb-4">
              {item.formattedPrice}
            </p>

            <p className="text-sm text-white/80 leading-relaxed font-normal mb-6">
              {item.description}
            </p>

            {item.tastingNotes && item.tastingNotes.length > 0 && (
              <div className="mb-6">
                <p className="text-xs tracking-wider uppercase text-white/60 mb-2 font-semibold">
                  Tasting Notes
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.tastingNotes.map((note) => (
                    <span
                      key={note}
                      className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white/90 border border-white/15"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3 pt-4 border-t border-white/10">
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block"
            >
              <Button
                variant="primary"
                size="md"
                icon={<MessageCircle className="w-4 h-4" />}
                className="w-full"
              >
                ASK / ORDER ON WHATSAPP
              </Button>
            </a>

            <p className="text-[11px] text-center text-white/60 flex items-center justify-center gap-1">
              <MapPin className="w-3 h-3 text-[#36B9E8]" />
              Available for dine-in & takeaway at Jl. Riau No. 118
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
