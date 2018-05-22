import React from 'react';
import PropTypes from 'prop-types';

import { TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Title from '../title/Title';

import styles from './ModalNavigationBar.styles';
import Colors from '../../statics/colors';

const ModalNavigationBar = props => (
  <View style={[styles.topBarContainer, props.style]}>
    <TouchableOpacity onPress={props.closeModal}>
      <Ionicons color={Colors.text} size={40} name="ios-close" />
    </TouchableOpacity>
    <TouchableOpacity onPress={props.onPressRight}>
      <Title color={Colors.text}>{props.rightText}</Title>
    </TouchableOpacity>
  </View>
);

ModalNavigationBar.propTypes = {
  style: PropTypes.object,
  onPressRight: PropTypes.func,
  rightText: PropTypes.string,
  closeModal: PropTypes.func,
  withBackButton: PropTypes.bool,
};

export default ModalNavigationBar;
