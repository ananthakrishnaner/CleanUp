import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function CleanerDashboardScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cleaner Dashboard</Text>
        <Text style={styles.subtitle}>You have 2 pending requests</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Jobs</Text>
        
        <View style={styles.jobCard}>
          <View style={styles.jobHeader}>
            <Text style={styles.jobService}>Deep Cleaning</Text>
            <Text style={styles.jobStatus}>Pending</Text>
          </View>
          <Text style={styles.jobTime}>Today, 2:00 PM</Text>
          <Text style={styles.jobAddress}>123 Main St, Apt 4B</Text>
          
          <View style={styles.actionRow}>
            <TouchableOpacity style={[styles.actionButton, styles.rejectBtn]}>
              <Text style={styles.rejectText}>Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.acceptBtn]}>
              <Text style={styles.acceptText}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FBFD',
  },
  header: {
    padding: 24,
    paddingTop: 48,
    backgroundColor: '#5CD0B3',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    marginTop: 4,
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F1E2A',
    marginBottom: 16,
  },
  jobCard: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  jobService: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F1E2A',
  },
  jobStatus: {
    backgroundColor: '#FEF08A',
    color: '#854D0E',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '600',
    overflow: 'hidden'
  },
  jobTime: {
    color: '#334155',
    marginBottom: 4,
  },
  jobAddress: {
    color: '#64748B',
    marginBottom: 16,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  rejectBtn: {
    backgroundColor: '#FEE2E2',
  },
  rejectText: {
    color: '#E5484D',
    fontWeight: '600',
  },
  acceptBtn: {
    backgroundColor: '#2BA3EC',
  },
  acceptText: {
    color: '#FFF',
    fontWeight: '600',
  }
});
