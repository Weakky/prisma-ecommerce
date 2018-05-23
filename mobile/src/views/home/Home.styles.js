import { Dimensions, Platform, StatusBar, StyleSheet } from 'react-native';
import Colors from '../../statics/colors';

export default StyleSheet.create({
  smallRedButton: {
    marginBottom: 15,
    backgroundColor: Colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.42,
    height: 30,
    borderRadius: 100,
  },
  messageOfTheDay: {
    marginTop: 16,
    marginBottom: 20,
    padding: 15,
    backgroundColor: 'rgba(240, 240, 240, 0.4)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(151, 151, 151, 0.8)',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: Platform.select({
      ios: 20,
      android: StatusBar.currentHeight,
    }),
  },
  ticketContainer: {
    backgroundColor: 'rgba(249, 249, 249, 0.8)',
    borderColor: 'rgba(151, 151, 151, 0.4)',
    borderWidth: StyleSheet.hairlineWidth,
    padding: 15,
    marginBottom: 20,
  },
  recapRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    marginTop: 4,
  },
  separator: {
    alignSelf: 'center',
    width: Dimensions.get('window').width * 0.85,
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(151, 151, 151, 0.3)',
    marginBottom: 8,
    marginTop: 8,
  },
  simpleProductListContainer: { flex: 1, marginBottom: 20 },
});
