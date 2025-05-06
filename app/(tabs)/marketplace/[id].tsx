import React, { useState } from 'react';
import { StyleSheet, ScrollView, Image, TouchableOpacity, Alert, useColorScheme } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { MOCK_BIKES } from '@/constants/mockData';
import { Button } from '@/components/ui/Button';
import { BIKE_TYPES } from '@/constants/bikeTypes';
import { ChevronDown, ChevronUp, Battery, Zap, Clock, Weight, Gauge } from 'lucide-react-native';
import { Badge } from '@/components/ui/Badge';

import { Text, useThemeColor, View } from '@/components/Themed';

export default function BikeDetailScreen() {
  const colorScheme = useColorScheme();
  const { id } = useLocalSearchParams();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const bikeSpecsBgColor = useThemeColor({
    light: '#F3F4F6',
    dark: '#444',
  }, 'background');

  // Find the selected bike by ID
  const bike = MOCK_BIKES.find(b => b.id === id);

  if (!bike) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>Bike not found</Text>
      </View>
    );
  }

  const handleLeasePress = () => {
    Alert.alert(
      "Begin Lease Process",
      "To start leasing this bike, we'll need to collect some information from you. Continue?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Continue", onPress: () => console.log("Lease process initiated") }
      ]
    );
  };

  const availabilityVariant =
    bike.availability === 'available' ? 'success' :
      bike.availability === 'limited' ? 'warning' : 'error';

  const availabilityText =
    bike.availability === 'available' ? 'Available Now' :
      bike.availability === 'limited' ? 'Limited Stock' : 'Out of Stock';

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Bike Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: bike.image }} style={styles.image} />
          <Badge
            variant={availabilityVariant}
            style={styles.availabilityBadge}
          >
            {availabilityText}
          </Badge>
        </View>

        {/* Main Content */}
        <View style={styles.contentContainer}>
          {/* Bike Name and Brand */}
          <View style={styles.header}>
            <Text style={styles.bikeName}>{bike.name}</Text>
            <Text style={{ color: colorScheme === 'dark' ? '#E4E4E7' : '#52525B', fontSize: 14, marginBottom: 8 }}>{bike.brand}</Text>
          </View>

          {/* Main Specs */}
          <View style={[styles.mainSpecs, { backgroundColor: bikeSpecsBgColor }]}>
            <View style={styles.specItem}>
              <Text style={styles.specValue}>KSh {bike.price}/day</Text>
              <Text style={{ color: colorScheme === 'dark' ? '#E4E4E7' : '#52525B', fontSize: 14, marginBottom: 8 }}>Daily Rate</Text>
            </View>

            <View style={styles.specDivider} />

            <View style={styles.specItem}>
              <Text style={styles.specValue}>{bike.range} km</Text>
              <Text style={{ color: colorScheme === 'dark' ? '#E4E4E7' : '#52525B', fontSize: 14, marginBottom: 8 }}>Range</Text>
            </View>

            <View style={styles.specDivider} />

            <View style={styles.specItem}>
              <Text style={styles.specValue}>{BIKE_TYPES[bike.type as keyof typeof BIKE_TYPES] || bike.type}</Text>
              <Text style={{ color: colorScheme === 'dark' ? '#E4E4E7' : '#52525B', fontSize: 14, marginBottom: 8 }}>Type</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description} numberOfLines={showFullDescription ? undefined : 3}>
              {bike.description}
            </Text>

            <TouchableOpacity
              style={styles.readMoreButton}
              onPress={() => setShowFullDescription(!showFullDescription)}
            >
              <Text style={{ color: colorScheme === 'dark' ? '#E4E4E7' : '#52525B', fontSize: 14, marginRight: 4 }}>
                {showFullDescription ? 'Show Less' : 'Read More'}
              </Text>
              {showFullDescription ?
                <ChevronUp size={16} color={colorScheme === 'dark' ? '#E4E4E7' : '#52525B'} /> :
                <ChevronDown size={16} color={colorScheme === 'dark' ? '#E4E4E7' : '#52525B'} />
              }
            </TouchableOpacity>
          </View>

          {/* Detailed Specs */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Specifications</Text>

            <View style={styles.specsGrid}>
              <View style={[styles.specCard, { backgroundColor: bikeSpecsBgColor }]}>
                <Zap size={24} />
                <Text style={{ color: colorScheme === 'dark' ? '#E4E4E7' : '#52525B', fontSize: 12, marginBottom: 8 }}>Motor</Text>
                <Text style={styles.specCardValue}>{bike.specs.motor}</Text>
              </View>

              <View style={[styles.specCard, { backgroundColor: bikeSpecsBgColor }]}>
                <Battery size={24} />
                <Text style={{ color: colorScheme === 'dark' ? '#E4E4E7' : '#52525B', fontSize: 12, marginBottom: 4 }}>Battery</Text>
                <Text style={styles.specCardValue}>{bike.specs.battery}</Text>
              </View>

              <View style={[styles.specCard, { backgroundColor: bikeSpecsBgColor }]}>
                <Clock size={24} />
                <Text style={{ color: colorScheme === 'dark' ? '#E4E4E7' : '#52525B', fontSize: 12, marginBottom: 4, marginTop: 4 }}>Charging</Text>
                <Text style={styles.specCardValue}>{bike.specs.chargingTime}</Text>
              </View>

              <View style={[styles.specCard, { backgroundColor: bikeSpecsBgColor }]}>
                <Gauge size={24} />
                <Text style={{ color: colorScheme === 'dark' ? '#E4E4E7' : '#52525B', fontSize: 12, marginBottom: 4, marginTop: 4 }}>Max Speed</Text>
                <Text style={styles.specCardValue}>{bike.specs.maxSpeed}</Text>
              </View>

              <View style={[styles.specCard, { backgroundColor: bikeSpecsBgColor }]}>
                <Weight size={24} />
                <Text style={{ color: colorScheme === 'dark' ? '#E4E4E7' : '#52525B', fontSize: 14, marginBottom: 4, marginTop: 4 }}>Load Capacity</Text>
                <Text style={styles.specCardValue}>{bike.specs.loadCapacity}</Text>
              </View>
            </View>
          </View>

          {/* Lease Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Lease Information</Text>

            <View style={[styles.leaseInfo, { backgroundColor: bikeSpecsBgColor }]}>
              <View style={styles.leaseItem}>
                <Text style={{ color: colorScheme === 'dark' ? '#E4E4E7' : '#52525B', fontSize: 14 }}>Daily Rate</Text>
                <Text style={styles.leaseValue}>KSh {bike.price}</Text>
              </View>

              <View style={styles.leaseItem}>
                <Text style={{ color: colorScheme === 'dark' ? '#E4E4E7' : '#52525B', fontSize: 14 }}>Weekly Cost</Text>
                <Text style={styles.leaseValue}>KSh {bike.price * 7}</Text>
              </View>

              <View style={styles.leaseItem}>
                <Text style={{ color: colorScheme === 'dark' ? '#E4E4E7' : '#52525B', fontSize: 14 }}>Monthly Estimate</Text>
                <Text style={styles.leaseValue}>KSh {bike.price * 30}</Text>
              </View>

              <View style={styles.leaseItem}>
                <Text style={{ color: colorScheme === 'dark' ? '#E4E4E7' : '#52525B', fontSize: 14 }}>Lease Period</Text>
                <Text style={styles.leaseValue}>Flexible (Daily Payments)</Text>
              </View>

              <View style={styles.leaseItem}>
                <Text style={{ color: colorScheme === 'dark' ? '#E4E4E7' : '#52525B', fontSize: 14 }}>Required Deposit</Text>
                <Text style={styles.leaseValue}>KSh {bike.price * 7}</Text>
              </View>
            </View>
          </View>

          {/* Action Button */}
          <View style={styles.actionContainer}>
            <Button
              style={styles.leaseButton}
              onPress={handleLeasePress}
              disabled={bike.availability === 'unavailable'}
            >
              <Text style={styles.leaseButtonText}>
                {bike.availability === 'unavailable' ? 'Currently Unavailable' : 'Begin Lease Process'}
              </Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
  },
  imageContainer: {
    position: 'relative',
    height: 240,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  availabilityBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  bikeName: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 4,
  },
  mainSpecs: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  specItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  specDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#D4D4D8',
    marginHorizontal: 8,
  },
  specValue: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  specLabel: {
    fontSize: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: 'semibold',
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  specCard: {
    width: '48%',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  specCardValue: {
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  leaseInfo: {
    borderRadius: 12,
    padding: 16,
  },
  leaseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#D4D4D8',
    backgroundColor: 'transparent',
  },
  leaseValue: {
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  actionContainer: {
    marginTop: 16,
    marginBottom: 32,
  },
  leaseButton: {
    // backgroundColor: COLORS.primary[600],
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  leaseButtonText: {
    // fontFamily: FONTS.bold,
    fontSize: 16,
    // color: COLORS.white,
  },
});