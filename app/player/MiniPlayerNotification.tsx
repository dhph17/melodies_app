import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { usePlayback } from './PlaybackContext';

const MiniPlayerNotification: React.FC = () => {
    const { currentTrack, isPlaying } = usePlayback();

    useEffect(() => {
        if (Platform.OS === 'android') {
            startForegroundService();
        }
    }, [currentTrack, isPlaying]);

    const startForegroundService = async () => {
        if (currentTrack) {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: currentTrack.title,
                    body: isPlaying ? `Playing ${currentTrack.artist}` : 'Paused',
                },
                trigger: null,
            });
        }
    };

    return null;
};

export default MiniPlayerNotification;