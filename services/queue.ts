import { Inngest } from "inngest";

// Define event types for TypeScript safety
export type Events = {
  "audit/requested": {
    data: {
      auditId: string;
      websiteUrl: string;
    };
  };
  "audit/ai_analysis": {
    data: {
      auditId: string;
      lighthouseData: any;
    };
  };
};

// Create a client to send and receive events
export const inngest = new Inngest({ 
  id: "website-scope",
  schemas: (new Inngest.Schema()).setEvents<Events>()
});
