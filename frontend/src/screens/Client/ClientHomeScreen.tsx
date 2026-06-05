import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function ClientHomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good morning,</Text>
        <Text style={styles.title}>Ready for a clean home?</Text>
      </View>

      <View style={styles.servicesGrid}>
        <TouchableOpacity style={styles.serviceCard}>
          <Text style={styles.serviceIcon}>🏠</Text>
          <Text style={styles.serviceTitle}>Deep Cleaning</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.serviceCard}>
          <Text style={styles.serviceIcon}>🛋️</Text>
          <Text style={styles.serviceTitle}>Sofa Cleaning</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.serviceCard}>
          <Text style={styles.serviceIcon}>✨</Text>
          <Text style={styles.serviceTitle}>Standard Clean</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.serviceCard}>
          <Text style={styles.serviceIcon}>🚽</Text>
          <Text style={styles.serviceTitle}>Bathroom Clean</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Bookings</Text>
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No recent bookings found.</Text>
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
    backgroundColor: '#2BA3EC',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  greeting: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
  },
  title: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '700',
    marginTop: 4,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 16,
    marginTop: -24,
  },
  serviceCard: {
    backgroundColor: '#FFF',
    width: '45%',
    flexGrow: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  serviceIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  serviceTitle: {
    color: '#0F1E2A',
    fontWeight: '600',
    fontSize: 16,
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
  emptyState: {
    backgroundColor: '#FFF',
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
  },
  emptyStateText: {
    color: '#64748B',
  }
});
