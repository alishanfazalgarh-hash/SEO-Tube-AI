import React, { useState } from 'react';
import { Youtube, Heart, Sparkles } from 'lucide-react';
import { PolicyModals, PolicyModalType } from './PolicyModals';

export const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<PolicyModalType>(null);

  return (
    <>
      <footer className="w-full border-t border-white/10 bg-white/5 backdrop-blur-md mt-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            {/* Brand Column */}
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-700 text-white shadow-sm">
                  <Youtube className="w-5 h-5" />
                </div>
                <span className="text-lg font-black tracking-tight text-white">
                  SEO<span className="text-red-500">Tube</span> AI
                </span>
              </div>
              <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
                Empowering content creators with instant, viral YouTube SEO titles, high-converting descriptions, and trending hashtag packages powered by AI.
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <Sparkles className="w-3.5 h-3.5" /> Fast • Secure • CTR Optimized
              </div>
            </div>

            {/* Quick Policy Links */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                Legal & Policies
              </h3>
              <ul className="space-y-2 text-xs text-gray-400">
                <li>
                  <button
                    onClick={() => setActiveModal('privacy')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('terms')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('disclaimer')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Disclaimer
                  </button>
                </li>
              </ul>
            </div>

            {/* Support & Navigation */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                Company & Support
              </h3>
              <ul className="space-y-2 text-xs text-gray-400">
                <li>
                  <button
                    onClick={() => setActiveModal('about')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    About SEO Tube AI
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveModal('contact')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Contact & Support
                  </button>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3">
            <p className="text-center sm:text-left">
              © {new Date().getFullYear()} SEO Tube AI. All rights reserved.
            </p>
            <p className="flex items-center gap-1 text-center sm:text-right">
              Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" /> for YouTube Content Creators
            </p>
          </div>

        </div>
      </footer>

      <PolicyModals activeModal={activeModal} onClose={() => setActiveModal(null)} />
    </>
  );
};
