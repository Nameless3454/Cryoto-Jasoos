import React from 'react';
import {
  LayoutGrid,
  Lightbulb,
  ShieldAlert,
  GitBranch,
  Search,
  Zap,
  History
} from 'lucide-react';

export interface ProjexionDockItem {
  id: string;
  icon: React.ReactNode;
  label: string;
}

export interface ProjexionSideDockProps {
  items?: ProjexionDockItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
  className?: string;
}

export const DEFAULT_DOCK_ITEMS: ProjexionDockItem[] = [
  { id: 'grid', icon: <LayoutGrid className="w-4 h-4" />, label: 'Overview' },
  { id: 'insights', icon: <Lightbulb className="w-4 h-4" />, label: 'Insights' },
  { id: 'alerts', icon: <ShieldAlert className="w-4 h-4" />, label: 'Alerts' },
  { id: 'graph', icon: <GitBranch className="w-4 h-4" />, label: 'Flow Graph' },
  { id: 'search', icon: <Search className="w-4 h-4" />, label: 'Search' },
  { id: 'live', icon: <Zap className="w-4 h-4" />, label: 'Live Feeds' },
  { id: 'history', icon: <History className="w-4 h-4" />, label: 'Timeline' }
];

export const ProjexionSideDock: React.FC<ProjexionSideDockProps> = ({
  items = DEFAULT_DOCK_ITEMS,
  activeId = 'grid',
  onSelect,
  className = ''
}) => {
  return (
    <aside
      aria-label="Quick Actions Dock"
      className={`inline-flex flex-col items-center gap-3 py-4 px-2.5 rounded-full bg-[#0D111C]/90 backdrop-blur-xl border border-white/[0.08] shadow-[0_12px_36px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.08)] select-none ${className}`}
    >
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect?.(item.id)}
            title={item.label}
            aria-label={item.label}
            className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center transition-all duration-200 outline-none cursor-pointer ${
              isActive
                ? 'bg-gradient-to-br from-[#6D55FF] to-[#4F38EB] text-white shadow-[0_0_16px_rgba(109,85,255,0.5)]'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            {item.icon}
          </button>
        );
      })}
    </aside>
  );
};

export default ProjexionSideDock;
