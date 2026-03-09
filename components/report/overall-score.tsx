import React from 'react';
import { cn } from "@/lib/utils";

interface OverallScoreProps {
  score: number;
  className?: string;
}

export function OverallScore({ score, className }: OverallScoreProps) {
  const getScoreColor = (s: number) => {
    if (s >= 90) return 'text-green-500 stroke-green-500';
    if (s >= 70) return 'text-yellow-500 stroke-yellow-500';
    return 'text-red-500 stroke-red-500';
  };

  const circumference = 2 * Math.PI * 45; // Radius is 45
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div className="relative w-48 h-48">
        <svg className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle
            className="text-slate-800 stroke-current"
            strokeWidth="10"
            fill="transparent"
            r="45"
            cx="96"
            cy="96"
          />
          {/* Score circle */}
          <circle
            className={cn(getScoreColor(score), "transition-all duration-1000 ease-out")}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            r="45"
            cx="96"
            cy="96"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("text-5xl font-black tracking-tighter", getScoreColor(score).split(' ')[0])}>
            {score}
          </span>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Score</span>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm font-medium text-slate-400">
          Your website's overall health score
        </p>
      </div>
    </div>
  );
}
