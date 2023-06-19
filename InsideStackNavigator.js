import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CategoryScreen from './screens/CategoryScreen';

const InsideStack = createNativeStackNavigator();

const InsideStackNavigator = () => {
  return (
    <InsideStack.Group>
      <InsideStack.Screen
        name='Category'
        component={CategoryScreen}
        options={({ route }) => ({
          title: route.params.category,
        })}
      />
    </InsideStack.Group>
  );
};

export default InsideStackNavigator;
