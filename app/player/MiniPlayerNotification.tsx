import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { usePlayback } from '../provider/PlaybackContext'; // Import your PlaybackContext

const NotificationPlayer: React.FC = () => {
    const {
        currentTrack,
        isPlaying,
        togglePlayPause,
        nextSong,
        previousSong,
    } = usePlayback();

    // Configure notification channel for Android
    useEffect(() => {
        const configureNotifications = async () => {
            if (Platform.OS === 'android') {
                await Notifications.setNotificationChannelAsync('music', {
                    name: 'Music Playback',
                    importance: Notifications.AndroidImportance.HIGH,
                    sound: null, // No sound for this channel
                });
            }
        };

        configureNotifications();
    }, []);

    // Update the notification when current track or playback state changes
    useEffect(() => {
        const updateNotification = async () => {
            if (currentTrack) {
                await Notifications.dismissAllNotificationsAsync();

                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: currentTrack.title,
                        body: currentTrack.artists.map((artist) => artist.name).join(', '),
                        categoryIdentifier: 'music',
                    },
                    trigger: null,
                });
            }
        };

        updateNotification();
    }, [currentTrack, isPlaying]);

    // Handle notification actions
    useEffect(() => {
        const handleNotificationResponse = async (response: Notifications.NotificationResponse) => {
            const { actionIdentifier } = response;
            if (actionIdentifier === 'playPause') {
                togglePlayPause();
            } else if (actionIdentifier === 'next') {
                nextSong();
            } else if (actionIdentifier === 'previous') {
                previousSong();
            }
        };

        const subscription = Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);
        return () => subscription.remove();
    }, [togglePlayPause, nextSong, previousSong]);

    return null;
};

export default NotificationPlayer;
