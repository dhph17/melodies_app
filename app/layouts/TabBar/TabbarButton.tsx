import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { icons } from '@/assets/images/icon';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';


interface TabBarButtonProps {

    isFocused: boolean;

    routeName: 'index' | 'search/index' | 'playlist/index' | 'profile/index' | 'notification/index';

    color: string;

    label: string;

    onPress: () => void;

    onLongPress: () => void;
}

const TabBarButton = (props: TabBarButtonProps) => {
    const { isFocused, label, routeName, color } = props;

    const scale = useSharedValue(0);

    useEffect(() => {
        scale.value = withSpring(
            typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused,
            { duration: 350 }
        );
    }, [scale, isFocused]);

    const animatedIconStyle = useAnimatedStyle(() => {

        const scaleValue = interpolate(
            scale.value,
            [0, 1],
            [1, 1.4]
        );
        const top = interpolate(
            scale.value,
            [0, 1],
            [0, 8]
        );

        return {
            // styles
            transform: [{ scale: scaleValue }],
            top
        }
    })
    const animatedTextStyle = useAnimatedStyle(() => {

        const opacity = interpolate(
            scale.value,
            [0, 1],
            [1, 0]
        );

        return {
            // styles
            opacity
        }
    })
    return (
        <Pressable {...props} style={styles.container}>
            <Animated.View style={[animatedIconStyle]}>
                {icons[routeName]
                    ? icons[routeName]({ color })
                    : <AntDesign name="questioncircleo" size={20} color={color} />}
            </Animated.View>

            <Animated.Text style={[{
                color,
                fontSize: 11
            }, animatedTextStyle]}>
                {label}
            </Animated.Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1
    }
})

export default TabBarButton