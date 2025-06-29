import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import DevicesScreen from '../screens/DevicesScreen';
import SensitivityScreen from '../screens/SensitivityScreen';
import HelpScreen from '../screens/HelpScreen';
import { Colors } from '../constants/theme';

export type RootStackParamList = {
  Home: undefined;
  History: undefined;
  Devices: undefined;
  Sensitivity: undefined;
  Help: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.primary },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Devices" component={DevicesScreen} />
      <Stack.Screen name="Sensitivity" component={SensitivityScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
