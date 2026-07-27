import React, { KeyboardEvent, useState, useRef, useEffect } from 'react';
import { Sparkles, Loader2, Search, X, Flame, Globe, ChevronDown, Check, Languages } from 'lucide-react';
import { triggerSmartLinkAd } from '../utils/adsManager';

export interface LanguageOption {
  code: string;
  name: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'English', name: 'English', flag: '🇺🇸' },
  { code: 'Spanish', name: 'Spanish (Español)', flag: '🇪🇸' },
  { code: 'French', name: 'French (Français)', flag: '🇫🇷' },
  { code: 'German', name: 'German (Deutsch)', flag: '🇩🇪' },
  { code: 'Hindi', name: 'Hindi (हिन्दी)', flag: '🇮🇳' },
  { code: 'Urdu', name: 'Urdu (اردو)', flag: '🇵🇰' },
  { code: 'Portuguese', name: 'Portuguese (Português)', flag: '🇧🇷' },
  { code: 'Arabic', name: 'Arabic (العربية)', flag: '🇸🇦' },
  { code: 'Japanese', name: 'Japanese (日本語)', flag: '🇯🇵' },
  { code: 'Italian', name: 'Italian (Italiano)', flag: '🇮🇹' },
  { code: 'Korean', name: 'Korean (한국어)', flag: '🇰🇷' },
  { code: 'Russian', name: 'Russian (Русский)', flag: '🇷🇺' },
  { code: 'Indonesian', name: 'Indonesian (Bahasa)', flag: '🇮🇩' },
  { code: 'Turkish', name: 'Turkish (Türkçe)', flag: '🇹🇷' },
  { code: 'Chinese', name: 'Chinese (中文)', flag: '🇨🇳' },
];

const POPULAR_LANG_CODES = ['English', 'Spanish', 'Urdu', 'Hindi', 'French', 'Arabic', 'German'];

interface InputSectionProps {
  topic: string;
  setTopic: (val: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  onClear: () => void;
}

const SAMPLE_TOPICS = [
  'Garlic Benefits You Should Know',
  'Python Full Course for Beginners',
  'Top 10 Travel Destinations 2026',
  'Urdu Poetry Status Video',
  'Crypto Trading Strategies',
];

export const InputSection: React.FC<InputSectionProps> = ({
  topic,
  setTopic,
  language,
  setLanguage,
  onGenerate,
  isLoading,
  onClear,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const currentLangObj =
    SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  const filteredLanguages = SUPPORTED_LANGUAGES.filter(
    (l) =>
      l.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      l.code.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4 px-1 sm:px-0">
      
      {/* LANGUAGE SELECTOR BOX / BUTTONS CONTAINER */}
      <div className="bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-3 sm:p-4 backdrop-blur-xl shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-xs sm:text-sm uppercase tracking-wider">
            <Languages className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Select Output Content Language:</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full shadow-inner">
            <span className="text-base">{currentLangObj.flag}</span>
            <span>Selected: {currentLangObj.name}</span>
          </div>
        </div>

        {/* Quick Select Buttons Row */}
        <div className="flex flex-wrap items-center gap-2">
          {POPULAR_LANG_CODES.map((code) => {
            const lang = SUPPORTED_LANGUAGES.find((l) => l.code === code);
            if (!lang) return null;
            const isSelected = language === code;

            return (
              <button
                key={code}
                type="button"
                onClick={() => setLanguage(code)}
                disabled={isLoading}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30 scale-105 border border-emerald-400 ring-2 ring-emerald-400/30'
                    : 'bg-slate-800/90 text-gray-300 hover:text-white hover:bg-slate-700/90 border border-white/10 hover:border-emerald-500/40'
                }`}
              >
                <span className="text-sm">{lang.flag}</span>
                <span>{lang.code}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-white ml-0.5" />}
              </button>
            );
          })}

          {/* More Languages Dropdown Trigger Button */}
          <div className="relative inline-block" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              disabled={isLoading}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                !POPULAR_LANG_CODES.includes(language)
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30 border border-emerald-400'
                  : 'bg-slate-800/90 text-emerald-400 hover:bg-slate-700/90 border border-emerald-500/30'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>
                {!POPULAR_LANG_CODES.includes(language)
                  ? `${currentLangObj.flag} ${currentLangObj.code}`
                  : 'More Languages...'}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu Box */}
            {isOpen && (
              <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-72 bg-slate-900 border border-emerald-500/40 rounded-2xl shadow-2xl backdrop-blur-2xl p-3 z-50 space-y-2 animate-in fade-in zoom-in-95 duration-150">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search language..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="w-full bg-slate-800/90 text-xs text-white placeholder-gray-400 pl-8 pr-3 py-1.5 rounded-xl border border-white/10 focus:border-emerald-400 focus:outline-none"
                  />
                  {searchFilter && (
                    <button
                      onClick={() => setSearchFilter('')}
                      className="absolute right-2 top-2 text-gray-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="max-h-56 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                  {filteredLanguages.map((lang) => {
                    const isSelected = language === lang.code;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsOpen(false);
                          setSearchFilter('');
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${
                          isSelected
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'text-gray-200 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{lang.flag}</span>
                          <span>{lang.name}</span>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                      </button>
                    );
                  })}
                  {filteredLanguages.length === 0 && (
                    <div className="text-center py-3 text-xs text-gray-400">No language found</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEARCH INPUT CONTAINER WITH AMBIENT GLOW */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-red-500 to-emerald-600 rounded-3xl blur-xl opacity-25 group-hover:opacity-45 transition duration-500"></div>

        <div className="relative p-2.5 sm:p-2 bg-slate-900/90 border border-white/15 focus-within:border-emerald-500 rounded-2xl sm:rounded-2xl backdrop-blur-2xl shadow-2xl transition-all duration-300 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-2">
          {/* Text Input Row */}
          <div className="relative flex-1 flex items-center bg-white/5 sm:bg-transparent rounded-xl sm:rounded-none px-3.5 sm:px-2 py-1 sm:py-0 border border-white/5 sm:border-none">
            <Search className="w-5 h-5 text-emerald-400 shrink-0 mr-2.5" />

            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Enter topic (Generates in ${currentLangObj.name})...`}
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

          {/* Generate Button */}
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
                <span>GENERATE ({currentLangObj.code.toUpperCase()})</span>
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
