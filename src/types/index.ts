// Navigation Types
export type RootTabParamList = {
  Home: undefined;
  History: undefined;
  Devices: undefined;
  Sensitivity: undefined;
  Help: undefined;
};

export type SetupStackParamList = {
  Welcome: undefined;
  DeviceDetection: undefined;
  DevicePairing: undefined;
  RoomAssignment: undefined;
  SetupComplete: undefined;
};

export type SetupStackParamList = {
  Welcome: undefined;
  DeviceDetection: undefined;
  DevicePairing: undefined;
  RoomAssignment: undefined;
  SetupSuccess: undefined;
};

// Device Types
export interface Device {
  id: string;
  name: string;
  room: string;
  isOnline: boolean;
  signalStrength: number; // 0-100
  firmwareVersion: string;
  lastSeen: Date;
  batteryLevel?: number; // 0-100, optional for battery-powered devices
}

export interface DeviceSettings {
  deviceId: string;
  sensitivity: SensitivityLevel;
  smartMode: boolean;
  notifications: boolean;
  quietHours: {
    enabled: boolean;
    startTime: string; // HH:MM format
    endTime: string;   // HH:MM format
  };
}

// Motion Detection Types
export interface MotionEvent {
  id: string;
  deviceId: string;
  deviceName: string;
  room: string;
  timestamp: Date;
  confidence: number; // 0-100
  duration: number;   // in seconds
  type: 'person' | 'pet' | 'object' | 'unknown';
}

export interface MotionStatus {
  isActive: boolean;
  lastDetection?: Date;
  activeDevices: string[]; // device IDs currently detecting motion
  confidence: number;
}

// Sensitivity Types
export type SensitivityLevel = 'low' | 'medium' | 'high';

export interface SensitivitySettings {
  level: SensitivityLevel;
  smartMode: boolean;
  customThreshold?: number; // 0-100, only used when not in smart mode
}

// Room Types
export interface Room {
  id: string;
  name: string;
  devices: Device[];
  motionStatus: MotionStatus;
}

// History Types
export interface HistoryFilter {
  dateRange: {
    start: Date;
    end: Date;
  };
  rooms: string[]; // room IDs
  devices: string[]; // device IDs
  motionTypes: ('person' | 'pet' | 'object' | 'unknown')[];
}

export interface HistoryEntry extends MotionEvent {
  // Additional fields for history view
  isRead: boolean;
  isBookmarked: boolean;
}

// Help & FAQ Types
export interface FAQItem {
  id: string;
  category: FAQCategory;
  question: string;
  answer: string;
  tags: string[];
  isExpanded?: boolean;
}

export type FAQCategory = 'setup' | 'privacy' | 'troubleshooting' | 'features' | 'billing';

export interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: Date;
  updatedAt: Date;
}

// App State Types
export interface AppState {
  user: {
    id: string;
    name: string;
    email: string;
    preferences: UserPreferences;
  };
  devices: Device[];
  rooms: Room[];
  motionHistory: HistoryEntry[];
  currentMotionStatus: MotionStatus;
  settings: AppSettings;
  isSetupComplete: boolean;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: {
    push: boolean;
    email: boolean;
    sms: boolean;
  };
  privacy: {
    dataSharing: boolean;
    analytics: boolean;
  };
}

export interface AppSettings {
  sensitivity: SensitivitySettings;
  notifications: {
    enabled: boolean;
    quietHours: {
      enabled: boolean;
      startTime: string;
      endTime: string;
    };
    types: {
      motion: boolean;
      deviceOffline: boolean;
      lowBattery: boolean;
      firmwareUpdate: boolean;
    };
  };
  privacy: {
    dataRetention: number; // days
    shareAnonymousData: boolean;
  };
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  timestamp: Date;
}

// Component Props Types
export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
}

export interface CardProps {
  children: React.ReactNode;
  style?: any;
  onPress?: () => void;
  shadow?: boolean;
}

export interface MotionCircleProps {
  isActive: boolean;
  confidence: number;
  size?: number;
  animated?: boolean;
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
