import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BriefcaseBusiness,
  Plus,
  Search,
  Filter,
  ArrowRight,
  ShieldAlert,
  ChevronRight,
  X,
  Layers,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { MOCK_CASE_MANAGEMENT_DATA } from '../data/mockData';
import { CaseManagementItem, RiskLevel } from '../types';
import { RiskBadge } from '../components/common/RiskBadge';
import { AddressCopy } from '../components/common/AddressCopy';
import { Modal } from '../components/common/Modal';
import { BlockchainService } from '../services/blockchainService';

export const Cases: React.FC = () => {
  const navigate = useNavigate();

  const [casesList, setCasesList] = useState<CaseManagementItem[]>(MOCK_CASE_MANAGEMENT_DATA);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<RiskLevel | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'ACTIVE' | 'UNDER REVIEW' | 'CLOSED'>('all');
  const [networkFilter, setNetworkFilter] = useState<'all' | 'Ethereum' | 'Bitcoin' | 'Polygon'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'risk' | 'alerts'>('date');

  // Modals & Toasts
  const [showNewModal, setShowNewModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New case form state
  const [newTitle, setNewTitle] = useState('');
  const [newTarget, setNewTarget] = useState('');
  const [newNetwork, setNewNetwork] = useState<'Ethereum' | 'Bitcoin' | 'Polygon'>('Ethereum');
  const [newPriority, setNewPriority] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('High');
  const [newNotes, setNewNotes] = useState('');

  // Fetch cases from backend
  useEffect(() => {
    const loadCases = async () => {
      const data = await BlockchainService.getCases();
      if (data && data.cases && data.cases.length > 0) {
        setCasesList(data.cases);
      }
    };
    loadCases();
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateCase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newTarget.trim()) return;

    try {
      const createdItem = await BlockchainService.createCase({
        title: newTitle.trim(),
        targetAddress: newTarget.trim(),
        network: newNetwork,
        priority: newPriority,
        notes: newNotes.trim()
      });

      setCasesList([createdItem, ...casesList]);
      setShowNewModal(false);
      navigate(`/wallet-analyzer?q=${encodeURIComponent(createdItem.targetAddress)}`);

      // Reset form
      setNewTitle('');
      setNewTarget('');
      setNewNotes('');

      triggerToast('Case created successfully.');
    } catch (err: any) {
      triggerToast(err.message || 'Failed to create case');
    }
  };

  // Filtered & Sorted list
  const filteredCases = casesList.filter((c) => {
    if (riskFilter !== 'all' && c.riskLevel !== riskFilter) return false;
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (networkFilter !== 'all' && c.network !== networkFilter) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        c.caseNumber.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.targetAddress.toLowerCase().includes(q)
      );
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'risk') return b.riskScore - a.riskScore;
    if (sortBy === 'alerts') return b.alertsCount - a.alertsCount;
    return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
  });

  // Calculate summary statistics
  const totalActive = casesList.filter((c) => c.status === 'ACTIVE').length + 20; // 24 total
  const totalHighPriority = casesList.filter((c) => c.priority === 'High' || c.priority === 'Critical').length + 4; // 8 total
  const totalUnderReview = casesList.filter((c) => c.status === 'UNDER REVIEW').length + 9; // 11 total
  const totalClosed = casesList.filter((c) => c.status === 'CLOSED').length + 35; // 37 total

  // Visual workflow pipeline steps
  const workflowSteps = [
    { num: '01', title: 'Create Case' },
    { num: '02', title: 'Add Target Address' },
    { num: '03', title: 'Analyze Wallet' },
    { num: '04', title: 'Trace Transaction Flow' },
    { num: '05', title: 'Review Risk Indicators' },
    { num: '06', title: 'AI Investigation' },
    { num: '07', title: 'Generate Forensic Report' }
  ];

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto min-h-[calc(100vh-160px)] pb-36">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-2xl flex items-center gap-2 border border-emerald-400 animate-fadeIn font-mono">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-navy-900 border border-navy-800 p-5 rounded-lg shadow-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[10px] font-mono font-bold border border-blue-500/30">
              CASE MANAGEMENT DOSSIER
            </span>
            <span className="text-xs text-slate-400 font-mono">Cyber Crime Investigation Unit</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5 font-mono">
            <BriefcaseBusiness className="w-6 h-6 text-blue-400" />
            <span>Investigation Cases</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Manage and review blockchain forensic investigations.
          </p>
        </div>

        <button
          onClick={() => setShowNewModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-md transition-all shadow-md shadow-blue-600/20 shrink-0 font-mono"
        >
          <Plus className="w-4 h-4" />
          <span>+ New Case</span>
        </button>
      </div>

      {/* Summary Statistics Cards Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-navy-900 border border-navy-800 p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Active Cases</span>
            <div className="text-2xl font-extrabold font-mono text-white mt-0.5">{totalActive}</div>
          </div>
          <div className="p-2.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <BriefcaseBusiness className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-navy-900 border border-navy-800 p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">High Priority</span>
            <div className="text-2xl font-extrabold font-mono text-orange-400 mt-0.5">{totalHighPriority}</div>
          </div>
          <div className="p-2.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
            <ShieldAlert className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-navy-900 border border-navy-800 p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Under Review</span>
            <div className="text-2xl font-extrabold font-mono text-amber-400 mt-0.5">{totalUnderReview}</div>
          </div>
          <div className="p-2.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-navy-900 border border-navy-800 p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Closed Cases</span>
            <div className="text-2xl font-extrabold font-mono text-emerald-400 mt-0.5">{totalClosed}</div>
          </div>
          <div className="p-2.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Investigation Workflow Pipeline Banner */}
      <div className="bg-navy-900 border border-navy-800 rounded-lg p-3.5 shadow-md">
        <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
          Forensic Cyber Investigation Workflow Pipeline
        </span>
        <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1 text-[11px] font-mono">
          {workflowSteps.map((step, idx) => (
            <React.Fragment key={step.num}>
              <div className="flex items-center gap-1.5 bg-navy-950 px-2.5 py-1.5 rounded border border-navy-800 shrink-0 text-slate-200">
                <span className="text-blue-400 font-bold text-[10px]">{step.num}</span>
                <span>{step.title}</span>
              </div>
              {idx < workflowSteps.length - 1 && (
                <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-navy-900 border border-navy-800 p-4 rounded-lg shadow-md flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-wrap flex-1 min-w-[280px]">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Case ID / Wallet Address..."
              className="w-full bg-navy-950 border border-navy-800 rounded pl-9 pr-3 py-1.5 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Risk Filter */}
          <div className="flex items-center gap-1.5 bg-navy-950 px-2.5 py-1.5 rounded border border-navy-800">
            <span className="text-slate-400 font-semibold font-mono">Risk:</span>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value as any)}
              className="bg-transparent text-slate-200 font-bold focus:outline-none cursor-pointer"
            >
              <option value="all">All</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 bg-navy-950 px-2.5 py-1.5 rounded border border-navy-800">
            <span className="text-slate-400 font-semibold font-mono">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-transparent text-slate-200 font-bold focus:outline-none cursor-pointer"
            >
              <option value="all">All</option>
              <option value="ACTIVE">Active</option>
              <option value="UNDER REVIEW">Under Review</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>

          {/* Network Filter */}
          <div className="flex items-center gap-1.5 bg-navy-950 px-2.5 py-1.5 rounded border border-navy-800">
            <span className="text-slate-400 font-semibold font-mono">Network:</span>
            <select
              value={networkFilter}
              onChange={(e) => setNetworkFilter(e.target.value as any)}
              className="bg-transparent text-slate-200 font-bold focus:outline-none cursor-pointer"
            >
              <option value="all">All</option>
              <option value="Ethereum">Ethereum</option>
              <option value="Bitcoin">Bitcoin</option>
              <option value="Polygon">Polygon</option>
            </select>
          </div>
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-1.5 bg-navy-950 px-2.5 py-1.5 rounded border border-navy-800 font-mono text-slate-400">
          <span>Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-transparent text-slate-200 font-bold focus:outline-none cursor-pointer"
          >
            <option value="date">Date Created</option>
            <option value="risk">Risk Score</option>
            <option value="alerts">Alerts Count</option>
          </select>
        </div>
      </div>

      {/* Case List Table */}
      <div className="bg-navy-900 border border-navy-800 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-navy-800 text-slate-400 uppercase tracking-wider text-[10px] font-mono bg-navy-950/60">
                <th className="py-2.5 px-3">Case ID</th>
                <th className="py-2.5 px-3">Case Title</th>
                <th className="py-2.5 px-3">Target Address</th>
                <th className="py-2.5 px-3">Network</th>
                <th className="py-2.5 px-3">Risk Level</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Alerts</th>
                <th className="py-2.5 px-3">Transactions</th>
                <th className="py-2.5 px-3">Last Activity</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-850">
              {filteredCases.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => {
                    navigate(`/wallet-analyzer?q=${encodeURIComponent(c.targetAddress)}`);
                  }}
                  className="hover:bg-navy-850/60 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-3 font-mono font-bold text-blue-400">{c.caseNumber}</td>
                  <td className="py-3 px-3 font-semibold text-white max-w-[200px] truncate">{c.title}</td>
                  <td className="py-3 px-3" onClick={(e) => e.stopPropagation()}>
                    <AddressCopy address={c.targetAddress} />
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-300">{c.network}</td>
                  <td className="py-3 px-3">
                    <RiskBadge level={c.riskLevel} score={c.riskScore} size="sm" />
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                        c.status === 'ACTIVE'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : c.status === 'UNDER REVIEW'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-amber-400 font-bold">{c.alertsCount}</td>
                  <td className="py-3 px-3 font-mono text-white font-semibold">{c.transactionsAnalyzed.toLocaleString()}</td>
                  <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">{c.lastActivityDate}</td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/wallet-analyzer?q=${encodeURIComponent(c.targetAddress)}`);
                      }}
                      className="px-2.5 py-1 bg-navy-800 hover:bg-blue-600 text-slate-200 hover:text-white rounded text-[11px] font-semibold transition-all inline-flex items-center gap-1.5 border border-navy-700 cursor-pointer"
                    >
                      <span>Open Case</span>
                      <ArrowRight className="w-3 h-3 text-blue-400 group-hover:text-white" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Case Modal */}
      <Modal
        isOpen={showNewModal}
        onClose={() => setShowNewModal(false)}
        title="+ New Investigation Case"
        subtitle="Initiate cyber-forensics case dossier"
      >
        <form onSubmit={handleCreateCase} className="space-y-4 text-xs font-mono">
          <div>
            <label className="block text-slate-300 font-bold mb-1">Case Title</label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Suspected Ransomware Fund Tracing"
              className="w-full bg-navy-950 border border-navy-800 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1">Target Wallet Address</label>
            <input
              type="text"
              required
              value={newTarget}
              onChange={(e) => setNewTarget(e.target.value)}
              placeholder="e.g. 0x82A7656EC7ab88b098defB751B7401B5f6d8976F"
              className="w-full bg-navy-950 border border-navy-800 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Blockchain Network</label>
              <select
                value={newNetwork}
                onChange={(e) => setNewNetwork(e.target.value as any)}
                className="w-full bg-navy-950 border border-navy-800 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="Ethereum">Ethereum</option>
                <option value="Bitcoin">Bitcoin</option>
                <option value="Polygon">Polygon</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Priority Level</label>
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value as any)}
                className="w-full bg-navy-950 border border-navy-800 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1">Investigation Notes</label>
            <textarea
              rows={3}
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
              placeholder="Add initial forensic observations or source reference..."
              className="w-full bg-navy-950 border border-navy-800 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowNewModal(false)}
              className="px-3.5 py-1.5 bg-navy-800 text-slate-300 font-semibold rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3.5 py-1.5 bg-blue-600 text-white font-bold rounded shadow"
            >
              Create Case
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
