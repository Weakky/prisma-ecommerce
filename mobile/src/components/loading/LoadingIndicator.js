import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import Title from '../title/Title';

import { translate } from '../../i18n';

import Colors from '../../statics/colors';
import font from '../../assets/fonts';

export default () => (
  <View>
    <Title color={Colors.text} font={font}>
      {translate('loading')}
    </Title>
    <LoadingIndicator animating color={Colors.text} />
  </View>
);

const LoadingIndicator = styled.ActivityIndicator`
  margin-top: 10px;
`;
