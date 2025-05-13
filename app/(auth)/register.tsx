import React, { useState } from 'react';
import { StyleSheet, TextInput, ScrollView, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { User, Phone, FileText, Briefcase, ArrowRight, Mail, KeyRound } from 'lucide-react-native';

import { Text, View } from '@/components/Themed';

const OCCUPATIONS = ['Rider', 'Mechanic', 'Kiosk Owner/Partner'];

export default function RegisterScreen() {
    const colorScheme = useColorScheme();
    const router = useRouter();

    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        idNumber: '',
        password: '',
        occupation: '',
    });
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!form.name || !form.phone || !form.idNumber || !form.occupation) return;

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            router.push({
                pathname: '/verify',
                params: { phone: form.phone, mode: 'register' }
            });
        }, 1000);
    };

    const isFormValid = form.name && form.phone && form.idNumber && form.occupation;

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>Create Account</Text>
                <Text style={{ fontSize: 16, marginBottom: 32, color: colorScheme === 'dark' ? '#A1A1AA' : '#52525B' }}>
                    Fill in your details to join EV Nexus
                </Text>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <User size={20} color='#71717A' style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Full Name"
                            value={form.name}
                            onChangeText={(text) => setForm({ ...form, name: text })}
                            autoComplete="name"
                            placeholderTextColor='#A1A1AA'
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Phone size={20} color='#71717A' style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Phone Number"
                            value={form.phone}
                            onChangeText={(text) => setForm({ ...form, phone: text })}
                            keyboardType="phone-pad"
                            autoComplete="tel"
                            placeholderTextColor='#A1A1AA'
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Mail size={20} color='#71717A' style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Email Address"
                            value={form.email}
                            onChangeText={(text) => setForm({ ...form, email: text })}
                            keyboardType="email-address"
                            autoComplete="email"
                            placeholderTextColor='#A1A1AA'
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <FileText size={20} color='#71717A' style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="ID/Passport Number"
                            value={form.idNumber}
                            onChangeText={(text) => setForm({ ...form, idNumber: text })}
                            autoComplete="off"
                            placeholderTextColor='#A1A1AA'
                            keyboardType='number-pad'
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <KeyRound size={20} color='#71717A' style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Create Password"
                            value={form.password}
                            onChangeText={(text) => setForm({ ...form, password: text })}
                            secureTextEntry
                            autoComplete="password"
                            placeholderTextColor='#A1A1AA'
                        />
                    </View>

                    <View style={styles.occupationContainer}>
                        <View style={styles.occupationHeader}>
                            <Briefcase size={20} color='#71717A' />
                            <Text style={styles.occupationTitle}>Select Occupation</Text>
                        </View>

                        <View style={styles.occupationButtons}>
                            {OCCUPATIONS.map((occupation) => (
                                <Button
                                    key={occupation}
                                    variant={form.occupation === occupation ? 'primary' : 'outline'}
                                    size="medium"
                                    onPress={() => setForm({ ...form, occupation })}
                                    style={styles.occupationButton}
                                >
                                    {occupation}
                                </Button>
                            ))}
                        </View>
                    </View>

                    <Button
                        variant="primary"
                        size="large"
                        loading={loading}
                        disabled={!isFormValid}
                        leadingIcon={<ArrowRight size={24} color="#FFFFFF" />}
                        onPress={handleRegister}
                        style={styles.button}
                    >
                        Continue
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
    occupationContainer: {
        gap: 16,
    },
    occupationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    occupationTitle: {
        fontWeight: '500',
        fontSize: 16,
        color: '#3F3F46',
    },
    occupationButtons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    occupationButton: {
        flex: 1,
        minWidth: '45%',
    },
    button: {
        marginTop: 8,
    },
});