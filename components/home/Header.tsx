import React from 'react'
import { Image, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native'
import { useRouter } from 'expo-router'
import { Bell, User } from 'lucide-react-native'

import { Text, View } from '@/components/Themed'

interface HeaderProps {
    userName: string
    userAvatar?: string
    hasNotifications?: boolean
}

export default function Header({ userName, userAvatar, hasNotifications = false }: HeaderProps) {
    const colorScheme = useColorScheme()
    const router = useRouter()


    return (
        <View style={styles.container}>
            <View style={styles.userInfo}>
                <TouchableOpacity
                    style={styles.avatarContainer}
                    onPress={() => router.push("/profile")}
                >
                    {userAvatar ? (
                        <Image source={{ uri: userAvatar }} style={styles.avatar} />
                    ) : (
                        <View style={styles.avatarPlaceholder}>
                            <User size={24} />
                        </View>
                    )}
                </TouchableOpacity>
                <View>
                    <Text style={{ color: colorScheme === 'dark' ? '#E4E4E7' : '#52525B', fontSize: 14 }}>
                        Hello,
                    </Text>
                    <Text style={styles.userName}>{userName}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.notificationButton} onPress={() => router.push("/notifications")}>
                <Bell size={24} />
                {hasNotifications && <View style={styles.notificationDot} />}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        marginRight: 12,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    avatarPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E4E4E7',
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    notificationButton: {
        position: 'relative',
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E4E4E7',
    },
    notificationDot: {
        position: 'absolute',
        top: 8,
        right: 10,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#EF4444',
    },
});