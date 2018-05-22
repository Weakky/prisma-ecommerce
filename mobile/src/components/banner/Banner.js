import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableWithoutFeedback, StyleSheet, View } from 'react-native';

import styles from './Banner.styles';

const propTypes = {
  shop: PropTypes.string,
  address: PropTypes.string,
  postal: PropTypes.string,
  city: PropTypes.string,
  tel: PropTypes.string,
  opening: PropTypes.string,
  selected: PropTypes.bool,
  onBannerSelected: PropTypes.func,
};

const defaultProps = {
  shop: 'Aromaclop',
  address: '10 rue Jean Jaurès',
  postal: '54550',
  city: 'Pont-Saint-Vincent',
  tel: '06 08 64 77 61',
  opening: 'Ouvert du lundi au vendredi de 8h à 19h',
  selected: false,
  onBannerSelected: () => {},
};

class Banner extends Component {
  constructor(props) {
    super(props);

    this.onBannerSelected = this.onBannerSelected.bind(this);
  }

  onBannerSelected() {
    this.props.onBannerSelected({ shop: this.props.shop });
  }

  render() {
    const { selected, shop, address, postal, city, tel, opening } = this.props;

    return (
      <TouchableWithoutFeedback onPress={this.onBannerSelected}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: selected ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
            },
          ]}
        >
          <Text style={StyleSheet.flatten([styles.text, styles.title])}>{shop}</Text>
          <Text style={StyleSheet.flatten([styles.text, styles.margin])}>{address}</Text>
          <Text style={styles.text}>
            {postal}
            <Text style={StyleSheet.flatten([styles.text, styles.bold])}>, {city}</Text>
          </Text>
          <Text style={StyleSheet.flatten([styles.text, styles.margin])}>{tel}</Text>
          <Text style={styles.text}>{opening}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Banner.propTypes = propTypes;
Banner.defaultProps = defaultProps;

export default Banner;
