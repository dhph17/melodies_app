import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from "expo-router";
import ListSong from '@/components/listSong';
import { fetchApiData } from '@/app/api/appService';

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

    return (
        <View style={styles.container} className="flex flex-col gap-5 mb-20 relative">
            {/* <Banner /> */}
            <View className="">
                <ListSong maintitle="Weekly Top" subtitle="Songs" data={weekSong} />
            </View>
            <View className="mt-4">
                <ListSong maintitle="New Releases" subtitle="Songs" data={newReleaseSong} />
            </View>
            {/* <View className="">
                <TrendingSongs maintitle="Trending" subtitle="Songs" data={trendSong} />
            </View>
            <View className="">
                <PopularArtists maintitle="Popular" subtitle="Artists" data={popularArtist} />
            </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
});

export default Main;
