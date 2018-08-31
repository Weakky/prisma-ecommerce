import React from 'react';
import { StyleSheet } from 'react-native';

import Container from '../../../../components/layout/Container';
import Input from '../../../../components/input/Input';
import Button from '../../../../components/big-red-button/BigRedButton';

import colors from '../../../../statics/colors';
import { translate } from '../../../../i18n';

class Password extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      oldPassword: null,
      newPassword: null,
      newPasswordConfirmation: null,
    };

    this.validateOldPassword = this.validateOldPassword.bind(this);
    this.validateNewPassword = this.validateNewPassword.bind(this);
    this.validateNewPasswordConfirmation = this.validateNewPasswordConfirmation.bind(
      this,
    );
    this.validateFields = this.validateFields.bind(this);
    this.focusNextField = this.focusNextField.bind(this);
  }

  focusNextField(nextField) {
    this.refs[nextField].focus();
  }

  validateOldPassword() {
    return this.state.oldPassword && this.state.oldPassword.length > 3;
  }

  validateNewPassword() {
    return this.state.newPassword && this.state.newPassword.length > 3;
  }

  validateNewPasswordConfirmation() {
    return (
      this.validateNewPassword() &&
      this.state.newPasswordConfirmation === this.state.newPassword
    );
  }

  validateFields() {
    return (
      this.validateOldPassword() &&
      this.validateNewPassword() &&
      this.validateNewPasswordConfirmation()
    );
  }

  async changePassword() {
    this.setState({ loading: true });
    await this.props
      .changePassword({
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword,
      })
      .catch(_ => {
        this.setState({ loading: false });
      });
    this.setState({ loading: false });
  }

  render() {
    return (
      <Container title={translate('your_password')} navigation={this.props.navigation}>
        <Input
          style={styles.input}
          secure
          onSubmit={() => this.focusNextField('newPassword')}
          autoFocus
          onChangeText={oldPassword => this.setState({ oldPassword })}
          placeHolder={translate('password')}
          placeHolderColor={colors.grey}
          cursorColor={colors.grey}
          returnKey="next"
          value={this.state.oldPassword}
          withValidation
          validationFunction={this.validateOldPassword}
        />
        <Input
          ref="newPassword"
          style={[styles.input, { marginTop: 12 }]}
          secure
          onSubmit={() => this.focusNextField('newPasswordConfirmation')}
          onChangeText={newPassword => this.setState({ newPassword })}
          placeHolder={translate('new_password')}
          placeHolderColor={colors.grey}
          cursorColor={colors.grey}
          returnKey="next"
          value={this.state.newPassword}
          withValidation
          validationFunction={this.validateNewPassword}
        />
        <Input
          ref="newPasswordConfirmation"
          style={styles.input}
          secure
          onSubmit={() => null}
          onChangeText={newPasswordConfirmation =>
            this.setState({ newPasswordConfirmation })
          }
          placeHolder={translate('password_confirm')}
          placeHolderColor={colors.grey}
          cursorColor={colors.grey}
          returnKey="done"
          value={this.state.newPasswordConfirmation}
          withValidation
          validationFunction={this.validateNewPasswordConfirmation}
        />
        <Button
          style={{ marginTop: 12 }}
          label={translate('update_password')}
          loading={this.state.loading}
          disabled={!this.validateFields()}
          onPress={() => this.changePassword()}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    fontSize: 14,
    color: colors.text,
  },
});

export default Password;
