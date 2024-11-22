import { DataSong } from '@/types/interfaces';
import { getMainArtistName, getPosterSong } from '@/utils/utils';
import { Image } from 'expo-image';
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    FlatList,
    TouchableWithoutFeedback,
} from 'react-native';

interface TracklistProps {
    visible: boolean;
    onClose: () => void;
    tracks: DataSong[];
    currentTrackIndex: number;
    onSelectTrack: (index: number) => void;
}

const Tracklist: React.FC<TracklistProps> = ({
    visible,
    onClose,
    tracks,
    currentTrackIndex,
    onSelectTrack,
}) => {
    const renderTrack = ({ item, index }: { item: DataSong; index: number }) => {
        const isCurrent = index === currentTrackIndex;

        return (
            <TouchableOpacity
                style={[styles.trackItem, isCurrent && styles.currentTrack]}
                onPress={() => onSelectTrack(index)}
            >
                <Image source={getPosterSong(item.album).image} style={styles.trackImage} />
                <View style={styles.trackInfo}>
                    <Text style={[styles.trackTitle, isCurrent && styles.currentTrackText]}>
                        {item.title}
                    </Text>
                    <Text style={[styles.trackArtist, isCurrent && styles.currentTrackText]}>
                        {getMainArtistName(item.artists)}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback>
                        <View style={styles.tracklistContainer}>
                            <Text style={styles.title}>Playlist</Text>
                            <FlatList
                                data={tracks}
                                renderItem={renderTrack}
                                keyExtractor={(item, index) => index.toString()}
                                style={styles.trackList}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        top: 150,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tracklistContainer: {
        width: '90%',
        backgroundColor: '#441a42',
        borderRadius: 10,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF0099',
        marginBottom: 20,
        textAlign: 'center',
    },
    trackList: {
        maxHeight: 300,
    },
    trackItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    trackImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    trackInfo: {
        flex: 1,
    },
    trackTitle: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    trackArtist: {
        fontSize: 14,
        color: '#BBBBBB',
    },
    currentTrack: {
        backgroundColor: '#FF0099',
        borderRadius: 5,
        padding: 5,
    },
    currentTrackText: {
        color: '#FFFFFF',
    },
});

export default Tracklist;