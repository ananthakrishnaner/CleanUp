import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { colors, spacing, radius } from '../theme';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: keyof typeof radius;
  style?: any;
}

export function Skeleton({
  width = '100%',
  height = 20,
  borderRadius = 'sm',
  style,
}: SkeletonProps) {
  return (
    <View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius: radius[borderRadius],
        },
        style,
      ]}
    />
  );
}

interface SkeletonCardProps {
  variant?: 'service' | 'job' | 'booking';
}

export function SkeletonCard({ variant = 'service' }: SkeletonCardProps) {
  if (variant === 'service') {
    return (
      <View style={styles.card}>
        <Skeleton width={48} height={48} borderRadius="md" />
        <View style={styles.cardContent}>
          <Skeleton width="60%" height={16} />
          <Skeleton width="80%" height={12} />
        </View>
        <View style={styles.cardPrice}>
          <Skeleton width={60} height={16} />
        </View>
      </View>
    );
  }

  if (variant === 'job') {
    return (
      <View style={styles.jobCard}>
        <Skeleton width="50%" height={18} />
        <Skeleton width="30%" height={14} borderRadius="full" />
        <View style={styles.jobDetails}>
          <Skeleton width="40%" height={12} />
          <Skeleton width="60%" height={12} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.bookingCard}>
      <Skeleton width="60%" height={16} />
      <Skeleton width="30%" height={14} />
      <Skeleton width="60%" height={12} />
    </View>
  );
}

interface SkeletonListProps {
  count?: number;
  variant?: 'service' | 'job' | 'booking';
}

export function SkeletonList({ count = 3, variant = 'service' }: SkeletonListProps) {
  return (
    <View style={styles.list}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} variant={variant} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: colors.neutral[200],
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing[3],
    padding: spacing[4],
  },
  cardContent: {
    flex: 1,
    gap: spacing[2],
  },
  cardPrice: {
    alignItems: 'flex-end',
  },
  jobCard: {
    gap: spacing[3],
    padding: spacing[4],
  },
  jobDetails: {
    gap: spacing[1],
  },
  bookingCard: {
    gap: spacing[2],
    padding: spacing[4],
  },
  list: {
    gap: spacing[3],
  },
});