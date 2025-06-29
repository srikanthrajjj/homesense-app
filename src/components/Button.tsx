import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, BorderRadius, Spacing, Layout } from '../constants/theme';
import { ButtonProps } from '../types';

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[size]];
    
    if (disabled || loading) {
      baseStyle.push(styles.disabled);
    } else {
      baseStyle.push(styles[variant]);
    }
    
    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text, styles[`text_${size}`]];
    
    if (disabled || loading) {
      baseStyle.push(styles.textDisabled);
    } else {
      baseStyle.push(styles[`text_${variant}`]);
    }
    
    return baseStyle;
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator 
            size="small" 
            color={variant === 'primary' ? Colors.white : Colors.black} 
          />
          <Text style={[getTextStyle(), styles.loadingText]}>Loading...</Text>
        </View>
      );
    }

    return (
      <View style={styles.contentContainer}>
        {icon && (
          <Ionicons 
            name={icon as any} 
            size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} 
            color={variant === 'primary' ? Colors.white : Colors.black}
            style={styles.icon}
          />
        )}
        <Text style={getTextStyle()}>{title}</Text>
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: BorderRadius['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    minHeight: Layout.minTouchTarget,
  },
  
  // Size variants
  sm: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    height: Layout.buttonHeight.sm,
  },
  md: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    height: Layout.buttonHeight.md,
  },
  lg: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    height: Layout.buttonHeight.lg,
  },
  
  // Style variants
  primary: {
    backgroundColor: Colors.black,
  },
  secondary: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.black,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.black,
  },
  
  // Disabled state
  disabled: {
    backgroundColor: Colors.gray300,
    borderColor: Colors.gray300,
  },
  
  // Text styles
  text: {
    fontFamily: Typography.fontFamily.primary,
    fontWeight: Typography.fontWeight.bold,
    textAlign: 'center',
  },
  
  // Text size variants
  text_sm: {
    fontSize: Typography.fontSize.sm,
  },
  text_md: {
    fontSize: Typography.fontSize.lg,
  },
  text_lg: {
    fontSize: Typography.fontSize.xl,
  },
  
  // Text color variants
  text_primary: {
    color: Colors.white,
  },
  text_secondary: {
    color: Colors.black,
  },
  text_outline: {
    color: Colors.black,
  },
  
  textDisabled: {
    color: Colors.gray500,
  },
  
  // Content layout
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  icon: {
    marginRight: Spacing.sm,
  },
  
  loadingText: {
    marginLeft: Spacing.sm,
  },
});

export default Button;
