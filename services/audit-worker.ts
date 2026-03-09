import { inngest } from "./queue";
import { supabaseAdmin } from "@/lib/db";
import { runLighthouseAudit } from "@/lib/lighthouse/runner";
import { generateAIReport } from "./ai-analyzer";

/**
 * Validates and sanitizes URL to prevent SSRF and other attacks.
 */
function sanitizeUrl(url: string): string {
  const parsed = new URL(url);
  
  // Reject non-http/https protocols
  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error(`Invalid protocol: ${parsed.protocol}`);
  }

  const hostname = parsed.hostname.toLowerCase();

  // Reject localhost and internal IP addresses
  const internalPatterns = [
    'localhost',
    '127.0.0.1',
    '0.0.0.0',
    '169.254.169.254', // AWS Metadata
    '10.',
    '172.16.',
    '192.168.'
  ];

  if (internalPatterns.some(p => hostname === p || hostname.startsWith(p))) {
    throw new Error(`Restricted hostname: ${hostname}`);
  }

  return parsed.toString();
}

/**
 * Inngest worker function to process website audits.
 */
export const processAudit = inngest.createFunction(
  { id: "audit-worker", name: "Audit Worker" },
  { event: "audit/requested" },
  async ({ event, step }) => {
    const { auditId, websiteUrl } = event.data;

    console.info(`[${auditId}] Audit process started for: ${websiteUrl}`);

    try {
      // 1. Sanitize the URL
      const sanitizedUrl = sanitizeUrl(websiteUrl);

      // 2. Update status to "processing"
      await step.run("update-status-to-processing", async () => {
        await supabaseAdmin
          .from('audits')
          .update({ status: 'processing' })
          .eq('id', auditId);
      });

      // 3. Execute Lighthouse audit
      const auditResult = await step.run("run-lighthouse-audit", async () => {
        return await runLighthouseAudit(sanitizedUrl);
      });

      // 4. Save audit results to database
      await step.run("save-audit-results", async () => {
        const { error } = await supabaseAdmin
          .from('audit_results')
          .insert({
            audit_id: auditId,
            performance_score: auditResult.performance,
            seo_score: auditResult.seo,
            accessibility_score: auditResult.accessibility,
            ux_score: auditResult.bestPractices, // Mapping best practices to UX score for now
            mobile_score: auditResult.seo, // Mock mobile score for now
            raw_lighthouse_data: auditResult.raw,
          });

        if (error) throw error;
      });

      // 5. Run AI analysis
      await step.run("run-ai-analysis", async () => {
        await generateAIReport(auditId);
      });

      // 6. Update audit status to "completed"
      await step.run("update-status-to-completed", async () => {
        await supabaseAdmin
          .from('audits')
          .update({ status: 'completed' })
          .eq('id', auditId);
      });

      console.info(`[${auditId}] Audit process completed successfully.`);

    } catch (error: any) {
      console.error(`[${auditId}] Audit Error:`, error);

      // Update audit status to "failed"
      await step.run("update-status-to-failed", async () => {
        await supabaseAdmin
          .from('audits')
          .update({ status: 'failed' })
          .eq('id', auditId);
      });

      throw error; // Re-throw error for Inngest retries
    }
  }
);
