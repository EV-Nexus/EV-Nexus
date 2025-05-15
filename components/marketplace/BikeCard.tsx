import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import { Text, useThemeColor, View } from '@/components/Themed';
import { Badge } from '@/components/ui/Badge';
import { BIKE_TYPES } from '@/constants/bikeTypes';

interface BikeCardProps {
  id: string;
  name: string;
  image: string;
  brand: string;
  type: keyof typeof BIKE_TYPES;
  price: number;
  range: number;
  availability: 'available' | 'limited' | 'unavailable';
}

export function BikeCard({ id, name, image, brand, type, price, range, availability }: BikeCardProps) {
  const router = useRouter();

  const availabilityVariant =
    availability === 'available' ? 'success' :
      availability === 'limited' ? 'warning' : 'error';

  const availabilityText =
    availability === 'available' ? 'Available Now' :
      availability === 'limited' ? 'Limited Stock' : 'Out of Stock';

  const cardBgColor = useThemeColor({
    light: '#fff',
    dark: '#333',
  }, 'background');

  return (
    <TouchableOpacity
      onPress={() => router.replace(`/marketplace/${id}`)}
      activeOpacity={0.8}
    >
      <View style={[styles.card, { backgroundColor: cardBgColor }]}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <Badge
            variant={availabilityVariant}
            style={styles.availabilityBadge}
          >
            {availabilityText}
          </Badge>
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.brand}>{brand}</Text>
          </View>

          <View style={styles.details}>
            <View style={styles.detail}>
              <Text style={styles.detailLabel}>Type</Text>
              <Text style={styles.detailValue}>{BIKE_TYPES[type]}</Text>
            </View>

            <View style={styles.detail}>
              <Text style={styles.detailLabel}>Daily</Text>
              <Text style={styles.detailValue}>KSh {price}/day</Text>
            </View>

            <View style={styles.detail}>
              <Text style={styles.detailLabel}>Range</Text>
              <Text style={styles.detailValue}>{range} km</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  availabilityBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  content: {
    padding: 16,
    backgroundColor: 'transparent',
  },
  header: {
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  brand: {
    fontSize: 14,
    color: '#52525B',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  detail: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  detailLabel: {
    fontSize: 12,
    color: '#52525B',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
  },
});