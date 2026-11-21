import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  Folder,
  Share2,
  Briefcase,
  Bell,
  Bot,
  FileText,
  ShieldCheck,
  Crown,
  ChevronRight,
  X
} from 'lucide-react';

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen = false, onMobileClose }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Cases', path: '/cases', icon: Folder },
    { name: 'Wallet Analyzer', path: '/wallet-analyzer', icon: Share2 },
    { name: 'Wallet Profile', path: '/wallet', icon: Briefcase },
    { name: 'Alerts', path: '/alerts', icon: Bell, badge: '7', badgeType: 'alert' },
    { name: 'AI Assistant', path: '/ai-investigation', icon: Bot, badge: 'Copilot', badgeType: 'copilot' },
    { name: 'Reports', path: '/reports', icon: FileText },
  ];

  const sidebarContent = (
    <aside className="w-[307px] bg-[#060913] border-r border-[#121b33] flex flex-col h-screen sticky top-0 z-30 select-none justify-between p-6">
      <div className="space-y-7">
        {/* Top Brand Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600/30 via-indigo-600/20 to-transparent border border-blue-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)] shrink-0">
              <ShieldCheck className="w-6 h-6 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
            </div>
            <div>
              <h1 className="font-extrabold text-[15px] tracking-wider text-white font-mono leading-tight">
                CRYPTO-JASOOS
              </h1>
              <p className="text-[11px] text-slate-400 font-sans tracking-normal mt-0.5">
                Forensics & Crypto Investigation
              </p>
            </div>
          </div>

          {onMobileClose && (
            <button
              onClick={onMobileClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.path ||
              (item.path !== '/' && (
                location.pathname.startsWith(`${item.path}/`) || 
                location.pathname.startsWith(`${item.path}?`)
              ));

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onMobileClose}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all group relative ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600/35 via-blue-500/20 to-indigo-600/10 text-white font-semibold border border-blue-500/60 shadow-[inset_4px_0_12px_rgba(59,130,246,0.5),0_0_20px_rgba(59,130,246,0.15)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#0b1122]/60 font-medium'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isActive
                        ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]'
                        : 'text-slate-400 group-hover:text-slate-300'
                    }`}
                  />
                  <span className="tracking-wide text-[13px]">{item.name}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[11px] font-mono px-2 py-0.5 rounded-full font-bold shadow-sm ${
                      item.badgeType === 'copilot'
                        ? 'bg-purple-600/25 text-purple-300 border border-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                        : 'bg-rose-600/25 text-rose-300 border border-rose-500/50 shadow-[0_0_10px_rgba(244,63,94,0.3)]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Area: Demo Mode & Brand Tagline */}
      <div className="space-y-5 pt-4">
        {/* Demo Mode Card */}
        <div className="bg-[#090f20]/90 hover:bg-[#0d162e] transition-colors p-3.5 rounded-2xl border border-slate-800/80 flex items-center justify-between cursor-pointer group shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/35 flex items-center justify-center shrink-0">
              <Crown className="w-4 h-4 text-amber-400 fill-amber-400/25" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-400 tracking-wide font-mono">DEMO MODE</div>
              <div className="text-[11px] text-slate-400 font-sans">Explore the platform</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all" />
        </div>

        {/* Footer Tagline */}
        <div className="flex items-center gap-3 text-[11px] text-slate-500 font-sans leading-relaxed pl-1">
          <div className="w-0.5 h-7 bg-blue-500/40 rounded-full" />
          <div>
            <p>Smarter Investigations.</p>
            <p>Safer Tomorrow.</p>
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      <div className="hidden lg:block shrink-0">{sidebarContent}</div>
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex">
          <div className="w-[307px] max-w-full">{sidebarContent}</div>
          <div className="flex-1" onClick={onMobileClose} />
        </div>
      )}
    </>
  );
};
export default Sidebar;
