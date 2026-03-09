export function generateAuditPrompt(
  website_url: string,
  performance_score: number,
  seo_score: number,
  accessibility_score: number,
  metrics: any,
  failing_audits: string[]
) {
  return `
You are an expert website optimization specialist and SEO analyst. 
Analyze the provided Lighthouse data for the website: ${website_url} and generate a detailed, actionable, and human-readable audit report for a non-technical business owner.

### Core Metrics:
- Performance Score: ${performance_score}/100
- SEO Score: ${seo_score}/100
- Accessibility Score: ${accessibility_score}/100

### Key Web Vitals:
- First Contentful Paint: ${metrics.fcp}ms
- Largest Contentful Paint: ${metrics.lcp}ms
- Total Blocking Time: ${metrics.tbt}ms
- Cumulative Layout Shift: ${metrics.cls}

### Failing Technical Audits:
${failing_audits.join('\n')}

### Requirements:
1.  **Executive Summary**: A concise, non-technical overview of the website's status.
2.  **SEO Analysis**: Identify 2-3 key problems and provide recommended fixes.
3.  **Performance Analysis**: Explain load speed and suggest 2-3 improvements.
4.  **Accessibility**: Mention issues like missing alt tags, contrast, or navigation.
5.  **User Experience (UX)**: Provide 2-3 specific suggestions to improve conversion or usability.
6.  **Mobile Optimization**: Identify mobile-specific issues and recommendations.
7.  **Quick Wins**: List 3-4 easy-to-implement improvements that offer immediate value.
8.  **Technical Fixes**: List 2-3 more advanced improvements.
9.  **Overall Score Explanation**: A brief explanation of why the website received its current scores.

Return the analysis in the following JSON format ONLY:

{
  "summary": "...",
  "seo": {
    "issues": ["Issue 1", "Issue 2"],
    "recommendations": ["Rec 1", "Rec 2"]
  },
  "performance": {
    "issues": ["Issue 1", "Issue 2"],
    "recommendations": ["Rec 1", "Rec 2"]
  },
  "accessibility": {
    "issues": ["Issue 1", "Issue 2"],
    "recommendations": ["Rec 1", "Rec 2"]
  },
  "ux": {
    "suggestions": ["Suggestion 1", "Suggestion 2"]
  },
  "mobile": {
    "issues": ["Issue 1", "Issue 2"],
    "recommendations": ["Rec 1", "Rec 2"]
  },
  "quick_fixes": ["Fix 1", "Fix 2"],
  "technical_fixes": ["Fix 1", "Fix 2"],
  "overall_score_explanation": "..."
}

Keep the tone professional yet accessible. Focus on actionable insights that will help the business owner grow their online presence.
`;
}
