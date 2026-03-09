import React from 'react';
import AuditForm from '@/components/forms/AuditForm';

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[80vh] px-4 text-center overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent"></div>
      
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Get a Free <span className="text-blue-600">AI Website Audit</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-xl text-slate-600 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          Analyze your website’s SEO, performance, accessibility, and UX in seconds. 
          Get actionable insights powered by GPT-4.
        </p>

        <div className="mt-10 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
          <AuditForm />
        </div>

        <p className="text-sm text-slate-400">
          Trusted by agencies and marketing teams worldwide.
        </p>
      </div>
    </section>
  );
};

export default Hero;
