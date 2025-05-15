import React from 'react';
import { StyleSheet, ScrollView, Image, useColorScheme } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { MOCK_BIKES } from '@/constants/mockData';
import { User, Phone, CreditCard, Calendar, Zap, Smartphone } from 'lucide-react-native';

import { Text, useThemeColor, View } from '@/components/Themed';

export default function ConfirmLeaseScreen() {
  const colorScheme = useColorScheme();
  const params = useLocalSearchParams();
  const router = useRouter();

  const cardBgColor = useThemeColor({
    light: '#fff',
    dark: '#333',
  }, 'background');

  const bike = MOCK_BIKES.find(b => b.id === params.id);

  if (!bike) {
    return (
      <View style={styles.container}>
        <Text>Bike not found</Text>
      </View>
    );
  }

  const handleConfirm = () => {
    router.push({
      pathname: '/(lease)/success',
      params: { id: bike.id }
    });
  };

  return (
    <>
      <View style={styles.progressBar}>
        <View style={[styles.progressStep, styles.progressStepActive]} />
        <View style={[styles.progressStep, styles.progressStepActive]} />
        <View style={[styles.progressStep, styles.progressStepActive]} />
        <View style={styles.progressStep} />
      </View>
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      <Text style={styles.title}>Confirm Lease Details</Text>

      <View style={[styles.card, { backgroundColor: cardBgColor }]}>
        <Image source={{ uri: bike.image }} style={styles.bikeImage} />
        <View style={styles.bikeInfo}>
          <Text style={styles.bikeName}>{bike.name}</Text>
          <Text style={{ color: colorScheme === 'dark' ? '#E4E4E7' : '#52525B', fontSize: 14}}>{bike.brand}</Text>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: cardBgColor }]}>
        <Text style={styles.sectionTitle}>Rider Information</Text>

        <View style={styles.detailItem}>
          <User size={20} color='#52525B' />
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Full Name</Text>
            <Text style={styles.detailValue}>{params.fullName}</Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Phone size={20} color='#52525B' />
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Phone Number</Text>
            <Text style={styles.detailValue}>{params.phone}</Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <CreditCard size={20} color='#52525B' />
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>ID Number</Text>
            <Text style={styles.detailValue}>{params.idNumber}</Text>
          </View>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: cardBgColor }]}>
        <Text style={styles.sectionTitle}>Lease Terms</Text>

        <View style={styles.detailItem}>
          <Calendar size={20} color='#52525B' />
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Duration</Text>
            <Text style={styles.detailValue}>{params.duration} days</Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Zap size={20} color='#52525B' />
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Daily Rate</Text>
            <Text style={styles.detailValue}>KSh {bike.price}</Text>
          </View>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: cardBgColor }]}>
        <Text style={styles.sectionTitle}>Payment Summary</Text>

        <View style={styles.paymentItem}>
          <Text style={{ color: colorScheme === 'dark' ? '#E4E4E7' : '#52525B', fontSize: 14}}>Security Deposit</Text>
          <Text style={{ color: colorScheme === 'dark' ? '#E4E4E7' : '#18181B', fontSize: 14}}>KSh {bike.price * 7}</Text>
        </View>

        <View style={styles.paymentItem}>
          <Text style={{ color: colorScheme === 'dark' ? '#E4E4E7' : '#52525B', fontSize: 14}}>First Day Payment</Text>
          <Text style={{ color: colorScheme === 'dark' ? '#E4E4E7' : '#18181B', fontSize: 14}}>KSh {bike.price}</Text>
        </View>

        <View style={styles.totalItem}>
          <Text style={styles.totalLabel}>Total Due Now</Text>
          <Text style={styles.totalValue}>
            KSh {bike.price * 7 + bike.price}
          </Text>
        </View>
      </View>

      <Button
        variant="mpesa"
        size="large"
        style={styles.confirmButton}
        leadingIcon={<Smartphone size={24} color="white" />}
        onPress={handleConfirm}
      >
        Pay with M-Pesa
      </Button>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  progressBar: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E7',
  },
  progressStep: {
    flex: 1,
    height: 4,
    backgroundColor: '#D4D4D8',
    marginHorizontal: 2,
    borderRadius: 2,
  },
  progressStepActive: {
    backgroundColor: '#10B981',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    padding: 16,
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
  bikeCard: {
    margin: 16,
    padding: 0,
    overflow: 'hidden',
  },
  bikeImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  bikeInfo: {
    padding: 16,
    backgroundColor: 'transparent',
  },
  bikeName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  detailsCard: {
    margin: 16,
    marginTop: 0,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  detailContent: {
    marginLeft: 12,
    flex: 1,
    backgroundColor: 'transparent',
  },
  detailLabel: {
    // fontFamily: FONTS.regular,
    fontSize: 12,
    // color: COLORS.gray[600],
    marginBottom: 2,
  },
  detailValue: {
    // fontFamily: FONTS.medium,
    fontSize: 16,
    // color: COLORS.gray[900],
  },
  leaseCard: {
    margin: 16,
    marginTop: 0,
  },
  paymentCard: {
    margin: 16,
    marginTop: 0,
  },
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  totalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#E4E4E7',
    paddingTop: 12,
    marginTop: 12,
    backgroundColor: 'transparent',
  },
  totalLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#18181B',
  },
  totalValue: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#52525B',
  },
  confirmButton: {
    margin: 16,
    marginBottom: 32,
  },
});