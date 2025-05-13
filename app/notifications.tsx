
import { FlatList, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

import { Text, useThemeColor, View } from '@/components/Themed';
import { Battery, Bell, Calendar, Wrench, X, Zap } from 'lucide-react-native';
import { NOTIFICATIONS } from '@/constants/mockData';

type Notification = {
  id: string;
  type: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

export default function NotificationsScreen() {
  const colorScheme = useColorScheme();

  const bgColor = useThemeColor(
    { light: '#F4F4F5', dark: '#18181B' },
    'background'
  );

    const getIconForType = (type: string) => {
    switch (type) {
      case 'payment':
        return <Calendar size={24} color='#F97316' />;
      case 'battery':
        return <Battery size={24} color='#10B981' />;
      case 'maintenance':
        return <Wrench size={24} color='#EAB308' />;
      case 'promotion':
        return <Zap size={24} color='#3B82F6' />;
      default:
        return <Bell size={24} color='#71717A' />;
    }
  };
  
  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity 
      style={[
        styles.notificationItem,
        !item.read && styles.unreadNotification
      ]}
      activeOpacity={0.7}
    >
      <View style={styles.notificationIcon}>
        {getIconForType(item.type)}
      </View>
      
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
      
      {!item.read && <View style={styles.unreadIndicator} />}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <FlatList
        data={NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        contentContainerStyle={styles.notificationsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Bell size={48} color='#A1A1AA' />
            <Text style={styles.emptyStateText}>No notifications yet</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notificationsList: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    // backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    position: 'relative',
  },
  unreadNotification: {
    backgroundColor: '#FAFAFA',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F4F4F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  notificationTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#3F3F46',
    marginBottom: 8,
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 12,
    color: '#71717A',
  },
  unreadIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#71717A',
    marginTop: 16,
  },
});
