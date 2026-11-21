import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Handle,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import {
  Search,
  GitMerge,
  Wallet,
  Bell,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  Database,
  GitBranch,
  FileSearch,
  CheckCircle2,
  ChevronRight,
  RefreshCw,
  Layers,
  RotateCcw,
  Filter,
  X
} from 'lucide-react';
import { BlockchainService } from '../services/blockchainService';
import { WalletProfileData } from '../types';
import { MOCK_FLOW_NODES, MOCK_FLOW_EDGES } from '../data/mockData';
import { RiskBadge } from '../components/common/RiskBadge';
import { RiskScoreCard } from '../components/common/RiskScoreCard';
import { AddressCopy } from '../components/common/AddressCopy';
import { CustomWalletNode } from '../components/common/CustomWalletNode';
import { AgentSteps, DEFAULT_BITCOIN_AUDIT_STEPS, AgentStepsHandle } from '../components/common/AgentSteps';
import { Sparkles, Bot, Terminal, Play } from 'lucide-react';


export const WalletAnalyzer: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [searchMode, setSearchMode] = useState<'address' | 'hash'>('address');
  const [inputVal, setInputVal] = useState(searchParams.get('q') || '');
  const [selectedChain, setSelectedChain] = useState('Bitcoin');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedData, setAnalyzedData] = useState<WalletProfileData | null>(null);

  // Active view tab inside Wallet Analyzer: 'flow' (Flow Explorer Graph), 'agent' (AI Agent Pipeline), or 'dossier' (Risk Dossier)
  const [activeTab, setActiveTab] = useState<'flow' | 'dossier' | 'agent'>('flow');
  const agentStepsRef = React.useRef<AgentStepsHandle>(null);
  const [isAgentRunning, setIsAgentRunning] = useState(false);

  const handleRunAgent = () => {
    setActiveTab('agent');
    setIsAgentRunning(true);
    agentStepsRef.current?.run().finally(() => {
      setIsAgentRunning(false);
    });
  };

  // React Flow State
  const nodeTypes = useMemo(() => ({ customNode: CustomWalletNode }), []);
  const [nodes, setNodes, onNodesChange] = useNodesState(MOCK_FLOW_NODES as any);
  const [edges, setEdges, onEdgesChange] = useEdgesState(MOCK_FLOW_EDGES as any);
  const [selectedNodeData, setSelectedNodeData] = useState<any | null>(null);

  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [amountFilter, setAmountFilter] = useState<string>('all');

  const onNodeClick = useCallback((_: any, node: Node) => {
    setSelectedNodeData(node.data);
  }, []);

  const resetGraphView = () => {
    setNodes(MOCK_FLOW_NODES as any);
    setEdges(MOCK_FLOW_EDGES as any);
  };

  useEffect(() => {
    const q = searchParams.get('q');
    const tab = searchParams.get('tab');
    if (tab === 'dossier' || tab === 'evidence' || tab === 'risk') {
      setActiveTab('dossier');
    } else if (tab === 'agent' || tab === 'pipeline') {
      setActiveTab('agent');
    } else if (tab === 'flow') {
      setActiveTab('flow');
    }

    const targetAddress = q || '0x82A7656EC7ab88b098defB751B7401B5f6d8976F';
    setInputVal(targetAddress);
    executeInvestigation(targetAddress);
  }, [searchParams]);

  const executeInvestigation = async (targetQuery: string) => {
    setIsAnalyzing(true);
    const data = await BlockchainService.getWalletProfile(targetQuery);
    setAnalyzedData(data);
    setIsAnalyzing(false);
  };

  const handleStartInvestigation = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      executeInvestigation(inputVal.trim());
      if (activeTab === 'agent') {
        handleRunAgent();
      }
    }
  };

  const handleSampleClick = () => {
    const sampleAddress = '0x82A7656EC7ab88b098defB751B7401B5f6d8976F';
    setInputVal(sampleAddress);
    executeInvestigation(sampleAddress);
    if (activeTab === 'agent') {
      handleRunAgent();
    }
  };

  // Visually connected 4-Step Investigation Workflow (COLLECT → TRACE → ANALYZE → EXPLAIN)
  const steps = [
    {
      num: '01',
      title: 'COLLECT',
      subtitle: 'Retrieve Blockchain Data',
      desc: 'Ingests real-time transactions, smart contract calls, and token balances.',
      icon: Database
    },
    {
      num: '02',
      title: 'TRACE',
      subtitle: 'Follow Connected Transfers',
      desc: 'Maps multi-hop fund flows across intermediate wallets and cross-chain bridges.',
      icon: GitBranch
    },
    {
      num: '03',
      title: 'ANALYZE',
      subtitle: 'Detect Risk Patterns',
      desc: 'Runs automated rule engines for peel-chains, mixers, and OFAC SDN lists.',
      icon: FileSearch
    },
    {
      num: '04',
      title: 'EXPLAIN',
      subtitle: 'Synthesize Assessment',
      desc: 'Produces quantifiable threat scores and FinCEN SAR evidence reports.',
      icon: CheckCircle2
    }
  ];

  return (
    <div className="p-4 md:p-5 space-y-5 max-w-7xl mx-auto">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono font-bold text-xs border border-blue-500/30">
            UNIFIED FORENSIC MODULE
          </span>
          <span className="text-xs text-slate-400 font-mono">Wallet Audit &amp; Flow Graph</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <Search className="w-6 h-6 text-blue-400" />
          <span>Wallet Analyzer</span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5 max-w-3xl">
          Unified investigation workspace combining real-time wallet risk screening, watchlist audits, and visual multi-hop transaction flow graph mapping.
        </p>
      </div>

      {/* Main Investigation Input Card */}
      <div className="bg-navy-900 border border-navy-800 rounded-lg p-5 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-navy-800 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchMode('address')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all font-mono ${
                searchMode === 'address'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-navy-950 text-slate-400 hover:text-slate-200 border border-navy-800'
              }`}
            >
              [ Wallet Address ]
            </button>
            <button
              onClick={() => setSearchMode('hash')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all font-mono ${
                searchMode === 'hash'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-navy-950 text-slate-400 hover:text-slate-200 border border-navy-800'
              }`}
            >
              [ Transaction Hash ]
            </button>
          </div>

          <button
            onClick={handleSampleClick}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 underline underline-offset-4 flex items-center gap-1"
          >
            <span>Try sample audit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleStartInvestigation} className="grid grid-cols-1 md:grid-cols-12 gap-2.5">
          <div className="md:col-span-8">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={
                  searchMode === 'address'
                    ? 'Enter wallet address (e.g. 0x82A7656EC7ab88b098defB751B7401B5f6d8976F)'
                    : 'Enter transaction hash (e.g. 0x9a8f3b21c4e5d67890123...)'
                }
                className="w-full bg-navy-950 border border-navy-800 rounded-md pl-9 pr-4 py-2.5 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <select
              value={selectedChain}
              onChange={(e) => setSelectedChain(e.target.value)}
              className="w-full bg-navy-950 border border-navy-800 rounded-md px-3 py-2.5 text-xs text-slate-300 font-semibold focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="Ethereum">Ethereum (ETH)</option>
              <option value="Bitcoin">Bitcoin (BTC)</option>
              <option value="Polygon">Polygon (POL)</option>
              <option value="BNB Chain">BNB Chain (BNB)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isAnalyzing}
              className="w-full h-full min-h-[38px] bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-md shadow-md flex items-center justify-center gap-2 transition-all"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Auditing...</span>
                </>
              ) : (
                <>
                  <Search className="w-3.5 h-3.5" />
                  <span>Start Audit</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* 4-Step Connected Workflow */}
        <div className="pt-3 border-t border-navy-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <div
                key={step.num}
                className="p-3 rounded-md bg-navy-950 border border-navy-800 flex items-start gap-2.5 relative"
              >
                <div className="p-2 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                  <StepIcon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold text-blue-400">{step.num}</span>
                    <h4 className="text-xs font-bold text-white">{step.title}</h4>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{step.subtitle}</p>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="hidden lg:block w-4 h-4 text-navy-700 absolute -right-3 top-1/2 -translate-y-1/2 z-10" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Unified Output: Tab Navigation (Flow Explorer Graph vs Risk Dossier vs AI Agent Pipeline) */}
      <div className="bg-navy-900 border border-navy-800 rounded-lg p-4 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy-800 pb-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('flow')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-bold transition-all ${
                activeTab === 'flow'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-navy-950 text-slate-400 hover:text-white border border-navy-800'
              }`}
            >
              <GitMerge className="w-3.5 h-3.5" />
              <span>Interactive Flow Explorer Graph</span>
            </button>
            <button
              onClick={() => setActiveTab('agent')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-bold transition-all ${
                activeTab === 'agent'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-navy-950 text-slate-400 hover:text-white border border-navy-800'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-400"></span>
              </span>
              <Bot className="w-3.5 h-3.5 text-purple-200" />
              <span>AI Agent Audit Pipeline</span>
            </button>
            <button
              onClick={() => setActiveTab('dossier')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-bold transition-all ${
                activeTab === 'dossier'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-navy-950 text-slate-400 hover:text-white border border-navy-800'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Risk Score &amp; Evidence Dossier</span>
            </button>
          </div>

          {analyzedData && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Audited Target:</span>
              <AddressCopy address={analyzedData.address} />
            </div>
          )}
        </div>

        {/* TAB 0: AI AGENT FORENSIC AUDIT PIPELINE */}
        {activeTab === 'agent' && (
          <div className="space-y-4">
            <div className="bg-navy-950/90 border border-slate-800/80 rounded-xl p-4 md:p-6 shadow-2xl flex flex-col items-center">
              <div className="w-full max-w-2xl mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy-800/80 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-[10px] uppercase font-bold border border-purple-500/30">
                      Autonomous Investigation Pipeline
                    </span>
                    <span className="text-xs text-slate-400 font-mono">On-Demand Execution</span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-white mt-1 flex items-center gap-2">
                    <span>{selectedChain} Forensic Audit &amp; Peeling Analysis</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Autonomous multi-hop tracing, UTXO peeling-chain traversal, mixer de-anonymization, and FinCEN SAR drafting.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-center shrink-0">
                  <button
                    type="button"
                    onClick={handleRunAgent}
                    disabled={isAgentRunning}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white font-mono text-xs font-bold shadow-lg shadow-purple-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    {isAgentRunning ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Running Agent...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Run Agent Pipeline</span>
                      </>
                    )}
                  </button>
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-navy-900 border border-purple-500/30 font-mono text-[11px] text-purple-300">
                    <span className="text-slate-400">Target:</span>
                    <span>{inputVal ? `${inputVal.slice(0, 8)}...${inputVal.slice(-6)}` : 'bc1qxy2kgdygjr...'}</span>
                  </div>
                </div>
              </div>

              {/* Live vs-agent-steps Component */}
              <div className="w-full flex justify-center py-2">
                <AgentSteps
                  ref={agentStepsRef}
                  title={`${selectedChain} Forensic Investigation Agent`}
                  demo="manual"
                  autoStart={false}
                  theme="dark"
                  steps={DEFAULT_BITCOIN_AUDIT_STEPS}
                  onComplete={() => setIsAgentRunning(false)}
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: FLOW EXPLORER GRAPH WORKSPACE */}
        {activeTab === 'flow' && (
          <div className="border border-slate-800/90 rounded-2xl overflow-hidden bg-[#070a12] shadow-2xl flex flex-col">
            {/* 1. Dedicated Top Forensic Header & Stats Strip */}
            <div className="px-6 py-4 border-b border-white/[0.08] bg-[#090d1c]/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#f8fafc] font-sans">
                  Fund flow trace
                </h2>
                <p className="text-xs sm:text-[13px] text-[#8b94a7] mt-0.5">
                  100 ETH ($248,420) drained from the vault, then split across a hop wallet and a mixer
                </p>
              </div>

              <div className="flex items-center gap-6 self-start md:self-center pr-2">
                <div className="text-right">
                  <div className="text-[10px] font-mono font-bold tracking-wider text-[#7c8699] uppercase">
                    TOTAL TRACED
                  </div>
                  <div className="text-xl sm:text-2xl font-mono font-bold text-[#f8fafc]">
                    $248,420
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono font-bold tracking-wider text-[#7c8699] uppercase">
                    EXIT PATHS
                  </div>
                  <div className="text-xl sm:text-2xl font-mono font-bold text-[#f8fafc]">
                    2
                  </div>
                </div>
              </div>
            </div>

            {/* 2. 4 Stage Columns Sub-Header */}
            <div className="px-6 py-2.5 bg-[#0b1022]/95 border-b border-white/[0.06] grid grid-cols-4 gap-6">
              {[
                { num: '01', name: 'SOURCE' },
                { num: '02', name: 'SUSPECT' },
                { num: '03', name: 'HOP OR MIXER' },
                { num: '04', name: 'EXIT POINT' }
              ].map((col) => (
                <div key={col.num} className="space-y-1">
                  <div className="text-[11px] font-mono font-bold tracking-wider text-[#7c8699] uppercase">
                    {col.num} {col.name}
                  </div>
                  <div className="h-[1px] w-full bg-white/[0.12]" />
                </div>
              ))}
            </div>

            {/* 3. Graph View Controls Bar */}
            <div className="px-6 py-2 bg-[#080d1a]/80 border-b border-white/[0.04] flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono text-slate-400 font-bold uppercase text-[10px]">
                  Graph View Controls:
                </span>
                <select
                  value={riskFilter}
                  onChange={(e) => setRiskFilter(e.target.value)}
                  className="bg-navy-900 text-slate-200 border border-navy-800 rounded px-2 py-1 focus:outline-none"
                >
                  <option value="all">All Risk Levels</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                {selectedNodeData && (
                  <button
                    onClick={() => setSelectedNodeData(null)}
                    className="px-2.5 py-1 bg-blue-950/60 hover:bg-blue-900/60 text-blue-300 rounded border border-blue-500/30 font-mono text-[11px] flex items-center gap-1 transition-colors"
                  >
                    <X className="w-3 h-3" />
                    <span>Close Evidence Drawer</span>
                  </button>
                )}
                <button
                  onClick={resetGraphView}
                  className="px-2.5 py-1 bg-navy-900 hover:bg-navy-800 text-slate-300 rounded border border-navy-800 font-mono text-[11px] flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset View</span>
                </button>
              </div>
            </div>

            {/* 4. Canvas + Selected Node Evidence Drawer */}
            <div className="h-[620px] min-h-[580px] overflow-hidden relative bg-[#070a12] flex">
              {/* Soft Radial Ambient Glows */}
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(1000px_600px_at_12%_8%,rgba(56,92,255,0.14),transparent_60%),radial-gradient(900px_600px_at_95%_100%,rgba(244,63,94,0.10),transparent_60%)] z-0" />

              <div className="flex-1 h-full relative z-10">
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onNodeClick={onNodeClick}
                  nodeTypes={nodeTypes}
                  fitView
                  fitViewOptions={{ padding: 0.16, includeHiddenNodes: false }}
                  minZoom={0.2}
                  maxZoom={1.8}
                >
                  <Background color="rgba(255,255,255,0.05)" gap={24} size={1} />
                  <Controls className="bg-[#090e1c] border border-slate-800 rounded-lg overflow-hidden fill-slate-300 shadow-xl" />
                    <MiniMap
                      className="bg-[#090e1c] border border-slate-800 rounded-lg overflow-hidden shadow-xl"
                      nodeColor={(node) => {
                        if (node.data?.riskLevel === 'critical') return '#EF4444';
                        if (node.data?.riskLevel === 'high') return '#F97316';
                        return '#3B82F6';
                      }}
                    />
                  </ReactFlow>

                  {/* Bottom Legend Overlay */}
                  <div className="absolute bottom-4 left-6 z-10 pointer-events-none hidden sm:flex items-center gap-4 text-xs bg-[#070a12]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/[0.08] shadow-lg">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#34d399] shadow-[0_0_8px_#34d399]" />
                      <span className="text-[#98a2b3] font-medium">Low risk</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#fb923c] shadow-[0_0_8px_#fb923c]" />
                      <span className="text-[#98a2b3] font-medium">High risk</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#f43f5e] shadow-[0_0_8px_#f43f5e]" />
                      <span className="text-[#98a2b3] font-medium">Critical risk</span>
                    </div>
                    <span className="text-[#7c8699] text-[11px] hidden md:inline ml-2 font-mono">
                      Line colour shows the risk of the receiving wallet. Labels show value moved.
                    </span>
                  </div>
                </div>

                {/* Selected Node Evidence Panel */}
              {selectedNodeData && (
                <div className="w-80 sm:w-96 bg-navy-900 border-l border-navy-800 flex flex-col justify-between p-4 shadow-2xl overflow-y-auto z-20">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2.5 border-b border-navy-800">
                      <div>
                        <span className="text-[9px] font-bold text-blue-400 uppercase tracking-wider font-mono">
                          INVESTIGATION EVIDENCE
                        </span>
                        <h3 className="text-sm font-bold text-white mt-0.5 truncate">
                          {selectedNodeData.label}
                        </h3>
                      </div>
                      <button
                        onClick={() => setSelectedNodeData(null)}
                        className="p-1 text-slate-400 hover:text-white rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <AddressCopy address={selectedNodeData.address} truncate={false} linkToProfile={false} />

                    <div className="flex items-center justify-between">
                      <RiskBadge level={selectedNodeData.riskLevel} score={selectedNodeData.riskScore} size="md" />
                      <span className="text-xs font-mono text-slate-400">
                        Chain: <strong className="text-white">{selectedNodeData.chain}</strong>
                      </span>
                    </div>

                    {/* Elaborated Transaction Breakdown */}
                    <div className="grid grid-cols-2 gap-2 bg-navy-950 p-2.5 rounded border border-navy-800 text-xs">
                      <div>
                        <span className="text-slate-400 text-[9px] font-mono uppercase">Total Inflow</span>
                        <div className="font-mono font-bold text-emerald-400 mt-0.5">
                          ${((selectedNodeData.totalInflowUSD || selectedNodeData.balanceUSD * 1.5) / 1000).toFixed(1)}k
                        </div>
                        {selectedNodeData.totalInflowCrypto && (
                          <div className="text-[9px] text-slate-400 font-mono">
                            {selectedNodeData.totalInflowCrypto}
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="text-slate-400 text-[9px] font-mono uppercase">Total Outflow</span>
                        <div className="font-mono font-bold text-rose-400 mt-0.5">
                          ${((selectedNodeData.totalOutflowUSD !== undefined ? selectedNodeData.totalOutflowUSD : selectedNodeData.balanceUSD * 1.2) / 1000).toFixed(1)}k
                        </div>
                        {selectedNodeData.totalOutflowCrypto && (
                          <div className="text-[9px] text-slate-400 font-mono">
                            {selectedNodeData.totalOutflowCrypto}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Balance & Velocity */}
                    <div className="bg-navy-950 p-2.5 rounded border border-navy-800 text-xs space-y-1.5 font-mono">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-[10px]">Net Balance:</span>
                        <span className="font-bold text-white">
                          ${(selectedNodeData.balanceUSD / 1000).toFixed(1)}k
                          {selectedNodeData.balanceCrypto && ` (${selectedNodeData.balanceCrypto})`}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-[10px]">Transactions:</span>
                        <span className="font-bold text-white">{selectedNodeData.transactionCount?.toLocaleString()}</span>
                      </div>
                      {selectedNodeData.velocity && (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 text-[10px]">Velocity:</span>
                          <span className="font-bold text-amber-400">{selectedNodeData.velocity}</span>
                        </div>
                      )}
                    </div>

                    {/* Primary Forensic Flag */}
                    {selectedNodeData.primaryRiskFlag && (
                      <div className="bg-rose-950/30 border border-rose-500/30 p-2.5 rounded text-xs">
                        <span className="text-[9px] font-mono font-bold text-rose-400 uppercase block mb-1">
                          Primary Threat Flag
                        </span>
                        <p className="text-slate-200 text-[11px] leading-relaxed">
                          {selectedNodeData.primaryRiskFlag}
                        </p>
                      </div>
                    )}

                    {/* Detected Risk Indicators */}
                    {selectedNodeData.riskIndicators && selectedNodeData.riskIndicators.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                          Detected Risk Indicators
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedNodeData.riskIndicators.map((ind: string, i: number) => (
                            <span
                              key={i}
                              className="text-[10px] font-mono px-2 py-0.5 rounded bg-navy-950 text-slate-300 border border-navy-800"
                            >
                              {ind}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 pt-3 border-t border-navy-800 mt-3">
                    <button
                      onClick={() => navigate(`/wallet/${encodeURIComponent(selectedNodeData.address)}`)}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded shadow transition-all flex items-center justify-center gap-2"
                    >
                      <Wallet className="w-3.5 h-3.5" />
                      <span>Open Wallet Profile</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: THREAT SCORE & RISK DOSSIER */}
        {activeTab === 'dossier' && isAnalyzing && (
          <div className="p-16 text-center text-slate-400 font-mono text-xs flex flex-col items-center justify-center gap-3 bg-[#060a16] border border-slate-800 rounded-xl shadow-xl">
            <div className="w-7 h-7 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-slate-300 font-semibold tracking-wide">
              Analyzing Target Wallet &amp; Evaluating Risk Indicators...
            </span>
          </div>
        )}

        {activeTab === 'dossier' && !isAnalyzing && analyzedData && (
          <div className="space-y-5 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <RiskScoreCard
                score={analyzedData.riskScore}
                level={analyzedData.riskLevel}
                explanation={`Evaluated based on detected risk indicators: ${analyzedData.flags.join(', ')}.`}
              />

              <div className="lg:col-span-2 bg-navy-950 border border-navy-800 rounded-lg p-4 space-y-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Watchlist &amp; Sanctions Screening
                </h3>
                <div className="p-3 rounded bg-navy-900 border border-navy-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400">OFAC SDN List Status:</span>
                    <div className="font-mono font-bold text-red-400 mt-0.5">
                      {analyzedData.sanctionsMatch.isSanctioned ? 'Match Identified (SDN Watchlist)' : 'No Match'}
                    </div>
                  </div>
                  {analyzedData.sanctionsMatch.sdnId && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 font-bold">
                      {analyzedData.sanctionsMatch.sdnId}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-300 font-mono">Detected Risk Indicators:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {analyzedData.riskIndicators.map((ind) => (
                      <div key={ind.id} className="p-2.5 rounded bg-navy-900 border border-navy-800 flex items-start gap-2">
                        <RiskBadge level={ind.severity} size="sm" />
                        <div>
                          <div className="text-xs font-bold text-white">{ind.name}</div>
                          <p className="text-[10px] text-slate-400 mt-0.5">{ind.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
