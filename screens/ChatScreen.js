import { useCallback, useLayoutEffect, useState, useContext } from 'react';
import { LegacyLootContext } from '../store/context/legacyLootContext';
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
  const [deleteBtn, setDeleteBtn] = useState({ active: false, chatId: null });
  const { chatroomRefresh } = useContext(LegacyLootContext);

  useLayoutEffect(() => {
    const chatRef = collection(firebaseDB, 'chats');
    const q = query(
      chatRef,
      where('buyerId' || 'sellerId', '==', firebaseAuth.currentUser.uid),
      orderBy('createdAt', 'desc')
    );
    console.log(firebaseAuth.currentUser.uid);

    const getChatRooms = async () => {
      const data = await getDocs(
        query(
          chatRef,
          where('buyerId' || 'sellerId', '==', firebaseAuth.currentUser.uid)
        ),
        orderBy('createdAt', 'desc')
      );
      setChatrooms(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      // if (chatrooms.length === 0) {
      //   const data = await getDocs(
      //     query(chatRef, where('sellerId', '==', firebaseAuth.currentUser.uid)),
      //     orderBy('createdAt', 'desc')
      //   );
      //   setChatrooms(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // }
    };

    const unsubscribe = onSnapshot(q, (snapshot) => {
      // console.log(snapshot);
      setChatrooms(snapshot.docs.map((doc) => doc.data()));
      // console.log('snap: ', chatrooms);
    });

    getChatRooms();

    return () => unsubscribe();
  }, [chatroomRefresh]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatroomContainer}>
        {chatrooms.map((room) => (
          <TouchableOpacity
            key={room._id}
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
    margin: 20,
    padding: 10,
    borderRadius: 10,
  },
  roomContainer: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
    gap: 20,
    marginBottom: 15,
  },
  img: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
});
