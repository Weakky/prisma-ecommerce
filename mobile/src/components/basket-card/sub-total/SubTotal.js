import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import {translate} from '../../../i18n'

const SubTotal = (props) => (
  <View
    style={{
      padding: 7,
      backgroundColor: 'rgba(249, 249, 249, 0.8)',
      borderLeftWidth: StyleSheet.hairlineWidth,
      borderRightWidth: StyleSheet.hairlineWidth,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: '#ddd',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <Text
      style={{
        fontFamily: 'Avenir Next',
        fontSize: 11,
        marginLeft: 3,
      }}
    >
      {translate('sub_total')}
    </Text>
    <Text
      style={{
        fontFamily: 'Avenir Next',
        fontWeight: '700',
        fontSize: 11,
        marginLeft: 10,
      }}
    >
      {parseFloat(props.totalPrice).toFixed(2)} €
    </Text>
  </View>
);

SubTotal.propTypes = {
  totalPrice: PropTypes.number,
};

export default SubTotal;

