'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, AlertCircle, Clock, Zap, Search, Accessibility, Smartphone, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ReportPage() {
  const { id } = useParams();
  const [status, setStatus] = useState<'pending' | 'processing' | 'completed' | 'failed'>('pending');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchStatus = async () => {
      const { data, error } = await supabase
        .from('audits')
        .select('status, website_url, audit_results(*)')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching audit:', error);
        setError('Failed to fetch audit status.');
        return;
      }

      setStatus(data.status);
      setWebsiteUrl(data.website_url);
      if (data.audit_results && data.audit_results.length > 0) {
        setResults(data.audit_results[0]);
      }
    };

    fetchStatus();

    // Set up real-time subscription for status updates
    const subscription = supabase
      .channel(`audit-status-${id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'audits',
          filter: `id=eq.${id}`,
        },
        (payload) => {
          setStatus(payload.new.status);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'audit_results',
          filter: `audit_id=eq.${id}`,
        },
        (payload) => {
          setResults(payload.new);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="max-w-md w-full text-center p-8 space-y-4">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <h1 className="text-2xl font-bold">Error</h1>
          <p className="text-slate-600">{error}</p>
          <Link href="/" className="inline-block text-blue-600 hover:underline">Go back home</Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <Link href="/dashboard" className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">Audit Report</h1>
            <p className="text-slate-500 font-medium">{websiteUrl}</p>
          </div>
          <Badge variant={status === 'completed' ? 'default' : status === 'failed' ? 'destructive' : 'secondary'} className="h-fit py-1.5 px-4 text-sm capitalize">
            {status}
          </Badge>
        </header>

        {status === 'pending' && (
          <Card className="p-12 text-center space-y-6">
            <Clock className="w-16 h-16 text-blue-500 mx-auto animate-pulse" />
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">Your audit has been queued</h2>
              <p className="text-slate-500 max-w-md mx-auto">We are waiting for an available worker to start the analysis. This usually takes less than a minute.</p>
            </div>
            <Progress value={25} className="w-full max-w-md mx-auto h-2" />
          </Card>
        )}

        {status === 'processing' && (
          <Card className="p-12 text-center space-y-6">
            <Loader2 className="w-16 h-16 text-blue-500 mx-auto animate-spin" />
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">Running website analysis</h2>
              <p className="text-slate-500 max-w-md mx-auto">Lighthouse is currently auditing your website for performance, SEO, and accessibility. This may take up to 2 minutes.</p>
            </div>
            <Progress value={65} className="w-full max-w-md mx-auto h-2" />
          </Card>
        )}

        {status === 'failed' && (
          <Card className="p-12 text-center space-y-6 bg-red-50 border-red-100">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-red-900">Audit Failed</h2>
              <p className="text-red-700 max-w-md mx-auto">We encountered an error while analyzing your website. This could be due to a slow connection or the website blocking our crawlers.</p>
            </div>
            <Button asChild variant="outline" className="border-red-200 hover:bg-red-100 text-red-700">
              <Link href="/">Try Again</Link>
            </Button>
          </Card>
        )}

        {status === 'completed' && results && (
          <div className="space-y-8 animate-in fade-in duration-700">
            {/* Summary Score Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Performance', score: results.performance_score, icon: <Zap className="text-yellow-500" /> },
                { label: 'SEO', score: results.seo_score, icon: <Search className="text-blue-500" /> },
                { label: 'Accessibility', score: results.accessibility_score, icon: <Accessibility className="text-green-500" /> },
                { label: 'UX Design', score: results.ux_score, icon: <Smartphone className="text-purple-500" /> },
              ].map((item, i) => (
                <Card key={i} className="text-center p-6 space-y-2 border-none shadow-sm">
                  <div className="flex justify-center mb-2">{item.icon}</div>
                  <div className={`text-4xl font-black ${item.score >= 90 ? 'text-green-500' : item.score >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                    {item.score}
                  </div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.label}</div>
                </Card>
              ))}
            </div>

            {/* AI Report Section */}
            <Card className="border-none shadow-sm overflow-hidden">
              <CardHeader className="bg-slate-900 text-white">
                <CardTitle className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-xs">AI</div>
                  Executive Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-slate-700 leading-relaxed text-lg italic">
                  "{results.ai_report?.executive_summary || 'Analysis complete. AI report being generated...'}"
                </p>
              </CardContent>
            </Card>

            {/* Detail sections could go here */}
            <div className="flex justify-center pt-8">
               <Button className="bg-blue-600 hover:bg-blue-700 h-12 px-8 font-bold">
                 Download Full PDF Report
               </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
