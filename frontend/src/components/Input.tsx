import React from 'react';
import { View, TextInput, TextInputProps, StyleSheet } from 'react-native';
import { Typography } from './Typography';
import { colors, spacing, radius } from '../theme';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  style,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      {label && (
        <Typography variant="label.md" color={colors.neutral[700]} style={styles.label}>
          {label}
        </Typography>
      )}
      <TextInput
        style={[
          styles.input,
          error ? styles.inputError : null,
          style,
        ]}
        placeholderTextColor={colors.neutral[300]}
        {...rest}
      />
      {(error || helperText) && (
        <Typography
          variant="caption"
          color={error ? colors.danger[500] : colors.neutral[500]}
          style={styles.helperText}
        >
          {error || helperText}
        </Typography>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing[4],
    width: '100%',
  },
  label: {
    marginBottom: spacing[2],
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    borderRadius: radius.sm,
    paddingHorizontal: spacing[4],
    backgroundColor: colors.neutral[0],
    color: colors.neutral[900],
    fontSize: 16,
    fontFamily: '"Inter", system-ui, sans-serif',
  },
  inputError: {
    borderColor: colors.danger[500],
    borderWidth: 1.5,
  },
  helperText: {
    marginTop: spacing[1],
  },
});
