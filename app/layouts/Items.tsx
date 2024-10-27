import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';

const Items = ({ title, data }) => {
  // Utility function to truncate text
  const truncateText = (text) => {
    if (text.length > 10) {
      return text.slice(0, 10) + '...'; // Truncate and add ellipsis
    }
    return text;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={item.image} style={styles.image} />
            <View>
              <Text style={styles.name}>{truncateText(item.name)}</Text>
              {item.subtitle && <Text style={styles.subtitle}>{truncateText(item.subtitle)}</Text>}
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
    width: 100, // Adjust this value for item width
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 8,
    borderRadius: 8,
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

export default Items;
