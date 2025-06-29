import { Device, MotionEvent, HistoryEntry, FAQItem, Room, MotionStatus } from '../types';

// Mock Devices
export const mockDevices: Device[] = [
  {
    id: 'device-1',
    name: 'Living Room Sensor',
    room: 'Living Room',
    isOnline: true,
    signalStrength: 85,
    firmwareVersion: '2.1.4',
    lastSeen: new Date(),
    batteryLevel: 78,
  },
  {
    id: 'device-2',
    name: 'Bedroom Sensor',
    room: 'Bedroom',
    isOnline: true,
    signalStrength: 92,
    firmwareVersion: '2.1.4',
    lastSeen: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    batteryLevel: 65,
  },
  {
    id: 'device-3',
    name: 'Kitchen Sensor',
    room: 'Kitchen',
    isOnline: false,
    signalStrength: 45,
    firmwareVersion: '2.1.2',
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    batteryLevel: 23,
  },
  {
    id: 'device-4',
    name: 'Front Door Sensor',
    room: 'Entrance',
    isOnline: true,
    signalStrength: 78,
    firmwareVersion: '2.1.4',
    lastSeen: new Date(Date.now() - 30 * 1000), // 30 seconds ago
  },
];

// Mock Motion Events
export const mockMotionEvents: MotionEvent[] = [
  {
    id: 'motion-1',
    deviceId: 'device-1',
    deviceName: 'Living Room Sensor',
    room: 'Living Room',
    timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
    confidence: 95,
    duration: 45,
    type: 'person',
  },
  {
    id: 'motion-2',
    deviceId: 'device-4',
    deviceName: 'Front Door Sensor',
    room: 'Entrance',
    timestamp: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
    confidence: 88,
    duration: 12,
    type: 'person',
  },
  {
    id: 'motion-3',
    deviceId: 'device-2',
    deviceName: 'Bedroom Sensor',
    room: 'Bedroom',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    confidence: 72,
    duration: 180,
    type: 'person',
  },
  {
    id: 'motion-4',
    deviceId: 'device-1',
    deviceName: 'Living Room Sensor',
    room: 'Living Room',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    confidence: 65,
    duration: 8,
    type: 'pet',
  },
  {
    id: 'motion-5',
    deviceId: 'device-4',
    deviceName: 'Front Door Sensor',
    room: 'Entrance',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    confidence: 92,
    duration: 25,
    type: 'person',
  },
];

// Mock History Entries
export const mockHistoryEntries: HistoryEntry[] = mockMotionEvents.map(event => ({
  ...event,
  isRead: Math.random() > 0.3, // 70% read
  isBookmarked: Math.random() > 0.8, // 20% bookmarked
}));

// Mock Current Motion Status
export const mockCurrentMotionStatus: MotionStatus = {
  isActive: true,
  lastDetection: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
  activeDevices: ['device-1'],
  confidence: 87,
};

// Mock Rooms
export const mockRooms: Room[] = [
  {
    id: 'room-1',
    name: 'Living Room',
    devices: [mockDevices[0]],
    motionStatus: {
      isActive: true,
      lastDetection: new Date(Date.now() - 2 * 60 * 1000),
      activeDevices: ['device-1'],
      confidence: 87,
    },
  },
  {
    id: 'room-2',
    name: 'Bedroom',
    devices: [mockDevices[1]],
    motionStatus: {
      isActive: false,
      lastDetection: new Date(Date.now() - 2 * 60 * 60 * 1000),
      activeDevices: [],
      confidence: 0,
    },
  },
  {
    id: 'room-3',
    name: 'Kitchen',
    devices: [mockDevices[2]],
    motionStatus: {
      isActive: false,
      lastDetection: new Date(Date.now() - 8 * 60 * 60 * 1000),
      activeDevices: [],
      confidence: 0,
    },
  },
  {
    id: 'room-4',
    name: 'Entrance',
    devices: [mockDevices[3]],
    motionStatus: {
      isActive: false,
      lastDetection: new Date(Date.now() - 25 * 60 * 1000),
      activeDevices: [],
      confidence: 0,
    },
  },
];

// Mock FAQ Items
export const mockFAQItems: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'setup',
    question: 'How do I set up my first HomeSense device?',
    answer: 'Setting up your HomeSense device is easy! Simply open the app, tap "Add Device", and follow the step-by-step instructions. Make sure your device is powered on and within range of your WiFi network.',
    tags: ['setup', 'device', 'wifi'],
  },
  {
    id: 'faq-2',
    category: 'privacy',
    question: 'What data does HomeSense collect?',
    answer: 'HomeSense only collects motion detection data and device status information. We do not use cameras or record audio. All data is encrypted and stored securely according to Deutsche Telekom privacy standards.',
    tags: ['privacy', 'data', 'security'],
  },
  {
    id: 'faq-3',
    category: 'troubleshooting',
    question: 'Why is my device showing as offline?',
    answer: 'If your device appears offline, check: 1) Power connection, 2) WiFi signal strength, 3) Device placement. Try restarting the device by unplugging for 10 seconds, then plugging back in.',
    tags: ['offline', 'troubleshooting', 'wifi'],
  },
  {
    id: 'faq-4',
    category: 'features',
    question: 'How does Smart Mode work?',
    answer: 'Smart Mode uses AI to learn your daily patterns and automatically adjusts sensitivity. It reduces false alarms by understanding when movement is expected (like your morning routine) versus unexpected activity.',
    tags: ['smart mode', 'ai', 'sensitivity'],
  },
  {
    id: 'faq-5',
    category: 'troubleshooting',
    question: 'How can I improve motion detection accuracy?',
    answer: 'For best results: 1) Place devices 6-8 feet high, 2) Avoid pointing at windows or heat sources, 3) Adjust sensitivity in the app, 4) Enable Smart Mode for automatic optimization.',
    tags: ['accuracy', 'placement', 'sensitivity'],
  },
];

// Utility functions for mock data
export const getRandomMotionEvent = (): MotionEvent => {
  const devices = mockDevices.filter(d => d.isOnline);
  const randomDevice = devices[Math.floor(Math.random() * devices.length)];
  
  return {
    id: `motion-${Date.now()}`,
    deviceId: randomDevice.id,
    deviceName: randomDevice.name,
    room: randomDevice.room,
    timestamp: new Date(),
    confidence: Math.floor(Math.random() * 40) + 60, // 60-100
    duration: Math.floor(Math.random() * 120) + 5, // 5-125 seconds
    type: Math.random() > 0.8 ? 'pet' : 'person',
  };
};

export const updateMockMotionStatus = (isActive: boolean): MotionStatus => {
  if (isActive) {
    const activeDevice = mockDevices.find(d => d.isOnline);
    return {
      isActive: true,
      lastDetection: new Date(),
      activeDevices: activeDevice ? [activeDevice.id] : [],
      confidence: Math.floor(Math.random() * 30) + 70, // 70-100
    };
  }
  
  return {
    isActive: false,
    lastDetection: mockCurrentMotionStatus.lastDetection,
    activeDevices: [],
    confidence: 0,
  };
};
