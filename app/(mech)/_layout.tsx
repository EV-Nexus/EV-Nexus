import React from 'react';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function MechLayout() {
    const colorScheme = useColorScheme();
    return (
        <Stack
            screenOptions={{
                headerTintColor: '#18181B',
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen
                name="request"
                options={{
                    title: 'Request Repair',
                    headerTitleStyle: {
                        color: colorScheme === 'dark' ? '#fff' : '#18181B',
                    },
                    headerBackButtonDisplayMode: 'minimal',
                    headerTintColor: colorScheme === 'dark' ? '#fff' : '#18181B',
                }}
            />
            <Stack.Screen
                name="confirmation"
                options={{
                    title: 'Repair Confirmation',
                    headerTitleStyle: {
                        color: colorScheme === 'dark' ? '#fff' : '#18181B',
                    },
                    headerBackButtonDisplayMode: 'minimal',
                    headerTintColor: colorScheme === 'dark' ? '#fff' : '#18181B',
                }}
            />
            <Stack.Screen
                name="feedback"
                options={{
                    title: 'Feedback',
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