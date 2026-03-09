import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

// Client for client-side (public)
export const supabase = createClient(supabaseUrl, supabaseKey);

// Client for server-side (admin/service role)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function createUserIfNotExists(email: string) {
  const { data: user, error } = await supabaseAdmin
    .from('users')
    .upsert({ email }, { onConflict: 'email' })
    .select()
    .single();

  if (error) throw error;
  return user;
}

export async function createAudit(userId: string, websiteUrl: string) {
  const { data: audit, error } = await supabaseAdmin
    .from('audits')
    .insert({
      user_id: userId,
      website_url: websiteUrl,
      status: 'pending',
    })
    .select()
    .single();

  if (error) throw error;
  return audit;
}

export async function getAuditStatus(auditId: string) {
  const { data: audit, error } = await supabaseAdmin
    .from('audits')
    .select('status, website_url, audit_results(performance_score, seo_score, accessibility_score, ux_score, mobile_score, ai_report)')
    .eq('id', auditId)
    .single();

  if (error) throw error;
  return audit;
}