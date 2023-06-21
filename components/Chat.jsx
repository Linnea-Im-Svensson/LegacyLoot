import { useCallback, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { useNavigation } from '@react-navigation/native';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { firebaseAuth, firebaseDB } from '../firebase';

const Chat = () => {
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    const chatRef = collection(firebaseDB, 'chats');
    const q = query(chatRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      // console.log(snapshot);
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });

    return () => unsubscribe();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, messages));
    const chatRef = collection(firebaseDB, 'chats');

    const { _id, createdAt, text, user } = messages[0];
    console.log('mess: ', messages);
    addDoc(chatRef, {
      _id,
      createdAt,
      text,
      user,
    });
  });
  // const onSend = useCallback((messages = []) => {
  //   setMessages((prevMessages) => GiftedChat.append(prevMessages, messages));
  //   const chatRef = collection(firebaseDB, 'chats');

  //   const { _id, createdAt, text, user } = messages[0];
  //   console.log('mess: ', messages);
  //   addDoc(chatRef, {
  //     _id,
  //     createdAt,
  //     text,
  //     user,
  //   });
  // });

  const customToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: 'lightblue',
          color: 'black',
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: firebaseAuth?.currentUser?.uid,
          avatar: null,
        }}
        messagesContainerStyle={{ backgroundColor: '#333' }}
        renderInputToolbar={(props) => customToolbar(props)}
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
