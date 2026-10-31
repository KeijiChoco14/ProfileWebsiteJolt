import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'cream' | 'outline-cream' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-full tracking-wider transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-6 py-3 gap-2',
    lg: 'text-base px-8 py-4 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#36B9E8] to-[#0878B5] text-white shadow-lg shadow-[#0878B5]/40 hover:shadow-[#36B9E8]/60 hover:scale-[1.02] border border-[#36B9E8]/50',
    secondary:
      'bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/40 hover:scale-[1.02]',
    cream:
      'bg-[#F5F0E7] text-[#171C20] hover:bg-white shadow-md hover:shadow-xl hover:scale-[1.02]',
    'outline-cream':
      'border-2 border-[#171C20]/20 text-[#171C20] hover:bg-[#171C20] hover:text-[#F5F0E7] hover:scale-[1.02]',
    ghost:
      'text-white/80 hover:text-white hover:bg-white/5',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
      {icon && <span className="transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
    </button>
  );
};
