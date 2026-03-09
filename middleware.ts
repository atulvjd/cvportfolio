import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Note: Upstash Redis requires these env variables:
// UPSTASH_REDIS_REST_URL
// UPSTASH_REDIS_REST_TOKEN

let ratelimit: Ratelimit | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '1 h'), // 5 audits per hour
    analytics: true,
  });
}

export async function middleware(request: NextRequest) {
  // Only apply to the audit API
  if (request.nextUrl.pathname.startsWith('/api/audit')) {
    if (!ratelimit) {
      console.warn('Upstash Redis credentials not found. Rate limiting disabled.');
      return NextResponse.next();
    }

    const ip = request.ip ?? '127.0.0.1';
    const { success, limit, remaining, reset } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        { 
          error: 'Too many requests. Please try again later.',
          limit,
          remaining,
          reset 
        }, 
        { status: 429 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/audit',
};
