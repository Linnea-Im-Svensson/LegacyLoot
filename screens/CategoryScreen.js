import { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { firebaseDB } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import ItemContainer from '../components/ItemContainer';
import ItemContainer2 from '../components/ItemContainer2';

const CategoryScreen = ({ route }) => {
  const { category } = route.params;
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemCollectionRef = collection(firebaseDB, 'items');

  useEffect(() => {
    const getCategoryItems = async () => {
      try {
        const data = await getDocs(
          query(
            itemCollectionRef,
            where('category', '==', category.toLowerCase())
          )
        );
        setItemList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
        <ItemContainer2 itemList={itemList} />
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
