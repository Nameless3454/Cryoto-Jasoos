import React, { useState } from 'react';
import GooeyNav from '../components/common/GooeyNav';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const GooeyNavDemo: React.FC = () => {
  const navigate = useNavigate();

  const demoItems = [
    { label: 'Home', href: '#' },
    { label: 'Work', href: '#' },
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#' }
  ];

  const appItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Cases', href: '/cases' },
    { label: 'Wallet Analyzer', href: '/wallet-analyzer' },
    { label: 'Forensic AI', href: '/ai-investigation' },
    { label: 'Reports', href: '/reports' }
  ];

  const [activeDemo, setActiveDemo] = useState(3);
  const [activeApp, setActiveApp] = useState(0);

  return (
    <div className="min-h-screen w-full bg-[#080A11] text-slate-100 flex flex-col items-center justify-center p-6 sm:p-12 font-sans relative overflow-hidden selection:bg-[#6D55FF] selection:text-white">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#6D55FF]/[0.08] rounded-full blur-[120px] pointer-events-none" />

      {/* Top back button */}
      <div className="w-full max-w-2xl flex items-center justify-between pb-8 z-10">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-slate-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </button>
        <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">
          React Bits // GooeyNav
        </span>
      </div>

      <div className="w-full max-w-xl text-center space-y-3 z-10 mb-12">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
          GooeyNav Component
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
          WebGL2 particle-based fluid droplet navigation with spring physics and metaball blending.
        </p>
      </div>

      {/* Showcase 1: Exact Demo from React Bits */}
      <div className="w-full max-w-lg p-8 rounded-3xl bg-[#0D111C]/80 border border-white/[0.08] backdrop-blur-xl shadow-2xl space-y-6 flex flex-col items-center z-10">
        <div className="text-center space-y-1">
          <span className="text-[10px] font-mono font-bold text-[#6D55FF] uppercase tracking-wider">
            VARIANT 01 // EXACT REACT BITS SPEC
          </span>
          <p className="text-xs text-slate-400">
            Click any item to see fluid droplets travel and merge
          </p>
        </div>

        <div className="py-4">
          <GooeyNav
            items={demoItems}
            initialActiveIndex={activeDemo}
            theme="dark"
            size="md"
            frame={true}
            particleCount={15}
            spread={50}
            animationTime={600}
            timeVariance={300}
            gooeyness={0.5}
            wobble={0.6}
            hoverEffect={true}
            onChange={(index, item) => {
              setActiveDemo(index);
              console.log(index, item.label);
            }}
          />
        </div>

        <div className="text-[11px] font-mono text-slate-400">
          Active Item: <span className="text-white font-bold">{demoItems[activeDemo]?.label}</span>
        </div>
      </div>

      {/* Showcase 2: CryptoJasoos Application Nav */}
      <div className="w-full max-w-2xl p-8 rounded-3xl bg-[#0D111C]/80 border border-white/[0.08] backdrop-blur-xl shadow-2xl space-y-6 flex flex-col items-center z-10 mt-8">
        <div className="text-center space-y-1">
          <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
            VARIANT 02 // CRYPTOJASOOS NAVIGATION
          </span>
          <p className="text-xs text-slate-400">
            Integrated across the entire application at the bottom floating dock
          </p>
        </div>

        <div className="py-4">
          <GooeyNav
            items={appItems}
            initialActiveIndex={activeApp}
            theme="dark"
            size="md"
            frame={true}
            particleCount={15}
            spread={50}
            animationTime={600}
            timeVariance={300}
            gooeyness={0.5}
            wobble={0.6}
            hoverEffect={true}
            onChange={(index, item) => {
              setActiveApp(index);
              if (item.href) navigate(item.href);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GooeyNavDemo;
