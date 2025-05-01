import { ScrollView, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { Ionicons } from '@expo/vector-icons';

import { Text, useThemeColor, View } from '@/components/Themed';
import Footer from '@/components/Footer';
import SwapCard from '@/components/SwapCard';
import { SwapStation } from '@/constants/battery-swap';

// Sample data for battery swap stations
const swapStations: SwapStation[] = [
  {
    id: '1',
    name: 'Central Swap Station',
    address: 'Kimathi Street, Nairobi CBD',
    distance: 1.2,
    available: 8,
    total: 10,
    price: 250,
    openHours: '24/7',
    lat: -1.2871,
    lng: 36.8219,
  },
  {
    id: '2',
    name: 'EastLands Charging Hub',
    address: 'Outering Road, Eastlands',
    distance: 2.5,
    available: 3,
    total: 12,
    price: 200,
    openHours: '6am - 10pm',
    lat: -1.2921,
    lng: 36.8319,
  },
  {
    id: '3',
    name: 'Westlands EV Center',
    address: 'Waiyaki Way, Westlands',
    distance: 3.8,
    available: 1,
    total: 15,
    price: 300,
    openHours: '7am - 9pm',
    lat: -1.2721,
    lng: 36.8119,
  },
  {
    id: '4',
    name: 'South B Power Station',
    address: 'Mombasa Road, South B',
    distance: 4.1,
    available: 0,
    total: 8,
    price: 250,
    openHours: '8am - 8pm',
    lat: -1.3021,
    lng: 36.8419,
  },
];

export default function BatteryScreen() {
  const headerHeight = useHeaderHeight();
  const colorScheme = useColorScheme();

  // Theme Colors
  const backgroundColor = useThemeColor({
    light: '#fff',
    dark: '#000',
  }, 'background');
  const iconColor = useThemeColor({ light: '#000', dark: '#fff' }, 'text');
  const buttonBgColor = useThemeColor({ light: '#fff', dark: '#666' }, 'background');

  return (
    <ScrollView style={[styles.container, { paddingTop: headerHeight, backgroundColor }]}>


      <Text style={{ fontSize: 14, color: '#888', marginBottom: 10 }}>
        Find nearby locations to swap your battery quickly
      </Text>

      <View className='mt-4'>
        {swapStations.map((station) => (
          <SwapCard
            key={station.id}
            name={station.name}
            address={station.address}
            distance={station.distance}
            available={station.available}
            total={station.total}
            price={station.price}
            openHours={station.openHours}
          />
        ))}
      </View>


      <View style={styles.helpContainer}>
        <Text style={styles.helpTitle}>Need help with battery swapping?</Text>
        <Text style={styles.helpText}>
          If you're having issues with a battery swap, contact our 24/7 support.
        </Text>
        <TouchableOpacity
          style={[styles.supportButton, { backgroundColor: buttonBgColor, borderColor: '#EAB308' }]}
          onPress={() => console.log('Support call initiated')}
        >
          <View style={styles.buttonContent}>
            <Ionicons name="call-outline" size={24} color={colorScheme === 'dark' ? iconColor : '#A16207'} />
            <Text style={[styles.buttonText, { color: colorScheme === 'dark' ? '#fff' : '#A16207' }]}>
              Call Support
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  helpContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#FEFCE8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FEF08A',
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#854d0E',
  },
  helpText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#854d0E',
  },
  supportButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'EAB308',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  buttonText: {
    // color: ,
    fontSize: 16,
    marginLeft: 5,
  },
});
