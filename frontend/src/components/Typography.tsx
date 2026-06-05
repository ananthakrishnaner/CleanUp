import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { typography, colors } from '../theme';

type TypographyVariant = keyof typeof typography.sizes;

export interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body.md',
  color = colors.neutral[900],
  align = 'left',
  style,
  children,
  ...rest
}) => {
  const isHeading = variant.startsWith('display') || variant.startsWith('heading');
  const fontFamily = isHeading ? typography.family.heading : typography.family.body;
  const sizeStyle = typography.sizes[variant];

  return (
    <Text
      style={[
        styles.base,
        {
          fontFamily,
          color,
          textAlign: align,
          ...sizeStyle,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    margin: 0,
    padding: 0,
  },
});
