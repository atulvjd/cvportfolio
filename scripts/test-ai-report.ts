import { generateAIReport } from "@/services/ai-analyzer";

async function main() {
  const auditId = process.argv[2];

  if (!auditId) {
    console.error("Please provide an audit ID: npm run test-ai-report <audit_id>");
    process.exit(1);
  }

  console.info(`Testing AI Analysis for Audit ID: ${auditId}`);

  try {
    const report = await generateAIReport(auditId);
    console.info("AI Analysis completed successfully!");
    console.info(JSON.stringify(report, null, 2));
  } catch (error) {
    console.error("Error during AI Analysis test:", error);
  }
}

main();
