import { StyleSheet, Dimensions, StatusBar, Platform } from 'react-native';
import Colors from '../../statics/colors';

const styles = StyleSheet.create({
  acceptGTC: {
    textAlign: 'center',
    marginTop: 24,
    paddingLeft: 20,
    paddingRight: 20,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: Platform.select({
      ios: 20,
      android: StatusBar.currentHeight,
    }),
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  ticketContainer: {
    backgroundColor: 'rgba(249, 249, 249, 0.8)',
    borderColor: 'rgba(151, 151, 151, 0.8)',
    borderWidth: StyleSheet.hairlineWidth,
    padding: 15,
  },
  separator: {
    alignSelf: 'center',
    width: Dimensions.get('window').width * 0.85,
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(151, 151, 151, 0.3)',
    marginBottom: 8,
    marginTop: 8,
  },
  recapRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    marginTop: 4,
  },
});

export default styles;
