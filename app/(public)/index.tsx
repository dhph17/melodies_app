import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import {
  SongImage1,
  SongImage2,
  SongImage3,
  ArtistImage1,
  ArtistImage2,
  ArtistImage3,
  ArtistImage4,
  AlbumImage1,
  AlbumImage2,
  AlbumImage3,
} from '../../assets/images';
import ListSong from '@/components/listSong';
import PopularArtists from '@/components/popularArtists';

const HomeScreen: React.FC = () => {
  const songs = [
    { id: '1', name: 'Whatever It Takes', subtitle: 'Imagine Dragons', image: SongImage1 },
    { id: '2', name: 'Skyfall', subtitle: 'Adele', image: SongImage2 },
    { id: '3', name: 'Superman', subtitle: 'Eminem', image: SongImage3 },
  ];

  const artists = [
    { id: '1', name: 'Eminem', image: ArtistImage1 },
    { id: '2', name: 'Lana Del Rey', image: ArtistImage2 },
    { id: '3', name: 'Adele', image: ArtistImage3 },
    { id: '4', name: 'Harry Styles', image: ArtistImage4 },
  ];

  const albums = [
    { id: '1', name: 'Adele 21', subtitle: 'Adele', image: AlbumImage1 },
    { id: '2', name: 'Scorpion', subtitle: 'Drake', image: AlbumImage2 },
    { id: '3', name: 'Born To Die', subtitle: 'Lana Del Rey', image: AlbumImage3 },
    { id: '4', name: 'Adele 21', subtitle: 'Adele', image: AlbumImage1 },
    { id: '5', name: 'Scorpion', subtitle: 'Drake', image: AlbumImage2 },
    { id: '6', name: 'Born To Die', subtitle: 'Lana Del Rey', image: AlbumImage3 },
  ];

  return (
    <ScrollView style={styles.container}>
      <ListSong maintitle="Weekly Top" subtitle="Songs" data={songs} />
      <PopularArtists maintitle="Popular" subtitle="Artists" data={artists} />
      <ListSong maintitle="Top" subtitle="Albums" data={albums} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  text: {
    color: 'red',
  }
});

export default HomeScreen;
