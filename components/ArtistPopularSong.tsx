import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SongImage1, SongImage2, SongImage3, ArtistImage1 } from '../assets/images';

interface SongItem {
  id: string;
  title: string;
  artist: string;
  time: string;
  image: any; 
}

const ArtistPopularSong = () => {
  const songs: SongItem[] = [
    { id: '1', title: 'Without Me', artist: 'Eminem', time: '4:50', image: SongImage1 },
    { id: '2', title: 'Mockingbird', artist: 'Eminem', time: '4:10', image: SongImage2 },
    { id: '3', title: 'The Real Slim Shady', artist: 'Eminem', time: '4:44', image: SongImage3 },
    { id: '4', title: 'Lose Yourself', artist: 'Eminem', time: '5:22', image: SongImage1 },
    { id: '5', title: 'Godzilla', artist: 'Eminem', time: '3:30', image: SongImage2 },
  ];

  const renderSong = ({ item }: { item: SongItem }) => (
    <View style={styles.songContainer}>
      <Image source={item.image} style={styles.songImage} />
      <View style={styles.songDetails}>
        <Text style={styles.songTitle}>{item.title}</Text>
        <Text style={styles.songArtist}>{item.artist}</Text>
      </View>
      <Text style={styles.songTime}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.artistHeader}>
        <Image source={ArtistImage1} style={styles.artistImage} />
        <Text style={styles.artistName}>Eminem</Text>
      </View>
      
      <Text style={styles.popularSongsTitle}>Popular Songs</Text>
      <FlatList
        data={songs}
        renderItem={renderSong}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.showAllButton}>
        <Text style={styles.showAllText}>Show All</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#1c1c1c',
    borderRadius: 8,
  },
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
  popularSongsTitle: {
    color: '#ff00ff',
    fontSize: 18,
    marginBottom: 16,
  },
  songContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  songDetails: {
    flex: 1,
    marginLeft: 12,
  },
  songTitle: {
    color: '#fff',
    fontSize: 16,
  },
  songArtist: {
    color: '#a0a0a0',
    fontSize: 14,
  },
  songTime: {
    color: '#a0a0a0',
    fontSize: 14,
  },
  showAllButton: {
    marginTop: 16,
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ff00ff',
  },
  showAllText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ArtistPopularSong;
