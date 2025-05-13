import React, { useEffect } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useRouter } from 'expo-router'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSequence,
    Easing,
    FadeIn,
    FadeOut,
} from 'react-native-reanimated';

import { Text, View } from '@/components/Themed';

export default function Splash() {
    const router = useRouter();

    // Animation values
    const scale = useSharedValue(0.8);
    const opacity = useSharedValue(0);

    // Text animated styles
    const titleStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    useEffect(() => {
        // Start animations
        scale.value = withSequence(
            withTiming(0.8, { duration: 300 }),
            withTiming(1.1, { duration: 900, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }),
            withTiming(1, { duration: 600 })
        );

        opacity.value = withTiming(1, { duration: 1100 });

        // Navigate after animation completes
        const timer = setTimeout(() => {
            router.replace('/welcome');
        }, 6000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <View style={styles.container}>
            <Animated.View style={titleStyle}>
                <Text style={styles.title}>EV Nexus</Text>
            </Animated.View>

            <Animated.View entering={FadeIn.delay(1000)} style={styles.loaderContainer}>
                <ActivityIndicator size="large" color='#34D399' />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#34D399',
    },
    loaderContainer: {
        marginTop: 40,
    },
});