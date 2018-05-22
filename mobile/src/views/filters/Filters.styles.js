import { Dimensions, StyleSheet } from 'react-native';
import Colors from '../../statics/colors';

export default StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  findProductContainer: {
    marginBottom: 30,
    alignSelf: 'center',
    backgroundColor: Colors.red,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: Dimensions.get('window').width * 0.85,
    borderRadius: 100,
  },
});
