import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from './Typography';
import { Button } from './Button';
import { colors, spacing, radius } from '../theme';

type EmptyStateVariant = 'bookings' | 'jobs' | 'notifications' | 'search' | 'support';

interface EmptyStateProps {
  variant?: EmptyStateVariant;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const emptyStateConfig: Record<EmptyStateVariant, { icon: string; title: string; description: string }> = {
  bookings: {
    icon: '📅',
    title: 'No Bookings Yet',
    description: 'Your booking history will appear here once you schedule your first cleaning service.',
  },
  jobs: {
    icon: '🧹',
    title: 'No Jobs Available',
    description: 'New job requests will appear here. Toggle availability to receive notifications.',
  },
  notifications: {
    icon: '🔔',
    title: 'All Caught Up',
    description: "You don't have any notifications at the moment.",
  },
  search: {
    icon: '🔍',
    title: 'No Results Found',
    description: 'Try adjusting your search or filters to find what you\'re looking for.',
  },
  support: {
    icon: '💬',
    title: 'No Tickets Yet',
    description: 'If you need help, you can raise a support ticket from here.',
  },
};

export function EmptyState({
  variant = 'bookings',
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const config = emptyStateConfig[variant];

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Typography variant="display.xl">{config.icon}</Typography>
      </View>
      <Typography variant="heading.md" style={styles.title}>
        {title || config.title}
      </Typography>
      <Typography variant="body.md" color={colors.neutral[500]} style={styles.description}>
        {description || config.description}
      </Typography>
      {actionLabel && onAction && (
        <Button variant="primary" onPress={onAction} style={styles.action}>
          {actionLabel}
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[8],
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: radius.full,
    backgroundColor: colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[6],
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  description: {
    textAlign: 'center',
    marginBottom: spacing[6],
    maxWidth: 280,
  },
  action: {
    marginTop: spacing[2],
  },
});