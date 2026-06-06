import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { Typography } from '../../components/Typography';
import { colors, spacing, radius } from '../../theme';

export default function ClientHomeScreen() {
  const [location, setLocation] = useState('Koramangala, Bangalore');
  const [searchQuery, setSearchQuery] = useState('');

  const services = [
    {
      id: 1,
      name: 'Deep Cleaning',
      icon: '🏠',
      description: 'Comprehensive cleaning of all rooms',
      startingPrice: 1500,
      duration: '4-5 hours',
    },
    {
      id: 2,
      name: 'Kitchen Cleaning',
      icon: '🍳',
      description: 'Deep clean kitchen appliances and surfaces',
      startingPrice: 800,
      duration: '2-3 hours',
    },
    {
      id: 3,
      name: 'Sofa Cleaning',
      icon: '🛋️',
      description: 'Professional sofa and upholstery cleaning',
      startingPrice: 600,
      duration: '1-2 hours',
    },
    {
      id: 4,
      name: 'Bathroom Cleaning',
      icon: '🚽',
      description: 'Deep clean and sanitize bathroom',
      startingPrice: 500,
      duration: '1-2 hours',
    },
  ];

  const availableSlots = [
    { id: 1, time: '10:00 AM - 2:00 PM', date: 'Today', available: true },
    { id: 2, time: '2:00 PM - 6:00 PM', date: 'Today', available: true },
    { id: 3, time: '10:00 AM - 2:00 PM', date: 'Tomorrow', available: false },
    { id: 4, time: '2:00 PM - 6:00 PM', date: 'Tomorrow', available: true },
  ];

  const recentBookings = [
    {
      id: 1,
      service: 'Deep Cleaning',
      date: '2024-01-15',
      status: 'completed',
      cleaner: 'Ramesh K.',
    },
    {
      id: 2,
      service: 'Kitchen Cleaning',
      date: '2024-01-10',
      status: 'completed',
      cleaner: 'Priya S.',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <Typography variant="label.md" color={colors.neutral[700]}>
            Current Location
          </Typography>
          <Typography variant="body.md" color={colors.neutral[900]}>
            {location}
          </Typography>
        </View>
        <View style={styles.headerActions}>
          <Button variant="ghost" size="sm" style={styles.notificationButton}>
            🔔
          </Button>
          <Button variant="ghost" size="sm" style={styles.profileButton}>
            👤
          </Button>
        </View>
      </View>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Input
            placeholder="What do you need cleaned?"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
            leftIcon={
              <Typography variant="label.lg" color={colors.neutral[500]}>🔍</Typography>
            }
          />
        </View>
        <View style={styles.quickFilters}>
          <Button variant="secondary" size="sm" style={styles.filterButton}>Deep Clean</Button>
          <Button variant="secondary" size="sm" style={styles.filterButton}>Kitchen</Button>
          <Button variant="secondary" size="sm" style={styles.filterButton}>Sofa</Button>
          <Button variant="secondary" size="sm" style={styles.filterButton}>Bathroom</Button>
        </View>
      </View>

      {/* Available Slots */}
      <View style={styles.section}>
        <Typography variant="heading.md" style={styles.sectionTitle}>
          Available Today
        </Typography>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.slotsContainer}>
          {availableSlots.map((slot) => (
            <Card
              key={slot.id}
              elevation={slot.available ? 'md' : 'none'}
              style={styles.slotCard}
              rounded="lg"
              onPress={slot.available ? () => { } : undefined}
            >
              <View style={styles.slotContent}>
                <Typography variant="body.md" color={slot.available ? colors.neutral[900] : colors.neutral[500]}>
                  {slot.date}
                </Typography>
                <Typography variant="body.lg" color={slot.available ? colors.neutral[900] : colors.neutral[500]}>
                  {slot.time}
                </Typography>
                {!slot.available && (
                  <Typography variant="caption" color={colors.neutral[500]}>
                    Booked
                  </Typography>
                )}
              </View>
            </Card>
          ))}
        </ScrollView>
      </View>

      {/* Featured Services */}
      <View style={styles.section}>
        <Typography variant="heading.md" style={styles.sectionTitle}>
          Our Services
        </Typography>
        <View style={styles.servicesGrid}>
          {services.map((service) => (
            <Card
              key={service.id}
              elevation="md"
              style={styles.serviceCard}
              onPress={() => { }}
            >
              <View style={styles.serviceContent}>
                <View style={styles.serviceIcon}>
                  <Typography variant="heading.xl">{service.icon}</Typography>
                </View>
                <View style={styles.serviceInfo}>
                  <Typography variant="body.md" color={colors.neutral[900]}>
                    {service.name}
                  </Typography>
                  <Typography variant="caption" color={colors.neutral[500]}>
                    {service.description}
                  </Typography>
                </View>
                <View style={styles.servicePrice}>
                  <Typography variant="heading.md" color={colors.primary[500]}>
                    ₹{service.startingPrice}
                  </Typography>
                  <Typography variant="caption" color={colors.neutral[500]}>
                    {service.duration}
                  </Typography>
                </View>
              </View>
            </Card>
          ))}
        </View>
      </View>

      {/* Recent Bookings */}
      <View style={styles.section}>
        <Typography variant="heading.md" style={styles.sectionTitle}>
          Recent Bookings
        </Typography>
        {recentBookings.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {recentBookings.map((booking) => (
              <Card key={booking.id} elevation="sm" style={styles.bookingCard}>
                <View style={styles.bookingContent}>
                  <View style={styles.bookingHeader}>
                    <Typography variant="body.md" color={colors.neutral[900]}>
                      {booking.service}
                    </Typography>
                    <Typography variant="caption" color={colors.success[500]}>
                      {booking.status}
                    </Typography>
                  </View>
                  <Typography variant="caption" color={colors.neutral[500]}>
                    {booking.date}
                  </Typography>
                  <Typography variant="caption" color={colors.neutral[600]}>
                    Cleaner: {booking.cleaner}
                  </Typography>
                </View>
              </Card>
            ))}
          </ScrollView>
        ) : (
          <Card elevation="none" style={styles.emptyState}>
            <Typography variant="body.md" color={colors.neutral[500]} align="center">
              No recent bookings found.
            </Typography>
          </Card>
        )}
      </View>

      {/* Bottom Navigation Placeholder */}
      <View style={styles.bottomNav}>
        <Button variant="primary" style={styles.bookNowButton}>
          Book Now
        </Button>
      </View>
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
  locationContainer: {
    flex: 1,
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  notificationButton: {
    width: 40,
    height: 40,
  },
  profileButton: {
    width: 40,
    height: 40,
  },
  searchSection: {
    padding: spacing[6],
    backgroundColor: colors.neutral[50],
  },
  searchContainer: {
    marginBottom: spacing[3],
  },
  searchInput: {
    height: 52,
  },
  quickFilters: {
    flexDirection: 'row',
    gap: spacing[2],
    flexWrap: 'wrap',
  },
  filterButton: {
    paddingVertical: spacing[1.5],
    paddingHorizontal: spacing[4],
  },
  section: {
    padding: spacing[6],
  },
  sectionTitle: {
    marginBottom: spacing[4],
  },
  slotsContainer: {
    marginBottom: spacing[2],
  },
  slotCard: {
    minWidth: 120,
    marginRight: spacing[2],
    padding: spacing[4],
  },
  slotContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[4],
  },
  serviceCard: {
    width: '45%',
    padding: spacing[5],
  },
  serviceContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing[3],
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.lg,
    backgroundColor: colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceInfo: {
    flex: 1,
  },
  servicePrice: {
    alignItems: 'flex-end',
  },
  bookingCard: {
    minWidth: 180,
    marginRight: spacing[2],
    padding: spacing[4],
  },
  bookingContent: {
    gap: spacing[1],
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emptyState: {
    padding: spacing[8],
    alignItems: 'center',
  },
  bottomNav: {
    padding: spacing[4],
    backgroundColor: colors.neutral[50],
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
  },
  bookNowButton: {
    width: '100%',
    paddingVertical: spacing[4],
  },
});