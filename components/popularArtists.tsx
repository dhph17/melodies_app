import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';

interface ArtistItemProps {
  maintitle?: string;
  subtitle?: string;
  data: Array<{ id: string; image: any; name: string; subtitle?: string }>;
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
            <Image source={item.image} style={styles.image} />
            <View>
              <Text style={styles.name}>{item.name}</Text>
              {item.subtitle && <Text style={styles.subtitle}>{item.subtitle}</Text>}
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
