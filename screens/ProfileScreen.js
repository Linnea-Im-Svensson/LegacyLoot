import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { firebaseDB } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { LegacyLootContext } from '../store/context/legacyLootContext';
import { useContext } from 'react';
import ItemContainer from '../components/ItemContainer';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ItemContainer2 from '../components/ItemContainer2';

const ProfileScreen = () => {
  const {
    userAccount,
    profileRefresh,
    profileItemList,
    getProfileItems,
    loading,
  } = useContext(LegacyLootContext);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfileItems();
    console.log('profile refreshed');
  }, [profileRefresh]);

  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <FontAwesome name='user' size={50} color='white' />
        <View style={styles.textContainer}>
          <View style={styles.userInfoTextContainer}>
            <FontAwesome name='phone' size={25} />
            <Text>{userAccount.phoneNr}</Text>
          </View>
          <View style={styles.userInfoTextContainer}>
            <FontAwesome name='envelope' size={25} />
            <Text>{userAccount.phoneNr}</Text>
          </View>
        </View>
      </View>
      <View style={styles.itemContainer}>
        {loading ? (
          <ActivityIndicator size='large' color='lightblue' />
        ) : (
          <ItemContainer2 itemList={profileItemList} typeOfItem={'profile'} />
        )}
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  textContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#cdcdcd',
    borderRadius: 10,
  },
  itemContainer: {
    flex: 4,
    backgroundColor: '#333',
  },
  myLootText: {
    color: 'white',
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 10,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    gap: 15,
    marginTop: 10,
  },
  userInfoTextContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
});
