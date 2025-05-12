import React from 'react';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileLayout() {
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
          headerTitle: 'Your Profile',
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: '600',
            color: colorScheme === 'dark' ? '#fff' : '#18181B',
          },
          headerLeft: () => <Ionicons name="person-outline" size={28} color={colorScheme === 'dark' ? '#fff' : '#18181B'} />,
        }}
      />
    </Stack>
  );
}