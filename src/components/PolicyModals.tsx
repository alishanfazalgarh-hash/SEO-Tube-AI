import React from 'react';
import { X, ShieldCheck, FileText, Info, Mail, AlertTriangle } from 'lucide-react';

export type PolicyModalType = 'about' | 'contact' | 'privacy' | 'terms' | 'disclaimer' | null;

interface PolicyModalsProps {
  activeModal: PolicyModalType;
  onClose: () => void;
}

export const PolicyModals: React.FC<PolicyModalsProps> = ({ activeModal, onClose }) => {
  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl p-6 sm:p-8 text-gray-800 dark:text-gray-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        {activeModal === 'about' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-red-600 dark:text-red-500">
              <Info className="w-7 h-7" />
              <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">About SEO Tube AI</h2>
            </div>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              <strong>SEO Tube AI</strong> is a cutting-edge YouTube SEO & Copywriting Engine built for content creators, vloggers, digital marketers, and educators. Our tool uses advanced AI language models trained on viral YouTube metadata patterns to boost Click-Through Rate (CTR) and improve Search Engine Optimization (SEO) ranking.
            </p>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              By analyzing search intent, trending keywords, and engagement triggers, SEO Tube AI delivers 3 optimized outputs in seconds: CTR-focused Titles, full YouTube Descriptions with CTAs, and targeted Hashtag packages.
            </p>
          </div>
        )}

        {activeModal === 'contact' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-500">
              <Mail className="w-7 h-7" />
              <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Contact & Support</h2>
            </div>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              Have questions, feedback, or custom integration inquiries? We would love to hear from you!
            </p>
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/60 space-y-2 text-sm">
              <p><strong>Email:</strong> support@seotube.ai</p>
              <p><strong>Developer Email:</strong> alishanfazalgarh@gmail.com</p>
              <p><strong>Response Time:</strong> Within 24-48 business hours</p>
            </div>
          </div>
        )}

        {activeModal === 'privacy' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-500">
              <ShieldCheck className="w-7 h-7" />
              <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Privacy Policy</h2>
            </div>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              At SEO Tube AI, we respect your privacy. We do not store or collect personal account details, passwords, or personal YouTube channel credentials.
            </p>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <p><strong>1. Data Processing:</strong> Topics entered into the input field are processed in real-time through secure server calls solely to generate SEO titles, descriptions, and hashtags.</p>
              <p><strong>2. Cookies & Local Storage:</strong> We use client-side local storage exclusively to save your UI preferences (such as Dark/Light theme mode).</p>
              <p><strong>3. Third-Party Services:</strong> Standard privacy guidelines apply when interacting with third-party advertisement networks.</p>
            </div>
          </div>
        )}

        {activeModal === 'terms' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-blue-600 dark:text-blue-500">
              <FileText className="w-7 h-7" />
              <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Terms & Conditions</h2>
            </div>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              By accessing and using SEO Tube AI, you agree to comply with the following terms:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <li>SEO Tube AI is provided "as is" for content optimization and educational purposes.</li>
              <li>You agree not to use this service for generating harmful, illegal, or deceptive content violating YouTube Community Guidelines.</li>
              <li>Automated scraping or spamming API requests is strictly prohibited.</li>
            </ul>
          </div>
        )}

        {activeModal === 'disclaimer' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-amber-500">
              <AlertTriangle className="w-7 h-7" />
              <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Disclaimer</h2>
            </div>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              SEO Tube AI is an independent web tool designed to assist content creators with YouTube metadata generation. SEO Tube AI is not affiliated with, endorsed by, or sponsored by YouTube or Google LLC.
            </p>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              While our AI generates titles and descriptions optimized for high Click-Through Rate (CTR) and search discoverability, actual video reach and subscriber growth depend on video quality, audience retention, and overall viewer engagement.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
