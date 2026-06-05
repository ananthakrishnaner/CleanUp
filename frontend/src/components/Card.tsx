import React from 'react';
import { View, ViewProps, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, radius, shadows, spacing } from '../theme';

export interface CardProps extends ViewProps {
  elevation?: 'e0' | 'e1' | 'e2' | 'e3';
  onPress?: () => void;
  padded?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  elevation = 'e1',
  onPress,
  padded = true,
  ...rest
}) => {
  const containerStyle = [
    styles.card,
    shadows[elevation],
    padded && styles.padded,
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={containerStyle}>
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={containerStyle} {...rest}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.neutral[0],
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  padded: {
    padding: spacing[4],
  },
});
