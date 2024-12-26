import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, FlatList } from 'react-native';
import { fetchApiData } from '@/app/api/appService';
import { fetchApiData as fetchApiDataAI } from '@/app/api/appServiceAI';
import { Image } from 'expo-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Comment } from '@/types/interfaces';
import CommentPart from '@/components/commentPart';
import { Svg, Path } from 'react-native-svg';
import { CommentProvider } from '@/app/provider/CommentProvider';
interface CommentModalProps {
  visible: boolean;
  onClose: () => void;
  idSong: string
}

const CommentModal: React.FC<CommentModalProps> = ({ visible, onClose, idSong }) => {
  const [page, setPage] = useState(1);
  const [comment, setComment] = useState('');
  const [totalPage, setTotalPage] = useState<number>(100)
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const [replyToMessage, setReplyToMessage] = useState<string | null>(null);
  const [errorPost, setErrorPost] = useState<boolean>(false)
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    fetchComments()
  }, [idSong])

  const fetchComments = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (page <= totalPage) {
      const response = await fetchApiData(`/api/songs/comment/${idSong}`, 'GET', null, accessToken, { page: page })
      if (response.success) {
        const data = await response.data;
        setComments(prevComments => [...prevComments, ...data.comments]);
        setPage(prevPage => prevPage + 1);
        setTotalPage(data.totalPage)
      }
    }
  };

  const handleReply = (username: string, id: string, message: string) => {
    setReplyTo(username);
    setReplyToId(id);
    setReplyToMessage(message)
    inputRef.current?.focus();
  };

  const handleCommentSubmit = async () => {
    if (comment.trim() === '') return;
    setErrorPost(false)
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      const payload = {
        songId: idSong,
        ...(replyToId ? { commentParentId: replyToId } : {}),
        content: comment
      }
      const response = await fetchApiDataAI(`/actions/comment`, 'POST', JSON.stringify(payload), accessToken)
      if (response.success) {
        if (response.data.status === 'success') {
          if (replyToId) {

          } else {
            setComments(prevComments => [response.data.comment, ...prevComments]);
          }
        } else {
          setErrorPost(true)
          setTimeout(() => {
            setErrorPost(false);
          }, 5000);
        }
      } else {
        setErrorPost(true)
        setTimeout(() => {
          setErrorPost(false);
        }, 5000);
      }
      setComment('')
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Comments</Text>
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id}
            onEndReached={fetchComments}
            onEndReachedThreshold={0.5}
            renderItem={({ item }) => (
              <CommentPart item={item} onReply={handleReply} />
            )}
          />
          {
            errorPost && (
              <View style={[styles.alertContainer, styles.slideUpAnimation]}>
                <Svg
                  style={styles.icon}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <Path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </Svg>
                <View style={styles.textContainer}>
                  <Text style={styles.alertTitle}>Danger alert!</Text>
                  <Text style={styles.alertMessage}>Your comment violates community standards</Text>
                </View>
              </View>
            )
          }
          <View style={styles.inputContainer}>
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder={replyTo ? `Replying to ${replyTo}: "${replyToMessage}"` : 'Write a comment...'}
              value={comment}
              onChangeText={setComment}
            />
            <TouchableOpacity onPress={handleCommentSubmit} style={styles.submitButton}>
              <Ionicons name="send" size={16} color="white" />
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
  alertContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 2,
    backgroundColor: '#FEE2E2', // Red background
    borderRadius: 8,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 12,
    color: '#B91C1C', // Red icon color
  },
  textContainer: {
    flex: 1,
  },
  alertTitle: {
    fontWeight: '600',
    fontSize: 14,
    color: '#B91C1C',
  },
  alertMessage: {
    fontSize: 14,
    color: '#B91C1C',
  },
  slideUpAnimation: {
    transform: [{ translateY: 0 }],
    opacity: 1,
  },
});

export default CommentModal;
