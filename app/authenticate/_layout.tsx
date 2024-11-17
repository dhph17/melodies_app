import React from 'react';
import { View, Text } from 'react-native';
import { Stack } from 'expo-router';

export default function AuthRoutes() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
    );
}