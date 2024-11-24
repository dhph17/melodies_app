import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; 
import { FontAwesome } from "@expo/vector-icons";

const playlistData = [
  { id: "1", title: "Easy", artist: "Troye Sivan" },
  { id: "2", title: "chance with you", artist: "mehro" },
];

const ViewPlaylist = () => {
  return (
    <View style={styles.container}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={["#3a3a3a", "#121212"]} // Gradient colors
        style={styles.headerContainer}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome name="chevron-left" size={24} color="white" />
          </TouchableOpacity>
          <TextInput
            style={styles.searchBar}
            placeholder="Find in playlist"
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome name="sort" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Playlist Image and Title */}
        <View style={styles.playlistInfo}>
          <Image
            source={{ uri: "https://via.placeholder.com/300" }}
            style={styles.image}
          />
          <Text style={styles.title}>Indie Pop</Text>
          <Text style={styles.description}>
            New and approved indie pop. Cover: No Rome
          </Text>
          <Text style={styles.likes}>1,629,592 likes · 6h 48m</Text>
        </View>
      </LinearGradient>

      {/* Songs List */}
      <FlatList
        data={playlistData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.songItem}
          >
            <Image
              source={{ uri: "https://via.placeholder.com/50" }}
              style={styles.songImage}
            />
            <View style={styles.songInfo}>
              <Text style={styles.songTitle}>{item.title}</Text>
              <Text style={styles.songArtist}>{item.artist}</Text>
            </View>
            <TouchableOpacity>
              <FontAwesome name="ellipsis-v" size={20} color="white" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ViewPlaylist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Base background color
  },
  headerContainer: {
    paddingBottom: 20, // Gradient area
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 20,
  },
  iconButton: {
    padding: 8,
  },
  searchBar: {
    flex: 1,
    backgroundColor: "#333",
    borderRadius: 20,
    height: 40,
    paddingHorizontal: 16,
    color: "white",
    marginHorizontal: 8,
  },
  playlistInfo: {
    alignItems: "center",
    marginVertical: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#aaa",
    textAlign: "center",
  },
  likes: {
    fontSize: 14,
    color: "#bbb",
  },
  songItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#555",
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
