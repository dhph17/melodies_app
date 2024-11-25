import { View, Text, StyleSheet, FlatList, ScrollView, Dimensions, Animated } from 'react-native';
import { useGlobalSearchParams } from 'expo-router';
import { ImageBackground } from 'expo-image';
import { useEffect, useState } from 'react';
import { fetchApiData } from '@/app/api/appService';
import { Artist, DataSong } from '@/types/interfaces';
import ArtistPopularSong from '@/components/trendingSong';
import { LinearGradient } from 'expo-linear-gradient';
import { PUBLIC_FE_ENDPOINT } from '@/app/config'

const ArtistDetail = () => {
    const { id } = useGlobalSearchParams();
    const [dataArtist, setDataArtist] = useState<Artist>();
    const [dataSongArtist, setDataSongArtist] = useState<DataSong[]>([]);
    const [dataAlbumArtist, setDataAlbumArtist] = useState([]);
    const [dominantColor, setDominantColor] = useState<string>();
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
                            setDominantColor(data.dominantColor);
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

    const imageOpacity = scrollY.interpolate({
        inputRange: [0, 200],
        outputRange: [1, 0.5],
        extrapolate: 'clamp',
    });

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
    );

    const renderContent = () => (
        <>
            <View style={styles.blank}>

            </View>
            <View style={styles.main_section}>
                <Text style={styles.artistName}>{dataArtist?.name}</Text>
                <View style={styles.section}>
                    <ArtistPopularSong data={dataSongArtist} maintitle='Popular' />
                </View>
            </View>
            <View style={styles.main_section}>
                <Text style={styles.artistName}>{dataArtist?.name}</Text>
                <View style={styles.section}>
                    <ArtistPopularSong data={dataSongArtist} maintitle='Popular' />
                </View>
            </View>
            <View style={styles.main_section}>
                <Text style={styles.artistName}>{dataArtist?.name}</Text>
                <View style={styles.section}>
                    <ArtistPopularSong data={dataSongArtist} maintitle='Popular' />
                </View>
            </View>
        </>

    );

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.imageContainer, { opacity: imageOpacity }]}>
                <ImageBackground source={{ uri: dataArtist?.avatar }} style={styles.background}>
                    <LinearGradient
                        colors={['transparent', 'rgba(0, 0, 0, 0.7)']}
                        style={styles.overlay}
                    />
                </ImageBackground>
            </Animated.View>
            <FlatList
                data={[]}
                renderItem={null}
                ListHeaderComponent={renderContent}
                onScroll={handleScroll} // Add onScroll handler
                scrollEventThrottle={16}
                style={styles.flatlist}
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
    blank: {
        width: '100%',
        height: '10%',
    },
    artistName: {
        paddingHorizontal: 12,
        color: 'white',
        fontSize: 50,
        fontWeight: '700',
    },
    section: {
        backgroundColor: 'black',
        padding: 10,
    },
});

export default ArtistDetail;