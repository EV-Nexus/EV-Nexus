import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import RepairCard from '@/components/repairs/RepairCard';
import { MOCK_REPAIRS } from '@/constants/mockData';


const InfoStep = ({ stepNumber, title, description }: { stepNumber: number; title: string; description: string }) => (
  <View style={styles.infoItem}>
    <View style={styles.infoNumber}>
      <Text style={styles.infoNumberText}>{stepNumber}</Text>
    </View>
    <View style={styles.infoContent}>
      <Text style={styles.infoItemTitle}>{title}</Text>
      <Text style={styles.infoItemText}>{description}</Text>
    </View>
  </View>
);

export default function RepairsScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Trusted Repair Partners</Text>
        <Text style={styles.subtitle}>
          Find reliable workshops with pre-negotiated flat-rate repair services for your electric bike.
        </Text>

        {MOCK_REPAIRS.map((repair) => (
          <RepairCard key={repair.id} repair={repair} />
        ))}

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>How Repairs Work</Text>
          <InfoStep
            stepNumber={1}
            title="Select a Service Provider"
            description="Choose from our list of certified repair partners based on your location, ratings, and services needed."
          />
          <InfoStep
            stepNumber={2}
            title="Book Your Service"
            description="Schedule an appointment directly through the app. You'll see transparent, pre-negotiated prices upfront."
          />
          <InfoStep
            stepNumber={3}
            title="Get Your Bike Fixed"
            description="Visit the shop at your scheduled time. All repairs are backed by our quality guarantee."
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 24,
    color: '#3F3F46',
  },
  infoSection: {
    marginTop: 24,
    borderRadius: 12,
    padding: 16,
  },
  infoTitle: {
    fontSize: 18,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
    backgroundColor: '#10B981',
  },
  infoNumberText: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 14,
  },
  infoContent: {
    flex: 1,
  },
  infoItemTitle: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  infoItemText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#52525B',
  },
});
