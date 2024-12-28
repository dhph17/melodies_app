import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, FlatList, ToastAndroid } from 'react-native';
import { Image } from 'expo-image';
import Modal from 'react-native-modal';
import { fetchApiData } from '@/app/api/appService';
import { DataPlaylist } from '@/types/interfaces';
import PlaylistImage from '@/assets/images/placeholderPlaylist.png'
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AddPlaylistModalProps {
    idSong: string;
    isVisible: boolean;
    onClose: () => void;
}

const AddPlaylistModal: React.FC<AddPlaylistModalProps> = ({ idSong, isVisible, onClose }) => {
    const [searchContent, setSearchContent] = useState<string>('')
    const [listPlaylist, setListPlaylist] = useState<DataPlaylist[]>([])

    useEffect(() => {
        const handleFetchPlaylistByUser = async () => {
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken) {
                const result = await fetchApiData(
                    "/api/user/playlist",
                    "GET",
                    null,
                    accessToken,
                    { page: 1 }
                );
                if (result.success) {
                    const publicPlaylists = result.data.playlists.filter(
                        (playlist: DataPlaylist) => !playlist.privacy
                    );
                    setListPlaylist(publicPlaylists);
                }
            }
        };
        handleFetchPlaylistByUser();
    }, [])

    const handleAddToPlaylist = async (idPlaylist: string) => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
            const payload = {
                songId: idSong,
                playlistId: idPlaylist
            }
            const result = await fetchApiData(`/api/user/playlist/addSong`, "POST", JSON.stringify(payload), accessToken);
            if (result.success) {
                onClose()
                ToastAndroid.show('Add song to playlist successfully', ToastAndroid.LONG);
            } else {
                ToastAndroid.show('Add song to playlist failed', ToastAndroid.LONG);
            }
        }

    }

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            style={styles.modal}
            animationIn="slideInUp"
            animationOut="slideOutDown"
        >
            <KeyboardAvoidingView
                style={styles.container}
                behavior='padding'
                keyboardVerticalOffset={0}
            >
                <View style={styles.modalContent}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View>
                            <View style={styles.header}>
                                <Text style={styles.modalTitle}>Add to playlist</Text>
                                <TouchableOpacity>
                                    <AntDesign name="close" size={22} color="white" onPress={onClose} />
                                </TouchableOpacity>
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder='Search playlist ...'
                                placeholderTextColor={'#fff'}
                                value={searchContent}
                                onChangeText={(e) => setSearchContent(e)}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    <FlatList
                        style={styles.flatList}
                        data={listPlaylist}
                        renderItem={({ item }) => (
                            <View
                                style={styles.itemContainer}
                            >
                                <View
                                    style={styles.itemSong}
                                >
                                    <Image
                                        style={styles.image}
                                        source={item.image ? item.image : PlaylistImage} />
                                    <View>
                                        <Text className='line-clamp-2'
                                            style={styles.title}
                                        >{item.title}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity>
                                    <AntDesign name="plus" size={22} color="white" onPress={() => handleAddToPlaylist(item.playlistId)} />
                                </TouchableOpacity>
                            </View>
                        )}
                        keyExtractor={(item) => item.playlistId}
                    />
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
        marginTop: 50
    },
    container: {
        flex: 1,
    },
    modalContent: {
        backgroundColor: '#121212',
        padding: 14,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        height: 750
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerButton: {
        paddingHorizontal: 10,
    },
    modalTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    editIcon: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#3b82f6',
        borderRadius: 12,
        padding: 5,
    },
    inputContainer: {
        borderTopWidth: 1,
        borderTopColor: '#333',
        paddingTop: 15,
    },
    label: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#333',
        color: '#fff',
        padding: 10,
        borderRadius: 5,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16
    },
    itemSong: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    image: {
        width: 50,
        height: 50,
    },
    artist: {
        color: '#BBBBBB',
        fontSize: 14,
    },
    title: {
        color: 'white',
        fontWeight: 500,
        fontSize: 16,
    },
    flatList: {
        backgroundColor: '#121212',
        paddingVertical: 14,
        // height: 600
    }
});

export default AddPlaylistModal;