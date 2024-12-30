import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PlaybackProvider } from '@/app/provider/PlaybackContext';
import '../global.css'
import { AppProvider } from '@/app/provider/AppProvider';

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle={'light-content'}
                backgroundColor={'#121212'}
            />
            <ThemeProvider value={DarkTheme}>
                <AppProvider>
                    <PlaybackProvider>
                        <Stack initialRouteName="(public)">
                            <Stack.Screen name="(public)" options={{ headerShown: false }} />
                            <Stack.Screen name="authenticate" options={{ headerShown: false }} />
                            <Stack.Screen name="player" options={{ headerShown: false }} />
                        </Stack>
                    </PlaybackProvider>
                </AppProvider>
            </ThemeProvider>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212'
    },
});
