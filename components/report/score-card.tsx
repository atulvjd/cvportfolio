import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ScoreCardProps {
  label: string;
  score: number;
  description: string;
  icon?: React.ReactNode;
}

export function ScoreCard({ label, score, description, icon }: ScoreCardProps) {
  const getScoreColorClass = (s: number) => {
    if (s >= 90) return 'text-green-500 bg-green-500/10 border-green-500/20';
    if (s >= 70) return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
    return 'text-red-500 bg-red-500/10 border-red-500/20';
  };

  const getStatus = (s: number) => {
    if (s >= 90) return 'Healthy';
    if (s >= 70) return 'Needs Work';
    return 'Critical';
  };

  return (
    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm overflow-hidden group hover:border-slate-700 transition-all">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="p-3 rounded-xl bg-slate-800 group-hover:bg-slate-700 transition-colors">
            {icon}
          </div>
          <Badge className={cn("px-2 py-0.5 text-[10px] font-black uppercase tracking-wider", getScoreColorClass(score))}>
            {getStatus(score)}
          </Badge>
        </div>
        
        <div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">{label}</h3>
          <div className="flex items-baseline gap-1">
            <span className={cn("text-4xl font-black tracking-tighter", getScoreColorClass(score).split(' ')[0])}>
              {score}
            </span>
            <span className="text-slate-500 font-bold text-sm">/100</span>
          </div>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed font-medium">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
