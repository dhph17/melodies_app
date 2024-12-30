import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Image } from 'expo-image'
import { usePlayback } from '@/app/provider/PlaybackContext';
import { useFocusEffect, useRouter, useSegments } from 'expo-router';
import { Notification as NotificationType, User } from '@/types/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchApiData } from '@/app/api/appService';
import UserImage from '@/assets/images/placeholderUser.jpg'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { formatTime } from '@/utils/utils';
import { useAppContext } from '@/app/provider/AppProvider';
import { fetchNotification } from '@/utils/api';

const Notification = () => {
    const router = useRouter();
    const segments = useSegments();
    const { listNotification, setListNotification } = useAppContext()
    const { currentTrack } = usePlayback()
    const [user, setUser] = useState<User | null>(null);
    const [isPrivatePage, setIsPrivatePage] = useState(true);

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                const accessToken = await AsyncStorage.getItem('accessToken');
                if (accessToken) {
                    setIsPrivatePage(false);
                    const userResult = await fetchApiData(`/api/user`, "GET", null, accessToken);
                    if (userResult.success) {
                        setUser(userResult.data.user);
                    } else {
                        console.error("Get user error:", userResult.error);
                    }

                    const fetchLatestNotifications = async () => {
                        try {
                            const response = await fetchNotification(accessToken);
                            setListNotification(response)
                        } catch (error) {
                            console.error('Error fetching notifications:', error);
                        }
                    };
                    fetchLatestNotifications();
                }
            };
            fetchData();
        }, [segments])
    );

    const renderContent = React.useMemo(
        () => (
            <View
                style={[
                    { paddingBottom: currentTrack ? 150 : 70 },
                ]}
                className="flex flex-col gap-4 bg-primaryColorBg"
            >
                {
                    listNotification.map((notification) => (
                        <View style={styles.itemNotification} key={notification.id}>
                            <View style={styles.notificationHeader}>
                                <View>
                                    <EvilIcons name="comment" size={40} color="white" />
                                </View>
                                <View style={styles.notificationDetail}>
                                    <View>
                                        <Text className='text-white font-bold text-[1.2rem]'>{notification.message}</Text>
                                    </View>
                                    {notification.type === "COMMENT" && (
                                        <View>
                                            <Text className='text-white pr-10'>{notification.report.comment.content}</Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                            <View style={styles.notificationDateTime}>
                                <Text className='text-white'>{formatTime(notification.createdAt)}</Text>
                            </View>
                        </View>
                    ))
                }
            </View >
        ),
        [listNotification, currentTrack]
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                {/* Avatar */}
                <Image
                    source={user?.image ? { uri: user.image } : UserImage}
                    style={styles.avatar}
                />
                {/* Title */}
                <Text style={styles.headerTitle}>Your Notifications</Text>
            </View>
            <FlatList
                data={[]}
                renderItem={null}
                ListHeaderComponent={renderContent}
            />
        </View>
    )
}

export default Notification

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#121212', padding: 8 },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#333',
        borderWidth: 1,
        borderColor: '#3b82f6',
    },
    headerTitle: {
        flex: 1,
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    itemNotification: {
        borderWidth: 2,
        borderColor: 'white',
        flexDirection: 'column',
        paddingVertical: 8,
        paddingHorizontal: 8,
    },
    notificationHeader: {
        flexDirection: 'row',
        gap: 5
    },
    notificationDetail: {
        marginTop: 2,
    },
    notificationDateTime: {
        alignSelf: 'flex-end'
    },
})