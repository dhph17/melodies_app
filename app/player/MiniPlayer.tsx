import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { usePlayback } from '../player/PlaybackContext';

const MiniPlayer: React.FC = () => {
    const {
        currentTrack,
        isPlaying,
        togglePlayPause,
        skipToNext,
        skipToPrevious,
    } = usePlayback();

    if (!currentTrack) return null;

    return (
        <View style={styles.container}>
            {/* Album Art */}
            <Image source={currentTrack.image} style={styles.albumArt} />

            {/* Song and Artist Info */}
            <View style={styles.trackInfo}>
                <Text style={styles.trackTitle} numberOfLines={1}>
                    {currentTrack.title}
                </Text>
                <Text style={styles.trackArtist} numberOfLines={1}>
                    {currentTrack.artist}
                </Text>
            </View>

            {/* Control Buttons */}
            <View style={styles.controls}>
                <TouchableOpacity onPress={skipToPrevious} style={styles.controlButton}>
                    <Image source={require('../../assets/icons/backward.png')} style={styles.controlIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={togglePlayPause} style={styles.controlButton}>
                    <Image
                        source={
                            isPlaying
                                ? require('../../assets/icons/pause.png')
                                : require('../../assets/icons/play.png')
                        }
                        style={styles.controlIcon}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={skipToNext} style={styles.controlButton}>
                    <Image source={require('../../assets/icons/forward.png')} style={styles.controlIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 15, // Rounded border
        position: 'absolute',
        bottom: 10,
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
        paddingHorizontal: 10,
    },
    controlIcon: {
        width: 20,
        height: 20,
        tintColor: 'white',
    },
});

export default MiniPlayer;