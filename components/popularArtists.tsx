import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { User } from '@/types/interfaces';
import { Image } from 'expo-image';

interface ArtistItemProps {
  maintitle?: string;
  subtitle?: string;
  data?: User[];
}

const PopularArtists: React.FC<ArtistItemProps> = ({ maintitle, subtitle, data }) => {
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
          <View style={styles.itemContainer}>
            <Image source={item.avatar} style={styles.image} />
            <View>
              <Text style={styles.name} className='line-clamp-2'>{item.name}</Text>
            </View>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate="fast"
      />
    </View>
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
    marginRight: 16,
    width: 100,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 8,
    borderRadius: 40,
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
