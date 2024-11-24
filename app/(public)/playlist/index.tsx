import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';

type PlaylistItem = {
  id: string;
  title: string;
  type: string;
  subtitle: string;
  icon: string;
};

const Playlist = () => {
  const [playlistData, setPlaylistData] = useState<PlaylistItem[]>([]);
  const [filteredData, setFilteredData] = useState<PlaylistItem[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'az' | 'recent'>('recent');

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data: PlaylistItem[] = [
        { id: '1', title: 'Liked Songs', type: 'Playlist', subtitle: '58 songs', icon: 'https://via.placeholder.com/50/8A2BE2/FFFFFF?text=♥' },
        { id: '2', title: 'New Episodes', type: 'Podcast', subtitle: 'Updated 2 days ago', icon: 'https://via.placeholder.com/50/32CD32/FFFFFF?text=🔔' },
        { id: '3', title: 'Lolo Zouaï', type: 'Artist', subtitle: '', icon: 'https://via.placeholder.com/50/FFD700/FFFFFF?text=LZ' },
        { id: '4', title: 'Lana Del Rey', type: 'Artist', subtitle: '', icon: 'https://via.placeholder.com/50/FF69B4/FFFFFF?text=LDR' },
        { id: '5', title: 'Front Left', type: 'Playlist', subtitle: 'Spotify', icon: 'https://via.placeholder.com/50/4682B4/FFFFFF?text=FL' },
      ];
      setPlaylistData(data);
      setFilteredData(data);
    };

    fetchData();
  }, []);

  const applyFilter = (filterType: string) => {
    setFilter(filterType);
    if (filterType === 'All') {
      setFilteredData(playlistData);
    } else {
      const filtered = playlistData.filter((item) => item.type === filterType);
      setFilteredData(filtered);
    }
  };

  const applySorting = (order: 'az' | 'recent') => {
    setSortOrder(order);
    const sorted = [...filteredData].sort((a, b) => {
      if (order === 'az') {
        return a.title.localeCompare(b.title);
      } else {
        return playlistData.indexOf(a) - playlistData.indexOf(b);
      }
    });
    setFilteredData(sorted);
  };

  const handlePlaylistClick = () => {
    router.push('./playlist/ViewPlaylist');
  };

  const renderItem = ({ item }: { item: PlaylistItem }) => (
    <TouchableOpacity style={styles.item} onPress={() => handlePlaylistClick(item)}>
      <Image source={{ uri: item.icon }} style={styles.icon} />
      <View>
        <Text style={styles.title}>{item.title}</Text>
        {item.subtitle ? <Text style={styles.subtitle}>{item.subtitle}</Text> : null}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* Avatar */}
        <Image
          source={{ uri: 'https://via.placeholder.com/50/#EE10B0/FFFFFF?' }}
          style={styles.avatar}
        />
        {/* Title */}
        <Text style={styles.headerTitle}>Your Library</Text>
        {/* "+" Button */}
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
          {['All', 'Playlists', 'Artists', 'Albums', 'Podcasts'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.filterButton, filter === type && styles.activeFilter]}
              onPress={() => applyFilter(type)}
            >
              <Text style={[styles.filterText, filter === type && styles.activeFilterText]}>{type}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Playlist */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 30 },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
  },
  headerTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  filterContainer: {
    height: 50,
    marginBottom: 25,
  },
  filters: {
    flexDirection: 'row',
  },
  filterButton: {
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeFilter: { backgroundColor: '#EE10B0' },
  filterText: { color: '#fff', fontSize: 14 },
  activeFilterText: { color: '#fff', fontWeight: 'bold' },
  list: { paddingBottom: 100 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  title: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  subtitle: { color: '#aaa', fontSize: 14 },
});

export default Playlist;
