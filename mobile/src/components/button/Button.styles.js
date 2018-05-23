import { StyleSheet } from 'react-native';

import font from '../../assets/fonts/index';

export default StyleSheet.create({
  touchable: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 50,
  },
  text: {
    fontFamily: font,
    fontWeight: '600',
    paddingLeft: 16,
    paddingRight: 16,
  },
});
