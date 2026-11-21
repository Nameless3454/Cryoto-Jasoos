import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none select-none">
      {toasts.map((toast) => {
        const styles = {
          success: 'bg-[#0D111C]/95 border-emerald-500/40 text-emerald-200 shadow-[0_12px_36px_rgba(0,0,0,0.6),0_0_16px_rgba(16,185,129,0.15)]',
          error: 'bg-[#0D111C]/95 border-rose-500/40 text-rose-200 shadow-[0_12px_36px_rgba(0,0,0,0.6),0_0_16px_rgba(244,63,94,0.15)]',
          info: 'bg-[#0D111C]/95 border-[#6D55FF]/40 text-slate-100 shadow-[0_12px_36px_rgba(0,0,0,0.6),0_0_20px_rgba(109,85,255,0.18)]'
        };

        const icons = {
          success: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />,
          error: <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />,
          info: <Info className="w-4 h-4 text-[#8B75FF] shrink-0 mt-0.5" />
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-2xl border backdrop-blur-2xl flex items-start gap-3 transition-all ${styles[toast.type]}`}
          >
            {icons[toast.type]}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-mono font-bold tracking-wide uppercase">{toast.title}</h4>
              {toast.message && (
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed font-sans">{toast.message}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/[0.06] transition-colors cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;
