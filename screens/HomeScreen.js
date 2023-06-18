import { View, StyleSheet } from 'react-native';
import ItemContainer from '../components/ItemContainer';
import CategoryContainer from '../components/CategoryContainer';
import { firebaseDB } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';

const HomeScreen = ({ navigation }) => {
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(false);

  const itemCollectionRef = collection(firebaseDB, 'items');

  useEffect(() => {
    const getAllItems = async () => {
      setLoading(true);
      try {
        const data = await getDocs(itemCollectionRef);
        setItemList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getAllItems();
  }, []);

  return (
    <View style={styles.container}>
      <CategoryContainer />
      <View style={styles.allItemsContainer}>
        <ItemContainer itemList={itemList} loading={loading} />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  allItemsContainer: {
    flex: 5,
  },
});
