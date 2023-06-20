import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import ImagePick, { uploadImage } from './ImagePick';
import { firebaseDB, firebaseStorage } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { LegacyLootContext } from '../store/context/legacyLootContext';
import { useContext } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import uuid from 'react-native-uuid';

const itemCollectionRef = collection(firebaseDB, 'items');

const LootModule = () => {
  const { loggedInUser, image, setImage, profileRefresh, setProfileRefresh } =
    useContext(LegacyLootContext);

  const storageRef = ref(
    firebaseStorage,
    `images/img-82fadd6a-3c37-4ddc-b97d-c1c42c6446f8`
  );
  // getDownloadURL(storageRef).then((data) => console.log('final test: ', data));

  const [lootInfo, setLootInfo] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    sold: false,
    uid: loggedInUser.uid,
    createdAt: null,
    image: '',
  });
  const categories = [
    'shoes',
    'clothes',
    'accessories',
    'furnitures',
    'furnishing',
  ];
  const navigation = useNavigation();

  const uploadImage = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    try {
      const storageRef = ref(firebaseStorage, `images/img-${uuid.v4()}`);
      const result = await uploadBytes(storageRef, blob).then(
        (data) => (lootInfo.image = data.metadata.fullPath)
      );

      const url = await getDownloadURL(storageRef).then(
        (data) => (lootInfo.image = data)
      );

      const snapshot = await ref.put(blob);
      blob.close();
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewLoot = async () => {
    if (lootInfo.title === '') {
      alert('Please enter a title');
    } else if (lootInfo.price === '') {
      alert('Price can not be 0');
    } else if (lootInfo.category === '') {
      alert('Please choose a category');
    } else {
      await uploadImage(image);
      lootInfo.createdAt = new Date();
      const newItem = await addDoc(itemCollectionRef, lootInfo);
      setLootInfo({
        title: '',
        price: '',
        description: '',
        category: '',
        sold: false,
        uid: loggedInUser.uid,
        createdAt: null,
        image: '',
      });
      setImage(null);
      setProfileRefresh(!profileRefresh);
      navigation.navigate('Profile');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Title'
          placeholderTextColor='#333'
          style={styles.input}
          value={lootInfo.title}
          inputMode='text'
          onChangeText={(text) => setLootInfo({ ...lootInfo, title: text })}
        />
        <TextInput
          placeholder='Price'
          placeholderTextColor='#333'
          style={styles.input}
          value={lootInfo.price}
          inputMode='numeric'
          onChangeText={(nr) => setLootInfo({ ...lootInfo, price: nr })}
        />
        <TextInput
          placeholder='Description'
          placeholderTextColor='#333'
          style={[styles.input, styles.description]}
          value={lootInfo.description}
          multiline
          numberOfLines={4}
          inputMode='text'
          onChangeText={(text) =>
            setLootInfo({ ...lootInfo, description: text })
          }
        />
        <SelectDropdown
          data={categories}
          onSelect={(selectedCategory) =>
            setLootInfo({ ...lootInfo, category: selectedCategory })
          }
          buttonStyle={styles.categoryBtn}
          dropdownStyle={styles.categoryDropdown}
          selectedRowStyle={styles.categorySelectedRow}
          defaultButtonText='Choose a category'
        />
        <ImagePick />
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.createBtn} onPress={handleNewLoot}>
          <Text>Create loot</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LootModule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#333',
    paddingVertical: 20,
  },
  inputContainer: {
    width: '80%',
    gap: 20,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    height: 50,
    borderRadius: 10,
  },
  description: {
    height: 80,
    paddingTop: 10,
  },
  categoryBtn: {
    borderRadius: 10,
    width: '100%',
  },
  categoryDropdown: {
    borderRadius: 10,
  },
  categorySelectedRow: {
    backgroundColor: '#cdcdcd',
  },
  btnContainer: {
    width: '80%',
    marginTop: 20,
  },
  createBtn: {
    backgroundColor: 'lightblue',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});
