import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { firebaseDB } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { LegacyLootContext } from '../store/context/legacyLootContext';
import { useContext } from 'react';
import ItemContainer from '../components/ItemContainer';

const ProfileScreen = () => {
  const { loggedInUser } = useContext(LegacyLootContext);
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemCollectionRef = collection(firebaseDB, 'items');

  useEffect(() => {
    const q = query(itemCollectionRef, where('uid', '==', loggedInUser.uid));

    const getProfileItems = () => {
      try {
        const data = onSnapshot(q, (querySnapShot) => {
          const items = [];

          querySnapShot.forEach((doc) => items.push(doc.data()));
          setItemList(items);
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getProfileItems();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text>ProfileScreen</Text>
        <Text>{loggedInUser.uid}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.myLootText}>My loot</Text>
        {loading ? (
          <ActivityIndicator size='large' color='lightblue' />
        ) : (
          <ItemContainer itemList={itemList} loading={loading} />
        )}
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    padding: 10,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: '#333',
  },
  myLootText: {
    color: 'white',
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 10,
  },
});
