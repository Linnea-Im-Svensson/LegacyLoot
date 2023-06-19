import 'react-native-gesture-handler';
import LegacyLootContextProvider from './store/context/legacyLootContext';
import LoginStackNavigator from './components/LoginStackNavigator';

function App() {
  return (
    <LegacyLootContextProvider>
      <LoginStackNavigator />
    </LegacyLootContextProvider>
  );
}

export default App;
