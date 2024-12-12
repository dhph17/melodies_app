import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { FontAwesome } from "@expo/vector-icons";
import { usePlayback } from "@/app/provider/PlaybackContext";
import UploadModal from "./uploadModal";

const ViewSongs = () => {
  const [songsOfPlaylist, setSongOfPlaylist] = useState<any[]>([]); // Using 'any' for mock data
  const [isModalVisible, setModalVisible] = useState(false);
  const { setCurrentSong, setWaitingList, currentTrack } = usePlayback()

  useEffect(() => {
    const fetchSongs = async () => {
      const fetchedSongs = [
        {
          id: "1",
          title: "Song 1",
          artists: [{ name: "Artist 1" }],
          album: [{ image: "https://placehold.co/50x50" }], // Array of albums
        },
        {
          id: "2",
          title: "Song 2",
          artists: [{ name: "Artist 2" }],
          album: [{ image: "https://placehold.co/50x50" }], // Array of albums
        },
        {
          id: "3",
          title: "Song 1",
          artists: [{ name: "Artist 1" }],
          album: [{ image: "https://placehold.co/50x50" }], // Array of albums
        },
        {
          id: "4",
          title: "Song 2",
          artists: [{ name: "Artist 2" }],
          album: [{ image: "https://placehold.co/50x50" }], // Array of albums
        },
        {
            id: "5",
            title: "Song 1",
            artists: [{ name: "Artist 1" }],
            album: [{ image: "https://placehold.co/50x50" }], // Array of albums
        },
      ];
      setSongOfPlaylist(fetchedSongs);
    };
    fetchSongs();
  }, []);

  const handleSongPress = (item: any) => {
    console.log("Song Pressed");
  };

  const handleAddTrack = () => {
    setModalVisible(true); // Open the modal
  };

  const handleSaveTrack = (newTrack: any) => {
    setSongOfPlaylist((prevSongs) => [
      ...prevSongs,
      {
        id: (prevSongs.length + 1).toString(),
        title: newTrack.title,
        artists: [{ name: newTrack.mainArtist }],
        album: [{ image: "https://placehold.co/50x50" }], // Mock image
      },
    ]);
    console.log("New track added:", newTrack);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload</Text>
      <TouchableOpacity style={styles.addButton} onPress={handleAddTrack}>
        <Text style={styles.addButtonText}>
          <FontAwesome name="plus" size={16} color="white" /> Add New Track
        </Text>
      </TouchableOpacity>
      <FlatList
        data={songsOfPlaylist}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: currentTrack ? 150 : 80 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.songItem}
            onPress={handleSongPress}
          >
            <Image
              source={{ uri: item.album[0]?.image || "https://placehold.co/50x50" }} // Access image from album array
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
      />

      <UploadModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)} // Close the modal
        onSave={handleSaveTrack} // Save the track
      />
    </View>
  );
};

export default ViewSongs;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "#121212",
    flex: 1,
  },
  songItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#fff",
  },
  addButton: {
    alignSelf: "flex-end",
    backgroundColor: "#FF00FF",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
});
