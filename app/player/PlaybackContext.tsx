import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Audio } from 'expo-av';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import trackList from '../../assets/tracklist';

// Define the Track type
interface Track {
    title: string;
    artist: string;
    audio: any;
    image: any;
}

// Define the props for PlaybackProvider
interface PlaybackProviderProps {
    children: ReactNode;
}

// Define the context type
interface PlaybackContextType {
    currentTrack: Track | null;
    isPlaying: boolean;
    positionMillis: number;
    durationMillis: number;
    repeatMode: 'off' | 'all' | 'single';
    togglePlayPause: () => void;
    skipToNext: () => void;
    skipToPrevious: () => void;
    setRepeatMode: () => void;
    seekTo: (position: number) => void;
    setTrack: (index: number) => void;
    trackList: Track[];
}

// Create the context
const PlaybackContext = createContext<PlaybackContextType | undefined>(undefined);

export const PlaybackProvider: React.FC<PlaybackProviderProps> = ({ children }) => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [positionMillis, setPositionMillis] = useState(0);
    const [durationMillis, setDurationMillis] = useState(0);
    const [repeatMode, setRepeatModeState] = useState<'off' | 'all' | 'single'>('off');

    const currentTrack = trackList[currentTrackIndex];

    useEffect(() => {
        const configureAudio = async () => {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                staysActiveInBackground: true,
                shouldDuckAndroid: true,
                playThroughEarpieceAndroid: false,
            });
        };

        configureAudio();
    }, []);

    useEffect(() => {
        const loadAudio = async () => {
            if (sound) {
                await sound.unloadAsync();
            }
            if (currentTrack) {
                const { sound: newSound } = await Audio.Sound.createAsync(
                    currentTrack.audio,
                    { shouldPlay: isPlaying },
                    (status) => {
                        if (status.isLoaded) {
                            setPositionMillis(status.positionMillis || 0);
                            setDurationMillis(status.durationMillis || 0);

                            if (status.didJustFinish) {
                                if (repeatMode === 'single') {
                                    sound?.replayAsync();
                                } else {
                                    skipToNext();
                                }
                            }
                        }
                    }
                );
                setSound(newSound);

                // Update notification when track changes
                updateNotification();
            }
        };

        loadAudio();

        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [currentTrack]);

    const togglePlayPause = async () => {
        if (sound) {
            if (isPlaying) {
                await sound.pauseAsync();
            } else {
                await sound.playAsync();
            }
            setIsPlaying(!isPlaying);

            // Update notification playback state
            updateNotification();
        }
    };

    const skipToNext = () => {
        const nextIndex = (currentTrackIndex + 1) % trackList.length;
        setCurrentTrackIndex(nextIndex);
    };

    const skipToPrevious = () => {
        const previousIndex = (currentTrackIndex - 1 + trackList.length) % trackList.length;
        setCurrentTrackIndex(previousIndex);
    };

    const seekTo = async (position: number) => {
        if (sound) {
            await sound.setPositionAsync(position);
            setPositionMillis(position);
        }
    };

    const setTrack = (index: number) => {
        setCurrentTrackIndex(index);
        setIsPlaying(true);
    };

    const setRepeatMode = () => {
        const nextMode = repeatMode === 'off' ? 'all' : repeatMode === 'all' ? 'single' : 'off';
        setRepeatModeState(nextMode);
    };

    const updateNotification = async () => {
        if (Platform.OS === 'android' && currentTrack) {
            await Notifications.dismissAllNotificationsAsync();

            await Notifications.scheduleNotificationAsync({
                content: {
                    title: currentTrack.title,
                    body: `${currentTrack.artist} - ${isPlaying ? 'Playing' : 'Paused'}`,
                },
                trigger: null,
            });
        }
    };

    return (
        <PlaybackContext.Provider
            value={{
                currentTrack,
                isPlaying,
                positionMillis,
                durationMillis,
                repeatMode,
                togglePlayPause,
                skipToNext,
                skipToPrevious,
                setRepeatMode,
                seekTo,
                setTrack,
                trackList,
            }}
        >
            {children}
        </PlaybackContext.Provider>
    );
};

export const usePlayback = () => {
    const context = useContext(PlaybackContext);
    if (!context) {
        throw new Error('usePlayback must be used within a PlaybackProvider');
    }
    return context;
};