import React from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { MapPin, Battery, Clock } from 'lucide-react-native';

import { Text, useThemeColor, View } from '@/components/Themed';

interface SwapStationCardProps {
  id: string;
  name: string;
  distance: number;
  batteryAvailable: number;
  openUntil: string;
  onPress: (id: string) => void;
}

export function SwapStationCard({
  id,
  name,
  distance,
  batteryAvailable,
  openUntil,
  onPress,
}: SwapStationCardProps) {
  const colorScheme = useColorScheme();

  const cardBgColor = useThemeColor({
    light: '#fff',
    dark: '#333',
  }, 'background');
  const iconColor = useThemeColor({}, 'text');

  // Determine battery availability color
  const getBatteryColor = () => {
    if (batteryAvailable > 5) return '#22C55E';
    if (batteryAvailable > 0) return '#EAB308';
    return '#EF4444';
  };

  // Format battery text
  const getBatteryText = () => {
    if (batteryAvailable > 5) return `${batteryAvailable} Available`;
    if (batteryAvailable > 0) return `${batteryAvailable} (Low Stock)`;
    return 'None Available';
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => onPress(id)}>
      <View style={[styles.card, { backgroundColor: cardBgColor }]}>
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.distanceContainer}>
            <MapPin size={14} color={iconColor} />
            <Text style={{ color: colorScheme === 'dark' ? '#E4E4E7' : '#52525B', fontSize: 14, marginLeft: 4}}>{distance.toFixed(1)} km</Text>
          </View>
        </View>

        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Battery size={18} color={getBatteryColor()} />
            <Text style={[styles.detailText, { color: getBatteryColor() }]}>
              {getBatteryText()}
            </Text>
          </View>

          <View style={styles.detailItem}>
            <Clock size={18} color={iconColor} />
            <Text style={{ color: colorScheme === 'dark' ? '#E4E4E7' : '#52525B', fontSize: 14, marginLeft: 6}}>Open until {openUntil}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  name: {
    fontWeight: 'semibold',
    fontSize: 16,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  detailText: {
    fontSize: 14,
    marginLeft: 6,
  },
});