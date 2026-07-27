import React, { useEffect } from 'react';
import { Sparkles, Flame, CheckCircle2, Zap, X } from 'lucide-react';

interface BoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: string;
}

export const BoomModal: React.FC<BoomModalProps> = ({ isOpen, onClose, topic }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000); // Auto close after 4s or user can tap close
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      {/* Radial Glow Container */}
      <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border-2 border-amber-500/50 shadow-[0_0_80px_rgba(245,158,11,0.35)] text-center space-y-5 transform animate-bounce-short">
        
        {/* Top Floating Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Close celebration modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Boom Icon / Badge */}
        <div className="relative inline-flex items-center justify-center">
          <div className="absolute -inset-4 bg-gradient-to-r from-red-500 via-amber-400 to-emerald-500 rounded-full blur-xl opacity-75 animate-pulse"></div>
          <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 via-red-500 to-purple-600 p-0.5 shadow-2xl flex items-center justify-center text-white">
            <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
              <Flame className="w-10 h-10 text-amber-400 animate-bounce" />
            </div>
          </div>
        </div>

        {/* Text Headline */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-widest border border-amber-500/30">
            <Zap className="w-3.5 h-3.5 fill-amber-400" /> BOOM! GENERATION COMPLETE
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Viral YouTube SEO Package Ready! 🚀
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-gray-300 line-clamp-2 px-2">
            "{topic}"
          </p>
        </div>

        {/* Feature Check List */}
        <div className="grid grid-cols-3 gap-2 pt-2 text-left text-xs font-bold">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center text-center space-y-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-[11px] text-gray-200">CTR Title</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center text-center space-y-1">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span className="text-[11px] text-gray-200">SEO Body</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center text-center space-y-1">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            <span className="text-[11px] text-gray-200">25+ Tags</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          type="button"
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-red-500 to-amber-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/30 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5 fill-slate-950" />
          <span>VIEW MY VIRAL PACKAGE</span>
        </button>

      </div>
    </div>
  );
};
