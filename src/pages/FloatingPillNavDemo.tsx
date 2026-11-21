import React, { useState } from 'react';
import { FloatingPillNav, DEFAULT_PILL_NAV_ITEMS } from '../components/common/FloatingPillNav';
import { motion, AnimatePresence } from 'framer-motion';

export const FloatingPillNavDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabContents = [
    {
      title: 'Home / Horizon',
      tag: '01 / DASHBOARD',
      desc: 'Central command telemetry, global liquidity overview, and real-time transaction activity feed.',
      stats: [
        { label: 'Active Monitored Nodes', value: '1,420' },
        { label: 'Network Throughput', value: '3,840 tx/s' },
        { label: 'Sync Latency', value: '120 ms' }
      ]
    },
    {
      title: 'Analytics / Equalizer',
      tag: '02 / FORENSIC METRICS',
      desc: 'Multi-hop transfer distributions, volume structuring frequency, and clustering heuristics.',
      stats: [
        { label: 'Volume Analyzed (24h)', value: '$48.2M' },
        { label: 'Peeling Chains Flagged', value: '37' },
        { label: 'Heuristic Match Rate', value: '99.4%' }
      ]
    },
    {
      title: 'Wallet / Cards',
      tag: '03 / ASSET MANAGEMENT',
      desc: 'Multi-chain custodial and non-custodial wallet clusters, token balances, and counterparty risks.',
      stats: [
        { label: 'Total Tracked Assets', value: '$12.4M' },
        { label: 'VASP Interactivity', value: 'Regulated' },
        { label: 'Mixer Exposure', value: '0.00%' }
      ]
    },
    {
      title: 'History / Activity',
      tag: '04 / EVENT TIMELINE',
      desc: 'Immutable audit trail, past investigation logs, and chronological transaction receipts.',
      stats: [
        { label: 'Recorded Incidents', value: '84' },
        { label: 'Resolved Inquiries', value: '79' },
        { label: 'Audit Proof Hashes', value: 'SHA-256' }
      ]
    },
    {
      title: 'Profile / Account',
      tag: '05 / INVESTIGATOR IDENTITY',
      desc: 'Analyst credentials, security clearance levels, session keys, and compliance authorizations.',
      stats: [
        { label: 'Security Clearance', value: 'Tier 3 (Lead)' },
        { label: 'Assigned Bureau', value: 'Cyber Forensics' },
        { label: 'Authentication', value: 'Hardware Key' }
      ]
    }
  ];

  const currentTab = tabContents[activeTab];

  return (
    <div className="min-h-screen w-full bg-[#F7F8FA] text-slate-800 flex flex-col items-center justify-between p-6 sm:p-12 font-sans selection:bg-[#1E1B84] selection:text-white">
      <header className="w-full max-w-2xl text-center space-y-2 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EAEE] text-xs font-semibold tracking-wider text-slate-600 uppercase">
          Interactive Design Spec
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Minimalist Floating Pill Navigation
        </h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Built with React, Tailwind CSS, and Framer Motion. Layered duotone SVG icons, elastic spring physics, and choreographed reveals.
        </p>
      </header>

      <main className="w-full max-w-lg my-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            id={`pill-tabpanel-${DEFAULT_PILL_NAV_ITEMS[activeTab].id}`}
            role="tabpanel"
            aria-labelledby={`pill-tab-${DEFAULT_PILL_NAV_ITEMS[activeTab].id}`}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl bg-white p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] border border-slate-100/80"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-medium tracking-wider text-[#1E1B84] bg-indigo-50 px-2.5 py-1 rounded-md">
                {currentTab.tag}
              </span>
              <span className="text-xs font-medium text-slate-400">
                Slot {activeTab + 1} of 5
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-900 mb-2">
              {currentTab.title}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {currentTab.desc}
            </p>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100">
              {currentTab.stats.map((s, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider font-medium truncate">
                    {s.label}
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-slate-800 font-mono">
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      <section className="sticky bottom-8 z-30 flex flex-col items-center gap-3">
        <FloatingPillNav
          activeIndex={activeTab}
          onChange={(index) => setActiveTab(index)}
        />

        <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400 pt-1">
          <span>Use <kbd className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold">→</kbd> Arrow Keys</span>
          <span>•</span>
          <span>Spring: 380/30</span>
          <span>•</span>
          <span>Icon Delay: 100ms</span>
        </div>
      </section>
    </div>
  );
};

export default FloatingPillNavDemo;

