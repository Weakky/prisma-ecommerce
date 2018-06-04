import React, { PureComponent } from 'react';
import { View, AsyncStorage, ActivityIndicator } from 'react-native';

import NavigationButton from '../../components/navigation-button/NavigationButton';
import Title from '../../components/title/Title';
import colors from '../../statics/colors';
import Input from '../../components/input/Input';
import KeyboardAwareCenteredView from '../../components/layout/KeyboardAwareCenteredView';

import StorageKeys from '../../statics/storage-keys';

import { translate } from '../../i18n';

import styles from './SignIn.styles';

class SignIn extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false,
    };

    this.authenticateUser = this.authenticateUser.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }

  focusNextField(nextField) {
    this.refs[nextField].focus();
  }

  validateEmail() {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.state.email);
  }

  validatePassword() {
    return !!this.state.password;
  }

  validateFields() {
    return this.validateEmail() && this.validatePassword();
  }

  async authenticateUser() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    if (!this.validateFields()) {
      return this.setState({
        error: "Un des champs n'est pas correctement rempli.",
        loading: false,
      });
    }

    try {
      const { data } = await this.props.authenticateUser({
        email,
        password,
      });

      await AsyncStorage.setItem(StorageKeys.GC_TOKEN, data.login.token);

      this.setState({ loading: false }, () => {
        this.props.navigation.navigate('App');
      });
    } catch (e) {
      console.log(e);
      this.setState({
        error: 'Une erreur est survenue.',
        loading: false,
      });
    }
  }

  render() {
    return (
      <KeyboardAwareCenteredView>
        <View style={styles.container}>
          <NavigationButton onPress={() => this.props.navigation.goBack()} back />
          <Title
            style={{ marginBottom: 50, marginTop: 10 }}
            size={22}
            color={colors.white}
          >
            {translate('sign_in')}
          </Title>
          <Input
            autoFocus
            style={{ marginBottom: 20 }}
            label={translate('email')}
            autoCapitalize="none"
            onChangeText={email => this.setState({ email })}
            onSubmit={email => email && this.focusNextField('1')}
            value={this.state.email}
            withValidation
            validationFunction={this.validateEmail}
          />
          <Input
            ref="1"
            label={translate('password')}
            secure
            returnKey="next"
            autoCapitalize="none"
            onChangeText={password => this.setState({ password })}
            onSubmit={this.authenticateUser}
            value={this.state.password}
            withValidation
            validationFunction={this.validatePassword}
          />
          {this.state.loading && <ActivityIndicator color={colors.white} animating />}
          {!!this.state.error && (
            <Title
              color={colors.white}
              size={13}
              style={{ alignSelf: 'center', marginTop: 25 }}
            >
              {this.state.error}
            </Title>
          )}
          <Title color={colors.white} size={13} style={{ marginTop: 25 }}>
            {translate('forgot_password')}
          </Title>
        </View>
        <View style={styles.nextButton}>
          <NavigationButton
            enabled={this.validateFields()}
            onPress={this.authenticateUser}
          />
        </View>
      </KeyboardAwareCenteredView>
    );
  }
}

export default SignIn;
