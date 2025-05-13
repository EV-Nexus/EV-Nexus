import { Stack } from 'expo-router';

export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                headerTintColor: '#18181B',
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen
                name="welcome"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="login"
                options={{
                    headerTitle: 'Login',
                    presentation: 'card',
                    headerBackButtonDisplayMode: 'minimal',
                }}
            />
            <Stack.Screen
                name="register"
                options={{
                    title: 'Register',
                    presentation: 'card',
                    headerBackButtonDisplayMode: 'minimal',
                }}
            />
            <Stack.Screen
                name="verify"
                options={{
                    title: 'Verify Phone',
                    presentation: 'card',
                    headerBackButtonDisplayMode: 'minimal',
                }}
            />
        </Stack>
    );
}