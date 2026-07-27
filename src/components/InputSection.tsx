import React, { KeyboardEvent } from 'react';
import { Sparkles, Loader2, Search, X, Flame } from 'lucide-react';
import { triggerSmartLinkAd } from '../utils/adsManager';

interface InputSectionProps {
  topic: string;
  setTopic: (val: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  onClear: () => void;
}

const SAMPLE_TOPICS = [
  'Garlic Benefits You Should Know',
  'Python Full Course for Beginners',
  'Top 10 Travel Destinations 2026',
  'Urdu Poetry Status Video',
  'Crypto Trading Strategies'
];

export const InputSection: React.FC<InputSectionProps> = ({
  topic,
  setTopic,
  onGenerate,
  isLoading,
  onClear,
}) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading && topic.trim()) {
      e.preventDefault();
      triggerSmartLinkAd(() => {
        onGenerate();
      });
    }
  };

  const handleButtonClick = () => {
    if (!topic.trim() || isLoading) return;
    triggerSmartLinkAd(() => {
      onGenerate();
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4 px-1 sm:px-0">
      
      {/* Search Container with Ambient Glow */}
      <div className="relative group">
        
        {/* Glow backdrop effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-red-500 to-emerald-600 rounded-3xl blur-xl opacity-25 group-hover:opacity-45 transition duration-500"></div>
        
        {/* Responsive Mobile-Optimized Card Box */}
        <div className="relative p-2.5 sm:p-2 bg-slate-900/90 border border-white/15 focus-within:border-emerald-500 rounded-2xl sm:rounded-2xl backdrop-blur-2xl shadow-2xl transition-all duration-300 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-2">
          
          {/* Text Input Row */}
          <div className="relative flex-1 flex items-center bg-white/5 sm:bg-transparent rounded-xl sm:rounded-none px-3.5 sm:px-2 py-1 sm:py-0 border border-white/5 sm:border-none">
            <Search className="w-5 h-5 text-emerald-400 shrink-0 mr-2.5" />
            
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter video topic or keyword..."
              disabled={isLoading}
              className="w-full py-2.5 sm:py-3.5 text-base sm:text-lg font-semibold text-white placeholder-gray-400 bg-transparent focus:outline-none"
              aria-label="Enter video topic or keyword"
            />

            {/* Clear Button */}
            {topic && (
              <button
                onClick={onClear}
                type="button"
                className="p-1.5 ml-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                title="Clear topic input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Generate Button - Full Width on Mobile, Inline on Desktop */}
          <button
            onClick={handleButtonClick}
            disabled={isLoading || !topic.trim()}
            type="button"
            className="w-full sm:w-auto px-6 py-3.5 sm:py-3.5 rounded-xl bg-gradient-to-r from-[#16A34A] to-[#15803d] hover:from-[#15803d] hover:to-[#166534] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-600/30 active:scale-[0.98] sm:active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none transition-all duration-200 flex items-center justify-center gap-2.5 whitespace-nowrap cursor-pointer shrink-0"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-white" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                <span>GENERATE SEO</span>
              </>
            )}
          </button>

        </div>
      </div>

      {/* Suggested Topic Chips */}
      <div className="pt-1 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-gray-400 px-1">
          <span className="flex items-center gap-1.5 text-amber-400">
            <Flame className="w-4 h-4 fill-amber-400/20" /> Popular Topics:
          </span>
          <span className="text-[11px] text-gray-500 font-medium">Tap to try</span>
        </div>

        {/* Scrollable / Responsive Chips */}
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {SAMPLE_TOPICS.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => {
                setTopic(sample);
              }}
              type="button"
              className="text-xs font-semibold px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-gray-200 border border-white/10 hover:border-emerald-500/40 transition-all cursor-pointer backdrop-blur-md active:scale-95 whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <span>{sample}</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
