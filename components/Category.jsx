import {
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Category = ({ category, image }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('Category', {
          category: category,
        })
      }
    >
      <ImageBackground
        source={{ uri: image }}
        defaultSource={require('../assets/logo.png')}
        resizeMethod='auto'
        style={styles.backgroundImage}
      >
        <Text style={styles.text}>{category}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 250,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 15,
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 40,
    padding: 10,
    shadowColor: '#000',
    textShadowRadius: 20,
    fontWeight: '700',
    textShadowColor: 'black',
    shadowOpacity: 0.8,
  },
});
