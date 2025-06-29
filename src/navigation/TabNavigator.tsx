import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Layout } from '../constants/theme';
import { RootTabParamList } from '../types';

// Import screens (we'll create these next)
import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import DevicesScreen from '../screens/DevicesScreen';
import SensitivityScreen from '../screens/SensitivityScreen';
import HelpScreen from '../screens/HelpScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'History':
              iconName = focused ? 'time' : 'time-outline';
              break;
            case 'Devices':
              iconName = focused ? 'hardware-chip' : 'hardware-chip-outline';
              break;
            case 'Sensitivity':
              iconName = focused ? 'options' : 'options-outline';
              break;
            case 'Help':
              iconName = focused ? 'help-circle' : 'help-circle-outline';
              break;
            default:
              iconName = 'circle';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.black,
        tabBarInactiveTintColor: Colors.gray500,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopWidth: 1,
          borderTopColor: Colors.gray200,
          height: Layout.tabBarHeight,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontFamily: Typography.fontFamily.primary,
          fontSize: Typography.fontSize.xs,
          fontWeight: Typography.fontWeight.medium,
        },
        headerStyle: {
          backgroundColor: Colors.primary,
          height: Layout.headerHeight,
        },
        headerTitleStyle: {
          fontFamily: Typography.fontFamily.primary,
          fontSize: Typography.fontSize.xl,
          fontWeight: Typography.fontWeight.bold,
          color: Colors.black,
        },
        headerTintColor: Colors.black,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'HomeSense',
          headerTitle: 'Home Status',
        }}
      />
      <Tab.Screen 
        name="History" 
        component={HistoryScreen}
        options={{
          title: 'History',
          headerTitle: 'Detection History',
        }}
      />
      <Tab.Screen 
        name="Devices" 
        component={DevicesScreen}
        options={{
          title: 'Devices',
          headerTitle: 'My Devices',
        }}
      />
      <Tab.Screen 
        name="Sensitivity" 
        component={SensitivityScreen}
        options={{
          title: 'Sensitivity',
          headerTitle: 'Motion Settings',
        }}
      />
      <Tab.Screen 
        name="Help" 
        component={HelpScreen}
        options={{
          title: 'Help',
          headerTitle: 'Help & Support',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
