import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { boolean } from '@storybook/addon-knobs';

import NavigationButton from './NavigationButton';

function log() {
  console.log('Done');
}

storiesOf('NavigationButton', module).add('default', () => (
  <NavigationButton
    next={boolean('Next', true)}
    disable={boolean('Disable', true)}
    callback={log}
  />
));
