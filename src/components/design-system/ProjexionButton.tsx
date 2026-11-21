import React from 'react';

export type ProjexionButtonVariant = 'primary' | 'glass' | 'cyan' | 'ghost' | 'danger';
export type ProjexionButtonSize = 'sm' | 'md' | 'lg';

export interface ProjexionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: ProjexionButtonVariant;
  size?: ProjexionButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  className?: string;
}

export const ProjexionButton: React.FC<ProjexionButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled,
  className = '',
  ...rest
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-all duration-200 select-none outline-none focus-visible:ring-2 focus-visible:ring-[#6D55FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080A11] disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const sizeClasses: Record<ProjexionButtonSize, string> = {
    sm: 'text-xs px-3 py-1.5 rounded-full gap-1.5',
    md: 'text-sm px-4 py-2.5 rounded-full gap-2',
    lg: 'text-base px-6 py-3 rounded-full gap-2.5'
  };

  const variantClasses: Record<ProjexionButtonVariant, string> = {
    primary:
      'bg-gradient-to-r from-[#6D55FF] to-[#4F38EB] text-white shadow-[0_0_20px_rgba(109,85,255,0.4)] hover:shadow-[0_0_25px_rgba(109,85,255,0.6)] hover:brightness-110 active:scale-[0.98]',
    glass:
      'bg-white/[0.05] border border-white/[0.08] text-slate-200 hover:bg-white/[0.1] hover:text-white hover:border-white/[0.15] active:scale-[0.98]',
    cyan:
      'bg-gradient-to-r from-[#00D2D3] to-[#00A8A9] text-[#080A11] font-semibold shadow-[0_0_18px_rgba(0,210,211,0.35)] hover:shadow-[0_0_24px_rgba(0,210,211,0.5)] hover:brightness-105 active:scale-[0.98]',
    ghost:
      'bg-transparent text-slate-400 hover:text-white hover:bg-white/[0.05] active:scale-[0.98]',
    danger:
      'bg-rose-500/15 border border-rose-500/30 text-rose-300 hover:bg-rose-500/25 hover:text-rose-200 active:scale-[0.98]'
  };

  return (
    <button
      disabled={disabled || loading}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
      ) : (
        icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>
      )}
      {children}
      {!loading && icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};

export default ProjexionButton;
