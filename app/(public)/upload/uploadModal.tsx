import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import Modal from "react-native-modal";
import { Image } from "expo-image";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const UploadModal = ({ visible, onClose, onSave }: { visible: boolean; onClose: () => void; onSave: (track: { title: string; mainArtist: string; releaseDate: string; subArtists: string; audioFile: string; lyricFile: string; imageUri: string; }) => void }) => {
  const [newTrack, setNewTrack] = useState({
    title: "",
    mainArtist: "",
    releaseDate: "",
    subArtists: "",
    audioFile: "",
    lyricFile: "",
    imageUri: "",
  });

  const handleSave = () => {
    onSave(newTrack);
    setNewTrack({
      title: "",
      mainArtist: "",
      releaseDate: "",
      subArtists: "",
      audioFile: "",
      lyricFile: "",
      imageUri: "",
    });
    onClose();
  };

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setNewTrack({ ...newTrack, imageUri: result.assets[0].uri });
    }
  };

  const handleAudioPick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "audio/*", // Specify the file type
      });
  
      if (!result.canceled && result.assets?.length > 0) {
        setNewTrack({ ...newTrack, audioFile: result.assets[0].uri }); // Access the URI from the assets
      }
    } catch (error) {
      console.error("Error picking audio file:", error);
    }
  };
  
  const handleLyricPick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "text/*", // Specify the file type
      });
  
      if (!result.canceled && result.assets?.length > 0) {
        setNewTrack({ ...newTrack, lyricFile: result.assets[0].uri }); // Access the URI from the assets
      }
    } catch (error) {
      console.error("Error picking lyric file:", error);
    }
  };
  
  const handleDateChange = (text: string) => {
    const formattedDate = text.replace(/[^0-9]/g, "").slice(0, 8);
    const parts = [
      formattedDate.slice(0, 2),
      formattedDate.slice(2, 4),
      formattedDate.slice(4, 8),
    ];
    setNewTrack({ ...newTrack, releaseDate: parts.filter(Boolean).join("/") });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior='padding'
      keyboardVerticalOffset={0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Modal
          isVisible={visible}
          onBackdropPress={onClose}
          style={styles.modal}
          animationIn="slideInUp"
          animationOut="slideOutDown"
        >
          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={onClose} style={styles.headerButton}>
                <Text style={styles.cancelButton}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Add New Track</Text>
              <TouchableOpacity onPress={handleSave} style={styles.headerButton}>
                <Text style={styles.saveButton}>Save</Text>
              </TouchableOpacity>
            </View>

            {/* Image Picker */}
            <View style={styles.imagePickerContainer}>
              <TouchableOpacity onPress={handleImagePick}>
                <View style={styles.imageWrapper}>
                  <Image
                    source={newTrack.imageUri ? { uri: newTrack.imageUri } : require("@/assets/images/placeholderUser.jpg")}
                    style={styles.image}
                  />
                  <View style={styles.editIcon}>
                    <FontAwesome name="pencil" size={16} color="#fff" />
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            {/* Input Fields */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Title</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter track title"
                placeholderTextColor="#aaa"
                value={newTrack.title}
                onChangeText={(text) => setNewTrack({ ...newTrack, title: text })}
              />

              <Text style={styles.label}>Main Artist</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter main artist"
                placeholderTextColor="#aaa"
                value={newTrack.mainArtist}
                onChangeText={(text) => setNewTrack({ ...newTrack, mainArtist: text })}
              />

              <Text style={styles.label}>Release Date</Text>
              <TextInput
                style={styles.input}
                placeholder="mm/dd/yyyy"
                placeholderTextColor="#aaa"
                value={newTrack.releaseDate}
                onChangeText={handleDateChange}
                keyboardType="numeric"
              />

              <Text style={styles.label}>Sub Artists</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter sub artists"
                placeholderTextColor="#aaa"
                value={newTrack.subArtists}
                onChangeText={(text) => setNewTrack({ ...newTrack, subArtists: text })}
              />

              <Text style={styles.label}>Audio File</Text>
              <TouchableOpacity style={styles.fileButton} onPress={handleAudioPick}>
                <Text style={styles.fileButtonText}>{newTrack.audioFile ? "Audio Selected" : "Choose Audio File"}</Text>
              </TouchableOpacity>

              <Text style={styles.label}>Lyric File</Text>
              <TouchableOpacity style={styles.fileButton} onPress={handleLyricPick}>
                <Text style={styles.fileButtonText}>{newTrack.lyricFile ? "Lyrics Selected" : "Choose Lyric File"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: "#121212",
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerButton: {
    paddingHorizontal: 10,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  cancelButton: {
    color: "#fff",
    fontSize: 16,
  },
  saveButton: {
    color: "#3b82f6",
    fontSize: 16,
  },
  imagePickerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    width: 150,
    height: 150,
    backgroundColor: "#333",
  },
  editIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#3b82f6",
    borderRadius: 12,
    padding: 5,
  },
  inputContainer: {
    borderTopWidth: 1,
    borderTopColor: "#333",
    paddingTop: 15,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#333",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 12,
  },
  fileButton: {
    backgroundColor: "#444",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 12,
  },
  fileButtonText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default UploadModal;
