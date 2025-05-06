import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
  View,
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'mpesa';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

export function Button({
  style,
  variant = 'primary',
  size = 'medium',
  disabled,
  loading,
  leadingIcon,
  trailingIcon,
  children,
  ...props
}: ButtonProps) {
  const buttonStyles = [
    styles.button,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === 'outline'
              ? '#10B981'
              : variant === 'secondary'
              ? '#fff'
              : variant === 'mpesa'
              ? '#fff'
              : '#fff'
          }
        />
      ) : (
        <View style={styles.content}>
          {leadingIcon && <View style={styles.leadingIcon}>{leadingIcon}</View>}
          <Text style={textStyles}>{children}</Text>
          {trailingIcon && <View style={styles.trailingIcon}>{trailingIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leadingIcon: {
    marginRight: 8,
  },
  trailingIcon: {
    marginLeft: 8,
  },
  primary: {
    backgroundColor: '#10B981',
  },
  secondary: {
    backgroundColor: '#3B82F6',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#10B981',
  },
  mpesa: {
    backgroundColor: '#49B749',
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 36,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    minHeight: 48,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    minHeight: 56,
  },
  disabled: {
    backgroundColor: '#D4D4D8',
    borderColor: '#D4D4D8',
  },
  text: {
    // fontFamily: FONTS.medium,
    textAlign: 'center',
  },
  primaryText: {
    color: '#fff',
  },
  secondaryText: {
    color: '#fff',
  },
  outlineText: {
    color: '#10B981',
  },
  mpesaText: {
    color: '#fff',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  disabledText: {
    // color: COLORS.gray[600],
  },
});