import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image';
import { ArtistImage1 } from '../assets/images';

const ArtistBanner = () => {
    return (
        <View style={styles.artistHeader}>
            <Image source={ArtistImage1} style={styles.artistImage} />
            <Text style={styles.artistName}>Eminem</Text>
        </View>
    )
}

export default ArtistBanner

const styles = StyleSheet.create({
    artistHeader: {
        position: 'relative',
        alignItems: 'center',
        marginBottom: 16,
    },
    artistImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
    artistName: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
})