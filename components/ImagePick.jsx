import { firebaseApp, firebaseStorage } from '../firebase';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera, CameraType } from 'expo-camera';
import { useContext } from 'react';
import { LegacyLootContext } from '../store/context/legacyLootContext';
import uuid from 'react-native-uuid';
import { getBytes, ref, uploadBytes } from 'firebase/storage';

const ImagePick = () => {
  const { image, setImage } = useContext(LegacyLootContext);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
      console.log('bild: ', result);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Select image</Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={pickImage}>
          <Text>From file</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.btn}
          onPress={() => permission.canAskAgain()}
        >
          <Text>From camera</Text>
        </TouchableOpacity> */}
      </View>
      <View style={styles.imageContainer}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
    </View>
  );
};

export default ImagePick;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    gap: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    gap: 20,
  },
  btn: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    borderWidth: 5,
    borderStyle: 'solid',
    borderColor: 'lightblue',
    alignItems: 'center',
  },
  imageContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  image: {
    height: 220,
    width: 250,
  },
});
