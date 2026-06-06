import React from 'react';
import { View, StyleSheet, ActivityIndicator, Modal } from 'react-native';
import { Typography } from './Typography';
import { colors, spacing, radius, shadows } from '../theme';

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
  fullScreen?: boolean;
}

export function LoadingOverlay({
  visible,
  message = 'Loading...',
  fullScreen = false,
}: LoadingOverlayProps) {
  if (!visible) return null;

  const content = (
    <View style={[styles.container, fullScreen && styles.fullScreenContainer]}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color={colors.primary[500]} />
        {message && (
          <Typography variant="body.md" color={colors.neutral[700]} style={styles.message}>
            {message}
          </Typography>
        )}
      </View>
    </View>
  );

  if (fullScreen) {
    return (
      <Modal visible={visible} transparent animationType="fade">
        {content}
      </Modal>
    );
  }

  return content;
}

interface LoadingButtonProps {
  loading: boolean;
  children: React.ReactNode;
}

export function LoadingButton({ loading, children }: LoadingButtonProps) {
  if (loading) {
    return (
      <View style={styles.buttonLoading}>
        <ActivityIndicator size="small" color={colors.neutral[0]} />
        <Typography variant="button" color={colors.neutral[0]} style={styles.buttonText}>
          Loading...
        </Typography>
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: radius.lg,
    padding: spacing[6],
    ...shadows.md,
  },
  fullScreenContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
  },
  content: {
    alignItems: 'center',
    gap: spacing[4],
  },
  message: {
    textAlign: 'center',
  },
  buttonLoading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
  },
  buttonText: {
    marginLeft: spacing[2],
  },
});