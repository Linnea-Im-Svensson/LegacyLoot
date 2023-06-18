import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';

const Item = ({ item, callback }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={callback}>
      <Image
        source={require('../assets/converse.jpg')}
        placeholder={require('../assets/logo.png')}
        contentFit='cover'
        placeholderContentFit='cover'
        transition={500}
        style={styles.itemImg}
      />
      <View style={styles.textContainer}>
        <Text>{item.title}</Text>
        <Text>{item.price}kr</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Item;

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'lightgray',
    borderRadius: 10,
    margin: 10,
    flex: 1,
    alignItems: 'start',
    justifyContent: 'center',
    gap: 5,
  },
  itemImg: {
    height: 150,
    width: '100%',
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textContainer: {
    padding: 10,
  },
});
