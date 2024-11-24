import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { usePlayback } from '../provider/PlaybackContext';
import { getMainArtistName, getPosterSong } from '@/utils/utils';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';

const MiniPlayer: React.FC = () => {
    const router = useRouter()
    const {
        currentTrack,
        isPlaying,
        togglePlayPause,
        nextSong,
        previousSong
    } = usePlayback();

    if (!currentTrack) return null;

    return (
        <TouchableOpacity style={styles.container} onPress={() => router.push('/player/MainPlayer')}>
            {/* Album Art */}
            <Image source={getPosterSong(currentTrack.album).image} style={styles.albumArt} />

            {/* Song and Artist Info */}
            <View style={styles.trackInfo}>
                <Text style={styles.trackTitle} numberOfLines={1}>
                    {currentTrack.title}
                </Text>
                <Text style={styles.trackArtist} numberOfLines={1}>
                    {getMainArtistName(currentTrack.artists)}
                </Text>
            </View>

            {/* Control Buttons */}
            <View style={styles.controls}>
                <TouchableOpacity onPress={previousSong} style={styles.controlButton}>
                    <Ionicons name="play-skip-back" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={togglePlayPause} style={styles.controlButton}>
                    {
                        isPlaying ?
                            <AntDesign name="pause" size={30} color="white" />
                            :
                            <Entypo name="controller-play" size={30} color="white" />
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={nextSong} style={styles.controlButton}>
                    <Ionicons name="play-skip-forward" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 15,
        position: 'absolute',
        bottom: '10%',
        marginHorizontal: 10,
        width: '95%',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    albumArt: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    trackInfo: {
        flex: 1,
    },
    trackTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    trackArtist: {
        color: '#bbb',
        fontSize: 14,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    controlButton: {
        paddingHorizontal: 4,
    },
});

export default MiniPlayer;