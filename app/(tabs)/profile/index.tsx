import { Image, ScrollView, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Bell, ChevronRight, HelpCircle, Languages, LogOut, Shield, User, Wallet } from 'lucide-react-native';

import { Text, useThemeColor, View } from '@/components/Themed';
import { MOCK_BIKES, MOCK_USER } from '@/constants/mockData';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const currentBike = MOCK_BIKES.find(bike => bike.id === MOCK_USER.currentBike);

  const cardBgColor = useThemeColor({
    light: '#fff',
    dark: '#333',
  }, 'background');

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <User size={36} color='#71717A' />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{MOCK_USER.name}</Text>
            <Text style={{ color: colorScheme === 'dark' ? '#E4E4E7' : '#52525B', fontSize: 14 }}>{MOCK_USER.phone}</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Current Lease Summary */}
        {currentBike && (
          <View style={[styles.card, { backgroundColor: cardBgColor }]}>
            <View style={styles.leaseHeader}>
              <Text style={styles.leaseTitle}>Current Lease</Text>
              <TouchableOpacity>
                <Text style={styles.viewDetailsLink}>Details</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.leaseInfo}>
              <Image
                source={{ uri: currentBike.image }}
                style={styles.bikeThumbnail}
              />
              <View style={styles.bikeDetails}>
                <Text style={styles.bikeName}>{currentBike.name}</Text>
                <Text style={{ color: colorScheme === 'dark' ? '#E4E4E7' : '#52525B', fontSize: 14, marginBottom: 8 }}>
                  {currentBike.brand}
                </Text>
                <View style={styles.paymentInfo}>
                  <Text style={styles.paymentLabel}>Next Payment:</Text>
                  <Text style={styles.paymentAmount}>KSh {MOCK_USER.paymentDue}</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Payment History */}
        <View style={[styles.card, { backgroundColor: cardBgColor }]}>
          <Text style={styles.cardTitle}>Recent Payments</Text>

          {MOCK_USER.paymentHistory.map((payment, index) => (
            <View
              key={index}
              style={[
                styles.paymentItem,
                index < MOCK_USER.paymentHistory.length - 1 && styles.paymentItemBorder
              ]}
            >
              <View style={{ backgroundColor: 'transparent' }}>
                <Text style={{ color: colorScheme === 'dark' ? '#E4E4E7' : '#18181B', fontSize: 14, marginBottom: 4 }}>
                  {payment.date}
                </Text>
                <Text style={{ color: colorScheme === 'dark' ? '#E4E4E7' : '#52525B', fontSize: 14 }}>
                  Status: <Text style={styles.statusPaid}>Paid</Text>
                </Text>
              </View>
              <Text style={styles.paymentItemAmount}>KSh {payment.amount}</Text>
            </View>
          ))}

          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All Payments</Text>
            <ChevronRight size={16} color='#71717A' />
          </TouchableOpacity>
        </View>

        {/* Settings Menu */}
        <View style={styles.settingsSection}>
          <Text style={styles.settingsSectionTitle}>Settings</Text>

          <View style={[styles.card, { backgroundColor: cardBgColor }]}>
            <TouchableOpacity style={styles.settingsItem} onPress={() => router.push('/notifications')}>
              <View style={styles.settingsItemLeft}>
                <View style={[styles.settingsIconContainer, { backgroundColor: '#D1FAE5' }]}>
                  <Bell size={20} color='#059669' />
                </View>
                <Text style={styles.settingsItemText}>Notifications</Text>
              </View>
              <ChevronRight size={20} color='#71717A' />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingsItem}>
              <View style={styles.settingsItemLeft}>
                <View style={[styles.settingsIconContainer, { backgroundColor: '#FFEDD5' }]}>
                  <Wallet size={20} color='#EA580C' />
                </View>
                <Text style={styles.settingsItemText}>Payment Methods</Text>
              </View>
              <ChevronRight size={20} color='#71717A' />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingsItem}>
              <View style={styles.settingsItemLeft}>
                <View style={[styles.settingsIconContainer, { backgroundColor: '#DBEAFE' }]}>
                  <Languages size={20} color='#2563EB' />
                </View>
                <Text style={styles.settingsItemText}>Language</Text>
              </View>
              <View style={styles.languageIndicator}>
                <Text style={{ color: colorScheme === 'dark' ? '#E4E4E7' : '#52525B', fontSize: 14, marginRight: 4 }}>English</Text>
                <ChevronRight size={20} color='#71717A' />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingsItem}>
              <View style={styles.settingsItemLeft}>
                <View style={[styles.settingsIconContainer, { backgroundColor: '#DCFCE7' }]}>
                  <Shield size={20} color='#16A34A' />
                </View>
                <Text style={styles.settingsItemText}>Privacy & Data</Text>
              </View>
              <ChevronRight size={20} color='#71717A' />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingsItem}>
              <View style={styles.settingsItemLeft}>
                <View style={[styles.settingsIconContainer, { backgroundColor: '#FEF9C3' }]}>
                  <HelpCircle size={20} color='#CA8A04' />
                </View>
                <Text style={styles.settingsItemText}>Help & Support</Text>
              </View>
              <ChevronRight size={20} color='#71717A' />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.logoutButton}>
            <LogOut size={20} color='#DC2626' />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>

          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 16,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E4E4E7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: '#E4E4E7',
  },
  editButtonText: {
    fontSize: 14,
    color: '#3F3F46',
  },
  card: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  leaseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  leaseTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  viewDetailsLink: {
    fontSize: 14,
    color: '#059669',
  },
  leaseInfo: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  bikeThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  bikeDetails: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  bikeName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  paymentInfo: {
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  paymentLabel: {
    fontSize: 12,
    color: '#52525B',
  },
  paymentAmount: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  paymentHistoryCard: {
    marginBottom: 24,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 16,
  },
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    backgroundColor: 'transparent',
  },
  paymentItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E7',
  },
  statusPaid: {
    color: '#16A34A',
  },
  paymentItemAmount: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  viewAllText: {
    // fontFamily: FONTS.medium,
    fontSize: 14,
    // color: COLORS.primary[600],
    marginRight: 4,
  },
  settingsSection: {
    marginBottom: 16,
  },
  settingsSectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
  },
  settingsCard: {
    marginBottom: 16,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E7',
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  settingsIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingsItemText: {
    fontWeight: '500',
    fontSize: 16,
  },
  languageIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
    paddingVertical: 16,
    marginBottom: 24,
  },
  logoutText: {
    fontWeight: '500',
    fontSize: 16,
    color: '#DC2626',
    marginLeft: 8,
  },
  versionText: {
    fontSize: 12,
    textAlign: 'center',
  },
});
