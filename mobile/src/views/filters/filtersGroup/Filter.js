import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';

import Colors from '../../../statics/colors/index';

import styles from './Filter.styles';

const Filter = ({ setFilter, name, selected }) => (
  <TouchableOpacity
    onPress={setFilter}
    style={[styles.filterContainer, { backgroundColor: selected ? '#f2d2d2' : '#eee' }]}
  >
    <Text style={{ marginRight: 5, color: Colors.text }}>{name}</Text>
  </TouchableOpacity>
);

Filter.propTypes = {
  name: PropTypes.string,
  selected: PropTypes.bool,
  setFilter: PropTypes.func,
};

export default Filter;
