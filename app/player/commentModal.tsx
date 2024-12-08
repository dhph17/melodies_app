// CommentModal.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface CommentModalProps {
  visible: boolean;
  onClose: () => void;
}

const CommentModal: React.FC<CommentModalProps> = ({ visible, onClose }) => {
  const [comment, setComment] = useState('');
  const [reply, setReply] = useState('');

  const handleCommentSubmit = () => {
    console.log('Comment Submitted:', comment);
    setComment('');
  };

  const handleReplySubmit = () => {
    console.log('Reply Submitted:', reply);
    setReply('');
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Leave a Comment</Text>
          <TextInput
            style={styles.input}
            placeholder="Write a comment..."
            value={comment}
            onChangeText={setComment}
          />
          <TouchableOpacity onPress={handleCommentSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit Comment</Text>
          </TouchableOpacity>

          <View style={styles.commentContainer}>
            <Text style={styles.commentText}>This is a comment.</Text>
            <View style={styles.commentActions}>
              <TouchableOpacity onPress={() => setReply('')}>
                <Text style={styles.replyText}>Reply</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('Report')}>
                <FontAwesome name="flag" size={16} color="red" />
              </TouchableOpacity>
            </View>

            {reply ? (
              <View style={styles.replyContainer}>
                <TextInput
                  style={styles.replyInput}
                  placeholder="Write a reply..."
                  value={reply}
                  onChangeText={setReply}
                />
                <TouchableOpacity onPress={handleReplySubmit} style={styles.submitButton}>
                  <Text style={styles.submitButtonText}>Submit Reply</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#FF0099',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  commentContainer: {
    marginTop: 20,
  },
  commentText: {
    fontSize: 16,
    marginBottom: 5,
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyText: {
    color: '#FF0099',
    marginRight: 10,
  },
  replyContainer: {
    marginTop: 10,
  },
  replyInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default CommentModal;
