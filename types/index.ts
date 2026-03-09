export interface Audit {
  id: string;
  user_id: string;
  website_url: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: string;
  results?: AuditResult;
}

export interface AuditResult {
  id: string;
  audit_id: string;
  performance_score: number;
  seo_score: number;
  accessibility_score: number;
  ux_score: number;
  mobile_score: number;
  ai_report: AIReport;
  raw_lighthouse_data: any;
  created_at: string;
}

export interface AIReport {
  executive_summary: string;
  seo_analysis: {
    score: number;
    issues: string[];
    recommendations: string[];
  };
  performance_analysis: {
    score: number;
    load_time: string;
    suggestions: string[];
  };
  accessibility_analysis: {
    score: number;
    issues: string[];
  };
  ux_analysis: {
    score: number;
    improvements: string[];
  };
  mobile_optimization: {
    score: number;
    issues: string[];
  };
  overall_score: number;
  actionable_fixes: string[];
}
