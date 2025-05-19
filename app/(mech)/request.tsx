import React, { useState } from 'react';
import { StyleSheet, ScrollView, TextInput } from 'react-native';
import { Calendar, Clock, Wrench, AlertTriangle } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { Text, useThemeColor, View } from '@/components/Themed';
import { Button } from '@/components/ui/Button';
import { MOCK_REPAIRS } from '@/constants/mockData';

export default function RequestRepairScreen() {
    const { id, service } = useLocalSearchParams();
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const cardBgColor = useThemeColor({
        light: '#fff',
        dark: '#333',
    }, 'background');

    const mechanic = MOCK_REPAIRS.find(m => m.id === id);

    if (!mechanic) {
        return (
            <View style={styles.container}>
                <Text>Mechanic not found</Text>
            </View>
        );
    }

    const handleSubmit = () => {
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
              router.push({
                pathname: '/(mech)/confirmation',
                params: {
                  id: mechanic.id,
                  service,
                  date: selectedDate,
                  time: selectedTime,
                }
              });
        }, 1000);
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
                <View style={[styles.card, { backgroundColor: cardBgColor }]}>
                    <View style={styles.serviceHeader}>
                        <Wrench size={24} color='#059669' />
                        <View style={styles.serviceInfo}>
                            <Text style={styles.serviceTitle}>{service}</Text>
                            <Text style={styles.mechanicName}>{mechanic.name}</Text>
                        </View>
                    </View>

                    <View style={styles.pricingInfo}>
                        <Text style={styles.priceLabel}>Estimated Price</Text>
                        <Text style={styles.priceRange}>KSh 500 - KSh 2,000</Text>
                        <Text style={styles.priceNote}>Final price may vary based on diagnosis</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Select Date & Time</Text>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.datesList}
                    >
                        {['Today', 'Tomorrow', 'Wed, 15 Mar', 'Thu, 16 Mar', 'Fri, 17 Mar'].map((date) => (
                            <Button
                                key={date}
                                variant={selectedDate === date ? 'primary' : 'outline'}
                                style={styles.dateButton}
                                onPress={() => setSelectedDate(date)}
                            >
                                {date}
                            </Button>
                        ))}
                    </ScrollView>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.timesList}
                    >
                        {['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'].map((time) => (
                            <Button
                                key={time}
                                variant={selectedTime === time ? 'primary' : 'outline'}
                                style={styles.timeButton}
                                onPress={() => setSelectedTime(time)}
                            >
                                {time}
                            </Button>
                        ))}
                    </ScrollView>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Problem Description</Text>
                    <TextInput
                        style={styles.descriptionInput}
                        placeholder="Describe the issue you're experiencing..."
                        multiline
                        numberOfLines={4}
                        value={description}
                        onChangeText={setDescription}
                        textAlignVertical="top"
                    />
                </View>

                <View style={[styles.card, styles.noticeCard]}>
                    <AlertTriangle size={24} color='#CA8A04' />
                    <View style={styles.noticeContent}>
                        <Text style={styles.noticeTitle}>Important Notice</Text>
                        <Text style={styles.noticeText}>
                            Please ensure your bike is brought to the workshop at the scheduled time.
                            Cancellations should be made at least 2 hours before the appointment.
                        </Text>
                    </View>
                </View>

                <Button
                    size="large"
                    style={styles.submitButton}
                    disabled={!selectedDate || !selectedTime}
                    loading={isSubmitting}
                    onPress={handleSubmit}
                >
                    Confirm Booking
                </Button>

                <Button
                    size='large'
                    variant='outline'
                    onPress={() => router.back()}
                    disabled={isSubmitting}
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
    serviceHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: 'transparent',
    },
    serviceInfo: {
        marginLeft: 12,
        flex: 1,
        backgroundColor: 'transparent',
    },
    serviceTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 4,
    },
    mechanicName: {
        fontSize: 14,
        color: '#52525B',
    },
    pricingInfo: {
        backgroundColor: '#FAFAFA',
        padding: 12,
        borderRadius: 8,
    },
    priceLabel: {
        fontWeight: '500',
        fontSize: 14,
        color: '#3F3F46',
        marginBottom: 4,
    },
    priceRange: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 4,
    },
    priceNote: {
        fontSize: 12,
        color: '#52525B',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 12,
    },
    datesList: {
        marginBottom: 12,
    },
    dateButton: {
        marginRight: 8,
    },
    timesList: {
        marginBottom: 12,
    },
    timeButton: {
        marginRight: 8,
    },
    descriptionInput: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 12,
        height: 120,
        borderWidth: 1,
        borderColor: '#E4E4E7',
    },
    noticeCard: {
        flexDirection: 'row',
        backgroundColor: '#FEFCE8',
        marginBottom: 24,
    },
    noticeContent: {
        flex: 1,
        marginLeft: 12,
        backgroundColor: 'transparent',
    },
    noticeTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#A16207',
        marginBottom: 4,
    },
    noticeText: {
        fontSize: 14,
        color: '#A16207',
        lineHeight: 20,
    },
    submitButton: {
        marginBottom: 12,
    },
});