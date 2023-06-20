import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { firebaseAuth } from './firebase';
import CategoryScreen from './screens/CategoryScreen';
import LootModule from './components/LootModule';
import ItemScreen, { deleteItem } from './screens/ItemScreen';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LegacyLootContext } from './store/context/legacyLootContext';
import { useContext } from 'react';
import BottomNavigator from './BottomNavigator';
import DrawerNavigator from './DrawerNavigator';
import QRScreen from './screens/QRScreen';

const InsideStack = createNativeStackNavigator();

const SignedInStack = () => {
  const navigator = useNavigation();
  const { loggedInUser, profileRefresh, setProfileRefresh } =
    useContext(LegacyLootContext);
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
              />
            ) : (
              <FontAwesome.Button
                name='bookmark-o'
                iconStyle={{
                  color: 'lightblue',
                }}
                backgroundColor='none'
                size={25}
                onPress={() => console.log('bookmark')}
                style={styles.headerBtn}
                light
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
