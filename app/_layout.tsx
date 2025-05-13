import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Bell, X } from 'lucide-react-native';
import { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/components/Themed';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }} edges={['top', 'left', 'right']}>
      <RootLayoutNav />
    </SafeAreaView>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerTintColor: '#18181B',
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="notifications" options={{
          presentation: 'modal',
          headerTitle: 'Notifications',
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: '600',
            color: colorScheme === 'dark' ? '#fff' : '#18181B',
          },
          headerLeft: () => (
            <Bell size={24} color={colorScheme === 'dark' ? '#fff' : '#18181B'} />
          ),
          headerRight: () => (
            <TouchableOpacity style={styles.clearButton}>
              <Text style={{ color: colorScheme === 'dark' ? '#E4E4E7' : '#52525B', fontSize: 14, marginRight: 4 }}>Clear All</Text>
              <X size={16} color='#52525B' />
            </TouchableOpacity>
          ),
        }} />
      </Stack>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
    clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})