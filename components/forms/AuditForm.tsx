'use client';

import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Globe, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  website_url: z.string().min(1, { message: "Please enter a website URL." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
})

export default function AuditForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      website_url: "",
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          website_url: values.website_url,
          email: values.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      router.push(`/report/${data.auditId}`);
    } catch (error) {
      console.error('Audit Error:', error);
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="flex flex-col gap-4 p-8 bg-white rounded-2xl shadow-2xl shadow-blue-500/10 border border-slate-100"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <FormField
              control={form.control}
              name="website_url"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <FormControl>
                      <Input
                        placeholder="https://yourwebsite.com"
                        className="pl-10 h-12 text-lg border-slate-200 focus:ring-blue-500 rounded-xl"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        className="pl-10 h-12 text-lg border-slate-200 focus:ring-blue-500 rounded-xl"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="h-14 text-xl font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                Analyzing your website...
              </>
            ) : (
              'Analyze My Website'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
