import React, { useEffect, useState } from 'react';
import { useRouter } from "expo-router";
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchApiData } from '@/app/api/appService';
import { User } from "@/types/interfaces";
import { useFocusEffect } from '@react-navigation/native';

const Profile = () => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>()

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                const accessToken = await AsyncStorage.getItem('accessToken');
                if (accessToken) {
                    const result = await fetchApiData(`/api/user`, "GET", null, accessToken ?? null);
                    if (result.success) {
                        setUser(result.data.user);
                    } else {
                        console.error("Login error:", result.error);
                    }
                }
            };

            fetchData();
        }, [])
    );

    async function handleLogout() {
        const accessToken = await AsyncStorage.getItem('accessToken')
        if (accessToken) {
            try {
                const result = await fetchApiData(
                    "/api/auth/logout",
                    "POST",
                    null,
                    accessToken
                );

                if (result.success) {
                    await AsyncStorage.clear()
                    setUser(null)
                } else {
                    console.error("Logout error:", result.error);
                }
            } catch (error) {
                console.error("Logout error:", error);
            }
        }
    }

    return (
        <View style={styles.container}>
            {user ? (
                <View>
                    <Text className='text-white'>Welcome, your name is: {user?.username}</Text>
                    <TouchableOpacity
                        onPress={handleLogout}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View>
                    <TouchableOpacity
                        onPress={() => router.push('/authenticate')}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <Text style={styles.primaryText}>You are not logged in</Text>
                </View>
            )
            }
        </View >
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#3b82f6', // Tailwind color for "bg-blue-500"
        padding: 12,
        borderRadius: 8,
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
    },
    primaryText: {
        color: '#e11d48', // Tailwind color for "text-primaryColorPink"
    },
});

export default Profile;
