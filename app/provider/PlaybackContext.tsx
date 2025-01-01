import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { PUBLIC_MUSIC_ENDPOINT } from '@/app/config'
import { Audio } from 'expo-av';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { DataSong } from '@/types/interfaces';
import { getMainArtistInfo } from '@/utils/utils';
import { decrypt } from '@/app/decode';
import { useOffline } from '@/app/provider/OfflineProvider';

interface PlaybackProviderProps {
    children: ReactNode;
}

interface PlaybackContextType {
    currentTrack: DataSong | null;
    setCurrentSong: (song: DataSong) => void;
    waitingList: Array<DataSong>;
    setWaitingList: (songs: Array<DataSong>) => void;
    isPlaying: boolean;
    positionMillis: number;
    durationMillis: number;
    repeatMode: 'off' | 'all' | 'single';
    togglePlayPause: () => void;
    nextSong: () => void;
    previousSong: () => void;
    setRepeatMode: () => void;
    seekTo: (position: number) => void;
}

// Create the context
const PlaybackContext = createContext<PlaybackContextType | undefined>(undefined);

export const PlaybackProvider: React.FC<PlaybackProviderProps> = ({ children }) => {
    const { isOffline } = useOffline()
    const [currentTrack, setCurrentTrackState] = useState<DataSong | null>(null);
    const [waitingList, setWaitingListState] = useState<Array<DataSong>>([]);
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [positionMillis, setPositionMillis] = useState(0);
    const [durationMillis, setDurationMillis] = useState(0);
    const [repeatMode, setRepeatModeState] = useState<'off' | 'all' | 'single'>('off');

    const setCurrentSong = useCallback((song: DataSong) => {
        setCurrentTrackState(song);
    }, []);

    const setWaitingList = useCallback((songs: Array<DataSong>) => {
        setWaitingListState(songs);
    }, []);

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
            setIsPlaying(true);
            if (sound) {
                await sound.unloadAsync();
            }
            if (currentTrack) {
                const { sound: newSound } = await Audio.Sound.createAsync(
                    { uri: !isOffline ? `${decrypt(currentTrack.filePathAudio)}` : currentTrack.filePathAudio },
                    { shouldPlay: isPlaying },
                    (status) => {
                        if (status.isLoaded) {
                            setPositionMillis(status.positionMillis || 0);
                            setDurationMillis(status.durationMillis || 0);

                            if (status.didJustFinish) {
                                if (repeatMode === 'single') {
                                    sound?.replayAsync();
                                } else {
                                    nextSong();
                                }
                            }
                        }
                    }
                );
                setSound(newSound);

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
            updateNotification();
        }
    };

    const nextSong = useCallback(() => {
        if (currentTrack && waitingList.length > 0) {
            const currentIndex = waitingList.findIndex((song) => song.id === currentTrack.id);
            const nextIndex = (currentIndex + 1) % waitingList.length;
            setCurrentTrackState(waitingList[nextIndex]);
        }
    }, [currentTrack, waitingList]);

    const previousSong = useCallback(() => {
        if (currentTrack && waitingList.length > 0) {
            const currentIndex = waitingList.findIndex((song) => song.id === currentTrack.id);
            const previousIndex = (currentIndex - 1 + waitingList.length) % waitingList.length;
            setCurrentTrackState(waitingList[previousIndex]);
        }
    }, [currentTrack, waitingList]);

    const seekTo = async (position: number) => {
        if (sound) {
            await sound.setPositionAsync(position);
            setPositionMillis(position);
        }
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
                    body: `${getMainArtistInfo(currentTrack.artists)} - ${isPlaying ? 'Playing' : 'Paused'}`,
                },
                trigger: null,
            });
        }
    };

    return (
        <PlaybackContext.Provider
            value={{
                currentTrack,
                setCurrentSong,
                waitingList,
                setWaitingList,
                isPlaying,
                positionMillis,
                durationMillis,
                repeatMode,
                togglePlayPause,
                nextSong,
                previousSong,
                setRepeatMode,
                seekTo,
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