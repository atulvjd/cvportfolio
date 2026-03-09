import React from 'react';
import { Search, Zap, Accessibility, UserCheck, Smartphone, Target } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Search className="w-12 h-12 text-blue-600 mb-6 group-hover:scale-110 transition-transform" />,
      title: 'SEO Analysis',
      desc: 'Get a deep dive into your search engine optimization, keywords, and metadata.',
    },
    {
      icon: <Zap className="w-12 h-12 text-yellow-500 mb-6 group-hover:scale-110 transition-transform" />,
      title: 'Performance Metrics',
      desc: 'Understand how fast your website loads and what is holding it back.',
    },
    {
      icon: <Accessibility className="w-12 h-12 text-green-500 mb-6 group-hover:scale-110 transition-transform" />,
      title: 'Accessibility Issues',
      desc: 'Identify barriers that prevent users from accessing your content.',
    },
    {
      icon: <UserCheck className="w-12 h-12 text-purple-500 mb-6 group-hover:scale-110 transition-transform" />,
      title: 'UX Suggestions',
      desc: 'Get AI-driven recommendations to improve your user experience and conversion.',
    },
    {
      icon: <Smartphone className="w-12 h-12 text-pink-500 mb-6 group-hover:scale-110 transition-transform" />,
      title: 'Mobile Optimization',
      desc: 'See how your website performs on different mobile devices and screens.',
    },
    {
      icon: <Target className="w-12 h-12 text-red-500 mb-6 group-hover:scale-110 transition-transform" />,
      title: 'Overall Score (0-100)',
      desc: 'A single, easy-to-understand score that measures your website's health.',
    },
  ];

  return (
    <section id="features" className="py-24 px-6 bg-white border-y border-slate-50">
      <div className="max-w-7xl mx-auto text-center space-y-20">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
            Powerful Features for Modern Agencies
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-slate-500 leading-relaxed">
            Stop guessing. Our AI-driven audit gives you clear, data-backed insights to win more clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-10 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 transform hover:-translate-y-2"
            >
              {feature.icon}
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
