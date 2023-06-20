import { doc, updateDoc } from 'firebase/firestore';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { firebaseDB } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { LegacyLootContext } from '../store/context/legacyLootContext';

const QRScreen = ({ route }) => {
  const { blob, item } = route.params;
  const navigation = useNavigation();
  const { profileRefresh, setProfileRefresh } = useContext(LegacyLootContext);

  const handleSold = async () => {
    const itemSold = doc(firebaseDB, 'items', item.id);

    const updatedItem = await updateDoc(itemSold, { sold: !item.sold });
    navigation.navigate('Profile');
    setProfileRefresh(!profileRefresh);
  };

  console.log(route.params);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>{item.price}kr</Text>
      <Image source={{ uri: blob }} style={styles.image} />

      <TouchableOpacity style={styles.btn} onPress={handleSold}>
        <Text style={styles.btnText}>
          {item.sold ? 'Unmark as sold' : 'Mark as sold'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default QRScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'start',
    backgroundColor: '#333',
    paddingVertical: 40,
  },
  image: {
    borderRadius: 10,
    height: 350,
    width: 350,
  },
  title: {
    fontSize: 40,
    marginBottom: 10,
    color: 'white',
    fontWeight: '500',
  },
  price: {
    fontSize: 60,
    marginBottom: 40,
    color: 'white',
    fontWeight: '500',
  },
  btnContainer: {},
  btn: {
    backgroundColor: '#1791AC',
    padding: 25,
    flexDirection: 'row',
    width: '85%',
    borderRadius: 10,
    marginTop: 'auto',
  },
  btnText: {
    flex: 1,
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});
