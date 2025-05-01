import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { Text, useThemeColor, View } from '@/components/Themed'
import { SwapCardProps } from '@/constants/battery-swap'

const SwapCard = ({
    name,
    address,
    distance,
    available,
    total,
    price,
    openHours,
}: SwapCardProps) => {

    // Use the theme color for the card background
    const cardBgColor = useThemeColor({ light: '#fff', dark: '#333' }, 'background');


    // Calculate availability percentage
    const availabilityPercent = (available / total) * 100;

    // Determine availability status and color
    const getAvailabilityStatus = () => {
        if (availabilityPercent > 60) return { text: 'High', color: '#10B981' }; // green-500
        if (availabilityPercent > 20) return { text: 'Medium', color: '#F59E0B' }; // amber-500
        return { text: 'Low', color: '#EF4444' }; // red-500
    };

    return (
        <View style={[styles.evCard, { backgroundColor: cardBgColor }]}>
            <View style={styles.headerContainer}>
                <View style={{ backgroundColor: 'transparent' }}>
                    <Text style={styles.cardTitle}>{name}</Text>
                    <Text style={styles.cardAddress}>{address}</Text>
                </View>
                <Text style={styles.badgeText}>
                    {distance.toFixed(1)} km
                </Text>
            </View>

            <View style={styles.infoContainer}>
                <View style={styles.timeContainer}>
                    <Ionicons name="time-outline" size={16} color="#6B7280" />
                    <Text style={styles.openHoursText}>{openHours}</Text>
                </View>
                <Text style={styles.priceText}>{price} KSh</Text>
            </View>

            <View style={styles.progressBackground}>
                <View
                    style={[
                        styles.progressFill,
                        {
                            width: `${availabilityPercent}%`,
                            backgroundColor: getAvailabilityStatus().color.replace('bg-', '')
                        }
                    ]}
                ></View>
            </View>

            <View style={styles.availabilityContainer}>
                <Text style={styles.availableText}>{available} available</Text>
                <Text style={styles.totalText}>{total} total</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#3B82F6' }]} onPress={() => console.log('Navigate')}>
                    <Ionicons name="navigate-outline" size={16} color="#fff" />
                    <Text style={styles.buttonText}>Directions</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#10B981' }]} onPress={() => console.log('Reserve')}>
                    <Ionicons name="checkmark-outline" size={16} color="#fff" />
                    <Text style={styles.buttonText}>Reserve</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SwapCard

const styles = StyleSheet.create({
    evCard: {
        marginBottom: 16,
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
        backgroundColor: 'transparent',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    cardAddress: {
        fontSize: 14,
        color: '#6B7280',
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '500',
        color: 'white',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 9999,
        backgroundColor: '#3B82F6',
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 12,
        marginBottom: 12,
        backgroundColor: 'transparent',
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    openHoursText: {
        fontSize: 14,
        color: '#6B7280',
        marginLeft: 4,
    },
    priceText: {
        fontSize: 14,
        fontWeight: '500',
    },
    progressBackground: {
        backgroundColor: '#F3F4F6',
        borderRadius: 9999,
        height: 8,
        marginBottom: 4,
    },
    progressFill: {
        height: 8,
        borderRadius: 9999,
    },
    availabilityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        backgroundColor: 'transparent',
    },
    availableText: {
        fontSize: 12,
        fontWeight: '500',
    },
    totalText: {
        fontSize: 12,
        color: '#6B7280',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 8,
        backgroundColor: 'transparent',
    },
    button: {
        flex: 1,
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#fff',
        marginLeft: 4,
    },
})