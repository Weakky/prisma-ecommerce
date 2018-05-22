import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.styles';

import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { translate } from '../../i18n';

const propTypes = {
  loading: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  source: PropTypes.object,
  name: PropTypes.string,
  brand: PropTypes.string,
  price: PropTypes.number,
  notAvailableTaxons: PropTypes.array,
  font: PropTypes.string,
};

const defaultProps = {
  source: require('./assets/blank.png'),
  name: 'Bubble Gum',
  brand: 'ALFALIQUID',
  price: '5,95 €',
  notAvailableTaxons: ['11 MG', '16 MG'],
};

const OptionsValuesNotAvailable = props => (
  <View
    style={{
      padding: 7,
      backgroundColor: '#F2E3E3',
      borderLeftWidth: StyleSheet.hairlineWidth,
      borderRightWidth: StyleSheet.hairlineWidth,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: '#ddd',
      justifyContent: 'center',
    }}
  >
    <Text
      style={{
        fontFamily: 'Avenir Next',
        fontSize: 11,
        marginLeft: 3,
      }}
    >
      {translate('no_longer_available_options')}&nbsp;
      <Text
        style={{
          fontFamily: 'Avenir Next',
          fontWeight: '700',
          fontSize: 11,
          marginLeft: 10,
        }}
      >
        {props.unavailableOptionsValues.map(option => option.name).join(', ')}
      </Text>
    </Text>
  </View>
);

OptionsValuesNotAvailable.propTypes = {
  notAvailableTaxons: PropTypes.array,
};

const Card = ({
  loading,
  onPress,
  source,
  name,
  brand,
  price,
  unavailableOptionsValues,
}) => (
  <TouchableOpacity onPress={() => onPress()}>
    <View
      style={{
        backgroundColor: '#F9F9F9',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#ddd',
        height: 77,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image style={{ width: 60, height: 60, margin: 5 }} source={source} />
        <View style={{ marginLeft: 5 }}>
          <Text style={{ fontFamily: 'Avenir Next', fontWeight: '300', fontSize: 14 }}>
            {name}
          </Text>
          <Text
            style={{
              fontFamily: 'Avenir Next',
              fontWeight: '600',
              fontSize: 10,
              color: 'rgba(72, 72, 72, 0.4)',
            }}
          >
            {brand.toUpperCase()}
          </Text>
          <Text
            style={{
              fontFamily: 'Avenir Next',
              fontWeight: '700',
              fontSize: 12,
              color: '#484848',
              marginTop: 5,
            }}
          >
            {price.toString()}&nbsp;€
          </Text>
        </View>
      </View>
      <View style={{ marginRight: 15 }}>
        <Ionicons name="ios-arrow-forward-outline" />
      </View>
    </View>
    {unavailableOptionsValues.length > 0 && (
      <OptionsValuesNotAvailable unavailableOptionsValues={unavailableOptionsValues} />
    )}
  </TouchableOpacity>
);

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
