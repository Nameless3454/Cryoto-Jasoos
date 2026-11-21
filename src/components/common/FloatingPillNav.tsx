import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FloatingPillNavItem {
  id: string;
  label: string;
  href?: string;
  icon: (active: boolean) => React.ReactNode;
}

export interface FloatingPillNavProps {
  items?: FloatingPillNavItem[];
  activeIndex?: number;
  defaultActiveIndex?: number;
  onChange?: (index: number, item: FloatingPillNavItem) => void;
  onMinimize?: () => void;
  className?: string;
  theme?: 'dark' | 'light';
  containerAriaLabel?: string;
}

// ---------------------------------------------------------------------------
// 5 Custom Layered Duotone SVG Icons (22px x 22px)
// ---------------------------------------------------------------------------

/**
 * 1. Dashboard: Home / Horizon
 */
export const HorizonIcon: React.FC<{ active?: boolean; theme?: 'dark' | 'light' }> = ({
  active = false,
  theme = 'dark'
}) => {
  const primaryColor = active
    ? '#FFFFFF'
    : theme === 'dark'
    ? '#94A3B8'
    : '#6E7178';
  const secondaryColor = active
    ? 'rgba(255, 255, 255, 0.45)'
    : theme === 'dark'
    ? 'rgba(255, 255, 255, 0.22)'
    : '#B8BBC2';

  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="overflow-visible">
      <g fill={secondaryColor}>
        <circle cx="6.5" cy="5.5" r="1.1" />
        <circle cx="12" cy="3.5" r="1.1" />
        <circle cx="17.5" cy="5.5" r="1.1" />
        <path d="M 4 15 C 4 10.58 7.58 7 12 7 C 16.42 7 20 10.58 20 15 Z" />
      </g>
      <circle cx="12" cy="15" r="4.25" fill={primaryColor} />
    </svg>
  );
};

/**
 * 2. Cases: Forensic Case File Dossier
 */
export const CasesDossierIcon: React.FC<{ active?: boolean; theme?: 'dark' | 'light' }> = ({
  active = false,
  theme = 'dark'
}) => {
  const primaryColor = active
    ? '#FFFFFF'
    : theme === 'dark'
    ? '#94A3B8'
    : '#6E7178';
  const secondaryColor = active
    ? 'rgba(255, 255, 255, 0.45)'
    : theme === 'dark'
    ? 'rgba(255, 255, 255, 0.22)'
    : '#B8BBC2';

  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {/* Secondary layer: Back folder flap / tab */}
      <path
        d="M 3.5 6 C 3.5 5.17 4.17 4.5 5 4.5 L 9 4.5 C 9.65 4.5 10.25 4.9 10.5 5.5 L 11.2 7 L 19 7 C 19.83 7 20.5 7.67 20.5 8.5 L 20.5 17.5 C 20.5 18.33 19.83 19 19 19 L 5 19 C 4.17 19 3.5 18.33 3.5 17.5 Z"
        fill={secondaryColor}
      />
      {/* Primary layer: Front folder body with clasp */}
      <rect x="3.5" y="8" width="17" height="11" rx="2" fill={primaryColor} />
      <circle cx="12" cy="13" r="1.3" fill={active ? '#6D55FF' : theme === 'dark' ? '#080A11' : '#E8EAEE'} />
    </svg>
  );
};

/**
 * 3. Wallet Analyzer: Multi-Hop Flow Graph / Cards
 */
export const WalletFlowIcon: React.FC<{ active?: boolean; theme?: 'dark' | 'light' }> = ({
  active = false,
  theme = 'dark'
}) => {
  const primaryColor = active
    ? '#FFFFFF'
    : theme === 'dark'
    ? '#94A3B8'
    : '#6E7178';
  const secondaryColor = active
    ? 'rgba(255, 255, 255, 0.45)'
    : theme === 'dark'
    ? 'rgba(255, 255, 255, 0.22)'
    : '#B8BBC2';

  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {/* Secondary layer: Tilted rear card */}
      <rect
        x="5.5"
        y="4.5"
        width="13.5"
        height="9"
        rx="2"
        transform="rotate(-12 12 9)"
        fill={secondaryColor}
      />
      {/* Primary layer: Front horizontal card with flow dashed line */}
      <rect x="2.5" y="8" width="19" height="12" rx="2.5" fill={primaryColor} />
      <line
        x1="5.5"
        y1="12"
        x2="18.5"
        y2="12"
        stroke={active ? '#6D55FF' : theme === 'dark' ? '#080A11' : '#E8EAEE'}
        strokeWidth="1.25"
        strokeDasharray="2.5 1.5"
      />
      <circle
        cx="6.5"
        cy="15.5"
        r="1.2"
        fill={active ? 'rgba(255, 255, 255, 0.45)' : theme === 'dark' ? 'rgba(255,255,255,0.25)' : '#B8BBC2'}
      />
    </svg>
  );
};

/**
 * 4. AI Assistant: Copilot Intelligence / Spark
 */
export const CopilotSparkIcon: React.FC<{ active?: boolean; theme?: 'dark' | 'light' }> = ({
  active = false,
  theme = 'dark'
}) => {
  const primaryColor = active
    ? '#FFFFFF'
    : theme === 'dark'
    ? '#94A3B8'
    : '#6E7178';
  const secondaryColor = active
    ? 'rgba(255, 255, 255, 0.45)'
    : theme === 'dark'
    ? 'rgba(255, 255, 255, 0.22)'
    : '#B8BBC2';

  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {/* Secondary layer: Radiating intelligence rings */}
      <circle cx="12" cy="12" r="7.5" stroke={secondaryColor} strokeWidth="1.5" strokeDasharray="3 2" />
      {/* Primary layer: Central 4-point AI spark star */}
      <path
        d="M 12 5.5 C 12 9 9 12 5.5 12 C 9 12 12 15 12 18.5 C 12 15 15 12 18.5 12 C 15 12 12 9 12 5.5 Z"
        fill={primaryColor}
      />
    </svg>
  );
};

/**
 * 5. Reports: FinCEN SAR Compliance Docket
 */
export const ReportsDocketIcon: React.FC<{ active?: boolean; theme?: 'dark' | 'light' }> = ({
  active = false,
  theme = 'dark'
}) => {
  const primaryColor = active
    ? '#FFFFFF'
    : theme === 'dark'
    ? '#94A3B8'
    : '#6E7178';
  const secondaryColor = active
    ? 'rgba(255, 255, 255, 0.45)'
    : theme === 'dark'
    ? 'rgba(255, 255, 255, 0.22)'
    : '#B8BBC2';

  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {/* Secondary layer: Back sheet offset */}
      <rect x="6.5" y="4" width="13" height="15" rx="2" fill={secondaryColor} />
      {/* Primary layer: Front legal report sheet */}
      <rect x="4.5" y="6.5" width="13" height="14" rx="2" fill={primaryColor} />
      {/* Document line details */}
      <line x1="7.5" y1="10" x2="14.5" y2="10" stroke={active ? '#6D55FF' : theme === 'dark' ? '#080A11' : '#E8EAEE'} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="7.5" y1="13" x2="12.5" y2="13" stroke={active ? '#6D55FF' : theme === 'dark' ? '#080A11' : '#E8EAEE'} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="13.5" cy="16.5" r="1.3" fill={active ? 'rgba(255, 255, 255, 0.5)' : theme === 'dark' ? 'rgba(255,255,255,0.3)' : '#B8BBC2'} />
    </svg>
  );
};

// ---------------------------------------------------------------------------
// Default 5 Core Application Destinations
// ---------------------------------------------------------------------------
export const DEFAULT_APP_NAV_ITEMS: FloatingPillNavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/',
    icon: (active) => <HorizonIcon active={active} theme="dark" />
  },
  {
    id: 'cases',
    label: 'Cases',
    href: '/cases',
    icon: (active) => <CasesDossierIcon active={active} theme="dark" />
  },
  {
    id: 'wallet-analyzer',
    label: 'Wallet Analyzer',
    href: '/wallet-analyzer',
    icon: (active) => <WalletFlowIcon active={active} theme="dark" />
  },
  {
    id: 'ai-investigation',
    label: 'Forensic AI',
    href: '/ai-investigation',
    icon: (active) => <CopilotSparkIcon active={active} theme="dark" />
  },
  {
    id: 'reports',
    label: 'Reports',
    href: '/reports',
    icon: (active) => <ReportsDocketIcon active={active} theme="dark" />
  }
];

export const DEFAULT_PILL_NAV_ITEMS = DEFAULT_APP_NAV_ITEMS;

// ---------------------------------------------------------------------------
// FloatingPillNav Component
// ---------------------------------------------------------------------------
export const FloatingPillNav: React.FC<FloatingPillNavProps> = ({
  items = DEFAULT_APP_NAV_ITEMS,
  activeIndex: controlledIndex,
  defaultActiveIndex = 0,
  onChange,
  onMinimize,
  className = '',
  theme = 'dark',
  containerAriaLabel = 'Application Navigation'
}) => {
  const [internalIndex, setInternalIndex] = useState(defaultActiveIndex);
  const activeIndex = controlledIndex !== undefined ? controlledIndex : internalIndex;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleSelectTab = (index: number) => {
    if (index === activeIndex) return;

    if (controlledIndex === undefined) {
      setInternalIndex(index);
    }
    onChange?.(index, items[index]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let targetIndex = -1;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        targetIndex = (index + 1) % items.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        targetIndex = (index - 1 + items.length) % items.length;
        break;
      case 'Home':
        e.preventDefault();
        targetIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        targetIndex = items.length - 1;
        break;
      default:
        break;
    }

    if (targetIndex !== -1) {
      handleSelectTab(targetIndex);
      buttonRefs.current[targetIndex]?.focus();
    }
  };

  const isDark = theme === 'dark';

  return (
    <nav
      role="tablist"
      aria-label={containerAriaLabel}
      aria-orientation="horizontal"
      className={`relative inline-flex items-center h-[52px] rounded-full select-none transition-all duration-300 ${
        isDark
          ? 'bg-[#0D111C]/92 backdrop-blur-2xl border border-white/[0.08] shadow-[0_12px_36px_rgba(0,0,0,0.65),0_0_24px_rgba(109,85,255,0.18),inset_0_1px_0_0_rgba(255,255,255,0.08)]'
          : 'bg-[#E8EAEE] border border-black/[0.04] shadow-sm'
      } px-2.5 py-1.5 ${className}`}
    >
      {/* Item Buttons with clean 40x40 touch targets and gaps */}
      <div className="relative flex items-center gap-1.5 sm:gap-2">
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          const isHovered = hoveredIndex === index;

          return (
            <div key={item.id} className="relative flex items-center justify-center shrink-0">
              {/* Optional Hover Label Tooltip */}
              <AnimatePresence>
                {isHovered && !isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.9 }}
                    animate={{ opacity: 1, y: -28, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.9 }}
                    transition={{ duration: 0.14 }}
                    className="absolute pointer-events-none px-2.5 py-1 rounded-md bg-[#121726] border border-white/[0.08] text-[10px] font-mono text-slate-200 whitespace-nowrap shadow-xl z-50"
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                ref={(el) => (buttonRefs.current[index] = el)}
                role="tab"
                id={`pill-tab-${item.id}`}
                aria-selected={isActive}
                aria-label={item.label}
                tabIndex={isActive ? 0 : -1}
                onClick={() => handleSelectTab(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative flex h-10 w-10 shrink-0 p-0 m-0 border-0 items-center justify-center rounded-full outline-none transition-colors duration-150 cursor-pointer ${
                  isDark
                    ? 'focus-visible:ring-2 focus-visible:ring-[#6D55FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080A11]'
                    : 'focus-visible:ring-2 focus-visible:ring-[#1E1B84] focus-visible:ring-offset-2 focus-visible:ring-offset-[#E8EAEE]'
                }`}
              >
                {/* Perfect Inset Active Indicator with layoutId Spring */}
                {isActive && (
                  <motion.div
                    layoutId="floatingNavActivePill"
                    className={`absolute inset-0 rounded-full pointer-events-none ${
                      isDark
                        ? 'bg-gradient-to-br from-[#6D55FF] to-[#4F38EB] shadow-[0_0_20px_rgba(109,85,255,0.6)]'
                        : 'bg-[#1E1B84] shadow-sm'
                    }`}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 32
                    }}
                  />
                )}

                <div className="relative z-10 flex items-center justify-center pointer-events-none w-full h-full">
                  {item.icon(isActive)}
                </div>
              </button>
            </div>
          );
        })}

        {onMinimize && (
          <div className="flex items-center pl-1 sm:pl-1.5 pr-0.5">
            <div className="w-[1px] h-5 bg-white/[0.12] mr-1.5 sm:mr-2 shrink-0" />
            <button
              type="button"
              onClick={onMinimize}
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
              title="Minimize navigation dock"
              aria-label="Minimize navigation dock"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default FloatingPillNav;
