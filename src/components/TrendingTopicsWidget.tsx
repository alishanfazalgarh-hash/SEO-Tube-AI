import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Flame,
  Globe,
  RefreshCw,
  Sparkles,
  ArrowRight,
  Search,
  ExternalLink,
  Layers,
  Zap,
} from 'lucide-react';
import { triggerSmartLinkAd } from '../utils/adsManager';

export interface TrendingTopicItem {
  topic: string;
  category: string;
  trendScore: string;
  description: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

interface TrendingTopicsWidgetProps {
  onSelectTopic: (topic: string) => void;
  onShowToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

const CATEGORIES = [
  'All',
  'Tech & AI',
  'Gaming',
  'Vlogs & Shorts',
  'Health & Fitness',
  'Crypto & Finance',
  'Cooking & Food',
  'Education',
];

export const TrendingTopicsWidget: React.FC<TrendingTopicsWidgetProps> = ({
  onSelectTopic,
  onShowToast,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [topics, setTopics] = useState<TrendingTopicItem[]>([]);
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filterQuery, setFilterQuery] = useState<string>('');

  const fetchTrendingTopics = async (cat: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/trending', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: cat }),
      });

      const json = await response.json();
      if (!response.ok || !json.success) {
        throw new Error(json.error || 'Failed to fetch real-time trending topics.');
      }

      setTopics(json.data || []);
      setSources(json.sources || []);
    } catch (err: any) {
      console.error('Error in TrendingTopicsWidget:', err);
      onShowToast(err.message || 'Could not load trending topics.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingTopics(selectedCategory);
  }, [selectedCategory]);

  const handleUseTopic = (topic: string) => {
    triggerSmartLinkAd(() => {
      onSelectTopic(topic);
      onShowToast(`Selected trending topic: "${topic}"! 🚀`, 'info');
    });
  };

  const filteredTopics = topics.filter(
    (t) =>
      t.topic.toLowerCase().includes(filterQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(filterQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-4xl mx-auto my-10 space-y-6">
      
      {/* Container Header Box */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900/95 via-slate-900/80 to-slate-950 border border-emerald-500/30 backdrop-blur-2xl shadow-2xl space-y-6 overflow-hidden">
        
        {/* Glow ambient accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-5">
          
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-emerald-700 flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-500/20">
              <TrendingUp className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Real-Time Trending Topics
                </h3>
                <span className="hidden xs:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[11px] font-extrabold">
                  <Globe className="w-3 h-3" /> Live Search Grounded
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 font-medium">
                Live breakout search trends powered by Google Search Grounding for maximum YouTube views.
              </p>
            </div>
          </div>

          {/* Refresh Button */}
          <button
            onClick={() => fetchTrendingTopics(selectedCategory)}
            disabled={isLoading}
            type="button"
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-gray-200 text-xs font-bold border border-white/10 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 shrink-0 self-end md:self-auto"
            title="Refresh real-time trends"
          >
            <RefreshCw className={`w-4 h-4 text-emerald-400 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh Trends</span>
          </button>

        </div>

        {/* Category Filters Bar */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400">
            <span className="flex items-center gap-1.5 text-amber-400">
              <Layers className="w-4 h-4" /> Filter by Niche Category:
            </span>
            <span className="text-[11px] text-gray-500">
              Showing {filteredTopics.length} topics
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 no-scrollbar overflow-x-auto pb-1">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  disabled={isLoading}
                  type="button"
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    active
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30 scale-105 border border-emerald-400/50'
                      : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
                  }`}
                >
                  {active && <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />}
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search filter within topics */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search within trending keywords..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        {/* Topics Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white/5 border border-white/5 animate-pulse space-y-3"
              >
                <div className="h-4 bg-white/10 rounded w-3/4"></div>
                <div className="h-3 bg-white/10 rounded w-1/2"></div>
                <div className="h-3 bg-white/5 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : filteredTopics.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-400 bg-slate-950/40 rounded-2xl border border-white/5 space-y-2">
            <p>No trending topics found matching "{filterQuery}".</p>
            <button
              onClick={() => {
                setFilterQuery('');
                setSelectedCategory('All');
              }}
              className="text-xs font-bold text-emerald-400 hover:underline"
            >
              Reset Category & Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTopics.map((item, index) => (
              <div
                key={index}
                className="group relative p-5 rounded-2xl bg-slate-950/80 border border-white/10 hover:border-emerald-500/50 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between space-y-3 shadow-lg hover:shadow-emerald-500/10"
              >
                {/* Top Row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-extrabold flex items-center justify-center border border-emerald-500/30">
                      #{index + 1}
                    </span>
                    <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-white/10 text-gray-300 border border-white/10">
                      {item.category || selectedCategory}
                    </span>
                  </div>

                  <span className="px-2.5 py-1 text-[11px] font-extrabold rounded-full bg-gradient-to-r from-amber-500/20 to-red-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1 shrink-0">
                    <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30" />
                    {item.trendScore || '🔥 Viral Trend'}
                  </span>
                </div>

                {/* Topic Headline */}
                <div className="space-y-1">
                  <h4 className="text-base font-extrabold text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                    {item.topic}
                  </h4>
                  <p className="text-xs text-gray-400 font-medium line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Action CTA */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-gray-500 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" /> High CTR Keyword
                  </span>

                  <button
                    onClick={() => handleUseTopic(item.topic)}
                    type="button"
                    className="px-3.5 py-2 rounded-xl bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white text-xs font-extrabold border border-emerald-500/40 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-md"
                  >
                    <span>Use Topic</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Search Grounding Sources Citations */}
        {sources && sources.length > 0 && (
          <div className="pt-4 border-t border-white/10 space-y-2">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400">
              <Globe className="w-3.5 h-3.5 text-emerald-400" /> Grounded Search Verification Sources:
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {sources.map((src, idx) => (
                <a
                  key={idx}
                  href={src.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-[11px] font-medium border border-white/10 hover:border-emerald-500/30 transition-colors flex items-center gap-1.5 line-clamp-1 max-w-xs"
                >
                  <span className="truncate">{src.title}</span>
                  <ExternalLink className="w-3 h-3 text-emerald-400 shrink-0" />
                </a>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
