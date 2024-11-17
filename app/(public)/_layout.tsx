import { Tabs } from 'expo-router'
import TabBar from '@/app/layouts/TabBar/TabBar';
import { Text, View } from 'react-native';
import Header from '@/app/layouts/header/header';

export default function PublicLayout() {
    return (
        <Tabs
            tabBar={props => <TabBar {...props} />}
            screenOptions={{
                header: () => <Header />
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                }}
            />
            <Tabs.Screen
                name="discover/index"
                options={{
                    title: "Discover",
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
    );
}