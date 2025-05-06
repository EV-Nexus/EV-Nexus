import React from 'react';
import { Stack } from 'expo-router';

import { MOCK_USER } from '@/constants/mockData';

import Header from '@/components/home/Header';

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
          header: () => <Header userName={MOCK_USER.name} hasNotifications={true} />,
        }}
      />
    </Stack>
  );
}