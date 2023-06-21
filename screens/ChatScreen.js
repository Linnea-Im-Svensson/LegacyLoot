import { useCallback, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useNavigation } from '@react-navigation/native';
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { firebaseAuth, firebaseDB } from '../firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ChatScreen = () => {
  const [chatrooms, setChatrooms] = useState([]);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const chatRef = collection(firebaseDB, 'chats');
    const q = query(
      chatRef,
      where('sellerId', '==', firebaseAuth.currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const getChatRooms = async () => {
      const data = await getDocs(
        query(chatRef, where('sellerId', '==', firebaseAuth.currentUser.uid)),
        orderBy('createdAt', 'desc')
      );
      setChatrooms(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const unsubscribe = onSnapshot(q, (snapshot) => {
      // console.log(snapshot);
      setChatrooms(snapshot.docs.map((doc) => doc.data()));
    });

    getChatRooms();

    return () => unsubscribe();
  }, []);

  console.log(chatrooms);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatroomContainer}>
        {chatrooms.map((room) => (
          <TouchableOpacity
            key={room.id}
            style={styles.roomContainer}
            onPress={() => navigation.navigate('Chatroom', { room })}
          >
            <Image source={{ uri: room.roomImg }} style={styles.img} />
            <Text>{room.roomName}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  chatroomContainer: {
    flex: 1,
    backgroundColor: '#cdcdcd',
    margin: 20,
    padding: 10,
    borderRadius: 10,
  },
  roomContainer: {
    borderWidth: 2,
    borderStyle: 'solid',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
    gap: 20,
  },
  img: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
});
