import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import UserImage from '@/assets/images/placeholderUser.jpg'
import PlaylistImage from '@/assets/images/placeholderPlaylist.png'
import { fetchApiData } from '@/app/api/appService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataPlaylist, User } from '@/types/interfaces';

const Playlist = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [listPlayer, setListPlayer] = useState<DataPlaylist[]>()

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
          const result = await fetchApiData(`/api/user`, "GET", null, accessToken ?? null);
          if (result.success) {
            setUser(result.data.user);
            // console.log(result.data.user);

          } else {
            console.error("Get user error:", result.error);
          }
        }
      };

      fetchData();
    }, [])
  );

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        const result = await fetchApiData(
          "/api/user/playlist",
          "GET",
          null,
          accessToken,
          { page: 1 }
        );
        if (result.success) {
          setListPlayer(result.data.playlists)
        } else {

        }
      };
    }

    fetchData();
  }, [])


  const handleAddPlaylist = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      const result = await fetchApiData(
        "/api/user/playlist/create",
        "POST",
        null,
        accessToken
      );
      if (result.success && result.data?.newPlaylist) {
        setListPlayer(prevList => [result.data?.newPlaylist, ...(prevList || [])])
        router.push(`/playlist/${result.data.newPlaylist.playlistId}`)
      } else {

      }
    }
  }

  const handlePlaylistClick = (id: string) => {
    router.push(`/playlist/${id}`);
  };

  const renderItem = ({ item }: { item: DataPlaylist }) => (
    <TouchableOpacity style={styles.item} onPress={() => handlePlaylistClick(item.playlistId)}>
      <Image
        source={item?.image ? { uri: item.image } : PlaylistImage}
        style={styles.icon} />
      <View>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* Avatar */}
        <Image
          source={user?.image ? { uri: user.image } : UserImage}
          style={styles.avatar}
        />
        {/* Title */}
        <Text style={styles.headerTitle}>Your Playlist</Text>
        {/* "+" Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddPlaylist}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Filters */}
      {/* <View style={styles.filterContainer}>
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
      </View> */}

      {/* Playlist */}
      <FlatList
        data={listPlayer}
        keyExtractor={(item) => item.playlistId}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 14 },
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
    borderWidth: 1,
    borderColor: '#3b82f6',
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
    backgroundColor: '#1F1F1F',
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 5
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
