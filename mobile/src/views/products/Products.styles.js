import { Platform, StatusBar, StyleSheet } from 'react-native';
import Colors from '../../statics/colors';

const styles = StyleSheet.create({
  containerTitle: {
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
  loadingIndicator: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default styles;
