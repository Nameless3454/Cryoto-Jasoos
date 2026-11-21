import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Dashboard } from './pages/Dashboard';
import { Cases } from './pages/Cases';
import { WalletAnalyzer } from './pages/WalletAnalyzer';
import { WalletProfile } from './pages/WalletProfile';
import { Alerts } from './pages/Alerts';
import { AIInvestigation } from './pages/AIInvestigation';
import { Reports } from './pages/Reports';
import { DesignSystemShowcase } from './pages/DesignSystemShowcase';
import { FloatingPillNavDemo } from './pages/FloatingPillNavDemo';
import { GooeyNavDemo } from './pages/GooeyNavDemo';
import { Toast, ToastMessage } from './components/common/Toast';
import { GooeyNav, GooeyNavItem } from './components/common/GooeyNav';
import { FloatingAIChat } from './components/common/FloatingAIChat';

const MainLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // 5 Core Application Destinations for GooeyNav
  const gooeyNavItems: GooeyNavItem[] = [
    { label: 'Dashboard', href: '/' },
    { label: 'Cases', href: '/cases' },
    { label: 'Wallet Analyzer', href: '/wallet-analyzer' },
    { label: 'Forensic AI', href: '/ai-investigation' },
    { label: 'Reports', href: '/reports' }
  ];

  // Determine active pill index based on current route
  const getActiveNavIndex = () => {
    const path = location.pathname;
    if (path === '/') return 0;
    if (path.startsWith('/cases')) return 1;
    if (path.startsWith('/wallet') || path.startsWith('/analyze') || path.startsWith('/flow-explorer')) return 2;
    if (path.startsWith('/ai') || path.startsWith('/copilot') || path.startsWith('/chat') || path.startsWith('/assistant')) return 3;
    if (path.startsWith('/reports')) return 4;
    return -1; // e.g. /alerts or custom sub-routes
  };

  const currentActiveIndex = getActiveNavIndex();

  // Full-canvas standalone showcase pages
  if (location.pathname === '/design-system') {
    return <DesignSystemShowcase />;
  }

  if (location.pathname === '/pill-nav' || location.pathname === '/floating-pill-nav' || location.pathname === '/gooey-nav') {
    return <GooeyNavDemo />;
  }

  return (
    <div className="projexion-canvas min-h-screen bg-[#080A11] text-slate-100 font-sans selection:bg-[#6D55FF] selection:text-white antialiased flex flex-col w-full relative overflow-x-hidden">
      {/* Subtle Projexion Ambient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[760px] h-[340px] bg-[#6D55FF]/[0.06] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[320px] bg-[#00D2D3]/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* Top Header Bar */}
      <Header />

      {/* Standardized Main Content Area with generous bottom padding for the floating dock */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-36 sm:pb-44 relative z-10">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/wallet-analyzer" element={<WalletAnalyzer />} />
          {/* Legacy route redirects */}
          <Route path="/analyze" element={<Navigate to="/wallet-analyzer" replace />} />
          <Route path="/flow-explorer" element={<Navigate to="/wallet-analyzer" replace />} />
          <Route path="/wallet" element={<WalletProfile />} />
          <Route path="/wallet/:address" element={<WalletProfile />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/ai-investigation" element={<AIInvestigation />} />
          <Route path="/ai" element={<Navigate to="/ai-investigation" replace />} />
          <Route path="/copilot" element={<Navigate to="/ai-investigation" replace />} />
          <Route path="/chat" element={<Navigate to="/ai-investigation" replace />} />
          <Route path="/assistant" element={<Navigate to="/ai-investigation" replace />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/gooey-nav" element={<GooeyNavDemo />} />
        </Routes>
      </main>

      {/* Permanent Bottom Console Navigation (GooeyNav with fluid WebGL2 droplets) */}
      <aside
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-auto"
        aria-label="Application Bottom Navigation"
      >
        <GooeyNav
          items={gooeyNavItems}
          activeIndex={currentActiveIndex >= 0 ? currentActiveIndex : 0}
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
          onChange={(_index: number, item: GooeyNavItem) => {
            if (item.href) {
              navigate(item.href);
            }
          }}
        />
      </aside>

      {/* Persistent Bottom-Right Floating AI Forensic Copilot Chatbot */}
      <FloatingAIChat />

      {/* Toast Notifications relocated to non-colliding top-right */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

export default App;
