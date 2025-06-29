import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Card } from '../../components';
import { Colors, Typography, Spacing, Layout } from '../../constants/theme';
import { SetupStackParamList } from '../../types';

const { width } = Dimensions.get('window');

type SetupCompleteScreenProps = {
  navigation: StackNavigationProp<SetupStackParamList, 'SetupComplete'>;
};

const SetupCompleteScreen: React.FC<SetupCompleteScreenProps> = ({ navigation }) => {
  const scaleAnimation = new Animated.Value(0);
  const fadeAnimation = new Animated.Value(0);
  const slideAnimation = new Animated.Value(50);

  useEffect(() => {
    // Success animation sequence
    Animated.sequence([
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(fadeAnimation, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnimation, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const handleFinish = () => {
    // In a real app, this would navigate to the main app
    // For now, we'll just show an alert
    console.log('Setup complete - navigate to main app');
  };

  const handleViewDashboard = () => {
    // Navigate to main dashboard
    handleFinish();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Success Animation */}
        <View style={styles.successSection}>
          <Animated.View
            style={[
              styles.successIcon,
              {
                transform: [{ scale: scaleAnimation }],
              },
            ]}
          >
            <Text style={styles.successIconText}>🎉</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.textContainer,
              {
                opacity: fadeAnimation,
                transform: [{ translateY: slideAnimation }],
              },
            ]}
          >
            <Text style={styles.title}>Setup Complete!</Text>
            <Text style={styles.subtitle}>
              Your HomeSense system is now ready to protect your home
            </Text>
          </Animated.View>
        </View>

        {/* Setup Summary */}
        <Animated.View
          style={[
            styles.summarySection,
            {
              opacity: fadeAnimation,
              transform: [{ translateY: slideAnimation }],
            },
          ]}
        >
          <Card style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Setup Summary</Text>
            
            <View style={styles.summaryItem}>
              <Text style={styles.summaryIcon}>📡</Text>
              <View style={styles.summaryText}>
                <Text style={styles.summaryLabel}>Device Connected</Text>
                <Text style={styles.summaryValue}>HomeSense Sensor #1</Text>
              </View>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.summaryIcon}>🏠</Text>
              <View style={styles.summaryText}>
                <Text style={styles.summaryLabel}>Room Assignment</Text>
                <Text style={styles.summaryValue}>Living Room</Text>
              </View>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.summaryIcon}>🔒</Text>
              <View style={styles.summaryText}>
                <Text style={styles.summaryLabel}>Security</Text>
                <Text style={styles.summaryValue}>Encrypted & Private</Text>
              </View>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.summaryIcon}>✅</Text>
              <View style={styles.summaryText}>
                <Text style={styles.summaryLabel}>Status</Text>
                <Text style={[styles.summaryValue, styles.statusActive]}>Active & Monitoring</Text>
              </View>
            </View>
          </Card>

          {/* Next Steps */}
          <Card style={styles.nextStepsCard}>
            <Text style={styles.nextStepsTitle}>What's Next?</Text>
            
            <View style={styles.nextStepItem}>
              <Text style={styles.stepNumber}>1</Text>
              <Text style={styles.stepText}>
                Your device is now detecting motion in real-time
              </Text>
            </View>

            <View style={styles.nextStepItem}>
              <Text style={styles.stepNumber}>2</Text>
              <Text style={styles.stepText}>
                Adjust sensitivity settings to match your preferences
              </Text>
            </View>

            <View style={styles.nextStepItem}>
              <Text style={styles.stepNumber}>3</Text>
              <Text style={styles.stepText}>
                Enable Smart Mode for automatic optimization
              </Text>
            </View>
          </Card>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View
          style={[
            styles.actionSection,
            {
              opacity: fadeAnimation,
              transform: [{ translateY: slideAnimation }],
            },
          ]}
        >
          <Button
            title="View Dashboard"
            onPress={handleViewDashboard}
            variant="primary"
            size="lg"
            icon="home"
          />
          
          <Text style={styles.celebrationText}>
            🎊 Welcome to HomeSense! 🎊
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  content: {
    flex: 1,
    padding: Layout.screenPadding,
    justifyContent: 'space-between',
  },
  successSection: {
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
  successIcon: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: (width * 0.3) / 2,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
    shadowColor: Colors.success,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  successIconText: {
    fontSize: 64,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.black,
    fontFamily: Typography.fontFamily.primary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.fontSize.lg,
    color: Colors.gray600,
    fontFamily: Typography.fontFamily.primary,
    textAlign: 'center',
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.lg,
  },
  summarySection: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: Spacing.xl,
  },
  summaryCard: {
    marginBottom: Spacing.lg,
  },
  summaryTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.black,
    fontFamily: Typography.fontFamily.primary,
    marginBottom: Spacing.lg,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  summaryIcon: {
    fontSize: 24,
    marginRight: Spacing.md,
  },
  summaryText: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray600,
    fontFamily: Typography.fontFamily.primary,
  },
  summaryValue: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.black,
    fontFamily: Typography.fontFamily.primary,
  },
  statusActive: {
    color: Colors.success,
  },
  nextStepsCard: {
    backgroundColor: Colors.secondary,
    borderWidth: 1,
    borderColor: Colors.accent,
  },
  nextStepsTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.black,
    fontFamily: Typography.fontFamily.primary,
    marginBottom: Spacing.md,
  },
  nextStepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.black,
    color: Colors.white,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    fontFamily: Typography.fontFamily.primary,
    textAlign: 'center',
    lineHeight: 24,
    marginRight: Spacing.sm,
  },
  stepText: {
    flex: 1,
    fontSize: Typography.fontSize.sm,
    color: Colors.gray700,
    fontFamily: Typography.fontFamily.primary,
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.sm,
  },
  actionSection: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  celebrationText: {
    fontSize: Typography.fontSize.base,
    color: Colors.gray600,
    fontFamily: Typography.fontFamily.primary,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});

export default SetupCompleteScreen;
