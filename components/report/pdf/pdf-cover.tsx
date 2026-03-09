import React from 'react';
import { Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

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
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  title: {
    fontSize: 42,
    fontWeight: 'black',
    color: '#0f172a',
    marginTop: 100,
    marginBottom: 10,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 18,
    color: '#64748b',
    marginBottom: 60,
  },
  infoContainer: {
    marginTop: 40,
    paddingTop: 40,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: '#1e293b',
    marginBottom: 20,
    fontWeight: 'medium',
  },
  scoreContainer: {
    position: 'absolute',
    bottom: 60,
    right: 60,
    alignItems: 'center',
  },
  overallScoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overallScoreText: {
    fontSize: 48,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  overallScoreLabel: {
    fontSize: 10,
    color: '#2563eb',
    fontWeight: 'bold',
    marginTop: 10,
    textTransform: 'uppercase',
  },
});

export const PDFCover = ({ url, date, score }: { url: string; date: string; score: number }) => (
  <Page size="A4" style={styles.page}>
    <View style={styles.header}>
      <Text style={styles.logo}>WebsiteScope</Text>
      <Text style={{ fontSize: 10, color: '#94a3b8' }}>Professional Audit Report</Text>
    </View>

    <Text style={styles.title}>Website Audit Report</Text>
    <Text style={styles.subtitle}>Comprehensive AI-powered analysis for better performance, SEO, and user experience.</Text>

    <View style={styles.infoContainer}>
      <View>
        <Text style={styles.infoLabel}>Website Analyzed</Text>
        <Text style={styles.infoValue}>{url}</Text>
      </View>
      <View>
        <Text style={styles.infoLabel}>Audit Completion Date</Text>
        <Text style={styles.infoValue}>{date}</Text>
      </View>
      <View>
        <Text style={styles.infoLabel}>Report Engine</Text>
        <Text style={styles.infoValue}>WebsiteScope AI + Google Lighthouse</Text>
      </View>
    </View>

    <View style={styles.scoreContainer}>
      <View style={styles.overallScoreCircle}>
        <Text style={styles.overallScoreText}>{score}</Text>
      </View>
      <Text style={styles.overallScoreLabel}>Overall Health Score</Text>
    </View>
  </Page>
);
