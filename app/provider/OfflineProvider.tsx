import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import NetInfo from '@react-native-community/netinfo';

interface OfflineProviderProps {
    children: ReactNode;
}

interface OfflineContextType {
    isOffline: boolean,
    setIsOffline: (isOffline: boolean) => void;
}

// Create the context
const OfflineContext = createContext<OfflineContextType | undefined>(undefined);

export const OfflineProvider: React.FC<OfflineProviderProps> = ({ children }) => {
    const [isOffline, setIsOffline] = useState<boolean>(false)

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setIsOffline(!state.isConnected);
        });

        return () => unsubscribe();
    }, []);

    return (
        <OfflineContext.Provider
            value={{
                isOffline,
                setIsOffline
            }}
        >
            {children}
        </OfflineContext.Provider>
    );
};

export const useOffline = () => {
    const context = useContext(OfflineContext);
    if (!context) {
        throw new Error('useOffline must be used within a OfflineProvider');
    }
    return context;
};