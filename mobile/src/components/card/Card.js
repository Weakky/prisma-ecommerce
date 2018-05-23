import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { translate } from '../../i18n';

import styles from './Card.styles';

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
  <View style={styles.optionValueContainer}>
    <Text style={styles.optionValueTitle}>
      {translate('no_longer_available_options')}&nbsp;
      <Text style={styles.optionValueContent}>
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
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image style={styles.productImage} source={source} />
        <View style={{ marginLeft: 5 }}>
          <Text style={styles.productName}>{name}</Text>
          <Text style={styles.productBrand}>{brand.toUpperCase()}</Text>
          <Text style={styles.productPrice}>{price.toString()}&nbsp;€</Text>
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

