import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from '../../components';
import { Colors, Typography, Spacing, Layout } from '../../constants/theme';
import { SetupStackParamList } from '../../types';

const { width } = Dimensions.get('window');

type WelcomeScreenProps = {
  navigation: StackNavigationProp<SetupStackParamList, 'Welcome'>;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('DeviceDetection');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo/Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>HomeSense</Text>
            <Text style={styles.logoSubtext}>by Deutsche Telekom</Text>
          </View>
          
          {/* Placeholder for device illustration */}
          <View style={styles.deviceIllustration}>
            <View style={styles.deviceIcon}>
              <Text style={styles.deviceIconText}>📡</Text>
            </View>
          </View>
        </View>

        {/* Welcome Content */}
        <View style={styles.welcomeContent}>
          <Text style={styles.title}>Let's Set Up Your HomeSense</Text>
          <Text style={styles.description}>
            HomeSense uses advanced WiFi technology to detect motion in your home without cameras. 
            Your privacy is protected while keeping your home secure.
          </Text>

          {/* Features List */}
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🔒</Text>
              <Text style={styles.featureText}>Privacy-first motion detection</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📱</Text>
              <Text style={styles.featureText}>Real-time alerts and monitoring</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🤖</Text>
              <Text style={styles.featureText}>AI-powered smart learning</Text>
            </View>
          </View>
        </View>

        {/* Action Button */}
        <View style={styles.actionSection}>
          <Button
            title="Get Started"
            onPress={handleGetStarted}
            variant="primary"
            size="lg"
            icon="arrow-forward"
          />
          
          <Text style={styles.setupTime}>Setup takes about 3 minutes</Text>
        </View>
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
  heroSection: {
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  logoText: {
    fontSize: Typography.fontSize['4xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.black,
    fontFamily: Typography.fontFamily.primary,
  },
  logoSubtext: {
    fontSize: Typography.fontSize.base,
    color: Colors.gray600,
    fontFamily: Typography.fontFamily.primary,
    marginTop: Spacing.xs,
  },
  deviceIllustration: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.xl,
  },
  deviceIcon: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: (width * 0.3) / 2,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  deviceIconText: {
    fontSize: 48,
  },
  welcomeContent: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: Spacing.xl,
  },
  title: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.black,
    fontFamily: Typography.fontFamily.primary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  description: {
    fontSize: Typography.fontSize.lg,
    color: Colors.gray700,
    fontFamily: Typography.fontFamily.primary,
    textAlign: 'center',
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.lg,
    marginBottom: Spacing.xl,
  },
  featuresList: {
    gap: Spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: Spacing.md,
  },
  featureText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.black,
    fontFamily: Typography.fontFamily.primary,
    flex: 1,
  },
  actionSection: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  setupTime: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray600,
    fontFamily: Typography.fontFamily.primary,
    marginTop: Spacing.md,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
