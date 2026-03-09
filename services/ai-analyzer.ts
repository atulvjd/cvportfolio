import OpenAI from 'openai';
import { AUDIT_ANALYSIS_PROMPT } from '@/lib/ai/prompts';
import { supabase } from '@/lib/db';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateAIAnalysis(auditId: string, lighthouseData: any) {
  try {
    const prompt = AUDIT_ANALYSIS_PROMPT.replace(
      '{lighthouse_data}',
      JSON.stringify(lighthouseData).slice(0, 10000) // Truncate to avoid token limits
    );

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'system', content: prompt }],
      response_format: { type: 'json_object' },
    });

    const aiAnalysis = JSON.parse(completion.choices[0].message.content || '{}');

    // Update audit results in Supabase
    await supabase
      .from('audit_results')
      .update({ ai_report: aiAnalysis })
      .eq('audit_id', auditId);

    // Update audit status to completed
    await supabase
      .from('audits')
      .update({ status: 'completed' })
      .eq('id', auditId);

    return aiAnalysis;
  } catch (error) {
    console.error('AI Analysis Error:', error);
    await supabase
      .from('audits')
      .update({ status: 'failed' })
      .eq('id', auditId);
    throw error;
  }
}
