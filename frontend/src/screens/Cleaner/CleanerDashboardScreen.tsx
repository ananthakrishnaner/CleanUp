import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Typography } from '../../components/Typography';
import { colors, spacing, radius } from '../../theme';

const { width } = Dimensions.get('window');

export default function CleanerDashboardScreen() {
  const [availability, setAvailability] = useState('offline');
  const [activeTab, setActiveTab] = useState('jobs');

  const jobs = [
    {
      id: 1,
      service: 'Deep Cleaning',
      date: 'Today',
      time: '2:00 PM',
      address: '123 Main St, Apt 4B',
      status: 'pending',
      client: 'Anu K.',
      price: 1500,
    },
    {
      id: 2,
      service: 'Kitchen Cleaning',
      date: 'Tomorrow',
      time: '10:00 AM',
      address: '456 Oak Ave, Unit 2',
      status: 'pending',
      client: 'Ramesh P.',
      price: 800,
    },
  ];

  const earnings = {
    today: 2300,
    week: 12500,
    month: 48000,
  };

  const toggleAvailability = () => {
    setAvailability(availability === 'online' ? 'offline' : 'online');
  };

  const handleJobAction = (jobId: number, action: 'accept' | 'reject') => {
    // Handle accept or reject action
    console.log(`${action} job ${jobId}`);
  };

  return (
    <View style={styles.container}>
      {/* Header with Availability Toggle */}
      <View style={styles.header}>
        <View style={styles.greetingContainer}>
          <Typography variant="heading.lg" color={colors.neutral[0]}>
            Good morning,
          </Typography>
          <Typography variant="heading.xl" color={colors.neutral[0]}>
            Ramesh
          </Typography>
        </View>
        <View style={styles.availabilityContainer}>
          <Button
            variant={availability === 'online' ? 'success' : 'danger'}
            onPress={toggleAvailability}
            style={styles.availabilityButton}
          >
            {availability === 'online' ? 'Available' : 'Offline'}
          </Button>
        </View>
      </View>

      {/* Earnings Summary */}
      <View style={styles.earningsContainer}>
        <Card elevation="md" style={styles.earningsCard}>
          <View style={styles.earningsContent}>
            <View style={styles.earningItem}>
              <Typography variant="label.md" color={colors.neutral[700]}>
                Today
              </Typography>
              <Typography variant="heading.md" color={colors.primary[500]}>
                ₹{earnings.today}
              </Typography>
            </View>
            <View style={styles.earningItem}>
              <Typography variant="label.md" color={colors.neutral[700]}>
                This Week
              </Typography>
              <Typography variant="heading.md" color={colors.primary[500]}>
                ₹{earnings.week}
              </Typography>
            </View>
            <View style={styles.earningItem}>
              <Typography variant="label.md" color={colors.neutral[700]}>
                This Month
              </Typography>
              <Typography variant="heading.md" color={colors.primary[500]}>
                ₹{earnings.month}
              </Typography>
            </View>
          </View>
        </Card>
      </View>

      {/* Tabs for Jobs and Schedule */}
      <View style={styles.tabsContainer}>
        <Button
          variant={activeTab === 'jobs' ? 'primary' : 'ghost'}
          onPress={() => setActiveTab('jobs')}
          style={styles.tabButton}
        >
          Jobs
        </Button>
        <Button
          variant={activeTab === 'schedule' ? 'primary' : 'ghost'}
          onPress={() => setActiveTab('schedule')}
          style={styles.tabButton}
        >
          Schedule
        </Button>
      </View>

      {/* Jobs List */}
      {activeTab === 'jobs' && (
        <ScrollView style={styles.jobsContainer}>
          {jobs.map((job) => (
            <Card key={job.id} elevation="sm" style={styles.jobCard}>
              <View style={styles.jobContent}>
                <View style={styles.jobHeader}>
                  <Typography variant="body.md" color={colors.neutral[900]}>
                    {job.service}
                  </Typography>
                  <View style={styles.statusBadge}>
                    <Typography variant="caption" color={colors.neutral[0]}>
                      {job.status}
                    </Typography>
                  </View>
                </View>
                <View style={styles.jobDetails}>
                  <Typography variant="caption" color={colors.neutral[700]}>
                    {job.date}, {job.time}
                  </Typography>
                  <Typography variant="caption" color={colors.neutral[600]}>
                    {job.address}
                  </Typography>
                  <Typography variant="caption" color={colors.neutral[700]}>
                    Client: {job.client}
                  </Typography>
                </View>
                <View style={styles.jobFooter}>
                  <Typography variant="body.lg" color={colors.primary[500]}>
                    ₹{job.price}
                  </Typography>
                  <View style={styles.actionButtons}>
                    <Button
                      variant="danger"
                      size="sm"
                      onPress={() => handleJobAction(job.id, 'reject')}
                      style={styles.actionButton}
                    >
                      Reject
                    </Button>
                    <Button
                      variant="success"
                      size="sm"
                      onPress={() => handleJobAction(job.id, 'accept')}
                      style={styles.actionButton}
                    >
                      Accept
                    </Button>
                  </View>
                </View>
              </View>
            </Card>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[0],
  },
  header: {
    backgroundColor: colors.primary[500],
    padding: spacing[6],
    paddingTop: spacing[12],
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greetingContainer: {
    flex: 1,
  },
  availabilityContainer: {
    marginLeft: spacing[4],
  },
  availabilityButton: {
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[2],
  },
  earningsContainer: {
    marginHorizontal: spacing[6],
    marginTop: -spacing[8],
    zIndex: 10,
  },
  earningsCard: {
    backgroundColor: colors.neutral[0],
    padding: spacing[5],
  },
  earningsContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  earningItem: {
    alignItems: 'center',
    padding: spacing[2],
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: spacing[6],
    marginTop: spacing[6],
    marginBottom: spacing[4],
    backgroundColor: colors.neutral[50],
    borderRadius: radius.lg,
    padding: spacing[1],
  },
  tabButton: {
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[3],
  },
  jobsContainer: {
    flex: 1,
    marginHorizontal: spacing[6],
    marginTop: spacing[4],
  },
  jobCard: {
    marginBottom: spacing[4],
    padding: spacing[5],
  },
  jobContent: {
    gap: spacing[4],
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    backgroundColor: colors.warn[500],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: radius.full,
  },
  jobDetails: {
    gap: spacing[1],
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing[2],
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing[2],
  },
  actionButton: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
  },
});