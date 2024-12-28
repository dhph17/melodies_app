import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TextInput,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { height, width } = Dimensions.get('window');

const IndexPage = () => {
  const [roomID, setRoomID] = useState('');

  const handleCreateRoom = () => {
    // Logic to create a new room
    console.log('Creating a new room...');
  };

  const handleJoinRoom = () => {
    // Logic to join an existing room with roomID
    console.log(`Joining room with ID: ${roomID}`);
  };

  return (
    <View style={styles.container}>
      {/* Hero Image */}
      <ImageBackground
        source={{ uri: 'https://scontent.fdad3-6.fna.fbcdn.net/v/t1.15752-9/462651875_1306307443889847_132287542623198125_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=9f807c&_nc_ohc=cfm87RhT0H8Q7kNvgEPnIVG&_nc_zt=23&_nc_ht=scontent.fdad3-6.fna&oh=03_Q7cD1gGi1O9lobeowpl1iuur5Q49VEW3PjhIVlOU7hzwwtFK5Q&oe=678B3BF1' }} // replace with your image URL
        style={styles.heroImage}
        imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
      >
        <View style={styles.overlay}>
          <Text style={styles.heroText}>Welcome to Listen Together</Text>
        </View>
      </ImageBackground>

      {/* Create Room Button */}
      <TouchableOpacity style={styles.createButton} onPress={handleCreateRoom}>
        <FontAwesome name="plus" size={20} color="#FFFFFF" />
        <Text style={styles.buttonText}>Create Room</Text>
      </TouchableOpacity>

      {/* Join Room Section */}
      <View style={styles.joinRoomContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Room ID"
          placeholderTextColor="#B0B0B0"
          value={roomID}
          onChangeText={setRoomID}
        />
        <TouchableOpacity style={styles.joinButton} onPress={handleJoinRoom}>
          <FontAwesome name="sign-in" size={20} color="#FFFFFF" />
          <Text style={styles.buttonText}>Join Room</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#121212',
  },
  heroImage: {
    width: '100%',
    height: height * 0.3,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    padding: 20,
    alignItems: 'center',
  },
  heroText: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  createButton: {
    backgroundColor: '#FF0099',
    width: '80%',
    paddingVertical: 15,
    marginTop: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinRoomContainer: {
    width: '80%',
    marginTop: 30,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#1E1E1E',
    color: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  joinButton: {
    backgroundColor: '#008CBA',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default IndexPage;
