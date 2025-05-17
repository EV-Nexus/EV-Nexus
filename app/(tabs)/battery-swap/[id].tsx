import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Linking, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MapPin, Phone, Clock, Battery, Navigation, Info, Armchair, ShoppingBag, Wifi, Bath, BanknoteIcon, Coffee, Wrench  } from 'lucide-react-native';

import { MOCK_SWAP_STATIONS } from '@/constants/mockData';
import { Text, useThemeColor, View } from '@/components/Themed';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

// Create an interface for our map components
interface MapComponents {
  MapView: any;
  Marker: any;
  PROVIDER_GOOGLE: any;
}

// Initialize map components based on platform
const getMapComponents = (): MapComponents => {
  if (Platform.OS !== 'web') {
    try {
      const Maps = require('react-native-maps');
      return {
        MapView: Maps.default,
        Marker: Maps.Marker,
        PROVIDER_GOOGLE: Maps.PROVIDER_GOOGLE,
      };
    } catch (error) {
      console.warn('Failed to load react-native-maps:', error);
      return {
        MapView: null,
        Marker: null,
        PROVIDER_GOOGLE: null,
      };
    }
  }
  return {
    MapView: null,
    Marker: null,
    PROVIDER_GOOGLE: null,
  };
};

// Get map components
const { MapView, Marker, PROVIDER_GOOGLE } = getMapComponents();

export default function StationDetailsScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    
    const [isReserving, setIsReserving] = useState(false);

    const cardBgColor = useThemeColor({
        light: '#fff',
        dark: '#333',
    }, 'background');

    const station = MOCK_SWAP_STATIONS.find(s => s.id === id);

    if (!station) {
        return (
            <View style={styles.container}>
                <Text>Station not found</Text>
            </View>
        );
    }

    const handleCall = () => {
        Linking.openURL(`tel:${station.phone}`);
    };

    const handleGetDirections = () => {
        if (Platform.OS === 'web') {
            window.open(
                `https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}`,
                '_blank'
            );
        }
        if (Platform.OS === 'android') {
            Linking.openURL(
                `geo:${station.latitude},${station.longitude}?q=${station.latitude},${station.longitude}(${station.name})`
            );
        }
        if (Platform.OS === 'ios') {
            Linking.openURL(
                `http://maps.apple.com/?daddr=${station.latitude},${station.longitude}&q=${station.name}`
            );
        }
    };

    const handleReserve = () => {
        setIsReserving(true);
        setTimeout(() => {
            setIsReserving(false);
            router.push({
                pathname: '/(swap)/reserve',
                params: { id: station.id }
            });
        }, 2000);
    };

    const handleViewInstructions = () => {
        router.push({
            pathname: '/(swap)/instructions',
            params: { id: station.id }
        });
    };

    // Helper function to get appropriate icon based on facility name
    const getFacilityIcon = (facilityName: string) => {
        switch (facilityName.toLowerCase()) {
            case 'waiting area':
                return <Armchair size={24} color="#4B5563" />;
            case 'convenience store':
                return <ShoppingBag size={24} color="#4B5563" />;
            case 'wifi':
                return <Wifi size={24} color="#4B5563" />;
            case 'restrooms':
                return <Bath size={24} color="#4B5563" />;
            case 'atm':
                return <BanknoteIcon size={24} color="#4B5563" />;
            case 'cafe':
                return <Coffee size={24} color="#4B5563" />;
            case 'bike service':
                return <Wrench size={24} color="#4B5563" />;
            default:
                return <Info size={24} color="#4B5563" />;
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[styles.card, { backgroundColor: cardBgColor, ...styles.mapCard }]}>	
                        <View style={styles.map}>
                            {MapView && (
                                <MapView
                                    style={styles.map}
                                    provider={PROVIDER_GOOGLE}
                                    initialRegion={{
                                        latitude: station.latitude,
                                        longitude: station.longitude,
                                        latitudeDelta: 0.005,
                                        longitudeDelta: 0.005,
                                    }}
                                >
                                    <Marker
                                        coordinate={{
                                            latitude: station.latitude,
                                            longitude: station.longitude,
                                        }}
                                        title={station.name}
                                        description={station.address}
                                    />
                                </MapView>
                            )}
                        </View>
                </View>

                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.stationName}>{station.name}</Text>
                        <Badge
                            variant={station.batteryAvailable > 5 ? 'success' : station.batteryAvailable > 0 ? 'warning' : 'error'}
                            size="medium"
                        >
                            {station.batteryAvailable > 0 ? `${station.batteryAvailable} Available` : 'No Batteries'}
                        </Badge>
                    </View>

                    <View style={[styles.card, { backgroundColor: cardBgColor }]}>
                        <View style={styles.infoItem}>
                            <MapPin size={20} color='#52525B' />
                            <Text style={styles.infoText}>{station.address}</Text>
                        </View>

                        <View style={styles.infoItem}>
                            <Phone size={20} color='#52525B' />
                            <TouchableOpacity onPress={handleCall}>
                                <Text style={[styles.infoText, styles.phone]}>{station.phone}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.infoItem}>
                            <Clock size={20} color='#52525B' />
                            <Text style={styles.infoText}>Open until {station.openUntil}</Text>
                        </View>

                        <View style={styles.infoItem}>
                            <Battery size={20} color='#52525B' />
                            <Text style={styles.infoText}>
                                {station.batteryAvailable} batteries available • {station.chargingPoints} charging points
                            </Text>
                        </View>
                    </View>

                    <View style={styles.actions}>
                        <Button
                            style={styles.actionButton}
                            variant="primary"
                            leadingIcon={<Navigation size={20} color='#FFFFFF' />}
                            onPress={handleGetDirections}
                        >
                            Get Directions
                        </Button>

                        <Button
                            style={styles.actionButton}
                            variant={station.batteryAvailable > 0 ? 'secondary' : 'outline'}
                            disabled={station.batteryAvailable === 0}
                            loading={isReserving}
                            leadingIcon={<Battery size={20} color={station.batteryAvailable > 0 ? '#FFFFFF' : '#71717A'} />}
                            onPress={handleReserve}
                        >
                            {station.batteryAvailable > 0 ? 'Reserve Battery' : 'No Batteries Available'}
                        </Button>

                        <Button
                            style={styles.actionButton}
                            variant="outline"
                            leadingIcon={<Info size={20} color='#059669' />}
                            onPress={handleViewInstructions}
                        >
                            View Swap Instructions
                        </Button>
                    </View>

                    <View style={[styles.card, { backgroundColor: cardBgColor }]}>
                        <Text style={styles.facilitiesTitle}>Available Facilities</Text>

                        <View style={styles.facilitiesList}>
                            {station.facilities.map((facility, index) => (
                                <View key={index} style={styles.facilityItem}>
                                    <View style={styles.facilityIcon}>
                                        {getFacilityIcon(facility.name)}
                                    </View>
                                    <Text style={styles.facilityText}>{facility.name}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={[styles.card, { backgroundColor: cardBgColor }]}>
                        <View style={styles.reviewsHeader}>
                            <Text style={styles.reviewsTitle}>Recent Reviews</Text>
                            <Text style={styles.rating}>{station.rating} ★</Text>
                        </View>

                        {station.reviews.map((review, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.review,
                                    index < station.reviews.length - 1 && styles.reviewBorder
                                ]}
                            >
                                <View style={styles.reviewHeader}>
                                    <Text style={styles.reviewerName}>{review.name}</Text>
                                    <Text style={styles.reviewRating}>{review.rating} ★</Text>
                                </View>
                                <Text style={styles.reviewText}>{review.comment}</Text>
                                <Text style={styles.reviewDate}>{review.date}</Text>
                            </View>
                        ))}
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
    mapCard: {
        margin: 0,
        borderRadius: 0,
        padding: 0,
    },
    map: {
        height: 200,
    },
    content: {
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    stationName: {
        fontWeight: 'bold',
        fontSize: 24,
        flex: 1,
        marginRight: 16,
    },
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
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        backgroundColor: 'transparent',
    },
    infoText: {
        fontSize: 16,
        marginLeft: 12,
        flex: 1,
    },
    phone: {
        textDecorationLine: 'underline',
    },
    actions: {
        marginBottom: 16,
    },
    actionButton: {
        marginBottom: 8,
    },
    facilitiesTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 16,
    },
    facilitiesList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'transparent',
    },
    facilityItem: {
        width: '33.33%',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: 'transparent',
    },
    facilityIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
        backgroundColor: '#F4F4F5',
        borderColor: '#E4E4E7',
    },
    facilityText: {
        fontWeight: '500',
        fontSize: 12,
        textAlign: 'center',
    },
    reviewsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: 'transparent',
    },
    reviewsTitle: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    rating: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#EAB308',
    },
    review: {
        paddingVertical: 12,
        backgroundColor: 'transparent',
    },
    reviewBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#E4E4E7',
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
        backgroundColor: 'transparent',
    },
    reviewerName: {
        fontWeight: '500',
        fontSize: 14,
    },
    reviewRating: {
        fontWeight: '500',
        fontSize: 14,
        color: '#EAB308',
    },
    reviewText: {
        fontSize: 14,
        marginBottom: 4,
    },
    reviewDate: {
        fontSize: 12,
        color: '#71717A',
    },
});