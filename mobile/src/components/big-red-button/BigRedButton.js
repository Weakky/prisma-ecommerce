import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import PropTypes from 'prop-types'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Title from '../title/Title'

import Colors from '../../statics/colors'
import styles from './BigRedButton.styles'

const BigRedButton = (props) => (
  <TouchableOpacity
    style={styles.bigRedButton}
    onPress={props.onPress}
  >
    <Title size={16} weight="100" style={{marginRight: 14}} color={Colors.white}>
      {props.label}
    </Title>
    {props.icon && (
      <View style={{marginTop: 3}}>
        <Ionicons size={22} color={Colors.white} name={props.icon} />
      </View>
    )}
  </TouchableOpacity>
)

BigRedButton.propTypes = {
  onPress: PropTypes.func,
  label: PropTypes.string,
  icon: PropTypes.string,
};

export default BigRedButton
