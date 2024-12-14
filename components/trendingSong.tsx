import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { DataSong } from '@/types/interfaces';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { formatTime, getAllArtistsInfo, getPosterSong } from '@/utils/utils';
import { usePlayback } from '@/app/provider/PlaybackContext';

interface ArtistPopularSongProps {
  maintitle?: string;
  subtitle?: string;
  data?: DataSong[];
}

const ArtistPopularSong: React.FC<ArtistPopularSongProps> = ({ maintitle, subtitle, data }) => {
  const [pressedItemId, setPressedItemId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const { setCurrentSong, setWaitingList } = usePlayback()

  const renderSong = ({ item }: { item: DataSong }) => {
    const isPressed = pressedItemId === item.id;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => { setCurrentSong(item); if (data) setWaitingList(data) }}
        onPressIn={() => setPressedItemId(item.id)}
        onPressOut={() => setPressedItemId(null)}
        style={[
          styles.songContainer,
          isPressed && styles.songContainerPressed,
        ]}
      >
        <View style={styles.songHeader}>
          <Image source={getPosterSong(item?.album).image} style={styles.songImage} />
          <View style={styles.songDetails}>
            <Text style={styles.songTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <View style={styles.artistSection} >
              {getAllArtistsInfo(item?.artists).map((artist, index, array) => (
                <Text key={artist.id} style={styles.artist}>
                  {artist.name}
                  {index < array.length - 1 && <Text>, </Text>}
                </Text>
              ))}
            </View>
          </View>
        </View>
        <Text style={styles.songTime}>{formatTime(item.duration)}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text className="font-semibold text-2xl mb-5 text-white">
        {maintitle}
        <Text className="text-primaryColorPink"> {subtitle}</Text>
      </Text>
      <FlatList
        data={showAll ? data : data?.slice(0, 5)}
        renderItem={renderSong}
        keyExtractor={(item) => item.id}
      />
      {data && data.length > 5 && (
        <TouchableOpacity
          style={styles.showAllButton}
          onPress={() => setShowAll(!showAll)}
        >
          <Text style={styles.showAllText}>{showAll ? "Show Less" : "Show All"}</Text>
          <EvilIcons name={showAll ? "chevron-up" : "chevron-down"} size={20} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
  },
  popularSongsTitle: {
    color: '#ff00ff',
    fontSize: 18,
    marginBottom: 16,
  },
  songContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#262626',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6
  },
  songContainerPressed: {
    backgroundColor: '#374151',
  },
  songHeader: {
    flexDirection: 'row'
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  songDetails: {
    width: '70%',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 12
  },
  songTitle: {
    color: '#fff',
    fontWeight: 500,
    fontSize: 16,
  },
  artistSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  artist: {
    fontSize: 11,
    color: '#666',
  },
  songTime: {
    color: '#a0a0a0',
    fontSize: 12,
  },
  showAllButton: {
    width: '30%',
    flexDirection: 'row',
    gap: 2,
    marginTop: 16,
    justifyContent: 'center',
    paddingVertical: 10,
    marginHorizontal: 'auto',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#EE10B0',
  },
  showAllText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 500
  },
});

export default ArtistPopularSong;
