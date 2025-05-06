import React from 'react';
import { Stack } from 'expo-router';

export default function RepairsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Repair Services',
        }}
      />
    </Stack>
  );
}