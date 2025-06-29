import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { Card } from '../components';
import { Colors, Typography, Spacing, Layout } from '../constants/theme';
import { SensitivityLevel } from '../types';
import { useSettings } from '../context/SettingsContext';

const SensitivityScreen: React.FC = () => {
  const navigation = useNavigation();
  const { vibrationEnabled, setVibrationEnabled } = useSettings();
  const [sensitivity, setSensitivity] = useState<SensitivityLevel>('medium');
  const [smartMode, setSmartMode] = useState(true);
  const [customValue, setCustomValue] = useState(50);
  const [quietHours, setQuietHours] = useState({
    enabled: true,
    startTime: '22:00',
    endTime: '06:00',
  });

  const handleBack = () => {
    navigation.goBack();
  };

  const sensitivityLevels: { value: SensitivityLevel; label: string; description: string }[] = [
    { 
      value: 'low', 
      label: 'Low', 
      description: 'Detects only significant movement. Fewer false alarms.' 
    },
    { 
      value: 'medium', 
      label: 'Medium', 
      description: 'Balanced detection. Recommended for most homes.' 
    },
    { 
      value: 'high', 
      label: 'High', 
      description: 'Detects subtle movements. May increase false alarms.' 
    },
  ];

  const handleSensitivityChange = (level: SensitivityLevel) => {
    setSensitivity(level);
    if (smartMode) {
      Alert.alert(
        'Smart Mode Active',
        'Sensitivity will be automatically adjusted based on your patterns.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleSmartModeToggle = (value: boolean) => {
    setSmartMode(value);
    if (value) {
      Alert.alert(
        'Smart Mode Enabled',
        'HomeSense will learn your daily patterns and automatically adjust sensitivity to reduce false alarms.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleQuietHoursToggle = (value: boolean) => {
    setQuietHours(prev => ({ ...prev, enabled: value }));
  };

  const handleTimeChange = (type: 'start' | 'end') => {
    Alert.alert(
      'Set Time',
      `This would open a time picker for ${type} time.`,
      [{ text: 'OK' }]
    );
  };

  const handleVibrationToggle = (value: boolean) => {
    setVibrationEnabled(value);
    // You could add a toast here to confirm the change
  };

  const renderSensitivityOption = (option: typeof sensitivityLevels[0]) => (
    <TouchableOpacity
      key={option.value}
      style={[
        styles.sensitivityOption,
        sensitivity === option.value && styles.sensitivityOptionActive
      ]}
      onPress={() => handleSensitivityChange(option.value)}
    >
      <View style={styles.optionHeader}>
        <Text style={[
          styles.optionLabel,
          sensitivity === option.value && styles.optionLabelActive
        ]}>
          {option.label}
        </Text>
        <View style={[
          styles.radioButton,
          sensitivity === option.value && styles.radioButtonActive
        ]}>
          {sensitivity === option.value && (
            <View style={styles.radioButtonInner} />
          )}
        </View>
      </View>
      <Text style={[
        styles.optionDescription,
        sensitivity === option.value && styles.optionDescriptionActive
      ]}>
        {option.description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={Colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sensitivity Settings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Sensitivity Level */}
        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Sensitivity Level</Text>
            <TouchableOpacity onPress={() => Alert.alert('Info', 'Adjust how sensitive motion detection should be.')}>
              <Ionicons name="information-circle-outline" size={20} color={Colors.accent} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.sensitivityOptions}>
            {sensitivityLevels.map(renderSensitivityOption)}
          </View>
        </Card>

        {/* Smart Mode */}
        <Card style={styles.settingCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Smart Mode</Text>
              <Text style={styles.settingDescription}>
                AI learns your patterns and auto-adjusts sensitivity
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.customToggle, smartMode && styles.customToggleActive]}
              onPress={() => handleSmartModeToggle(!smartMode)}
              activeOpacity={0.8}
            >
              <View style={[styles.toggleThumb, smartMode && styles.toggleThumbActive]}>
                {smartMode && <Ionicons name="checkmark" size={14} color={Colors.white} />}
              </View>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Custom Sensitivity (only when Smart Mode is off) */}
        {!smartMode && (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>Custom Sensitivity</Text>
            <View style={styles.sliderContainer}>
              <Text style={styles.sliderLabel}>Low</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                value={customValue}
                onValueChange={setCustomValue}
                minimumTrackTintColor={Colors.black}
                maximumTrackTintColor={Colors.gray300}
                thumbStyle={{ backgroundColor: Colors.black }}
              />
              <Text style={styles.sliderLabel}>High</Text>
            </View>
            <Text style={styles.sliderValue}>{Math.round(customValue)}%</Text>
          </Card>
        )}

        {/* Quiet Hours */}
        <Card style={styles.settingCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Quiet Hours</Text>
              <Text style={styles.settingDescription}>
                Reduce sensitivity during specified hours
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.customToggle, quietHours.enabled && styles.customToggleActive]}
              onPress={() => handleQuietHoursToggle(!quietHours.enabled)}
              activeOpacity={0.8}
            >
              <View style={[styles.toggleThumb, quietHours.enabled && styles.toggleThumbActive]}>
                {quietHours.enabled && <Ionicons name="checkmark" size={14} color={Colors.white} />}
              </View>
            </TouchableOpacity>
          </View>

          {quietHours.enabled && (
            <View style={styles.timeSettings}>
              <TouchableOpacity 
                style={styles.timeButton}
                onPress={() => handleTimeChange('start')}
              >
                <Text style={styles.timeLabel}>Start Time</Text>
                <Text style={styles.timeValue}>{quietHours.startTime}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.timeButton}
                onPress={() => handleTimeChange('end')}
              >
                <Text style={styles.timeLabel}>End Time</Text>
                <Text style={styles.timeValue}>{quietHours.endTime}</Text>
              </TouchableOpacity>
            </View>
          )}
        </Card>

        {/* Vibration Feedback */}
        <Card style={styles.settingCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Vibration Feedback</Text>
              <Text style={styles.settingDescription}>
                Vibrate when motion is detected for immediate alerts
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.customToggle, vibrationEnabled && styles.customToggleActive]}
              onPress={() => handleVibrationToggle(!vibrationEnabled)}
              activeOpacity={0.8}
            >
              <View style={[styles.toggleThumb, vibrationEnabled && styles.toggleThumbActive]}>
                {vibrationEnabled && <Ionicons name="checkmark" size={14} color={Colors.white} />}
              </View>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Tips */}
        <Card style={[styles.section, styles.tipsSection]}>
          <View style={styles.tipsHeader}>
            <Ionicons name="bulb-outline" size={24} color={Colors.accent} />
            <Text style={styles.tipsTitle}>Tips for Better Detection</Text>
          </View>
          
          <View style={styles.tipsList}>
            <Text style={styles.tipItem}>• Place devices 6-8 feet high for optimal coverage</Text>
            <Text style={styles.tipItem}>• Avoid pointing sensors at windows or heat sources</Text>
            <Text style={styles.tipItem}>• Enable Smart Mode for automatic optimization</Text>
            <Text style={styles.tipItem}>• Use Quiet Hours to reduce nighttime alerts</Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Layout.screenPadding,
    paddingBottom: 40,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.black,
    fontFamily: Typography.fontFamily.primary,
  },
  sensitivityOptions: {
    gap: Spacing.sm,
  },
  sensitivityOption: {
    padding: Spacing.md,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.gray300,
    backgroundColor: Colors.white,
  },
  sensitivityOptionActive: {
    borderColor: Colors.black,
    backgroundColor: Colors.gray100,
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  optionLabel: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.gray700,
    fontFamily: Typography.fontFamily.primary,
  },
  optionLabelActive: {
    color: Colors.black,
  },
  optionDescription: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray600,
    fontFamily: Typography.fontFamily.primary,
  },
  optionDescriptionActive: {
    color: Colors.gray700,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.gray400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonActive: {
    borderColor: Colors.black,
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.black,
  },
  settingCard: {
    marginBottom: 24,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  settingInfo: {
    flex: 1,
    marginRight: 20,
  },
  settingTitle: {
    fontSize: 17,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.gray900,
    fontFamily: Typography.fontFamily.primary,
    marginBottom: 6,
    lineHeight: 22,
  },
  settingDescription: {
    fontSize: 14,
    color: Colors.gray600,
    fontFamily: Typography.fontFamily.primary,
    lineHeight: 20,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.md,
  },
  sliderLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray600,
    fontFamily: Typography.fontFamily.primary,
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: Spacing.md,
  },
  sliderValue: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.black,
    fontFamily: Typography.fontFamily.primary,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  timeSettings: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.md,
  },
  timeButton: {
    flex: 1,
    padding: Spacing.md,
    backgroundColor: Colors.gray100,
    borderRadius: 8,
    alignItems: 'center',
  },
  timeLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray600,
    fontFamily: Typography.fontFamily.primary,
    marginBottom: Spacing.xs,
  },
  timeValue: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.black,
    fontFamily: Typography.fontFamily.primary,
  },
  tipsSection: {
    backgroundColor: Colors.secondary,
    borderWidth: 1,
    borderColor: Colors.accent,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  tipsTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.black,
    fontFamily: Typography.fontFamily.primary,
    marginLeft: Spacing.sm,
  },
  tipsList: {
    gap: Spacing.sm,
  },
  tipItem: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray700,
    fontFamily: Typography.fontFamily.primary,
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.sm,
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

export default SensitivityScreen;
