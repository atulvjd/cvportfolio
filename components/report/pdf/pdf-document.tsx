import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { PDFCover } from './pdf-cover';
import { PDFScores } from './pdf-scores';
import { PDFSection } from './pdf-section';

const styles = StyleSheet.create({
  page: {
    padding: 60,
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  logo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  url: {
    fontSize: 10,
    color: '#64748b',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 60,
    right: 60,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 8,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export const AuditPDFDocument = ({ audit, results }: { audit: any; results: any }) => {
  const overallScore = Math.round(
    ((results.performance_score || 0) + 
     (results.seo_score || 0) + 
     (results.accessibility_score || 0) + 
     (results.ux_score || 0)) / 4
  );

  const ai = results.ai_report;
  const date = new Date(results.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Document>
      <PDFCover url={audit.website_url} date={date} score={overallScore} />

      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.logo}>WebsiteScope</Text>
          <Text style={styles.url}>{audit.website_url}</Text>
        </View>

        <PDFScores 
          scores={{
            performance: results.performance_score,
            seo: results.seo_score,
            accessibility: results.accessibility_score,
            mobile: results.ux_score
          }} 
        />

        <PDFSection 
          subtitle="Executive Summary"
          title="Overall Health Assessment"
          content={ai?.summary}
          type="summary"
        />

        <PDFSection 
          subtitle="Quick Fixes"
          title="High Impact Improvements"
          list={ai?.quick_fixes}
          type="recommendations"
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>WebsiteScope AI Audit</Text>
          <Text style={styles.footerText} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.logo}>WebsiteScope</Text>
          <Text style={styles.url}>{audit.website_url}</Text>
        </View>

        <PDFSection 
          subtitle="SEO Analysis"
          title="Search Engine Optimization"
          list={ai?.seo?.issues}
          type="issues"
        />

        <PDFSection 
          subtitle="Expert SEO Recommendations"
          title="Boosting Visibility"
          list={ai?.seo?.recommendations}
          type="recommendations"
        />

        <PDFSection 
          subtitle="Performance Insights"
          title="Load Speed & Performance"
          list={ai?.performance?.issues}
          type="issues"
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>WebsiteScope AI Audit</Text>
          <Text style={styles.footerText} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.logo}>WebsiteScope</Text>
          <Text style={styles.url}>{audit.website_url}</Text>
        </View>

        <PDFSection 
          subtitle="Technical Fixes"
          title="Advanced Optimizations"
          list={ai?.technical_fixes}
          type="recommendations"
        />

        <PDFSection 
          subtitle="User Experience"
          title="UX & Usability"
          list={ai?.ux?.suggestions}
          type="recommendations"
        />

        <PDFSection 
          subtitle="Mobile Optimization"
          title="Mobile First Performance"
          list={ai?.mobile?.issues}
          type="issues"
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>WebsiteScope AI Audit</Text>
          <Text style={styles.footerText} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
};
