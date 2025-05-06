import React from 'react';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { ShoppingBag } from 'lucide-react-native';

export default function MarketplaceLayout() {
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
          title: 'EV Marketplace',
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: '600',
            color: colorScheme === 'dark' ? '#fff' : '#18181B',
          },
          headerLeft: () => (
            <ShoppingBag size={24} color={colorScheme === 'dark' ? '#fff' : '#18181B'} />
          ),
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Bike Details',
          headerTitleStyle: {
            color: colorScheme === 'dark' ? '#fff' : '#18181B',
          },
          headerBackButtonDisplayMode: 'minimal',
          headerTintColor: colorScheme === 'dark' ? '#fff' : '#18181B',
        }}
      />
    </Stack>
  );
}