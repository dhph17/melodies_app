import React from 'react';
import { View, StyleSheet } from 'react-native';
import TabBarButton from './TabbarButton';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const TabBar = ({ state, descriptors, navigation, isOffline }: BottomTabBarProps & { isOffline: boolean }) => {
    const primaryColor = '#69BFFF';
    const greyColor = '#fde7f7';

    return (
        <View style={styles.tabbar}>
            {state.routes.map((route, index) => {
                // Manual exclusions for specific routes
                if (['_sitemap', '+not-found'].includes(route.name)) return null;
                if (route.name === 'artist/[id]') return null;
                if (route.name === 'playlist/ViewPlaylist') return null;
                if (route.name === 'profile/EditProfileModal') return null;
                if (route.name === 'profile/EditPasswordModal') return null;
                if (route.name === 'profile/SubscriptionModal') return null;
                if (route.name === 'album/[id]') return null;
                if (route.name === 'playlist/[id]') return null;
                if (route.name === 'upload/uploadModal') return null;
                if (route.name === 'listen/songModal') return null;
                if (route.name === 'listen/hostModal') return null;
                if (route.name === 'listen/guestModal') return null;
                if (route.name === 'listen/index') return null;
                if (route.name === 'listen/MemberModal') return null;
                if (route.name === 'listen/listenPlayer') return null;

                // Exclude tabs dynamically based on offline state
                // if (isOffline && route.name !== 'offlineIndex') return null;
                // if (!isOffline && route.name === 'offlineIndex') return null;

                const { options } = descriptors[route.key];
                const label =
                    typeof options.tabBarLabel === 'string'
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name.split('/')[0]; // Clean up route names for display

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TabBarButton
                        key={route.name}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        isFocused={isFocused}
                        routeName={route.name as 'index' | 'search/index' | 'playlist/index' | 'profile/index' | 'upload/index'}
                        color={isFocused ? primaryColor : greyColor}
                        label={label}
                    />
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    tabbar: {
        position: 'absolute',
        bottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fc0094',
        marginHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
        borderCurve: 'continuous',
        shadowColor: '#0e9eef',
        shadowOffset: { width: 0, height: -22 },
        shadowOpacity: 0.4,
        shadowRadius: 0,
        elevation: 5,
    },
});

export default TabBar;
