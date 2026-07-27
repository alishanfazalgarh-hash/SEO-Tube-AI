import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { InputSection } from './components/InputSection';
import { OutputCards } from './components/OutputCards';
import { SkeletonCards } from './components/SkeletonCard';
import { Toast, ToastMessage } from './components/Toast';
import { AdContainer } from './components/AdContainer';
import { HistorySection } from './components/HistorySection';
import { BoomModal } from './components/BoomModal';
import { triggerBoomAnimation } from './utils/confettiBoom';
import { SeoResult, GenerationMode, HistoryItem } from './types';
import { initSocialBarAd, triggerPopunderAd } from './utils/adsManager';
import { Sparkles, Youtube, Zap, ShieldCheck } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('seo_tube_ai_theme');
      if (saved !== null) {
        return saved === 'dark';
      }
      return true; // Default to dark mode for premium aesthetic
    }
    return true;
  });

  const [topic, setTopic] = useState<string>('');
  const [language, setLanguage] = useState<string>('English');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRegeneratingCard, setIsRegeneratingCard] = useState<GenerationMode | null>(null);
  const [seoResult, setSeoResult] = useState<SeoResult | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [isBoomOpen, setIsBoomOpen] = useState<boolean>(false);

  // Local storage history state
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('seo_tube_ai_history');
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        console.error('Failed to parse history from localStorage:', e);
        return [];
      }
    }
    return [];
  });

  // Sync dark mode class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('seo_tube_ai_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('seo_tube_ai_theme', 'light');
    }
  }, [darkMode]);

  // Sync history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('seo_tube_ai_history', JSON.stringify(history));
    } catch (e) {
      console.error('Failed to save history to localStorage:', e);
    }
  }, [history]);

  // Initialize global ad formats once on mount
  useEffect(() => {
    initSocialBarAd();
  }, []);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info', onRetry?: () => void) => {
    setToast({
      id: Date.now().toString(),
      message,
      type,
      onRetry,
    });
  };

  const handleGenerate = async (mode: GenerationMode = 'all', overrideTopic?: string) => {
    const targetTopic = (overrideTopic || topic).trim();
    if (!targetTopic) {
      showToast('Please enter a topic or keyword first!', 'error');
      return;
    }

    if (overrideTopic) {
      setTopic(overrideTopic);
    }

    if (mode === 'all') {
      setIsLoading(true);
    } else {
      setIsRegeneratingCard(mode);
    }

    // Trigger popunder once on generation request
    triggerPopunderAd();

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: targetTopic,
          language,
          mode,
          currentTitle: seoResult?.title,
          currentDescription: seoResult?.description,
          currentHashtags: seoResult?.hashtags,
        }),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.error || 'Failed to generate SEO package. Please try again.');
      }

      const newResult: SeoResult = json.data;
      setSeoResult(newResult);

      // Save to localStorage history
      if (mode === 'all' && newResult) {
        const historyItem: HistoryItem = {
          id: Date.now().toString(),
          topic: targetTopic,
          result: newResult,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            month: 'short',
            day: 'numeric',
          }),
        };

        setHistory((prev) => {
          const filtered = prev.filter(
            (item) => item.topic.toLowerCase() !== targetTopic.toLowerCase()
          );
          return [historyItem, ...filtered].slice(0, 30); // Store up to 30 history items
        });

        // 💥 BOOM ANIMATION TRIGGER 💥
        triggerBoomAnimation();
        setIsBoomOpen(true);

        showToast('💥 BOOM! Viral YouTube SEO package generated! 🚀', 'success');
        
        // Auto Scroll to results
        setTimeout(() => {
          const resultsEl = document.getElementById('results-section');
          if (resultsEl) {
            resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 200);
      } else {
        showToast(`Regenerated ${mode.toUpperCase()} successfully! ✨`, 'success');
      }

    } catch (error: any) {
      console.error('SEO Generation error:', error);
      showToast(
        error.message || 'An unexpected error occurred while connecting to AI backend.',
        'error',
        () => handleGenerate(mode, targetTopic)
      );
    } finally {
      setIsLoading(false);
      setIsRegeneratingCard(null);
    }
  };

  const handleClear = () => {
    setTopic('');
    setSeoResult(null);
    showToast('Cleared input and active results.', 'info');
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setTopic(item.topic);
    setSeoResult(item.result);
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
    showToast('Deleted item from history.', 'info');
  };

  const handleClearAllHistory = () => {
    setHistory([]);
    showToast('Cleared all generation history.', 'info');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a] text-white transition-colors duration-300 relative overflow-x-hidden selection:bg-red-500 selection:text-white">
      
      {/* Animated Mesh Ambient Background Simulation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-900/25 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-900/25 rounded-full blur-[120px]"></div>
        <div className="absolute top-[35%] right-[10%] w-[400px] h-[400px] bg-amber-900/20 rounded-full blur-[100px]"></div>
      </div>

      {/* Global Ads & Popunder Slots */}
      <AdContainer id="ad-social-bar" type="social-bar" />
      <AdContainer id="ad-popunder" type="popunder" />
      <AdContainer id="ad-smart-link" type="smart-link" />

      {/* Main App Layout */}
      <div className="relative z-10 flex-1 flex flex-col">
        
        {/* Header */}
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Top Banner Location below Header */}
        <div className="px-4 pt-3">
          <AdContainer id="ad-320x50-top" type="320x50-top" label="FEATURED SPONSOR" />
        </div>

        {/* Hero & Form Section */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
          
          {/* Hero Section */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm font-bold text-gray-200 backdrop-blur-md shadow-lg">
              <Youtube className="w-4 h-4 text-red-500 animate-pulse" />
              <span>Create Viral YouTube Titles, Descriptions & Hashtags in Seconds 🚀</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
              AI-Powered YouTube <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-300 to-emerald-400">SEO Generator</span>
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed">
              Enter any topic or keyword below to generate CTR-optimized titles, complete 150-300 word descriptions with CTAs, and 20-30 targeted hashtags in 1 click.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-gray-300 pt-2">
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800/80 border border-amber-500/30 text-amber-300 backdrop-blur-md shadow-md">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> High CTR Titles
              </span>
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800/80 border border-emerald-500/30 text-emerald-300 backdrop-blur-md shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> 150-300 Word Descriptions
              </span>
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800/80 border border-blue-500/30 text-blue-300 backdrop-blur-md shadow-md">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Auto Language Detection
              </span>
            </div>

          </div>

          {/* Input Box Section */}
          <InputSection
            topic={topic}
            setTopic={setTopic}
            language={language}
            setLanguage={setLanguage}
            onGenerate={() => handleGenerate('all')}
            isLoading={isLoading}
            onClear={handleClear}
          />

          {/* Loading Skeleton */}
          {isLoading && <SkeletonCards />}

          {/* Results Output Section */}
          {!isLoading && seoResult && (
            <OutputCards
              seoResult={seoResult}
              onRegenerateCard={(mode) => handleGenerate(mode)}
              onClear={handleClear}
              isRegeneratingCard={isRegeneratingCard}
              onShowToast={showToast}
            />
          )}

          {/* Local Storage History Feature Section */}
          <HistorySection
            history={history}
            onSelectHistoryItem={handleSelectHistoryItem}
            onDeleteHistoryItem={handleDeleteHistoryItem}
            onClearAllHistory={handleClearAllHistory}
            onShowToast={showToast}
          />

          {/* Bottom Ad Section: Multi-Format Ads */}
          <div className="pt-6 space-y-6 text-center border-t border-white/10">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Sponsored Creator Recommendations
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-center max-w-4xl mx-auto">
              {/* Bottom 300x250 Medium Rectangle Ad */}
              <AdContainer id="ad-300x250-bottom" type="300x250" label="FEATURED AD" />

              {/* Bottom Native Ad Container */}
              <AdContainer id="ad-native-bottom" type="native" label="RECOMMENDED FOR CREATORS" />
            </div>

            {/* Bottom 320x50 Banner */}
            <AdContainer id="ad-320x50-bottom" type="320x50-top" label="SPONSOR" />
          </div>

        </main>

        {/* Footer */}
        <Footer />

      </div>

      {/* Mobile Sticky Bottom Ad Banner */}
      <div className="sticky bottom-0 z-30 w-full sm:hidden bg-slate-900/95 border-t border-white/10 py-1 px-2 backdrop-blur-md">
        <AdContainer id="ad-320x50-mobile" type="320x50-mobile" label="AD" />
      </div>

      {/* Toast Component */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Boom Celebration Modal */}
      <BoomModal
        isOpen={isBoomOpen}
        onClose={() => setIsBoomOpen(false)}
        topic={topic}
      />

    </div>
  );
}
