import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { Image } from "expo-image";
import * as FileSystem from "expo-file-system";
import { usePlayback } from "../provider/PlaybackContext"; // Ensure the correct path to PlaybackContext
import { FontAwesome } from "@expo/vector-icons";

export interface DataSong {
  id: string;
  title: string;
  filePathAudio: string;
  isLocal?: boolean;
}

const OfflineIndex = () => {
  const [offlineSongs, setOfflineSongs] = useState<DataSong[]>([]);
  const selectedFolder = "content://com.android.externalstorage.documents/tree/primary%3ADownload%2FMusic";
  const { setCurrentSong } = usePlayback(); // Use the playback context

  useEffect(() => {
    if (selectedFolder) fetchLocalSongs(selectedFolder);
  }, [selectedFolder]);

  // Fetch audio files from the selected folder using StorageAccessFramework
  const fetchLocalSongs = async (folderUri: string) => {
    try {
      const files = await FileSystem.StorageAccessFramework.readDirectoryAsync(folderUri);
      const audioFiles = files.filter((file) => file.endsWith(".mp3") || file.endsWith(".wav"));
      const songs = audioFiles.map((file, index) => {
        const decodedPath = decodeURIComponent(file);
        const songName = decodedPath.split("/").pop()?.replace(".mp3", "").replace(".wav", "") || "Unknown";
        return {
          id: index.toString(),
          title: songName,
          filePathAudio: file,
        };
      });
      setOfflineSongs(songs);
    } catch (error) {
      Alert.alert("Error", "Unable to fetch files from the folder.");
      console.error(error);
    }
  };

  // Play selected song
  const handleSongPress = (item: DataSong) => {
    try {
      setCurrentSong({
        ...item,
        isLocal: true,
        duration: 0,
        lyric: "",
        privacy: false,
        uploadUserId: null,
        releaseDate: new Date().toISOString(),
        viewCount: null,
        createdAt: new Date().toISOString(), 
        album: [], 
        artists: [], 
        playCount: "0",
      });
      console.log(`Playing: ${item.title}`);
    } catch (error) {
      Alert.alert("Error", "Unable to play the audio file.");
      console.error(error);
    }
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
              source={{ uri: "https://placehold.co/50x50" }} // Placeholder image for offline songs
              style={styles.songImage}
            />
            <View style={styles.songInfo}>
              <Text style={styles.songTitle}>{item.title}</Text>
              <Text style={styles.songArtist}>Offline Artist</Text>
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
