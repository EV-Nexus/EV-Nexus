import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { CheckCircle2, Calendar, Clock, MapPin, Phone, ArrowRight } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { Text, useThemeColor, View } from '@/components/Themed';
import { Button } from '@/components/ui/Button';
import { MOCK_REPAIRS } from '@/constants/mockData';

export default function ConfirmationScreen() {
    const { id, service, date, time } = useLocalSearchParams();
    const router = useRouter();

    const cardBgColor = useThemeColor({
        light: '#fff',
        dark: '#333',
    }, 'background');

    const mechanic = MOCK_REPAIRS.find(m => m.id === id);

    if (!mechanic) {
        return (
            <View style={styles.container}>
                <Text>Booking not found</Text>
            </View>
        );
    }

    const handleComplete = () => {
        router.push({
            pathname: '/(mech)/feedback',
            params: {
                id: mechanic.id,
                service,
            }
        });
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={styles.iconContainer}>
                        <CheckCircle2 size={48} color='#22C55E' />
                    </View>
                    <Text style={styles.title}>Booking Confirmed!</Text>
                    <Text style={styles.subtitle}>
                        Your repair service has been scheduled successfully
                    </Text>
                </View>

                <View style={[styles.card, { backgroundColor: cardBgColor }]}>
                    <Text style={styles.bookingTitle}>Booking Details</Text>

                    <View style={styles.bookingDetail}>
                        <Calendar size={20} color='#52525B' />
                        <View style={styles.detailContent}>
                            <Text style={styles.detailLabel}>Date</Text>
                            <Text style={styles.detailValue}>{date}</Text>
                        </View>
                    </View>

                    <View style={styles.bookingDetail}>
                        <Clock size={20} color='#52525B' />
                        <View style={styles.detailContent}>
                            <Text style={styles.detailLabel}>Time</Text>
                            <Text style={styles.detailValue}>{time}</Text>
                        </View>
                    </View>

                    <View style={styles.bookingDetail}>
                        <MapPin size={20} color='#52525B' />
                        <View style={styles.detailContent}>
                            <Text style={styles.detailLabel}>Location</Text>
                            <Text style={styles.detailValue}>{mechanic.name}</Text>
                            <Text style={styles.detailSubtext}>Ngong Road, Next to Shell Station</Text>
                        </View>
                    </View>
                </View>

                <View style={[styles.card, { backgroundColor: cardBgColor }]}>
                    <Text style={styles.serviceTitle}>Service Details</Text>

                    <View style={styles.serviceInfo}>
                        <Text style={styles.serviceName}>{service}</Text>
                        <Text style={styles.servicePrice}>Estimated: KSh 500 - 2,000</Text>
                    </View>

                    <View style={styles.mechanicContact}>
                        <Phone size={20} color='#059669' />
                        <Text style={styles.contactText}>Contact Mechanic:</Text>
                        <Text style={styles.phoneNumber}>+254 712 345 678</Text>
                    </View>
                </View>

                <View style={[styles.card, { backgroundColor: '#ECFDF5' }]}>
                    <Text style={styles.reminderTitle}>Important Reminders</Text>

                    <View style={styles.reminderItem}>
                        <Text style={styles.reminderBullet}>•</Text>
                        <Text style={styles.reminderText}>
                            Please arrive 10 minutes before your scheduled time
                        </Text>
                    </View>

                    <View style={styles.reminderItem}>
                        <Text style={styles.reminderBullet}>•</Text>
                        <Text style={styles.reminderText}>
                            Bring your bike's documentation and ID
                        </Text>
                    </View>

                    <View style={styles.reminderItem}>
                        <Text style={styles.reminderBullet}>•</Text>
                        <Text style={styles.reminderText}>
                            You'll receive an SMS reminder 2 hours before the appointment
                        </Text>
                    </View>
                </View>

                <Button
                    size="large"
                    style={styles.completeButton}
                    onPress={handleComplete}
                >
                    Complete & Rate Service
                </Button>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    header: {
        alignItems: 'center',
        padding: 24,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#DCFCE7',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#52525B',
        textAlign: 'center',
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
    bookingCard: {
        margin: 16,
    },
    bookingTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 16,
    },
    bookingDetail: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
        backgroundColor: 'transparent',
    },
    detailContent: {
        marginLeft: 12,
        flex: 1,
        backgroundColor: 'transparent',
    },
    detailLabel: {
        fontSize: 12,
        color: '#52525B',
        marginBottom: 2,
    },
    detailValue: {
        fontWeight: '500',
        fontSize: 16,
    },
    detailSubtext: {
        fontSize: 14,
        color: '#52525B',
        marginTop: 2,
    },
    serviceCard: {
        margin: 16,
        marginTop: 0,
    },
    serviceTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 12,
    },
    serviceInfo: {
        backgroundColor: '#FAFAFA',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    serviceName: {
        fontWeight: '500',
        fontSize: 16,
        marginBottom: 4,
    },
    servicePrice: {
        fontSize: 14,
        color: '#52525B',
    },
    mechanicContact: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: 12,
    },
    contactText: {
        fontSize: 14,
        color: '#52525B',
        marginLeft: 8,
        marginRight: 4,
    },
    phoneNumber: {
        fontWeight: '500',
        fontSize: 14,
        color: '#059669',
    },
    reminderTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 12,
        color: '#059669',
    },
    reminderItem: {
        flexDirection: 'row',
        marginBottom: 8,
        backgroundColor: 'transparent',
    },
    reminderBullet: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#059669',
        marginRight: 8,
    },
    reminderText: {
        flex: 1,
        fontSize: 14,
        color: '#047857',
        lineHeight: 20,
    },
    completeButton: {
        margin: 16,
        marginBottom: 32,
    },
});