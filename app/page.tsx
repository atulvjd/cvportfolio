import React from 'react';
import AuditForm from '@/components/forms/AuditForm';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Zap, Search, Accessibility, Smartphone } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative flex flex-col lg:flex-row items-center justify-between min-h-[85vh] px-6 lg:px-24 py-12 gap-16 overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent"></div>
      
      {/* Left side: Text and explanation */}
      <div className="flex-1 space-y-8 max-w-2xl text-left">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full font-semibold text-sm animate-in fade-in slide-in-from-top-4 duration-700">
          <Zap className="w-4 h-4" /> Powered by GPT-4 and Google Lighthouse
        </div>
        
        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Free AI <span className="text-blue-600">Website Audit</span>
        </h1>
        
        <p className="text-xl text-slate-600 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          Analyze your website’s SEO, performance, accessibility, and user experience in seconds. 
          Get a professional report for your agency and your clients.
        </p>

        <div className="pt-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
          <AuditForm />
        </div>

        <div className="flex flex-wrap gap-6 pt-8 animate-in fade-in delay-500">
          <div className="flex items-center gap-2 text-slate-500 font-medium">
            <CheckCircle className="w-5 h-5 text-green-500" /> SEO Analysis
          </div>
          <div className="flex items-center gap-2 text-slate-500 font-medium">
            <CheckCircle className="w-5 h-5 text-green-500" /> Speed Tests
          </div>
          <div className="flex items-center gap-2 text-slate-500 font-medium">
            <CheckCircle className="w-5 h-5 text-green-500" /> Accessibility
          </div>
        </div>
      </div>

      {/* Right side: Visual card showing example audit scores */}
      <div className="flex-1 w-full max-w-xl animate-in fade-in zoom-in duration-1000 delay-200">
        <Card className="border-slate-100 shadow-2xl shadow-blue-500/10 rounded-3xl overflow-hidden bg-slate-50/50 backdrop-blur-sm">
          <CardContent className="p-8 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-lg">Example Audit: mysite.com</h3>
              <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider">
                Healthy
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center gap-2">
                <div className="text-3xl font-black text-green-500">98</div>
                <div className="text-xs font-bold text-slate-400 uppercase">Performance</div>
                <Zap className="w-4 h-4 text-yellow-400" />
              </div>
              <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center gap-2">
                <div className="text-3xl font-black text-blue-500">92</div>
                <div className="text-xs font-bold text-slate-400 uppercase">SEO</div>
                <Search className="w-4 h-4 text-blue-400" />
              </div>
              <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center gap-2">
                <div className="text-3xl font-black text-purple-500">88</div>
                <div className="text-xs font-bold text-slate-400 uppercase">UX Design</div>
                <Accessibility className="w-4 h-4 text-purple-400" />
              </div>
              <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center gap-2">
                <div className="text-3xl font-black text-pink-500">95</div>
                <div className="text-xs font-bold text-slate-400 uppercase">Mobile</div>
                <Smartphone className="w-4 h-4 text-pink-400" />
              </div>
            </div>

            <div className="space-y-4 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <p className="text-sm font-medium text-slate-700">AI: Optimize your images for 12% faster loading.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <p className="text-sm font-medium text-slate-700">AI: Adding alt tags to 3 images will boost SEO.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation (Sticky) */}
      <nav className="sticky top-0 z-50 w-full px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">W</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">WebsiteScope</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-600 hover:text-blue-600 transition-colors">Features</a>
            <a href="#how-it-works" className="text-slate-600 hover:text-blue-600 transition-colors">How It Works</a>
            <button className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all">
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Hero />

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold text-slate-900">How It Works</h2>
            <p className="max-w-2xl mx-auto text-lg text-slate-600">
              Get a comprehensive audit of your website in just three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: '01', title: 'Enter Your URL', desc: 'Enter the website URL and your email address.' },
              { step: '02', title: 'AI Analysis', desc: 'Lighthouse runs performance checks while GPT-4 analyzes the data.' },
              { step: '03', title: 'Get Your Report', desc: 'View your detailed report in the dashboard and download as PDF.' },
            ].map((item, index) => (
              <div key={index} className="relative p-10 bg-white rounded-3xl border border-slate-100 shadow-sm transition-transform hover:-translate-y-2">
                <div className="absolute top-0 right-0 p-4 text-6xl font-black text-blue-100">{item.step}</div>
                <div className="space-y-4 text-left">
                  <h3 className="text-2xl font-bold text-slate-900">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <span className="text-xl font-bold text-slate-900">WebsiteScope</span>
          </div>
          <p className="text-slate-400">© 2026 WebsiteScope. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors text-sm">Terms of Service</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
