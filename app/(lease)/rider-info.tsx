import React, { useState } from 'react';
import { StyleSheet, ScrollView, TextInput, useColorScheme } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { User, Phone, CreditCard, Briefcase } from 'lucide-react-native';

import { Text, useThemeColor, View } from '@/components/Themed';

export default function RiderInfoScreen() {
  const colorScheme = useColorScheme();
  const { id, duration } = useLocalSearchParams();
  const router = useRouter();

  const cardBgColor = useThemeColor({
    light: '#fff',
    dark: '#333',
  }, 'background');

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    idNumber: '',
    occupation: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    phone: '',
    idNumber: '',
    occupation: '',
  });

  const validateForm = () => {
    const newErrors = {
      fullName: '',
      phone: '',
      idNumber: '',
      occupation: '',
    };

    let isValid = true;

    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^\+254\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Enter a valid Kenyan phone number (+254...)';
      isValid = false;
    }

    if (!formData.idNumber) {
      newErrors.idNumber = 'ID number is required';
      isValid = false;
    } else if (!/^\d{8}$/.test(formData.idNumber)) {
      newErrors.idNumber = 'Enter a valid 8-digit ID number';
      isValid = false;
    }

    if (!formData.occupation) {
      newErrors.occupation = 'Occupation is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleContinue = () => {
    if (validateForm()) {
      router.push({
        pathname: '/(lease)/confirm',
        params: { ...formData, id, duration }
      });
    }
    router.push({
      pathname: '/(lease)/confirm',
      params: { ...formData, id, duration }
    });
  };

  return (
    <>
      <View style={styles.progressBar}>
        <View style={[styles.progressStep, styles.progressStepActive]} />
        <View style={[styles.progressStep, styles.progressStepActive]} />
        <View style={styles.progressStep} />
        <View style={styles.progressStep} />
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { backgroundColor: cardBgColor }]}>
          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <User size={20} color='#71717A' />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                value={formData.fullName}
                onChangeText={(text) => setFormData({ ...formData, fullName: text })}
              />
              {errors.fullName ? (
                <Text style={styles.errorText}>{errors.fullName}</Text>
              ) : null}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <Phone size={20} color='#71717A' />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="+254..."
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                keyboardType="phone-pad"
              />
              {errors.phone ? (
                <Text style={styles.errorText}>{errors.phone}</Text>
              ) : null}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <CreditCard size={20} color='#71717A' />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>ID Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your ID number"
                value={formData.idNumber}
                onChangeText={(text) => setFormData({ ...formData, idNumber: text })}
                keyboardType="numeric"
                maxLength={8}
              />
              {errors.idNumber ? (
                <Text style={styles.errorText}>{errors.idNumber}</Text>
              ) : null}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <Briefcase size={20} color='#71717A' />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Occupation</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Boda Boda Rider"
                value={formData.occupation}
                onChangeText={(text) => setFormData({ ...formData, occupation: text })}
              />
              {errors.occupation ? (
                <Text style={styles.errorText}>{errors.occupation}</Text>
              ) : null}
            </View>
          </View>
        </View>

        <Text style={styles.note}>
          By continuing, you agree to our terms of service and privacy policy.
        </Text>

        <Button
          size="large"
          style={styles.continueButton}
          onPress={handleContinue}
        >
          Continue to Confirmation
        </Button>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  progressBar: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E7',
  },
  progressStep: {
    flex: 1,
    height: 4,
    backgroundColor: '#D4D4D8',
    marginHorizontal: 2,
    borderRadius: 2,
  },
  progressStepActive: {
    backgroundColor: '#10B981',
  },
  card: {
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  formCard: {
    margin: 16,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  inputIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F4F4F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 24,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  label: {
    fontWeight: '500',
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    height: 48,
    backgroundColor: '#F4F4F5',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    // color: COLORS.gray[900],
  },
  errorText: {
    fontSize: 12,
    color: '#DC2626',
    marginTop: 4,
  },
  note: {
    // fontFamily: FONTS.regular,
    fontSize: 14,
    // color: COLORS.gray[600],
    textAlign: 'center',
    marginHorizontal: 16,
    marginBottom: 24,
  },
  continueButton: {
    margin: 16,
    marginBottom: 32,
  },
});