import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  ShieldAlert,
  GitMerge,
  AlertTriangle,
  Bot,
  Copy,
  Check,
  ArrowRight,
  FileText,
  Activity,
  Layers,
  Droplet,
  Share2,
  Zap,
  ChevronRight,
  Info
} from 'lucide-react';
import { LaserFlow } from '../components/common/LaserFlow';
import { DashboardMetricCards } from '../components/common/DashboardMetricCards';
import ScrollStack, { ScrollStackItem, ScrollStackHandle } from '../components/common/ScrollStack';
import { JasoosLogo } from '../components/common/JasoosLogo';

interface PriorityCase {
  id: string;
  accentColor: string;
  wallet: string;
  fullAddress: string;
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  riskLabel: string;
  reason: string;
  lastActivity: string;
}

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const pedestalRef = useRef<HTMLDivElement | null>(null);
  const workflowStackRef = useRef<ScrollStackHandle | null>(null);
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState(0);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const handleCopy = (address: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const priorityCases: PriorityCase[] = [
    {
      id: 'CF-024',
      accentColor: 'bg-cyan-400',
      wallet: '0x82A7...97F6E',
      fullAddress: '0x82A7656EC7ab88b098defB751B7401B5f6d8976E',
      riskLevel: 'critical',
      riskLabel: 'Critical Risk',
      reason: 'Suspicious Activity Detected: Circular flow pattern + rapid movement across 4 hop addresses within 12 hours.',
      lastActivity: '2 min ago'
    },
    {
      id: 'CF-017',
      accentColor: 'bg-orange-500',
      wallet: '0x71C7...9F6E',
      fullAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976E',
      riskLevel: 'high',
      riskLabel: 'High Risk',
      reason: 'Potential Fraud Indicators Detected: Fan-out behavior splitting lump sum deposits into 9 distinct output addresses.',
      lastActivity: '8 min ago'
    },
    {
      id: 'CF-013',
      accentColor: 'bg-cyan-500',
      wallet: '0x483e...2d1F',
      fullAddress: '0x483eB6842790938CBE4C0A1e72C833b70e702d1F',
      riskLevel: 'medium',
      riskLabel: 'Medium Risk',
      reason: 'Unusual transaction pattern: large movement to mixing service.',
      lastActivity: '15 min ago'
    },
    {
      id: 'CF-009',
      accentColor: 'bg-emerald-400',
      wallet: '0x9f2a...7c8B',
      fullAddress: '0x9f2a24C033a38E619E6a15F15b02660a9F807c8B',
      riskLevel: 'low',
      riskLabel: 'Low Risk',
      reason: 'Minor anomaly detected: unusual time-based activity.',
      lastActivity: '32 min ago'
    }
  ];

  return (
    <div className="w-full px-6 sm:px-8 lg:px-10 py-6 sm:py-8 space-y-6 select-none font-sans">
      {/* =========================================================
          SECTION 1: HERO AREA (MAIN HERO CARD + QUICK ACTIONS PANEL)
         ========================================================= */}
      <section className="flex flex-col xl:flex-row gap-5 items-stretch">
        {/* Main Hero Card */}
        <div className="flex-1 rounded-3xl bg-[#080d1c] border border-[#162343] relative overflow-hidden shadow-2xl p-7 md:p-9 flex flex-col lg:flex-row items-center justify-between gap-8 min-h-[360px]">
          {/* Integrated WebGL LaserFlow Beam */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-85">
            <LaserFlow
              surfaceRef={pedestalRef}
              beamPosition={0.68}
              color="#3847ff"
              intensity={2.1}
              flare={1.6}
              spread={1.6}
              spill={1.2}
              fog={0.25}
              dust={1.8}
              speed={1.6}
              mouseInteraction={true}
            />
          </div>

          {/* Left: Heading, Badge, Subtitle & Action Buttons */}
          <div className="relative z-10 space-y-4 max-w-xl">
            {/* Small outlined badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/40 text-blue-400 text-[11px] font-mono font-bold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span>Next-Gen Financial Forensics Platform</span>
            </div>

            {/* Large Heading */}
            <div className="space-y-1.5">
              <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-black tracking-tight text-white font-mono leading-none flex items-center">
                <span>CRYPTO-</span>
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(59,130,246,0.55)]">
                  JASOOS
                </span>
              </h1>
              <p className="text-base sm:text-lg font-bold text-slate-100">
                Tracing Crypto Flows for Smarter Cyber Investigations.
              </p>
            </div>

            {/* Supporting Description */}
            <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed font-sans">
              Professional digital-forensics investigation console designed for compliance officers, cybersecurity analysts, and fraud investigators to audit suspicious wallets and trace multi-hop fund flows.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => navigate('/wallet-analyzer')}
                className="flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.45)] border border-blue-400/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Search className="w-4 h-4" />
                <span>Launch Wallet Analyzer</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              <button
                onClick={() => navigate('/ai-investigation')}
                className="flex items-center gap-2.5 px-5 py-3 bg-[#0a1020]/90 hover:bg-[#111a33] text-slate-200 border border-slate-700/80 font-semibold text-xs rounded-xl shadow-sm transition-all hover:border-slate-600 active:scale-[0.98]"
              >
                <Bot className="w-4 h-4 text-purple-400" />
                <span>Ask Forensic AI</span>
              </button>
            </div>
          </div>

          {/* Right: Cinematic Visuals (Laser impact target, Bitcoin hologram, Floating chips) */}
          <div className="relative z-10 w-full lg:w-[380px] h-[300px] flex items-center justify-center shrink-0">
            {/* Target Surface for the LaserFlow beam - Clean smooth dark glass without dots */}
            <div
              ref={pedestalRef}
              className="absolute inset-x-4 bottom-4 top-20 rounded-2xl bg-gradient-to-b from-[#0e1733]/50 to-[#070b16]/90 border border-blue-500/20 shadow-[0_0_30px_rgba(37,99,235,0.15)] backdrop-blur-md overflow-hidden"
            />

            {/* Official Animated JASOOS Crypto Forensics Logo */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              <JasoosLogo size={140} showWordmark={true} showSubtitle={true} animated={true} />
            </div>

            {/* 4 Floating Wallet Nodes */}
            <div className="absolute top-4 left-0 z-20 px-2.5 py-1.5 rounded-lg bg-[#0b1226]/90 border border-blue-500/40 text-[11px] font-mono font-bold text-slate-200 shadow-xl backdrop-blur-md flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span>0x8e2F...4e3D</span>
            </div>

            <div className="absolute top-6 right-2 z-20 px-2.5 py-1.5 rounded-lg bg-[#0b1226]/90 border border-purple-500/40 text-[11px] font-mono font-bold text-slate-200 shadow-xl backdrop-blur-md flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span>0x71C7...9f6E</span>
            </div>

            <div className="absolute bottom-6 left-2 z-20 px-2.5 py-1.5 rounded-lg bg-[#0b1226]/90 border border-cyan-500/40 text-[11px] font-mono font-bold text-slate-200 shadow-xl backdrop-blur-md flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>0x483e...2d1F</span>
            </div>

            <div className="absolute bottom-4 right-2 z-20 px-2.5 py-1.5 rounded-lg bg-[#0b1226]/90 border border-emerald-500/40 text-[11px] font-mono font-bold text-slate-200 shadow-xl backdrop-blur-md flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>0x9f2a...7c8B</span>
            </div>
          </div>
        </div>

        {/* Quick Actions Panel (Separate Card on the Right) */}
        <div className="w-full xl:w-[310px] shrink-0 rounded-3xl bg-[#080d1c] border border-[#162343] p-6 shadow-2xl flex flex-col justify-between">
          <div>
            {/* Panel Heading */}
            <div className="flex items-center gap-2.5 pb-4 mb-2 border-b border-[#141e3a]">
              <Zap className="w-4 h-4 text-blue-400 fill-blue-400/20" />
              <h2 className="text-sm font-bold text-white tracking-wide">Quick Actions</h2>
            </div>

            {/* 4 Action Rows */}
            <div className="space-y-2.5">
              {/* Row 1: Track Flows Across Chains */}
              <button
                onClick={() => navigate('/wallet-analyzer')}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#0b1122]/70 hover:bg-[#121c36] border border-slate-800/80 hover:border-blue-500/40 transition-all group text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center shrink-0">
                    <Layers className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                      Track Flows
                    </div>
                    <div className="text-[11px] text-slate-400">Across Chains</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </button>

              {/* Row 2: Detect Suspicious Activity */}
              <button
                onClick={() => navigate('/alerts')}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#0b1122]/70 hover:bg-[#121c36] border border-slate-800/80 hover:border-rose-500/40 transition-all group text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-center shrink-0">
                    <Droplet className="w-4 h-4 text-rose-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-rose-300 transition-colors">
                      Detect Suspicious
                    </div>
                    <div className="text-[11px] text-slate-400">Activity</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </button>

              {/* Row 3: Visualize Multi-Hop Transfers */}
              <button
                onClick={() => navigate('/wallet-analyzer')}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#0b1122]/70 hover:bg-[#121c36] border border-slate-800/80 hover:border-cyan-500/40 transition-all group text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center shrink-0">
                    <Share2 className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                      Visualize
                    </div>
                    <div className="text-[11px] text-slate-400">Multi-Hop Transfers</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </button>

              {/* Row 4: Generate Actionable Reports */}
              <button
                onClick={() => navigate('/reports')}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#0b1122]/70 hover:bg-[#121c36] border border-slate-800/80 hover:border-purple-500/40 transition-all group text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                      Generate
                    </div>
                    <div className="text-[11px] text-slate-400">Actionable Reports</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 2: 4 KPI CARDS (RESPONSIVE ROW MATCHING REFERENCE DESIGN)
         ========================================================= */}
      <section>
        <DashboardMetricCards />
      </section>

      {/* =========================================================
          SECTION 3: INVESTIGATION WORKFLOW (REACT BITS SCROLLSTACK)
         ========================================================= */}
      <section className="rounded-2xl bg-[#060914] border border-[#141f3d] p-6 sm:p-7 shadow-2xl space-y-5 relative overflow-hidden">
        {/* Workflow Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-[#141f3d]/70">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600/30 to-indigo-600/10 border border-blue-500/40 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.25)]">
              <Activity className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-blue-500/15 text-blue-400 border border-blue-500/30">
                  Forensic Pipeline
                </span>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">Autonomous 3-Stage Engine</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide font-mono mt-0.5">
                INVESTIGATION WORKFLOW
              </h2>
            </div>
          </div>

          {/* Interactive Stage Controls & Scroll Hint */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-400 font-mono hidden md:inline">
              Scroll stack or jump to stage:
            </span>
            <div className="flex items-center gap-1.5 p-1 bg-[#090e1c] border border-[#141f3d] rounded-xl">
              {[
                { label: '01 Detect', color: 'cyan', idx: 0 },
                { label: '02 Trace', color: 'purple', idx: 1 },
                { label: '03 Report', color: 'blue', idx: 2 }
              ].map((step) => {
                const isActive = activeWorkflowIndex === step.idx;
                return (
                  <button
                    key={step.idx}
                    type="button"
                    onClick={() => {
                      setActiveWorkflowIndex(step.idx);
                      workflowStackRef.current?.scrollToIndex(step.idx);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border ${isActive
                      ? step.color === 'cyan'
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60 shadow-[0_0_12px_rgba(6,182,212,0.35)]'
                        : step.color === 'purple'
                          ? 'bg-purple-500/20 text-purple-300 border-purple-500/60 shadow-[0_0_12px_rgba(168,85,247,0.35)]'
                          : 'bg-blue-500/20 text-blue-300 border-blue-500/60 shadow-[0_0_12px_rgba(59,130,246,0.35)]'
                      : 'bg-transparent text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-800/40'
                      }`}
                  >
                    {step.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ScrollStack Component (Contained scroll mode with explicit height: 600) */}
        <div style={{ height: 600 }} className="w-full relative">
          <ScrollStack
            ref={workflowStackRef}
            itemDistance={90}
            itemStackDistance={24}
            stackPosition="20px"
            itemScale={0.04}
            baseScale={0.88}
            dimAmount={0.25}
            blurAmount={0}
            tiltAmount={0}
            rotationAmount={0}
            holdDistance={140}
            smoothScroll={false}
            className="w-full"
            onIndexChange={(idx) => setActiveWorkflowIndex(idx)}
          >
            {/* STAGE 1: DETECT */}
            <ScrollStackItem itemClassName="p-7 min-h-[350px] flex flex-col justify-between bg-gradient-to-br from-[#0c1328] via-[#080d1c] to-[#04060d] border border-cyan-500/35 shadow-[0_0_25px_rgba(6,182,212,0.12)]">
              {/* Header info */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                      01 / DETECT
                    </span>
                    <span className="text-xs font-mono text-cyan-400/90 tracking-wider uppercase font-semibold">
                      Suspicious Wallet Identification &amp; Risk Scoring
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-[11px] font-mono text-cyan-300">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                    <span>Real-Time Ingestion</span>
                  </div>
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                  <div className="lg:col-span-8 space-y-3">
                    <h3 className="text-xl font-bold text-white tracking-wide font-sans">
                      Suspicious Wallet Identification &amp; Risk Analysis
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Continuously ingest on-chain transaction telemetry to flag anomalous peeling chains, high-frequency dispersal patterns, and mixer funneling. Proprietary threat scoring evaluates counterparty clusters and suspicious behavior indices in sub-second latency.
                    </p>

                    {/* Feature Tags */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {['Peeling Chain Detection', 'Mixer Funneling Flags', 'OFAC / Sanctions Screening', 'Score Threat Engine (0-100)'].map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md bg-[#091124] border border-cyan-500/25 text-[11px] font-mono text-cyan-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Forensic Metric HUD */}
                  <div className="lg:col-span-4 bg-[#050814]/90 border border-cyan-500/25 rounded-xl p-4 space-y-2.5 shadow-inner">
                    <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                      Heuristic Snapshot
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Threat Score:</span>
                      <span className="font-mono font-bold text-rose-400">87 / 100 (Critical)</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Rule Triggers:</span>
                      <span className="font-mono text-amber-300">4 Anomaly Flags</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Analysis Latency:</span>
                      <span className="font-mono text-emerald-400">&lt; 1.2s Real-Time</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800/70 mt-3">
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      navigate('/wallet-analyzer?q=0x82A7656EC7ab88b098defB751B7401B5f6d8976F&tab=dossier')
                    }
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs tracking-wide shadow-md shadow-cyan-600/30 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Analyze Target Wallet</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/cases')}
                    className="px-3.5 py-2 rounded-xl bg-[#090f20] hover:bg-[#0f1730] text-slate-300 hover:text-white border border-slate-700/60 font-semibold text-xs transition-colors"
                  >
                    View Active Cases
                  </button>
                </div>
                <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                  Scroll down to stage 02: Trace
                </span>
              </div>
            </ScrollStackItem>

            {/* STAGE 2: TRACE */}
            <ScrollStackItem itemClassName="p-7 min-h-[350px] flex flex-col justify-between bg-gradient-to-br from-[#150d2c] via-[#0c0920] to-[#04060d] border border-purple-500/35 shadow-[0_0_25px_rgba(168,85,247,0.12)]">
              {/* Header info */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                      02 / TRACE
                    </span>
                    <span className="text-xs font-mono text-purple-400/90 tracking-wider uppercase font-semibold">
                      Multi-Hop Blockchain Transaction Graph
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-[11px] font-mono text-purple-300">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                    <span>Graph Traversal Active</span>
                  </div>
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                  <div className="lg:col-span-8 space-y-3">
                    <h3 className="text-xl font-bold text-white tracking-wide font-sans">
                      Multi-Hop Blockchain Transaction Visualization
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Traverse deeply layered cryptocurrency movements across up to 6 hops of separation. Unravel obfuscation layers, cross-chain bridge hops, and multi-signature intermediary wallets with visual directed acyclic flow graphs.
                    </p>

                    {/* Feature Tags */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {['6-Hop Graph Traversal', 'Mixer / Tumbler De-Anonymization', 'Bridge Off-Ramp Tracking', 'Cluster & Entity Labeling'].map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md bg-[#130b26] border border-purple-500/25 text-[11px] font-mono text-purple-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Forensic Metric HUD */}
                  <div className="lg:col-span-4 bg-[#070514]/90 border border-purple-500/25 rounded-xl p-4 space-y-2.5 shadow-inner">
                    <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                      Graph Topology
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Max Hop Depth:</span>
                      <span className="font-mono font-bold text-purple-300">6 Layers Deep</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Mapped Nodes:</span>
                      <span className="font-mono text-white">107 Connected Wallets</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Intercepted Flow:</span>
                      <span className="font-mono text-cyan-300">42.8 ETH ($112,400)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800/70 mt-3">
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => navigate('/wallet-analyzer')}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs tracking-wide shadow-md shadow-purple-600/30 transition-all flex items-center gap-2"
                  >
                    <GitMerge className="w-3.5 h-3.5" />
                    <span>Launch Flow Explorer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/wallet')}
                    className="px-3.5 py-2 rounded-xl bg-[#120a24] hover:bg-[#1a0f33] text-slate-300 hover:text-white border border-slate-700/60 font-semibold text-xs transition-colors"
                  >
                    Wallet Profile Dossier
                  </button>
                </div>
                <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                  Scroll down to stage 03: Report
                </span>
              </div>
            </ScrollStackItem>

            {/* STAGE 3: REPORT */}
            <ScrollStackItem itemClassName="p-7 min-h-[350px] flex flex-col justify-between bg-gradient-to-br from-[#0e1632] via-[#090e22] to-[#04060d] border border-blue-500/35 shadow-[0_0_25px_rgba(59,130,246,0.12)]">
              {/* Header info */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                      03 / REPORT
                    </span>
                    <span className="text-xs font-mono text-blue-400/90 tracking-wider uppercase font-semibold">
                      Forensic Evidence Dossier &amp; Legal Export
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-[11px] font-mono text-blue-300">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                    <span>SAR Compliance Ready</span>
                  </div>
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                  <div className="lg:col-span-8 space-y-3">
                    <h3 className="text-xl font-bold text-white tracking-wide font-sans">
                      Forensic Evidence &amp; Report Generation
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Synthesize timeline events, counterparty manifests, and cryptographic hash proofs into court-admissible dossiers. Export standardized FinCEN Suspicious Activity Reports (SAR) and Law Enforcement agency evidence packages with audit integrity.
                    </p>

                    {/* Feature Tags */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {['Court-Admissible Dossier', 'FinCEN SAR Standard', 'Cryptographic SHA-256 Hashes', 'PDF & CSV Export Ready'].map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md bg-[#091124] border border-blue-500/25 text-[11px] font-mono text-blue-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Forensic Metric HUD */}
                  <div className="lg:col-span-4 bg-[#050917]/90 border border-blue-500/25 rounded-xl p-4 space-y-2.5 shadow-inner">
                    <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                      Evidence Standard
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Compliance Format:</span>
                      <span className="font-mono font-bold text-emerald-400">FinCEN SAR / LEA</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Verification Hash:</span>
                      <span className="font-mono text-slate-300">SHA-256 Verified</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Audit Trail:</span>
                      <span className="font-mono text-blue-300">Immutable Cryptographic Log</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800/70 mt-3">
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => navigate('/reports')}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs tracking-wide shadow-md shadow-blue-600/30 transition-all flex items-center gap-2"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Generate Forensic Report</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/alerts')}
                    className="px-3.5 py-2 rounded-xl bg-[#091124] hover:bg-[#0f1b36] text-slate-300 hover:text-white border border-slate-700/60 font-semibold text-xs transition-colors"
                  >
                    Review Trigger Alerts
                  </button>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 font-semibold hidden sm:inline">
                  ✓ Pipeline Ready for Export
                </span>
              </div>
            </ScrollStackItem>
          </ScrollStack>
        </div>
      </section>

      {/* =========================================================
          SECTION 4: PRIORITY INVESTIGATIONS QUEUE (PANEL & TABLE)
         ========================================================= */}
      <section className="rounded-2xl bg-[#080d1c] border border-[#162343] p-7 shadow-2xl space-y-5">
        {/* Panel Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-600/20 border border-purple-500/35 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Priority Investigations Queue
              </h2>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                Active high-priority case queue requiring immediate forensic review
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/reports')}
            className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors self-start sm:self-auto"
          >
            <span>View All Reports (4)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Forensic Queue Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800/80 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-3">Case ID</th>
                <th className="py-3.5 px-3">Wallet / Investigation</th>
                <th className="py-3.5 px-3">Risk Level</th>
                <th className="py-3.5 px-3">Suspicious Reason / Indicator</th>
                <th className="py-3.5 px-3">Last Activity</th>
                <th className="py-3.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {priorityCases.map((c) => (
                <tr
                  key={c.id}
                  className="hover:bg-[#0d1428]/40 transition-colors group"
                >
                  {/* Case ID with slim colored indicator bar */}
                  <td className="py-4 px-3 font-mono font-bold text-slate-200">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-1 h-5 rounded-full ${c.accentColor}`} />
                      <span>{c.id}</span>
                    </div>
                  </td>

                  {/* Target Wallet with Copy Button */}
                  <td className="py-4 px-3 font-mono text-slate-300">
                    <div className="flex items-center gap-2">
                      <span>{c.wallet}</span>
                      <button
                        onClick={(e) => handleCopy(c.fullAddress, e)}
                        className="text-slate-500 hover:text-slate-300 p-1 rounded hover:bg-slate-800 transition-colors"
                        title="Copy full address"
                      >
                        {copiedAddress === c.fullAddress ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </td>

                  {/* Risk Level Badge */}
                  <td className="py-4 px-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold font-mono border ${c.riskLevel === 'critical'
                        ? 'border-rose-500/40 text-rose-400 bg-rose-500/10'
                        : c.riskLevel === 'high'
                          ? 'border-amber-500/40 text-amber-400 bg-amber-500/10'
                          : c.riskLevel === 'medium'
                            ? 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10'
                            : 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
                        }`}
                    >
                      {c.riskLevel === 'low' ? (
                        <Info className="w-3 h-3" />
                      ) : (
                        <AlertTriangle className="w-3 h-3" />
                      )}
                      <span>{c.riskLabel}</span>
                    </span>
                  </td>

                  {/* Suspicious Reason / Indicator */}
                  <td className="py-4 px-3 text-slate-400 max-w-md font-sans text-[11px] leading-relaxed">
                    {c.reason}
                  </td>

                  {/* Last Activity */}
                  <td className="py-4 px-3 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                    {c.lastActivity}
                  </td>

                  {/* Action Button */}
                  <td className="py-4 px-3 text-right">
                    <button
                      onClick={() =>
                        navigate(`/wallet-analyzer?q=${encodeURIComponent(c.fullAddress)}`)
                      }
                      className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs tracking-wide shadow-md shadow-blue-600/30 transition-all inline-flex items-center gap-1.5 group-hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>Investigate</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
