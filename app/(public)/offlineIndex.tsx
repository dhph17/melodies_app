import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OfflineIndex = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>You are offline. Please check your internet connection.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    text: {
        fontSize: 18,
        color: 'gray',
        textAlign: 'center',
    },
});

export default OfflineIndex;
