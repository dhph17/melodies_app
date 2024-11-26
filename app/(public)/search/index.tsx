import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import placeholderImage from '@/assets/images/lmao.png';

const SearchIndex = () => {
  const genres = [
    { name: 'Pop', color: '#9b59b6', icon: 'music' },
    { name: 'Indie', color: '#27ae60', icon: 'music' },
  ];

  const podcastCategories = [
    { name: 'News & Politics', color: '#3498db', icon: 'newspaper-o' },
    { name: 'Comedy', color: '#e74c3c', icon: 'smile-o' },
  ];

  const browseAll = [
    { name: '2021 Wrapped', color: '#aab7b8', icon: 'calendar' },
    { name: 'Podcasts', color: '#34495e', icon: 'podcast' },
  ];

  const renderCard = (item: { name: string; color: string; icon: string }) => (
    <TouchableOpacity style={[styles.card, { backgroundColor: item.color }]}>
      <Text style={styles.cardText}>{item.name}</Text>
      <Image
        source={placeholderImage}
        style={styles.cardImage}
      />
      <Icon name={item.icon} size={24} color="#fff" style={styles.cardIcon} />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          placeholder="Artists, songs, or podcasts"
          placeholderTextColor="#888"
          style={styles.searchInput}
        />
      </View>

      <Text style={styles.sectionTitle}>Your top genres</Text>
      <View style={styles.row}>
        {genres.map((genre) => (
          <View style={styles.cardContainer} key={genre.name}>
            {renderCard(genre)}
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Popular podcast categories</Text>
      <View style={styles.row}>
        {podcastCategories.map((category) => (
          <View style={styles.cardContainer} key={category.name}>
            {renderCard(category)}
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Browse all</Text>
      <View style={styles.row}>
        {browseAll.map((item) => (
          <View style={styles.cardContainer} key={item.name}>
            {renderCard(item)}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#121212',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: '48%',
    marginBottom: 15,
  },
  card: {
    borderRadius: 8,
    padding: 20,
    overflow: 'hidden',
    height: 120,
    position: 'relative',
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardImage: {
    position: 'absolute',
    top: '50%',
    right: 10,
    width: 70,
    height: 70,
    resizeMode: 'cover',
    transform: [{ rotate: '10deg' }, { translateY: 5 }, { translateX: 20 }],
    borderRadius: 10,
  },
  cardIcon: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
});

export default SearchIndex;
