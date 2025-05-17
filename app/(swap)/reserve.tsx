import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Battery, Clock, AlertTriangle } from 'lucide-react-native';

import { MOCK_SWAP_STATIONS } from '@/constants/mockData';
import { Text, useThemeColor, View } from '@/components/Themed';
import { Button } from '@/components/ui/Button';

export default function ReserveBatteryScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const [isConfirming, setIsConfirming] = useState(false);

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

    const handleConfirm = () => {
        setIsConfirming(true);
        setTimeout(() => {
            router.push({
                pathname: '/(swap)/instructions',
                params: { id: station.id }
            });
        }, 1000);
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
                <View style={[styles.card, { backgroundColor: cardBgColor }]}>
                    <Text style={styles.stationName}>{station.name}</Text>
                    <Text style={styles.stationAddress}>{station.address}</Text>

                    <View style={styles.batteryInfo}>
                        <Battery size={24} color='#059669' />
                        <Text style={styles.batteryCount}>
                            {station.batteryAvailable} batteries available
                        </Text>
                    </View>
                </View>

                <View style={styles.infoSection}>
                    <Text style={styles.infoTitle}>Reservation Details</Text>

                    <View style={[styles.card, { backgroundColor: cardBgColor }]}>
                        <View style={styles.infoItem}>
                            <Clock size={20} color='#52525B' />
                            <View style={styles.infoContent}>
                                <Text style={styles.infoLabel}>Reservation Time</Text>
                                <Text style={styles.infoValue}>15 minutes</Text>
                            </View>
                        </View>

                        <View style={styles.infoItem}>
                            <Battery size={20} color='#52525B' />
                            <View style={styles.infoContent}>
                                <Text style={styles.infoLabel}>Battery Type</Text>
                                <Text style={styles.infoValue}>Standard 60V 20Ah</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={[styles.card, { backgroundColor: cardBgColor }]}>
                    <AlertTriangle size={24} color='#CA8A04' />
                    <View style={styles.warningContent}>
                        <Text style={styles.warningTitle}>Important Notice</Text>
                        <Text style={styles.warningText}>
                            Your reservation will expire after 15 minutes if you don't arrive at the station. Please ensure you can reach the location within this time.
                        </Text>
                    </View>
                </View>

                <View style={styles.termsSection}>
                    <Text style={styles.termsTitle}>Terms of Reservation</Text>
                    <View style={styles.termsList}>
                        <Text style={styles.termItem}>• Reservation is valid for 15 minutes</Text>
                        <Text style={styles.termItem}>• One battery per reservation</Text>
                        <Text style={styles.termItem}>• Must present valid ID at station</Text>
                        <Text style={styles.termItem}>• Standard swap fees apply</Text>
                    </View>
                </View>

                <Button
                    size="large"
                    style={styles.confirmButton}
                    loading={isConfirming}
                    onPress={handleConfirm}
                >
                    Confirm Reservation
                </Button>

                <Button
                    variant="outline"
                    size="large"
                    onPress={() => router.back()}
                >
                    Cancel
                </Button>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
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
    stationName: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 4,
    },
    stationAddress: {
        fontSize: 14,
        color: '#52525B',
        marginBottom: 12,
    },
    batteryInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ECFDF5',
        padding: 12,
        borderRadius: 8,
    },
    batteryCount: {
       fontWeight: '500',
        fontSize: 16,
        color: '#047857',
        marginLeft: 12,
    },
    infoSection: {
        marginBottom: 24,
    },
    infoTitle: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: 'transparent',
    },
    infoContent: {
        marginLeft: 12,
        flex: 1,
        backgroundColor: 'transparent',
    },
    infoLabel: {
        fontSize: 14,
        color: '#52525B',
        marginBottom: 2,
    },
    infoValue: {
        fontWeight: '500',
        fontSize: 16,
    },
    warningContent: {
        flex: 1,
        marginLeft: 12,
        backgroundColor: 'transparent',
    },
    warningTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#A16207',
        marginBottom: 4,
    },
    warningText: {
        fontSize: 14,
        color: '#A16207',
        lineHeight: 20,
    },
    termsSection: {
        marginBottom: 24,
    },
    termsTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 12,
    },
    termsList: {
        backgroundColor: '#FAFAFA',
        padding: 16,
        borderRadius: 8,
    },
    termItem: {
        fontSize: 14,
        color: '#3F3F46',
        marginBottom: 8,
        lineHeight: 20,
    },
    confirmButton: {
        marginBottom: 12,
    },
});