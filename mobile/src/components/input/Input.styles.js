import { StyleSheet } from 'react-native';

import color from '../../statics/colors';
import font from '../../assets/fonts';

export default StyleSheet.create({
  input: {
    height: 50,
    fontSize: 22,
    color: color.white,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    fontFamily: font,
  },
  inputIcon: {
    position: 'absolute',
    right: 5,
    top: 25,
  },
  label: {
    color: color.white,
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: font,
    backgroundColor: 'transparent',
  },
  helper: {
    fontSize: 12,
    color: color.white,
    fontWeight: '400',
    fontStyle: 'italic',
    fontFamily: font,
    paddingTop: 12,
  },
});
