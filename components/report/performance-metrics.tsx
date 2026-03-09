'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface PerformanceMetricsProps {
  metrics: {
    fcp: number;
    lcp: number;
    tbt: number;
    cls: number;
  };
}

export function PerformanceMetrics({ metrics }: PerformanceMetricsProps) {
  const getStatusColor = (value: number, type: 'fcp' | 'lcp' | 'tbt' | 'cls') => {
    const thresholds = {
      fcp: { good: 1800, needsWork: 3000 },
      lcp: { good: 2500, needsWork: 4000 },
      tbt: { good: 200, needsWork: 600 },
      cls: { good: 0.1, needsWork: 0.25 },
    };

    const threshold = thresholds[type];
    if (value <= threshold.good) return 'text-green-500';
    if (value <= threshold.needsWork) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getMetricProgress = (value: number, max: number) => {
    return Math.min((value / max) * 100, 100);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <MetricItem
        label="First Contentful Paint"
        value={`${(metrics.fcp / 1000).toFixed(2)}s`}
        progress={getMetricProgress(metrics.fcp, 3000)}
        color={getStatusColor(metrics.fcp, 'fcp')}
        desc="Marks the time when the first text or image is painted."
      />
      <MetricItem
        label="Largest Contentful Paint"
        value={`${(metrics.lcp / 1000).toFixed(2)}s`}
        progress={getMetricProgress(metrics.lcp, 4000)}
        color={getStatusColor(metrics.lcp, 'lcp')}
        desc="Measures loading performance. It marks the time when the main content has likely loaded."
      />
      <MetricItem
        label="Total Blocking Time"
        value={`${metrics.tbt}ms`}
        progress={getMetricProgress(metrics.tbt, 600)}
        color={getStatusColor(metrics.tbt, 'tbt')}
        desc="Sum of all time periods between FCP and TTI where task length exceeded 50ms."
      />
      <MetricItem
        label="Cumulative Layout Shift"
        value={metrics.cls.toFixed(3)}
        progress={getMetricProgress(metrics.cls, 0.25)}
        color={getStatusColor(metrics.cls, 'cls')}
        desc="Measures visual stability by quantifying how much elements shift on the page."
      />
    </div>
  );
}

function MetricItem({ label, value, progress, color, desc }: any) {
  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-baseline">
          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">{label}</h4>
          <span className={cn("text-2xl font-black tabular-nums tracking-tighter", color)}>{value}</span>
        </div>
        <div className="space-y-2">
          <Progress value={progress} className="h-1 bg-slate-800" />
          <p className="text-xs text-slate-500 leading-relaxed font-medium">{desc}</p>
        </div>
      </CardContent>
    </Card>
  );
}
