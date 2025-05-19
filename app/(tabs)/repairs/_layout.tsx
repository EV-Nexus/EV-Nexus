import React from 'react';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RepairsLayout() {
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
          headerTitle: 'Repair Services',
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: '600',
            color: colorScheme === 'dark' ? '#fff' : '#18181B',
          },
          headerLeft: () => <Ionicons name="construct-outline" size={28} color={colorScheme === 'dark' ? '#fff' : '#18181B'} />,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: 'Garage Details',
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: '600',
            color: colorScheme === 'dark' ? '#fff' : '#18181B',
          },
          headerLeft: () => <Ionicons name="construct-outline" size={28} color={colorScheme === 'dark' ? '#fff' : '#18181B'} />,
        }}
      />
    </Stack>
  );
}