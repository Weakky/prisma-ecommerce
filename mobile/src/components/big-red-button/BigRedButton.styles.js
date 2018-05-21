import {Dimensions, StyleSheet} from 'react-native';
import Colors from '../../statics/colors'

export default StyleSheet.create({
  bigRedButton: {
    alignSelf: 'center',
    backgroundColor: Colors.red,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: Dimensions.get('window').width * .85,
    borderRadius: 100,
  }
})
