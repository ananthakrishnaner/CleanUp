import React, { useState } from 'react';
import { View, TextInput, TextInputProps, StyleSheet, TouchableOpacity } from 'react-native';
import { Typography } from './Typography';
import { colors, spacing, radius } from '../theme';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  required?: boolean;
  showPasswordToggle?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  required = false,
  showPasswordToggle = false,
  style,
  secureTextEntry,
  ...rest
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const inputStyle = [
    styles.input,
    error ? styles.inputError : null,
    leftIcon ? styles.inputWithLeftIcon : null,
    style,
  ];

  const renderRightIcon = () => {
    if (showPasswordToggle) {
      return (
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconButton}>
          <Typography variant="caption" color={colors.neutral[500]}>
            {isPasswordVisible ? 'Hide' : 'Show'}
          </Typography>
        </TouchableOpacity>
      );
    }
    return rightIcon;
  };

  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.labelContainer}>
          <Typography variant="label.md" color={colors.neutral[700]}>
            {label}
            {required && <Typography variant="label.md" color={colors.danger[500]}> *</Typography>}
          </Typography>
        </View>
      )}
      <View style={[styles.inputContainer, leftIcon && styles.inputContainerWithIcon]}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <TextInput
          style={inputStyle}
          placeholderTextColor={colors.neutral[300]}
          secureTextEntry={showPasswordToggle ? !isPasswordVisible : secureTextEntry}
          {...rest}
        />
        {renderRightIcon()}
      </View>
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
    marginBottom: spacing[6],
    width: '100%',
  },
  labelContainer: {
    marginBottom: spacing[2],
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[0],
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    height: 48,
  },
  inputContainerWithIcon: {
    paddingLeft: spacing[3],
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: spacing[4],
    color: colors.neutral[900],
    fontSize: 15,
    fontFamily: '"Inter", system-ui, sans-serif',
    // Remove default styles
    borderWidth: 0,
    borderRadius: 0,
  },
  inputWithLeftIcon: {
    paddingLeft: spacing[2],
  },
  inputError: {
    borderColor: colors.danger[500],
    borderWidth: 1.5,
  },
  leftIcon: {
    position: 'absolute',
    left: spacing[3],
    zIndex: 1,
  },
  iconButton: {
    padding: spacing[1],
    marginRight: spacing[2],
  },
  helperText: {
    marginTop: spacing[1],
    marginLeft: spacing[1],
  },
});