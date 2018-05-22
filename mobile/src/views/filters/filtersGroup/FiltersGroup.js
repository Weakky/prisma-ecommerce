import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import Colors from '../../../statics/colors';
import Title from '../../../components/title/Title';

const FiltersGroup = props => (
  <View style={{ marginBottom: 10 }}>
    <Title color={Colors.text} size={22} style={{ marginBottom: 10 }}>
      {props.title}
    </Title>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{props.children}</View>
  </View>
);

FiltersGroup.propTypes = {
  title: PropTypes.string,
  exposedFilter: PropTypes.object,
  filtersValues: PropTypes.object,
  filtersEnabled: PropTypes.object,
  setFilter: PropTypes.func,
};

export default FiltersGroup;
