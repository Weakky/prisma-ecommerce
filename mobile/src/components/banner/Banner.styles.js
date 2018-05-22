import { StyleSheet, Dimensions } from 'react-native';

import font from '../../assets/fonts/index';
import color from '../../statics/colors/index';

const width = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    padding: 20,
  },
  text: {
    fontFamily: font,
    color: color.white,
    fontSize: 14,
  },
  bold: {
    fontWeight: 'bold',
  },
  margin: {
    marginTop: 10,
  },
  title: {
    fontSize: 18,
  },
});
