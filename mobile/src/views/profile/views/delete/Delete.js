import React from 'react';
import { View, StyleSheet } from 'react-native';

import Container from '../../../../components/layout/Container';
import Input from '../../../../components/input/Input';
import Button from '../../../../components/big-red-button/BigRedButton';

import colors from '../../../../statics/colors';
import { translate } from '../../../../i18n';

class Delete extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      password: null,
    };
  }
  render() {
    return (
      <Container title={translate('your_account')} navigation={this.props.navigation}>
        <Input
          ref="passwordConfirmation"
          style={styles.input}
          secure
          onSubmit={() => null}
          onChangeText={password => this.setState({ password })}
          placeHolder={translate('your_password')}
          placeHolderColor={colors.grey}
          cursorColor={colors.grey}
          returnKey="done"
          value={this.state.password}
          withValidation
          validationFunction={this.validateNewPasswordConfirmation}
        />
        <Button
          style={{ marginTop: 12 }}
          label={translate('delete_account')}
          loading={this.state.loading}
          disabled={!this.validateFields()}
          onPress={() => this.deleteAccount()}
        />
      </Container>
    );
  }

  validatePassword() {
    return this.state.password && this.state.password.length > 3;
  }

  validateFields() {
    return this.validatePassword();
  }

  async deleteAccount() {
    const { navigation } = this.props;

    this.setState({ loading: true });
    await this.props
      .deleteAccount({
        password: this.state.password,
      })
      .then(_ => {
        navigation.navigate('Auth');
      })
      .catch(_ => {
        this.setState({ loading: false });
      });
    this.setState({ loading: false });
  }
}

const styles = StyleSheet.create({
  input: {
    fontSize: 14,
    color: colors.text,
  },
});

export default Delete;
