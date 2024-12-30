import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface LoginModalProps {
  isVisible?: boolean;
}

const LoginModal: React.FC<LoginModalProps> = ({ isVisible = true }) => {
  const router = useRouter();
  const [open, setOpen] = useState(isVisible);

  // Reset state khi prop thay đổi
  useEffect(() => {
    setOpen(isVisible);
  }, [isVisible]);

  const handleNavigation = () => {
    setOpen(false);
    router.push('/authenticate');
  };

  return (
    <Modal
      transparent={true}
      visible={open}
      animationType="slide"
      onRequestClose={handleNavigation}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>You are not logged in</Text>
          <Text style={styles.description}>Please log in to access this feature.</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={handleNavigation}
          >
            <Text style={styles.buttonText}>Login Here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3b82f6', // Đổi màu button cho phù hợp với theme
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LoginModal;