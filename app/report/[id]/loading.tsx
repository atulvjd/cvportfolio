import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 space-y-8 text-white">
       <div className="relative">
          <div className="absolute inset-0 bg-blue-600/20 blur-3xl animate-pulse"></div>
          <Loader2 className="w-16 h-16 text-blue-500 animate-spin relative z-10" />
       </div>
       <div className="text-center space-y-4 max-w-md relative z-10">
          <h1 className="text-3xl font-black tracking-tighter">Loading Report...</h1>
          <p className="text-slate-400 font-medium">Preparing your website audit data and AI analysis.</p>
       </div>
    </div>
  );
}
