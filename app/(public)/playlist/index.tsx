import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect, useRouter, useSegments } from 'expo-router';
import UserImage from '@/assets/images/placeholderUser.jpg'
import PlaylistImage from '@/assets/images/placeholderPlaylist.png'
import { fetchApiData } from '@/app/api/appService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataPlaylist, User } from '@/types/interfaces';
import { usePlayback } from '@/app/provider/PlaybackContext';
import LoginModal from '@/app/authenticate/loginModal';

const Playlist = () => {
  const router = useRouter();
  const segments = useSegments();
  const { currentTrack } = usePlayback()
  const [user, setUser] = useState<User | null>(null);
  const [playlistPrivate, setPlaylistPrivate] = useState<DataPlaylist[]>()
  const [playlistPublic, setPlaylistPublic] = useState<DataPlaylist[]>()
  const [isPrivatePage, setIsPrivatePage] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
          setIsPrivatePage(false);

          const userResult = await fetchApiData(`/api/user`, "GET", null, accessToken);
          if (userResult.success) {
            setUser(userResult.data.user);
          } else {
            console.error("Get user error:", userResult.error);
          }

          const playlistResult = await fetchApiData(
            "/api/user/playlist",
            "GET",
            null,
            accessToken,
            { page: 1 }
          );
          if (playlistResult.success) {
            const privatePlaylists = playlistResult.data.playlists.filter(
              (playlist: DataPlaylist) => playlist.privacy
            );
            setPlaylistPrivate(privatePlaylists);
            const publicPlaylists = playlistResult.data.playlists.filter(
              (playlist: DataPlaylist) => !playlist.privacy
            );
            setPlaylistPublic(publicPlaylists);
          }
        }
      };

      fetchData();
    }, [segments])
  );

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
        setPlaylistPublic(prevList => [result.data?.newPlaylist, ...(prevList || [])])
        router.push(`/playlist/${result.data.newPlaylist.playlistId}`)
      } else {

      }
    }
  }

  const handlePlaylistClick = (id: string) => {
    router.push(`/playlist/${id}`);
  };

  const renderItem = ({ item }: { item: DataPlaylist }) => (
    <TouchableOpacity style={styles.item} onPress={() => handlePlaylistClick(item.playlistId)} key={item.playlistId}>
      <Image
        source={item?.image ? { uri: item.image } : PlaylistImage}
        style={styles.icon} />
      <View>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderContent = React.useMemo(
    () => (
      <View
        style={[
          { paddingBottom: currentTrack ? 150 : 70 },
        ]}
        className="flex flex-col gap-4 bg-primaryColorBg"
      >
        <Text className='text-white text-[1.2rem] font-semibold'>My private list</Text>
        {
          playlistPrivate?.map((playlist: DataPlaylist) => (
            renderItem({ item: playlist })
          ))
        }
        <Text className='text-white text-[1.2rem] font-semibold'>My playlist</Text>
        {
          playlistPublic && playlistPublic?.map((playlist: DataPlaylist) => (
            renderItem({ item: playlist })
          ))
        }
      </View >
    ),
    [playlistPrivate, playlistPublic]
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

      {/* Playlist */}
      <FlatList
        data={[]}
        renderItem={null}
        ListHeaderComponent={renderContent}
      />
      {isPrivatePage && <LoginModal isVisible={isPrivatePage} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 8 },
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
  item: {
    backgroundColor: '#1F1F1F',
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
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
