import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Battery, Key, Zap, CheckCircle2 } from 'lucide-react-native';

import { Text, useThemeColor, View } from '@/components/Themed';
import { Button } from '@/components/ui/Button';
import { MOCK_SWAP_STATIONS } from '@/constants/mockData';

export default function SwapInstructionsScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

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

    const handleComplete = () => {
        router.push({
            pathname: '/(swap)/feedback',
            params: { id: station.id }
        });
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
                <Text style={styles.title}>Battery Swap Guide</Text>
                <Text style={styles.subtitle}>
                    Follow these steps to safely swap your battery
                </Text>

                <View style={styles.steps}>
                    <View style={[styles.card, { backgroundColor: cardBgColor }]}>
                        <View style={[styles.stepIcon, { backgroundColor: '#D1FAE5' }]}>
                            <Key size={24} color='#059669' />
                        </View>
                        <View style={styles.stepContent}>
                            <Text style={styles.stepTitle}>1. Unlock Battery</Text>
                            <Text style={styles.stepText}>
                                Use your key to unlock the current battery from your e-bike. Ensure the bike is turned off before removing the battery.
                            </Text>
                        </View>
                    </View>

                    <View style={[styles.card, { backgroundColor: cardBgColor }]}>
                        <View style={[styles.stepIcon, { backgroundColor: '#DBEAFE' }]}>
                            <Battery size={24} color='#2563EB' />
                        </View>
                        <View style={styles.stepContent}>
                            <Text style={styles.stepTitle}>2. Remove Battery</Text>
                            <Text style={styles.stepText}>
                                Carefully slide out the depleted battery. Handle with care and avoid dropping. Place it in the designated charging slot.
                            </Text>
                        </View>
                    </View>

                    <View style={[styles.card, { backgroundColor: cardBgColor }]}>
                        <View style={[styles.stepIcon, { backgroundColor: '#FFEDD5' }]}>
                            <Zap size={24} color='#EA580C' />
                        </View>
                        <View style={styles.stepContent}>
                            <Text style={styles.stepTitle}>3. Insert New Battery</Text>
                            <Text style={styles.stepText}>
                                Take a fully charged battery from the kiosk. Align it properly with your e-bike's battery slot and slide it in until you hear a click.
                            </Text>
                        </View>
                    </View>

                    <View style={[styles.card, { backgroundColor: cardBgColor }]}>
                        <View style={[styles.stepIcon, { backgroundColor: '#DCFCE7' }]}>
                            <CheckCircle2 size={24} color='#16A34A' />
                        </View>
                        <View style={styles.stepContent}>
                            <Text style={styles.stepTitle}>4. Verify Connection</Text>
                            <Text style={styles.stepText}>
                                Lock the battery in place and turn on your e-bike to verify the new battery is properly connected and functioning.
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={[{ backgroundColor: cardBgColor }, styles.safetyCard]}>
                    <Text style={styles.safetyTitle}>Safety Reminders</Text>
                    <View style={styles.safetyList}>
                        <Text style={styles.safetyItem}>• Ensure bike is powered off before swap</Text>
                        <Text style={styles.safetyItem}>• Handle batteries with dry hands only</Text>
                        <Text style={styles.safetyItem}>• Don't force battery if resistance felt</Text>
                        <Text style={styles.safetyItem}>• Report any damage or issues to staff</Text>
                    </View>
                </View>

                <Button
                    size="large"
                    style={styles.completeButton}
                    onPress={handleComplete}
                >
                    Complete Swap & Rate Experience
                </Button>
                <Button
                    variant="outline"
                    size="large"
                    onPress={() => router.back()}
                >
                    Go Back
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
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#52525B',
        marginBottom: 24,
    },
    steps: {
        marginBottom: 24,
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
        flexDirection: 'row',
    },
    stepIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    stepContent: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    stepTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 4,
    },
    stepText: {
        fontSize: 14,
        color: '#3F3F46',
        lineHeight: 20,
    },
    safetyCard: {
        marginBottom: 24,
        backgroundColor: '#FEF9C3',
        borderRadius: 10,
        padding: 16,
    },
    safetyTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#A16207',
        marginBottom: 12,
    },
    safetyList: {
        marginLeft: 4,
        backgroundColor: 'transparent',
        padding: 8,
    },
    safetyItem: {
        fontSize: 14,
        color: '#A16207',
        marginBottom: 8,
        lineHeight: 20,
    },
    completeButton: {
        marginBottom: 12,
    },
});