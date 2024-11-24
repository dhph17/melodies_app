import React from 'react';
import { View, Text } from 'react-native';
import PlayerScreen from '@/app/player/MainPlayer'; // Adjust the path as necessary
import { Stack } from 'expo-router';

export default function PlayerRoutes() {
    return (
        <Stack>
            <Stack.Screen name='MainPlayer' options={{ headerShown: false }} />
        </Stack>
    );
}