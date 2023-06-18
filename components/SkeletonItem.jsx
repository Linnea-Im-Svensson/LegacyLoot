import { Image, StyleSheet, Text, View } from 'react-native';

const SkeletonItem = () => {
  return (
    <View style={styles.item}>
      <Image source={require('../assets/logo.png')} style={styles.itemImg} />
      <View>
        <Text>Loading...</Text>
      </View>
    </View>
  );
};

export default SkeletonItem;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#cdcdcd',
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
  },
});
