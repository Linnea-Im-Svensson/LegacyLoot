import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { firebaseAuth, firebaseDB } from './firebase';
import CategoryScreen from './screens/CategoryScreen';
import LootModule from './components/LootModule';
import ItemScreen, { deleteItem } from './screens/ItemScreen';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LegacyLootContext } from './store/context/legacyLootContext';
import { useContext } from 'react';
import BottomNavigator from './BottomNavigator';
import DrawerNavigator from './DrawerNavigator';
import QRScreen from './screens/QRScreen';
import { doc, query, updateDoc, where } from 'firebase/firestore';
import BookmarkScreen from './screens/BookmarkScreen';
import Chat from './components/Chat';

const InsideStack = createNativeStackNavigator();

const SignedInStack = () => {
  const navigator = useNavigation();
  const {
    loggedInUser,
    profileRefresh,
    setProfileRefresh,
    userAccount,
    getAccount,
  } = useContext(LegacyLootContext);

  const handleBookmark = async (item) => {
    const accountDoc = doc(firebaseDB, 'accounts', userAccount.id);

    if (userAccount.savedItems.filter((i) => i.id === item.id).length === 0) {
      const updatedAccount = await updateDoc(accountDoc, {
        savedItems: [...userAccount.savedItems, item],
      });
    } else {
      const updatedAccount = await updateDoc(accountDoc, {
        savedItems: userAccount.savedItems.filter((i) => i.id !== item.id),
      });
    }

    getAccount();
  };

  return (
    <InsideStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#333',
        },
        headerTintColor: 'white',
      }}
    >
      <InsideStack.Screen
        name='BottomNav'
        component={BottomNavigator}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => firebaseAuth.signOut()}>
              <Text style={styles.headerBtn}>Sign out</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <FontAwesome.Button
              name='bookmark'
              backgroundColor='none'
              size={25}
              onPress={() => navigator.navigate('Bookmark')}
              iconStyle={{
                color: 'lightblue',
              }}
              underlayColor=''
            />
          ),
          title: 'LegacyLoot',
          headerTitleStyle: {
            fontSize: 30,
            fontWeight: '8test00',
          },
        }}
      />
      <InsideStack.Screen
        name='Category'
        component={CategoryScreen}
        options={({ route }) => ({
          title: route.params.category,
        })}
      />
      <InsideStack.Screen name='Bookmark' component={BookmarkScreen} />
      <InsideStack.Screen
        name='Item'
        component={ItemScreen}
        options={({ route }) => ({
          title: route.params.item.title,
          presentation: 'modal',
          headerRight: () =>
            route.params.item.uid === loggedInUser.uid ? (
              <FontAwesome.Button
                name='trash'
                backgroundColor='none'
                size={25}
                onPress={() =>
                  deleteItem(route.params.item.id)
                    .then(setProfileRefresh(!profileRefresh))
                    .then(navigator.goBack())
                }
                style={styles.headerBtn}
                underlayColor=''
              />
            ) : (
              <FontAwesome.Button
                name={
                  userAccount.savedItems.filter(
                    (item) => item.id === route.params.item.id
                  ).length !== 0
                    ? 'bookmark'
                    : 'bookmark-o'
                }
                iconStyle={{
                  color: 'lightblue',
                }}
                backgroundColor='none'
                size={25}
                onPress={() => handleBookmark(route.params.item)}
                style={styles.headerBtn}
                light
                underlayColor=''
              />
            ),
          headerLeft: () =>
            route.params.item.uid === loggedInUser.uid && (
              <FontAwesome.Button
                name='pencil'
                backgroundColor='none'
                size={25}
                onPress={() => console.log('edit')}
                style={styles.headerBtn}
              />
            ),
        })}
      />
      <InsideStack.Screen
        name='QR'
        component={QRScreen}
        options={() => ({
          title: 'LegacyLoot',
          presentation: 'modal',
          headerRight: () => (
            <FontAwesome.Button
              name='close'
              backgroundColor='none'
              size={25}
              onPress={() => navigator.goBack()}
              style={styles.headerBtn}
            />
          ),
        })}
      />

      <InsideStack.Screen
        name='NewLoot'
        component={LootModule}
        options={{ headerShown: true, title: 'Add new loot' }}
      />
      <InsideStack.Screen
        name='Chatroom'
        component={Chat}
        options={({ route }) => ({
          title: route.params.room.roomName,
        })}
      />
    </InsideStack.Navigator>
  );
};

export default SignedInStack;

const styles = StyleSheet.create({
  headerBtn: {
    color: 'white',
    fontSize: 18,
  },
});
