import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Typography } from './Typography';
import { colors, spacing, radius, shadows } from '../theme';

type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  variant?: ToastVariant;
  duration?: number;
  onClose?: () => void;
  action?: {
    label: string;
    onPress: () => void;
  };
}

const variantConfig: Record<ToastVariant, { icon: string; backgroundColor: string; textColor: string }> = {
  success: {
    icon: '✓',
    backgroundColor: colors.success[500],
    textColor: colors.neutral[0],
  },
  error: {
    icon: '✕',
    backgroundColor: colors.danger[500],
    textColor: colors.neutral[0],
  },
  warning: {
    icon: '!',
    backgroundColor: colors.warn[500],
    textColor: colors.neutral[0],
  },
  info: {
    icon: 'i',
    backgroundColor: colors.primary[500],
    textColor: colors.neutral[0],
  },
};

export function Toast({
  message,
  variant = 'info',
  duration = 3000,
  onClose,
  action,
}: ToastProps) {
  const config = variantConfig[variant];
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    if (duration > 0) {
      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, []);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => onClose?.());
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: config.backgroundColor, transform: [{ translateY }] },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Typography variant="body.md" color={config.textColor}>
            {config.icon}
          </Typography>
        </View>
        <Typography variant="body.md" color={config.textColor} style={styles.message}>
          {message}
        </Typography>
        {action && (
          <TouchableOpacity onPress={action.onPress}>
            <Typography variant="label.md" color={config.textColor}>
              {action.label}
            </Typography>
          </TouchableOpacity>
        )}
      </View>
      {onClose && (
        <TouchableOpacity onPress={hideToast} style={styles.closeButton}>
          <Typography variant="body.md" color={config.textColor}>
            ✕
          </Typography>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}

// Toast manager context for showing toasts from anywhere in the app
interface ToastOptions {
  message: string;
  variant?: ToastVariant;
  duration?: number;
  action?: {
    label: string;
    onPress: () => void;
  };
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastOptions[]>([]);

  const showToast = (options: ToastOptions) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { ...options, id }]);

    return id;
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, showToast, removeToast };
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: spacing[4],
    paddingTop: spacing[6],
    zIndex: 1000,
    ...shadows.lg,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing[2],
  },
  message: {
    flex: 1,
  },
  closeButton: {
    padding: spacing[2],
    marginLeft: spacing[2],
  },
});