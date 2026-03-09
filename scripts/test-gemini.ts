import { generateAIReport } from "@/services/ai-analyzer";

/**
 * Script to test Gemini AI Analysis integration.
 * Usage: npm run test-gemini <audit_id>
 */
async function main() {
  const auditId = process.argv[2];

  if (!auditId) {
    console.error("Please provide an existing audit ID from your database: npm run test-gemini <audit_id>");
    process.exit(1);
  }

  console.info(`Testing Gemini AI Analysis for Audit ID: ${auditId}`);

  try {
    const report = await generateAIReport(auditId);
    console.info("Gemini AI Analysis successful!");
    console.info(JSON.stringify(report, null, 2));
  } catch (error) {
    console.error("Gemini AI Analysis failed:", error);
  }
}

main();
