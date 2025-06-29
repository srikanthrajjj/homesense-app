import React, { useState, useEffect } from 'react';
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

type DeviceDetectionScreenProps = {
  navigation: StackNavigationProp<SetupStackParamList, 'DeviceDetection'>;
};

const DeviceDetectionScreen: React.FC<DeviceDetectionScreenProps> = ({ navigation }) => {
  const [isScanning, setIsScanning] = useState(true);
  const [deviceFound, setDeviceFound] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const scanAnimation = new Animated.Value(0);
  const pulseAnimation = new Animated.Value(1);

  useEffect(() => {
    // Start scanning animation
    const scanningLoop = Animated.loop(
      Animated.timing(scanAnimation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    );

    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    scanningLoop.start();
    pulseLoop.start();

    // Simulate device detection progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsScanning(false);
          setDeviceFound(true);
          scanningLoop.stop();
          pulseLoop.stop();
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    return () => {
      scanningLoop.stop();
      pulseLoop.stop();
      clearInterval(progressInterval);
    };
  }, []);

  const handleContinue = () => {
    navigation.navigate('DevicePairing');
  };

  const handleManualSetup = () => {
    // In a real app, this would show manual setup instructions
    navigation.navigate('DevicePairing');
  };

  const renderScanningView = () => (
    <View style={styles.scanningContainer}>
      <Animated.View
        style={[
          styles.scanningCircle,
          {
            transform: [
              { scale: pulseAnimation },
              {
                rotate: scanAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.scanningIcon}>📡</Text>
      </Animated.View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{progress}%</Text>
      </View>

      <Text style={styles.scanningText}>Scanning for HomeSense devices...</Text>
      <Text style={styles.scanningSubtext}>
        Make sure your device is powered on and within range
      </Text>
    </View>
  );

  const renderDeviceFoundView = () => (
    <View style={styles.deviceFoundContainer}>
      <View style={styles.successIcon}>
        <Text style={styles.successIconText}>✅</Text>
      </View>

      <Text style={styles.successTitle}>Device Found!</Text>
      <Text style={styles.successSubtext}>
        HomeSense Sensor v2.1.4 detected
      </Text>

      <Card style={styles.deviceCard}>
        <View style={styles.deviceInfo}>
          <View style={styles.deviceIcon}>
            <Text style={styles.deviceIconText}>📡</Text>
          </View>
          <View style={styles.deviceDetails}>
            <Text style={styles.deviceName}>HomeSense Sensor</Text>
            <Text style={styles.deviceModel}>Model: HS-2024</Text>
            <Text style={styles.deviceSignal}>Signal: Strong</Text>
          </View>
        </View>
      </Card>

      <View style={styles.actionButtons}>
        <Button
          title="Continue Setup"
          onPress={handleContinue}
          variant="primary"
          size="lg"
          icon="arrow-forward"
        />
        
        <Button
          title="Manual Setup"
          onPress={handleManualSetup}
          variant="outline"
          size="md"
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.stepIndicator}>Step 1 of 4</Text>
        <Text style={styles.title}>Device Detection</Text>
      </View>

      <View style={styles.content}>
        {isScanning ? renderScanningView() : renderDeviceFoundView()}
      </View>

      {isScanning && (
        <View style={styles.footer}>
          <Text style={styles.helpText}>
            Device not found? Check that it's plugged in and the LED is blinking.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    padding: Layout.screenPadding,
    alignItems: 'center',
  },
  stepIndicator: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray600,
    fontFamily: Typography.fontFamily.primary,
    marginBottom: Spacing.xs,
  },
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.black,
    fontFamily: Typography.fontFamily.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: Layout.screenPadding,
  },
  scanningContainer: {
    alignItems: 'center',
  },
  scanningCircle: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: (width * 0.4) / 2,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  scanningIcon: {
    fontSize: 64,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  progressBar: {
    width: '80%',
    height: 8,
    backgroundColor: Colors.gray300,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.black,
    borderRadius: 4,
  },
  progressText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.black,
    fontFamily: Typography.fontFamily.primary,
  },
  scanningText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.black,
    fontFamily: Typography.fontFamily.primary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  scanningSubtext: {
    fontSize: Typography.fontSize.base,
    color: Colors.gray600,
    fontFamily: Typography.fontFamily.primary,
    textAlign: 'center',
  },
  deviceFoundContainer: {
    alignItems: 'center',
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  successIconText: {
    fontSize: 40,
  },
  successTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.black,
    fontFamily: Typography.fontFamily.primary,
    marginBottom: Spacing.sm,
  },
  successSubtext: {
    fontSize: Typography.fontSize.base,
    color: Colors.gray600,
    fontFamily: Typography.fontFamily.primary,
    marginBottom: Spacing.xl,
  },
  deviceCard: {
    width: '100%',
    marginBottom: Spacing.xl,
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  deviceIconText: {
    fontSize: 24,
  },
  deviceDetails: {
    flex: 1,
  },
  deviceName: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.black,
    fontFamily: Typography.fontFamily.primary,
    marginBottom: Spacing.xs,
  },
  deviceModel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray600,
    fontFamily: Typography.fontFamily.primary,
  },
  deviceSignal: {
    fontSize: Typography.fontSize.sm,
    color: Colors.success,
    fontFamily: Typography.fontFamily.primary,
  },
  actionButtons: {
    width: '100%',
    gap: Spacing.md,
  },
  footer: {
    padding: Layout.screenPadding,
    alignItems: 'center',
  },
  helpText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray600,
    fontFamily: Typography.fontFamily.primary,
    textAlign: 'center',
  },
});

export default DeviceDetectionScreen;
