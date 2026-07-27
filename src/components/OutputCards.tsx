import React, { useState } from 'react';
import { SeoResult, GenerationMode } from '../types';
import { Copy, Check, RefreshCw, Sparkles, Hash, FileText, Type, Trash2, Layers, Globe } from 'lucide-react';
import { AdContainer } from './AdContainer';

interface OutputCardsProps {
  seoResult: SeoResult;
  onRegenerateCard: (mode: GenerationMode) => void;
  onClear: () => void;
  isRegeneratingCard: GenerationMode | null;
  onShowToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const OutputCards: React.FC<OutputCardsProps> = ({
  seoResult,
  onRegenerateCard,
  onClear,
  isRegeneratingCard,
  onShowToast,
}) => {
  const [copiedTitle, setCopiedTitle] = useState(false);
  const [copiedDescription, setCopiedDescription] = useState(false);
  const [copiedHashtags, setCopiedHashtags] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  const handleCopy = (text: string, type: 'title' | 'description' | 'hashtags' | 'all') => {
    navigator.clipboard.writeText(text);
    onShowToast(`Copied ${type.toUpperCase()} to clipboard! ✨`, 'success');

    if (type === 'title') {
      setCopiedTitle(true);
      setTimeout(() => setCopiedTitle(false), 2000);
    } else if (type === 'description') {
      setCopiedDescription(true);
      setTimeout(() => setCopiedDescription(false), 2000);
    } else if (type === 'hashtags') {
      setCopiedHashtags(true);
      setTimeout(() => setCopiedHashtags(false), 2000);
    } else if (type === 'all') {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    }
  };

  const formattedHashtagsString = (seoResult.hashtags || []).join(' ');

  const fullPackageText = `=== YOUTUBE TITLE ===\n${seoResult.title}\n\n=== YOUTUBE DESCRIPTION ===\n${seoResult.description}\n\n=== YOUTUBE HASHTAGS ===\n${formattedHashtagsString}`;

  const wordCount = seoResult.description
    ? seoResult.description.trim().split(/\s+/).length
    : 0;

  return (
    <div id="results-section" className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in scroll-mt-20">
      
      {/* Result Status Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-2.5 text-emerald-400">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <span className="font-bold text-sm sm:text-base text-white">
            SEO Package Generated Successfully!
          </span>
        </div>
        {seoResult.languageDetected && (
          <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-white/10 text-gray-200 border border-white/10 shadow-sm backdrop-blur-md">
            <Globe className="w-3.5 h-3.5 text-blue-400" /> Language: {seoResult.languageDetected}
          </span>
        )}
      </div>

      {/* CARD 1: SEO TITLE */}
      <div className="relative group rounded-3xl bg-white/5 border border-white/10 shadow-2xl hover:bg-white/10 backdrop-blur-md transition-all duration-300 p-6 sm:p-8 space-y-4 overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2 text-green-400 font-extrabold text-xs sm:text-sm uppercase tracking-widest">
            <Type className="w-4 h-4" />
            <span>Card 01 • SEO Title</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
              seoResult.title.length >= 60 && seoResult.title.length <= 100
                ? 'bg-green-500/20 text-green-400 border-green-500/30'
                : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
            }`}>
              {seoResult.title.length} Chars
            </span>
            <span className="text-[10px] px-2 py-1 bg-green-500/20 text-green-400 rounded-full font-bold">OPTIMIZED</span>
          </div>
        </div>

        {/* Content Box */}
        <div className="relative p-5 sm:p-6 rounded-2xl bg-black/20 border border-white/5 text-white font-bold text-lg sm:text-2xl leading-snug tracking-tight">
          {isRegeneratingCard === 'title' ? (
            <div className="flex items-center gap-3 text-red-400 py-2">
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span className="text-sm font-semibold">Regenerating Title...</span>
            </div>
          ) : (
            seoResult.title
          )}
        </div>

        {/* Card 1 Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={() => onRegenerateCard('title')}
            disabled={isRegeneratingCard !== null}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 text-xs sm:text-sm font-semibold border border-white/10 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer"
            title="Regenerate Title"
          >
            <RefreshCw className={`w-4 h-4 ${isRegeneratingCard === 'title' ? 'animate-spin' : ''}`} />
            Regenerate
          </button>

          <button
            onClick={() => handleCopy(seoResult.title, 'title')}
            className="px-5 py-2 rounded-xl bg-[#16A34A] hover:bg-[#15803d] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
            title="Copy Title"
          >
            {copiedTitle ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* CARD 2: SEO DESCRIPTION */}
      <div className="relative group rounded-3xl bg-white/5 border border-white/10 shadow-2xl hover:bg-white/10 backdrop-blur-md transition-all duration-300 p-6 sm:p-8 space-y-4 overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2 text-green-400 font-extrabold text-xs sm:text-sm uppercase tracking-widest">
            <FileText className="w-4 h-4" />
            <span>Card 02 • Description</span>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
            {wordCount} Words
          </span>
        </div>

        {/* Content Box */}
        <div className="relative p-5 sm:p-6 rounded-2xl bg-black/20 border border-white/5 text-gray-200 font-medium text-sm sm:text-base whitespace-pre-wrap leading-relaxed font-sans max-h-[400px] overflow-y-auto custom-scrollbar">
          {isRegeneratingCard === 'description' ? (
            <div className="flex items-center gap-3 text-red-400 py-6 justify-center">
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span className="text-sm font-semibold">Regenerating Description...</span>
            </div>
          ) : (
            seoResult.description
          )}
        </div>

        {/* Card 2 Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={() => onRegenerateCard('description')}
            disabled={isRegeneratingCard !== null}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 text-xs sm:text-sm font-semibold border border-white/10 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer"
            title="Regenerate Description"
          >
            <RefreshCw className={`w-4 h-4 ${isRegeneratingCard === 'description' ? 'animate-spin' : ''}`} />
            Regenerate
          </button>

          <button
            onClick={() => handleCopy(seoResult.description, 'description')}
            className="px-5 py-2 rounded-xl bg-[#16A34A] hover:bg-[#15803d] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
            title="Copy Description"
          >
            {copiedDescription ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* AD CONTAINER: 300x250 Banner between Description & Hashtags */}
      <AdContainer id="ad-300x250-middle" type="300x250" label="SPONSORED AD" />

      {/* CARD 3: SEO HASHTAGS */}
      <div className="relative group rounded-3xl bg-white/5 border border-white/10 shadow-2xl hover:bg-white/10 backdrop-blur-md transition-all duration-300 p-6 sm:p-8 space-y-4 overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2 text-green-400 font-extrabold text-xs sm:text-sm uppercase tracking-widest">
            <Hash className="w-4 h-4" />
            <span>Card 03 • Hashtags</span>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
            {seoResult.hashtags ? seoResult.hashtags.length : 0} Hashtags
          </span>
        </div>

        {/* Content Box - Grid/Pills */}
        <div className="p-5 sm:p-6 rounded-2xl bg-black/20 border border-white/5">
          {isRegeneratingCard === 'hashtags' ? (
            <div className="flex items-center gap-3 text-red-400 py-6 justify-center">
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span className="text-sm font-semibold">Regenerating Hashtags...</span>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 max-h-[300px] overflow-y-auto custom-scrollbar">
              {(seoResult.hashtags || []).map((tag, idx) => (
                <span
                  key={idx}
                  onClick={() => {
                    navigator.clipboard.writeText(tag);
                    onShowToast(`Copied ${tag}`, 'info');
                  }}
                  className="px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold bg-white/5 text-gray-300 border border-white/10 shadow-sm hover:scale-105 hover:bg-white/10 hover:text-white transition-all cursor-pointer select-none"
                  title="Click to copy single hashtag"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Card 3 Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={() => onRegenerateCard('hashtags')}
            disabled={isRegeneratingCard !== null}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 text-xs sm:text-sm font-semibold border border-white/10 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer"
            title="Regenerate Hashtags"
          >
            <RefreshCw className={`w-4 h-4 ${isRegeneratingCard === 'hashtags' ? 'animate-spin' : ''}`} />
            Regenerate
          </button>

          <button
            onClick={() => handleCopy(formattedHashtagsString, 'hashtags')}
            className="px-5 py-2 rounded-xl bg-[#16A34A] hover:bg-[#15803d] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
            title="Copy Hashtags"
          >
            {copiedHashtags ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* GLOBAL ACTION BAR BELOW CARDS */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="text-center sm:text-left">
          <h4 className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-1.5">
            <Layers className="w-4 h-4 text-emerald-400" /> Complete YouTube SEO Package
          </h4>
          <p className="text-xs text-gray-400">
            Copy Title, Description & Hashtags together for immediate YouTube upload.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Clear Button */}
          <button
            onClick={onClear}
            className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs sm:text-sm font-bold border border-red-500/30 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            CLEAR ALL
          </button>

          {/* Copy All Button */}
          <button
            onClick={() => handleCopy(fullPackageText, 'all')}
            className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-[#16A34A] hover:bg-[#15803d] text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
          >
            {copiedAll ? (
              <>
                <Check className="w-4 h-4" />
                ALL COPIED!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                COPY ALL
              </>
            )}
          </button>
        </div>

      </div>

      {/* AD CONTAINER: Native Banner Below Results */}
      <AdContainer id="ad-native-banner" type="native" label="RECOMMENDED FOR CREATORS" />

    </div>
  );
};
