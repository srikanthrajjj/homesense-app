import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Colors, BorderRadius, Spacing, Shadows } from '../constants/theme';
import { CardProps } from '../types';

const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  shadow = true,
}) => {
  const cardStyle: ViewStyle[] = [
    styles.card,
    shadow && styles.shadow,
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyle}
        onPress={onPress}
        activeOpacity={0.95}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={cardStyle}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.gray100,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
  },
  shadow: {
    ...Shadows.md,
  },
});

export default Card;
