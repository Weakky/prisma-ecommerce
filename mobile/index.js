import { AppRegistry, YellowBox } from 'react-native';
import App from './App';
import StoryBookUI from './storybook';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Remote debugger',
  'Module RCTImageLoader',
]);

//Return either App or StoryBookUI
AppRegistry.registerComponent('Aromaclop', () => App);
