'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  History, 
  Settings, 
  PlusCircle, 
  CheckCircle, 
  Clock, 
  AlertCircle 
} from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/db';
import { Badge } from '@/components/ui/badge';

export default function DashboardPage() {
  const [audits, setAudits] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchAudits = async () => {
      // Get the current user email (we might need real auth later)
      // For now, let's fetch all audits as a mock behavior until auth is fixed
      const { data, error } = await supabase
        .from('audits')
        .select(`
          id, 
          website_url, 
          status, 
          created_at,
          audit_results (
            performance_score,
            seo_score,
            accessibility_score,
            ux_score,
            mobile_score
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching audits:', error);
      } else {
        setAudits(data || []);
      }
      setIsLoading(false);
    };

    fetchAudits();
  }, []);

  const getOverallScore = (audit: any) => {
    if (!audit.audit_results || audit.audit_results.length === 0) return null;
    const res = audit.audit_results[0];
    const scores = [res.performance_score, res.seo_score, res.accessibility_score, res.ux_score, res.mobile_score].filter(s => s !== null);
    if (scores.length === 0) return null;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col p-6 space-y-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">W</span>
          </div>
          <span className="text-xl font-bold tracking-tight">WebsiteScope</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 p-3 bg-blue-50 text-blue-600 rounded-lg font-medium">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/dashboard" className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
            <History className="w-5 h-5" /> History
          </Link>
          <Link href="/dashboard" className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
            <Settings className="w-5 h-5" /> Settings
          </Link>
        </nav>
        
        <div className="p-4 bg-slate-900 text-white rounded-xl space-y-4">
          <p className="text-sm opacity-80 font-medium">Upgrade to Pro</p>
          <p className="text-xs opacity-60">Get unlimited audits and AI analysis.</p>
          <Button className="w-full bg-blue-600 hover:bg-blue-700">Upgrade Now</Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-500">Managing all your website audits.</p>
          </div>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/"><PlusCircle className="mr-2 h-5 w-5" /> New Audit</Link>
          </Button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="border-none shadow-sm">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="p-3 bg-blue-50 rounded-xl"><History className="w-5 h-5 text-blue-600" /></div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Total Audits</p>
                <p className="text-2xl font-bold text-slate-900">{audits.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="p-3 bg-green-50 rounded-xl"><CheckCircle className="w-5 h-5 text-green-600" /></div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Completed</p>
                <p className="text-2xl font-bold text-slate-900">{audits.filter(a => a.status === 'completed').length}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="p-3 bg-purple-50 rounded-xl"><LayoutDashboard className="w-5 h-5 text-purple-600" /></div>
              <div>
                <p className="text-sm text-slate-500 font-medium">In Queue</p>
                <p className="text-2xl font-bold text-slate-900">{audits.filter(a => a.status === 'pending' || a.status === 'processing').length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Audits Table */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Recent Audits</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="py-10 text-center text-slate-400">Loading audits...</div>
            ) : audits.length === 0 ? (
              <div className="py-10 text-center text-slate-400">No audits found. Start your first audit now.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      <th className="pb-4">Website URL</th>
                      <th className="pb-4">Date</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4">Score</th>
                      <th className="pb-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {audits.map((audit) => {
                      const score = getOverallScore(audit);
                      return (
                        <tr key={audit.id} className="hover:bg-slate-50 transition-colors group">
                          <td className="py-4 font-semibold text-slate-900">{audit.website_url}</td>
                          <td className="py-4 text-sm text-slate-500">
                            {new Date(audit.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-4">
                            <Badge variant={audit.status === 'completed' ? 'default' : audit.status === 'failed' ? 'destructive' : 'secondary'} className="capitalize">
                              {audit.status}
                            </Badge>
                          </td>
                          <td className="py-4">
                            {score !== null ? (
                              <span className={`font-bold text-lg ${score >= 90 ? 'text-green-500' : score >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                                {score}
                              </span>
                            ) : (
                              <span className="text-slate-300 font-bold">—</span>
                            )}
                          </td>
                          <td className="py-4 text-right">
                            {audit.status === 'completed' ? (
                              <Link href={`/report/${audit.id}`} className="inline-flex items-center gap-1 font-bold text-blue-600 hover:text-blue-700 transition-colors">
                                View Report
                              </Link>
                            ) : (
                              <span className="text-slate-300 font-bold cursor-not-allowed">Wait...</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
