import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { firebaseAuth, firebaseDB } from '../firebase';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { LegacyLootContext } from '../store/context/legacyLootContext';
import { useNavigation } from '@react-navigation/native';

export const editItem = async (itemId, title, description, price) => {
  const itemDoc = doc(firebaseDB, 'items', itemId);
  const newInfo = {
    title,
    description,
    price,
  };
  await updateDoc(itemDoc, newInfo);
};

export const deleteItem = async (itemId) => {
  const itemDoc = doc(firebaseDB, 'items', itemId);
  await deleteDoc(itemDoc);
};

const ItemScreen = ({ route }) => {
  const { item } = route.params;
  const { userAccount } = useContext(LegacyLootContext);
  const [qr, setQr] = useState();
  const navigation = useNavigation();
  console.log('i item mdul: ', item, userAccount, 'qr: ', qr);

  useEffect(() => {
    const generateQrCode = async () => {
      try {
        const response = await fetch('https://api.swish.nu/qr/v2/prefilled', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            payee: userAccount.phoneNr,
            amount: { value: Number(item.price) },
            message: { value: item.title },
            // size: 300,
          }),
        });
        const data = await response.blob();
        const url = URL.createObjectURL(data);
        setQr(url);
      } catch (error) {
        console.log(error);
      }
    };
    generateQrCode();
  }, []);

  // navigation.navigate('QR', { blob: qr, item: item });

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
        {firebaseAuth.currentUser.uid === item.uid ? (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('QR', { blob: qr, item: item })}
          >
            <Text>Generate Swish QR code</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.btn}>
            <Text>Contact seller</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
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
    backgroundColor: '#cdcdcd',
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
