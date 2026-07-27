import React from 'react';
import { Sparkles } from 'lucide-react';

export const SkeletonCards: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-pulse">
      
      <div className="text-center py-2 flex items-center justify-center gap-2 text-sm font-semibold text-emerald-400">
        <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
        AI is crafting viral YouTube SEO titles, description & hashtags...
      </div>

      {/* Card 1 Skeleton - Title */}
      <div className="p-6 rounded-3xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-4 w-28 bg-white/10 rounded-md"></div>
          <div className="h-6 w-16 bg-white/10 rounded-full"></div>
        </div>
        <div className="h-8 w-5/6 bg-white/15 rounded-lg"></div>
        <div className="flex justify-end gap-2 pt-2">
          <div className="h-9 w-20 bg-white/10 rounded-xl"></div>
          <div className="h-9 w-24 bg-white/10 rounded-xl"></div>
        </div>
      </div>

      {/* Card 2 Skeleton - Description */}
      <div className="p-6 rounded-3xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-4 w-36 bg-white/10 rounded-md"></div>
          <div className="h-6 w-20 bg-white/10 rounded-full"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-white/15 rounded"></div>
          <div className="h-4 w-11/12 bg-white/10 rounded"></div>
          <div className="h-4 w-4/5 bg-white/10 rounded"></div>
          <div className="h-4 w-full bg-white/10 rounded"></div>
          <div className="h-4 w-3/4 bg-white/10 rounded"></div>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <div className="h-9 w-20 bg-white/10 rounded-xl"></div>
          <div className="h-9 w-24 bg-white/10 rounded-xl"></div>
        </div>
      </div>

      {/* Card 3 Skeleton - Hashtags */}
      <div className="p-6 rounded-3xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-4 w-32 bg-white/10 rounded-md"></div>
          <div className="h-6 w-24 bg-white/10 rounded-full"></div>
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="h-7 w-20 bg-white/10 rounded-full"></div>
          ))}
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <div className="h-9 w-20 bg-white/10 rounded-xl"></div>
          <div className="h-9 w-24 bg-white/10 rounded-xl"></div>
        </div>
      </div>

    </div>
  );
};
