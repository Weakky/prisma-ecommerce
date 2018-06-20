import React, { PureComponent } from 'react';
import { NavigationActions, StackActions } from 'react-navigation';
import { View, StyleSheet, Dimensions } from 'react-native';

import Title from '../../components/title/Title';
import BigRedButton from '../../components/big-red-button/BigRedButton';

import Colors from '../../statics/colors'
import font from '../../assets/fonts'
import Container from '../../components/layout/Container';
import { translate } from '../../i18n';

const Separator = () => <View style={styles.separator} />;

class AfterPayment extends PureComponent {

  navigateToHome() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Basket' })],
    });
    this.props.navigation.dispatch(resetAction);
    this.props.navigation.navigate('WelcomeTab');
  }

  render() {
    return (
      <Container>
        <Title
          style={{ textAlign: 'center' }}
          color={Colors.text}
          font={font}
          weight="500"
          size={24}
        >
          {translate('congratz_payment')}
        </Title>
        <Separator />
        <Title
          style={{ textAlign: 'center' }}
          color={Colors.text}
          font={font}
          size={16}
        >
          {translate('will_receive_notif')}
        </Title>
        <BigRedButton
          onPress={() => this.navigateToHome()}
          style={{ marginTop: 16 }}
          label={translate('back_to_home')}
        />
      </Container>
    );
  }
}

AfterPayment.propTypes = {};
AfterPayment.defaultProps = {};

const styles = StyleSheet.create({
  separator: {
    alignSelf: 'center',
    width: Dimensions.get('window').width * 0.90,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ccc',
    marginBottom: 16,
    marginTop: 16,
  },
});

export default AfterPayment;
