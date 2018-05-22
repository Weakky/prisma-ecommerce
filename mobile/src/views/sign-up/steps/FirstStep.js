import React from 'react';
import { View } from 'react-native';

import Colors from '../../../statics/colors';

import Input from '../../../components/input/Input';
import Title from '../../../components/title/Title';
import NavigationButton from '../../../components/navigation-button/NavigationButton';
import { translate } from '../../../i18n';
import styles from '../SignUp.styles';

class FirstStep extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
    };
  }

  focusNextField(nextField) {
    this.refs[nextField].focus();
  }

  validateFields() {
    return !!this.state.firstName && !!this.state.lastName;
  }

  render() {
    return (
      <View>
        <View style={{ flex: 1 }}>
          <NavigationButton onPress={() => this.props.navigation.goBack()} back />
          <Title
            style={{ marginBottom: 50, marginTop: 10 }}
            size={22}
            color={Colors.white}
          >
            {translate('whats_your_name')}
          </Title>
          <Input
            autoFocus
            style={{ marginBottom: 20 }}
            label={translate('first_name')}
            autoCapitalize="words"
            onChangeText={firstName => this.setState({ firstName })}
            value={this.state.firstName}
            onSubmit={firstName => firstName && this.focusNextField('1')}
          />
          <Input
            ref="1"
            label={translate('last_name')}
            returnKey="next"
            autoCapitalize="characters"
            onChangeText={lastName => this.setState({ lastName: lastName.toUpperCase() })}
            value={this.state.lastName}
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

export default FirstStep;
