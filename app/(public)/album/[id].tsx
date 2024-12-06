import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native'
import { Image } from 'expo-image';
import { PUBLIC_FE_ENDPOINT } from '@/app/config'
import { useRouter, useGlobalSearchParams } from 'expo-router';
import { fetchApiData } from '@/app/api/appService';
import { DataAlbum } from '@/types/interfaces';
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { getMainArtistName, getPoster } from '@/utils/utils';
import { usePlayback } from '@/app/provider/PlaybackContext';

const AlbumPage = () => {
    const { id } = useGlobalSearchParams();
    const router = useRouter()
    const [dataAlbum, setDataAlbum] = useState<DataAlbum>();
    const [dominantColor, setDominantColor] = useState<string>('rgba(0, 0, 0, 0)');
    const { setCurrentSong, setWaitingList, currentTrack } = usePlayback()

    function formatDuration(totalMilliseconds: number) {
        const totalSeconds = Math.floor(totalMilliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const timeParts = [];
        if (hours > 0) {
            timeParts.push(`${hours}h`);
        }
        timeParts.push(`${minutes} min`);
        timeParts.push(`${seconds} sec`);
        return timeParts.join(' ');
    }

    useEffect(() => {
        const fetchData = async () => {
            //   setLoading(true);
            const result = await fetchApiData(`/api/album/${id}`, "GET");
            if (result.success) {
                setDataAlbum(result.data.album)
                const imageUrl = getPoster(result.data.album);
                if (imageUrl) {
                    try {
                        const response = await fetch(
                            `${PUBLIC_FE_ENDPOINT}/api/get-dominant-color/get-dominant?imageUrl=${encodeURIComponent(imageUrl as string)}`
                        );
                        console.log("API response:", response);
                        const data = await response.json();
                        if (response.ok) {
                            console.log("Dominant color:", data.dominantColor);
                            setDominantColor(data.dominantColor);
                        } else {
                            console.error("Error fetching dominant color:", data.error);
                        }
                    } catch (error) {
                        console.error("Error fetching dominant color:", error);
                    }
                } else {
                    setDominantColor('#595959');
                }
            } else {
                console.error("Login error:", result.error);
                // setNotFound(true)
            }
            //   setLoading(false);
        };

        fetchData();
    }, [id]);

    return (
        <View style={styles.container}>
            {/* Header with Gradient */}
            <LinearGradient
                colors={[dominantColor, "#121212"]}
                style={styles.headerContainer}
            >
                <View style={styles.header}>
                    <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
                        <FontAwesome name="chevron-left" size={24} color="white" />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Find in playlist"
                        placeholderTextColor="rgba(255, 255, 255, 0.8)"
                    />
                    <TouchableOpacity style={styles.iconButton}>
                        <FontAwesome name="sort" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Playlist Image and Title */}
                <View style={styles.playlistInfo}>
                    <Image
                        source={dataAlbum ? getPoster(dataAlbum) : undefined}
                        style={styles.image}
                    />
                    <Text style={styles.title}>{dataAlbum?.title}</Text>
                    <Text style={styles.likes}>{dataAlbum?.songNumber ?? 0} {(dataAlbum?.songNumber ?? 0) > 1 ? 'songs' : 'song'} <Text className="text-gray-300">•</Text> {dataAlbum ? formatDuration(dataAlbum.totalDuration) : ''}</Text>
                </View>
            </LinearGradient>

            {/* Songs List */}
            <FlatList
                data={dataAlbum?.songs}
                keyExtractor={(item) => item.id}
                contentContainerStyle={[{ paddingBottom: currentTrack ? 150 : 80 }]}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.songItem}
                        onPress={() => { setCurrentSong(item); if (dataAlbum?.songs) setWaitingList(dataAlbum.songs) }}
                    >
                        <Image
                            source={{ uri: dataAlbum ? getPoster(dataAlbum) : undefined }}
                            style={styles.songImage}
                        />
                        <View style={styles.songInfo}>
                            <Text style={styles.songTitle}>{item.title}</Text>
                            <Text style={styles.songArtist}>{getMainArtistName(item?.artists)}</Text>
                        </View>
                        <TouchableOpacity>
                            <FontAwesome name="ellipsis-v" size={20} color="white" />
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default AlbumPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
    },
    headerContainer: {
        paddingBottom: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        marginTop: 10,
    },
    iconButton: {
        padding: 8,
    },
    searchBar: {
        flex: 1,
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 20,
        height: 40,
        paddingHorizontal: 16,
        color: "white",
        marginHorizontal: 8,
    },
    playlistInfo: {
        alignItems: "center",
        marginTop: 80,

    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 8,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: "#aaa",
        textAlign: "center",
    },
    likes: {
        fontSize: 14,
        color: "#bbb",
    },
    flatListContent: {
        paddingBottom: 100,
    },
    songItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    songImage: {
        width: 50,
        height: 50,
        borderRadius: 4,
        marginRight: 10,
    },
    songInfo: {
        flex: 1,
    },
    songTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
    songArtist: {
        fontSize: 14,
        color: "#aaa",
    },
});