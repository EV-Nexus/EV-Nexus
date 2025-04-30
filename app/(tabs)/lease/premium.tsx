import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, useThemeColor } from '@/components/Themed';

export default function PremiumTab() {
      // Theme Colors
      const backgroundColor = useThemeColor({
        light: '#fff',
        dark: '#000',
      }, 'background');
    return (
        <ScrollView style={[styles.container, { backgroundColor }]}>
            <Text style={styles.title}>Premium Models</Text>
            {/* Add content for premium models here */}
            <Text>Details about premium models will go here.</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});