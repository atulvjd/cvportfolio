import { NextResponse } from 'next/server';
import { createUserIfNotExists, createAudit } from '@/lib/db';
import { inngest } from '@/services/queue';
import * as z from 'zod';

const auditSchema = z.object({
  website_url: z.string().url(),
  email: z.string().email(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // 1. Validate input using Zod
    const { website_url, email } = auditSchema.parse(body);

    // 2. Normalize URL (Basic)
    let normalizedUrl = website_url;
    if (!normalizedUrl.startsWith('http')) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    // 3 & 4. Check if user exists, if not create
    const user = await createUserIfNotExists(email);

    // 5. Insert audit record into audits table
    const audit = await createAudit(user.id, normalizedUrl);

    // 6. Trigger background job via Inngest
    await inngest.send({
      name: 'audit/requested',
      data: { 
        auditId: audit.id, 
        websiteUrl: normalizedUrl 
      },
    });

    // 7. Return the audit_id
    return NextResponse.json({ 
      auditId: audit.id 
    });

  } catch (error: any) {
    console.error('API Audit Error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input data', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
