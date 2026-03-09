import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { supabase } from '@/lib/db';

export async function runLighthouseAudit(url: string, auditId: string) {
  // Update status to processing
  await supabase
    .from('audits')
    .update({ status: 'processing' })
    .eq('id', auditId);

  try {
    const chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox'],
    });

    const options = {
      logLevel: 'info',
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      port: chrome.port,
    };

    const runnerResult = await lighthouse(url, options);

    if (!runnerResult) {
      throw new Error('Lighthouse audit failed to return a result.');
    }

    const reportJson = runnerResult.lhr;

    // TODO: Process raw data and save to DB
    // await saveAuditResults(auditId, reportJson);

    await chrome.kill();
    return reportJson;
  } catch (error) {
    console.error('Lighthouse Audit Error:', error);
    await supabase
      .from('audits')
      .update({ status: 'failed' })
      .eq('id', auditId);
    throw error;
  }
}
