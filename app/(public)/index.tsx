import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from "expo-router";
import ListSong from '@/components/listSong';
import { fetchApiData } from '@/app/api/appService';
import ArtistPopularSong from '@/components/ArtistPopularSong';
import PopularArtists from '@/components/popularArtists';
import Banner from '@/components/banner';

const Main = () => {
    const router = useRouter();
    const [weekSong, setWeekSong] = useState()
    const [newReleaseSong, setNewReleaseSong] = useState()
    const [trendSong, setTrendSong] = useState()
    const [popularArtist, setPopularArtist] = useState()
    useEffect(() => {
        const fetchSong = async () => {
            try {
                const responses = await Promise.all([
                    fetchApiData("/api/songs/weeklytopsongs", "GET", null, null, { page: 1 }),
                    fetchApiData("/api/songs/newRaleaseSong", "GET", null, null, { page: 1 }),
                    fetchApiData("/api/songs/trending", "GET", null, null, { page: 1 }),
                    fetchApiData("/api/artist/popular", "GET", null, null, { page: 1 })
                ]);
                if (responses[0].success) setWeekSong(responses[0].data.weeklyTopSongs);
                if (responses[1].success) setNewReleaseSong(responses[1].data.newReleaseSongs);
                if (responses[2].success) setTrendSong(responses[2].data.trendingSongs);
                if (responses[3].success) setPopularArtist(responses[3].data.popularArtist);
            } catch (error) {
                console.error("Error fetching songs:", error);
            } finally {
            }
        };
        fetchSong();
    }, []);

    const renderContent = () => (
        <View style={styles.container} className="flex flex-col gap-4">
            <Banner />
            <View>
                <ListSong maintitle="Weekly Top" subtitle="Songs" data={weekSong} />
            </View>
            <View>
                <ListSong maintitle="New Releases" subtitle="Songs" data={newReleaseSong} />
            </View>
            <View>
                <ArtistPopularSong maintitle="Trending" subtitle="Songs" data={trendSong} />
            </View>
            <View>
                <PopularArtists maintitle="Popular" subtitle="Artists" data={popularArtist} />
            </View>
        </View>
    );

    return (
        <FlatList
            data={[]}
            renderItem={null}
            ListHeaderComponent={renderContent}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingBottom: 100
    },
});

export default Main;
