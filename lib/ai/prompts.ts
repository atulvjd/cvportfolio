export const AUDIT_ANALYSIS_PROMPT = `
You are an expert website optimization specialist and SEO analyst. 
Analyze the provided Lighthouse JSON data and generate a detailed, actionable, and human-readable audit report.

Lighthouse Data:
{lighthouse_data}

Return the analysis in the following JSON format ONLY:

{
  "executive_summary": "A concise overview of the website's status.",
  "seo_analysis": {
    "score": 0,
    "issues": ["Issue 1", "Issue 2"],
    "recommendations": ["Recommendation 1", "Recommendation 2"]
  },
  "performance_analysis": {
    "score": 0,
    "load_time": "Time in ms",
    "suggestions": ["Suggestion 1", "Suggestion 2"]
  },
  "accessibility_analysis": {
    "score": 0,
    "issues": ["Issue 1", "Issue 2"]
  },
  "ux_analysis": {
    "score": 0,
    "improvements": ["Improvement 1", "Improvement 2"]
  },
  "mobile_optimization": {
    "score": 0,
    "issues": ["Issue 1", "Issue 2"]
  },
  "overall_score": 0,
  "actionable_fixes": ["Fix 1", "Fix 2"]
}

The report should be professional and written for an agency to present to their clients.
`;
