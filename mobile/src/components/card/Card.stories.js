import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { text, number, boolean, array } from '@storybook/addon-knobs';

import Card from './Card';

function test() {
  console.log('Callback: OK');
}

storiesOf('Card', module).add('default', () => (
  <Card
    loading={boolean('Loading', false)}
    onPress={test}
    notAvailableTaxons={array('not available taxons', ['6mg', '11mg'])}
    name={text('name', 'FR-M')}
    brand={text('brand', 'ALFALIQUID')}
    price={number('price', '5.9')}
  />
));
