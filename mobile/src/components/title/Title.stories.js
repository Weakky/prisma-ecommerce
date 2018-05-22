import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { text, number, select, color } from '@storybook/addon-knobs';

import Title from './Title';

const options = [100, 200, 300, 400, 500, 600, 700, 800, 900];

storiesOf('Title', module).add('default', () => (
  <Title
    weight={select('Weight', options, '400')}
    size={number('Size', 24)}
    color={color('Color', '#484848')}
  >
    {text('Label', 'Title')}
  </Title>
));
