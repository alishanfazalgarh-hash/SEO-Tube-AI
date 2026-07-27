export interface SeoResult {
  title: string;
  description: string;
  hashtags: string[];
  languageDetected?: string;
  generatedAt?: string;
}

export interface HistoryItem {
  id: string;
  topic: string;
  result: SeoResult;
  timestamp: string;
}

export type GenerationMode = 'all' | 'title' | 'description' | 'hashtags';

export interface GenerateRequest {
  topic: string;
  mode?: GenerationMode;
  currentTitle?: string;
  currentDescription?: string;
  currentHashtags?: string[];
}

export interface GenerateResponse {
  success: boolean;
  data?: SeoResult;
  error?: string;
}

export interface AdPlacementProps {
  id: string;
  type: '320x50' | '300x250' | 'native' | 'social-bar' | 'popunder' | 'smart-link';
  className?: string;
  label?: string;
}
