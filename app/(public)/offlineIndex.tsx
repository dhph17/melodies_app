import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import { usePlayback } from "../provider/PlaybackContext"; // Ensure the correct path to PlaybackContext

export interface DataSong {
  id: string;
  title: string;
  filePathAudio: string;
}

const OfflineIndex = () => {
  const [offlineSongs, setOfflineSongs] = useState<DataSong[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const { setCurrentSong } = usePlayback(); // Use the playback context

  useEffect(() => {
    if (selectedFolder) fetchLocalSongs(selectedFolder);
  }, [selectedFolder]);

  // Fetch audio files from the selected folder using StorageAccessFramework
  const fetchLocalSongs = async (folderUri: string) => {
    try {
      const files = await FileSystem.StorageAccessFramework.readDirectoryAsync(folderUri);
      const audioFiles = files.filter((file) => file.endsWith(".mp3") || file.endsWith(".wav"));
      const songs = audioFiles.map((file, index) => ({
        id: index.toString(),
        title: file.split("/").pop()?.replace(".mp3", "").replace(".wav", "") || "Unknown",
        filePathAudio: file,
      }));
      setOfflineSongs(songs);
    } catch (error) {
      Alert.alert("Error", "Unable to fetch files from the folder.");
      console.error(error);
    }
  };

  // Allow user to select a folder using StorageAccessFramework
  const selectFolder = async () => {
    try {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        setSelectedFolder(permissions.directoryUri);
      } else {
        Alert.alert("Permission Denied", "You need to grant folder access to fetch songs.");
      }
    } catch (error) {
      Alert.alert("Error", "Unable to select folder.");
      console.error(error);
    }
  };

  // Play selected song
  const handleSongPress = (item: DataSong) => {
    try {
      // Extend the object with default or placeholder values
      setCurrentSong({
        ...item,
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
      <TouchableOpacity style={styles.selectFolderButton} onPress={selectFolder}>
        <Text style={styles.selectFolderText}>Select Folder</Text>
      </TouchableOpacity>
      <FlatList
        data={offlineSongs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.songItem}
            onPress={() => handleSongPress(item)}
          >
            <Text style={styles.songTitle}>{item.title}</Text>
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
  selectFolderButton: {
    backgroundColor: "#FF0099",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  selectFolderText: {
    color: "white",
    fontSize: 16,
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
  songTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});
