import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

const width = Dimensions.get('window').width;

const propTypes = {
  colors: PropTypes.array,
};

const defaultProps = {
  colors: ['#CC6155', '#CC6155', '#DA7D75'],
};

const Gradient = ({ children, colors }) => (
  <LinearGradient style={{ flex: 1, width: width }} colors={colors}>
    {children}
  </LinearGradient>
);

Gradient.propTypes = propTypes;
Gradient.defaultProps = defaultProps;

export default Gradient;
