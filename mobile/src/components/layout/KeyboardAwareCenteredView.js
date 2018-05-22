import React from 'react';
import { KeyboardAvoidingView, StatusBar, Platform } from 'react-native';

import Gradient from '../gradient/Gradient';
import styles from './KeyboardAwareCenteredView.styles';

const KeyboardAwareCenteredView = props => (
  <Gradient>
    <StatusBar barStyle="light-content" />
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {props.children}
    </KeyboardAvoidingView>
  </Gradient>
);

export default KeyboardAwareCenteredView;
