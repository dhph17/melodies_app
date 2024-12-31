import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { FontAwesome } from "@expo/vector-icons";

const OfflineIndex = () => {
  const [offlineSongs, setOfflineSongs] = useState<any[]>([]); // Mock data for offline songs

  useEffect(() => {
    // Mock offline songs data
    const mockOfflineSongs = [
      {
        id: "1",
        title: "Offline Song 1",
        artists: [{ name: "Offline Artist 1" }],
        album: [{ image: "https://placehold.co/50x50" }],
      },
      {
        id: "2",
        title: "Offline Song 2",
        artists: [{ name: "Offline Artist 2" }],
        album: [{ image: "https://placehold.co/50x50" }],
      },
      {
        id: "3",
        title: "Offline Song 3",
        artists: [{ name: "Offline Artist 3" }],
        album: [{ image: "https://placehold.co/50x50" }],
      },
    ];
    setOfflineSongs(mockOfflineSongs);
  }, []);

  const handleSongPress = (item: any) => {
    console.log(`Playing offline song: ${item.title}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Offline Songs</Text>
      <FlatList
        data={offlineSongs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.songItem}
            onPress={() => handleSongPress(item)}
          >
            <Image
              source={{ uri: item.album[0]?.image || "https://placehold.co/50x50" }}
              style={styles.songImage}
            />
            <View style={styles.songInfo}>
              <Text style={styles.songTitle}>{item.title}</Text>
              <Text style={styles.songArtist}>
                {item.artists.map((artist: any) => artist.name).join(", ")}
              </Text>
            </View>
            <TouchableOpacity>
              <FontAwesome name="ellipsis-v" size={20} color="white" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
};

export default OfflineIndex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "white",
  },
  songItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#1E1E1E",
    borderRadius: 8,
    marginBottom: 10,
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
});
