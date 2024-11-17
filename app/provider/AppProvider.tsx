import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppContextType {
    showPlaylistMenu: boolean;
    setShowPlaylistMenu: (show: boolean) => void;
    search: string;
    setSearch: (search: string) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    role: string | null;
    setRole: (role: string) => void;
    accessToken: string | null;
    setAccessToken: (token: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};

export const AppProvider: React.FC<{
    children: ReactNode;
    initialAccessToken?: string;
    initialRole?: string;
}> = ({
    children,
    initialAccessToken = '',
    initialRole = '',
}) => {
        const [loading, setLoading] = useState<boolean>(true);  // Start with loading set to true
        const [showPlaylistMenu, setShowPlaylistMenu] = useState<boolean>(false);
        const [search, setSearch] = useState<string>('');
        const [role, setRole] = useState<string | null>(initialRole);
        const [accessToken, setAccessToken] = useState<string | null>(initialAccessToken);

        useEffect(() => {
            const loadData = async () => {
                try {
                    const storedRole = await AsyncStorage.getItem('role');
                    const storedAccessToken = await AsyncStorage.getItem('accessToken');

                    if (storedRole) {
                        setRole(storedRole);
                    }
                    if (storedAccessToken) {
                        setAccessToken(storedAccessToken);
                    }
                    console.log(storedAccessToken)
                    setLoading(false);  // Set loading to false once data is loaded
                } catch (error) {
                    console.error('Error loading data from AsyncStorage', error);
                    setLoading(false);  // Ensure loading is set to false even on error
                }
            };

            loadData();
        }, []);

        useEffect(() => {
            const saveData = async () => {
                try {
                    if (accessToken) {
                        await AsyncStorage.setItem('accessToken', accessToken);
                        console.log('ok access')
                    } else {
                        await AsyncStorage.removeItem('accessToken');
                        console.log('remove access')
                    }

                    if (role) {
                        await AsyncStorage.setItem('role', role);
                    } else {
                        await AsyncStorage.removeItem('role');
                    }
                } catch (error) {
                    console.error('Error saving data to AsyncStorage', error);
                }
            };

            saveData();
        }, [accessToken, role]);

        const value = {
            showPlaylistMenu,
            setShowPlaylistMenu,
            search,
            setSearch,
            loading,
            setLoading,
            role,
            setRole,
            accessToken,
            setAccessToken,
        };

        return (
            <AppContext.Provider value={value}>
                {children}
            </AppContext.Provider>
        );
    };
