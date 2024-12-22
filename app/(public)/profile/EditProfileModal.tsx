import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import UserImage from '@/assets/images/placeholderUser.jpg'

interface EditProfileModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (newName: string, newAvatar: string) => void;
  currentName: string;
  currentAvatar: string;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isVisible, onClose, onSave, currentName, currentAvatar }) => {
  const [newName, setNewName] = useState(currentName);
  const [newAvatar, setNewAvatar] = useState(currentAvatar);

  const handleSaveChanges = () => {
    onSave(newName, newAvatar);
  };

  const handleEditAvatar = () => {
    setNewAvatar('https://via.placeholder.com/150'); 
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior='padding'
        keyboardVerticalOffset={0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={onClose} style={styles.headerButton}>
                <Text style={styles.cancelButton}>Hủy</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Chỉnh sửa hồ sơ</Text>
              <TouchableOpacity onPress={handleSaveChanges} style={styles.headerButton}>
                <Text style={styles.saveButton}>Lưu</Text>
              </TouchableOpacity>
            </View>

            {/* Avatar Section */}
            <View style={styles.avatarContainer}>
              <TouchableOpacity onPress={handleEditAvatar}>
                <View style={styles.avatarWrapper}>
                  <Image
                    source={newAvatar ? { uri: newAvatar } : UserImage}
                    style={styles.avatar}
                  />
                  <View style={styles.editIcon}>
                    <FontAwesome name="pencil" size={16} color="#fff" />
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            {/* Name Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Tên</Text>
              <TextInput
                style={styles.input}
                placeholder="Tên người dùng"
                value={newName}
                onChangeText={setNewName}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                placeholder="John Cena"
                editable={false}
              />
            </View><View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="email@example.com"
                editable={false}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: '#121212',
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: 1200,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerButton: {
    paddingHorizontal: 10,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1, // Center the title
  },
  cancelButton: {
    color: '#fff',
    fontSize: 16,
  },
  saveButton: {
    color: '#3b82f6',
    fontSize: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#333',
  },
  editIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 5,
  },
  inputContainer: {
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 15,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
  },
});

export default EditProfileModal;