import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import SongPlaceholder from '@/assets/images/placeholderSong.jpg';
import { FontAwesome } from "@expo/vector-icons";
import { Image } from 'expo-image';
import { DataSong } from '@/types/interfaces';
import { fetchApiData } from '@/app/api/appService';
import { getMainArtistName, getPosterSong } from '@/utils/utils';
import { usePlayback } from '@/app/provider/PlaybackContext';
import ArtistPopularSong from '@/components/trendingSong';
import PopularArtists from '@/components/popularArtists';
import AlbumList from '@/components/listAlbum';

// Define types for search items (songs and artists)
interface Song {
  type: 'song';
  title: string;
  artist: string;
}

interface Artist {
  type: 'artist';
  name: string;
}

type SearchItem = Song | Artist;

const SearchIndex = () => {
  const { currentTrack, setCurrentSong } = usePlayback();
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchContent, setSearchContent] = useState<string>('')
  const [artists, setArtists] = useState([])
  const [songs, setSongs] = useState([])
  const [albums, setAlbums] = useState([])
  const [filter, setFilter] = useState<string>('All')

  const artistsPlacholder = [
    { id: '96fd5bb9-09b4-47ff-8444-e1118ea0cada', name: 'Sơn Tùng', color: '#e5bb82', icon: 'music', image: 'https://i.scdn.co/image/ab676161000051745a79a6ca8c60e4ec1440be53' },
    { id: '70932cc6-ba4c-4751-ad52-6c6ae5450909', name: 'Hoàng Dũng', color: '#f6a49e', icon: 'music', image: 'https://i.scdn.co/image/ab67616100005174d1f2d75c4da62e87d1ede357' },
  ];

  const albumsPlaceholder = [
    { id: 'a739eb22-cfc1-46e4-9656-5a22dcc29825', name: 'Sky Tour', color: '#262626', icon: 'music', image: 'https://i.scdn.co/image/ab67616d00001e028a0966b80365345d1a56a20a' },
    { id: '9c24dc55-0ce9-4b6e-b8c6-c42bf77daefc', name: 'Yên', color: '#A52A2A', icon: 'music', image: 'https://i.scdn.co/image/ab67616d00001e023cccba62ac2bad8c10e4ec88' },
  ];

  const singlePlaceholder = [
    { id: '335ce31d-5e74-4bc6-80ce-e6293713b1fa', name: 'Đừng làm trái tim anh đau', color: '#6C8485', icon: 'music', image: 'https://i.scdn.co/image/ab67616d00001e02a1bc26cdd8eecd89da3adc39' },
    { id: '8134acb9-5c00-4cd3-a4ab-e76c0c78781b', name: 'Nàng thơ', color: '#ffb2da', icon: 'music', image: 'https://i.scdn.co/image/ab67616d00001e025a6bc1ecf16bbac5734f23da' },
  ];

  const playSong = async (id: string) => {
    const result = await fetchApiData(`/api/song/${id}`, "GET");
    if (result.success) {
      setCurrentSong(result.data.song)
    } else {

    }
  };

  const renderCard = (item: { id: string, name: string; color: string; icon: string, image: string }, type: string) => {
    return (
      <TouchableOpacity
        style={[styles.card, { backgroundColor: item.color }]}
        onPress={() => {
          type !== 'song' ? (
            router.push(`/(public)/${type}/${item.id}`)
          ) : (
            playSong(item.id)
          )
        }}
      >
        <Text style={styles.cardText}>{item.name}</Text>
        <Image
          source={item.image}
          style={styles.cardImage}
        />
        <Icon name={item.icon} size={24} color="#fff" style={styles.cardIcon} />
      </TouchableOpacity>
    )
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(searchContent);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchContent]);

  useEffect(() => {
    if (searchQuery) {
      const fetchData = async () => {
        const result = await fetchApiData(`/api/songs/search`, "GET", null, null, { query: searchQuery });
        if (result.success) {
          setArtists(result.data.artistData)
          setSongs(result.data.songData)
          setAlbums(result.data.albumData)
        } else {
          console.error("Fetch search error:", result.error);
        }
      };
      fetchData();
    }
  }, [searchQuery])
  const renderSongItem = (item: DataSong) => {
    return (
      <TouchableOpacity key={item.id} style={styles.songItem}>
        <Image source={{ uri: getPosterSong(item.album).image ? getPosterSong(item.album).image : SongPlaceholder }} style={styles.songImage} />
        <View style={styles.songInfo}>
          <Text style={styles.songTitle}>{item.title}</Text>
          <Text style={styles.songArtist}>{getMainArtistName(item.artists)}</Text>
        </View>
        <TouchableOpacity>
          <FontAwesome name="ellipsis-v" size={20} color="white" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const renderTopResult = React.useMemo(() => {
    let content;

    switch (filter) {
      case 'All':
        content = (
          <>
            <View>
              <ArtistPopularSong maintitle="Top Songs" data={songs} />
            </View>
            <View className="mt-4">
              <PopularArtists maintitle="Top Artists" data={artists} />
            </View>
            <View className="mt-4">
              <AlbumList maintitle="Top Albums" data={albums} />
            </View>
          </>
        );
        break;
      case 'Songs':
        content = (
          <View>
            <ArtistPopularSong maintitle="Top Songs" data={songs} />
          </View>
        );
        break;
      case 'Artists':
        content = (
          <View>
            <PopularArtists maintitle="Top Artists" data={artists} />
          </View>
        );
        break;
      case 'Albums':
        content = (
          <View>
            <AlbumList maintitle="Top Albums" data={albums} />
          </View>
        );
        break;
      default:
        content = <Text>No Data Found</Text>;
        break;
    }

    return (
      <View
        style={[
          { paddingBottom: currentTrack ? 150 : 70 },
        ]}
        className="flex flex-col gap-4 bg-primaryColorBg"
      >
        {content}
      </View>
    );
  }, [filter, songs, artists, albums, currentTrack]);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          placeholder="Artists, songs, or podcasts"
          placeholderTextColor="#888"
          style={styles.searchInput}
          value={searchContent}
          onChangeText={(e) => setSearchContent(e)}
        />
      </View>

      {searchQuery.trim() ? (
        <>
          <View style={styles.filterContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
              {['All', 'Songs', 'Artists', 'Albums'].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[styles.filterButton, filter === type && styles.activeFilter]}
                  onPress={() => setFilter(type)}
                >
                  <Text style={[styles.filterText, filter === type && styles.activeFilterText]}>{type}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <FlatList
            data={[]}
            renderItem={null}
            ListHeaderComponent={renderTopResult}
          />
        </>
      ) : (
        <View>
          <Text style={styles.sectionTitle} className='mt-2'>Top Songs</Text>
          <View style={styles.row}>
            {singlePlaceholder.map((item) => (
              <View style={styles.cardContainer} key={item.name}>
                {renderCard(item, 'song')}
              </View>
            ))}
          </View>
          <Text style={styles.sectionTitle} className='mt-2'>Top Singers:</Text>
          <View style={styles.row}>
            {artistsPlacholder.map((genre) => (
              <View style={styles.cardContainer} key={genre.name}>
                {renderCard(genre, 'artist')}
              </View>
            ))}
          </View>
          <Text style={styles.sectionTitle} className='mt-2'>Top Albums:</Text>
          <View style={styles.row}>
            {albumsPlaceholder.map((genre) => (
              <View style={styles.cardContainer} key={genre.name}>
                {renderCard(genre, 'album')}
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#121212',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  songItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
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
    fontWeight: "bold",
    color: "white",
  },
  songArtist: {
    fontSize: 14,
    color: "#aaa",
  },
  cardContainer: {
    width: '48%',
    marginBottom: 15,
  },
  card: {
    borderRadius: 8,
    padding: 10,
    paddingBottom: 40,
    overflow: 'hidden',
    height: 120,
    position: 'relative',
  },
  cardText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardImage: {
    position: 'absolute',
    top: '50%',
    right: 12,
    width: 80,
    height: 80,
    resizeMode: 'cover',
    transform: [{ rotate: '10deg' }, { translateY: 5 }, { translateX: 20 }],
    borderRadius: 10,
  },
  cardIcon: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    // color: 'black'
  },
  filterContainer: {
    height: 40,
    marginBottom: 25,
  },
  filters: {
    flexDirection: 'row',
  },
  filterButton: {
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeFilter: { backgroundColor: '#EE10B0' },
  filterText: { color: '#fff', fontSize: 14 },
  activeFilterText: { color: '#fff', fontWeight: 'bold' },
});

export default SearchIndex;
