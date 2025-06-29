import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card } from '../components';
import { Colors, Typography, Spacing, Layout } from '../constants/theme';
import { Device } from '../types';
import { mockDevices } from '../utils/mockData';

const DevicesScreen: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>(mockDevices);

  const getSignalStrengthIcon = (strength: number) => {
    if (strength >= 80) return 'wifi';
    if (strength >= 60) return 'wifi-outline';
    if (strength >= 40) return 'cellular-outline';
    return 'cellular';
  };

  const getSignalStrengthColor = (strength: number) => {
    if (strength >= 80) return Colors.success;
    if (strength >= 60) return Colors.warning;
    return Colors.error;
  };

  const getBatteryIcon = (level?: number) => {
    if (!level) return null;
    if (level >= 75) return 'battery-full';
    if (level >= 50) return 'battery-half';
    if (level >= 25) return 'battery-charging';
    return 'battery-dead';
  };

  const getBatteryColor = (level?: number) => {
    if (!level) return Colors.gray400;
    if (level >= 50) return Colors.success;
    if (level >= 25) return Colors.warning;
    return Colors.error;
  };

  const handleDeviceAction = (device: Device, action: string) => {
    switch (action) {
      case 'rename':
        Alert.prompt(
          'Rename Device',
          `Enter new name for ${device.name}:`,
          [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Save', 
              onPress: (newName) => {
                if (newName) {
                  setDevices(prev => prev.map(d => 
                    d.id === device.id ? { ...d, name: newName } : d
                  ));
                }
              }
            },
          ],
          'plain-text',
          device.name
        );
        break;
      case 'remove':
        Alert.alert(
          'Remove Device',
          `Are you sure you want to remove ${device.name}?`,
          [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Remove', 
              style: 'destructive',
              onPress: () => {
                setDevices(prev => prev.filter(d => d.id !== device.id));
                Alert.alert('Removed', `${device.name} has been removed.`);
              }
            },
          ]
        );
        break;
      case 'test':
        Alert.alert('Testing Signal', `Testing signal strength for ${device.name}...`);
        break;
      case 'update':
        Alert.alert('Firmware Update', `Checking for updates for ${device.name}...`);
        break;
    }
  };

  const handleAddDevice = () => {
    Alert.alert(
      'Add New Device',
      'This would start the device setup flow.',
      [{ text: 'OK' }]
    );
  };

  const renderDevice = ({ item }: { item: Device }) => (
    <Card style={styles.deviceCard}>
      <View style={styles.deviceHeader}>
        <View style={styles.deviceInfo}>
          <View style={styles.deviceTitleRow}>
            <Text style={styles.deviceName}>{item.name}</Text>
            <View style={[styles.statusDot, { 
              backgroundColor: item.isOnline ? Colors.success : Colors.error 
            }]} />
          </View>
          <Text style={styles.deviceRoom}>{item.room}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.moreButton}
          onPress={() => {
            Alert.alert(
              item.name,
              'Choose an action:',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Rename', onPress: () => handleDeviceAction(item, 'rename') },
                { text: 'Test Signal', onPress: () => handleDeviceAction(item, 'test') },
                { text: 'Update Firmware', onPress: () => handleDeviceAction(item, 'update') },
                { text: 'Remove', style: 'destructive', onPress: () => handleDeviceAction(item, 'remove') },
              ]
            );
          }}
        >
          <Ionicons name="ellipsis-vertical" size={20} color={Colors.gray600} />
        </TouchableOpacity>
      </View>

      <View style={styles.deviceStats}>
        <View style={styles.statItem}>
          <Ionicons 
            name={getSignalStrengthIcon(item.signalStrength)} 
            size={20} 
            color={getSignalStrengthColor(item.signalStrength)} 
          />
          <Text style={styles.statText}>{item.signalStrength}%</Text>
        </View>

        {item.batteryLevel && (
          <View style={styles.statItem}>
            <Ionicons 
              name={getBatteryIcon(item.batteryLevel)} 
              size={20} 
              color={getBatteryColor(item.batteryLevel)} 
            />
            <Text style={styles.statText}>{item.batteryLevel}%</Text>
          </View>
        )}

        <View style={styles.statItem}>
          <Ionicons name="information-circle-outline" size={20} color={Colors.gray600} />
          <Text style={styles.statText}>v{item.firmwareVersion}</Text>
        </View>
      </View>

      <View style={styles.deviceFooter}>
        <Text style={styles.lastSeen}>
          Last seen: {item.lastSeen.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </Text>
        <Text style={[styles.status, { 
          color: item.isOnline ? Colors.success : Colors.error 
        }]}>
          {item.isOnline ? 'Online' : 'Offline'}
        </Text>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button
          title="Add Device"
          onPress={handleAddDevice}
          variant="primary"
          size="md"
          icon="add-circle-outline"
        />
      </View>

      <FlatList
        data={devices}
        renderItem={renderDevice}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    padding: Layout.screenPadding,
    alignItems: 'flex-end',
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: Layout.screenPadding,
    paddingTop: 0,
    paddingBottom: Layout.tabBarHeight,
  },
  deviceCard: {
    marginBottom: Spacing.md,
  },
  deviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  deviceName: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.black,
    fontFamily: Typography.fontFamily.primary,
    flex: 1,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: Spacing.sm,
  },
  deviceRoom: {
    fontSize: Typography.fontSize.base,
    color: Colors.gray600,
    fontFamily: Typography.fontFamily.primary,
  },
  moreButton: {
    padding: Spacing.sm,
  },
  deviceStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.gray100,
    borderRadius: 8,
  },
  statItem: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  statText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.gray700,
    fontFamily: Typography.fontFamily.primary,
  },
  deviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastSeen: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray600,
    fontFamily: Typography.fontFamily.primary,
  },
  status: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    fontFamily: Typography.fontFamily.primary,
  },
});

export default DevicesScreen;
