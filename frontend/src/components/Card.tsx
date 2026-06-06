import React from 'react';
import { View, ViewProps, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, radius, shadows, spacing } from '../theme';

type ElevationLevel = keyof typeof shadows;

export interface CardProps extends ViewProps {
  elevation?: ElevationLevel;
  onPress?: () => void;
  padded?: boolean;
  rounded?: keyof typeof radius;
  border?: keyof typeof colors.neutral;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  elevation = 'base',
  onPress,
  padded = true,
  rounded = 'md',
  border,
  ...rest
}) => {
  // Build styles array with proper filtering
  const cardStyles: any[] = [
    styles.card,
    { borderRadius: radius[rounded] },
  ];

  // Add border if specified
  if (border && colors.neutral[border]) {
    cardStyles.push({
      borderWidth: 1,
      borderColor: colors.neutral[border as keyof typeof colors.neutral],
    });
  }

  // Add padding if specified
  if (padded) {
    cardStyles.push(styles.padded);
  }

  // Add shadow if specified and exists
  if (elevation && shadows[elevation]) {
    cardStyles.push(shadows[elevation]);
  }

  // Add custom style
  if (style) {
    cardStyles.push(style);
  }

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.9} style={cardStyles} onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={cardStyles} {...rest}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.neutral[0],
    overflow: 'hidden',
  },
  padded: {
    padding: spacing[6],
  },
});