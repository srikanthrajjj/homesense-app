// Deutsche Telekom HomeSense Design System
export const Colors = {
  // Primary DT Brand Colors
  primary: '#F6D046',      // DT Yellow - Main background
  secondary: '#FFFFFF',    // White - Secondary background
  accent: '#d0006f',       // Magenta - Links/tooltips
  
  // UI Colors
  black: '#000000',        // Buttons and text
  white: '#FFFFFF',        // Button text and cards
  
  // Status Colors
  success: '#00A651',      // Green for success states
  warning: '#FF6600',      // Orange for warnings
  error: '#E20074',        // Red for errors
  
  // Neutral Colors
  gray100: '#F5F5F5',
  gray200: '#E5E5E5',
  gray300: '#D4D4D4',
  gray400: '#A3A3A3',
  gray500: '#737373',
  gray600: '#525252',
  gray700: '#404040',
  gray800: '#262626',
  gray900: '#171717',
  
  // Motion Detection Colors
  motionActive: '#00FF88',    // Bright green for active motion
  motionInactive: '#E5E5E5',  // Gray for no motion
};

export const Typography = {
  // Font Family - TeleNeo with fallbacks
  fontFamily: {
    primary: 'TeleNeo, Inter, Helvetica Neue, Arial, sans-serif',
    mono: 'SF Mono, Monaco, Inconsolata, Roboto Mono, monospace',
  },
  
  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
  },
  
  // Font Weights
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  
  // Line Heights
  lineHeight: {
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 80,
  '5xl': 96,
};

export const BorderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,    // Primary button radius
  '3xl': 32,
  full: 9999,
};

export const Shadows = {
  sm: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  lg: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 5,
  },
};

export const Layout = {
  // Screen padding
  screenPadding: Spacing.md,
  
  // Component spacing
  componentSpacing: Spacing.lg,
  
  // Touch targets (minimum 44px for accessibility)
  minTouchTarget: 44,
  
  // Button heights
  buttonHeight: {
    sm: 36,
    md: 48,
    lg: 56,
  },
  
  // Header height
  headerHeight: 60,
  
  // Tab bar height
  tabBarHeight: 80,
};

export const Animation = {
  // Duration
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  
  // Easing
  easing: {
    easeInOut: 'ease-in-out',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    linear: 'linear',
  },
};

// Component-specific theme configurations
export const ComponentThemes = {
  button: {
    primary: {
      backgroundColor: Colors.black,
      color: Colors.white,
      borderRadius: BorderRadius['2xl'],
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      fontSize: Typography.fontSize.lg,
      fontWeight: Typography.fontWeight.bold,
    },
    secondary: {
      backgroundColor: Colors.white,
      color: Colors.black,
      borderRadius: BorderRadius['2xl'],
      borderWidth: 2,
      borderColor: Colors.black,
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      fontSize: Typography.fontSize.lg,
      fontWeight: Typography.fontWeight.bold,
    },
  },
  
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    ...Shadows.md,
  },
  
  input: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.gray300,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: Typography.fontSize.base,
  },
};

export default {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  Shadows,
  Layout,
  Animation,
  ComponentThemes,
};
