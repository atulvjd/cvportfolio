import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "website-scope" });

// Event types for TypeScript safety
export type Events = {
  "audit/requested": {
    data: {
      auditId: string;
      websiteUrl: string;
    };
  };
};
