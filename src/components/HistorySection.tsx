import React, { useState } from 'react';
import { HistoryItem } from '../types';
import {
  History,
  Trash2,
  ExternalLink,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Sparkles,
  Youtube,
  Search,
  Tag,
  FileText,
} from 'lucide-react';
import { triggerSmartLinkAd } from '../utils/adsManager';

interface HistorySectionProps {
  history: HistoryItem[];
  onSelectHistoryItem: (item: HistoryItem) => void;
  onDeleteHistoryItem: (id: string) => void;
  onClearAllHistory: () => void;
  onShowToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const HistorySection: React.FC<HistorySectionProps> = ({
  history,
  onSelectHistoryItem,
  onDeleteHistoryItem,
  onClearAllHistory,
  onShowToast,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  if (!history || history.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto my-8 p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl shadow-xl text-center space-y-3">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400">
          <History className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-white">No Generation History Yet</h3>
        <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto">
          Your generated YouTube titles, descriptions, and hashtags will automatically be saved here for easy access.
        </p>
      </div>
    );
  }

  const filteredHistory = history.filter(
    (item) =>
      item.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.result.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopyHistoryPackage = (e: React.MouseEvent, item: HistoryItem) => {
    e.stopPropagation();
    const formattedText = `📌 TITLE:\n${item.result.title}\n\n📝 DESCRIPTION:\n${item.result.description}\n\n🏷️ HASHTAGS:\n${(item.result.hashtags || []).join(' ')}`;
    navigator.clipboard.writeText(formattedText);
    setCopiedId(item.id);
    onShowToast('Copied history result to clipboard! 📋', 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLoadItem = (item: HistoryItem) => {
    triggerSmartLinkAd(() => {
      onSelectHistoryItem(item);
      onShowToast(`Loaded "${item.topic}" into active editor! 🚀`, 'info');
      // Scroll to results
      setTimeout(() => {
        const el = document.getElementById('results-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 space-y-4">
      {/* Header Container */}
      <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-slate-900/90 border border-amber-500/30 backdrop-blur-2xl shadow-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-red-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-amber-500/20">
            <History className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-white">
                Recent SEO History
              </h3>
              <span className="px-2.5 py-0.5 text-[11px] font-extrabold rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                {history.length} {history.length === 1 ? 'Saved' : 'Saved'}
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Saved in your browser local storage. Click any past result to reload.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 text-xs font-bold border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
            title={isExpanded ? 'Collapse History' : 'Expand History'}
          >
            {isExpanded ? (
              <>
                <span>Hide</span>
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Show ({history.length})</span>
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>

          <button
            onClick={onClearAllHistory}
            className="px-3.5 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-bold border border-red-500/30 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            title="Clear all saved history"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden xs:inline">Clear History</span>
          </button>
        </div>

      </div>

      {/* Expandable History Content */}
      {isExpanded && (
        <div className="space-y-3 animate-fade-in">
          
          {/* Search filter within history if > 3 items */}
          {history.length > 3 && (
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search history by topic or title..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50"
              />
            </div>
          )}

          {filteredHistory.length === 0 ? (
            <div className="p-6 text-center text-xs text-gray-400 bg-slate-900/40 rounded-2xl border border-white/5">
              No history matching "{searchTerm}"
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3.5">
              {filteredHistory.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleLoadItem(item)}
                  className="group relative p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-amber-500/50 hover:bg-slate-800/90 transition-all duration-300 cursor-pointer shadow-lg space-y-3"
                >
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-3 border-b border-white/5 pb-2.5">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <div className="p-1.5 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 shrink-0">
                        <Youtube className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-extrabold text-white group-hover:text-amber-400 transition-colors truncate">
                        {item.topic}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-medium text-gray-400 flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                        <Clock className="w-3 h-3 text-amber-400" />
                        {item.timestamp}
                      </span>

                      {/* Load Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLoadItem(item);
                        }}
                        type="button"
                        className="px-2.5 py-1 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white text-[11px] font-bold border border-emerald-500/40 transition-all flex items-center gap-1 cursor-pointer"
                        title="Load result into active view"
                      >
                        <span>Load</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>

                      {/* Copy Button */}
                      <button
                        onClick={(e) => handleCopyHistoryPackage(e, item)}
                        type="button"
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
                        title="Copy full package"
                      >
                        {copiedId === item.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {/* Delete Item */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteHistoryItem(item.id);
                        }}
                        type="button"
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/30 text-red-400 transition-colors cursor-pointer"
                        title="Delete from history"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Title Preview */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Title
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-gray-200 line-clamp-2">
                      {item.result.title}
                    </p>
                  </div>

                  {/* Hashtags Preview */}
                  {item.result.hashtags && item.result.hashtags.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      <Tag className="w-3 h-3 text-purple-400 shrink-0" />
                      {item.result.hashtags.slice(0, 6).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-medium px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                      {item.result.hashtags.length > 6 && (
                        <span className="text-[10px] text-gray-500 font-bold">
                          +{item.result.hashtags.length - 6} more
                        </span>
                      )}
                    </div>
                  )}

                </div>
              ))}
            </div>
          )}

        </div>
      )}
    </div>
  );
};
