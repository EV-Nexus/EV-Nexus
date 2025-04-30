import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, useThemeColor } from '@/components/Themed';

export default function EconomyTab() {
      // Theme Colors
      const backgroundColor = useThemeColor({
        light: '#fff',
        dark: '#000',
      }, 'background');
    return (
        <ScrollView style={[styles.container, { backgroundColor }]}>
            <Text style={styles.title}>Economy Models</Text>
            {/* Add content for the Economy tab here, such as a list of economy bikes */}
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
    },
});