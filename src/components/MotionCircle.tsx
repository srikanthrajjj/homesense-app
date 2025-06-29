import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { Colors, Typography, Spacing } from '../constants/theme';
import { MotionCircleProps } from '../types';

const { width } = Dimensions.get('window');

const MotionCircle: React.FC<MotionCircleProps> = ({
  isActive,
  confidence,
  size = width * 0.6,
  animated = true,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.3)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isActive && animated) {
      // Create pulsing animation for active motion
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );

      // Create ripple effect
      const rippleAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.3,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );

      // Fade in/out for ripple
      const fadeAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(opacityAnim, {
            toValue: 0.6,
            duration: 750,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 750,
            useNativeDriver: true,
          }),
        ])
      );

      pulseAnimation.start();
      rippleAnimation.start();
      fadeAnimation.start();

      return () => {
        pulseAnimation.stop();
        rippleAnimation.stop();
        fadeAnimation.stop();
      };
    } else {
      // Reset animations when not active
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isActive, animated]);

  const getCircleColor = () => {
    if (isActive) {
      return Colors.motionActive;
    }
    return Colors.motionInactive;
  };

  const getStatusText = () => {
    if (isActive) {
      return 'Motion Detected';
    }
    return 'No Motion';
  };

  const getConfidenceText = () => {
    if (isActive && confidence > 0) {
      return `${confidence}% confidence`;
    }
    return '';
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Ripple effect for active motion */}
      {isActive && animated && (
        <Animated.View
          style={[
            styles.ripple,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderColor: getCircleColor(),
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}
        />
      )}
      
      {/* Main circle */}
      <Animated.View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: getCircleColor(),
            transform: animated ? [{ scale: pulseAnim }] : [],
          },
        ]}
      >
        <View style={styles.content}>
          <Text style={[styles.statusText, { color: isActive ? Colors.black : Colors.gray600 }]}>
            {getStatusText()}
          </Text>
          {getConfidenceText() && (
            <Text style={[styles.confidenceText, { color: isActive ? Colors.black : Colors.gray500 }]}>
              {getConfidenceText()}
            </Text>
          )}
        </View>
      </Animated.View>
      
      {/* Inner glow effect */}
      {isActive && (
        <View
          style={[
            styles.innerGlow,
            {
              width: size * 0.8,
              height: size * 0.8,
              borderRadius: (size * 0.8) / 2,
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  ripple: {
    position: 'absolute',
    borderWidth: 3,
    backgroundColor: 'transparent',
  },
  innerGlow: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.primary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  confidenceText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    fontFamily: Typography.fontFamily.primary,
    textAlign: 'center',
  },
});

export default MotionCircle;
