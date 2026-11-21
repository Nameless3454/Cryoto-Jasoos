import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export type ProjexionBadgeVariant = 'emerald' | 'rose' | 'amber' | 'indigo' | 'cyan' | 'neutral';

export interface ProjexionBadgeProps {
  children?: React.ReactNode;
  variant?: ProjexionBadgeVariant;
  delta?: number | string;
  isPositive?: boolean;
  isNegative?: boolean;
  dot?: boolean;
  className?: string;
  size?: 'sm' | 'md';
}

export const ProjexionBadge: React.FC<ProjexionBadgeProps> = ({
  children,
  variant = 'neutral',
  delta,
  isPositive,
  isNegative,
  dot = false,
  className = '',
  size = 'sm'
}) => {
  // Infer positive/negative if delta string is passed (e.g. "+0.45%" or "-0.30%")
  const deltaStr = typeof delta === 'number' ? `${delta > 0 ? '+' : ''}${delta}%` : delta;
  const isUp = isPositive ?? (deltaStr?.startsWith('+') || false);
  const isDown = isNegative ?? (deltaStr?.startsWith('-') || false);

  const variantStyles: Record<ProjexionBadgeVariant, { bg: string; text: string; border: string; dotColor: string }> = {
    emerald: {
      bg: 'bg-emerald-950/40',
      text: 'text-emerald-400',
      border: 'border-emerald-500/30',
      dotColor: 'bg-emerald-400'
    },
    rose: {
      bg: 'bg-rose-950/40',
      text: 'text-rose-400',
      border: 'border-rose-500/30',
      dotColor: 'bg-rose-400'
    },
    amber: {
      bg: 'bg-amber-950/40',
      text: 'text-amber-400',
      border: 'border-amber-500/30',
      dotColor: 'bg-amber-400'
    },
    indigo: {
      bg: 'bg-indigo-950/40',
      text: 'text-[#8B75FF]',
      border: 'border-[#6D55FF]/35',
      dotColor: 'bg-[#6D55FF]'
    },
    cyan: {
      bg: 'bg-cyan-950/40',
      text: 'text-cyan-400',
      border: 'border-cyan-500/30',
      dotColor: 'bg-cyan-400'
    },
    neutral: {
      bg: 'bg-white/[0.04]',
      text: 'text-slate-300',
      border: 'border-white/[0.08]',
      dotColor: 'bg-slate-400'
    }
  };

  const selected = isUp
    ? variantStyles.emerald
    : isDown
    ? variantStyles.rose
    : variantStyles[variant];

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-mono font-medium border ${selected.bg} ${selected.text} ${selected.border} ${sizeClasses} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${selected.dotColor} shrink-0`} />}
      {isUp && <ArrowUpRight className="w-3 h-3 shrink-0" />}
      {isDown && <ArrowDownRight className="w-3 h-3 shrink-0" />}
      {deltaStr ? <span>{deltaStr}</span> : children}
    </span>
  );
};

export default ProjexionBadge;
