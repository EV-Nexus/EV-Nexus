import React, { useState } from 'react';
import { StyleSheet, ScrollView, useColorScheme } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MOCK_BIKES } from '@/constants/mockData';
import { Button } from '@/components/ui/Button';
import { Calendar, Bike, Zap, Shield } from 'lucide-react-native';

import { Text, useThemeColor, View } from '@/components/Themed';

export default function LeaseDetailsScreen() {
    const colorScheme = useColorScheme();
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [leaseDuration, setLeaseDuration] = useState(30); // Default to 30 days

    const cardBgColor = useThemeColor({
        light: '#fff',
        dark: '#333',
    }, 'background');

    const bike = MOCK_BIKES.find(b => b.id === id);

    if (!bike) {
        return (
            <View style={styles.container}>
                <Text>Bike not found</Text>
            </View>
        );
    }

    const handleContinue = () => {
        router.push({
            pathname: '/(lease)/rider-info',
            params: { id, duration: leaseDuration }
        });
    };

    return (
        <>
            <View style={styles.progressBar}>
                <View style={[styles.progressStep, styles.progressStepActive]} />
                <View style={styles.progressStep} />
                <View style={styles.progressStep} />
                <View style={styles.progressStep} />
            </View>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={[styles.card, { backgroundColor: cardBgColor }]}>
                    <View style={styles.bikeInfo}>
                        <Bike size={28} color='#059669' />
                        <View style={styles.bikeDetails}>
                            <Text style={styles.bikeName}>{bike.name}</Text>
                            <Text style={{ color: colorScheme === 'dark' ? '#E4E4E7' : '#52525B', fontSize: 14 }}>{bike.brand}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Lease Duration</Text>
                    <View style={styles.durationOptions}>
                        <Button
                            variant={leaseDuration === 7 ? 'primary' : 'outline'}
                            style={styles.durationButton}
                            onPress={() => setLeaseDuration(7)}
                        >
                            7 Days
                        </Button>
                        <Button
                            variant={leaseDuration === 30 ? 'primary' : 'outline'}
                            style={styles.durationButton}
                            onPress={() => setLeaseDuration(30)}
                        >
                            30 Days
                        </Button>
                        <Button
                            variant={leaseDuration === 90 ? 'primary' : 'outline'}
                            style={styles.durationButton}
                            onPress={() => setLeaseDuration(90)}
                        >
                            90 Days
                        </Button>
                    </View>
                </View>

                <View style={[styles.card, { backgroundColor: cardBgColor }]}>
                    <Text style={styles.summaryTitle}>Lease Summary</Text>

                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryLabel}>Daily Rate</Text>
                        <Text style={styles.summaryValue}>KSh {bike.price}</Text>
                    </View>

                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryLabel}>Duration</Text>
                        <Text style={styles.summaryValue}>{leaseDuration} days</Text>
                    </View>

                    <View style={styles.summaryItem}>
                        <Text style={styles.summaryLabel}>Security Deposit</Text>
                        <Text style={styles.summaryValue}>KSh {bike.price * 7}</Text>
                    </View>

                    <View style={[styles.summaryItem, styles.totalItem]}>
                        <Text style={styles.totalLabel}>Total Due Today</Text>
                        <Text style={styles.totalValue}>
                            KSh {bike.price * 7 + bike.price} {/* Deposit + First day */}
                        </Text>
                    </View>
                </View>

                <View style={styles.features}>
                    <View style={styles.featureItem}>
                        <Calendar size={24} color='#059669' />
                        <Text style={styles.featureText}>Daily M-Pesa Payments</Text>
                    </View>

                    <View style={styles.featureItem}>
                        <Zap size={24} color='#2563EB' />
                        <Text style={styles.featureText}>Unlimited Battery Swaps</Text>
                    </View>

                    <View style={styles.featureItem}>
                        <Shield size={24} color='#16A34A' />
                        <Text style={styles.featureText}>Basic Insurance Included</Text>
                    </View>
                </View>

                <Button
                    size="large"
                    style={styles.continueButton}
                    onPress={handleContinue}
                >
                    Continue to Rider Details
                </Button>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
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
        marginHorizontal: 16,
        marginBottom: 24,
    },
    bikeInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    bikeDetails: {
        marginLeft: 12,
        backgroundColor: 'transparent',
    },
    bikeName: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    bikeType: {
        // fontFamily: FONTS.regular,
        fontSize: 14,
        // color: COLORS.gray[600],
    },
    section: {
        padding: 16,
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 12,
    },
    durationOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 48,
    },
    durationButton: {
        flex: 1,
        marginHorizontal: 4,
    },
    summaryCard: {
        margin: 16,
    },
    summaryTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 16,
    },
    summaryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
        backgroundColor: 'transparent',
    },
    summaryLabel: {
        // fontFamily: FONTS.regular,
        fontSize: 14,
        // color: COLORS.gray[600],
    },
    summaryValue: {
        // fontFamily: FONTS.medium,
        fontSize: 14,
        // color: COLORS.gray[900],
    },
    totalItem: {
        borderTopWidth: 1,
        borderTopColor: '#E4E4E7',
        paddingTop: 12,
        marginTop: 12,
    },
    totalLabel: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    totalValue: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#52525B',
    },
    features: {
        padding: 16,
        marginBottom: 24,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    featureText: {
        // fontFamily: FONTS.medium,
        fontSize: 16,
        // color: COLORS.gray[700],
        marginLeft: 12,
    },
    continueButton: {
        margin: 16,
        marginBottom: 32,
    },
});