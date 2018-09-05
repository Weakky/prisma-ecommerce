import React from 'react';
import PropTypes from 'prop-types';

import { Text, Platform } from 'react-native';

const propTypes = {
  style: Text.propTypes.style,
  children: PropTypes.node.isRequired,
  size: PropTypes.number,
  weight: PropTypes.string,
  color: PropTypes.string,
  font: PropTypes.string,
  fontStyle: PropTypes.oneOf(['normal', 'italic']),
};

const defaultProps = {
  size: 16,
  weight: 'normal',
  color: 'black',
  ...Platform.select({
    ios: { font: 'Avenir Next' },
    android: { font: 'Roboto' },
  }),
  fontStyle: 'normal',
};

const Title = ({ children, style, size, weight, color, font, fontStyle }) => (
  <Text
    style={{
      ...{
        fontFamily: font,
        fontSize: size,
        fontStyle: fontStyle,
        fontWeight: weight,
        color: color,
        backgroundColor: 'transparent',
      },
      ...style,
    }}
  >
    {children}
  </Text>
);

Title.propTypes = propTypes;
Title.defaultProps = defaultProps;

export default Title;
