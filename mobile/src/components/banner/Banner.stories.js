import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { text, boolean } from '@storybook/addon-knobs';

import Banner from './Banner';

storiesOf('Banner', module).add('default', () => (
  <Banner
    selected={boolean('Selected', true)}
    shop={text('Shop', 'Aromaclop')}
    address={text('Address', '10 rue Jean Jaurès')}
    postal={text('Postal', '54550')}
    city={text('City', 'Pont-Saint-Vincent')}
    tel={text('Tel', '06 08 64 77 61')}
    opening={text('Opening', 'Ouvert du lundi au vendredi de 8h à 19h')}
  />
));
