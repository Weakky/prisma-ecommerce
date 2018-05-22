import { StyleSheet } from 'react-native';
import Colors from '../../statics/colors';

export default StyleSheet.create({
  iconContainer: { marginTop: 8 },
  badgeContainer: {
    position: 'absolute',
    top: -5,
    right: -7,
    minWidth: 15,
    height: 15,
    backgroundColor: Colors.red,
    zIndex: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: { color: Colors.white, fontSize: 9 },
});
