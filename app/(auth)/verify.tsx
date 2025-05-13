import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, TextInput, Keyboard, useColorScheme, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Shield, RefreshCw } from 'lucide-react-native';

import { Text, View } from '@/components/Themed';

const OTP_LENGTH = 6;

export default function VerifyScreen() {
    const colorScheme = useColorScheme();
    const router = useRouter();

    const { email, mode } = useLocalSearchParams();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(30);
    const inputRefs = useRef<TextInput[]>([]);

    useEffect(() => {
        const timer = setInterval(() => {
            setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleOtpChange = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // Auto-focus next input
        if (text && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = async () => {
        if (otp.some(digit => !digit)) return;

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            router.replace('/home');
        }, 1500);
    };

    const handleResend = () => {
        if (resendTimer > 0) return;
        setResendTimer(30);
        // Implement resend logic here
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content}>
                <Text style={styles.title}>Verify Your Phone</Text>
                <Text style={{ fontSize: 16, marginBottom: 32, color: colorScheme === 'dark' ? '#A1A1AA' : '#52525B' }}>
                    Enter the 6-digit code sent to {email}
                </Text>

                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={ref => {
                                if (ref) inputRefs.current[index] = ref;
                            }}
                            style={[
                                styles.otpInput,
                                digit && styles.otpInputFilled
                            ]}
                            value={digit}
                            onChangeText={(text) => handleOtpChange(text.slice(-1), index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            keyboardType="number-pad"
                            maxLength={1}
                            selectTextOnFocus
                        />
                    ))}
                </View>

                <Button
                    variant="primary"
                    size="large"
                    loading={loading}
                    disabled={otp.some(digit => !digit)}
                    leadingIcon={<Shield size={24} color='#FFFFFF' />}
                    onPress={handleVerify}
                    style={styles.button}
                >
                    Verify Code
                </Button>

                <Button
                    variant="outline"
                    size="medium"
                    disabled={resendTimer > 0}
                    leadingIcon={<RefreshCw size={20} color={resendTimer > 0 ? '#A1A1AA' : '#059669'} />}
                    onPress={handleResend}
                    style={styles.resendButton}
                >
                    {resendTimer > 0 ? `Resend Code (${resendTimer}s)` : 'Resend Code'}
                </Button>
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
        textAlign: 'center',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
        marginBottom: 32,
    },
    otpInput: {
        width: 48,
        height: 56,
        borderWidth: 1,
        borderColor: '#FDBA74',
        borderRadius: 12,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#7C2D12',
    },
    otpInputFilled: {
        borderColor: '#10B981',
        backgroundColor: '#ECFDF5',
    },
    button: {
        width: '100%',
        marginBottom: 16,
    },
    resendButton: {
        marginTop: 8,
    },
});