import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { usePlayback } from '../provider/PlaybackContext';
import { getMainArtistInfo } from '@/utils/utils';

const MiniPlayerNotification: React.FC = () => {
    const { currentTrack, isPlaying } = usePlayback(); // Subscribe to context

    useEffect(() => {
        if (Platform.OS === 'android') {
            createNotification();
        }
    }, [currentTrack, isPlaying]);

    const createNotification = async () => {
        if (!currentTrack) {
            // Clear notifications if no track is playing
            await Notifications.dismissAllNotificationsAsync();
            return;
        }

        // Dismiss any existing notifications to prevent duplicates
        await Notifications.dismissAllNotificationsAsync();

        // Create a new notification
        await Notifications.scheduleNotificationAsync({
            content: {
                title: currentTrack.title,
                body: isPlaying
                    ? `Playing ${getMainArtistInfo(currentTrack.artists)}`
                    : `Paused ${getMainArtistInfo(currentTrack.artists)}`,
                sound: false, // Disable notification sound
                sticky: true, // Make it persistent on Android
            },
            trigger: null, // Trigger immediately
        });
    };

    return null;
};

export default MiniPlayerNotification;
