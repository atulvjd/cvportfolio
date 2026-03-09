import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Sends a notification email to the user when their website audit is complete.
 */
export async function sendAuditCompletionEmail(email: string, websiteUrl: string, auditId: string) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not defined. Email skipped.');
    return;
  }

  const reportUrl = `${process.env.NEXT_PUBLIC_APP_URL}/report/${auditId}`;

  try {
    const { data, error } = await resend.emails.send({
      from: 'WebsiteScope <notifications@yourdomain.com>',
      to: email,
      subject: `Your Website Audit for ${websiteUrl} is ready!`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #f1f5f9; border-radius: 12px; padding: 40px;">
          <h1 style="color: #0f172a; font-size: 24px; font-weight: bold; margin-bottom: 20px;">Your Website Audit is Complete!</h1>
          <p style="color: #475569; font-size: 16px; line-height: 1.6;">Great news! We've finished analyzing <strong>${websiteUrl}</strong>. Your professional report with AI insights and actionable fixes is now ready to view.</p>
          
          <div style="margin: 40px 0; text-align: center;">
            <a href="${reportUrl}" style="background-color: #2563eb; color: #ffffff; padding: 16px 32px; border-radius: 8px; font-weight: bold; text-decoration: none; display: inline-block;">View Full Report</a>
          </div>

          <p style="color: #94a3b8; font-size: 14px; margin-top: 40px; border-top: 1px solid #f1f5f9; pt: 20px;">
            Thank you for using WebsiteScope.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
    } else {
      console.info(`Audit completion email sent to: ${email}`);
    }
  } catch (err) {
    console.error('Failed to send email:', err);
  }
}
