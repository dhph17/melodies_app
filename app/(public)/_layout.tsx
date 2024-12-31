import React, { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { Tabs } from 'expo-router';
import TabBar from '@/app/layouts/TabBar/TabBar';
import Header from '@/app/layouts/header/header';
import MiniPlayer from '@/app/player/MiniPlayer';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';

export default function PublicLayout() {
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setIsOffline(!state.isConnected);
        });

        return () => unsubscribe();
    }, []);

    if (isOffline) {
        return (
            <SafeAreaView style={styles.container}>
                <Tabs
                    tabBar={(props) => <TabBar {...props} isOffline={isOffline} />}
                    screenOptions={{
                        header: () => <Header />,
                    }}
                >
                <Tabs.Screen
                    name="offlineIndex"
                    options={{
                        title: "Offline",
                        headerShown: false,
                    }}
                />
            </Tabs>
            <MiniPlayer />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Tabs
                tabBar={(props) => <TabBar {...props} isOffline={isOffline} />}
                screenOptions={{
                    header: () => <Header />,
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Home",
                    }}
                />
                <Tabs.Screen
                    name="search/index"
                    options={{
                        title: "Search",
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="playlist/index"
                    options={{
                        title: "Playlist",
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="profile/index"
                    options={{
                        title: "Profile",
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="upload/index"
                    options={{
                        title: "Upload",
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="offlineIndex"
                    options={{
                        title: "Offline",
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="artist/[id]"
                    options={{
                        title: "Profile",
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="album/[id]"
                    options={{
                        title: "Profile",
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="playlist/[id]"
                    options={{
                        title: "Profile",
                        headerShown: false,
                    }}
                />
                
                {/* <Tabs.Screen
                    name="listen/index"
                    options={{
                        title: "Listen Index",
                        headerShown: false,
                    }}
                />

                <Tabs.Screen
                    name="listen/listenPlayer"
                    options={{
                        title: "Listen Player",
                        headerShown: false,
                    }}
                /> */}
            </Tabs>
            <MiniPlayer />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

