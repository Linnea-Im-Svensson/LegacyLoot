import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { ref, getDownloadURL } from 'firebase/storage';
import { firebaseStorage } from '../firebase';
import { useState } from 'react';

const Item = ({ item, callback }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={callback}>
      <Image
        source={{
          uri: item.image,
        }}
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
      <View style={item.sold ? styles.itemSold : styles.itemHide}>
        <Text style={item.sold && styles.itemSoldText}>Sold</Text>
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
    position: 'relative',
  },
  itemHide: {
    display: 'none',
  },
  itemSold: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#222',
    width: '100%',
    height: '100%',
    opacity: 0.8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemSoldText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
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
