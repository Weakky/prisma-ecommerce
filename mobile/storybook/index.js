import React from 'react';
import { AppRegistry, View, StyleSheet } from 'react-native';
import { getStorybookUI, configure, addDecorator } from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';

const styles = StyleSheet.create({
	decorator: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#CC6155' }
});

addDecorator(withKnobs);
addDecorator(story => (
	<View style={styles.decorator}>{story()}</View>
));

function loadStories() {
  require('../src/components/title/Title.stories');
  require('../src/components/card/Card.stories');
  require('../src/components/input/Input.stories');
  require('../src/components/button/Button.stories');
  require('../src/components/banner/Banner.stories');
  require('../src/components/gradient/Gradient.stories');
  require('../src/components/navigation-button/NavigationButton.stories');
}

configure(loadStories, module);

const StorybookUI = getStorybookUI({ port: 7007, onDeviceUI: true });
AppRegistry.registerComponent('Aromaclop', () => StorybookUI);

export default StorybookUI;