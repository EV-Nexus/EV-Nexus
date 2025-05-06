import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View, ViewProps } from '@/components/Themed';

interface BadgeProps extends ViewProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'neutral';
  size?: 'small' | 'medium' | 'large';
}

export function Badge({ style, variant = 'default', size = 'medium', children, ...props }: BadgeProps) {
  return (
    <View style={[styles.badge, styles[variant], styles[size], style]} {...props}>
      <Text style={[styles.text, styles[`${variant}Text`], styles[`${size}Text`]]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  default: {
    // backgroundColor: COLORS.primary[100],
  },
  success: {
    // backgroundColor: COLORS.success[100],
  },
  warning: {
    // backgroundColor: COLORS.warning[100],
  },
  error: {
    // backgroundColor: COLORS.error[100],
  },
  neutral: {
    // backgroundColor: COLORS.gray[200],
  },
  small: {
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  medium: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  large: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  text: {
    // fontFamily: FONTS.medium,
  },
  defaultText: {
    // color: COLORS.primary[700],
  },
  successText: {
    // color: COLORS.success[700],
  },
  warningText: {
    // color: COLORS.warning[700],
  },
  errorText: {
    // color: COLORS.error[700],
  },
  neutralText: {
    // color: COLORS.gray[700],
  },
  smallText: {
    fontSize: 10,
  },
  mediumText: {
    fontSize: 12,
  },
  largeText: {
    fontSize: 14,
  },
});