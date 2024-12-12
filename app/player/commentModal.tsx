import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, FlatList, Image } from 'react-native';

interface Comment {
  id: string;
  user: string;
  text: string;
  avatar: string;
  time: string;
}

interface CommentModalProps {
  visible: boolean;
  onClose: () => void;
}

const CommentModal: React.FC<CommentModalProps> = ({ visible, onClose }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      user: 'someone',
      text: 'Mauris sed eget nunc lacus velit amet vel..\nMauris sed eget n',
      avatar: 'https://placehold.co/50x50',
      time: '5h',
    },
    {
      id: '2',
      user: 'someone',
      text: 'Mauris sed eget nunc lacus velit amet vel..\nMauris sed eget n',
      avatar: 'https://placehold.co/50x50',
      time: '5h',
    },
    {
      id: '3',
      user: 'someone',
      text: 'Mauris sed eget nunc lacus velit amet vel..\nMauris sed eget n',
      avatar: 'https://placehold.co/50x50',
      time: '5h',
    },
    {
      id: '4',
      user: 'someone',
      text: 'Mauris sed eget nunc lacus velit amet vel..\nMauris sed eget n',
      avatar: 'https://placehold.co/50x50',
      time: '5h',
    },
    {
      id: '5',
      user: 'someone',
      text: 'Mauris sed eget nunc lacus velit amet vel..\nMauris sed eget n',
      avatar: 'https://placehold.co/50x50',
      time: '5h',
    },
    {
      id: '6',
      user: 'someone',
      text: 'Mauris sed eget nunc lacus velit amet vel..\nMauris sed eget n',
      avatar: 'https://placehold.co/50x50',
      time: '5h',
    },
  ]);

  const handleCommentSubmit = () => {
    if (comment.trim().length === 0) return;

    const newComment: Comment = {
      id: (comments.length + 1).toString(),
      user: `User ${comments.length + 1}`,
      text: comment,
      avatar: 'https://placehold.co/50x50',
      time: 'Just now',
    };

    setComments([newComment, ...comments]);
    setComment('');
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Comments</Text>

          <FlatList
            data={comments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.commentContainer}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <View style={styles.commentContent}>
                  <Text style={styles.commentUser}>{item.user}</Text>
                  <Text style={styles.commentText}>{item.text}</Text>
                  <Text style={styles.commentTime}>{item.time}</Text>
                </View>
              </View>
            )}
          />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Write a comment..."
              value={comment}
              onChangeText={setComment}
            />
            <TouchableOpacity onPress={handleCommentSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Post</Text>
            </TouchableOpacity>
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
    width: '90%',
    maxHeight: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  commentUser: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 2,
  },
  commentText: {
    fontSize: 14,
    marginBottom: 5,
  },
  commentTime: {
    fontSize: 12,
    color: 'gray',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: '#FF0099',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
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
