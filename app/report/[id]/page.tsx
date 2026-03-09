import React from 'react';
import { supabaseAdmin } from "@/lib/db";
import { OverallScore } from "@/components/report/overall-score";
import { ScoreCard } from "@/components/report/score-card";
import { PerformanceMetrics } from "@/components/report/performance-metrics";
import { AISection } from "@/components/report/ai-section";
import { QuickFixes } from "@/components/report/quick-fixes";
import { TechnicalFixes } from "@/components/report/technical-fixes";
import { DownloadButton } from "@/components/report/download-button";
import { 
  Zap, 
  Search, 
  Accessibility, 
  Smartphone, 
  Globe, 
  Calendar, 
  ArrowLeft,
  LayoutDashboard,
  ShieldCheck,
  AlertCircle,
  Loader2,
  Clock,
  FileText
} from 'lucide-react';
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// Generate dynamic metadata
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params;
  const { data: audit } = await supabaseAdmin
    .from('audits')
    .select('website_url')
    .eq('id', id)
    .single();

  return {
    title: `Audit Report: ${audit?.website_url || 'WebsiteScope'}`,
    description: `Detailed AI-powered website audit and analysis for ${audit?.website_url}.`,
  };
}

export default async function ReportPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // Fetch audit and results
  const { data: audit, error } = await supabaseAdmin
    .from('audits')
    .select(`
      *,
      audit_results (
        performance_score,
        seo_score,
        accessibility_score,
        ux_score,
        mobile_score,
        ai_report,
        raw_lighthouse_data,
        created_at
      )
    `)
    .eq('id', id)
    .single();

  if (error || !audit) {
    notFound();
  }

  const status = audit.status;
  const results = audit.audit_results?.[0];
  const aiReport = results?.ai_report;
  const lighthouse = results?.raw_lighthouse_data;

  // Loading states are handled by Next.js loading.tsx or inline checks if we want simpler
  if (status === 'pending' || status === 'processing') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 space-y-8 text-white">
         <div className="relative">
            <div className="absolute inset-0 bg-blue-600/20 blur-3xl animate-pulse"></div>
            <Loader2 className="w-16 h-16 text-blue-500 animate-spin relative z-10" />
         </div>
         <div className="text-center space-y-4 max-w-md relative z-10">
            <h1 className="text-3xl font-black tracking-tighter">Analyzing your website...</h1>
            <p className="text-slate-400 font-medium">Our AI is currently auditing your website for performance, SEO, and accessibility. This usually takes 30-60 seconds.</p>
         </div>
         <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-500">
            <span className={status === 'pending' ? 'text-blue-500' : 'text-green-500'}>1. Queued</span>
            <span className="text-slate-800">→</span>
            <span className={status === 'processing' ? 'text-blue-500 animate-pulse' : 'text-slate-800'}>2. Auditing</span>
            <span className="text-slate-800">→</span>
            <span className="text-slate-800">3. AI Analysis</span>
         </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 space-y-8 text-white">
         <AlertCircle className="w-20 h-20 text-red-500" />
         <div className="text-center space-y-4 max-w-md">
            <h1 className="text-3xl font-black tracking-tighter text-red-500">Audit Failed</h1>
            <p className="text-slate-400 font-medium">We encountered an error while analyzing your website. This could be due to a slow connection or the website blocking our crawlers.</p>
            <Link href="/" className="inline-block px-8 py-3 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl font-bold transition-all mt-4">
              Try Again
            </Link>
         </div>
      </div>
    );
  }

  // Calculate Overall Score
  const overallScore = Math.round(
    ((results?.performance_score || 0) + 
     (results?.seo_score || 0) + 
     (results?.accessibility_score || 0) + 
     (results?.ux_score || 0)) / 4
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
      {/* Header / Nav */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-900 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="p-2 hover:bg-slate-900 rounded-lg transition-colors text-slate-400 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-sm">W</div>
              <Separator orientation="vertical" className="h-6 bg-slate-800" />
              <div className="space-y-0.5">
                <h1 className="text-sm font-black tracking-tight text-white">{audit.website_url}</h1>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
                   <Calendar className="w-3 h-3" /> {new Date(results.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge className="bg-green-500/10 text-green-500 border-none font-black px-3 py-1 text-[10px] uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3" /> Verified Audit
            </Badge>
            <DownloadButton auditId={id} className="hidden md:flex bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all text-xs" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Top Summary Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-1">
             <OverallScore score={overallScore} />
          </div>
          <div className="lg:col-span-2">
             <Card className="bg-slate-900/40 border-slate-900 p-8">
                <CardContent className="p-0 space-y-6">
                   <div className="flex items-center gap-2 text-blue-500">
                      <div className="w-6 h-6 bg-blue-500/10 rounded flex items-center justify-center text-[10px] font-black uppercase">AI</div>
                      <span className="text-xs font-black uppercase tracking-widest">Executive Summary</span>
                   </div>
                   <p className="text-xl font-bold leading-relaxed text-slate-200 italic tracking-tight">
                     "{aiReport?.summary || 'Generating summary...'}"
                   </p>
                </CardContent>
             </Card>
          </div>
        </section>

        {/* Score Cards Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ScoreCard 
            label="Performance" 
            score={results.performance_score} 
            icon={<Zap className="w-5 h-5 text-yellow-500" />}
            description="Measures load speed, responsiveness, and visual stability."
          />
          <ScoreCard 
            label="SEO" 
            score={results.seo_score} 
            icon={<Search className="w-5 h-5 text-blue-500" />}
            description="Search engine visibility and structured data quality."
          />
          <ScoreCard 
            label="Accessibility" 
            score={results.accessibility_score} 
            icon={<Accessibility className="w-5 h-5 text-green-500" />}
            description="Barrier-free access for all users, including assistive tech."
          />
          <ScoreCard 
            label="Mobile / UX" 
            score={results.ux_score} 
            icon={<Smartphone className="w-5 h-5 text-purple-500" />}
            description="Touch targets, viewport optimization, and layout usability."
          />
        </section>

        {/* Tabs Detailed Content */}
        <section className="space-y-12">
          <Tabs defaultValue="overview" className="space-y-12">
            <TabsList className="bg-slate-900 border-slate-800 h-14 p-1 rounded-xl">
              <TabsTrigger value="overview" className="rounded-lg font-bold text-xs uppercase tracking-widest px-8 data-[state=active]:bg-slate-800">Overview</TabsTrigger>
              <TabsTrigger value="performance" className="rounded-lg font-bold text-xs uppercase tracking-widest px-8 data-[state=active]:bg-slate-800">Performance</TabsTrigger>
              <TabsTrigger value="seo" className="rounded-lg font-bold text-xs uppercase tracking-widest px-8 data-[state=active]:bg-slate-800">SEO</TabsTrigger>
              <TabsTrigger value="accessibility" className="rounded-lg font-bold text-xs uppercase tracking-widest px-8 data-[state=active]:bg-slate-800">Accessibility</TabsTrigger>
              <TabsTrigger value="ux" className="rounded-lg font-bold text-xs uppercase tracking-widest px-8 data-[state=active]:bg-slate-800">UX / Mobile</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-12 outline-none">
              <QuickFixes fixes={aiReport?.quick_fixes || []} />
              <TechnicalFixes fixes={aiReport?.technical_fixes || []} />
            </TabsContent>

            <TabsContent value="performance" className="space-y-12 outline-none">
              <PerformanceMetrics 
                metrics={{
                  fcp: results.raw_lighthouse_data?.audits?.['first-contentful-paint']?.numericValue || 0,
                  lcp: results.raw_lighthouse_data?.audits?.['largest-contentful-paint']?.numericValue || 0,
                  tbt: results.raw_lighthouse_data?.audits?.['total-blocking-time']?.numericValue || 0,
                  cls: results.raw_lighthouse_data?.audits?.['cumulative-layout-shift']?.numericValue || 0,
                }} 
                scores={{
                  performance: results.performance_score,
                  seo: results.seo_score,
                  accessibility: results.accessibility_score,
                  ux: results.ux_score
                }}
              />
              <AISection 
                title="Performance Analysis"
                issues={aiReport?.performance?.issues || []}
                recommendations={aiReport?.performance?.recommendations || []}
                icon={<Zap className="w-5 h-5" />}
              />
            </TabsContent>

            <TabsContent value="seo" className="outline-none">
              <AISection 
                title="SEO Strategy"
                issues={aiReport?.seo?.issues || []}
                recommendations={aiReport?.seo?.recommendations || []}
                icon={<Search className="w-5 h-5" />}
              />
            </TabsContent>

            <TabsContent value="accessibility" className="outline-none">
              <AISection 
                title="Accessibility Audit"
                issues={aiReport?.accessibility?.issues || []}
                recommendations={aiReport?.accessibility?.recommendations || []}
                icon={<Accessibility className="w-5 h-5" />}
              />
            </TabsContent>

            <TabsContent value="ux" className="space-y-12 outline-none">
               <AISection 
                title="UX Improvements"
                issues={aiReport?.ux?.suggestions || []}
                recommendations={aiReport?.ux?.suggestions.map((s: any) => `Implement: ${s}`) || []}
                icon={<LayoutDashboard className="w-5 h-5" />}
              />
              <AISection 
                title="Mobile Optimization"
                issues={aiReport?.mobile?.issues || []}
                recommendations={aiReport?.mobile?.recommendations || []}
                icon={<Smartphone className="w-5 h-5" />}
              />
            </TabsContent>
          </Tabs>
        </section>

        {/* Footer Info */}
        <section className="pt-12 border-t border-slate-900 text-center space-y-4">
           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-700">Audit Powered by WebsiteScope AI & Google Lighthouse</p>
        </section>
      </main>
    </div>
  );
}
