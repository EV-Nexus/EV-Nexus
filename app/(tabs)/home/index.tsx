import { Image, ScrollView, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { MOCK_BIKES, MOCK_SWAP_STATIONS, MOCK_USER } from '@/constants/mockData';

import { Text, useThemeColor, View } from '@/components/Themed';
import { Card } from '@/components/ui/Card';
import { AlertTriangle, Battery, Bike, Calendar, MapPin, PenTool, Smartphone, Wrench, Zap } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const currentBike = MOCK_BIKES.find(bike => bike.id === MOCK_USER.currentBike);

  // Find the closest battery swap station
  const closestStation = [...MOCK_SWAP_STATIONS].sort((a, b) => a.distance - b.distance)[0];

  const cardBgColor = useThemeColor({
    light: '#fff',
    dark: '#333',
  }, 'background');
  const actionCardBgColor = useThemeColor({
    light: '#F3F4F6',
    dark: '#444',
  }, 'background');

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Current Bike Section */}
        {currentBike ? (
          <View style={[styles.card, { backgroundColor: cardBgColor }]}>
            <View style={styles.currentBikeHeader}>
              <Text style={styles.sectionTitle}>Your Current Bike</Text>
              <TouchableOpacity onPress={() => console.log('View Details')}>
                <Text style={styles.viewDetailsText}>View Details</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.bikeInfoContainer}>
              <Image
                source={{ uri: currentBike.image }}
                style={styles.bikeImage}
                resizeMode="cover"
              />
              <View style={styles.bikeInfo}>
                <Text style={styles.bikeName}>{currentBike.name}</Text>
                <Text style={{ color: colorScheme === 'dark' ? '#E4E4E7' : '#52525B', fontSize: 14, marginBottom: 8 }}>
                {currentBike.brand}
                </Text>

                <View style={styles.paymentInfo}>
                  <Text style={styles.paymentLabel}>Next Payment:</Text>
                  <Text style={styles.paymentAmount}>KSh {MOCK_USER.paymentDue}</Text>
                  <Text style={styles.paymentDate}>Due: {MOCK_USER.nextPaymentDate}</Text>
                </View>

                <Button
                  variant="mpesa"
                  leadingIcon={<Smartphone size={24} color="white" />}
                  onPress={() => console.log('Pay via M-Pesa')}
                >
                  Pay via M-Pesa
                </Button>
              </View>
            </View>
          </View>
        ) : (
          <View style={[styles.noBikeCard, { backgroundColor: cardBgColor }]}>
            <Text style={styles.noBikeText}>You don't have an active lease yet.</Text>
            <Button
              onPress={() => router.push("/marketplace")}
              leadingIcon={<Bike size={16} color="white" />}
            >
              Browse Bikes
            </Button>
          </View>
        )}

        {/* Quick Actions Section */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={[styles.actionCard, { backgroundColor: actionCardBgColor }]}
              onPress={() => router.push('/(tabs)/battery-swap')}
            >
              <View style={[styles.actionIconContainer]}>
                {/* <Battery size={24} color={COLORS.secondary[600]} /> */}
                <Battery size={24} />
              </View>
              <Text style={styles.actionText}>Find Battery Swap</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionCard, { backgroundColor: actionCardBgColor }]}
              onPress={() => router.push('/(tabs)/repairs')}
            >
              <View style={[styles.actionIconContainer]}>
                {/* <PenTool size={24} color={COLORS.accent[600]} /> */}
                <Wrench size={24} />
              </View>
              <Text style={styles.actionText}>Repair Services</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionCard, { backgroundColor: actionCardBgColor }]}
              onPress={() => console.log('Payment History')}
            >
              <View style={[styles.actionIconContainer,]}>
                {/* <Calendar size={24} color={COLORS.success[600]} /> */}
                <Calendar size={24} />
              </View>
              <Text style={styles.actionText}>Payment History</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionCard, { backgroundColor: actionCardBgColor }]}
              onPress={() => console.log('Get Support')}
            >
              <View style={[styles.actionIconContainer]}>
                {/* <AlertTriangle size={24} color={COLORS.warning[600]} /> */}
                <AlertTriangle size={24} />
              </View>
              <Text style={styles.actionText}>Get Support</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Nearby Station Section */}
        {closestStation && (
          <View style={styles.nearbyStationContainer}>
            <Text style={styles.sectionTitle}>Nearest Battery Swap</Text>

            <View style={[styles.card, { backgroundColor: cardBgColor }]}>
              <Text style={styles.stationName}>{closestStation.name}</Text>

              <View style={styles.stationDetail}>
                <MapPin size={24} color='#52525B' />
                <Text style={styles.stationAddress}>{closestStation.address}</Text>
              </View>

              <View style={styles.stationDetail}>
                <Zap size={24} color='#059669' />
                <Text style={styles.stationBatteries}>
                  {closestStation.batteryAvailable} batteries available
                </Text>
              </View>

              <View style={styles.stationActions}>
                <Text style={styles.stationDistance}>{closestStation.distance.toFixed(1)} km away</Text>
                <Button
                  size="small"
                  onPress={() => router.push("/battery-swap")}
                >
                  Get Directions
                </Button>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 24,
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
  currentBikeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  viewDetailsText: {
    fontSize: 14,
    color: '#059669',
  },
  bikeInfoContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  bikeImage: {
    width: 150,
    height: '100%',
    borderRadius: 8,
    marginRight: 16,
  },
  bikeInfo: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  bikeName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  paymentInfo: {
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  paymentLabel: {
    fontSize: 12,
    color: '#52525B',
  },
  paymentAmount: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  paymentDate: {
    fontSize: 12,
    color: '#DC2626',
  },
  noBikeCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
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
  noBikeText: {
    fontSize: 16,
    marginBottom: 16,
  },
  quickActionsContainer: {
    marginTop: 24,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  actionCard: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    backgroundColor: '#E5E7EB',
  },
  actionText: {
    fontSize: 14,
    // color: COLORS.gray[800],
    textAlign: 'center',
  },
  nearbyStationContainer: {
    marginTop: 8,
  },
  stationCard: {
    marginTop: 12,
  },
  stationName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  stationDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  stationAddress: {
    fontSize: 14,
    marginLeft: 8,
  },
  stationBatteries: {
    fontSize: 14,
    marginLeft: 8,
  },
  stationActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: 'transparent',
  },
  stationDistance: {
    fontSize: 14,
  },
});


