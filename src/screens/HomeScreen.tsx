import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Dimensions,
  Animated,
  Alert,
  Vibration,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Layout } from '../constants/theme';
import { useSettings } from '../context/SettingsContext';

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { vibrationEnabled, notificationsEnabled, setNotificationsEnabled } = useSettings();
  const [motionDetected, setMotionDetected] = useState(false); // Start with detecting state
  const [movementCount, setMovementCount] = useState(12); // Start with initial count
  const [movementCount] = useState(3);
  const [timeRange] = useState('16:05h and 16:15h');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'warning' | 'info'>('success');

  // Animation values
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const toastAnim = useRef(new Animated.Value(0)).current;

  // Visualizer animation values (7 bars)
  const barAnimations = useRef(
    Array.from({ length: 7 }, () => new Animated.Value(0.3))
  ).current;

  // Motion detection breathing animation
  useEffect(() => {
    if (motionDetected) {
      const breathingAnimation = Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(scaleAnim, {
              toValue: 1.1,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
              toValue: 0.7,
              duration: 1000,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
          ]),
        ])
      );
      breathingAnimation.start();
      return () => breathingAnimation.stop();
    } else {
      // Reset circle animations when not detected
      scaleAnim.setValue(1);
      opacityAnim.setValue(1);
    }
  }, [motionDetected]);

  // Visualizer animation for when motion is not detected
  useEffect(() => {
    if (!motionDetected) {
      const createBarAnimation = (animValue: Animated.Value, delay: number) => {
        return Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(animValue, {
              toValue: 1,
              duration: 1000 + Math.random() * 1500, // Slowed down by 80%
              useNativeDriver: false,
            }),
            Animated.timing(animValue, {
              toValue: 0.3,
              duration: 1000 + Math.random() * 1500, // Slowed down by 80%
              useNativeDriver: false,
            }),
          ])
        );
      };

      const animations = barAnimations.map((anim, index) =>
        createBarAnimation(anim, index * 100)
      );

      animations.forEach(animation => animation.start());

      return () => {
        animations.forEach(animation => animation.stop());
      };
    } else {
      // Reset bar animations when motion detected
      barAnimations.forEach(anim => anim.setValue(0.3));
    }
  }, [motionDetected]);

  // Toast animation - longer duration for important messages
  useEffect(() => {
    if (showToast) {
      const duration = toastType === 'warning' ? 4000 : 3000; // Warning messages stay longer

      Animated.sequence([
        Animated.timing(toastAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.delay(duration),
        Animated.timing(toastAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start(() => setShowToast(false));
    }
  }, [showToast, toastType]);

  const showToastMessage = (message: string, type: 'success' | 'warning' | 'info' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const handleNotificationToggle = (value: boolean) => {
    setNotificationsEnabled(value);

    if (value) {
      // When notifications are turned ON
      showToastMessage('Notifications enabled. You\'ll be alerted of any motion detected.', 'success');
    } else {
      // When notifications are turned OFF - explain why they're important
      showToastMessage('Notifications disabled. You won\'t be alerted if motion is detected while away from home.', 'warning');
    }
  };

  // Automatic state cycling
  useEffect(() => {
    const cycleStates = () => {
      if (motionDetected) {
        // Motion detected state lasts 10 seconds (doubled from 5)
        setTimeout(() => {
          setMotionDetected(false);
        }, 10000);
      } else {
        // Detecting state lasts 6 seconds (doubled from 3)
        setTimeout(() => {
          setMotionDetected(true);
        }, 6000);
      }
    };

    const timer = setTimeout(cycleStates, 100); // Small delay to avoid immediate execution

    return () => clearTimeout(timer);
  }, [motionDetected]);

  // Vibration and counter update when motion is detected
  useEffect(() => {
    if (motionDetected) {
      // Increment movement counter
      setMovementCount(prev => prev + 1);

      // Vibrate if enabled
      if (vibrationEnabled) {
        Vibration.vibrate(500);
      }
    }
  }, [motionDetected, vibrationEnabled]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleDetectionHistory = () => {
    navigation.navigate('History' as never);
  };

  const handleAdaptSettings = () => {
    navigation.navigate('Sensitivity' as never);
  };

  const handleSupportFAQ = () => {
    navigation.navigate('Help' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color={Colors.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Overview</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Motion Detection Circle / Visualizer */}
        <View style={styles.motionContainer}>
          {motionDetected ? (
            <Animated.View
              style={[
                styles.motionCircle,
                {
                  transform: [{ scale: scaleAnim }],
                  opacity: opacityAnim,
                }
              ]}
            >
              <Text style={styles.motionText}>Motion</Text>
              <Text style={styles.motionText}>Detected!</Text>
            </Animated.View>
          ) : (
            <View style={styles.visualizerContainer}>
              <View style={styles.visualizerBars}>
                {barAnimations.map((anim, index) => (
                  <Animated.View
                    key={index}
                    style={[
                      styles.visualizerBar,
                      {
                        height: anim.interpolate({
                          inputRange: [0.3, 1],
                          outputRange: [60, 140],
                        }),
                      }
                    ]}
                  />
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Movement Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>
            {movementCount} Movements in the last hour
          </Text>
          <Text style={styles.summarySubtitle}>
            Just now between {timeRange}
          </Text>

          <TouchableOpacity style={styles.historyButton} onPress={handleDetectionHistory}>
            <Text style={styles.historyButtonText}>Detection history</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {/* Get notified */}
          <View style={[styles.menuItem, styles.menuItemFirst]}>
            <Text style={styles.menuItemText}>Get notified</Text>
            <TouchableOpacity
              style={[styles.customToggle, notificationsEnabled && styles.customToggleActive]}
              onPress={() => handleNotificationToggle(!notificationsEnabled)}
              activeOpacity={0.8}
            >
              <View style={[styles.toggleThumb, notificationsEnabled && styles.toggleThumbActive]}>
                {notificationsEnabled && <Ionicons name="checkmark" size={14} color={Colors.white} />}
              </View>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.menuDivider} />

          {/* Adapt settings */}
          <TouchableOpacity style={styles.menuItem} onPress={handleAdaptSettings}>
            <Text style={styles.menuItemText}>Adapt settings</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.black} />
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.menuDivider} />

          {/* Support and FAQ */}
          <TouchableOpacity style={[styles.menuItem, styles.menuItemLast]} onPress={handleSupportFAQ}>
            <Text style={styles.menuItemText}>Support and FAQ</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.black} />
          </TouchableOpacity>
        </View>

        {/* Toast Notification */}
        {showToast && (
          <Animated.View
            style={[
              styles.toast,
              toastType === 'warning' && styles.toastWarning,
              toastType === 'info' && styles.toastInfo,
              {
                opacity: toastAnim,
                transform: [
                  {
                    translateY: toastAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    }),
                  },
                ],
              }
            ]}
          >
            <View style={styles.toastIcon}>
              <Ionicons
                name={
                  toastType === 'success' ? 'checkmark-circle' :
                  toastType === 'warning' ? 'alert-circle' :
                  'information-circle'
                }
                size={20}
                color={Colors.white}
              />
            </View>
            <Text style={styles.toastText}>{toastMessage}</Text>
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary, // DT Yellow background
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    marginTop: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.black,
    fontFamily: Typography.fontFamily.primary,
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  motionContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  motionCircle: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: (width * 0.6) / 2,
    backgroundColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  motionText: {
    fontSize: 24,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
    fontFamily: Typography.fontFamily.primary,
    textAlign: 'center',
  },
  visualizerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.6,
    height: width * 0.6,
  },
  visualizerBars: {
    flexDirection: 'row',
    alignItems: 'center', // Center-aligned instead of flex-end
    justifyContent: 'center',
    gap: 8,
    height: 120,
  },
  visualizerBar: {
    width: 16, // Thicker bars
    backgroundColor: Colors.black,
    borderRadius: 8,
    minHeight: 60,
  },
  summaryCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.black,
    fontFamily: Typography.fontFamily.primary,
    marginBottom: 4,
  },
  summarySubtitle: {
    fontSize: 14,
    color: Colors.gray600,
    fontFamily: Typography.fontFamily.primary,
    marginBottom: 16,
  },
  historyButton: {
    backgroundColor: Colors.gray100,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  historyButtonText: {
    fontSize: 14,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.black,
    fontFamily: Typography.fontFamily.primary,
  },
  menuContainer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  menuItem: {
    backgroundColor: Colors.white,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuItemFirst: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  menuItemLast: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  menuDivider: {
    height: 1,
    backgroundColor: Colors.gray200,
    marginHorizontal: 20,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.black,
    fontFamily: Typography.fontFamily.primary,
  },
  toast: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: Colors.black,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  toastWarning: {
    backgroundColor: '#dc2626', // Professional red background
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444', // Lighter red accent
  },
  toastInfo: {
    backgroundColor: '#2563eb', // Professional blue background
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6', // Lighter blue accent
  },
  toastIcon: {
    marginRight: 12,
  },
  toastText: {
    fontSize: 14,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.white,
    fontFamily: Typography.fontFamily.primary,
    lineHeight: 20,
    flex: 1,
  },

  customToggle: {
    width: 56,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.gray300,
    padding: 2,
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  customToggleActive: {
    backgroundColor: Colors.black,
  },
  toggleThumb: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
});

export default HomeScreen;
