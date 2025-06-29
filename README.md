# HomeSense - Smart Home Motion Detection 🏠

A privacy-first mobile app for Deutsche Telekom that detects motion using WiFi signals without cameras.

## 🏠 Overview

HomeSense uses advanced WiFi technology to detect motion in your home while protecting your privacy. No cameras, no video recording - just intelligent motion detection through WiFi signal analysis.

### Key Features

- **Privacy-First**: No cameras or audio recording
- **Real-Time Detection**: Live motion monitoring with confidence levels
- **Smart Learning**: AI-powered pattern recognition to reduce false alarms
- **Multi-Device Support**: Manage multiple sensors across different rooms
- **Comprehensive History**: Timeline view with filtering and export options
- **Customizable Sensitivity**: Adjust detection levels for each room
- **Deutsche Telekom Design**: Follows DT brand guidelines and accessibility standards

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd HomeSense
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your preferred platform:
- **iOS**: Press `i` or scan QR code with Camera app
- **Android**: Press `a` or scan QR code with Expo Go
- **Web**: Press `w` to open in browser

## 📱 App Structure

### Navigation

The app uses bottom tab navigation with 5 main sections:

1. **Home** - Live motion detection dashboard
2. **History** - Motion detection timeline and analytics
3. **Devices** - Device management and settings
4. **Sensitivity** - Detection sensitivity controls
5. **Help** - FAQ and support

### Key Screens

#### Home Dashboard
- Real-time motion status with animated circle
- Current detection confidence levels
- Quick access to device controls
- System status indicators

#### Device Setup Flow
1. **Welcome** - Introduction and feature overview
2. **Detection** - Automatic device discovery
3. **Pairing** - Secure device connection
4. **Room Assignment** - Location configuration
5. **Complete** - Setup confirmation and next steps

#### Sensitivity Controls
- Low/Medium/High sensitivity presets
- Smart Mode with AI learning
- Custom sensitivity slider
- Quiet Hours configuration

## 🎨 Design System

### Brand Colors (Deutsche Telekom)
- **Primary**: `#FFEF00` (DT Yellow)
- **Accent**: `#d0006f` (DT Magenta)
- **Text**: `#000000` (Black)
- **Background**: `#FFFFFF` (White)

### Typography
- **Font Family**: TeleNeo (DT brand font)
- **Sizes**: 12px - 48px scale
- **Weights**: Regular, Medium, Semibold, Bold

### Components
- **Buttons**: 24px border radius, minimum 44px touch target
- **Cards**: 12px border radius, subtle shadows
- **Icons**: Ionicons with consistent sizing

## 🔧 Technical Architecture

### Tech Stack
- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation 6
- **State Management**: React Hooks + Context
- **Styling**: StyleSheet with design tokens
- **Icons**: Expo Vector Icons (Ionicons)

### Project Structure
```
src/
├── components/          # Reusable UI components
├── constants/          # Theme, colors, typography
├── navigation/         # Navigation configuration
├── screens/           # Screen components
│   ├── setup/         # Device setup flow
│   └── main/          # Main app screens
├── types/             # TypeScript type definitions
└── utils/             # Utilities and helpers
```

### Key Components
- **Button**: Configurable button with variants and icons
- **Card**: Container component with consistent styling
- **MotionCircle**: Animated motion detection visualization

## 🧪 Testing

### Mock Data
The app includes comprehensive mock data for testing:
- Motion detection events with realistic timestamps
- Device information with battery and signal levels
- FAQ items with searchable content

### Test Utilities
Located in `src/utils/testHelpers.ts`:
- Motion event generators
- Device simulation
- Performance benchmarks
- Accessibility checklist

### User Flow Testing
1. **Device Setup**: Complete onboarding flow (3-5 minutes)
2. **Motion Detection**: Real-time updates and animations
3. **Sensitivity Adjustment**: Settings persistence
4. **History Viewing**: Performance with large datasets

## 🔒 Privacy & Security

### Privacy Features
- No video or audio recording capabilities
- WiFi signal analysis only (no personal data)
- Local data storage with encryption
- No cloud data transmission without consent

### Security Measures
- End-to-end encryption for device communication
- Secure device pairing with certificates
- Regular OTA security updates
- GDPR compliance for EU users

## 📊 Performance Targets

- **App Startup**: < 3 seconds
- **Navigation**: < 300ms transitions
- **Motion Detection**: < 2 seconds latency
- **History Loading**: < 1 second for 50 items

## ♿ Accessibility

- WCAG AA color contrast compliance
- Minimum 44px touch targets
- Screen reader support
- Scalable text support
- Motion reduction options

## 🌐 Internationalization

Currently supports:
- German (primary)
- English (secondary)

Prepared for additional languages with i18n structure.

## 🚀 Deployment

### Build Commands
```bash
# Development build
expo build:ios --type simulator
expo build:android --type apk

# Production build
expo build:ios --type archive
expo build:android --type app-bundle
```

### Environment Configuration
- Development: Local mock data
- Staging: Test device integration
- Production: Live device connectivity

## 📞 Support

### Troubleshooting
Common issues and solutions are available in the Help section of the app.

### Contact
- **Support Email**: homesense-support@telekom.de
- **Phone**: +49 800 330 1000
- **Live Chat**: Available in-app

## 📄 License

© 2024 Deutsche Telekom AG. All rights reserved.

## 🤝 Contributing

This is a proprietary Deutsche Telekom project. Internal contribution guidelines available in the company wiki.

---

**Built with ❤️ for Deutsche Telekom customers**
