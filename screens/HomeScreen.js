import { View, StyleSheet, ScrollView } from 'react-native';
import ItemContainer from '../components/ItemContainer';
import CategoryContainer from '../components/CategoryContainer';
import { firebaseDB } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import ItemContainer2 from '../components/ItemContainer2';
import { useContext } from 'react';
import { LegacyLootContext } from '../store/context/legacyLootContext';

const HomeScreen = () => {
  const { getAllItems, itemList } = useContext(LegacyLootContext);

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <View style={styles.container}>
      <CategoryContainer />
      <View style={styles.allItemsContainer}>
        <ItemContainer2 itemList={itemList} />
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
