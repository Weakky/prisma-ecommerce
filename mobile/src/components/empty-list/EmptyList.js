import React from 'react';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';
import font from '../../assets/fonts';

import Title from '../title/Title';

const EmptyList = props => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        resizeMode="cover"
        source={require('../../assets/no_data.png')}
        style={{ width: 200, height: 200 }}
      />
      <Title
        style={{ textAlign: 'center', marginTop: 24, marginBottom: 24 }}
        color="#bbb"
        font={font}
        size={30}
      >
        {props.children}
      </Title>
    </View>
  );
};

EmptyList.propTypes = {
  children: PropTypes.node,
};
EmptyList.defaultProps = {};

export default EmptyList;
