import { DataAlbum } from '@/types/interfaces';
import { getPoster } from '@/utils/utils';
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { usePlayback } from '@/app/provider/PlaybackContext';
import { useRouter } from "expo-router";

interface ListAlbumProps {
  maintitle?: string;
  subtitle?: string;
  data?: DataAlbum[];
}

const AlbumList: React.FC<ListAlbumProps> = ({ maintitle, subtitle, data }) => {
  const router = useRouter();
  const { setCurrentSong, setWaitingList } = usePlayback()

  return (
    <View style={styles.container} className='text-white'>
      <Text className="font-semibold text-2xl mb-5 text-white">
        {maintitle}
        <Text className="text-primaryColorPink"> {subtitle}</Text>
      </Text>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.albumId}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.itemContainer}
            // onPress={() => {
            //   if (data) {
            //     setCurrentSong(item);
            //     setWaitingList(data);
            //     router.push('/player/MainPlayer');
            //   }
            // }}
            >
              <Image
                source={getPoster(item)}
                style={styles.image}
              />
              <View>
                <Text style={styles.name} className='line-clamp-3'>
                  {item.title}
                </Text>
                <Text style={styles.artist} className='line-clamp-2'>
                  {new Date(item.releaseDate).getFullYear()}
                </Text>
              </View>
            </TouchableOpacity>
          )
        }}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate="fast"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  itemContainer: {
    borderRadius: 8,
    flexDirection: 'column',
    marginRight: 16,
    width: 100,
    backgroundColor: '#1F1F1F',
    padding: 10
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 8,
    borderRadius: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white'
  },
  artist: {
    fontSize: 11,
    color: '#666',
  },
});

export default AlbumList;
