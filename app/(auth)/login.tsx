import React, { useState } from 'react';
import { StyleSheet, TextInput, ScrollView, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Mail, KeyRound } from 'lucide-react-native';

import { Text, View } from '@/components/Themed';

export default function LoginScreen() {
    const colorScheme = useColorScheme();
    const router = useRouter();

    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!form.email) return;

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            router.replace('/home');
        }, 1000);
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content}>
                <Text style={styles.title}>Welcome Back!</Text>
                <Text style={{ fontSize: 16, marginBottom: 32, color: colorScheme === 'dark' ? '#A1A1AA' : '#52525B' }}>
                    Enter your credentials to access your account
                </Text>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Mail size={20} color='#71717A' style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Your Email Address"
                            value={form.email}
                            onChangeText={(text) => setForm({ ...form, email: text })}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            autoComplete="email"
                            textContentType="emailAddress"
                            placeholderTextColor='#A1A1AA'
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <KeyRound size={20} color='#71717A' style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={form.password}
                            onChangeText={(text) => setForm({ ...form, password: text })}
                            secureTextEntry
                            autoComplete="password"
                            textContentType="password"
                            placeholderTextColor='#A1A1AA'
                        />
                    </View>

                    <Button
                        variant="primary"
                        size="large"
                        loading={loading}
                        disabled={loading || !form.email}
                        onPress={handleLogin}
                        style={styles.button}
                    >
                        Login
                    </Button>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 24,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 28,
        marginBottom: 8,
    },
    form: {
        gap: 24,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D4D4D8',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 56,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    button: {
        marginTop: 8,
    },
});