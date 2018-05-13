import { StyleSheet } from 'react-native';
import color from '../../statics/colors'

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
});

export default styles;
