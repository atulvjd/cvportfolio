import lighthouse from 'lighthouse';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium-min';

// Types for Lighthouse result
export interface LighthouseResult {
  performance: number;
  seo: number;
  accessibility: number;
  bestPractices: number;
  fcp: number;
  lcp: number;
  tbt: number;
  cls: number;
  raw: any;
}

/**
 * Runs a Lighthouse audit on a given URL using a headless browser.
 * Optimized for Vercel Serverless environment.
 */
export async function runLighthouseAudit(url: string): Promise<LighthouseResult> {
  let browser;

  try {
    // Determine the executable path for Chromium (Local vs Vercel)
    const executablePath = process.env.CHROMIUM_PATH || await chromium.executablePath();

    // Launch headless browser using Puppeteer
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    const options = {
      logLevel: 'info',
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      port: new URL(browser.wsEndpoint()).port,
    };

    // Lighthouse logic requires a numeric port. 
    // Extracting it from the browser websocket endpoint.
    const browserPort = parseInt(new URL(browser.wsEndpoint()).port);
    
    // Execute Lighthouse audit
    const result = await lighthouse(url, {
      port: browserPort,
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    });

    if (!result) {
      throw new Error('Lighthouse audit failed to return a result.');
    }

    const lhr = result.lhr;

    // Helper to get score in 0-100 range
    const getScore = (cat: string) => Math.round((lhr.categories[cat]?.score || 0) * 100);

    // Extract core metrics
    const metrics: LighthouseResult = {
      performance: getScore('performance'),
      seo: getScore('seo'),
      accessibility: getScore('accessibility'),
      bestPractices: getScore('best-practices'),
      fcp: lhr.audits['first-contentful-paint']?.numericValue || 0,
      lcp: lhr.audits['largest-contentful-paint']?.numericValue || 0,
      tbt: lhr.audits['total-blocking-time']?.numericValue || 0,
      cls: lhr.audits['cumulative-layout-shift']?.numericValue || 0,
      raw: lhr,
    };

    return metrics;

  } catch (error) {
    console.error('Lighthouse Runner Error:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
