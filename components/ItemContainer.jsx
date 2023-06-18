import { StyleSheet, FlatList } from 'react-native';
import Item from './Item';
import SkeletonItem from './SkeletonItem';
import { useNavigation } from '@react-navigation/native';

const ItemContainer = ({ itemList, loading }) => {
  const navigation = useNavigation();
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
      style={styles.ItemContainer}
      initialNumToRender={6}
    />
  );
};

export default ItemContainer;

const styles = StyleSheet.create({
  ItemContainer: {
    backgroundColor: '#333',
    flex: 1,
    paddingVertical: 20,
  },
});
