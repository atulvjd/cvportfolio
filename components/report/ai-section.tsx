import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Lightbulb } from 'lucide-react';
import { cn } from "@/lib/utils";

interface AISectionProps {
  title: string;
  issues: string[];
  recommendations: string[];
  icon?: React.ReactNode;
  className?: string;
}

export function AISection({ title, issues, recommendations, icon, className }: AISectionProps) {
  return (
    <Card className={cn("bg-slate-900/50 border-slate-800", className)}>
      <CardHeader className="flex flex-row items-center gap-4 border-b border-slate-800 pb-4">
        <div className="p-3 rounded-xl bg-blue-600/10 text-blue-500 border border-blue-500/20">
          {icon || <Lightbulb className="w-5 h-5" />}
        </div>
        <CardTitle className="text-xl font-extrabold text-slate-100 tracking-tight">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-red-500/30 bg-red-500/10 text-red-500 px-3 py-1 font-black uppercase tracking-widest text-[10px]">
              Critical Issues
            </Badge>
          </div>
          <ul className="space-y-4">
            {issues.map((issue, i) => (
              <li key={i} className="flex gap-4 group">
                <AlertCircle className="w-5 h-5 text-red-500/60 mt-0.5 shrink-0 group-hover:text-red-500 transition-colors" />
                <p className="text-sm text-slate-400 font-medium leading-relaxed group-hover:text-slate-300 transition-colors">
                  {issue}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-green-500/30 bg-green-500/10 text-green-500 px-3 py-1 font-black uppercase tracking-widest text-[10px]">
              Expert Recommendations
            </Badge>
          </div>
          <ul className="space-y-4">
            {recommendations.map((rec, i) => (
              <li key={i} className="flex gap-4 group">
                <CheckCircle2 className="w-5 h-5 text-green-500/60 mt-0.5 shrink-0 group-hover:text-green-500 transition-colors" />
                <p className="text-sm text-slate-400 font-medium leading-relaxed group-hover:text-slate-300 transition-colors">
                  {rec}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
