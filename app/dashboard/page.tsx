'use client';

import React from 'react';
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

const Dashboard = () => {
  // Mock data for initial UI
  const recentAudits = [
    { id: '1', url: 'https://example.com', score: 85, status: 'completed', date: 'Mar 9, 2026' },
    { id: '2', url: 'https://myshopify.com', score: 42, status: 'failed', date: 'Mar 8, 2026' },
    { id: '3', url: 'https://marketing-pro.io', score: null, status: 'processing', date: 'Mar 9, 2026' },
  ];

  const stats = [
    { label: 'Total Audits', value: '12', icon: <History className="w-5 h-5 text-blue-600" /> },
    { label: 'Completed', value: '9', icon: <CheckCircle className="w-5 h-5 text-green-600" /> },
    { label: 'Avg. Score', value: '72', icon: <LayoutDashboard className="w-5 h-5 text-purple-600" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col p-6 space-y-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">W</span>
          </div>
          <span className="text-xl font-bold">WebsiteScope</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 p-3 bg-blue-50 text-blue-600 rounded-lg font-medium">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/dashboard/history" className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
            <History className="w-5 h-5" /> History
          </Link>
          <Link href="/dashboard/settings" className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
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
            <p className="text-slate-500">Welcome back, agency partner.</p>
          </div>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/"><PlusCircle className="mr-2 h-5 w-5" /> New Audit</Link>
          </Button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, i) => (
            <Card key={i} className="border-none shadow-sm">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-3 bg-slate-50 rounded-xl">{stat.icon}</div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Audits Table */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Recent Audits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-4 font-semibold text-slate-600">Website URL</th>
                    <th className="pb-4 font-semibold text-slate-600">Date</th>
                    <th className="pb-4 font-semibold text-slate-600">Status</th>
                    <th className="pb-4 font-semibold text-slate-600">Score</th>
                    <th className="pb-4 font-semibold text-slate-600">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentAudits.map((audit) => (
                    <tr key={audit.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="py-4 font-medium text-slate-900">{audit.url}</td>
                      <td className="py-4 text-slate-500">{audit.date}</td>
                      <td className="py-4">
                        {audit.status === 'completed' && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium">
                            <CheckCircle className="w-3 h-3" /> Completed
                          </span>
                        )}
                        {audit.status === 'processing' && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium animate-pulse">
                            <Clock className="w-3 h-3" /> Processing
                          </span>
                        )}
                        {audit.status === 'failed' && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm font-medium">
                            <AlertCircle className="w-3 h-3" /> Failed
                          </span>
                        )}
                      </td>
                      <td className="py-4">
                        {audit.score ? (
                          <span className={`font-bold text-lg ${audit.score >= 80 ? 'text-green-600' : audit.score >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {audit.score}
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="py-4">
                        {audit.status === 'completed' ? (
                          <Link href={`/report/${audit.id}`} className="text-blue-600 hover:underline font-medium">
                            View Report
                          </Link>
                        ) : (
                          <span className="text-slate-400">Unavailable</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
