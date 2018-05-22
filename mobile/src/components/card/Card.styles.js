import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 3,
  },
  imageUrl: {
    flex: 0.8,
    backgroundColor: '#F9F9F9',
  },
  preview: {
    flex: 1,
  },
  content: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  left: {
    fontSize: 12,
    fontWeight: '700',
    paddingLeft: 10,
  },
  right: {
    fontSize: 12,
    paddingRight: 10,
  },
  loadingContent: {
    margin: 5,
    backgroundColor: '#F4F4F4',
    borderRadius: 100,
    height: 15,
  },
});
