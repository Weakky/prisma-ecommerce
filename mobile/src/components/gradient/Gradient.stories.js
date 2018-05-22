import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { color } from '@storybook/addon-knobs';

import Gradient from './Gradient';

storiesOf('Gradient', module).add('default', () => (
  <Gradient
    colors={[color('Start', '#CC6155'), color('Mid', '#CC6155'), color('End', '#DA7D75')]}
  />
));
