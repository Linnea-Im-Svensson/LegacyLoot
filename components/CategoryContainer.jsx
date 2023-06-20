import { ScrollView, StyleSheet } from 'react-native';
import Category from './Category';

const CategoryContainer = () => {
  return (
    <ScrollView horizontal style={styles.container}>
      <Category category={'Shoes'} image={require('../assets/shoes.jpg')} />
      <Category category={'Clothes'} image={require('../assets/clothes.jpg')} />
      <Category
        category={'Accessories'}
        image={require('../assets/accessories.jpg')}
      />
      <Category
        category={'Furnitures'}
        image={require('../assets/furnitures.jpg')}
      />
      <Category
        category={'Furnishings'}
        image={require('../assets/furnishing.jpg')}
      />
    </ScrollView>
  );
};

export default CategoryContainer;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#555',
  },
});
