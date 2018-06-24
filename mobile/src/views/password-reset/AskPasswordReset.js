import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar, StyleSheet, Alert, ScrollView } from 'react-native';

import Title from '../../components/title/Title';
import KeyboardAwareCenteredView from '../../components/layout/KeyboardAwareCenteredView';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

import Colors from '../../statics/colors';
import { translate } from '../../i18n';

class PasswordReset extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      loading: false,
      email: '',
    };

    this.triggerResetPassword = this.triggerResetPassword.bind(this);
  }

  validateEmail() {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.state.email);
  }

  async triggerResetPassword() {
    this.setState({ loading: true });

    try {
      await this.props.resetPassword({
        email: this.state.email,
      });
      this.props.navigation.navigate('Login');
    } catch (e) {
      const error = e.graphQLErrors[0];
      Alert.alert('Une erreur est survenue', error.message);
    }
    finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const buttonColor = this.validateEmail() ? Colors.white : 'rgba(255, 255, 255, 0.4)';

    return (
      <KeyboardAwareCenteredView>
        <StatusBar barStyle="light-content" />
        <ScrollView>
          <Title
            style={{
              marginBottom: 50,
              marginTop: 10,
            }}
            size={22}
            color={Colors.white}
          >
            {translate('reset_password')}
          </Title>
          <Input
            autoFocus
            style={{ marginBottom: 20 }}
            label={translate('email')}
            helper="Saisissez votre adresse e-mail et nous vous enverrons un mail contenant un code pour réinitialiser votre mot de passe."
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            onSubmit={email => email && this.triggerResetPassword()}
          />
          <Button
            style={{ marginTop: 32 }}
            onPress={this.triggerResetPassword}
            label={translate('confirm')}
            backgroundColor={buttonColor}
            borderColor={buttonColor}
            disabled={!this.validateEmail()}
            labelColor={Colors.red}
            fontSize={14}
            loading={this.state.loading}
          />
          <Button
            style={{ marginTop: 8 }}
            onPress={() => this.props.navigation.navigate('Login')}
            label={translate('back_to_home')}
            labelColor={Colors.white}
            fontSize={14}
          />
        </ScrollView>
      </KeyboardAwareCenteredView>
    );
  }
}

PasswordReset.propTypes = {};
PasswordReset.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 150,
    width: 150,
  },
});

export default PasswordReset;
