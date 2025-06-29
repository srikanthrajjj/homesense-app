import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card } from '../../components';
import { Colors, Typography, Spacing, Layout } from '../../constants/theme';
import { SetupStackParamList } from '../../types';

type RoomAssignmentScreenProps = {
  navigation: StackNavigationProp<SetupStackParamList, 'RoomAssignment'>;
};

interface Room {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const predefinedRooms: Room[] = [
  { id: '1', name: 'Living Room', icon: 'tv', description: 'Main living area' },
  { id: '2', name: 'Kitchen', icon: 'restaurant', description: 'Cooking and dining area' },
  { id: '3', name: 'Bedroom', icon: 'bed', description: 'Master bedroom' },
  { id: '4', name: 'Office', icon: 'desktop', description: 'Home office or study' },
  { id: '5', name: 'Hallway', icon: 'walk', description: 'Corridor or entrance' },
  { id: '6', name: 'Bathroom', icon: 'water', description: 'Bathroom or powder room' },
  { id: '7', name: 'Garage', icon: 'car', description: 'Garage or storage area' },
  { id: '8', name: 'Basement', icon: 'layers', description: 'Lower level or basement' },
];

const RoomAssignmentScreen: React.FC<RoomAssignmentScreenProps> = ({ navigation }) => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [customRoomName, setCustomRoomName] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleRoomSelect = (roomId: string) => {
    setSelectedRoom(roomId);
    setShowCustomInput(false);
    setCustomRoomName('');
  };

  const handleCustomRoom = () => {
    setShowCustomInput(true);
    setSelectedRoom(null);
  };

  const handleContinue = () => {
    if (!selectedRoom && !customRoomName.trim()) {
      Alert.alert('Room Required', 'Please select a room or enter a custom room name.');
      return;
    }

    const roomName = selectedRoom 
      ? predefinedRooms.find(r => r.id === selectedRoom)?.name 
      : customRoomName.trim();

    // In a real app, save the room assignment
    navigation.navigate('SetupComplete');
  };

  const renderRoomItem = ({ item }: { item: Room }) => (
    <TouchableOpacity
      style={[
        styles.roomItem,
        selectedRoom === item.id && styles.roomItemSelected
      ]}
      onPress={() => handleRoomSelect(item.id)}
    >
      <View style={[
        styles.roomIcon,
        selectedRoom === item.id && styles.roomIconSelected
      ]}>
        <Ionicons
          name={item.icon as any}
          size={24}
          color={selectedRoom === item.id ? Colors.white : Colors.gray600}
        />
      </View>
      
      <View style={styles.roomInfo}>
        <Text style={[
          styles.roomName,
          selectedRoom === item.id && styles.roomNameSelected
        ]}>
          {item.name}
        </Text>
        <Text style={[
          styles.roomDescription,
          selectedRoom === item.id && styles.roomDescriptionSelected
        ]}>
          {item.description}
        </Text>
      </View>

      {selectedRoom === item.id && (
        <Ionicons name="checkmark-circle" size={24} color={Colors.black} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.stepIndicator}>Step 3 of 4</Text>
        <Text style={styles.title}>Room Assignment</Text>
        <Text style={styles.subtitle}>
          Which room is your HomeSense sensor located in?
        </Text>
      </View>

      <View style={styles.content}>
        <FlatList
          data={predefinedRooms}
          renderItem={renderRoomItem}
          keyExtractor={(item) => item.id}
          style={styles.roomsList}
          showsVerticalScrollIndicator={false}
        />

        {/* Custom Room Option */}
        <Card style={styles.customRoomCard}>
          <TouchableOpacity
            style={[
              styles.customRoomHeader,
              showCustomInput && styles.customRoomHeaderActive
            ]}
            onPress={handleCustomRoom}
          >
            <View style={[
              styles.roomIcon,
              showCustomInput && styles.roomIconSelected
            ]}>
              <Ionicons
                name="add"
                size={24}
                color={showCustomInput ? Colors.white : Colors.gray600}
              />
            </View>
            
            <View style={styles.roomInfo}>
              <Text style={[
                styles.roomName,
                showCustomInput && styles.roomNameSelected
              ]}>
                Custom Room
              </Text>
              <Text style={[
                styles.roomDescription,
                showCustomInput && styles.roomDescriptionSelected
              ]}>
                Enter your own room name
              </Text>
            </View>

            {showCustomInput && (
              <Ionicons name="checkmark-circle" size={24} color={Colors.black} />
            )}
          </TouchableOpacity>

          {showCustomInput && (
            <View style={styles.customInputContainer}>
              <TextInput
                style={styles.customInput}
                placeholder="Enter room name..."
                value={customRoomName}
                onChangeText={setCustomRoomName}
                placeholderTextColor={Colors.gray500}
                autoFocus
              />
            </View>
          )}
        </Card>
      </View>

      <View style={styles.footer}>
        <Button
          title="Continue"
          onPress={handleContinue}
          variant="primary"
          size="lg"
          icon="arrow-forward"
          disabled={!selectedRoom && !customRoomName.trim()}
        />
        
        <Text style={styles.helpText}>
          You can change the room assignment later in device settings
        </Text>
      </View>
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
    alignItems: 'center',
  },
  stepIndicator: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray600,
    fontFamily: Typography.fontFamily.primary,
    marginBottom: Spacing.xs,
  },
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.black,
    fontFamily: Typography.fontFamily.primary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.gray600,
    fontFamily: Typography.fontFamily.primary,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: Layout.screenPadding,
  },
  roomsList: {
    flex: 1,
  },
  roomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: 12,
    marginBottom: Spacing.sm,
    borderWidth: 2,
    borderColor: Colors.transparent,
  },
  roomItemSelected: {
    borderColor: Colors.black,
    backgroundColor: Colors.gray100,
  },
  roomIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.gray200,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  roomIconSelected: {
    backgroundColor: Colors.black,
  },
  roomInfo: {
    flex: 1,
  },
  roomName: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.black,
    fontFamily: Typography.fontFamily.primary,
    marginBottom: Spacing.xs,
  },
  roomNameSelected: {
    color: Colors.black,
  },
  roomDescription: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray600,
    fontFamily: Typography.fontFamily.primary,
  },
  roomDescriptionSelected: {
    color: Colors.gray700,
  },
  customRoomCard: {
    marginTop: Spacing.md,
  },
  customRoomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.transparent,
    borderRadius: 12,
    padding: Spacing.md,
  },
  customRoomHeaderActive: {
    borderColor: Colors.black,
    backgroundColor: Colors.gray100,
  },
  customInputContainer: {
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  customInput: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: Spacing.md,
    fontSize: Typography.fontSize.base,
    fontFamily: Typography.fontFamily.primary,
    color: Colors.black,
    borderWidth: 1,
    borderColor: Colors.gray300,
  },
  footer: {
    padding: Layout.screenPadding,
    alignItems: 'center',
  },
  helpText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray600,
    fontFamily: Typography.fontFamily.primary,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});

export default RoomAssignmentScreen;
