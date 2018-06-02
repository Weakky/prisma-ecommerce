import { StyleSheet } from 'react-native';
import Colors from '../../statics/colors';

export default StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    top: -4,
    right: -10,
    minWidth: 13,
    height: 13,
    backgroundColor: Colors.red,
    zIndex: 100,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: { color: Colors.white, fontSize: 10, marginLeft: 0.5 },
});
