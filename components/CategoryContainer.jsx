import { ScrollView, StyleSheet } from 'react-native';
import Category from './Category';

const CategoryContainer = () => {
  return (
    <ScrollView horizontal style={styles.container}>
      <Category
        category={'Shoes'}
        image={
          'https://firebasestorage.googleapis.com/v0/b/legacyloot-67b10.appspot.com/o/categories%2Fshoes.jpg?alt=media&token=775fc55a-1ba2-4939-9a5e-5554e2eebd8b'
        }
      />
      <Category
        category={'Clothes'}
        image={
          'https://firebasestorage.googleapis.com/v0/b/legacyloot-67b10.appspot.com/o/categories%2Fclothes.jpg?alt=media&token=92ffffd2-4016-4378-8191-07207ed47f0c'
        }
      />
      <Category
        category={'Accessories'}
        image={
          'https://firebasestorage.googleapis.com/v0/b/legacyloot-67b10.appspot.com/o/categories%2Faccessories.jpg?alt=media&token=485f9470-ca31-4b68-8c74-0f2160e739af'
        }
      />
      <Category
        category={'Furnitures'}
        image={
          'https://firebasestorage.googleapis.com/v0/b/legacyloot-67b10.appspot.com/o/categories%2Ffurnitures.jpg?alt=media&token=4346f014-1f22-4ecd-91b3-1fdacf684d0e'
        }
      />
      <Category
        category={'Furnishings'}
        image={
          'https://firebasestorage.googleapis.com/v0/b/legacyloot-67b10.appspot.com/o/categories%2Ffurnishing.jpg?alt=media&token=7abb0bc9-3cc5-4dcf-a872-5f2b77c41a72'
        }
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
