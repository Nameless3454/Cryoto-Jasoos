import React from 'react';
import { Search, Menu, User } from 'lucide-react';

export interface ProjexionTopBarTab {
  id: string;
  label: string;
  href?: string;
  badge?: string | number;
}

export interface ProjexionTopBarProps {
  tabs?: ProjexionTopBarTab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  brandTitle?: string;
  userName?: string;
  userEmail?: string;
  onSearchClick?: () => void;
  onMenuClick?: () => void;
  className?: string;
}

export const DEFAULT_PROJEXION_TABS: ProjexionTopBarTab[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'endpoints', label: 'Endpoints' },
  { id: 'findings', label: 'Findings' },
  { id: 'alerts', label: 'Alerts' }
];

export const ProjexionTopBar: React.FC<ProjexionTopBarProps> = ({
  tabs = DEFAULT_PROJEXION_TABS,
  activeTab = 'endpoints',
  onTabChange,
  brandTitle = 'CRYPTO-JASOOS',
  userName = 'Alex Robert',
  userEmail = 'alex24y@',
  onSearchClick,
  onMenuClick,
  className = ''
}) => {
  return (
    <header
      className={`w-full h-16 sm:h-[70px] rounded-3xl bg-[#0D111C]/90 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.08)] px-4 sm:px-6 flex items-center justify-between gap-4 select-none ${className}`}
    >
      {/* Left: Brand Icon + Title */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#6D55FF] to-[#00D2D3] p-[1.5px] shadow-[0_0_14px_rgba(109,85,255,0.4)]">
          <div className="w-full h-full rounded-full bg-[#080A11] flex items-center justify-center">
            <span className="w-3.5 h-3.5 rounded-full border-2 border-white/80" />
          </div>
        </div>
        <span className="hidden md:inline font-mono font-bold text-xs sm:text-sm tracking-wider text-white">
          {brandTitle}
        </span>
      </div>

      {/* Center: Navigation Pill Tabs */}
      <nav
        role="tablist"
        aria-label="Console Sections"
        className="flex items-center gap-1 sm:gap-2 p-1 rounded-full bg-[#080A11]/60 border border-white/[0.04]"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onTabChange?.(tab.id)}
              className={`relative px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 outline-none cursor-pointer ${
                isActive
                  ? 'projexion-pill-active'
                  : 'projexion-pill-inactive'
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-white/20 text-[10px] font-mono">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Right: Search, User Profile, Menu */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Search trigger */}
        <button
          type="button"
          onClick={onSearchClick}
          aria-label="Search"
          className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* User profile capsule */}
        <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-left">
          <div className="w-7 h-7 rounded-full bg-[#6D55FF]/30 border border-[#6D55FF]/40 flex items-center justify-center text-white text-xs font-semibold">
            <User className="w-3.5 h-3.5 text-white/90" />
          </div>
          <div className="text-left leading-none">
            <div className="text-xs font-medium text-white/90 truncate">{userName}</div>
            <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">{userEmail}</div>
          </div>
        </div>

        {/* Mobile / actions menu trigger */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Navigation Menu"
          className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

export default ProjexionTopBar;
