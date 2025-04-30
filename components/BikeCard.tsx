import React from 'react';
import { StyleSheet, Image } from 'react-native';

import { View, Text, useThemeColor } from './Themed';
import { BikeFeature } from '@/constants/lease-constants';


interface BikeCardProps {
  name: string;
  image: string;
  price: number;
  range: number;
  batterySwap: boolean;
  category: 'economy' | 'standard' | 'premium';
  features: BikeFeature[];
}


const BikeCard: React.FC<BikeCardProps> = ({ name, image, price, range, features }) => {

   const cardBgColor = useThemeColor({ light: '#fff', dark: '#333' }, 'background');

  return (
    <View style={[styles.card, { backgroundColor: cardBgColor }]}>
      <Image
        source={{ uri: image }}
        style={styles.image}
      />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>KSh {price}</Text>
      <Text style={styles.range}>{range} km Range</Text>
      <View style={styles.features}>
        {features.map((feature, index) => (
          <View key={index} style={styles.feature}>
            {feature.icon}
            <Text style={styles.featureLabel}>{feature.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
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
  image: {
    width: '100%',
    height: 240,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  price: {
    fontSize: 16,
    color: '#888',
  },
  range: {
    fontSize: 14,
    color: '#888',
  },
  features: {
    marginTop: 8,
    backgroundColor: 'transparent',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
    backgroundColor: 'transparent',
  },
  featureLabel: {
    marginLeft: 5,
  },
});

export default BikeCard;