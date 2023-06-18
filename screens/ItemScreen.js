import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

const ItemScreen = ({ route }) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          source={require('../assets/shoes.jpg')}
          defaultSource={require('../assets/logo.png')}
          style={styles.img}
          resizeMode='cover'
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.price}kr</Text>
        <Text>{item.description}</Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn}>
          <Text>Contact seller</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text>Contact seller</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgContainer: {
    flex: 3,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flex: 3,
    padding: 15,
  },
  title: {
    fontSize: 30,
  },
  btnContainer: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  btn: {
    flex: 1,
    backgroundColor: 'lightblue',
    borderRadius: 10,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
