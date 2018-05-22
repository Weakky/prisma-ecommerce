import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { text, number, color } from '@storybook/addon-knobs';

import Button from './Button';

function log() {
  console.log('Callback!');
}

storiesOf('Button', module).add('default', () => (
  <Button
    icon="ios-cart-outline"
    label={text('Label', 'Ajouter au panier')}
    width={number('Width', 300)}
    height={number('Height', 50)}
    fontSize={number('FontSize', 14)}
    backgroundColor={color('Background', '#CC6155')}
    borderColor={color('BorderColor', '#F9F9F9')}
    iconColor={color('IconColor', '#F9F9F9')}
    labelColor={color('LabelColor', '#F9F9F9')}
    callback={log}
  />
));
