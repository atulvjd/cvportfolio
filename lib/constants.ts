export const APP_NAME = 'WebsiteScope';
export const APP_DESCRIPTION = 'AI-powered Website Audit Tool for agencies.';

export const AUDIT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  REPORT: (id: string) => `/report/${id}`,
  LOGIN: '/login',
};
