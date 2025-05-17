import React from 'react';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function SwapLayout() {
    const colorScheme = useColorScheme();
    return (
        <Stack
            screenOptions={{
                headerTintColor: '#18181B',
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen
                name="reserve"
                options={{
                    title: 'Reserve Battery',
                    headerTitleStyle: {
                        color: colorScheme === 'dark' ? '#fff' : '#18181B',
                    },
                    headerBackButtonDisplayMode: 'minimal',
                    headerTintColor: colorScheme === 'dark' ? '#fff' : '#18181B',
                }}
            />
            <Stack.Screen
                name="instructions"
                options={{
                    title: 'Swap Instructions',
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
                    headerShown: false,
                }}
            />
        </Stack>
    );
}