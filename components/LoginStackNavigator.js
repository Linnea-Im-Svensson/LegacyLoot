import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { firebaseAuth } from '../firebase';
import SignedInStack from '../SignedInStack';
import { LegacyLootContext } from '../store/context/legacyLootContext';
import { useContext } from 'react';

const Stack = createNativeStackNavigator();

const LoginStackNavigator = () => {
  const { loggedInUser, setLoggedInUser } = useContext(LegacyLootContext);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      setLoggedInUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {loggedInUser ? (
          <Stack.Screen
            name='SignedInStack'
            component={SignedInStack}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name='Login'
            component={LoginScreen}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoginStackNavigator;
