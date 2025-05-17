import React from 'react';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function LeaseLayout() {
    const colorScheme = useColorScheme();
    return (
        <Stack
            screenOptions={{
                headerTintColor: '#18181B',
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen
                name="details"
                options={{
                    headerTitle: '1. Lease Details',
                    headerTitleStyle: {
                        color: colorScheme === 'dark' ? '#fff' : '#18181B',
                    },
                }}
            />
            <Stack.Screen
                name="rider-info"
                options={{
                    title: '2. Rider Information',
                    headerTitleStyle: {
                        color: colorScheme === 'dark' ? '#fff' : '#18181B',
                    },
                    headerBackButtonDisplayMode: 'minimal',
                    headerTintColor: colorScheme === 'dark' ? '#fff' : '#18181B',
                }}
            />
            <Stack.Screen
                name="confirm"
                options={{
                    title: '3. Confirm Lease Details',
                    headerTitleStyle: {
                        color: colorScheme === 'dark' ? '#fff' : '#18181B',
                    },
                    headerBackButtonDisplayMode: 'minimal',
                    headerTintColor: colorScheme === 'dark' ? '#fff' : '#18181B',
                }}
            />
            <Stack.Screen
                name="success"
                options={{
                    title: 'Lease Started',
                    headerShown: false,
                }}
            />
        </Stack>
    );
}