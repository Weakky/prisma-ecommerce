import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableWithoutFeedback, StyleSheet, View } from 'react-native';

import styles from './Banner.styles';

const propTypes = {
  shopId: PropTypes.string,
  shop: PropTypes.string,
  address: PropTypes.string,
  postal: PropTypes.string,
  city: PropTypes.string,
  tel: PropTypes.string,
  opening: PropTypes.string,
  selected: PropTypes.bool,
  onBannerSelected: PropTypes.func,
  inverted: PropTypes.bool,
};

const defaultProps = {
  name: 'Aromaclop',
  address: '10 rue Jean Jaurès',
  zipCode: '54550',
  city: 'Pont-Saint-Vincent',
  phoneNumber: '06 08 64 77 61',
  openingHours: 'Ouvert du lundi au vendredi de 8h à 19h',
  selected: false,
  onBannerSelected: () => {},
  inverted: false,
};

class Banner extends Component {
  constructor(props) {
    super(props);

    this.onBannerSelected = this.onBannerSelected.bind(this);
  }

  onBannerSelected() {
    this.props.onBannerSelected({ shopId: this.props.shopId });
  }

  computeBackgroundColor() {
    const { selected, inverted } = this.props;
    if (selected) {
      return inverted ? 'rgba(204, 97, 85, 1)' : 'rgba(255, 255, 255, 0.1)';
    }

    return inverted ? 'rgba(204, 97, 85, 0.5)' : 'transparent'
  }

  render() {
    const { name, address, zipCode, city, phoneNumber, openingHours } = this.props;

    return (
      <TouchableWithoutFeedback onPress={this.onBannerSelected}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: this.computeBackgroundColor(),
              borderRadius: this.props.inverted ? 4 : 0
            },
          ]}
        >
          <Text style={StyleSheet.flatten([styles.text, styles.title])}>{name}</Text>
          <Text style={StyleSheet.flatten([styles.text, styles.margin])}>{address}</Text>
          <Text style={styles.text}>
            {zipCode}
            <Text style={StyleSheet.flatten([styles.text, styles.bold])}>, {city}</Text>
          </Text>
          <Text style={StyleSheet.flatten([styles.text, styles.margin])}>{phoneNumber}</Text>
          <Text style={styles.text}>{openingHours}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Banner.propTypes = propTypes;
Banner.defaultProps = defaultProps;

export default Banner;
