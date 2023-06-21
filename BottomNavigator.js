import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileScreen from './screens/ProfileScreen';
import LootModule from './components/LootModule';
import HomeScreen from './screens/HomeScreen';
import InsideStackNavigator from './InsideStackNavigator';
import ChatScreen from './screens/ChatScreen';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#333',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1791AC',
          borderTopWidth: 0,
          paddingTop: 5,
        },
      }}
      initialRouteName='Home'
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='home' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='account' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Chat'
        component={ChatScreen}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='chat' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='NewLoot'
        component={LootModule}
        options={{
          tabBarLabel: 'Add loot',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='plus' size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
