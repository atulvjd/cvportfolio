# WebsiteScope Deployment Guide

WebsiteScope is an AI-powered website audit tool designed for agencies to generate leads. This guide outlines the steps to deploy the application to Vercel.

## 🚀 Deployment Steps

### 1. Supabase Setup
- Create a new project in [Supabase](https://supabase.com).
- Run the SQL in `database/schema.sql` within the Supabase SQL Editor.
- Go to **Storage** and create a public bucket named `audit-reports`.
- Enable **Magic Link** authentication in **Authentication > Providers > Email**.

### 2. Inngest Setup
- Create a free account at [Inngest.com](https://www.inngest.com/).
- Get your `INNGEST_EVENT_KEY` and `INNGEST_SIGNING_KEY`.
- Connect your Vercel deployment to Inngest via the [Inngest Cloud Dashboard](https://app.inngest.com).

### 3. Vercel Configuration
1. Push your code to a GitHub repository.
2. Connect the repository to Vercel.
3. Configure the following environment variables:

#### App & Next.js
- `NEXT_PUBLIC_APP_URL`: Your production URL (e.g., `https://your-app.vercel.app`)

#### Supabase
- `NEXT_PUBLIC_SUPABASE_URL`: From Supabase API settings.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: From Supabase API settings.
- `SUPABASE_SERVICE_ROLE_KEY`: From Supabase API settings (Required for admin/server-side operations).

#### OpenAI
- `OPENAI_API_KEY`: Your OpenAI API key for AI-driven analysis.

#### Resend
- `RESEND_API_KEY`: For sending audit completion email notifications.

#### Inngest
- `INNGEST_EVENT_KEY`: From Inngest.
- `INNGEST_SIGNING_KEY`: From Inngest.

#### Rate Limiting (Optional - Upstash Redis)
- `UPSTASH_REDIS_REST_URL`: For API rate limiting.
- `UPSTASH_REDIS_REST_TOKEN`: For API rate limiting.

### 4. Deploy
- Click **Deploy** on Vercel.
- Once deployed, Inngest will automatically discover your functions via the `/api/inngest` endpoint.

---

## 🛠️ Operational Commands

### Local Development
```bash
npm install
npm run dev
# Run in another terminal for background jobs
npx inngest-cli dev
```

### Production Build
```bash
npm run build
```

---

## 📋 QA Checklist
- [ ] Submit a URL/Email from the landing page.
- [ ] Verify audit record is created in Supabase `audits` and `leads` tables.
- [ ] Monitor Inngest dashboard for successful `audit-worker` execution.
- [ ] Verify AI report is generated and stored in `audit_results`.
- [ ] Confirm receipt of the "Audit Ready" email via Resend.
- [ ] View the live report at `/report/[id]`.
- [ ] Download the PDF and verify its content.
