import React, { PureComponent } from 'react';
import { View } from 'react-native';

import Colors from '../../../statics/colors';

import Title from '../../../components/title/Title';
import Button from '../../../components/button/Button';
import NavigationButton from '../../../components/navigation-button/NavigationButton';
import { translate } from '../../../i18n';

const lawSubtitle = {
  firstPart: "Selon l'article",
  secondPart: 'L351-2-1',
  thirdPart:
    ', il est interdit de vendre\n' +
    'des dispositifs électroniques de vapotage ou des\n' +
    'flacons de recharges à des mineurs.',
};

//TODO: Handle 'No' case
class SecondStep extends PureComponent {
  render() {
    return (
      <View style={{ backgroundColor: 'transparent' }}>
        <NavigationButton onPress={() => this.props.previousStep()} back />
        <Title style={{ marginBottom: 20, marginTop: 10 }} color={Colors.white} size={22}>
          {translate('are_you_major')}
        </Title>
        <Title size={14} color={Colors.white} style={{ marginBottom: 30 }}>
          {lawSubtitle.firstPart}&nbsp;
          {lawSubtitle.secondPart}
          {lawSubtitle.thirdPart}
        </Title>
        <Button
          style={{ marginBottom: 20 }}
          onPress={() => this.props.nextStep({ isMajor: true })}
          label={translate('yes')}
          backgroundColor={Colors.white}
          labelColor={Colors.red}
          fontSize={14}
        />
        <Button onPress={() => {}} label={translate('cancel_sign_up')} fontSize={14} />
      </View>
    );
  }
}

SecondStep.propTypes = {};
SecondStep.defaultProps = {};

export default SecondStep;
