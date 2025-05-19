import React, { useState } from 'react';
import { StyleSheet, ScrollView, Image, TouchableOpacity, Platform, Linking } from 'react-native';
import { MapPin, Star, Phone, Clock, Wrench, Shield, Award, CheckCircle2 } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { MOCK_REPAIRS } from '@/constants/mockData';
import { Text, useThemeColor, View } from '@/components/Themed';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function MechanicDetailsScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [selectedService, setSelectedService] = useState<string | null>(null);

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

    const handleRequestService = () => {
        router.push({
          pathname: '/(mech)/request',
          params: { id: mechanic.id, service: selectedService }
        });
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Image source={{ uri: mechanic.image }} style={styles.coverImage} />

            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.mechanicName}>{mechanic.name}</Text>
                        <View style={styles.ratingContainer}>
                            <Star size={16} color='#EAB308' fill='#EAB308' />
                            <Text style={styles.rating}>{mechanic.rating}</Text>
                            <Text style={styles.reviewCount}>(124 reviews)</Text>
                        </View>
                    </View>

                    <View style={styles.badges}>
                        <Badge variant="success" size="small">Verified</Badge>
                        <Badge variant="default" size="small" style={styles.certifiedBadge}>EV Certified</Badge>
                    </View>
                </View>

                <View style={[styles.card, { backgroundColor: cardBgColor }]}>
                    <View style={styles.infoItem}>
                        <MapPin size={20} color='#52525B' />
                        <View style={styles.infoContent}>
                            <Text style={styles.infoLabel}>Location</Text>
                            <Text style={styles.infoValue}>Ngong Road, Next to Shell Station</Text>
                        </View>
                    </View>

                    <View style={styles.infoItem}>
                        <Clock size={20} color='#52525B' />
                        <View style={styles.infoContent}>
                            <Text style={styles.infoLabel}>Working Hours</Text>
                            <Text style={styles.infoValue}>Mon-Sat: 8:00 AM - 6:00 PM</Text>
                        </View>
                    </View>

                    <View style={styles.infoItem}>
                        <Phone size={20} color='#52525B' />
                        <View style={styles.infoContent}>
                            <Text style={styles.infoLabel}>Contact</Text>
                            <TouchableOpacity onPress={() => Linking.openURL('tel:+254712345678')}>
                                <Text style={styles.phoneNumber}>+254 712 345 678</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.servicesSection}>
                    <Text style={styles.sectionTitle}>Available Services</Text>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.servicesList}>
                        {['Battery Service', 'Motor Repair', 'Controller Fix', 'Brake Service', 'General Service'].map((service) => (
                            <TouchableOpacity
                                key={service}
                                style={[
                                    styles.serviceCard,
                                    selectedService === service && styles.serviceCardSelected
                                ]}
                                onPress={() => setSelectedService(service)}
                            >
                                <Wrench
                                    size={24}
                                    color={selectedService === service ? '#FFFFFF' : '#3F3F46'}
                                />
                                <Text
                                    style={[
                                        styles.serviceTitle,
                                        selectedService === service && styles.serviceTitleSelected
                                    ]}
                                >
                                    {service}
                                </Text>
                                <Text
                                    style={[
                                        styles.servicePrice,
                                        selectedService === service && styles.servicePriceSelected
                                    ]}
                                >
                                    From KSh 500
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <View style={[styles.card, styles.guaranteeCard]}>
                    <View style={styles.guaranteeHeader}>
                        <Shield size={24} color='#16A34A' />
                        <Text style={styles.guaranteeTitle}>Our Guarantee</Text>
                    </View>

                    <View style={styles.guaranteeItem}>
                        <CheckCircle2 size={20} color='#16A34A' />
                        <Text style={styles.guaranteeText}>90-day warranty on all repairs</Text>
                    </View>

                    <View style={styles.guaranteeItem}>
                        <CheckCircle2 size={20} color='#16A34A' />
                        <Text style={styles.guaranteeText}>Genuine parts used</Text>
                    </View>

                    <View style={styles.guaranteeItem}>
                        <CheckCircle2 size={20} color='#16A34A' />
                        <Text style={styles.guaranteeText}>Fixed price - no hidden costs</Text>
                    </View>
                </View>

                <View style={[styles.card, { backgroundColor: cardBgColor }]}>
                    <View style={styles.expertiseHeader}>
                        <Award size={24} color='#059669' />
                        <Text style={styles.expertiseTitle}>Expertise</Text>
                    </View>

                    <Text style={styles.expertiseText}>
                        Our team specializes in electric vehicle repairs with over 5 years of experience.
                        We're certified by leading EV manufacturers and use state-of-the-art diagnostic tools.
                    </Text>

                    <View style={styles.certifications}>
                        <Image
                            source={{ uri: "https://m.media-amazon.com/images/I/81LkkK5SY5L.jpg" }}
                            style={styles.certImage}
                        />
                        <Image
                            source={{ uri: "https://m.media-amazon.com/images/I/81LkkK5SY5L.jpg" }}
                            style={styles.certImage}
                        />
                    </View>
                </View>

                <Button
                    size="large"
                    style={styles.requestButton}
                    disabled={!selectedService}
                    onPress={handleRequestService}
                >
                    {selectedService ? 'Request Service' : 'Select a Service'}
                </Button>

               <Button
                    size="large"
                    variant="outline"
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
    coverImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    content: {
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    headerLeft: {
        flex: 1,
        marginRight: 16,
    },
    mechanicName: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 4,
    },
    reviewCount: {
        fontSize: 14,
        color: '#52525B',
        marginLeft: 4,
    },
    badges: {
        flexDirection: 'row',
    },
    certifiedBadge: {
        marginLeft: 4,
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
        alignItems: 'flex-start',
        marginBottom: 16,
        backgroundColor: 'transparent',
    },
    infoContent: {
        marginLeft: 12,
        flex: 1,
        backgroundColor: 'transparent',
    },
    infoLabel: {
        fontSize: 12,
        color: '#52525B',
        marginBottom: 2,
    },
    infoValue: {
        fontWeight: '500',
        fontSize: 14,
    },
    phoneNumber: {
        fontWeight: '500',
        fontSize: 14,
        color: '#059669',
        textDecorationLine: 'underline',
    },
    servicesSection: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 12,
    },
    servicesList: {
        marginHorizontal: -16,
        paddingHorizontal: 16,
    },
    serviceCard: {
        width: 160,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginRight: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E4E4E7',
    },
    serviceCardSelected: {
        backgroundColor: '#059669',
        borderColor: '#059669',
    },
    serviceTitle: {
        fontWeight: '500',
        fontSize: 14,
        marginTop: 8,
        marginBottom: 4,
        textAlign: 'center',
        color: '#3F3F46',
    },
    serviceTitleSelected: {
        color: '#FFFFFF',
    },
    servicePrice: {
        fontSize: 12,
        color: '#52525B',
    },
    servicePriceSelected: {
        color: '#FFFFFF',
    },
    guaranteeCard: {
        marginBottom: 24,
        backgroundColor: '#ECFDF5',
    },
    guaranteeHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: 'transparent',
    },
    guaranteeTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#15803D',
        marginLeft: 8,
    },
    guaranteeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        backgroundColor: 'transparent',
    },
    guaranteeText: {
        fontWeight: '500',
        fontSize: 14,
        color: '#15803D',
        marginLeft: 8,
    },
    expertiseHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        backgroundColor: 'transparent',
    },
    expertiseTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 8,
    },
    expertiseText: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 16,
    },
    certifications: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'transparent',
    },
    certImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    requestButton: {
        marginBottom: 12,
    },
});