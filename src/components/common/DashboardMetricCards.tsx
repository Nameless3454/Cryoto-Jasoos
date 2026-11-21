import React from 'react';

export interface MetricCardProps {
  id: string;
  title: string;
  value: string | number;
  badgeText: string;
  badgeType: 'emerald' | 'pink' | 'teal' | 'rose';
  subtitle: string;
  theme: 'blue' | 'magenta' | 'teal' | 'violet';
  icon: React.ReactNode;
  svgPath: string;
  svgFill: string;
  endpoint: { cx: number; cy: number };
}

export const DashboardMetricCards: React.FC = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* =========================================================
            CARD 1: ACTIVE INVESTIGATIONS (BLUE THEME)
           ========================================================= */}
        <div className="group relative rounded-2xl p-4 sm:p-4.5 bg-gradient-to-b from-[#091226]/90 via-[#060a17]/95 to-[#04060e] border border-[#1d3557]/80 hover:border-blue-500/60 shadow-[0_4px_25px_rgba(0,0,0,0.5),0_0_20px_rgba(30,64,175,0.12)] transition-all duration-300 backdrop-blur-xl overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -top-10 -left-10 w-28 h-28 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />

          {/* Top Section: Glowing Icon Container + Uppercase Header */}
          <div className="relative flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-blue-950/50 border border-blue-500/35 shadow-[0_0_12px_rgba(59,130,246,0.25)] flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <span className="text-[11px] font-mono font-bold tracking-[0.14em] text-slate-300/90 uppercase truncate">
              ACTIVE INVESTIGATIONS
            </span>
          </div>

          {/* Bottom Section: Metric Display + Sparkline Chart */}
          <div className="relative flex items-end justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[28px] font-bold font-sans text-white leading-none tracking-tight">
                  24
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#032328] border border-[#00d2aa]/35 text-[#00e5b8] text-[10px] font-bold tracking-tight shadow-[0_0_10px_rgba(0,229,184,0.15)]">
                  <span>↑</span>
                  <span>12% this week</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5 font-sans tracking-tight">
                Cases assigned to team
              </p>
            </div>

            {/* Neon Blue Sparkline */}
            <div className="w-[110px] h-[38px] shrink-0">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40">
                <defs>
                  <linearGradient id="blueAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                  </linearGradient>
                  <filter id="blueNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#3b82f6" floodOpacity="0.85" />
                  </filter>
                </defs>
                <path
                  d="M 2,32 C 12,32 18,22 26,22 C 34,22 38,30 46,30 C 54,30 58,12 66,12 C 74,12 80,31 86,31 C 92,31 96,18 98,11 L 98,39 L 2,39 Z"
                  fill="url(#blueAreaGrad)"
                />
                <path
                  d="M 2,32 C 12,32 18,22 26,22 C 34,22 38,30 46,30 C 54,30 58,12 66,12 C 74,12 80,31 86,31 C 92,31 96,18 98,11"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#blueNeonGlow)"
                />
                <circle cx="98" cy="11" r="5.5" fill="#3b82f6" opacity="0.35" className="animate-pulse" />
                <circle cx="98" cy="11" r="3" fill="#60a5fa" />
                <circle cx="98" cy="11" r="1.5" fill="#ffffff" />
              </svg>
            </div>
          </div>
        </div>

        {/* =========================================================
            CARD 2: HIGH RISK WALLETS (MAGENTA THEME)
           ========================================================= */}
        <div className="group relative rounded-2xl p-4 sm:p-4.5 bg-gradient-to-b from-[#180a22]/90 via-[#0c0517]/95 to-[#05020c] border border-[#4c1d43]/80 hover:border-pink-500/60 shadow-[0_4px_25px_rgba(0,0,0,0.5),0_0_20px_rgba(236,72,153,0.12)] transition-all duration-300 backdrop-blur-xl overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -top-10 -left-10 w-28 h-28 rounded-full bg-pink-500/10 blur-2xl pointer-events-none" />

          {/* Top Section: Glowing Icon Container + Uppercase Header */}
          <div className="relative flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-pink-950/50 border border-pink-500/35 shadow-[0_0_12px_rgba(244,63,142,0.25)] flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-pink-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <line x1="12" y1="9" x2="12" y2="15" />
                <line x1="9" y1="12" x2="15" y2="12" />
              </svg>
            </div>
            <span className="text-[11px] font-mono font-bold tracking-[0.14em] text-slate-300/90 uppercase truncate">
              HIGH RISK WALLETS
            </span>
          </div>

          {/* Bottom Section: Metric Display + Sparkline Chart */}
          <div className="relative flex items-end justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[28px] font-bold font-sans text-white leading-none tracking-tight">
                  18
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#28081c] border border-[#f43f8e]/35 text-[#f43f8e] text-[10px] font-bold tracking-tight shadow-[0_0_10px_rgba(244,63,142,0.15)]">
                  <span>↑</span>
                  <span>3 new</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5 font-sans tracking-tight">
                Threat score &gt; 75/100
              </p>
            </div>

            {/* Neon Magenta Sparkline */}
            <div className="w-[110px] h-[38px] shrink-0">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40">
                <defs>
                  <linearGradient id="pinkAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f43f8e" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#f43f8e" stopOpacity="0.0" />
                  </linearGradient>
                  <filter id="pinkNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#f43f8e" floodOpacity="0.85" />
                  </filter>
                </defs>
                <path
                  d="M 2,33 C 14,33 22,27 32,27 C 42,27 48,32 54,32 C 60,32 64,15 72,15 C 80,15 84,29 90,29 C 94,29 96,16 98,11 L 98,39 L 2,39 Z"
                  fill="url(#pinkAreaGrad)"
                />
                <path
                  d="M 2,33 C 14,33 22,27 32,27 C 42,27 48,32 54,32 C 60,32 64,15 72,15 C 80,15 84,29 90,29 C 94,29 96,16 98,11"
                  fill="none"
                  stroke="#f43f8e"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#pinkNeonGlow)"
                />
                <circle cx="98" cy="11" r="5.5" fill="#f43f8e" opacity="0.35" className="animate-pulse" />
                <circle cx="98" cy="11" r="3" fill="#fb7185" />
                <circle cx="98" cy="11" r="1.5" fill="#ffffff" />
              </svg>
            </div>
          </div>
        </div>

        {/* =========================================================
            CARD 3: SUSPICIOUS TRANSACTIONS (TEAL THEME)
           ========================================================= */}
        <div className="group relative rounded-2xl p-4 sm:p-4.5 bg-gradient-to-b from-[#05171e]/90 via-[#040e15]/95 to-[#02070c] border border-[#114b4a]/80 hover:border-teal-500/60 shadow-[0_4px_25px_rgba(0,0,0,0.5),0_0_20px_rgba(20,184,166,0.12)] transition-all duration-300 backdrop-blur-xl overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -top-10 -left-10 w-28 h-28 rounded-full bg-teal-500/10 blur-2xl pointer-events-none" />

          {/* Top Section: Glowing Icon Container + Uppercase Header */}
          <div className="relative flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-teal-950/50 border border-teal-500/35 shadow-[0_0_12px_rgba(20,184,166,0.25)] flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-teal-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="6" cy="17" r="2.5" />
                <circle cx="18" cy="17" r="2.5" />
                <circle cx="12" cy="7" r="2.5" />
                <line x1="8.2" y1="15" x2="10.8" y2="9" />
                <line x1="13.2" y1="9" x2="15.8" y2="15" />
              </svg>
            </div>
            <span className="text-[11px] font-mono font-bold tracking-[0.14em] text-slate-300/90 uppercase truncate">
              SUSPICIOUS TRANSACTIONS
            </span>
          </div>

          {/* Bottom Section: Metric Display + Sparkline Chart */}
          <div className="relative flex items-end justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[28px] font-bold font-sans text-white leading-none tracking-tight">
                  143
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#032328] border border-[#00d2aa]/35 text-[#00e5b8] text-[10px] font-bold tracking-tight shadow-[0_0_10px_rgba(0,229,184,0.15)]">
                  <span>↑</span>
                  <span>18% 24h</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5 font-sans tracking-tight">
                Rule engine triggers
              </p>
            </div>

            {/* Neon Teal Sparkline */}
            <div className="w-[110px] h-[38px] shrink-0">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40">
                <defs>
                  <linearGradient id="tealAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00e5b8" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#00e5b8" stopOpacity="0.0" />
                  </linearGradient>
                  <filter id="tealNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#00e5b8" floodOpacity="0.85" />
                  </filter>
                </defs>
                <path
                  d="M 2,32 C 12,32 20,34 28,34 C 36,34 42,21 50,21 C 58,21 64,30 72,30 C 80,30 84,12 92,12 C 95,12 97,11 98,11 L 98,39 L 2,39 Z"
                  fill="url(#tealAreaGrad)"
                />
                <path
                  d="M 2,32 C 12,32 20,34 28,34 C 36,34 42,21 50,21 C 58,21 64,30 72,30 C 80,30 84,12 92,12 C 95,12 97,11 98,11"
                  fill="none"
                  stroke="#00e5b8"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#tealNeonGlow)"
                />
                <circle cx="98" cy="11" r="5.5" fill="#00e5b8" opacity="0.35" className="animate-pulse" />
                <circle cx="98" cy="11" r="3" fill="#34d399" />
                <circle cx="98" cy="11" r="1.5" fill="#ffffff" />
              </svg>
            </div>
          </div>
        </div>

        {/* =========================================================
            CARD 4: CRITICAL SECURITY ALERTS (VIOLET THEME)
           ========================================================= */}
        <div className="group relative rounded-2xl p-4 sm:p-4.5 bg-gradient-to-b from-[#160822]/90 via-[#0a0516]/95 to-[#04020d] border border-[#3b174a]/80 hover:border-purple-500/60 shadow-[0_4px_25px_rgba(0,0,0,0.5),0_0_20px_rgba(168,85,247,0.12)] transition-all duration-300 backdrop-blur-xl overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -top-10 -left-10 w-28 h-28 rounded-full bg-purple-500/10 blur-2xl pointer-events-none" />

          {/* Top Section: Glowing Icon Container + Uppercase Header */}
          <div className="relative flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-purple-950/50 border border-purple-500/35 shadow-[0_0_12px_rgba(168,85,247,0.25)] flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-purple-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <span className="text-[11px] font-mono font-bold tracking-[0.14em] text-slate-300/90 uppercase truncate">
              CRITICAL SECURITY ALERTS
            </span>
          </div>

          {/* Bottom Section: Metric Display + Sparkline Chart */}
          <div className="relative flex items-end justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[28px] font-bold font-sans text-white leading-none tracking-tight">
                  7
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#2d0916] border border-[#f43f5e]/35 text-[#f43f5e] text-[10px] font-bold tracking-tight shadow-[0_0_10px_rgba(244,63,94,0.15)]">
                  Action Required
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5 font-sans tracking-tight">
                Unresolved high risk
              </p>
            </div>

            {/* Neon Violet Sparkline */}
            <div className="w-[110px] h-[38px] shrink-0">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40">
                <defs>
                  <linearGradient id="purpleAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
                  </linearGradient>
                  <filter id="purpleNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#a855f7" floodOpacity="0.85" />
                  </filter>
                </defs>
                <path
                  d="M 2,33 L 48,33 C 62,33 72,30 80,18 C 86,12 92,11 98,11 L 98,39 L 2,39 Z"
                  fill="url(#purpleAreaGrad)"
                />
                <path
                  d="M 2,33 L 48,33 C 62,33 72,30 80,18 C 86,12 92,11 98,11"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#purpleNeonGlow)"
                />
                <circle cx="98" cy="11" r="5.5" fill="#a855f7" opacity="0.35" className="animate-pulse" />
                <circle cx="98" cy="11" r="3" fill="#c084fc" />
                <circle cx="98" cy="11" r="1.5" fill="#ffffff" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMetricCards;
