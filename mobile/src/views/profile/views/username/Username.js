import React from 'react';
import { View, StyleSheet } from 'react-native';

import Container from '../../../../components/layout/Container';
import Input from '../../../../components/input/Input';
import Button from '../../../../components/big-red-button/BigRedButton';
import FullLoading from '../../../../components/loading/FullLoading';

import colors from '../../../../statics/colors';
import { translate } from '../../../../i18n';

class Username extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      firstName: null,
      lastName: null,
    };

    this.updateUserIdentity = this.updateUserIdentity.bind(this);
    this.focusNextField = this.focusNextField.bind(this);
    this.validateFirstName = this.validateFirstName.bind(this);
    this.validateLastName = this.validateLastName.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    if (!data.loading) {
      this.setState({
        firstName: data.me.firstName,
        lastName: data.me.lastName,
      });
    }
  }

  async updateUserIdentity() {
    this.setState({ loading: true });
    await this.props.updateUserIdentity({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    });
    this.setState({ loading: false });
  }

  focusNextField(nextField) {
    this.refs[nextField].focus();
  }

  validateFirstName() {
    return this.state.firstName && this.state.firstName.length > 3;
  }

  validateLastName() {
    return this.state.lastName && this.state.lastName.length > 3;
  }

  validateFields() {
    return this.validateFirstName() && this.validateLastName();
  }

  render() {
    const { data, navigation } = this.props;

    if (data.loading) {
      return <FullLoading />;
    }

    return (
      <Container title={translate('your_username')} navigation={navigation}>
        <Input
          ref="firstName"
          style={styles.input}
          onSubmit={() => this.focusNextField('lastName')}
          autoFocus
          onChangeText={firstName => this.setState({ firstName })}
          placeHolder={translate('your_firstname')}
          placeHolderColor={colors.grey}
          cursorColor={colors.grey}
          returnKey="next"
          value={this.state.firstName}
          withValidation
          validationFunction={this.validateFirstName}
        />
        <Input
          ref="lastName"
          style={styles.input}
          onSubmit={() => null}
          onChangeText={lastName => this.setState({ lastName })}
          placeHolder={translate('your_lastname')}
          placeHolderColor={colors.grey}
          cursorColor={colors.grey}
          returnKey="done"
          value={this.state.lastName}
          withValidation
          validationFunction={this.validateLastName}
        />
        <Button
          style={{ marginTop: 12 }}
          label={translate('update_informations')}
          loading={this.state.loading}
          disabled={!this.validateFields()}
          onPress={() => this.updateUserIdentity()}
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
export default Username;
