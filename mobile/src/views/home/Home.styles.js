import {Dimensions, StyleSheet} from 'react-native';
import Colors from '../../statics/colors'

export default StyleSheet.create({
  smallRedButton: {
    marginBottom: 15,
    backgroundColor: Colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.42,
    height: 30,
    borderRadius: 100,
  }
})
