import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { text, number, color, boolean, select } from '@storybook/addon-knobs';

import Input from './Input';

function handleSubmit(value) {
  console.log(value);
}

const keyboardTypes = ['default', 'numeric', 'email-address', 'phone-pad'];
const returnKeys = ['default', 'done', 'go', 'next', 'search', 'send'];

storiesOf('Input', module).add('default', () => (
  <Input
    onSubmit={handleSubmit}
    label={text('Label', 'Age')}
    helper={text(
      'Helper',
      'Selon l’article L3511-2-1, il est interdit de vendre des dispositifs électroniques de vapotage ou des flacons de recharge à des mineurs.',
    )}
    placeHolder={text('PlaceHolder', '')}
    width={number('Width', 300)}
    maxLength={number('MaxLength', 50)}
    secure={boolean('Secure', false)}
    blurColor={color('BlurColor', 'rgba(255, 255, 255, 0.3)')}
    focusColor={color('FocusColor', 'rgba(255, 255, 255, 0.8)')}
    cursorColor={color('CursorColor', '#F9F9F9')}
    keyboardType={select('Keyboard', keyboardTypes, 'numeric')}
    returnKey={select('ReturnKey', returnKeys, 'default')}
    autoFocus
  />
));
