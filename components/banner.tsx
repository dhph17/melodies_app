import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Image } from 'expo-image'
import React from 'react'
import banner from '@/assets/images/banner.png'

const Banner = () => {
    return (
        <View style={styles.artistHeader}>
            <Image source={banner} style={styles.artistImage} />
            <View style={styles.content}>
                <Text className=" text-white text-2xl font-semibold" >All the <Text className="text-primaryColorPink">Best Songs</Text> in One Place</Text>
                <TouchableOpacity style={styles.contentButton}>
                    <Text style={styles.buttonText}>Discover</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Banner

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
    content: {
        width: '50%',
        position: 'absolute',
        top: '15%',
        left: '3%',
        right: 0,
        bottom: 0,
        zIndex: 1,
    },
    contentButton: {
        marginTop: 10,
        width: 100,
        borderWidth: 1,
        borderColor: '#FF1493',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 13,
        paddingVertical: 8,
        fontWeight: 500,
    },
})