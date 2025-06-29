import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigator from './src/navigation/StackNavigator';
import { SettingsProvider } from './src/context/SettingsContext';
import { Colors } from './src/constants/theme';

export default function App() {
  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <NavigationContainer>
          <StackNavigator />
          <StatusBar style="dark" backgroundColor={Colors.primary} />
        </NavigationContainer>
      </SettingsProvider>
    </SafeAreaProvider>
  );
}
