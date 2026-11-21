import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bot,
  Send,
  Shield,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Copy,
  Check,
  AlertTriangle
} from 'lucide-react';
import { MOCK_AI_CONVERSATION, MOCK_WALLETS } from '../data/mockData';
import { AIMessage } from '../types';
import { BlockchainService } from '../services/blockchainService';

export const AIInvestigation: React.FC = () => {
  const navigate = useNavigate();
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  const activeWallet = MOCK_WALLETS['0x82A7656EC7ab88b098defB751B7401B5f6d8976F'] || {
    address: '0x82A7656EC7ab88b098defB751B7401B5f6d8976F',
    riskScore: 87,
    riskLevel: 'high',
    transactionCount: 1284,
    connectedWalletsCount: 87
  };

  const [messages, setMessages] = useState<AIMessage[]>(MOCK_AI_CONVERSATION);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState(false);

  const quickQuestions = [
    'Why is this wallet risky?',
    'Where did the funds go?',
    'Show suspicious wallets',
    'Explain the transaction flow',
    'Summarize this investigation'
  ];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendPrompt = async (promptText: string) => {
    if (!promptText.trim()) return;

    const userMsg: AIMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsTyping(true);

    try {
      const liveRes = await BlockchainService.askAI(
        promptText,
        activeWallet.address,
        'CF-2026-014: Lazarus Exploit Sub-Cluster'
      );

      if (liveRes && liveRes.summary && liveRes.available) {
        const aiMsg: AIMessage = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: liveRes.summary,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          evidenceItems: liveRes.evidenceItems || [
            { type: 'wallet', label: 'Wallet Under Investigation', value: activeWallet.address, riskLevel: 'high' },
            { type: 'mixer', label: 'Tornado Cash Pool', value: '0x47ac0fb3F2D84898e4D9E7b4DaB3C24507a6D503', riskLevel: 'critical' }
          ]
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsTyping(false);
        return;
      }
    } catch (err) {
      // Fallback
    }

    // High fidelity fallback rule engine
    setTimeout(() => {
      let aiText = '';
      let evidenceItems: any[] = [];

      const q = promptText.toLowerCase();

      if (q.includes('why') || q.includes('risky')) {
        aiText = `Target wallet 0x82A7...91F received a Risk Score of 87/100 (High Risk / Requires Investigation) due to multiple specific risk indicators:\n\n1. Rapid Transfer Velocity: Transferred 82% of received value across 4 hop addresses within 12 minutes of arrival.\n2. Mixer Interactivity: Executed direct transfers with Tornado Cash 100 ETH pool.\n3. Circular Looping: Detected 3 hop cycles returning to intermediate wallet 0x3F9A...2B1.\n4. Watchlist Co-Location: Sub-cluster link to OFAC SDN entry #SDN-ETH-98412.`;
        evidenceItems = [
          { type: 'wallet', label: 'Wallet Under Investigation', value: activeWallet.address, riskLevel: 'high' },
          { type: 'mixer', label: 'Tornado Cash Pool', value: '0x47ac0fb3F2D84898e4D9E7b4DaB3C24507a6D503', riskLevel: 'critical' }
        ];
      } else if (q.includes('where') || q.includes('funds') || q.includes('flow')) {
        aiText = `Forensic tracing across 4 hop layers reveals the total $248,420 USD moved along two primary channels:\n\n1. Off-Ramp Channel ($117,000 USD): Transferred via Peel-Chain Hop B to Kraken Hot Wallet (0x9A48...1C2).\n2. Mixer Channel ($131,420 USD): Deposited into Tornado Cash, with subsequent anonymized exits linked to Hydra Darknet vendor (bc1qxy...0wlh).\n3. Layering Behavior: 3 circular loops routed back through unhosted relay 0x3F9A...2B1 to obscure origin.`;
        evidenceItems = [
          { type: 'entity', label: 'VASP Off-Ramp', value: 'Kraken Hot Wallet (0x9A48...1C2)', riskLevel: 'low' },
          { type: 'mixer', label: 'Tornado Cash Pool', value: '0x47ac0fb3F2D84898e4D9E7b4DaB3C24507a6D503', riskLevel: 'critical' }
        ];
      } else if (q.includes('report') || q.includes('summarize')) {
        aiText = `FORENSIC SUMMARY REPORT FOR CASE CF-2026-014:\n\n• Target Address: ${activeWallet.address}\n• Risk Score: 87/100 (High Risk)\n• Primary Pattern: Rapid Multi-Hop Peeling + Anonymizing Mixer Funneling\n• Attribution: Lazarus Exploit Sub-Cluster (OFAC SDN Link #SDN-ETH-98412)\n• Recommended Legal Action: Submit formal FinCEN SAR filing and issue emergency freeze notice to identified exchange deposit clusters.`;
        evidenceItems = [
          { type: 'wallet', label: 'Target Wallet', value: activeWallet.address, riskLevel: 'high' },
          { type: 'mixer', label: 'Tornado Cash Pool', value: '0x47ac0fb3F2D84898e4D9E7b4DaB3C24507a6D503', riskLevel: 'critical' }
        ];
      } else {
        aiText = `Target wallet 0x82A7...976F exhibits deterministic indicators of automated laundering within the Lazarus Exploit Sub-Cluster. Multi-hop network tracing confirms rapid peel-chain execution with direct interaction with privacy mixers.`;
        evidenceItems = [
          { type: 'wallet', label: 'Wallet Under Investigation', value: activeWallet.address, riskLevel: 'high' }
        ];
      }

      const aiMsg: AIMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        evidenceItems
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  const renderFormattedText = (text: string) => {
    return (
      <div className="whitespace-pre-wrap font-sans text-xs sm:text-[13px] leading-relaxed space-y-2">
        {text.split('\n\n').map((paragraph, pIdx) => (
          <p key={pIdx}>
            {paragraph.split('\n').map((line, lIdx) => {
              // Highlight bold text like **Title:**
              const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '$1');
              return (
                <span key={lIdx} className="block">
                  {formattedLine}
                </span>
              );
            })}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full px-6 sm:px-8 lg:px-10 py-6 space-y-6 pb-28 md:pb-32 font-sans select-none">
      {/* 1. Feature Module Navigation Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#121c38]">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-1 rounded-md bg-[#101935] border border-blue-500/40 text-[10px] font-mono font-bold tracking-widest text-blue-400 uppercase">
            FEATURE MODULE 04
          </span>
          <h2 className="text-sm font-bold text-slate-200 tracking-wide font-sans">
            Forensic AI
          </h2>
        </div>

        <button
          onClick={() => navigate('/reports')}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-medium transition-colors group cursor-pointer"
        >
          <span>Next: FinCEN Reports</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all" />
        </button>
      </div>

      {/* 2. Main Title and Copilot Badge */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.35)] shrink-0">
            <Bot className="w-4 h-4" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5 font-sans">
            <span>Forensic AI</span>
          </h1>
        </div>
        <p className="text-xs text-slate-400 font-sans max-w-3xl leading-relaxed">
          Autonomous blockchain forensic assistant for querying multi-hop networks, explaining threat scores, and drafting SAR evidence.
        </p>
      </div>

      {/* 3. Active Case Context Bar */}
      <div className="rounded-2xl bg-[#080d1c] border border-[#142042] p-4 shadow-xl flex flex-wrap items-center justify-between gap-4">
        {/* Left: Case Info */}
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-purple-600/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
              ACTIVE CASE CONTEXT
            </span>
            <div className="flex items-center gap-2.5 mt-0.5">
              <span className="text-xs sm:text-sm font-bold text-white tracking-wide font-mono">
                CF-2026-014: Lazarus Exploit Sub-Cluster
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-950/40 border border-amber-500/40 text-amber-400 text-[11px] font-mono font-bold">
                <AlertTriangle className="w-3 h-3" />
                <span>High Risk (87)</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Stats */}
        <div className="flex items-center gap-6 text-xs font-mono">
          <div>
            <span className="text-slate-400 text-[10px] uppercase tracking-wider block font-sans">Target Address:</span>
            <div className="flex items-center gap-1.5 text-slate-200 mt-0.5">
              <span className="font-bold">0x82A7...976F</span>
              <button
                onClick={() => navigate('/wallet-analyzer?q=0x82A7656EC7ab88b098defB751B7401B5f6d8976F')}
                className="text-slate-500 hover:text-blue-400 p-0.5 transition-colors"
                title="View in Wallet Analyzer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleCopy('0x82A7656EC7ab88b098defB751B7401B5f6d8976F')}
                className="text-slate-500 hover:text-slate-300 p-0.5 transition-colors"
                title="Copy full address"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="h-7 w-px bg-[#142042]" />

          <div>
            <span className="text-slate-400 text-[10px] uppercase tracking-wider block font-sans">Txs Count:</span>
            <span className="font-bold text-white text-sm">1284</span>
          </div>

          <div className="h-7 w-px bg-[#142042]" />

          <div>
            <span className="text-slate-400 text-[10px] uppercase tracking-wider block font-sans">Hop Wallets:</span>
            <span className="font-bold text-white text-sm">87</span>
          </div>
        </div>
      </div>

      {/* 4. Chat Messages Window */}
      <div className="rounded-3xl bg-[#060a16] border border-[#121c38] p-5 sm:p-7 shadow-2xl flex flex-col justify-between min-h-[560px] relative overflow-hidden">
        {/* Messages List Area */}
        <div className="space-y-6 overflow-y-auto max-h-[580px] pr-2 pb-4 scrollbar-thin scrollbar-thumb-slate-800">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {/* AI Avatar */}
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-purple-600/25 border border-purple-500/40 flex items-center justify-center shrink-0 mt-1 shadow-[0_0_10px_rgba(168,85,247,0.3)] text-purple-300">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}

              {/* Speech Bubble */}
              <div
                className={`max-w-2xl text-xs sm:text-[13px] leading-relaxed space-y-3 ${msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm px-5 py-3.5 shadow-lg relative'
                  : 'bg-[#090f22] text-slate-200 border border-[#142042] rounded-2xl p-5 shadow-xl'
                  }`}
              >
                {/* Text Content */}
                {renderFormattedText(msg.text)}

                {/* Evidence References Box (Shown in AI response) */}
                {msg.evidenceItems && msg.evidenceItems.length > 0 && (
                  <div className="pt-3 border-t border-[#142042] space-y-2 mt-3">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-purple-400 uppercase block">
                      EXTRACTED EVIDENCE REFERENCES:
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {msg.evidenceItems.map((ev, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl bg-[#060a16] border border-[#142042] px-3.5 py-2 flex items-center justify-between font-mono text-[11px]"
                        >
                          <span className="text-slate-400 font-sans">{ev.label}:</span>
                          <span className="text-slate-200 font-bold px-2">{ev.value}</span>
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${ev.riskLevel === 'critical'
                              ? 'bg-rose-950/40 border border-rose-500/40 text-rose-400'
                              : 'bg-amber-950/40 border border-amber-500/40 text-amber-400'
                              }`}
                          >
                            <AlertTriangle className="w-3 h-3" />
                            <span>{ev.riskLevel === 'critical' ? 'Critical Risk' : 'High Risk'}</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Timestamp */}
                <div
                  className={`text-[10px] font-mono ${msg.sender === 'user' ? 'text-blue-200 text-right' : 'text-slate-500 text-right'
                    }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {/* User Avatar */}
              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white font-bold text-xs flex items-center justify-center font-mono shrink-0 mt-1 shadow-md">
                  AV
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-3 text-xs text-purple-400 font-mono animate-pulse pl-1">
              <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <span>AI Copilot analyzing transaction network lineage with Gemini in real-time...</span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* 5. Quick Questions & Input Box */}
        <div className="pt-4 border-t border-[#121c38] space-y-3 mt-4">
          {/* Quick Questions Row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase shrink-0 mr-1">
              QUICK QUESTIONS:
            </span>
            {quickQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSendPrompt(q)}
                className="px-3.5 py-1.5 rounded-full bg-[#080d1a] hover:bg-[#121c38] text-slate-300 hover:text-white text-xs border border-[#142042] hover:border-purple-500/40 transition-all whitespace-nowrap cursor-pointer shadow-sm"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendPrompt(inputPrompt);
            }}
            className="flex items-center gap-2 pt-1"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Ask questions about the current transaction network, risk score, or hop lineage..."
              className="flex-1 bg-[#090f22] border border-[#142042] rounded-2xl px-5 py-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/40 font-sans shadow-inner transition-all"
            />
            <button
              type="submit"
              disabled={!inputPrompt.trim() || isTyping}
              className="px-6 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-2xl shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-purple-400/40 flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
            >
              <Send className="w-4 h-4" />
              <span>Ask AI</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIInvestigation;
