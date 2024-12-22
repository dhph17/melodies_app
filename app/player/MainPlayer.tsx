import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Dimensions, ScrollView, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import { usePlayback } from '../provider/PlaybackContext';
import { useRouter } from 'expo-router';
import getLyrics from '@/assets/tools/getLyrics';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { formatTime, getAllArtistsInfo, getPosterSong } from '@/utils/utils';
import { Image } from 'expo-image';
import Tracklist from '@/app/player/tracklist';
import CommentModal from './commentModal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { decrypt } from '@/app/decode';

const { height, width } = Dimensions.get('window');

const MainPlayer = () => {
    const router = useRouter();
    const {
        currentTrack,
        isPlaying,
        positionMillis,
        durationMillis,
        waitingList,
        togglePlayPause,
        repeatMode,
        setRepeatMode,
        seekTo,
        nextSong,
        previousSong
    } = usePlayback();

    const [isLyrics, setIsLyrics] = useState(false);
    const [isPlaylistVisible, setIsPlaylistVisible] = useState(false);

    const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);

    const handleCommentButtonPress = () => {
        console.log("Opening Comment Modal");
        setIsCommentModalVisible(true);
    };

    const closeCommentModal = () => {
        setIsCommentModalVisible(false);
    };

    const lyrics = currentTrack ? getLyrics(currentTrack.title) : '';

    const downloadCurrentTrack = async () => {
        if (!currentTrack || !currentTrack.filePathAudio) {
            Alert.alert('Error', 'No track to download.');
            return;
        }

        try {
            const decryptedFilePath = decrypt(currentTrack.filePathAudio);
            if (!decryptedFilePath) {
                Alert.alert('Error', 'Unable to decrypt the audio file path.');
                return;
            }
            const asset = Asset.fromModule(decryptedFilePath);
            await asset.downloadAsync();
            const localUri = asset.localUri;

            if (!localUri) {
                Alert.alert('Error', 'Unable to resolve local audio file.');
                return;
            }

            // Request permission to access the "Downloads" folder
            const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
            if (!permissions.granted) {
                Alert.alert('Permission Denied', 'You must grant permission to save the file.');
                return;
            }

            // Create the file in the selected directory
            const destFileName = `${currentTrack.title}.mp3`;
            const contentUri = await FileSystem.StorageAccessFramework.createFileAsync(
                permissions.directoryUri,
                destFileName,
                'audio/mpeg'
            );

            // Read the file as Base64 and write it to the content URI
            const fileContent = await FileSystem.readAsStringAsync(localUri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            await FileSystem.StorageAccessFramework.writeAsStringAsync(contentUri, fileContent, {
                encoding: FileSystem.EncodingType.Base64,
            });

            Alert.alert('Download Complete', `Track saved successfully: ${destFileName}`);
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Download Failed', `Could not download the track: ${error.message}`);
            } else {
                Alert.alert('Download Failed', 'An unknown error occurred.');
            }
        }
    };

    if (!currentTrack) {
        return <Text>Loading...</Text>;
    }

    return (
        <ImageBackground source={getPosterSong(currentTrack.album).image} style={styles.background} blurRadius={20}>
            <View style={styles.overlay}>
                <View style={styles.topNav}>
                    <TouchableOpacity style={styles.backNav} onPress={() => router.push('/(public)')}>
                        <Ionicons name="arrow-back" size={24} color="#FF0099" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Music</Text>
                    <TouchableOpacity onPress={handleCommentButtonPress} style={styles.commentButton}>
                        <FontAwesome name="comment" size={24} color="#FF0099" />
                    </TouchableOpacity>
                </View>

                <Image source={getPosterSong(currentTrack.album).image} style={isLyrics ? styles.albumCoverSmall : styles.albumCoverLarge} />

                <View style={styles.toggleContainer}>
                    <TouchableOpacity
                        onPress={() => setIsLyrics(false)}
                        style={[styles.toggleButton, !isLyrics && styles.activeButton]}
                    >
                        <Image source={require('@/assets/icons/note.png')} style={styles.toggleIcon} />
                        <Text style={[styles.toggleText, !isLyrics && styles.activeText]}>Song</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setIsLyrics(true)}
                        style={[styles.toggleButton, isLyrics && styles.activeButton]}
                    >
                        <Image source={require('@/assets/icons/lyrics.png')} style={styles.toggleIcon} />
                        <Text style={[styles.toggleText, isLyrics && styles.activeText]}>Lyrics</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.songInfoCenter}>
                    <Text style={styles.songTitle}>{currentTrack.title}</Text>
                    <Text style={styles.artist} >
                        {getAllArtistsInfo(currentTrack?.artists).map((artist, index, array) => (
                            <Text key={artist.id} style={styles.artist}>
                                {artist.name}
                                {index < array.length - 1 && <Text>, </Text>}
                            </Text>
                        ))}
                    </Text>
                </View>

                {isLyrics ? (
                    <View style={styles.lyricsContainer}>
                        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                            <Text style={styles.lyrics}>{lyrics}</Text>
                        </ScrollView>
                    </View>
                ) : (
                    <View style={styles.sliderContainer}>
                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={durationMillis}
                            value={positionMillis}
                            onSlidingComplete={seekTo}
                            minimumTrackTintColor="#FF0099"
                            maximumTrackTintColor="#888888"
                            thumbTintColor="#FF0099"
                        />
                        <View style={styles.timestampContainer}>
                            <Text style={styles.timestampText}>{formatTime(positionMillis)}</Text>
                            <Text style={styles.timestampText}>{formatTime(durationMillis)}</Text>
                        </View>
                    </View>
                )}

                <View style={styles.controlsContainer}>
                    <TouchableOpacity onPress={setRepeatMode} style={styles.controlButton}>
                        <Image
                            source={
                                repeatMode === 'off'
                                    ? require('@/assets/icons/repeat.png')
                                    : repeatMode === 'all'
                                        ? require('@/assets/icons/repeatall.png')
                                        : require('@/assets/icons/repeatsingle.png')
                            }
                            style={styles.controlIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={previousSong} style={styles.controlButton}>
                        <Image source={require('@/assets/icons/backward.png')} style={styles.controlIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={togglePlayPause} style={[styles.controlButton, styles.playButton]}>
                        {
                            isPlaying ?
                                <AntDesign name="pause" size={30} color="#FF0099" />
                                :
                                <Entypo name="controller-play" size={30} color="#FF0099" />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={nextSong} style={styles.controlButton}>
                        <Image source={require('@/assets/icons/forward.png')} style={styles.controlIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsPlaylistVisible(true)} style={styles.controlButton}>
                        <Image source={require('@/assets/icons/playlist.png')} style={styles.controlIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={downloadCurrentTrack} style={styles.controlButton}>
                        <AntDesign name="download" size={24} color="#FF0099" />
                    </TouchableOpacity>
                </View>
            </View>
            <Tracklist
                visible={isPlaylistVisible}
                onClose={() => setIsPlaylistVisible(false)}
                tracks={waitingList}
                currentTrackIndex={waitingList.indexOf(currentTrack)}
            />
            <CommentModal
                visible={isCommentModalVisible}
                onClose={() => setIsCommentModalVisible(false)}
                idSong={currentTrack.id}
            />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        width: width,
        height: height,
        resizeMode: 'cover',
    },
    overlay: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
    },
    topNav: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        paddingTop: 10,
        marginBottom: 20,
    },
    backNav: {
        position: 'absolute',
        left: 0
    },
    title: {
        color: '#FF0099',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    icon: {
        width: 24,
        height: 24,
        tintColor: '#FF0099',
    },
    albumCoverLarge: {
        width: 300,
        height: 300,
        borderRadius: 15,
        marginVertical: 20,
    },
    albumCoverSmall: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginVertical: 20,
    },
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: '#441a42',
        borderRadius: 20,
        paddingHorizontal: 5,
        paddingVertical: 5,
        marginVertical: 10,
    },
    toggleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 25,
        borderRadius: 20,
    },
    activeButton: {
        backgroundColor: '#FF0099',
    },
    toggleText: {
        color: '#888888',
        fontSize: 16,
        marginLeft: 5,
    },
    activeText: {
        color: '#FFFFFF',
    },
    toggleIcon: {
        width: 20,
        height: 20,
    },
    songInfoCenter: {
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 20,
    },
    songTitle: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: "center",
    },
    artist: {
        color: '#BBBBBB',
        fontSize: 16,
    },
    sliderContainer: {
        width: '90%',
        alignItems: 'center',
    },
    slider: {
        width: '100%',
        height: 40,
    },
    timestampContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
    },
    timestampText: {
        color: '#FFFFFF',
        fontSize: 12,
    },
    controlsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
        position: 'absolute',
        bottom: 30,
    },
    controlButton: {
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: '#441a42',
        alignItems: 'center',
        justifyContent: 'center',
    },
    playButton: {
        width: 50,
        height: 50,
        borderRadius: 40,
        bottom: 5,
    },
    controlIcon: {
        width: 18,
        height: 18,
        tintColor: '#FF0099',
    },
    lyricsContainer: {
        width: '90%',
        maxHeight: height * 0.4,
        paddingBottom: 20,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    scrollContent: {
        flexGrow: 1,
    },
    lyrics: {
        color: '#FFFFFF',
        textAlign: 'center',
        lineHeight: 24,
        fontSize: 16,
        fontWeight: '500',
    },
    commentButton: {
        position: 'absolute',
        right: 0,
        padding: 10,
    },
});

export default MainPlayer;