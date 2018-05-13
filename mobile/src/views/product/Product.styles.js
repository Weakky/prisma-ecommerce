import { StyleSheet } from 'react-native';

import color from "../../statics/colors";

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: color.white,
  },

  close: {
    position: 'absolute',
    top: 25,
    left: 25,
    zIndex: 10,
  },

  favorite: {
    backgroundColor: color.red,
    position: 'absolute',
    top: 150,
    right: 0,
    padding: 10,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5
  },

  image: {
    flex: 0.8,
    height: 250,
    width: 250,
    marginBottom: 30
  },

  imageContainer: {
    flex: 0.8,
    justifyContent: 'flex-end',
  }

});

export default styles;