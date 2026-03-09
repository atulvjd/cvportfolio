import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import { inngest } from '@/services/queue'; // Assuming we setup inngest

export async function POST(req: Request) {
  try {
    const { url, email } = await req.json();

    if (!url || !email) {
      return NextResponse.json({ error: 'URL and Email are required' }, { status: 400 });
    }

    // 1. Create or get user
    const { data: user, error: userError } = await supabase
      .from('users')
      .upsert({ email }, { onConflict: 'email' })
      .select()
      .single();

    if (userError) throw userError;

    // 2. Create audit record
    const { data: audit, error: auditError } = await supabase
      .from('audits')
      .insert({
        user_id: user.id,
        website_url: url,
        status: 'pending',
      })
      .select()
      .single();

    if (auditError) throw auditError;

    // 3. Trigger background audit process via Inngest
    // await inngest.send({
    //   name: 'audit/started',
    //   data: { auditId: audit.id, url: url },
    // });

    return NextResponse.json({ 
      message: 'Audit started successfully', 
      auditId: audit.id 
    });

  } catch (error: any) {
    console.error('API Audit Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
