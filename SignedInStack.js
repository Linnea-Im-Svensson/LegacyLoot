import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { firebaseAuth } from './firebase';
import CategoryScreen from './screens/CategoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import LootModule from './components/LootModule';
import ItemScreen from './screens/ItemScreen';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LegacyLootContext } from './store/context/legacyLootContext';
import { useContext } from 'react';

const InsideStack = createNativeStackNavigator();

const SignedInStack = () => {
  const navigator = useNavigation();
  const { loggedInUser } = useContext(LegacyLootContext);
  return (
    <InsideStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1791AC',
        },
        headerTintColor: 'white',
      }}
    >
      <InsideStack.Screen
        name='Home'
        component={HomeScreen}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => firebaseAuth.signOut()}>
              <Text style={styles.headerBtn}>Sign out</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigator.navigate('Profile')}>
              <Text style={styles.headerBtn}>Profile</Text>
            </TouchableOpacity>
          ),
          title: 'LegacyLoot',
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
            route.params.item.uid === loggedInUser.uid && (
              <FontAwesome.Button
                name='trash'
                backgroundColor='none'
                size={25}
                onPress={() => console.log('ta bort')}
                style={styles.headerBtn}
              />
            ),
        })}
      />
      <InsideStack.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => navigator.navigate('NewLoot')}>
              <Text style={styles.headerBtn}>Add loot</Text>
            </TouchableOpacity>
          ),
        }}
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
