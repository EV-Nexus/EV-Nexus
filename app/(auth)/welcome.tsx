import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { LogIn, UserPlus } from 'lucide-react-native';

import { Text, View } from '@/components/Themed';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1598975498274-23defdd4876f?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
          style={styles.image}
        />
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome to EV Nexus</Text>
          <Text style={styles.subtitle}>
            Join the electric revolution in East Africa's transportation
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          variant="primary"
          size="large"
          leadingIcon={<LogIn size={24} color='#FFFFFF' />}
          style={styles.button}
          onPress={() => router.push('/login')}
        >
          Login with Email Account
        </Button>

        <Button
          variant="outline"
          size="large"
          leadingIcon={<UserPlus size={24} color='#059669' />}
          style={styles.button}
          onPress={() => router.push('/register')}
        >
          Create Account
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '50%',
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#71717A',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    padding: 24,
    paddingBottom: 48,
  },
  button: {
    marginBottom: 16,
  },
});