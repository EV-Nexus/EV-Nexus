import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text, useThemeColor, View } from '@/components/Themed';

const Footer = () => (

    <View style={[styles.footer, { backgroundColor: useThemeColor({ light: '#fff', dark: '#000' }, 'background') }]}>
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <View style={styles.logoBox}>
                    <Ionicons name="battery-charging" size={22} color="white" />
                </View>
                <Text style={styles.logoText}>EV Nexus</Text>
            </View>

            <Text style={styles.slogan}>
                Making electric mobility accessible for everyone
            </Text>
        </View>
    </View>
);

export default Footer;

const styles = StyleSheet.create({
    footer: {
        paddingVertical: 24,
        backgroundColor: '#fff',
        marginTop: 'auto',
    },
    container: {
        alignItems: 'center',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    logoBox: {
        backgroundColor: '#34D399', // ev-green color
        borderRadius: 6,
        padding: 4,
        marginRight: 4,
    },
    logoText: {
        fontWeight: '500',
        fontSize: 14,
    },
    slogan: {
        fontSize: 12,
        color: '#6B7280', // ev-gray
        marginBottom: 8,
    },
});