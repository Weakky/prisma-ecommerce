import { StyleSheet, Dimensions } from 'react-native';

import Colors from '../../statics/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: Colors.white,
  },

  close: {
    position: 'absolute',
    top: 25,
    left: 25,
    zIndex: 10,
  },

  favorite: {
    backgroundColor: Colors.red,
    position: 'absolute',
    top: 150,
    right: 0,
    padding: 10,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
  },

  image: {
    flex: 0.8,
    height: 250,
    width: 250,
    marginBottom: 30,
  },

  imageContainer: {
    flex: 0.8,
    justifyContent: 'flex-end',
  },

  addToCart: {
    backgroundColor: Colors.red,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 13,
    borderRadius: 50,
    marginBottom: 40,
  },
  productSheetDescription: {
    marginBottom: 30,
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  productSheetDetails: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  productSheetContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  pickerActivatorChoiceIcon: {
    position: 'absolute',
    top: 6,
    right: 80,
  },
  pickerActivatorContainer: {
    flexDirection: 'row',
    height: 30,
    width: Dimensions.get('window').width * 0.85,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
});

export default styles;
