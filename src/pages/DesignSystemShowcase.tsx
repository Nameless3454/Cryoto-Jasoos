import React, { useState } from 'react';
import {
  ShieldAlert,
  Terminal,
  Activity,
  Layers,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import {
  ProjexionTopBar,
  ProjexionSideDock,
  ProjexionMetricCard,
  ProjexionCard,
  ProjexionButton,
  ProjexionBadge
} from '../components/design-system';
import { FloatingPillNav } from '../components/common/FloatingPillNav';

export const DesignSystemShowcase: React.FC = () => {
  const [activeTopTab, setActiveTopTab] = useState('endpoints');
  const [activeDockId, setActiveDockId] = useState('grid');
  const [activePillIndex, setActivePillIndex] = useState(1);

  // Event summary bar data
  const barData = [
    { month: 'Feb', pct: '12%', height: 'h-8', active: false },
    { month: 'Mar', pct: '20%', height: 'h-12', active: false },
    { month: 'Apr', pct: '33%', height: 'h-16', active: false },
    { month: 'May', pct: '40%', height: 'h-20', active: false },
    { month: 'Jun', pct: '70%', height: 'h-32', active: true, tag: '+12% ↑' },
    { month: 'Jul', pct: '45%', height: 'h-24', active: false },
    { month: 'Aug', pct: '32%', height: 'h-16', active: false },
    { month: 'Sep', pct: '18%', height: 'h-10', active: false }
  ];

  // Attack incident items
  const attackItems = [
    { id: '1', title: 'Kerberos Golden Ticket Attack Detected', time: 'an hour ago', host: 'ADSecure-DC' },
    { id: '2', title: 'DCSync Attack Detected', time: '2 hour ago', host: 'ADSecure-DC' },
    { id: '3', title: 'Over Pass_The_Hash Attack Detected', time: '8 hour ago', host: 'ADSecure-DC' },
    { id: '4', title: 'Kerberos Golden Ticket Attack Detected', time: '4 hour ago', host: 'ADSecure-DC' },
    { id: '5', title: 'DCSync Attack Detected', time: '9 hour ago', host: 'ADSecure-DC' }
  ];

  return (
    <div className="min-h-screen w-full projexion-canvas text-slate-100 p-4 sm:p-8 font-sans selection:bg-[#6D55FF] selection:text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Spec Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6D55FF]/15 border border-[#6D55FF]/30 text-xs font-mono font-medium text-[#A392FF] uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Phase 1: Design System Foundation
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Projexion Visual Design System
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Reusable dark glass surfaces, ambient lighting, duotone telemetry, and forensic information architecture.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <ProjexionButton variant="glass" size="sm">
              Tokens Reference
            </ProjexionButton>
            <ProjexionButton variant="primary" size="sm">
              Export Components
            </ProjexionButton>
          </div>
        </div>

        {/* =========================================================
            SECTION 1: TOPBAR COMPONENT (Matching Reference Screenshot)
           ========================================================= */}
        <div className="space-y-3">
          <div className="text-xs font-mono font-semibold tracking-wider text-slate-400 uppercase">
            Top Bar Navigation Capsule
          </div>
          <ProjexionTopBar
            activeTab={activeTopTab}
            onTabChange={(id) => setActiveTopTab(id)}
            brandTitle="CRYPTO-JASOOS"
            userName="Alex Robert"
            userEmail="alex24y@"
          />
        </div>

        {/* =========================================================
            SECTION 2: MAIN DASHBOARD GRID WITH DOCK (Matching Screenshot)
           ========================================================= */}
        <div className="space-y-3">
          <div className="text-xs font-mono font-semibold tracking-wider text-slate-400 uppercase">
            Forensic Command Center Layout
          </div>

          <div className="flex items-start gap-4 sm:gap-6">
            {/* Left Floating Dock */}
            <div className="sticky top-6 hidden lg:block shrink-0">
              <ProjexionSideDock
                activeId={activeDockId}
                onSelect={(id) => setActiveDockId(id)}
              />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 space-y-6 min-w-0">
              {/* Row 1: 2x2 Metric Cards + Event Summary Bar Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Left: 4 Metric Cards (2x2 grid) */}
                <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ProjexionMetricCard
                    icon={<Activity className="w-4 h-4 text-emerald-400" />}
                    title="# of Detections"
                    value="$3280"
                    delta="+0.45%"
                    subtitle="This week's income"
                    ambientGlow="indigo"
                  />
                  <ProjexionMetricCard
                    icon={<ShieldAlert className="w-4 h-4 text-rose-400" />}
                    title="# of Mitre Attack Techniques"
                    value="$1257"
                    delta="-0.30%"
                    subtitle="This week's income"
                    ambientGlow="indigo"
                  />
                  <ProjexionMetricCard
                    icon={<Terminal className="w-4 h-4 text-rose-400" />}
                    title="# of Mitre Attack Tactics"
                    value="$2658"
                    delta="-0.65%"
                    subtitle="This week's income"
                    ambientGlow="indigo"
                  />
                  <ProjexionMetricCard
                    icon={<Layers className="w-4 h-4 text-emerald-400" />}
                    title="# EPs Under Risk"
                    value="$1257.30"
                    delta="+0.32%"
                    subtitle="This week's income"
                    ambientGlow="cyan"
                  />
                </div>

                {/* Right: Event Summary Bar Chart with Highlighted Jun Bar */}
                <div className="lg:col-span-6">
                  <ProjexionCard
                    title="Event Summary"
                    showMenu
                    ambientGlow="indigo"
                    className="h-full flex flex-col justify-between"
                  >
                    <div className="pt-2 pb-4">
                      {/* Bar columns */}
                      <div className="flex items-end justify-between gap-2 sm:gap-3 h-48 px-2">
                        {barData.map((b) => (
                          <div key={b.month} className="flex-1 flex flex-col items-center gap-2">
                            {b.active && (
                              <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950/60 border border-amber-500/40 px-1.5 py-0.5 rounded-full mb-1">
                                {b.tag}
                              </span>
                            )}
                            <div className="w-full flex items-end justify-center">
                              <div
                                className={`w-full max-w-[32px] rounded-full transition-all duration-300 flex items-center justify-center ${
                                  b.active
                                    ? `${b.height} border-2 border-dashed border-amber-400/90 bg-amber-500/20 shadow-[0_0_16px_rgba(245,158,11,0.3)]`
                                    : `${b.height} border border-[#6D55FF]/40 bg-gradient-to-t from-[#6D55FF]/20 to-transparent hover:border-[#6D55FF]/70`
                                }`}
                              >
                                {b.active && (
                                  <span className="text-[10px] font-mono font-bold text-amber-300">
                                    {b.pct}
                                  </span>
                                )}
                              </div>
                            </div>
                            <span className="text-[11px] font-mono text-slate-400">
                              {b.month}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ProjexionCard>
                </div>
              </div>

              {/* Row 2: Event Summary Attack List + Spline Line Area Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Left: Event Summary Detection List */}
                <div className="lg:col-span-5">
                  <ProjexionCard title="Event Summary" showMenu ambientGlow="cyan" className="h-full">
                    <div className="space-y-3.5 pt-1">
                      {attackItems.map((item) => (
                        <div key={item.id} className="flex items-start gap-3 p-2 rounded-xl hover:bg-white/[0.03] transition-colors">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-medium text-slate-200 truncate">
                              {item.title}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              {item.time} - {item.host}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ProjexionCard>
                </div>

                {/* Right: Event Summary Spline Chart Area */}
                <div className="lg:col-span-7">
                  <ProjexionCard title="Event Summary" showMenu ambientGlow="indigo" className="h-full">
                    <div className="pt-2">
                      <div className="relative h-48 w-full">
                        {/* SVG Spline Area Chart */}
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="purpleGlowGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#6D55FF" stopOpacity="0.4" />
                              <stop offset="100%" stopColor="#6D55FF" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>

                          {/* Horizontal Grid Lines */}
                          <line x1="0" y1="40" x2="600" y2="40" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                          <line x1="0" y1="90" x2="600" y2="90" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                          <line x1="0" y1="140" x2="600" y2="140" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />

                          {/* Gradient Fill Area */}
                          <path
                            d="M 0 140 Q 60 120, 100 135 T 200 110 T 300 160 T 380 90 T 440 100 T 520 85 T 600 90 L 600 200 L 0 200 Z"
                            fill="url(#purpleGlowGradient)"
                          />

                          {/* Spline Line */}
                          <path
                            d="M 0 140 Q 60 120, 100 135 T 200 110 T 300 160 T 380 90 T 440 100 T 520 85 T 600 90"
                            fill="none"
                            stroke="#8B75FF"
                            strokeWidth="2.5"
                          />

                          {/* Active Peak Crosshair Indicator ($84.94) */}
                          <circle cx="380" cy="90" r="4.5" fill="#FFFFFF" stroke="#6D55FF" strokeWidth="2.5" />
                        </svg>

                        {/* Callout Badge at $84.94 */}
                        <div className="absolute top-12 left-[58%] -translate-x-1/2 px-2.5 py-1 rounded-md bg-[#6D55FF] text-white text-[10px] font-mono font-bold shadow-[0_0_12px_rgba(109,85,255,0.6)]">
                          $84.94
                        </div>
                      </div>

                      {/* X Axis Dates */}
                      <div className="flex justify-between text-[10px] font-mono text-slate-500 pt-3 border-t border-white/[0.04]">
                        <span>12 Mar</span>
                        <span>14 Mar</span>
                        <span>16 Mar</span>
                        <span>18 Mar</span>
                        <span>20 Mar</span>
                        <span>22 Mar</span>
                        <span>24 Mar</span>
                        <span>26 Mar</span>
                        <span>28 Mar</span>
                      </div>
                    </div>
                  </ProjexionCard>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            SECTION 3: DESIGN SYSTEM PRIMITIVES (BUTTONS & BADGES)
           ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-white/[0.06]">
          {/* Button Styles */}
          <ProjexionCard title="Button Primitives" subtitle="Luminous purple, cyber cyan, and glass states">
            <div className="flex flex-wrap gap-3 pt-2">
              <ProjexionButton variant="primary">Primary Luminous</ProjexionButton>
              <ProjexionButton variant="cyan">Cyber Cyan</ProjexionButton>
              <ProjexionButton variant="glass">Glass Surface</ProjexionButton>
              <ProjexionButton variant="ghost">Ghost Button</ProjexionButton>
              <ProjexionButton variant="primary" loading>Loading</ProjexionButton>
            </div>
          </ProjexionCard>

          {/* Badges & Status Chips */}
          <ProjexionCard title="Badge & Delta Primitives" subtitle="Percentage chips and telemetry indicators">
            <div className="flex flex-wrap gap-2.5 pt-2">
              <ProjexionBadge delta="+0.45%" isPositive />
              <ProjexionBadge delta="-0.30%" isNegative />
              <ProjexionBadge delta="-0.65%" isNegative />
              <ProjexionBadge variant="amber" delta="+12% ↑" />
              <ProjexionBadge variant="cyan" dot>Verified VASP</ProjexionBadge>
              <ProjexionBadge variant="indigo" dot>AI Copilot v2.4</ProjexionBadge>
              <ProjexionBadge variant="rose" dot>Critical Threat</ProjexionBadge>
            </div>
          </ProjexionCard>
        </div>

        {/* =========================================================
            SECTION 4: FLOATING PILL NAVIGATION
           ========================================================= */}
        <div className="pt-4 border-t border-white/[0.06] text-center space-y-4">
          <div className="text-xs font-mono font-semibold tracking-wider text-slate-400 uppercase">
            Floating Pill Navigation Dock
          </div>
          <div className="flex justify-center">
            <FloatingPillNav
              activeIndex={activePillIndex}
              onChange={(idx: number) => setActivePillIndex(idx)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignSystemShowcase;
