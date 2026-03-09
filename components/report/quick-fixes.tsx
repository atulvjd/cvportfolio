import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap } from 'lucide-react';

interface QuickFixesProps {
  fixes: string[];
}

export function QuickFixes({ fixes }: QuickFixesProps) {
  return (
    <Card className="bg-slate-900 border-yellow-500/20 shadow-2xl shadow-yellow-500/5 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 text-yellow-500/5 -mr-4 -mt-4 transition-transform group-hover:scale-110">
        <Zap className="w-24 h-24" />
      </div>
      <CardHeader className="p-8 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-xl">
            <Zap className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl font-black text-slate-100 tracking-tighter">⚡ Quick Wins</CardTitle>
            <p className="text-sm text-slate-500 font-medium tracking-tight">Immediate improvements with high impact.</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fixes.map((fix, i) => (
          <div key={i} className="group p-6 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-yellow-500/20 rounded-2xl transition-all">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-yellow-500/10 text-yellow-500 border-none font-black px-2 py-0.5 text-[10px] uppercase tracking-wider">High ROI</Badge>
            </div>
            <p className="text-sm text-slate-300 font-bold leading-relaxed">{fix}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
