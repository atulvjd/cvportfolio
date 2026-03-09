import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    marginBottom: 40,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  card: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 4,
  },
  scoreLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#64748b',
    textTransform: 'uppercase',
  },
  scoreDesc: {
    fontSize: 9,
    color: '#94a3b8',
    marginTop: 8,
    lineHeight: 1.4,
  },
});

export const PDFScores = ({ scores }: { scores: any }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Audit Pillar Scores</Text>
    <View style={styles.grid}>
      <View style={styles.card}>
        <Text style={styles.scoreValue}>{scores.performance}</Text>
        <Text style={styles.scoreLabel}>Performance</Text>
        <Text style={styles.scoreDesc}>Measures load speed, responsiveness, and visual stability.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.scoreValue}>{scores.seo}</Text>
        <Text style={styles.scoreLabel}>SEO</Text>
        <Text style={styles.scoreDesc}>Search engine visibility and structured data quality.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.scoreValue}>{scores.accessibility}</Text>
        <Text style={styles.scoreLabel}>Accessibility</Text>
        <Text style={styles.scoreDesc}>Barrier-free access for all users, including assistive tech.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.scoreValue}>{scores.mobile}</Text>
        <Text style={styles.scoreLabel}>Mobile / UX</Text>
        <Text style={styles.scoreDesc}>Touch targets, viewport optimization, and layout usability.</Text>
      </View>
    </View>
  </View>
);
