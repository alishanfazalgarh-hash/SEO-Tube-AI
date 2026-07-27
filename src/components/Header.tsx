import React from 'react';
import { Sun, Moon, Sparkles, Youtube } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-white/5 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center space-x-3 cursor-pointer group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-700 shadow-lg shadow-red-500/20 group-hover:scale-105 transition-transform duration-300">
            <Youtube className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1">
                SEO<span className="text-red-500">Tube</span> AI
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Sparkles className="w-3 h-3" /> v2.5
              </span>
            </div>
            <p className="text-[11px] font-medium text-gray-400 hidden xs:block">
              Viral YouTube Title, Description & Hashtag AI Generator
            </p>
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Badge indicator on small mobile */}
          <span className="sm:hidden flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
            AI SEO
          </span>

          {/* Dark Mode Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 border border-white/10 shadow-sm transition-all duration-200 flex items-center gap-2 active:scale-95 cursor-pointer"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme mode"
          >
            {darkMode ? (
              <>
                <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                <span className="hidden sm:inline text-xs font-semibold">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-400" />
                <span className="hidden sm:inline text-xs font-semibold">Dark</span>
              </>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
