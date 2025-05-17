import React from 'react';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BatterySwapLayout() {
  const colorScheme = useColorScheme();
  return (
    <Stack
      screenOptions={{
        headerTintColor: '#18181B',
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Battery Swap Stations',
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: '600',
            color: colorScheme === 'dark' ? '#fff' : '#18181B',
          },
          headerLeft: () => <Ionicons name="battery-charging" size={28} color={colorScheme === 'dark' ? '#fff' : '#18181B'} />,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: 'Station Details',
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: '600',
            color: colorScheme === 'dark' ? '#fff' : '#18181B',
          },
          headerLeft: () => <Ionicons name="battery-charging" size={28} color={colorScheme === 'dark' ? '#fff' : '#18181B'} />,
        }}
      />
    </Stack>
  );
}