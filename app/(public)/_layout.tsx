import { Tabs } from 'expo-router';
import TabBar from '@/app/layouts/TabBar/TabBar';
import Header from '@/app/layouts/header/header';
import MiniPlayer from '@/app/player/MiniPlayer';

export default function PublicLayout() {
    return (
        <>
            <Tabs
                tabBar={(props) => <TabBar {...props} />}
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
                    }}
                />
                <Tabs.Screen
                    name="profile/index"
                    options={{
                        title: "Profile",
                    }}
                />
            </Tabs>
            <MiniPlayer />
        </>
    );
}

