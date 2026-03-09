import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  section: {
    marginBottom: 30,
    padding: 30,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  title: {
    fontSize: 16,
    fontWeight: 'black',
    color: '#0f172a',
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#3b82f6',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },
  content: {
    fontSize: 11,
    lineHeight: 1.6,
    color: '#334155',
  },
  list: {
    marginTop: 10,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  bullet: {
    width: 15,
    fontSize: 12,
    color: '#2563eb',
  },
  itemText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.5,
    color: '#475569',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export const PDFSection = ({ title, subtitle, content, list, type }: { title: string; subtitle: string; content?: string; list?: string[]; type: 'issues' | 'recommendations' | 'summary' }) => (
  <View style={styles.section} wrap={false}>
    <Text style={styles.subtitle}>{subtitle}</Text>
    <Text style={styles.title}>{title}</Text>
    
    {content && <Text style={styles.content}>{content}</Text>}
    
    {list && (
      <View style={styles.list}>
        {list.map((item, i) => (
          <View key={i} style={styles.listItem}>
            <Text style={styles.bullet}>{type === 'issues' ? '•' : '✓'}</Text>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        ))}
      </View>
    )}
  </View>
);
