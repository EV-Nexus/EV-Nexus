import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Text, useThemeColor, View } from '@/components/Themed';
import { ArrowRight, MapPin, Star, Wrench } from 'lucide-react-native';
import { MOCK_REPAIRS } from '@/constants/mockData';

const RepairCard = ({ repair, cardBgColor }: { repair: any; cardBgColor: string }) => (
  <TouchableOpacity key={repair.id} activeOpacity={0.8} style={styles.cardContainer}>
    <View style={styles.card}>
      <Image source={{ uri: repair.image }} style={styles.repairImage} />
      <View style={[styles.repairInfo, { backgroundColor: cardBgColor }]}>
        <Text style={styles.repairName}>{repair.name}</Text>
        <View style={styles.ratingContainer}>
          <Star size={16} />
          <Text style={styles.ratingText}>{repair.rating}</Text>
        </View>
        <View style={styles.locationContainer}>
          <MapPin size={14} />
          <Text style={styles.distanceText}>{repair.distance} km away</Text>
        </View>
        <View style={styles.servicesContainer}>
          {repair.services.map((service: string, index: number) => (
            <View key={index} style={styles.serviceTag}>
              <Wrench size={12} />
              <Text style={styles.serviceText}>{service}</Text>
            </View>
          ))}
        </View>
        <View style={styles.viewDetailsContainer}>
          <Text style={styles.viewDetailsText}>View Pricing</Text>
          <ArrowRight size={16} color="#059669" />
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

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
  const colorScheme = useColorScheme();
  const cardBgColor = useThemeColor({ light: '#fff', dark: '#333' }, 'background');

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#18181B' : '#FAFAFA' }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Trusted Repair Partners</Text>
        <Text style={styles.subtitle}>
          Find reliable workshops with pre-negotiated flat-rate repair services for your electric bike.
        </Text>

        {MOCK_REPAIRS.map((repair) => (
          <RepairCard key={repair.id} repair={repair} cardBgColor={cardBgColor} />
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
    // backgroundColor: '#FAFAFA',
  },
  content: {
    paddingBottom: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 24,
  },
  cardContainer: {
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  repairImage: {
    width: 100,
    height: '100%',
    resizeMode: 'cover',
  },
  repairInfo: {
    flex: 1,
    padding: 12,
    // backgroundColor: 'red',
  },
  repairName: {
    fontSize: 16,
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    backgroundColor: 'transparent',
  },
  ratingText: {
    fontSize: 14,
    marginLeft: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  distanceText: {
    fontSize: 12,
    marginLeft: 4,
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  serviceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,

  },
  serviceText: {
    fontSize: 10,
    marginLeft: 4,
  },
  viewDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  viewDetailsText: {
    marginRight: 4,
    fontSize: 14,
    color: '#059669',
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
  },
  infoNumberText: {
    fontSize: 14,
  },
  infoContent: {
    flex: 1,
  },
  infoItemTitle: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'semibold',
  },
  infoItemText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#52525B',
  },
});
