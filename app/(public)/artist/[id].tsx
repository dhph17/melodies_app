import { View, Text, StyleSheet, FlatList, ScrollView, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { useRouter, useGlobalSearchParams } from 'expo-router';
import { ImageBackground } from 'expo-image';
import tinycolor from "tinycolor2";
import { useEffect, useState } from 'react';
import { fetchApiData } from '@/app/api/appService';
import { Artist, DataSong } from '@/types/interfaces';
import ArtistPopularSong from '@/components/trendingSong';
import { LinearGradient } from 'expo-linear-gradient';
import { PUBLIC_FE_ENDPOINT } from '@/app/config'
import Ionicons from '@expo/vector-icons/Ionicons';
import AlbumList from '@/components/listAlbum';
import AntDesign from '@expo/vector-icons/AntDesign';
import { usePlayback } from '@/app/provider/PlaybackContext';

const ArtistDetail = () => {
    const { id } = useGlobalSearchParams();
    const router = useRouter()
    const { currentTrack, setCurrentSong, setWaitingList } = usePlayback()
    const [dataArtist, setDataArtist] = useState<Artist>();
    const [dataSongArtist, setDataSongArtist] = useState<DataSong[]>([]);
    const [dataAlbumArtist, setDataAlbumArtist] = useState([]);
    const [dominantColor, setDominantColor] = useState<string>('rgba(0, 0, 0, 0)');
    const [darkDominantColor, setDarkDominantColor] = useState<string>('rgba(0, 0, 0, 0)');
    const [scrollY] = useState(new Animated.Value(0));

    useEffect(() => {
        const fetchSong = async () => {
            try {
                const responses = await Promise.all([
                    fetchApiData(`/api/artist/${id}`, "GET"),
                    fetchApiData(`/api/artist/popSong/${id}`, "GET", null, null, { page: 1 }),
                    fetchApiData(`/api/artist/album/${id}`, "GET", null, null, { page: 1 }),
                ]);
                if (responses[0].success) {
                    setDataArtist(responses[0].data.artist);
                    const imageUrl = responses[0].data.artist.avatar
                    try {
                        const response = await fetch(
                            `${PUBLIC_FE_ENDPOINT}/api/get-dominant-color/get-dominant?imageUrl=${encodeURIComponent(imageUrl)}`
                        );
                        console.log("API response:", response);
                        const data = await response.json();
                        if (response.ok) {
                            console.log("Dominant color:", data.dominantColor);
                            setDominantColor(data.dominantColor)
                            const darkerColor = tinycolor(data.dominantColor).darken(30).toString();
                            setDarkDominantColor(darkerColor);
                        } else {
                            console.error("Error fetching dominant color:", data.error);
                        }
                    } catch (error) {
                        console.error("Error fetching dominant color:", error);
                    }
                }
                if (responses[1].success) {
                    setDataSongArtist(responses[1].data.popSong);
                }
                if (responses[2].success) {
                    setDataAlbumArtist(responses[2].data.artistAlbum);
                }
            } catch (error) {
                console.error("Error fetching songs:", error);
            }
        };
        fetchSong();
    }, [id]);

    const backgroundColor = scrollY.interpolate({
        inputRange: [0, 200],
        outputRange: ['black', dominantColor],
        extrapolate: 'clamp',
    });

    const backgroundOpacity = scrollY.interpolate({
        inputRange: [0, 200],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });
    const headerBackgroundColor = scrollY.interpolate({
        inputRange: [130, 200],
        outputRange: ['transparent', dominantColor],
        extrapolate: 'clamp',
    });
    const artistNameOpacity = scrollY.interpolate({
        inputRange: [130, 200],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });
    const artistNameHeaderOpacity = scrollY.interpolate({
        inputRange: [130, 200],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
    );
    const renderContent = () => (
        <>
            <View style={styles.blank} />
            <View style={styles.main_section}>
                <Animated.Text style={[
                    styles.artistName,
                    { opacity: artistNameOpacity }
                ]}>
                    {dataArtist?.name}
                </Animated.Text>
                <LinearGradient
                    colors={[darkDominantColor, 'rgba(18 , 18, 18 ,1)']}
                    locations={[0, 0.2]}
                >
                    <View style={styles.section}>
                        <Text className='text-white font-light mb-2'>{dataArtist?.totalFollow.toLocaleString()} followers</Text>
                        <TouchableOpacity
                            style={styles.playBtn}
                            onPress={() => { setCurrentSong(dataSongArtist[0]); setWaitingList(dataSongArtist) }}
                        >
                            <AntDesign name="play" size={50} color="#EE10B0" />
                        </TouchableOpacity>
                        <View className=''>
                            <ArtistPopularSong data={dataSongArtist} maintitle='Popular' subtitle='Songs' />
                        </View>
                        <View className='mt-8'>
                            <AlbumList data={dataAlbumArtist} maintitle="Artist's" subtitle="Albums" />
                        </View>
                    </View>
                </LinearGradient>
            </View>
        </>

    );

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.imageContainer,
            {
                backgroundColor: backgroundColor,
                opacity: backgroundOpacity
            }
            ]}>
                <ImageBackground source={{ uri: dataArtist?.avatar }} style={styles.background}>
                    <LinearGradient
                        colors={['transparent', 'rgba(0, 0, 0, 0.7)']}
                        locations={[0, 0.95]}
                        style={styles.overlay}
                    />
                </ImageBackground>
            </Animated.View>
            <Animated.View style={[
                styles.artistHeader,
                { backgroundColor: headerBackgroundColor }
            ]}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Animated.Text style={[
                    styles.artistNameHeader,
                    { opacity: artistNameHeaderOpacity }
                ]}>
                    {dataArtist?.name}
                </Animated.Text>
            </Animated.View>
            <FlatList
                data={[]}
                renderItem={null}
                ListHeaderComponent={renderContent}
                onScroll={handleScroll} // Add onScroll handler
                scrollEventThrottle={16}
                style={[styles.flatlist, { marginBottom: currentTrack ? 150 : 80 }]}
            />
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    imageContainer: {
        width: '100%',
        aspectRatio: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
    },
    background: {
        width: '100%',
        aspectRatio: 1,
        zIndex: 1,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
    },
    flatlist: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 3,
    },
    main_section: {
        zIndex: 4,
        backgroundColor: 'transparent',
    },
    artistHeader: {
        flexDirection: 'row',
        gap: 8,
        zIndex: 4,
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 12,
    },
    blank: {
        width: '100%',
        height: 200,
    },
    artistName: {
        paddingHorizontal: 12,
        color: 'white',
        fontSize: 50,
        fontWeight: '700',
    },
    artistNameHeader: {
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
    },
    section: {
        width: '100%',
        position: 'relative',
        padding: 12,
    },
    playBtn: {
        position: 'absolute',
        right: 12,
        top: 10,
    }
});

export default ArtistDetail;