import { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { firebaseDB } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import ItemContainer from '../components/ItemContainer';

const CategoryScreen = ({ route }) => {
  const { category } = route.params;
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemCollectionRef = collection(firebaseDB, 'items');

  useEffect(() => {
    const q = query(
      itemCollectionRef,
      where('category', '==', category.toLowerCase())
    );

    const getCategoryItems = () => {
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

    getCategoryItems();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size='large' color='lightblue' />
      ) : (
        <ItemContainer itemList={itemList} loading={loading} />
      )}
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
