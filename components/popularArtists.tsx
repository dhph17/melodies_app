import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Artist } from '@/types/interfaces';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { usePlayback } from '@/app/provider/PlaybackContext';

interface ArtistItemProps {
  maintitle?: string;
  subtitle?: string;
  data?: Artist[];
}

const PopularArtists: React.FC<ArtistItemProps> = ({ maintitle, subtitle, data }) => {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <Text className="font-semibold text-2xl mb-5 text-white">
        {maintitle}
        <Text className="text-primaryColorPink"> {subtitle}</Text>
      </Text>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => router.push(`/(public)/artist/${item.id}`)}
          >
            <Image source={item.avatar} style={styles.image} />
            <View>
              <Text style={styles.name} className='line-clamp-2'>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate="fast"
      />
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    color: 'white'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 8,
    width: 110,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 8,
    borderRadius: 50,
  },
  name: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default PopularArtists;
