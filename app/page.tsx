import Hero from '@/components/marketing/Hero';
import Features from '@/components/marketing/Features';

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

      {/* Features Section */}
      <Features />

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
