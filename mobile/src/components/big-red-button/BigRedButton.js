import React from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Title from '../title/Title';

import Colors from '../../statics/colors';
import styles from './BigRedButton.styles';

const BigRedButton = props => (
  <TouchableOpacity
    style={[
      styles.bigRedButton,
      props.style,
      { backgroundColor: props.disabled ? 'rgba(204,97,85,0.5)' : Colors.red },
    ]}
    onPress={props.onPress}
    disabled={props.disabled || props.loading}
  >
    {props.loading && <ActivityIndicator color="white" animating size="small" />}
    {!props.loading && (
      <Title
        size={14}
        weight="500"
        style={{ marginRight: props.icon ? 14 : 0 }}
        color={Colors.white}
      >
        {props.label}
      </Title>
    )}
    {!props.loading &&
      props.icon && (
        <View style={{ marginTop: 3 }}>
          <Ionicons size={22} color={Colors.white} name={props.icon} />
        </View>
      )}
  </TouchableOpacity>
);

BigRedButton.propTypes = {
  onPress: PropTypes.func,
  label: PropTypes.string,
  icon: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  style: View.propTypes.style,
};

export default BigRedButton;
