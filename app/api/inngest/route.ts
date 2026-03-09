import { serve } from "inngest/next";
import { inngest } from "@/services/queue";
import { processAudit } from "@/services/audit-worker";

// Create the Inngest serve handler
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    processAudit, // Register the audit worker function
  ],
});
