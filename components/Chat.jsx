import { useCallback, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { useNavigation } from '@react-navigation/native';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { firebaseAuth, firebaseDB } from '../firebase';
import { color } from 'react-native-reanimated';

const Chat = ({ route }) => {
  const [messageList, setMessageList] = useState([]);
  const roomId = route.params.room.id;
  const room = route.params.room;
  console.log('chat room: ', room.messages);
  const [testa, setTesta] = useState(null);
  console.log('message: ', messageList);

  useLayoutEffect(() => {
    const unsubscribe = onSnapshot(doc(firebaseDB, 'chats', roomId), (doc) => {
      setMessageList(
        doc.data().messages.map((doc) => ({
          _id: doc._id,
          createdAt: doc.createdAt.toDate(),
          text: doc.text,
          user: doc.user,
        }))
      );
    });
    return () => unsubscribe();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessageList((prevMessages) => GiftedChat.append(prevMessages, messages));

    const { _id, createdAt, text, user } = messages[0];
    const update = async () => {
      const roomRef = doc(firebaseDB, 'chats', roomId);

      await updateDoc(roomRef, {
        messages: [{ _id, createdAt, text, user }, ...messageList],
      });
    };
    update();
  });

  const customToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          paddingVertical: 10,
        }}
      />
    );
  };
  const customBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#1791AC',
            marginBottom: 10,
          },
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messageList}
        onSend={(messages) => (
          onSend(messages), console.log('ingoing: ', messages)
        )}
        user={{
          _id: firebaseAuth?.currentUser?.uid,
          avatar: null,
        }}
        messagesContainerStyle={{
          backgroundColor: '#333',
          padding: 10,
          paddingBottom: 30,
        }}
        renderInputToolbar={(props) => customToolbar(props)}
        renderBubble={(props) => customBubble(props)}
        textInputProps={{ color: 'reds' }}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
