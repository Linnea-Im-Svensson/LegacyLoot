import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet,
  FlatList,
} from 'react-native';
import Item from './Item';
import { useCallback, useState, useContext, useEffect } from 'react';
import { LegacyLootContext } from '../store/context/legacyLootContext';
import SkeletonItem from './SkeletonItem';
import { useNavigation } from '@react-navigation/native';

const ItemContainer2 = ({ itemList, typeOfItem }) => {
  const [refresh, setRefresh] = useState(false);
  const { getAllItems, loading, setLoading, getProfileItems } =
    useContext(LegacyLootContext);
  const navigation = useNavigation();

  const onRefresh = useCallback(() => {
    setRefresh(true);
    if (typeOfItem === 'profile') {
      getProfileItems();
    } else {
      getAllItems();
    }
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  }, []);

  return (
    <FlatList
      data={itemList}
      renderItem={({ item }) =>
        loading ? (
          <SkeletonItem />
        ) : (
          <Item
            item={item}
            callback={() => navigation.navigate('Item', { item: item })}
          />
        )
      }
      keyExtractor={(item) => item.id}
      numColumns={2}
      style={styles.container}
      initialNumToRender={6}
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={onRefresh}
          tintColor='white'
        />
      }
    />
  );
};

export default ItemContainer2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
});
