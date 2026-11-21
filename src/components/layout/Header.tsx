import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  Bot,
  Shield,
  ArrowRight
} from 'lucide-react';
import { BlockchainService } from '../../services/blockchainService';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{
    wallets: any[];
    transactions: any[];
    cases: any[];
  } | null>(null);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  // Global keyboard shortcut listener for ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);

    if (val.trim().length > 2) {
      setShowSearchDropdown(true);
      const res = await BlockchainService.globalSearch(val);
      setSearchResults(res);
    } else {
      setShowSearchDropdown(false);
      setSearchResults(null);
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      setShowSearchDropdown(false);
      navigate(`/wallet-analyzer?q=${encodeURIComponent(searchQuery.trim())}`);
    }
    if (e.key === 'Escape') {
      setShowSearchDropdown(false);
    }
  };

  return (
    <header className="h-16 sm:h-[72px] border-b border-white/[0.06] bg-[#080A11]/85 backdrop-blur-xl sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between gap-4 sm:gap-6 w-full select-none">
      {/* Brand & Global Search */}
      <div className="flex items-center gap-4 sm:gap-6 flex-1 max-w-2xl">
        {/* Brand identity mark */}
        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-2.5 cursor-pointer shrink-0 group"
          title="CryptoJasoos Intelligence"
        >
          <div className="w-8 h-8 rounded-xl bg-[#6D55FF]/15 border border-[#6D55FF]/35 flex items-center justify-center text-[#8B75FF] shadow-[0_0_14px_rgba(109,85,255,0.25)] group-hover:scale-105 transition-transform">
            <Shield className="w-4 h-4 text-[#8B75FF]" />
          </div>
          <div className="hidden sm:block">
            <span className="font-mono font-bold text-xs tracking-wider text-white">
              CRYPTO-JASOOS
            </span>
            <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-tight">
              Forensic Intelligence
            </span>
          </div>
        </div>

        {/* Global Search Input */}
        <div className="relative flex-1">
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              onFocus={() => {
                if (searchQuery.trim().length > 2 && searchResults) {
                  setShowSearchDropdown(true);
                }
              }}
              placeholder="Search wallet, transaction hash, address..."
              className="w-full pl-9 pr-12 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#6D55FF]/60 focus:ring-1 focus:ring-[#6D55FF]/30 transition-all font-sans"
            />
            <div className="absolute right-2.5 px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.08] text-[10px] font-mono text-slate-400 pointer-events-none">
              ⌘K
            </div>
          </div>

          {/* Quick Search Dropdown */}
          {showSearchDropdown && searchResults && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-[#0D111C]/95 border border-white/[0.08] rounded-2xl shadow-2xl p-2 z-50 text-xs space-y-2 backdrop-blur-2xl">
              {searchResults.wallets.length > 0 && (
                <div>
                  <div className="px-2 py-1 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Wallets
                  </div>
                  {searchResults.wallets.map((w) => (
                    <div
                      key={w.address}
                      onClick={() => {
                        setShowSearchDropdown(false);
                        navigate(`/wallet-analyzer?q=${w.address}`);
                      }}
                      className="px-3 py-2 rounded-xl hover:bg-[#6D55FF]/20 text-slate-200 cursor-pointer flex items-center justify-between transition-colors"
                    >
                      <span className="font-mono">{w.address.slice(0, 10)}...{w.address.slice(-8)}</span>
                      <span className="text-[10px] text-slate-400">{w.entityName || 'Wallet'}</span>
                    </div>
                  ))}
                </div>
              )}

              {searchResults.cases.length > 0 && (
                <div>
                  <div className="px-2 py-1 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Cases
                  </div>
                  {searchResults.cases.map((c) => (
                    <div
                      key={c.caseNumber}
                      onClick={() => {
                        setShowSearchDropdown(false);
                        navigate(`/cases`);
                      }}
                      className="px-3 py-2 rounded-xl hover:bg-[#6D55FF]/20 text-slate-200 cursor-pointer flex items-center justify-between transition-colors"
                    >
                      <span>{c.caseNumber} — {c.title}</span>
                      <span className="text-[10px] font-mono text-amber-400">{c.priority}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Actions: Live Feed Status, AI Copilot, Notification Bell */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        {/* Live Feed Status Pill */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span>Live Feed: Active</span>
        </div>

        {/* Forensic AI Navigation Shortcut */}
        <button
          type="button"
          onClick={() => navigate('/ai-investigation')}
          className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-[#6D55FF]/15 border border-[#6D55FF]/35 text-[#C4B8FF] hover:text-white hover:border-[#6D55FF]/60 hover:bg-[#6D55FF]/25 transition-all text-xs font-medium shadow-[0_0_12px_rgba(109,85,255,0.2)] cursor-pointer group"
          title="Open Forensic AI"
        >
          <Bot className="w-3.5 h-3.5 text-[#8B75FF] group-hover:scale-110 transition-transform" />
          <span className="font-semibold tracking-wide">Forensic AI</span>
        </button>

        {/* Notification Bell */}
        <button
          type="button"
          onClick={() => navigate('/alerts')}
          className="relative w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.08] text-slate-300 hover:text-white hover:border-white/[0.15] flex items-center justify-center transition-all cursor-pointer"
          title="Security Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.9)]" />
        </button>
      </div>
    </header>
  );
};

export default Header;
