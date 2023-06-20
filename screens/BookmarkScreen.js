import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import ItemContainer2 from '../components/ItemContainer2';
import { useContext } from 'react';
import { LegacyLootContext } from '../store/context/legacyLootContext';

const BookmarkScreen = () => {
  const { bookmarkItems } = useContext(LegacyLootContext);
  return (
    <View style={styles.container}>
      <ItemContainer2 itemList={bookmarkItems} />
    </View>
  );
};

export default BookmarkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
});
