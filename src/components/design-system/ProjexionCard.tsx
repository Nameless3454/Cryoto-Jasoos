import React from 'react';
import { MoreVertical } from 'lucide-react';

export interface ProjexionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  showMenu?: boolean;
  onMenuClick?: () => void;
  ambientGlow?: 'indigo' | 'cyan' | 'none';
  highlight?: boolean;
  className?: string;
}

export const ProjexionCard: React.FC<ProjexionCardProps> = ({
  children,
  title,
  subtitle,
  showMenu = false,
  onMenuClick,
  ambientGlow = 'none',
  highlight = false,
  className = '',
  ...rest
}) => {
  return (
    <div
      className={`group relative rounded-3xl p-5 sm:p-6 transition-all duration-300 overflow-hidden ${
        highlight ? 'projexion-card-highlight' : 'projexion-card'
      } ${className}`}
      {...rest}
    >
      {/* Optional Top-Left Ambient Backlight */}
      {ambientGlow === 'indigo' && (
        <div className="absolute -top-12 -left-12 w-36 h-36 rounded-full bg-[#6D55FF]/10 blur-2xl pointer-events-none group-hover:bg-[#6D55FF]/15 transition-all" />
      )}
      {ambientGlow === 'cyan' && (
        <div className="absolute -top-12 -left-12 w-36 h-36 rounded-full bg-[#00D2D3]/10 blur-2xl pointer-events-none group-hover:bg-[#00D2D3]/15 transition-all" />
      )}

      {/* Header if title is present */}
      {(title || showMenu) && (
        <div className="relative flex items-center justify-between gap-3 mb-4">
          <div>
            {title && (
              <h3 className="text-sm font-semibold tracking-tight text-white/90">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-slate-400 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>

          {showMenu && (
            <button
              type="button"
              onClick={onMenuClick}
              aria-label="Card actions menu"
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Card Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

export default ProjexionCard;
