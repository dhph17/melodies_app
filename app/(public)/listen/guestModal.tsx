import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import { FontAwesome } from '@expo/vector-icons';
import { Image } from 'expo-image';

interface SongModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const mockSongs = [
  { id: '1', title: 'High', artist: 'Snoop Dogg', image: 'https://placehold.co/50x50' },
  { id: '2', title: 'High', artist: 'Hoàng Thùy Linh', image: 'https://placehold.co/50x50' },
  { id: '3', title: 'Hạ Phốm', artist: 'Hoàng Thùy Linh', image: 'https://placehold.co/50x50' },
];

const SongModal: React.FC<SongModalProps> = ({ isVisible, onClose }) => {
  const [searchText, setSearchText] = useState('');
  const [songs, setSongs] = useState(mockSongs);

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.trim() === '') {
      setSongs(mockSongs);
    } else {
      setSongs(
        mockSongs.filter(
          (song) =>
            song.title.toLowerCase().includes(text.toLowerCase()) ||
            song.artist.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  const handleSongAction = (id: string) => {
    console.log(`Action triggered for song with id: ${id}`);
  };

  const renderSongItem = ({ item }: { item: typeof mockSongs[0] }) => (
    <View style={styles.songItem}>
      <Image source={{ uri: item.image }} style={styles.songImage} />
      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>{item.title}</Text>
        <Text style={styles.songArtist}>{item.artist}</Text>
      </View>
      <TouchableOpacity style={styles.songAction} onPress={() => handleSongAction(item.id)}>
        <Text style={styles.actionText}>Request</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <TextInput
            style={styles.searchInput}
            placeholder="Find songs"
            placeholderTextColor="#AAA"
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>
        <Text style={styles.sectionTitle}>Waiting song for your stream room</Text>
        <FlatList
          data={songs}
          keyExtractor={(item) => item.id}
          renderItem={renderSongItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.songList}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#121212',
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: '80%',
  },
  header: {
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: 'white',
    borderWidth: 1,
    borderColor: '#333',
  },
  sectionTitle: {
    color: '#FF0099',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  songList: {
    paddingBottom: 20,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 10,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  songArtist: {
    fontSize: 14,
    color: '#AAA',
  },
  songAction: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#FF0099',
    borderRadius: 8,
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SongModal;
