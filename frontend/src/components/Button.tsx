import React from 'react';
import { TouchableOpacity, ActivityIndicator, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Typography } from './Typography';
import { colors, spacing, radius, shadows } from '../theme';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'danger'
  | 'success'
  | 'outline'
  | 'link';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const containerStyle = [
    styles.container,
    styles[`${size}Container`],
    styles[`${variant}Container`],
    disabled && styles.disabledContainer,
    fullWidth && styles.fullWidth,
    style,
  ];

  const getTextColor = () => {
    if (disabled) return colors.neutral[300];

    switch (variant) {
      case 'primary':
      case 'danger':
      case 'success':
        return colors.neutral[0];
      case 'secondary':
        return colors.neutral[700];
      case 'outline':
        return colors.primary[500];
      case 'link':
        return colors.primary[500];
      case 'ghost':
        return colors.neutral[700];
      default:
        return colors.neutral[0];
    }
  };

  const textVariant = size === 'xs'
    ? 'label.md'
    : size === 'sm'
    ? 'label.lg'
    : 'button';

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          color={getTextColor()}
          size={size === 'xs' || size === 'sm' ? 'small' : 'large'}
        />
      );
    }

    return children;
  };

  return (
    <TouchableOpacity
      activeOpacity={variant === 'ghost' || variant === 'outline' || variant === 'link' ? 0.7 : 0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={containerStyle}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: radius.lg,
    flexDirection: 'row',
    position: 'relative',
    overflow: 'hidden',
  },
  fullWidth: {
    width: '100%',
  },
  // Size variants
  xsContainer: {
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
    minHeight: 28,
    borderRadius: radius.sm,
  },
  smContainer: {
    paddingVertical: spacing[2.5],
    paddingHorizontal: spacing[5],
    minHeight: 36,
    borderRadius: radius.sm,
  },
  mdContainer: {
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[6],
    minHeight: 44,
    borderRadius: radius.md,
  },
  lgContainer: {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[8],
    minHeight: 52,
    borderRadius: radius.lg,
  },
  xlContainer: {
    paddingVertical: spacing[5],
    paddingHorizontal: spacing[10],
    minHeight: 64,
    borderRadius: radius.lg,
  },
  // Variant containers
  primaryContainer: {
    backgroundColor: colors.primary[500],
    ...shadows.base,
  },
  secondaryContainer: {
    backgroundColor: colors.primary[50],
    ...shadows.sm,
  },
  ghostContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.neutral[300],
  },
  dangerContainer: {
    backgroundColor: colors.danger[500],
    ...shadows.base,
  },
  successContainer: {
    backgroundColor: colors.success[500],
    ...shadows.base,
  },
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary[500],
    ...shadows.none,
  },
  linkContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 0,
    paddingHorizontal: 0,
    minHeight: 'auto',
    ...shadows.none,
  },
  disabledContainer: {
    backgroundColor: colors.neutral[100],
    borderWidth: 1,
    borderColor: colors.neutral[200],
    opacity: 0.6,
  },
});