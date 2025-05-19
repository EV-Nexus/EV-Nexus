import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'

import { Text, useThemeColor, View } from '../Themed'
import { ArrowRight, MapPin, Star, Wrench } from 'lucide-react-native'

interface Repair {
    id: string | number;
    image: string;
    name: string;
    rating: number;
    distance: number;
    services: string[];
}

interface RepairCardProps {
    repair: Repair;
}

export default function RepairCard({ repair }: RepairCardProps) {
    const router = useRouter();

    const cardBgColor = useThemeColor({ light: '#fff', dark: '#333' }, 'background');
    return (
        <TouchableOpacity 
        key={repair.id} 
        onPress={() => router.push(`/repairs/${repair.id}`)}
        activeOpacity={0.8}
        >
            <View style={[styles.card, { backgroundColor: cardBgColor }]}>
                <Image source={{ uri: repair.image }} style={styles.repairImage} resizeMode='cover' />
                <View style={[styles.repairInfo, { backgroundColor: cardBgColor }]}>
                    <Text style={styles.repairName}>{repair.name}</Text>
                    <View style={styles.ratingContainer}>
                        <Star size={16} />
                        <Text style={styles.ratingText}>{repair.rating}</Text>
                    </View>
                    <View style={styles.locationContainer}>
                        <MapPin size={14} />
                        <Text style={styles.distanceText}>{repair.distance} km away</Text>
                    </View>
                    <View style={styles.servicesContainer}>
                        {repair.services.map((service: string, index: number) => (
                            <View key={index} style={styles.serviceTag}>
                                <Wrench size={12} />
                                <Text style={styles.serviceText}>{service}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={styles.viewDetailsContainer}>
                        <Text style={styles.viewDetailsText}>View Pricing</Text>
                        <ArrowRight size={16} color="#059669" />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        marginBottom: 16,
        padding: 0,
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        backgroundColor: '#fff',
    },
    repairImage: {
        width: 100,
        height: '100%',
    },
    repairInfo: {
        flex: 1,
        padding: 12,
    },
    repairName: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 6,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
        backgroundColor: 'transparent',
    },
    ratingText: {
        fontWeight: '500',
        fontSize: 14,
        color: '#27272A',
        marginLeft: 4,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        backgroundColor: 'transparent',
    },
    distanceText: {
        fontSize: 14,
        marginLeft: 4,
    },
    servicesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 14,
        backgroundColor: 'transparent',
    },
    serviceTag: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 4,
        marginRight: 6,
        marginBottom: 6,

    },
    serviceText: {
        fontWeight: '500',
        fontSize: 12,
        marginLeft: 4,
    },
    viewDetailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
    },
    viewDetailsText: {
        fontWeight: '500',
        marginRight: 4,
        fontSize: 14,
        color: '#059669',
    },
})