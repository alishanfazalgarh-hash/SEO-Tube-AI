import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X, RefreshCw } from 'lucide-react';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  onRetry?: () => void;
}

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (toast && toast.type !== 'error') {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-16 sm:bottom-6 right-4 z-50 max-w-md w-full animate-bounce-short">
      <div
        className={`p-4 rounded-2xl shadow-2xl border backdrop-blur-md flex items-start gap-3 transition-all ${
          toast.type === 'success'
            ? 'bg-emerald-950/90 text-emerald-100 border-emerald-500/50 dark:bg-emerald-900/90'
            : toast.type === 'error'
            ? 'bg-red-950/90 text-red-100 border-red-500/50 dark:bg-red-900/90'
            : 'bg-gray-900/90 text-white border-gray-700/50'
        }`}
      >
        <div className="mt-0.5">
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400" />}
        </div>

        <div className="flex-1 space-y-1">
          <p className="text-sm font-semibold leading-snug">{toast.message}</p>
          {toast.onRetry && (
            <button
              onClick={() => {
                onClose();
                toast.onRetry?.();
              }}
              className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Retry
            </button>
          )}
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
