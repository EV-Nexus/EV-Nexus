import React from 'react';
import { ScrollView, StyleSheet, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

import { View, Text, useThemeColor } from '@/components/Themed';
import { EvBike } from '@/constants/lease-constants';
import Footer from '@/components/Footer';
import BikeCard from '@/components/BikeCard';

const evBikes: EvBike[] = [
    {
        id: 1,
        name: 'EcoBoda 150',
        image: 'https://images.unsplash.com/photo-1629315952659-f431e05c5f76?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: 350,
        range: 80,
        batterySwap: true,
        category: 'economy', // Now implicitly typed as 'economy'
        features: [
            { icon: <Ionicons name="battery-charging" size={20} color="green" />, label: 'Battery Swap' },
            { icon: <Ionicons name="speedometer" size={20} color="blue" />, label: '80 km Range' },
            { icon: <Ionicons name="people" size={20} color="blue" />, label: '2 Person' },
            { icon: <Ionicons name="cash" size={20} color="blue" />, label: 'KSh 25,000 Deposit' },
            { icon: <Ionicons name="car-sport" size={20} color="blue" />, label: 'Delivery in 2 days' },
            { icon: <Ionicons name="speedometer" size={20} color="blue" />, label: '25 km/h Top Speed' },
        ],
    },
    {
        id: 2,
        name: 'GreenRider 200',
        image: 'https://images.unsplash.com/photo-1629315952659-f431e05c5f76?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: 450,
        range: 100,
        batterySwap: true,
        category: 'standard', // Now implicitly typed as 'standard'
        features: [
            { icon: <Ionicons name="battery-charging" size={20} color="green" />, label: 'Battery Swap' },
            { icon: <Ionicons name="speedometer" size={20} color="blue" />, label: '100 km Range' },
            { icon: <Ionicons name="people" size={20} color="blue" />, label: '2 Person' },
            { icon: <Ionicons name="cash" size={20} color="blue" />, label: 'KSh 35,000 Deposit' },
            { icon: <Ionicons name="car-sport" size={20} color="blue" />, label: 'Delivery in 1 day' },
            { icon: <Ionicons name="speedometer" size={20} color="blue" />, label: '35 km/h Top Speed' },
        ],
    },
    {
        id: 3,
        name: 'PowerMax 300',
        image: 'https://images.unsplash.com/photo-1629315952659-f431e05c5f76?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: 600,
        range: 120,
        batterySwap: true,
        category: 'premium', // Now implicitly typed as 'premium'
        features: [
            { icon: <Ionicons name="battery-charging" size={20} color="green" />, label: 'Battery Swap' },
            { icon: <Ionicons name="speedometer" size={20} color="blue" />, label: '120 km Range' },
            { icon: <Ionicons name="people" size={20} color="blue" />, label: '2 Person' },
            { icon: <Ionicons name="cash" size={20} color="blue" />, label: 'KSh 50,000 Deposit' },
            { icon: <Ionicons name="car-sport" size={20} color="blue" />, label: 'Delivery in 1 day' },
            { icon: <Ionicons name="speedometer" size={20} color="blue" />, label: '40 km/h Top Speed' },
        ],
    },
    {
        id: 4,
        name: 'EcoRider 400',
        image: 'https://images.unsplash.com/photo-1629315952659-f431e05c5f76?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: 800,
        range: 150,
        batterySwap: true,
        category: 'premium', // Now implicitly typed as 'premium'
        features: [
            { icon: <Ionicons name="battery-charging" size={20} color="green" />, label: 'Battery Swap' },
            { icon: <Ionicons name="speedometer" size={20} color="blue" />, label: '150 km Range' },
            { icon: <Ionicons name="people" size={20} color="blue" />, label: '2 Person' },
            { icon: <Ionicons name="cash" size={20} color="blue" />, label: 'KSh 70,000 Deposit' },
            { icon: <Ionicons name="car-sport" size={20} color="blue" />, label: 'Delivery in 1 day' },
            { icon: <Ionicons name="speedometer" size={20} color="blue" />, label: '50 km/h Top Speed' },
        ],
    },
    {
        id: 5,
        name: 'EcoRider 500',
        image: 'https://images.unsplash.com/photo-1629315952659-f431e05c5f76?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: 1000,
        range: 200,
        batterySwap: true,
        category: 'premium', // Now implicitly typed as 'premium'
        features: [
            { icon: <Ionicons name="battery-charging" size={20} color="green" />, label: 'Battery Swap' },
            { icon: <Ionicons name="speedometer" size={20} color="blue" />, label: '200 km Range' },
            { icon: <Ionicons name="people" size={20} color="blue" />, label: '2 Person' },
            { icon: <Ionicons name="cash" size={20} color="blue" />, label: 'KSh 100,000 Deposit' },
            { icon: <Ionicons name="car-sport" size={20} color="blue" />, label: 'Delivery in 1 day' },
            { icon: <Ionicons name="speedometer" size={20} color="blue" />, label: '60 km/h Top Speed' },
        ],
    }
]


const AllModelsTab = () => {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    // Theme Colors
    const backgroundColor = useThemeColor({
        light: '#fff',
        dark: '#000',
    }, 'background');

    return (
        <ScrollView style={[styles.container, { backgroundColor }]}>

            <View style={styles.infoCard}>
                <Text style={styles.infoTitle}>How Leasing Works</Text>
                <View style={styles.stepsList}>
                    <View style={styles.stepItem}>
                        <View style={styles.stepNumber}>
                            <Text style={styles.stepNumberText}>1</Text>
                        </View>
                        <Text style={styles.stepText}>Choose your electric bike model</Text>
                    </View>
                    <View style={styles.stepItem}>
                        <View style={styles.stepNumber}>
                            <Text style={styles.stepNumberText}>2</Text>
                        </View>
                        <Text style={styles.stepText}>Pay deposit and verify your ID</Text>
                    </View>
                    <View style={styles.stepItem}>
                        <View style={styles.stepNumber}>
                            <Text style={styles.stepNumberText}>3</Text>
                        </View>
                        <Text style={styles.stepText}>Receive your e-bike delivery</Text>
                    </View>
                    <View style={styles.stepItem}>
                        <View style={styles.stepNumber}>
                            <Text style={styles.stepNumberText}>4</Text>
                        </View>
                        <Text style={styles.stepText}>Make daily payments via M-Pesa</Text>
                    </View>
                </View>
            </View>

            {evBikes.map((bike) => (
                <BikeCard
                    key={bike.id}
                    name={bike.name}
                    image={bike.image}
                    price={bike.price}
                    range={bike.range}
                    features={bike.features}
                />
            ))}


            <Footer />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    infoCard: {
        borderRadius: 8,
        marginBottom: 24,
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    stepsList: {
        marginTop: 8,
    },
    stepItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    stepNumber: {
        backgroundColor: '#4CAF50',
        color: '#FFFFFF',
        borderRadius: 50,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    stepNumberText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    stepText: {
        fontSize: 16,
    },

});

export default AllModelsTab;