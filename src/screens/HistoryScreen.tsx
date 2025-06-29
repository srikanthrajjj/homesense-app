import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Layout } from '../constants/theme';

interface MotionEventDetails {
  location: string;
  duration: string;
  confidence: number;
  deviceCount: number;
  description: string;
}

interface MotionEvent {
  id: string;
  time: string;
  details?: MotionEventDetails;
  expanded?: boolean;
}

interface DayGroup {
  date: string;
  events: MotionEvent[];
}

const HistoryScreen: React.FC = () => {
  const navigation = useNavigation();
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());

  // Enhanced mock data with structured details
  const historyData: DayGroup[] = [
    {
      date: 'Today',
      events: [
        {
          id: '1',
          time: '14:30',
          details: {
            location: 'Living Room',
            duration: '2m 15s',
            confidence: 95,
            deviceCount: 3,
            description: 'Motion detected in the main living area. Multiple devices confirmed the activity.'
          }
        },
        {
          id: '2',
          time: '12:15',
          details: {
            location: 'Front Entrance',
            duration: '45s',
            confidence: 87,
            deviceCount: 2,
            description: 'Brief motion detected near the front door area.'
          }
        },
      ]
    },
    {
      date: 'Yesterday',
      events: [
        {
          id: '3',
          time: '18:45',
          details: {
            location: 'Kitchen',
            duration: '5m 30s',
            confidence: 92,
            deviceCount: 4,
            description: 'Extended motion activity detected. If this was unexpected, you might want to check your security settings.'
          }
        },
        {
          id: '4',
          time: '15:20',
          details: {
            location: 'Hallway',
            duration: '1m 20s',
            confidence: 88,
            deviceCount: 2,
            description: 'Motion detected in the main hallway connecting rooms.'
          }
        },
      ]
    },
    {
      date: 'Wednesday - 12/12/2025',
      events: [
        {
          id: '5',
          time: '09:20',
          details: {
            location: 'Bedroom',
            duration: '1m 05s',
            confidence: 78,
            deviceCount: 1,
            description: 'Light motion activity detected in the bedroom area.'
          }
        },
        {
          id: '6',
          time: '16:45',
          details: {
            location: 'Back Door',
            duration: '30s',
            confidence: 89,
            deviceCount: 2,
            description: 'Quick motion detected near the back entrance.'
          }
        },
        {
          id: '7',
          time: '11:30',
          details: {
            location: 'Garage',
            duration: '3m 45s',
            confidence: 94,
            deviceCount: 3,
            description: 'Motion detected in garage area with high confidence.'
          }
        },
        {
          id: '8',
          time: '08:15',
          details: {
            location: 'Living Room',
            duration: '2m 10s',
            confidence: 91,
            deviceCount: 4,
            description: 'Morning activity detected in the living room.'
          }
        },
        {
          id: '9',
          time: '19:22',
          details: {
            location: 'Kitchen',
            duration: '4m 20s',
            confidence: 85,
            deviceCount: 3,
            description: 'Evening motion activity in the kitchen area.'
          }
        },
      ]
    }
  ];

  const toggleExpanded = (eventId: string) => {
    const newExpanded = new Set(expandedEvents);
    if (newExpanded.has(eventId)) {
      newExpanded.delete(eventId);
    } else {
      newExpanded.add(eventId);
    }
    setExpandedEvents(newExpanded);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const getConfidenceIcon = (confidence: number) => {
    if (confidence >= 90) return 'checkmark-circle';
    if (confidence >= 75) return 'checkmark-circle-outline';
    if (confidence >= 60) return 'alert-circle-outline';
    return 'warning-outline';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return '#16a34a'; // Dark green for excellent visibility
    if (confidence >= 75) return '#2563eb'; // Dark blue for good visibility
    if (confidence >= 60) return '#ea580c'; // Dark orange for fair visibility
    return '#dc2626'; // Dark red for poor visibility
  };

  const renderMotionEvent = (event: MotionEvent, isLast: boolean, isFirst: boolean) => {
    const isExpanded = expandedEvents.has(event.id);

    return (
      <View key={event.id} style={styles.eventContainer}>
        {/* Event card with left border accent */}
        <TouchableOpacity
          style={[
            styles.eventCard,
            isExpanded && styles.eventCardExpanded
          ]}
          onPress={() => toggleExpanded(event.id)}
          activeOpacity={0.8}
        >
          <View style={styles.eventHeader}>
            <View style={styles.eventTitleContainer}>
              <Text style={styles.eventTitle}>Motion has been detected</Text>
              <View style={styles.eventMeta}>
                <Text style={styles.eventTime}>{event.time}</Text>
                <View style={styles.statusDot} />
              </View>
            </View>
            <Ionicons
              name={isExpanded ? "chevron-up" : "chevron-down"}
              size={24}
              color={Colors.gray600}
            />
          </View>

          {isExpanded && event.details && (
            <Animated.View style={styles.eventDetails}>
              <View style={styles.detailsSeparator} />

              {/* Location */}
              <View style={styles.detailRow}>
                <View style={styles.iconContainer}>
                  <Ionicons name="location-outline" size={18} color={Colors.gray600} />
                </View>
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Location</Text>
                  <Text style={styles.detailValue}>{event.details.location}</Text>
                </View>
              </View>

              {/* Duration */}
              <View style={styles.detailRow}>
                <View style={styles.iconContainer}>
                  <Ionicons name="time-outline" size={18} color={Colors.gray600} />
                </View>
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Duration</Text>
                  <Text style={styles.detailValue}>{event.details.duration}</Text>
                </View>
              </View>

              {/* Confidence */}
              <View style={styles.detailRow}>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name={getConfidenceIcon(event.details.confidence)}
                    size={18}
                    color={getConfidenceColor(event.details.confidence)}
                  />
                </View>
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Confidence Level</Text>
                  <Text style={[styles.detailValue, { color: getConfidenceColor(event.details.confidence) }]}>
                    {event.details.confidence}% accuracy
                  </Text>
                </View>
              </View>

              {/* Devices */}
              <View style={styles.detailRow}>
                <View style={styles.iconContainer}>
                  <Ionicons name="hardware-chip-outline" size={18} color={Colors.gray600} />
                </View>
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Detecting Devices</Text>
                  <Text style={styles.detailValue}>{event.details.deviceCount} sensors active</Text>
                </View>
              </View>

              {/* Description */}
              <View style={styles.descriptionContainer}>
                <Ionicons name="information-circle-outline" size={16} color={Colors.gray600} style={styles.descriptionIcon} />
                <Text style={styles.descriptionText}>{event.details.description}</Text>
              </View>
            </Animated.View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const renderDayGroup = (dayGroup: DayGroup, groupIndex: number) => (
    <View key={dayGroup.date} style={styles.dayGroup}>
      {/* Day header with modern design */}
      <View style={styles.dayHeader}>
        <View style={styles.dayIndicator}>
          <Text style={styles.dayIndicatorText}>{dayGroup.events.length}</Text>
        </View>
        <Text style={styles.dayTitle}>{dayGroup.date}</Text>
      </View>

      {/* Events container with clean spacing */}
      <View style={styles.eventsContainer}>
        {dayGroup.events.map((event, index) =>
          renderMotionEvent(
            event,
            index === dayGroup.events.length - 1,
            index === 0
          )
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={Colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detection history</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Timeline Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.timeline}>
          {historyData.map((dayGroup, index) => renderDayGroup(dayGroup, index))}
        </View>
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
    paddingHorizontal: Layout.screenPadding,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
  },
  backButton: {
    padding: Spacing.xs,
    marginRight: Spacing.sm,
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
    paddingHorizontal: Layout.screenPadding,
    paddingBottom: Spacing.xl,
  },
  timeline: {
    paddingTop: Spacing.md,
  },
  dayGroup: {
    marginBottom: Spacing.xl * 1.5,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.sm,
  },
  dayIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  dayIndicatorText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
    fontFamily: Typography.fontFamily.primary,
  },
  dayTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.black,
    fontFamily: Typography.fontFamily.primary,
  },
  eventsContainer: {
    gap: Spacing.md,
  },
  eventContainer: {
    // Clean container without complex positioning
  },
  eventCard: {
    backgroundColor: Colors.gray100,
    borderRadius: 16,
    padding: Spacing.lg,
    marginHorizontal: Spacing.sm,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  eventCardExpanded: {
    backgroundColor: Colors.gray200,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  eventTitleContainer: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  eventTitle: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.black,
    fontFamily: Typography.fontFamily.primary,
    marginBottom: Spacing.xs,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  eventTime: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray600,
    fontFamily: Typography.fontFamily.primary,
    fontWeight: Typography.fontWeight.medium,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.success,
  },
  eventDetails: {
    overflow: 'hidden',
    paddingTop: Spacing.sm,
  },
  detailsSeparator: {
    height: 1,
    backgroundColor: Colors.gray300,
    marginBottom: Spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.xs,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  detailContent: {
    flex: 1,
    justifyContent: 'center',
  },
  detailLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.gray600,
    fontFamily: Typography.fontFamily.primary,
    fontWeight: Typography.fontWeight.medium,
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: Typography.fontSize.md,
    color: Colors.black,
    fontFamily: Typography.fontFamily.primary,
    fontWeight: Typography.fontWeight.semibold,
    lineHeight: 20,
  },
  descriptionContainer: {
    backgroundColor: Colors.gray50,
    borderRadius: 12,
    padding: Spacing.md,
    marginTop: Spacing.sm,
    marginHorizontal: Spacing.xs,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  descriptionIcon: {
    marginRight: Spacing.sm,
    marginTop: 2,
  },
  descriptionText: {
    flex: 1,
    fontSize: Typography.fontSize.sm,
    color: Colors.gray700,
    fontFamily: Typography.fontFamily.primary,
    lineHeight: 20,
  },
});

export default HistoryScreen;
