import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { PUBLIC_API_ENDPOINT } from '@/app/config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { io, Socket } from "socket.io-client";
import { Notification } from '@/types/interfaces';
import { fetchNotification } from '@/utils/api';

interface AppContextType {
    accessToken: string | null;
    setAccessToken: (token: string) => void;
    listNotification: Notification[];
    setListNotification: (noti: Notification[]) => void;
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
}> = ({
    children,
    initialAccessToken = '',
}) => {
        const [accessToken, setAccessToken] = useState<string | null>(initialAccessToken);
        const [socket, setSocket] = useState<Socket | null>(null);
        const [listNotification, setListNotification] = useState<Notification[]>([])

        useEffect(() => {
            const loadData = async () => {
                try {
                    const storedAccessToken = await AsyncStorage.getItem('accessToken');
                    if (storedAccessToken) {
                        setAccessToken(storedAccessToken);
                    }
                    console.log(storedAccessToken)
                } catch (error) {

                }
            };
            loadData();
        }, []);

        useEffect(() => {
            const saveData = async () => {
                try {
                    if (accessToken) {
                        await AsyncStorage.setItem('accessToken', accessToken);
                    } else {
                        await AsyncStorage.removeItem('accessToken');
                    }
                } catch (error) {
                    console.error('Error saving data to AsyncStorage', error);
                }
            };

            saveData();
        }, [accessToken]);

        useEffect(() => {
            if (accessToken) {
                const fetchAPINotification = async (accessToken: string) => {
                    const listFetchNotification = await fetchNotification(accessToken)
                    setListNotification(listFetchNotification)
                }
                fetchAPINotification(accessToken)
                const newSocket = io(PUBLIC_API_ENDPOINT, {
                    auth: { accessToken: accessToken },
                });

                newSocket.on("errTokenMising", (data) => {
                    alert(data);
                });

                newSocket.on("paymentStatus", (data) => {
                    console.log("payment", data);
                });

                newSocket.on("newNoti", (data: Notification) => {
                    console.log("newNoti: ", data)
                    setListNotification((prev) => [data, ...prev])
                })

                newSocket.on("disconnect", () => {
                    console.log("Socket disconnected");
                    // server lỗi -> router qua trang lỗi, 404,..... hoặc về lại login

                    // router.push("/listenTogether");
                })

                setSocket(newSocket);

                // Cleanup on Unmount or Token Change
                return () => {
                    newSocket.disconnect();
                    setSocket(null);
                };
            }
        }, [accessToken]);

        const value = {
            accessToken,
            setAccessToken,
            listNotification,
            setListNotification,
        };

        return (
            <AppContext.Provider value={value}>
                {children}
            </AppContext.Provider>
        );
    };
