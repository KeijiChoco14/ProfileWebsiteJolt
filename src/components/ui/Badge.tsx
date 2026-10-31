import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'blue' | 'cream' | 'wood' | 'dark';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cyan',
  className = '',
}) => {
  const variantStyles = {
    cyan: 'bg-[#36B9E8]/15 text-[#36B9E8] border border-[#36B9E8]/30',
    blue: 'bg-[#0878B5]/20 text-white border border-[#0878B5]/50',
    cream: 'bg-[#F5F0E7] text-[#171C20] border border-[#F5F0E7]/80',
    wood: 'bg-[#C49A72]/20 text-[#C49A72] border border-[#C49A72]/40',
    dark: 'bg-[#171C20]/80 text-white/90 border border-white/10',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase backdrop-blur-sm ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
