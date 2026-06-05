import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import client from '../../api/client';

export default function AdminDashboardScreen() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.get('/analytics/dashboard')
      .then(res => setMetrics(res.data.totals))
      .catch(err => console.log('Analytics err', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>System Overview</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>30-Day Metrics</Text>
        
        {loading ? (
          <ActivityIndicator size="large" color="#1F8AD0" />
        ) : (
          <View style={styles.grid}>
            <View style={styles.card}>
              <Text style={styles.cardLabel}>New Users</Text>
              <Text style={styles.cardValue}>{metrics?.newUsers || 0}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardLabel}>Bookings</Text>
              <Text style={styles.cardValue}>{metrics?.completedBookings || 0}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardLabel}>Revenue</Text>
              <Text style={styles.cardValue}>${metrics?.revenue || 0}</Text>
            </View>
          </View>
        )}
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
    backgroundColor: '#1F8AD0',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '700',
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  card: {
    backgroundColor: '#FFF',
    width: '45%',
    flexGrow: 1,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center'
  },
  cardLabel: {
    color: '#64748B',
    fontSize: 14,
    marginBottom: 8,
  },
  cardValue: {
    color: '#0F1E2A',
    fontSize: 24,
    fontWeight: '700',
  }
});
