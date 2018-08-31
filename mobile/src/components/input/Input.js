import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import color from '../../statics/colors';
import styles from './Input.styles';

const propTypes = {
  style: TextInput.propTypes.style,
  helperStyle: Text.propTypes.style,
  width: PropTypes.number,
  label: PropTypes.string,
  placeHolder: PropTypes.string,
  placeHolderColor: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onChangeText: PropTypes.func,
  autoFocus: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  keyboardType: PropTypes.string,
  returnKey: PropTypes.string,
  maxLength: PropTypes.number,
  secure: PropTypes.bool,
  cursorColor: PropTypes.string,
  blurColor: PropTypes.string,
  focusColor: PropTypes.string,
  helper: PropTypes.string,
  value: PropTypes.string,
  withValidation: PropTypes.bool,
  validationFunction: PropTypes.func,
};

const defaultProps = {
  style: {},
  width: Dimensions.get('window').width - 40,
  placeHolder: '',
  placeHolderColor: color.grey,
  autoFocus: false,
  keyboardType: 'default',
  returnKey: 'default',
  maxLength: 50,
  secure: false,
  cursorColor: color.white,
  focusColor: 'rgba(255, 255, 255, 0.8)',
  blurColor: 'rgba(255, 255, 255, 0.3)',
  onChangeText: () => {},
  autoCapitalize: 'none',
  value: '',
  withValidation: false,
  validationFunction: () => {},
};

class Input extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      color: this.props.blurColor,
    };
  }

  handleFocus() {
    this.setState({ color: this.props.focusColor });
  }

  handleBlur() {
    this.setState({ color: this.props.blurColor });
  }

  focus() {
    this.input.focus();
  }

  renderValidationIcon() {
    return (
      <View style={styles.inputIcon}>
        {this.props.validationFunction() ? (
          <Ionicons size={25} color={color.white} name="ios-checkmark" />
        ) : (
          <Ionicons size={25} color={color.white} name="ios-close" />
        )}
      </View>
    );
  }

  render() {
    return (
      <View style={{ backgroundColor: 'transparent', width: this.props.width }}>
        {this.props.label && (
          <Text style={styles.label}>{this.props.label.toUpperCase()}</Text>
        )}
        <TextInput
          ref={ref => (this.input = ref)}
          style={[
            styles.input,
            { borderBottomColor: this.state.color },
            this.props.style,
          ]}
          placeholder={this.props.placeHolder}
          placeholderTextColor={this.props.placeHolderColor}
          onChangeText={this.props.onChangeText}
          autoCorrect={false}
          autoFocus={this.props.autoFocus}
          autoCapitalize={this.props.autoCapitalize}
          keyboardType={this.props.keyboardType}
          returnKeyType={this.props.returnKey}
          maxLength={this.props.maxLength}
          secureTextEntry={this.props.secure}
          spellCheck={false}
          underlineColorAndroid="transparent"
          selectionColor={this.props.cursorColor}
          onSubmitEditing={e => this.props.onSubmit(e.nativeEvent.text)}
          onFocus={() => this.handleFocus()}
          onBlur={() => this.handleBlur()}
          value={this.props.value}
        />
        {this.props.withValidation && this.renderValidationIcon()}
        {this.props.helper && (
          <Text style={[styles.helper, this.props.helperStyle]}>{this.props.helper}</Text>
        )}
      </View>
    );
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
