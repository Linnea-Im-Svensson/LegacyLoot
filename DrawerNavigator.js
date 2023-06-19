import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileScreen from './screens/ProfileScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: 'red',
        },
      }}
    >
      <Drawer.Screen name='Profile' component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
