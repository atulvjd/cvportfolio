import { supabaseAdmin } from "@/lib/db";
import openai from "@/lib/ai/openai-client";
import { generateAuditPrompt } from "@/lib/ai/prompts";

/**
 * Extracts key metrics and failing audits from raw Lighthouse data to optimize tokens.
 */
function extractLighthouseKeyInfo(lhr: any) {
  const metrics = {
    fcp: Math.round(lhr.audits['first-contentful-paint']?.numericValue || 0),
    lcp: Math.round(lhr.audits['largest-contentful-paint']?.numericValue || 0),
    tbt: Math.round(lhr.audits['total-blocking-time']?.numericValue || 0),
    cls: lhr.audits['cumulative-layout-shift']?.numericValue.toFixed(2) || 0,
  };

  const failing_audits = Object.values(lhr.audits)
    .filter((audit: any) => audit.score !== null && audit.score < 0.9)
    .slice(0, 10) // Limit to top 10 to keep within context window
    .map((audit: any) => `- ${audit.title}: ${audit.description}`);

  return { metrics, failing_audits };
}

/**
 * Generates an AI-driven audit report from raw Lighthouse data.
 */
export async function generateAIReport(auditId: string) {
  console.info(`[${auditId}] Starting AI Analysis...`);

  try {
    // 1. Fetch audit result from database
    const { data: auditResult, error: fetchError } = await supabaseAdmin
      .from('audit_results')
      .select('*, audits(website_url)')
      .eq('audit_id', auditId)
      .single();

    if (fetchError || !auditResult) {
      throw new Error(`Failed to fetch audit result for AI Analysis: ${fetchError?.message}`);
    }

    const website_url = auditResult.audits.website_url;
    const lhr = auditResult.raw_lighthouse_data;

    // 2. Extract key info for the prompt
    const { metrics, failing_audits } = extractLighthouseKeyInfo(lhr);

    // 3. Build AI Prompt
    const prompt = generateAuditPrompt(
      website_url,
      auditResult.performance_score,
      auditResult.seo_score,
      auditResult.accessibility_score,
      metrics,
      failing_audits
    );

    // 4. Send to OpenAI with retries
    let aiReport;
    let attempts = 0;
    const maxAttempts = 2;

    while (attempts <= maxAttempts) {
      try {
        const completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [{ role: 'system', content: prompt }],
          temperature: 0.4,
          response_format: { type: 'json_object' },
        });

        const content = completion.choices[0].message.content;
        if (!content) throw new Error('OpenAI returned empty response.');
        
        aiReport = JSON.parse(content);
        break; // Success!
      } catch (err) {
        attempts++;
        console.error(`[${auditId}] OpenAI Error (Attempt ${attempts}):`, err);
        if (attempts > maxAttempts) throw err;
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait before retry
      }
    }

    // 5. Store AI report in database
    const { error: updateError } = await supabaseAdmin
      .from('audit_results')
      .update({ ai_report: aiReport })
      .eq('audit_id', auditId);

    if (updateError) throw updateError;

    console.info(`[${auditId}] AI Analysis completed successfully.`);
    return aiReport;

  } catch (error: any) {
    console.error(`[${auditId}] AI Analysis Error:`, error);
    
    // Store error state in ai_report field for frontend feedback
    await supabaseAdmin
      .from('audit_results')
      .update({ ai_report: { error: 'Failed to generate AI report after multiple attempts.' } })
      .eq('audit_id', auditId);
      
    throw error;
  }
}
