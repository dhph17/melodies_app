import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

interface EditPasswordModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (currentPass: string, newPass: string) => void;
}

const EditPasswordModal: React.FC<EditPasswordModalProps> = ({ isVisible, onClose, onSave }) => {
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleSaveChanges = () => {
    if (newPass === confirmPass) {
      onSave(currentPass, newPass);
    } else {
      alert('Passwords do not match!');
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <View style={styles.modalContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.headerButton}>
            <Text style={styles.cancelButton}>Hủy</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Đổi mật khẩu</Text>
          <TouchableOpacity onPress={handleSaveChanges} style={styles.headerButton}>
            <Text style={styles.saveButton}>Lưu</Text>
          </TouchableOpacity>
        </View>

        {/* Current Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mật khẩu hiện tại</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập mật khẩu hiện tại"
            value={currentPass}
            onChangeText={setCurrentPass}
            secureTextEntry
          />
        </View>

        {/* New Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mật khẩu mới</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập mật khẩu mới"
            value={newPass}
            onChangeText={setNewPass}
            secureTextEntry
          />
        </View>

        {/* Confirm New Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Xác nhận mật khẩu mới</Text>
          <TextInput
            style={styles.input}
            placeholder="Xác nhận mật khẩu mới"
            value={confirmPass}
            onChangeText={setConfirmPass}
            secureTextEntry
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#121212',
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: 700,
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
  inputContainer: {
    marginBottom: 15,
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

export default EditPasswordModal;
