import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    Dimensions,
    TextInput,
    FlatList,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { usePlayback } from '../../provider/PlaybackContext';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { formatTime, getAllArtistsInfo, getPosterSong } from '@/utils/utils';
import { Image } from 'expo-image';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HostModal from './hostModal';
import GuestModal from './guestModal';
import MemberModal from './MemberModal';

const { height, width } = Dimensions.get('window');

// Define the type of a message
interface Message {
    id: number;
    text: string;
}

const MainPlayer = () => {
    const router = useRouter();
    const {
        currentTrack,
        positionMillis,
        durationMillis,
        seekTo,
    } = usePlayback();

    const [chatInput, setChatInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isHostModalVisible, setHostModalVisible] = useState(false);
    const [isGuestModalVisible, setGuestModalVisible] = useState(false);
    const [isMemberModalVisible, setMemberModalVisible] = useState(false);

    // Example of setting the user manually for testing purposes
    const user = "guest";  // Change this to "guest" to test the GuestModal

    // Reference to FlatList
    const flatListRef = useRef<FlatList>(null);

    const handleSendMessage = () => {
        if (chatInput.trim().length === 0) return;

        setMessages((prevMessages) => [
            ...prevMessages,
            { id: prevMessages.length + 1, text: chatInput },
        ]);
        setChatInput('');

        // Automatically scroll to the bottom after posting a message
        setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
        }, 100); // Delay to ensure the message is added before scrolling
    };

    if (!currentTrack) {
        return <Text>Loading...</Text>;
    }

    // Function to handle button press and open the corresponding modal based on user role
    const handleAddButtonPress = () => {
        if (user === "host") {
            setHostModalVisible(true);
        } else {
            setGuestModalVisible(true);
        }
    };

    return (
        <ImageBackground source={getPosterSong(currentTrack.album).image} style={styles.background} blurRadius={20}>
            <View style={styles.overlay}>
                <View style={styles.topNav}>
                    <TouchableOpacity style={styles.backNav} onPress={() => router.push('/(public)')}>
                        <Ionicons name="arrow-back" size={24} color="#FF0099" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Music</Text>
                    <TouchableOpacity style={styles.memberButton} onPress={() => setMemberModalVisible(true)}>
                        <Ionicons name="people" size={24} color="#FF0099" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addButton} onPress={handleAddButtonPress}>
                        <FontAwesome name="plus" size={24} color="#FF0099" />
                    </TouchableOpacity>
    
                </View>

                <Image source={getPosterSong(currentTrack.album).image} style={styles.albumCoverSmall} />

                <View style={styles.songInfoCenter}>
                    <Text style={styles.songTitle}>{currentTrack.title}</Text>
                    <Text style={styles.artist}>
                        {getAllArtistsInfo(currentTrack?.artists).map((artist, index, array) => (
                            <Text key={artist.id} style={styles.artist}>
                                {artist.name}
                                {index < array.length - 1 && <Text>, </Text>}
                            </Text>
                        ))}
                    </Text>
                </View>
                <View style={styles.sliderContainer}>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={durationMillis}
                        value={positionMillis}
                        onSlidingComplete={seekTo}
                        minimumTrackTintColor="#FF0099"
                        maximumTrackTintColor="#888888"
                        thumbTintColor="#FF0099"
                    />
                    <View style={styles.timestampContainer}>
                        <Text style={styles.timestampText}>{formatTime(positionMillis)}</Text>
                        <Text style={styles.timestampText}>{formatTime(durationMillis)}</Text>
                    </View>
                </View>

                {/* Chat Section */}
                <View style={styles.chatContainer}>
                    <FlatList
                        ref={flatListRef} // Attach the FlatList reference
                        data={messages}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <Text style={styles.chatMessage}>{item.text}</Text>}
                        contentContainerStyle={{ flexGrow: 1 }}
                        showsVerticalScrollIndicator={false}
                    />
                    <View style={styles.chatInputContainer}>
                        <TextInput
                            style={styles.chatInput}
                            placeholder="Enter message"
                            placeholderTextColor="#AAAAAA"
                            value={chatInput}
                            onChangeText={setChatInput}
                        />
                        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
                            <Ionicons name="send" size={24} color="#FF0099" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Conditionally render the appropriate modal based on the user type */}
            {user === "host" && (
                <HostModal
                    isVisible={isHostModalVisible}
                    onClose={() => setHostModalVisible(false)}
                />
            )}

            {user === "guest" && (
                <GuestModal
                    isVisible={isGuestModalVisible}
                    onClose={() => setGuestModalVisible(false)}
                />
            )}

            <MemberModal
                isVisible={isMemberModalVisible}
                onClose={() => setMemberModalVisible(false)}
            />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        width: width,
        height: height,
        resizeMode: 'cover',
    },
    overlay: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
    },
    topNav: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        paddingTop: 10,
        marginBottom: 20,
    },
    backNav: {
        position: 'absolute',
        left: 0,
    },
    title: {
        color: '#FF0099',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    albumCoverSmall: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginVertical: 20,
    },
    songInfoCenter: {
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 20,
    },
    songTitle: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    artist: {
        color: '#BBBBBB',
        fontSize: 16,
    },
    sliderContainer: {
        width: '90%',
        alignItems: 'center',
    },
    slider: {
        width: '100%',
        height: 40,
    },
    timestampContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
    },
    timestampText: {
        color: '#FFFFFF',
        fontSize: 12,
    },
    chatContainer: {
        width: '90%',
        height: '30%',
        backgroundColor: '#1E1E1E',
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
    },
    chatMessage: {
        color: '#FFFFFF',
        fontSize: 14,
        marginVertical: 5,
    },
    chatInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    chatInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#333333',
        borderRadius: 10,
        padding: 10,
        color: '#FFFFFF',
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: '#333333',
        borderRadius: 50,
        padding: 10,
    },
    addButton: {
        position: 'absolute',
        right: 0,
        padding: 10,
    },
    memberButton: {
        position: 'absolute',
        right: 35,
        padding: 10,
    },
});

export default MainPlayer;
