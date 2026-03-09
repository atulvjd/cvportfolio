import { inngest } from "@/services/queue";

async function main() {
  const auditId = process.argv[2] || "test-id-" + Math.random().toString(36).substring(2, 8);
  const websiteUrl = process.argv[3] || "https://example.com";

  console.info(`Triggering manual audit for ID: ${auditId}, URL: ${websiteUrl}`);

  try {
    await inngest.send({
      name: "audit/requested",
      data: {
        auditId: auditId,
        websiteUrl: websiteUrl,
      },
    });
    console.info("Event sent successfully!");
  } catch (error) {
    console.error("Error sending event:", error);
  }
}

main();
