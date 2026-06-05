import React from 'react';
import { TouchableOpacity, ActivityIndicator, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Typography } from './Typography';
import { colors, spacing, radius, shadows } from '../theme';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
}) => {
  const containerStyle = [
    styles.container,
    styles[`${size}Container`],
    styles[`${variant}Container`],
    disabled && styles.disabledContainer,
    fullWidth && styles.fullWidth,
    style,
  ];

  const textColor = disabled
    ? colors.neutral[300]
    : variant === 'primary' || variant === 'danger'
    ? colors.neutral[0]
    : variant === 'secondary'
    ? colors.primary[600]
    : colors.neutral[700];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={containerStyle}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <Typography variant="label.lg" color={textColor} align="center">
          {title}
        </Typography>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: radius.pill,
    flexDirection: 'row',
  },
  fullWidth: {
    width: '100%',
  },
  smContainer: {
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
    minHeight: 32,
  },
  mdContainer: {
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[6],
    minHeight: 44,
  },
  lgContainer: {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[8],
    minHeight: 56,
  },
  primaryContainer: {
    backgroundColor: colors.primary[500],
    ...shadows.e1,
  },
  secondaryContainer: {
    backgroundColor: colors.primary[50],
  },
  ghostContainer: {
    backgroundColor: 'transparent',
  },
  dangerContainer: {
    backgroundColor: colors.danger[500],
  },
  disabledContainer: {
    backgroundColor: colors.neutral[100],
    shadowOpacity: 0,
    elevation: 0,
    boxShadow: 'none',
  },
});
