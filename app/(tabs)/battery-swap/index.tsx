import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import { Text, useThemeColor, View } from '@/components/Themed';
import { MOCK_SWAP_STATIONS } from '@/constants/mockData';
import { List, MapPin } from 'lucide-react-native';
import { SwapStationCard } from '@/components/battery-swap/SwapStationCard';


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

export default function BatterySwapScreen() {
  const router = useRouter();
  
  const [view, setView] = useState<'list' | 'map'>('list');
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState({
    latitude: -1.286389, // Example coordinates for Nairobi
    longitude: 36.817223, 
  });
  
  const handleStationPress = (id: string) => {
    setSelectedStation(id);
    
    // If in list view, switch to map view and center map on selected station
    if (view === 'list') {
      setView('map');
      
      const station = MOCK_SWAP_STATIONS.find(s => s.id === id);
      if (station) {
        // Would normally animate to this region
        console.log(`Centering map on station: ${station.name}`);
      }
    } else {
      // If already in map view, or after switching to map view, navigate to station details
      // which is the first step in the battery swap flow
      router.push({
        pathname: '/(tabs)/battery-swap/[id]',
        params: { id }
      });
    }
  };

  // Add a function to navigate directly to station details from the map overlay
  const handleViewStationDetails = (id: string) => {
    router.push({
      pathname: '/(tabs)/battery-swap/[id]',
      params: { id }
    })
  };

  return (
    <View style={styles.container}>
      {/* View Toggle */}
      <View style={styles.viewToggle}>
        <TouchableOpacity
          style={[styles.toggleButton, view === 'list' && styles.toggleButtonActive]}
          onPress={() => setView('list')}
        >
          <List size={24} color={view === 'list' ? '#FFFFFF' : '#3F3F46'} />
          <Text style={[styles.toggleText, view === 'list' && styles.toggleTextActive]}>List View</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.toggleButton, view === 'map' && styles.toggleButtonActive]}
          onPress={() => setView('map')}
        >
          <MapPin size={24} color={view === 'map' ? '#FFFFFF' : '#3F3F46'} />
          <Text style={[styles.toggleText, view === 'map' && styles.toggleTextActive]}>Map View</Text>
        </TouchableOpacity>
      </View>
      
      {/* List View */}
      {view === 'list' && (
        <ScrollView 
          contentContainerStyle={styles.stationListContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.listTitle}>Nearby Swap Stations</Text>
          
          {MOCK_SWAP_STATIONS.map((station) => (
            <SwapStationCard
              key={station.id}
              id={station.id}
              name={station.name}
              distance={station.distance}
              batteryAvailable={station.batteryAvailable}
              openUntil={station.openUntil}
              onPress={handleStationPress}
            />
          ))}
        </ScrollView>
      )}
      
      {/* Map View */}
      {view === 'map' && (
        <View style={styles.mapContainer}>
          { MapView ? (
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
            >
              {/* User's location marker */}
              <Marker
                coordinate={{
                  latitude: userLocation.latitude,
                  longitude: userLocation.longitude,
                }}
                title="Your Location"
                pinColor='#3B82F6'
              />
              
              {/* Station markers */}
              {MOCK_SWAP_STATIONS.map((station) => (
                <Marker
                  key={station.id}
                  coordinate={{
                    latitude: station.latitude,
                    longitude: station.longitude,
                  }}
                  title={station.name}
                  description={`${station.batteryAvailable} batteries available`}
                  pinColor={station.batteryAvailable > 0 ? '#10B981' : '#EF4444'}
                />
              ))}
            </MapView>
          ) : (
            // Fallback if maps fail to load
            <View style={styles.webMapPlaceholder}>
              {/* <MapPin size={48} color={COLORS.gray[500]} /> */}
              <MapPin size={48} />
              <Text style={styles.webMapText}>
                Unable to load maps. Please try again later.
              </Text>
            </View>
          )}
          
          {/* Selected station card overlay */}
          {selectedStation && (
            <View style={styles.selectedStationOverlay}>
              {MOCK_SWAP_STATIONS
                .filter(station => station.id === selectedStation)
                .map(station => (
                  <SwapStationCard
                    key={station.id}
                    id={station.id}
                    name={station.name}
                    distance={station.distance}
                    batteryAvailable={station.batteryAvailable}
                    openUntil={station.openUntil}
                    onPress={() => handleViewStationDetails(station.id)}
                  />
                ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewToggle: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E7',
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#F4F4F5',
    marginHorizontal: 4,
  },
  toggleButtonActive: {
    backgroundColor: '#2563EB',
  },
  toggleText: {
    fontSize: 14,
    marginLeft: 8,
    color: '#3F3F46',
  },
  toggleTextActive: {
    color: '#FFFFFF',
  },
  stationListContent: {
    padding: 16,
  },
  listTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 16,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject, // Fill the entire screen
  },
  webMapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  webMapText: {
    fontWeight: '500',
    fontSize: 16,
    color: '#3F3F46',
    textAlign: 'center',
    marginTop: 16,
  },
  selectedStationOverlay: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: 'transparent',
  },
});
