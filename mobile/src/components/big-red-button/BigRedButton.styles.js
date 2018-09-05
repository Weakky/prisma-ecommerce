import { StyleSheet } from 'react-native';
import Colors from '../../statics/colors';

export default StyleSheet.create({
  bigRedButton: {
    alignSelf: 'center',
    backgroundColor: Colors.red,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    width: '100%',
    borderRadius: 6,
  },
});
