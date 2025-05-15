import React from 'react';
import { StyleSheet, Image, useColorScheme } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { MOCK_BIKES } from '@/constants/mockData';
import { CircleCheck as CheckCircle2, ArrowRight } from 'lucide-react-native';

import { Text, View } from '@/components/Themed';

export default function LeaseSuccessScreen() {
  const colorScheme = useColorScheme();
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const bike = MOCK_BIKES.find(b => b.id === id);

  const handleTrackLease = () => {
    router.replace('/home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <CheckCircle2 size={64} color='#22C55E' />
        </View>

        <Text style={styles.title}>Lease Started!</Text>
        <Text style={styles.subtitle}>
          Your e-bike lease has been successfully activated
        </Text>

        {bike && (
          <View style={styles.bikeContainer}>
            <Image source={{ uri: bike.image }} style={styles.bikeImage} />
            <Text style={styles.bikeName}>{bike.name}</Text>
            <Text style={{ color: colorScheme === 'dark' ? '#E4E4E7' : '#52525B', fontSize: 14}}>{bike.brand}</Text>
          </View>
        )}

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Next Steps:</Text>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoNumber}>1</Text>
            <Text style={styles.infoText}>
              Visit our nearest hub to collect your e-bike
            </Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoNumber}>2</Text>
            <Text style={styles.infoText}>
              Complete a brief riding orientation
            </Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoNumber}>3</Text>
            <Text style={styles.infoText}>
              Start earning with your new e-bike!
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          size="large"
          style={styles.trackButton}
          onPress={handleTrackLease}
          trailingIcon={<ArrowRight size={20} color='#FFFFFF' />}
        >
          Track My Lease
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
    alignItems: 'center',
    padding: 24,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  bikeContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  bikeImage: {
    width: 200,
    height: 150,
    borderRadius: 12,
    marginBottom: 16,
  },
  bikeName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  infoContainer: {
    width: '100%',
    backgroundColor: '#F4F4F5',
    borderRadius: 12,
    padding: 16,
  },
  infoTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  infoNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#10B981',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 28,
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontWeight: '500',
    fontSize: 14,
    color: '#3F3F46',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E4E4E7',
  },
  trackButton: {
    marginBottom: 16,
  },
});