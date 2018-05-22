import React, { PureComponent } from 'react';
import Colors from '../../../statics/colors';
import { View } from 'react-native';

import Title from '../../../components/title/Title';
import Input from '../../../components/input/Input';
import NavigationButton from '../../../components/navigation-button/NavigationButton';
import styles from '../SignUp.styles';
import { translate } from '../../../i18n';

class FourthStep extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  validateFields() {
    return !!this.state.email && !!this.state.password;
  }

  focusNextField(nextField) {
    this.refs[nextField].focus();
  }

  render() {
    return (
      <View>
        <View style={{ flex: 1, backgroundColor: 'transparent' }}>
          <NavigationButton onPress={() => this.props.previousStep()} back />
          <Title
            style={{ marginBottom: 50, marginTop: 10 }}
            size={22}
            color={Colors.white}
          >
            {translate('finish_sign_up')}&nbsp;!
          </Title>
          <Input
            style={{ marginBottom: 20 }}
            autoFocus
            label={translate('email')}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            onSubmit={() => this.focusNextField('1')}
          />
          <Input
            ref="1"
            label={translate('password')}
            returnKey="next"
            helper={translate('hard_password')}
            secure
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            onSubmit={() => this.props.nextStep(this.state)}
          />
        </View>
        <View style={styles.nextButton}>
          <NavigationButton
            enabled={this.validateFields()}
            onPress={() => this.validateFields() && this.props.nextStep(this.state)}
          />
        </View>
      </View>
    );
  }
}

FourthStep.propTypes = {};
FourthStep.defaultProps = {};

export default FourthStep;
