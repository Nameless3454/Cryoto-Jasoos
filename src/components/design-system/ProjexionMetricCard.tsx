import React from 'react';
import { ProjexionBadge } from './ProjexionBadge';

export interface ProjexionMetricCardProps {
  id?: string;
  icon?: React.ReactNode;
  title: string;
  value: string | number;
  subtitle?: string;
  delta?: string | number;
  isPositive?: boolean;
  isNegative?: boolean;
  highlight?: boolean;
  ambientGlow?: 'indigo' | 'cyan' | 'none';
  onClick?: () => void;
  className?: string;
}

export const ProjexionMetricCard: React.FC<ProjexionMetricCardProps> = ({
  icon,
  title,
  value,
  subtitle = "This week's income",
  delta,
  isPositive,
  isNegative,
  highlight = false,
  ambientGlow = 'indigo',
  onClick,
  className = ''
}) => {
  return (
    <div
      onClick={onClick}
      className={`group relative rounded-3xl p-5 sm:p-5.5 bg-[#0D111C]/90 backdrop-blur-xl border border-white/[0.08] shadow-[0_12px_36px_-4px_rgba(0,0,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:border-white/[0.15] hover:shadow-[0_16px_42px_-4px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.14)] transition-all duration-300 overflow-hidden ${
        highlight ? 'border-[#6D55FF]/45 shadow-[0_0_24px_-4px_rgba(109,85,255,0.25)]' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Top-Left Ambient Backlight */}
      {ambientGlow === 'indigo' && (
        <div className="absolute -top-10 -left-10 w-28 h-28 rounded-full bg-[#6D55FF]/10 blur-2xl pointer-events-none group-hover:bg-[#6D55FF]/15 transition-all" />
      )}
      {ambientGlow === 'cyan' && (
        <div className="absolute -top-10 -left-10 w-28 h-28 rounded-full bg-[#00D2D3]/10 blur-2xl pointer-events-none group-hover:bg-[#00D2D3]/15 transition-all" />
      )}

      {/* Top Row: Icon Container + Header Title */}
      <div className="relative flex items-center gap-3 mb-3">
        {icon && (
          <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300 group-hover:text-white transition-colors shrink-0">
            {icon}
          </div>
        )}
        <span className="text-xs font-sans font-medium text-slate-400 group-hover:text-slate-300 transition-colors truncate">
          {title}
        </span>
      </div>

      {/* Middle Row: Large Tabular Value */}
      <div className="relative my-2">
        <span className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-white">
          {value}
        </span>
      </div>

      {/* Bottom Row: Subtitle + Delta Pill */}
      <div className="relative flex items-center justify-between gap-2 pt-1 border-t border-white/[0.04] mt-2">
        <span className="text-xs text-slate-400 truncate">
          {subtitle}
        </span>
        {delta !== undefined && (
          <ProjexionBadge
            delta={delta}
            isPositive={isPositive}
            isNegative={isNegative}
            size="sm"
          />
        )}
      </div>
    </div>
  );
};

export default ProjexionMetricCard;
