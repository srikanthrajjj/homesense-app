import { Device, MotionEvent, FAQItem } from '../types';

/**
 * Test utilities for HomeSense app
 */

export const generateRandomMotionEvent = (): MotionEvent => {
  const now = new Date();
  const randomMinutesAgo = Math.floor(Math.random() * 1440); // Random time in last 24 hours
  const timestamp = new Date(now.getTime() - randomMinutesAgo * 60000);
  
  const devices = ['living-room-1', 'kitchen-1', 'bedroom-1', 'office-1'];
  const rooms = ['Living Room', 'Kitchen', 'Bedroom', 'Office'];
  const deviceIndex = Math.floor(Math.random() * devices.length);
  
  return {
    id: `motion-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    deviceId: devices[deviceIndex],
    timestamp: timestamp.toISOString(),
    confidence: Math.floor(Math.random() * 40) + 60, // 60-100% confidence
    room: rooms[deviceIndex],
    duration: Math.floor(Math.random() * 300) + 30, // 30-330 seconds
    isBookmarked: Math.random() > 0.9, // 10% chance of being bookmarked
  };
};

export const generateMotionHistory = (count: number = 50): MotionEvent[] => {
  return Array.from({ length: count }, () => generateRandomMotionEvent())
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const generateTestDevice = (id: string, room: string): Device => {
  const batteryLevel = Math.floor(Math.random() * 100);
  const signalStrength = Math.floor(Math.random() * 100);
  
  return {
    id,
    name: `HomeSense Sensor ${id.split('-').pop()}`,
    room,
    isOnline: Math.random() > 0.1, // 90% chance of being online
    batteryLevel,
    signalStrength,
    firmwareVersion: '2.1.4',
    lastSeen: new Date(Date.now() - Math.random() * 3600000).toISOString(), // Last hour
    model: 'HS-2024',
    serialNumber: `HS${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
  };
};

export const simulateRealTimeMotion = (callback: (event: MotionEvent) => void) => {
  const interval = setInterval(() => {
    if (Math.random() > 0.7) { // 30% chance of motion every interval
      callback(generateRandomMotionEvent());
    }
  }, 5000); // Check every 5 seconds

  return () => clearInterval(interval);
};

export const testUserFlows = {
  deviceSetup: {
    steps: [
      'Welcome screen displays correctly',
      'Device detection animation works',
      'Pairing process completes',
      'Room assignment saves correctly',
      'Setup completion shows success'
    ],
    expectedDuration: '3-5 minutes'
  },
  
  motionDetection: {
    steps: [
      'Dashboard shows current motion status',
      'Motion circle animates when active',
      'Real-time updates work correctly',
      'Confidence levels display accurately'
    ],
    expectedBehavior: 'Real-time updates every 2-3 seconds'
  },
  
  sensitivityAdjustment: {
    steps: [
      'Sensitivity levels can be changed',
      'Smart Mode toggle works',
      'Custom slider responds correctly',
      'Quiet hours can be configured'
    ],
    expectedResult: 'Settings persist across app restarts'
  },
  
  historyViewing: {
    steps: [
      'History loads with proper pagination',
      'Filtering by date works',
      'Export functionality triggers',
      'Bookmarking persists'
    ],
    expectedPerformance: 'List scrolls smoothly with 1000+ items'
  }
};

export const performanceMetrics = {
  appStartup: {
    target: '< 3 seconds',
    measurement: 'Time from launch to first screen'
  },
  
  navigationTransitions: {
    target: '< 300ms',
    measurement: 'Tab switching animation duration'
  },
  
  motionDetectionLatency: {
    target: '< 2 seconds',
    measurement: 'Time from motion to UI update'
  },
  
  historyLoading: {
    target: '< 1 second',
    measurement: 'Time to load 50 history items'
  }
};

export const accessibilityChecklist = [
  'All interactive elements have minimum 44px touch target',
  'Color contrast meets WCAG AA standards',
  'Screen reader labels are descriptive',
  'Focus indicators are visible',
  'Text scales properly with system font size',
  'Motion animations can be disabled',
  'Alternative text provided for icons'
];

export const deviceCompatibility = {
  iOS: {
    minimum: '13.0',
    recommended: '15.0+',
    tested: ['iPhone 12', 'iPhone 13', 'iPhone 14', 'iPad Air', 'iPad Pro']
  },
  
  Android: {
    minimum: 'API 21 (Android 5.0)',
    recommended: 'API 30+ (Android 11+)',
    tested: ['Samsung Galaxy S21', 'Google Pixel 6', 'OnePlus 9']
  }
};

export const securityFeatures = [
  'End-to-end encryption for all device communication',
  'Local data storage with encryption at rest',
  'No video or audio recording capabilities',
  'WiFi signal analysis only (privacy-preserving)',
  'Secure device pairing with certificate validation',
  'Regular security updates via OTA firmware'
];

export const troubleshootingGuide = {
  deviceNotFound: [
    'Ensure device is powered on and LED is blinking',
    'Check WiFi network connectivity',
    'Move closer to the device during setup',
    'Restart the device by unplugging for 10 seconds'
  ],
  
  poorSignalStrength: [
    'Relocate device to reduce interference',
    'Check for obstacles between device and router',
    'Update router firmware',
    'Consider WiFi extender if needed'
  ],
  
  falseAlarms: [
    'Adjust sensitivity to lower setting',
    'Enable Smart Mode for automatic learning',
    'Configure Quiet Hours for nighttime',
    'Check for heat sources or moving objects nearby'
  ],
  
  appCrashing: [
    'Force close and restart the app',
    'Check for app updates in store',
    'Restart device if problem persists',
    'Contact support with device model and error details'
  ]
};

export default {
  generateRandomMotionEvent,
  generateMotionHistory,
  generateTestDevice,
  simulateRealTimeMotion,
  testUserFlows,
  performanceMetrics,
  accessibilityChecklist,
  deviceCompatibility,
  securityFeatures,
  troubleshootingGuide
};
