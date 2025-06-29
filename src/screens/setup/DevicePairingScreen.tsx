import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Card } from '../../components';
import { Colors, Typography, Spacing, Layout } from '../../constants/theme';
import { SetupStackParamList } from '../../types';

type DevicePairingScreenProps = {
  navigation: StackNavigationProp<SetupStackParamList, 'DevicePairing'>;
};

const DevicePairingScreen: React.FC<DevicePairingScreenProps> = ({ navigation }) => {
  const [pairingStep, setPairingStep] = useState<'connecting' | 'pairing' | 'success'>('connecting');
  const [progress, setProgress] = useState(0);
  
  const connectAnimation = new Animated.Value(0);

  useEffect(() => {
    // Start connection animation
    const animationLoop = Animated.loop(
      Animated.timing(connectAnimation, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    );
    animationLoop.start();

    // Simulate pairing process
    const timer = setTimeout(() => {
      setPairingStep('pairing');
      setProgress(50);
      
      setTimeout(() => {
        setPairingStep('success');
        setProgress(100);
        animationLoop.stop();
      }, 2000);
    }, 3000);

    return () => {
      clearTimeout(timer);
      animationLoop.stop();
    };
  }, []);

  const handleContinue = () => {
    navigation.navigate('RoomAssignment');
  };

  const handleRetry = () => {
    setPairingStep('connecting');
    setProgress(0);
    // Restart the pairing process
  };

  const renderConnectingView = () => (
    <View style={styles.stepContainer}>
      <Animated.View
        style={[
          styles.connectionIcon,
          {
            transform: [
              {
                rotate: connectAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.iconText}>🔗</Text>
      </Animated.View>
      
      <Text style={styles.stepTitle}>Connecting to Device</Text>
      <Text style={styles.stepDescription}>
        Establishing secure connection with your HomeSense sensor...
      </Text>
    </View>
  );

  const renderPairingView = () => (
    <View style={styles.stepContainer}>
      <View style={styles.pairingIcon}>
        <Text style={styles.iconText}>🤝</Text>
      </View>
      
      <Text style={styles.stepTitle}>Pairing Device</Text>
      <Text style={styles.stepDescription}>
        Configuring device settings and security protocols...
      </Text>
    </View>
  );

  const renderSuccessView = () => (
    <View style={styles.stepContainer}>
      <View style={styles.successIcon}>
        <Text style={styles.iconText}>✅</Text>
      </View>
      
      <Text style={styles.stepTitle}>Device Paired Successfully!</Text>
      <Text style={styles.stepDescription}>
        Your HomeSense sensor is now connected and ready to configure.
      </Text>

      <Card style={styles.deviceSummary}>
        <Text style={styles.summaryTitle}>Device Information</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Name:</Text>
          <Text style={styles.summaryValue}>HomeSense Sensor #1</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Model:</Text>
          <Text style={styles.summaryValue}>HS-2024</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Firmware:</Text>
          <Text style={styles.summaryValue}>v2.1.4</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Signal:</Text>
          <Text style={[styles.summaryValue, styles.signalStrong]}>Strong</Text>
        </View>
      </Card>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.stepIndicator}>Step 2 of 4</Text>
        <Text style={styles.title}>Device Pairing</Text>
      </View>

      <View style={styles.content}>
        {pairingStep === 'connecting' && renderConnectingView()}
        {pairingStep === 'pairing' && renderPairingView()}
        {pairingStep === 'success' && renderSuccessView()}

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{progress}%</Text>
        </View>
      </View>

      <View style={styles.footer}>
        {pairingStep === 'success' ? (
          <Button
            title="Continue to Room Setup"
            onPress={handleContinue}
            variant="primary"
            size="lg"
            icon="arrow-forward"
          />
        ) : (
          <View style={styles.footerContent}>
            <Text style={styles.helpText}>
              Make sure your device LED is blinking blue during pairing
            </Text>
            {pairingStep === 'connecting' && (
              <Button
                title="Having Issues?"
                onPress={() => Alert.alert('Help', 'Pairing troubleshooting guide would appear here.')}
                variant="outline"
                size="sm"
              />
            )}
          </View>
        )}
      </View>
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
  stepContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  connectionIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  pairingIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
    borderWidth: 2,
    borderColor: Colors.accent,
  },
  successIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
    shadowColor: Colors.success,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  iconText: {
    fontSize: 40,
  },
  stepTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.black,
    fontFamily: Typography.fontFamily.primary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  stepDescription: {
    fontSize: Typography.fontSize.base,
    color: Colors.gray600,
    fontFamily: Typography.fontFamily.primary,
    textAlign: 'center',
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.base,
  },
  deviceSummary: {
    width: '100%',
    marginTop: Spacing.lg,
  },
  summaryTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.black,
    fontFamily: Typography.fontFamily.primary,
    marginBottom: Spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  summaryLabel: {
    fontSize: Typography.fontSize.base,
    color: Colors.gray600,
    fontFamily: Typography.fontFamily.primary,
  },
  summaryValue: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.black,
    fontFamily: Typography.fontFamily.primary,
  },
  signalStrong: {
    color: Colors.success,
  },
  progressContainer: {
    alignItems: 'center',
    marginTop: Spacing.xl,
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
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.black,
    fontFamily: Typography.fontFamily.primary,
  },
  footer: {
    padding: Layout.screenPadding,
  },
  footerContent: {
    alignItems: 'center',
    gap: Spacing.md,
  },
  helpText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray600,
    fontFamily: Typography.fontFamily.primary,
    textAlign: 'center',
  },
});

export default DevicePairingScreen;
