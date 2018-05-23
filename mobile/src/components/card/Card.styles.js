import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  productPrice: {
    fontFamily: 'Avenir Next',
    fontWeight: '600',
    fontSize: 12,
    color: '#484848',
    marginTop: 5,
  },
  productBrand: {
    fontFamily: 'Avenir Next',
    fontWeight: '600',
    fontSize: 10,
    color: 'rgba(72, 72, 72, 0.4)',
  },
  productImage: { width: 60, height: 60, margin: 5 },
  productName: { fontFamily: 'Avenir Next', fontWeight: '300', fontSize: 14 },
  container: {
    backgroundColor: '#F9F9F9',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    height: 77,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionValueContent: {
    fontFamily: 'Avenir Next',
    fontWeight: '600',
    fontSize: 11,
    marginLeft: 10,
  },
  optionValueTitle: {
    fontFamily: 'Avenir Next',
    fontSize: 11,
    marginLeft: 3,
  },
  optionValueContainer: {
    padding: 7,
    backgroundColor: '#F2E3E3',
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    justifyContent: 'center',
  },
});
