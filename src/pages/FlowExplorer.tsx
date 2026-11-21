import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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
  RotateCcw,
  Filter,
  ArrowRight,
  ArrowLeft,
  ShieldAlert,
  Wallet,
  Bell,
  CheckCircle2,
  X,
  Layers,
  Search
} from 'lucide-react';
import { MOCK_FLOW_NODES, MOCK_FLOW_EDGES } from '../data/mockData';
import { RiskBadge } from '../components/common/RiskBadge';
import { AddressCopy } from '../components/common/AddressCopy';
import { CustomWalletNode } from '../components/common/CustomWalletNode';


export const FlowExplorer: React.FC = () => {
  const navigate = useNavigate();

  const nodeTypes = useMemo(() => ({ customNode: CustomWalletNode }), []);

  const [nodes, setNodes, onNodesChange] = useNodesState(MOCK_FLOW_NODES as any);
  const [edges, setEdges, onEdgesChange] = useEdgesState(MOCK_FLOW_EDGES as any);

  // Selected node state for right side investigation panel
  const [selectedNodeData, setSelectedNodeData] = useState<any | null>(null);

  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [amountFilter, setAmountFilter] = useState<string>('all');
  const [timeFilter, setTimeFilter] = useState<string>('7d');

  const onNodeClick = useCallback((_: any, node: Node) => {
    setSelectedNodeData(node.data);
  }, []);

  const resetView = () => {
    setNodes(MOCK_FLOW_NODES as any);
    setEdges(MOCK_FLOW_EDGES as any);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
      {/* Controls Toolbar */}
      <div className="bg-navy-900 border-b border-navy-800 p-3 flex flex-wrap items-center justify-between gap-3 z-10">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-400" />
          <h1 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
            Transaction Flow Graph Workspace
          </h1>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <div className="flex items-center gap-1 bg-navy-950 px-2 py-1 rounded border border-navy-800">
            <Filter className="w-3 h-3 text-slate-400" />
            <span className="text-slate-400 font-semibold mr-1 font-mono">Risk:</span>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="all">All Levels</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="flex items-center gap-1 bg-navy-950 px-2 py-1 rounded border border-navy-800">
            <span className="text-slate-400 font-semibold mr-1 font-mono">Amount:</span>
            <select
              value={amountFilter}
              onChange={(e) => setAmountFilter(e.target.value)}
              className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="all">All Amounts</option>
              <option value="large">&gt; $100k</option>
              <option value="small">&lt; $100k</option>
            </select>
          </div>

          {selectedNodeData && (
            <button
              onClick={() => setSelectedNodeData(null)}
              className="px-2 py-1 bg-blue-950/60 hover:bg-blue-900/60 text-blue-300 rounded border border-blue-500/30 font-mono text-[11px] flex items-center gap-1 transition-colors"
            >
              <X className="w-3 h-3" />
              <span>Close Drawer</span>
            </button>
          )}

          <button
            onClick={resetView}
            className="p-1.5 bg-navy-950 hover:bg-navy-800 text-slate-400 hover:text-white rounded border border-navy-800 transition-colors"
            title="Reset Graph Layout"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Canvas Workspace — HERO ELEMENT */}
      <div className="flex-1 flex relative overflow-hidden bg-[#060a16]">
        <div className="flex-1 h-full relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.18, includeHiddenNodes: false }}
            minZoom={0.2}
            maxZoom={1.8}
          >
            <Background color="#162244" gap={24} size={1} />
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
        </div>

        {/* Right Side "INVESTIGATION EVIDENCE" Panel */}
        {selectedNodeData && (
          <div className="w-80 sm:w-96 bg-navy-900 border-l border-navy-800 flex flex-col justify-between p-4 shadow-2xl overflow-y-auto z-20">
            <div className="space-y-4">
              {/* Header */}
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

              {/* Address & Risk Score */}
              <div className="space-y-2">
                <AddressCopy address={selectedNodeData.address} truncate={false} linkToProfile={false} />
                <div className="flex items-center justify-between pt-1">
                  <RiskBadge level={selectedNodeData.riskLevel} score={selectedNodeData.riskScore} size="md" />
                  <span className="text-xs font-mono text-slate-400">
                    Chain: <strong className="text-white">{selectedNodeData.chain}</strong>
                  </span>
                </div>
              </div>

              {/* Funds Received & Sent Grid */}
              <div className="grid grid-cols-2 gap-2 bg-navy-950 p-2.5 rounded border border-navy-800 text-xs">
                <div>
                  <span className="text-slate-400 text-[9px] font-mono uppercase">Funds Received</span>
                  <div className="font-mono font-bold text-white mt-0.5">
                    ${((selectedNodeData.balanceUSD * 2.8) / 1000).toFixed(1)}k
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 text-[9px] font-mono uppercase">Funds Sent</span>
                  <div className="font-mono font-bold text-white mt-0.5">
                    ${((selectedNodeData.balanceUSD * 2.1) / 1000).toFixed(1)}k
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 text-[9px] font-mono uppercase">Transactions</span>
                  <div className="font-mono font-bold text-white mt-0.5">
                    {selectedNodeData.transactionCount}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 text-[9px] font-mono uppercase">Connected Wallets</span>
                  <div className="font-mono font-bold text-white mt-0.5">
                    {Math.floor(selectedNodeData.transactionCount / 12)}
                  </div>
                </div>
              </div>

              {/* Why Flagged & Detected Indicators */}
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono mb-2">
                  Why Flagged (Detected Indicators)
                </h4>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-slate-200 bg-navy-950 p-2 rounded border border-navy-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Rapid fund movement across hop nodes</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-200 bg-navy-950 p-2 rounded border border-navy-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>High transaction velocity burst pattern</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-200 bg-navy-950 p-2 rounded border border-navy-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Fan-out multi-wallet distribution</span>
                  </div>
                  {selectedNodeData.riskLevel === 'critical' && (
                    <div className="flex items-center gap-2 text-xs text-red-300 bg-red-950/40 p-2 rounded border border-red-500/30">
                      <ShieldAlert className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      <span>Circular flow looping back to originator</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Actions: Trace Backward, Trace Forward, Open Profile, Create Alert */}
            <div className="space-y-2 pt-3 border-t border-navy-800 mt-3">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => alert(`Tracing backward for ${selectedNodeData.address}...`)}
                  className="py-1.5 bg-navy-850 hover:bg-navy-800 text-slate-200 font-semibold text-xs rounded border border-navy-700 transition-all flex items-center justify-center gap-1 font-mono"
                >
                  <ArrowLeft className="w-3 h-3 text-blue-400" />
                  <span>Trace Backward</span>
                </button>
                <button
                  onClick={() => alert(`Tracing forward for ${selectedNodeData.address}...`)}
                  className="py-1.5 bg-navy-850 hover:bg-navy-800 text-slate-200 font-semibold text-xs rounded border border-navy-700 transition-all flex items-center justify-center gap-1 font-mono"
                >
                  <span>Trace Forward</span>
                  <ArrowRight className="w-3 h-3 text-blue-400" />
                </button>
              </div>

              <button
                onClick={() => navigate(`/wallet/${encodeURIComponent(selectedNodeData.address)}`)}
                className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded shadow transition-all flex items-center justify-center gap-2"
              >
                <Wallet className="w-3.5 h-3.5" />
                <span>Open Wallet Profile</span>
              </button>

              <button
                onClick={() => navigate('/alerts')}
                className="w-full py-1.5 bg-navy-800 hover:bg-navy-700 text-slate-300 font-semibold text-xs rounded border border-navy-700 transition-all flex items-center justify-center gap-2"
              >
                <Bell className="w-3.5 h-3.5 text-amber-400" />
                <span>Create Alert</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
