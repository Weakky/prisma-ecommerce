import { StyleSheet } from 'react-native';
import Colors from '../../statics/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
  },
  searchInput: {
    color: 'black',
    marginBottom: 15,
    height: 50,
    fontSize: 22,
    fontWeight: 'bold',
    borderBottomColor: Colors.grey,
  },
});

export default styles;
