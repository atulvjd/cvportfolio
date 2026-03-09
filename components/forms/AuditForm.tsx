'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Globe, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AuditForm = () => {
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Logic for handling audit submission via API
      // 1. Validate URL and email
      // 2. Call /api/audit/route.ts
      // 3. Navigate to dashboard or report processing page
      
      console.log(`Auditing URL: ${url} for Email: ${email}`);
      
      // Simulating API call
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
      
    } catch (error) {
      console.error('Audit Error:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col gap-4 p-8 bg-white rounded-2xl shadow-2xl shadow-blue-500/10 border border-slate-100"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              type="url"
              placeholder="https://yourwebsite.com"
              required
              className="pl-10 h-12 text-lg border-slate-200 focus:ring-blue-500 rounded-xl"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              type="email"
              placeholder="Enter your email"
              required
              className="pl-10 h-12 text-lg border-slate-200 focus:ring-blue-500 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isLoading}
          className="h-14 text-xl font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              Starting Audit...
            </>
          ) : (
            'Analyze Website Now'
          )}
        </Button>
      </form>
    </div>
  );
};

export default AuditForm;
